/*
 * 진로 기반 추천 엔진
 * ------------------------------------------------------------------
 * 과목과 진로는 모두 "역량(skills)"으로 표현되어 있습니다.
 * 진로가 요구하는 역량 가중치와 과목이 길러주는 역량을 비교해서
 *   1) 과목 적합도, 2) 학과 적합도(역량 커버리지),
 *   3) 내 전공으로 채우지 못하는 역량(갭)과 이를 메울 복수전공·부전공,
 *   4) 학년별 수강 로드맵을 계산합니다.
 */

/** 대학에 개설된 학과 목록을 카탈로그에서 펼쳐서 반환 */
function getDepartments(data, universityId) {
  const uni = data.UNIVERSITIES.find((u) => u.id === universityId);
  if (!uni) throw new Error(`알 수 없는 대학: ${universityId}`);
  return uni.departments.map((id) => ({ id, ...data.DEPARTMENT_CATALOG[id] }));
}

/** 과목이 진로에 얼마나 맞는지: 겹치는 역량의 가중치 합 */
function scoreCourse(course, career) {
  const matched = course.skills.filter((s) => career.skills[s]);
  const score = matched.reduce((sum, s) => sum + career.skills[s], 0);
  return { score, matched };
}

function totalWeight(career) {
  return Object.values(career.skills).reduce((a, b) => a + b, 0);
}

/** 과목 묶음이 진로 역량을 얼마나 커버하는지 (0~1) */
function coverage(courses, career) {
  const covered = new Set(courses.flatMap((c) => c.skills));
  const got = Object.entries(career.skills)
    .filter(([s]) => covered.has(s))
    .reduce((sum, [, w]) => sum + w, 0);
  return got / totalWeight(career);
}

function missingSkills(courses, career) {
  const covered = new Set(courses.flatMap((c) => c.skills));
  return Object.keys(career.skills)
    .filter((s) => !covered.has(s))
    .sort((a, b) => career.skills[b] - career.skills[a]);
}

function byScoreThenYear(a, b) {
  return b.score - a.score || a.year - b.year || a.semester - b.semester;
}

/**
 * @param {object} data   data.js 의 DATA
 * @param {object} input  { universityId, careerId, departmentId?, currentYear? }
 *   departmentId 가 없으면 "어느 학과로 갈지" 관점의 추천을 반환합니다.
 */
function recommend(data, input) {
  const { universityId, careerId, departmentId = null } = input;
  const currentYear = Math.min(Math.max(Number(input.currentYear) || 1, 1), 4);

  const career = data.CAREERS.find((c) => c.id === careerId);
  if (!career) throw new Error(`알 수 없는 진로: ${careerId}`);
  const departments = getDepartments(data, universityId);
  const myDept = departmentId ? departments.find((d) => d.id === departmentId) : null;
  if (departmentId && !myDept) throw new Error(`이 대학에 없는 학과: ${departmentId}`);

  const annotate = (course, dept) => ({
    ...course,
    ...scoreCourse(course, career),
    departmentId: dept ? dept.id : null,
    departmentName: dept ? dept.name : "교양",
    past: course.year < currentYear,
  });

  // 1) 학과별 적합도
  const departmentRanking = departments
    .map((d) => {
      const cov = coverage(d.courses, career);
      const related = career.relatedDepartments.includes(d.id);
      return {
        id: d.id,
        name: d.name,
        college: d.college,
        fit: Math.round(cov * 100),
        related,
        missing: missingSkills(d.courses, career),
        rank: cov + (related ? 0.15 : 0),
      };
    })
    .sort((a, b) => b.rank - a.rank);

  // 2) 과목 추천
  const relevant = (c) => c.score > 0;
  const myCourses = myDept
    ? myDept.courses.map((c) => annotate(c, myDept)).filter(relevant).sort(byScoreThenYear)
    : [];
  const myNames = new Set(myCourses.map((c) => c.name));

  const otherCourses = departments
    .filter((d) => d !== myDept)
    .flatMap((d) => d.courses.map((c) => annotate(c, d)))
    .filter((c) => c.score >= 2 && !myNames.has(c.name))
    .sort(byScoreThenYear);
  // 같은 이름의 과목(예: 경제학원론)은 한 번만
  const seen = new Set();
  const otherUnique = otherCourses.filter((c) => !seen.has(c.name) && seen.add(c.name));

  const generalCourses = data.GENERAL_COURSES.map((c) => annotate(c, null))
    .filter(relevant)
    .sort(byScoreThenYear);

  // 3) 역량 갭 & 복수전공·부전공
  const myAll = myDept ? myDept.courses : [];
  const myCoverage = myDept ? Math.round(coverage(myAll, career) * 100) : null;
  const gaps = myDept ? missingSkills(myAll, career) : [];

  const secondMajors = departments
    .filter((d) => d !== myDept)
    .map((d) => {
      const fills = gaps.filter((s) => d.courses.some((c) => c.skills.includes(s)));
      const combined = Math.round(coverage([...myAll, ...d.courses], career) * 100);
      const related = career.relatedDepartments.includes(d.id);
      const gain = myDept ? combined - myCoverage : Math.round(coverage(d.courses, career) * 100);
      return {
        id: d.id,
        name: d.name,
        fills,
        combined,
        gain,
        related,
        // 갭을 크게 메우거나 대표 전공이면 복수전공, 아니면 부전공으로 제안
        kind: gain >= 25 || related ? "복수전공" : "부전공",
      };
    })
    .filter((m) => (myDept ? m.gain > 0 : true))
    .sort((a, b) => b.gain - a.gain || Number(b.related) - Number(a.related))
    .slice(0, 3);

  // 4) 학년별 로드맵 (현재 학년 이후, 학기당 최대 4과목)
  const pool = [
    ...myCourses,
    ...otherUnique.slice(0, 8),
    ...generalCourses.slice(0, 3),
  ].filter((c) => !c.past);
  const roadmap = [];
  for (let year = currentYear; year <= 4; year++) {
    for (const semester of [1, 2]) {
      const courses = pool
        .filter((c) => c.year === year && c.semester === semester)
        .sort((a, b) => b.score - a.score)
        .slice(0, 4);
      if (courses.length) roadmap.push({ year, semester, courses });
    }
  }

  return {
    career,
    university: data.UNIVERSITIES.find((u) => u.id === universityId),
    department: myDept ? { id: myDept.id, name: myDept.name } : null,
    currentYear,
    departmentRanking,
    myCoverage,
    gaps,
    myCourses,
    otherCourses: otherUnique.slice(0, 8),
    generalCourses,
    secondMajors,
    certifications: career.certifications,
    activities: career.activities,
    roadmap,
  };
}

const RECOMMEND = { getDepartments, scoreCourse, coverage, missingSkills, recommend };

if (typeof module !== "undefined" && module.exports) {
  module.exports = RECOMMEND;
}
