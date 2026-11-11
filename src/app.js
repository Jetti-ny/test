/* global DATA, RECOMMEND */
(function () {
  const $ = (id) => document.getElementById(id);
  const els = {
    university: $("university"),
    career: $("career"),
    department: $("department"),
    year: $("year"),
    recommend: $("tab-recommend"),
    browse: $("tab-browse"),
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
  const skill = (k) => esc(DATA.SKILLS[k] || k);
  const chips = (keys, cls = "") => keys.map((k) => `<span class="chip ${cls}">${skill(k)}</span>`).join("");

  // ---------- 셀렉트 채우기 ----------
  function fillSelect(select, options, value) {
    select.innerHTML = options.map((o) => `<option value="${esc(o.value)}">${esc(o.label)}</option>`).join("");
    if (value !== undefined && options.some((o) => o.value === value)) select.value = value;
  }

  fillSelect(els.university, DATA.UNIVERSITIES.map((u) => ({ value: u.id, label: `${u.name} (${u.location})` })));

  const groups = {};
  for (const c of DATA.CAREERS) (groups[c.category] ||= []).push(c);
  els.career.innerHTML = Object.entries(groups)
    .map(([cat, list]) => `<optgroup label="${esc(cat)}">${list.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join("")}</optgroup>`)
    .join("");

  function fillDepartments() {
    const prev = els.department.value;
    const depts = RECOMMEND.getDepartments(DATA, els.university.value);
    fillSelect(
      els.department,
      [{ value: "", label: "아직 없음 (학과 추천 받기)" }, ...depts.map((d) => ({ value: d.id, label: d.name }))],
      prev
    );
  }

  // ---------- 진로 맞춤 추천 ----------
  function courseRow(c) {
    return `<li class="course${c.past ? " past" : ""}">
      <div class="course-main">
        <strong>${esc(c.name)}</strong>
        <span class="meta">${esc(c.departmentName)} · ${c.year}학년 ${c.semester}학기 · ${esc(c.type)} ${c.credits}학점${c.past ? " · 이미 지난 학기" : ""}</span>
      </div>
      <div class="course-skills">${chips(c.matched, "on")}</div>
      <span class="score" title="진로 적합도 점수">${"●".repeat(Math.min(c.score, 6))}</span>
    </li>`;
  }

  function bar(pct) {
    return `<div class="bar" role="img" aria-label="${pct}%"><span style="width:${pct}%"></span></div>`;
  }

  function renderRecommend() {
    const r = RECOMMEND.recommend(DATA, {
      universityId: els.university.value,
      careerId: els.career.value,
      departmentId: els.department.value || null,
      currentYear: els.year.value,
    });
    const career = r.career;
    const html = [];

    html.push(`<article class="card hero">
      <p class="kicker">${esc(career.category)}</p>
      <h2>${esc(career.name)}</h2>
      <p>${esc(career.description)}</p>
      <div class="skills-need">${Object.entries(career.skills)
        .sort((a, b) => b[1] - a[1])
        .map(([k, w]) => `<span class="chip w${w}">${skill(k)} ${"★".repeat(w)}</span>`)
        .join("")}</div>
    </article>`);

    // 학과 적합도
    if (r.department) {
      html.push(`<article class="card">
        <h3>내 전공(${esc(r.department.name)})의 진로 역량 커버리지</h3>
        <div class="big">${r.myCoverage}%</div>${bar(r.myCoverage)}
        ${r.gaps.length
          ? `<p>전공 과목만으로는 부족한 역량: ${chips(r.gaps, "gap")}</p>`
          : `<p>전공 과목으로 필요한 역량을 모두 다룰 수 있어요. 🎉</p>`}
      </article>`);
    }

    html.push(`<article class="card">
      <h3>${r.department ? "학과별 적합도" : "이 진로에 맞는 학과"} · ${esc(r.university.name)}</h3>
      <ol class="dept-rank">${r.departmentRanking
        .map((d) => `<li class="${r.department && d.id === r.department.id ? "mine" : ""}">
          <div><strong>${esc(d.name)}</strong> <span class="meta">${esc(d.college)}</span>
            ${d.related ? '<span class="badge">대표 전공</span>' : ""}
            ${r.department && d.id === r.department.id ? '<span class="badge alt">내 학과</span>' : ""}</div>
          ${bar(d.fit)}<span class="pct">${d.fit}%</span>
        </li>`)
        .join("")}</ol>
    </article>`);

    // 복수전공·부전공
    if (r.department && r.secondMajors.length) {
      html.push(`<article class="card">
        <h3>연계 전공 추천 (복수전공·부전공)</h3>
        <ul class="majors">${r.secondMajors
          .map((m) => `<li>
            <span class="badge ${m.kind === "복수전공" ? "" : "alt"}">${m.kind}</span>
            <strong>${esc(m.name)}</strong>
            ${r.department
              ? `<p>함께 이수하면 역량 커버리지 <b>${r.myCoverage}% → ${m.combined}%</b> (+${m.gain}%p)</p>
                 ${m.fills.length ? `<p>채워주는 역량: ${chips(m.fills, "on")}</p>` : ""}`
              : `<p>진로 역량 커버리지 ${m.combined}%</p>`}
          </li>`)
          .join("")}</ul>
      </article>`);
    }

    // 과목
    if (r.myCourses.length) {
      html.push(`<article class="card"><h3>내 전공에서 꼭 챙길 과목</h3><ul class="courses">${r.myCourses.map(courseRow).join("")}</ul></article>`);
    }
    html.push(`<article class="card"><h3>${r.department ? "타과 수강 추천 과목" : "추천 전공 과목"}</h3>
      <ul class="courses">${r.otherCourses.map(courseRow).join("") || "<li>추천할 과목이 없어요.</li>"}</ul></article>`);
    if (r.generalCourses.length) {
      html.push(`<article class="card"><h3>추천 교양 과목</h3><ul class="courses">${r.generalCourses.map(courseRow).join("")}</ul></article>`);
    }

    // 로드맵
    if (r.roadmap.length) {
      html.push(`<article class="card"><h3>${r.currentYear}학년부터의 수강 로드맵</h3>
        <div class="roadmap">${r.roadmap
          .map((s) => `<div class="term"><h4>${s.year}학년 ${s.semester}학기</h4><ul>${s.courses
            .map((c) => `<li>${esc(c.name)} <span class="meta">${esc(c.departmentName)}</span></li>`)
            .join("")}</ul></div>`)
          .join("")}</div></article>`);
    }

    // 자격증 & 활동
    html.push(`<div class="two">
      <article class="card"><h3>추천 자격증</h3><ul class="certs">${r.certifications
        .map((c) => `<li><strong>${esc(c.name)}</strong><span class="meta">${esc(c.issuer)}</span><p>${esc(c.note)}</p></li>`)
        .join("")}</ul></article>
      <article class="card"><h3>함께 하면 좋은 활동</h3><ul class="acts">${r.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul></article>
    </div>`);

    els.recommend.innerHTML = html.join("");
  }

  // ---------- 교육과정 둘러보기 ----------
  function renderBrowse() {
    const depts = RECOMMEND.getDepartments(DATA, els.university.value);
    const career = DATA.CAREERS.find((c) => c.id === els.career.value);
    els.browse.innerHTML = depts
      .map((d) => {
        const years = [1, 2, 3, 4]
          .map((y) => {
            const list = d.courses.filter((c) => c.year === y);
            if (!list.length) return "";
            return `<div class="term"><h4>${y}학년</h4><ul>${list
              .map((c) => {
                const hit = career && c.skills.some((s) => career.skills[s]);
                return `<li class="${hit ? "hit" : ""}"><strong>${esc(c.name)}</strong>
                  <span class="meta">${c.semester}학기 · ${esc(c.type)}</span>
                  <div>${chips(c.skills)}</div></li>`;
              })
              .join("")}</ul></div>`;
          })
          .join("");
        return `<details class="card dept" ${d.id === els.department.value ? "open" : ""}>
          <summary><strong>${esc(d.name)}</strong> <span class="meta">${esc(d.college)} · ${d.courses.length}과목</span>
            <p>${esc(d.description)}</p></summary>
          <p class="legend"><span class="dot"></span> 선택한 진로(${esc(career ? career.name : "")})와 관련된 과목</p>
          <div class="roadmap">${years}</div>
        </details>`;
      })
      .join("");
  }

  function render() {
    renderRecommend();
    renderBrowse();
  }

  // ---------- 이벤트 ----------
  els.university.addEventListener("change", () => {
    fillDepartments();
    render();
  });
  for (const el of [els.career, els.department, els.year]) el.addEventListener("change", render);

  document.querySelectorAll('[role="tab"]').forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll('[role="tab"]').forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
      els.recommend.hidden = btn.dataset.tab !== "recommend";
      els.browse.hidden = btn.dataset.tab !== "browse";
    })
  );

  fillDepartments();
  render();
})();
