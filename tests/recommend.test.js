const test = require("node:test");
const assert = require("node:assert/strict");
const DATA = require("../src/data.js");
const { recommend, coverage, scoreCourse } = require("../src/recommend.js");

test("모든 과목의 역량 키가 역량 사전에 존재한다", () => {
  const all = [
    ...Object.values(DATA.DEPARTMENT_CATALOG).flatMap((d) => d.courses),
    ...DATA.GENERAL_COURSES,
  ];
  for (const c of all) for (const s of c.skills) assert.ok(DATA.SKILLS[s], `${c.name}: ${s}`);
  for (const career of DATA.CAREERS)
    for (const s of Object.keys(career.skills)) assert.ok(DATA.SKILLS[s], `${career.name}: ${s}`);
});

test("대학의 학과와 진로의 대표 학과는 카탈로그에 존재한다", () => {
  for (const u of DATA.UNIVERSITIES) for (const d of u.departments) assert.ok(DATA.DEPARTMENT_CATALOG[d]);
  for (const c of DATA.CAREERS) for (const d of c.relatedDepartments) assert.ok(DATA.DEPARTMENT_CATALOG[d]);
});

test("과목 점수는 겹치는 역량 가중치의 합", () => {
  const career = DATA.CAREERS.find((c) => c.id === "backend");
  const { score, matched } = scoreCourse({ skills: ["database", "data", "design"] }, career);
  assert.equal(score, 3);
  assert.deepEqual(matched, ["database"]);
});

test("백엔드 개발자에게는 컴퓨터공학과가 1순위 학과", () => {
  const r = recommend(DATA, { universityId: "hanbit", careerId: "backend" });
  assert.equal(r.departmentRanking[0].id, "cs");
  assert.equal(r.departmentRanking[0].fit, 100);
});

test("심리학과 학생이 UX 디자이너를 꿈꾸면 산업디자인 복수전공을 추천", () => {
  const r = recommend(DATA, {
    universityId: "hanbit",
    careerId: "ux-designer",
    departmentId: "psych",
    currentYear: 2,
  });
  assert.ok(r.gaps.includes("design"));
  assert.equal(r.secondMajors[0].id, "design");
  assert.equal(r.secondMajors[0].kind, "복수전공");
  assert.ok(r.secondMajors[0].combined > r.myCoverage);
});

test("로드맵에는 현재 학년 이전 과목이 포함되지 않는다", () => {
  const r = recommend(DATA, {
    universityId: "mirae",
    careerId: "data-scientist",
    departmentId: "cs",
    currentYear: 3,
  });
  assert.ok(r.roadmap.length > 0);
  for (const step of r.roadmap) {
    assert.ok(step.year >= 3);
    for (const c of step.courses) assert.ok(c.year >= 3);
  }
});

test("타과 추천 과목은 내 학과 과목과 이름이 겹치지 않는다", () => {
  const r = recommend(DATA, { universityId: "nuri", careerId: "accountant", departmentId: "biz" });
  const mine = new Set(r.myCourses.map((c) => c.name));
  for (const c of r.otherCourses) assert.ok(!mine.has(c.name), c.name);
  // 경제학원론은 경영·경제 양쪽에 있으므로 타과 추천에 나오면 안 됨
  assert.ok(!r.otherCourses.some((c) => c.name === "경제학원론"));
});

test("커버리지는 0~1 사이", () => {
  const career = DATA.CAREERS[0];
  assert.equal(coverage([], career), 0);
  const all = Object.values(DATA.DEPARTMENT_CATALOG).flatMap((d) => d.courses);
  assert.equal(coverage(all, career), 1);
});

test("없는 학과·진로는 오류", () => {
  assert.throws(() => recommend(DATA, { universityId: "hanbit", careerId: "nope" }));
  assert.throws(() => recommend(DATA, { universityId: "hanbit", careerId: "backend", departmentId: "ee" }));
});
