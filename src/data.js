/*
 * 샘플 데이터
 * ------------------------------------------------------------------
 * 대학교 이름과 교육과정은 서비스 시연을 위한 가상의 예시입니다.
 * 실제 서비스에서는 각 대학의 학사요람/교육과정 공개 자료를 수집해
 * 같은 구조(JSON)로 채워 넣으면 됩니다.
 * 자격증 이름과 시행기관은 실제 국내 자격증 기준입니다.
 */

/** 역량(스킬) 사전: 과목·진로를 연결하는 공통 언어 */
const SKILLS = {
  programming: "프로그래밍",
  algorithm: "자료구조·알고리즘",
  systems: "컴퓨터 시스템",
  network: "네트워크",
  security: "정보보안",
  web: "웹·앱 개발",
  database: "데이터베이스",
  data: "데이터 분석",
  statistics: "통계",
  ml: "머신러닝·AI",
  math: "수학",
  circuit: "회로·전자",
  embedded: "임베디드·하드웨어",
  design: "시각·제품 디자인",
  ux: "UX·사용자 연구",
  business: "경영 전략",
  marketing: "마케팅",
  accounting: "회계",
  finance: "재무·금융",
  economics: "경제학",
  psychology: "심리학",
  counseling: "상담",
  research: "연구방법론",
  communication: "커뮤니케이션",
  media: "미디어·콘텐츠",
  writing: "글쓰기",
};

/**
 * 학과별 교육과정 카탈로그
 * type: 전공필수 | 전공선택 | 교양
 * skills: 이 과목에서 기르는 역량 (SKILLS 키)
 */
const DEPARTMENT_CATALOG = {
  cs: {
    name: "컴퓨터공학과",
    college: "공과대학",
    description: "소프트웨어 설계와 컴퓨팅 시스템의 원리를 배우는 학과",
    courses: [
      { code: "CS101", name: "프로그래밍기초", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["programming"] },
      { code: "CS102", name: "이산수학", year: 1, semester: 2, type: "전공필수", credits: 3, skills: ["math", "algorithm"] },
      { code: "CS201", name: "자료구조", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["algorithm", "programming"] },
      { code: "CS202", name: "컴퓨터구조", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["systems", "embedded"] },
      { code: "CS203", name: "객체지향프로그래밍", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["programming", "web"] },
      { code: "CS204", name: "알고리즘", year: 2, semester: 2, type: "전공필수", credits: 3, skills: ["algorithm", "math"] },
      { code: "CS301", name: "운영체제", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["systems"] },
      { code: "CS302", name: "데이터베이스", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["database", "data"] },
      { code: "CS303", name: "컴퓨터네트워크", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["network", "systems"] },
      { code: "CS304", name: "웹프로그래밍", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["web", "programming"] },
      { code: "CS305", name: "정보보호개론", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["security", "network"] },
      { code: "CS401", name: "인공지능", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["ml", "math"] },
      { code: "CS402", name: "소프트웨어공학", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["programming", "business"] },
      { code: "CS403", name: "캡스톤디자인", year: 4, semester: 2, type: "전공필수", credits: 3, skills: ["programming", "web", "communication"] },
    ],
  },
  stat: {
    name: "통계학과",
    college: "자연과학대학",
    description: "데이터에서 근거를 찾는 방법과 수리적 기반을 배우는 학과",
    courses: [
      { code: "ST101", name: "통계학개론", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["statistics"] },
      { code: "ST102", name: "미적분학", year: 1, semester: 2, type: "전공필수", credits: 3, skills: ["math"] },
      { code: "ST201", name: "선형대수", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["math", "ml"] },
      { code: "ST202", name: "수리통계학", year: 2, semester: 2, type: "전공필수", credits: 3, skills: ["statistics", "math"] },
      { code: "ST203", name: "통계프로그래밍(R·Python)", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["programming", "data"] },
      { code: "ST301", name: "회귀분석", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["statistics", "data"] },
      { code: "ST302", name: "실험계획법", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["statistics", "research"] },
      { code: "ST303", name: "데이터마이닝", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["data", "ml"] },
      { code: "ST304", name: "표본조사론", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["research", "statistics"] },
      { code: "ST401", name: "통계적머신러닝", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["ml", "statistics"] },
      { code: "ST402", name: "빅데이터분석실습", year: 4, semester: 2, type: "전공선택", credits: 3, skills: ["data", "database", "programming"] },
    ],
  },
  biz: {
    name: "경영학과",
    college: "경영대학",
    description: "조직 운영, 마케팅, 회계·재무 전반을 배우는 학과",
    courses: [
      { code: "BA101", name: "경영학원론", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["business"] },
      { code: "BA102", name: "경제학원론", year: 1, semester: 2, type: "전공필수", credits: 3, skills: ["economics"] },
      { code: "BA201", name: "회계원리", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["accounting"] },
      { code: "BA202", name: "마케팅원론", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["marketing"] },
      { code: "BA203", name: "경영통계", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["statistics", "data"] },
      { code: "BA204", name: "조직행동론", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["psychology", "business"] },
      { code: "BA301", name: "재무관리", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["finance"] },
      { code: "BA302", name: "중급회계", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["accounting"] },
      { code: "BA303", name: "소비자행동론", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["marketing", "psychology", "ux"] },
      { code: "BA304", name: "경영정보시스템", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["database", "business"] },
      { code: "BA305", name: "세무회계", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["accounting"] },
      { code: "BA401", name: "투자론", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["finance", "economics"] },
      { code: "BA402", name: "디지털마케팅", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["marketing", "data", "media"] },
      { code: "BA403", name: "경영전략", year: 4, semester: 2, type: "전공필수", credits: 3, skills: ["business", "communication"] },
    ],
  },
  econ: {
    name: "경제학과",
    college: "사회과학대학",
    description: "시장과 정책을 이론과 데이터로 분석하는 학과",
    courses: [
      { code: "EC101", name: "경제학원론", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["economics"] },
      { code: "EC201", name: "미시경제학", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["economics", "math"] },
      { code: "EC202", name: "거시경제학", year: 2, semester: 2, type: "전공필수", credits: 3, skills: ["economics"] },
      { code: "EC203", name: "경제수학", year: 2, semester: 1, type: "전공선택", credits: 3, skills: ["math"] },
      { code: "EC301", name: "계량경제학", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["statistics", "data", "economics"] },
      { code: "EC302", name: "화폐금융론", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["finance", "economics"] },
      { code: "EC303", name: "행동경제학", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["psychology", "economics"] },
      { code: "EC401", name: "금융경제학", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["finance"] },
      { code: "EC402", name: "경제데이터분석", year: 4, semester: 2, type: "전공선택", credits: 3, skills: ["data", "programming", "economics"] },
    ],
  },
  design: {
    name: "산업디자인학과",
    college: "예술대학",
    description: "사람을 위한 제품·서비스·인터페이스를 디자인하는 학과",
    courses: [
      { code: "DS101", name: "기초조형", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["design"] },
      { code: "DS102", name: "디자인드로잉", year: 1, semester: 2, type: "전공필수", credits: 3, skills: ["design"] },
      { code: "DS201", name: "타이포그래피", year: 2, semester: 1, type: "전공선택", credits: 3, skills: ["design", "media"] },
      { code: "DS202", name: "인터랙션디자인", year: 2, semester: 2, type: "전공필수", credits: 3, skills: ["ux", "design"] },
      { code: "DS301", name: "UX리서치", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["ux", "research", "psychology"] },
      { code: "DS302", name: "UI디자인스튜디오", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["ux", "design", "web"] },
      { code: "DS303", name: "서비스디자인", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["ux", "business"] },
      { code: "DS304", name: "프로토타이핑", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["design", "programming"] },
      { code: "DS401", name: "디자인졸업프로젝트", year: 4, semester: 2, type: "전공필수", credits: 3, skills: ["design", "ux", "communication"] },
    ],
  },
  psych: {
    name: "심리학과",
    college: "사회과학대학",
    description: "인간의 마음과 행동을 과학적으로 연구하는 학과",
    courses: [
      { code: "PS101", name: "심리학개론", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["psychology"] },
      { code: "PS201", name: "심리통계", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["statistics", "research"] },
      { code: "PS202", name: "인지심리학", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["psychology", "ux"] },
      { code: "PS203", name: "발달심리학", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["psychology"] },
      { code: "PS301", name: "심리연구방법론", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["research", "statistics"] },
      { code: "PS302", name: "이상심리학", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["psychology", "counseling"] },
      { code: "PS303", name: "상담심리학", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["counseling", "communication"] },
      { code: "PS304", name: "산업및조직심리학", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["psychology", "business"] },
      { code: "PS401", name: "심리평가", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["counseling", "research"] },
      { code: "PS402", name: "공학심리학", year: 4, semester: 2, type: "전공선택", credits: 3, skills: ["ux", "psychology"] },
    ],
  },
  ee: {
    name: "전자공학과",
    college: "공과대학",
    description: "회로, 반도체, 신호처리와 임베디드 시스템을 배우는 학과",
    courses: [
      { code: "EE101", name: "공학수학", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["math"] },
      { code: "EE102", name: "C프로그래밍", year: 1, semester: 2, type: "전공필수", credits: 3, skills: ["programming"] },
      { code: "EE201", name: "회로이론", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["circuit"] },
      { code: "EE202", name: "전자회로", year: 2, semester: 2, type: "전공필수", credits: 3, skills: ["circuit"] },
      { code: "EE203", name: "디지털논리회로", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["circuit", "systems"] },
      { code: "EE301", name: "신호및시스템", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["math", "circuit"] },
      { code: "EE302", name: "마이크로프로세서", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["embedded", "systems"] },
      { code: "EE303", name: "반도체공학", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["circuit"] },
      { code: "EE304", name: "통신공학", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["network", "math"] },
      { code: "EE401", name: "임베디드시스템설계", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["embedded", "programming"] },
      { code: "EE402", name: "머신러닝응용", year: 4, semester: 2, type: "전공선택", credits: 3, skills: ["ml", "programming"] },
    ],
  },
  media: {
    name: "미디어커뮤니케이션학과",
    college: "사회과학대학",
    description: "미디어 산업과 콘텐츠, 설득 커뮤니케이션을 배우는 학과",
    courses: [
      { code: "MC101", name: "커뮤니케이션이론", year: 1, semester: 1, type: "전공필수", credits: 3, skills: ["communication"] },
      { code: "MC201", name: "미디어글쓰기", year: 2, semester: 1, type: "전공필수", credits: 3, skills: ["writing", "media"] },
      { code: "MC202", name: "광고학개론", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["marketing", "media"] },
      { code: "MC203", name: "영상콘텐츠제작", year: 2, semester: 2, type: "전공선택", credits: 3, skills: ["media", "design"] },
      { code: "MC301", name: "커뮤니케이션조사방법", year: 3, semester: 1, type: "전공필수", credits: 3, skills: ["research", "statistics"] },
      { code: "MC302", name: "PR전략", year: 3, semester: 1, type: "전공선택", credits: 3, skills: ["communication", "marketing"] },
      { code: "MC303", name: "소셜미디어분석", year: 3, semester: 2, type: "전공선택", credits: 3, skills: ["data", "media"] },
      { code: "MC401", name: "디지털저널리즘", year: 4, semester: 1, type: "전공선택", credits: 3, skills: ["writing", "media", "data"] },
    ],
  },
};

/** 모든 학생이 들을 수 있는 교양 과목 (학교 공통) */
const GENERAL_COURSES = [
  { code: "GE101", name: "글쓰기와소통", year: 1, semester: 1, type: "교양", credits: 2, skills: ["writing", "communication"] },
  { code: "GE102", name: "파이썬으로배우는코딩", year: 1, semester: 2, type: "교양", credits: 3, skills: ["programming", "data"] },
  { code: "GE103", name: "AI와데이터리터러시", year: 1, semester: 2, type: "교양", credits: 2, skills: ["ml", "data"] },
  { code: "GE201", name: "창업과비즈니스모델", year: 2, semester: 1, type: "교양", credits: 2, skills: ["business"] },
  { code: "GE202", name: "생활속의경제", year: 2, semester: 2, type: "교양", credits: 2, skills: ["economics", "finance"] },
  { code: "GE203", name: "프레젠테이션과설득", year: 2, semester: 2, type: "교양", credits: 2, skills: ["communication"] },
];

/**
 * 가상의 대학교 목록
 * departments: 카탈로그 키 목록 (학교마다 개설 학과가 다름)
 */
const UNIVERSITIES = [
  {
    id: "hanbit",
    name: "한빛대학교",
    location: "서울",
    departments: ["cs", "stat", "biz", "design", "psych", "media"],
  },
  {
    id: "mirae",
    name: "미래과학기술대학교",
    location: "대전",
    departments: ["cs", "ee", "stat", "econ", "biz"],
  },
  {
    id: "nuri",
    name: "누리대학교",
    location: "부산",
    departments: ["biz", "econ", "psych", "media", "design"],
  },
];

/**
 * 진로(직무) 목록
 * skills: 필요한 역량과 중요도(1~3)
 * certifications: 추천 자격증 (실제 국내 자격증)
 * relatedDepartments: 대표 전공 (복수전공·부전공 추천 시 가산점)
 */
const CAREERS = [
  {
    id: "backend",
    name: "백엔드 개발자",
    category: "IT·소프트웨어",
    description: "서비스의 서버, 데이터베이스, API를 설계하고 운영합니다.",
    skills: { programming: 3, algorithm: 2, database: 3, systems: 2, network: 2, web: 2 },
    certifications: [
      { name: "정보처리기사", issuer: "한국산업인력공단", note: "IT 직무 기본 자격, 공기업 가산점" },
      { name: "SQLD (SQL 개발자)", issuer: "한국데이터산업진흥원", note: "데이터베이스·SQL 역량 증명" },
      { name: "리눅스마스터 2급", issuer: "한국정보통신진흥협회", note: "서버 운영 기초" },
    ],
    relatedDepartments: ["cs"],
    activities: ["알고리즘 문제풀이(코딩테스트 대비)", "개인/팀 웹 서비스 배포 경험", "오픈소스 기여"],
  },
  {
    id: "data-scientist",
    name: "데이터 사이언티스트",
    category: "데이터·AI",
    description: "데이터로 문제를 정의하고 통계·머신러닝 모델로 의사결정을 돕습니다.",
    skills: { statistics: 3, data: 3, ml: 3, programming: 2, math: 2, database: 1 },
    certifications: [
      { name: "ADsP (데이터분석 준전문가)", issuer: "한국데이터산업진흥원", note: "입문용 데이터 분석 자격" },
      { name: "빅데이터분석기사", issuer: "한국데이터산업진흥원", note: "국가기술자격, 분석 실무" },
      { name: "SQLD (SQL 개발자)", issuer: "한국데이터산업진흥원", note: "데이터 추출 역량" },
      { name: "사회조사분석사 2급", issuer: "한국산업인력공단", note: "조사·통계 분석" },
    ],
    relatedDepartments: ["stat", "cs"],
    activities: ["Kaggle·데이콘 경진대회", "공공데이터 분석 프로젝트", "학부연구생"],
  },
  {
    id: "security",
    name: "정보보안 전문가",
    category: "IT·소프트웨어",
    description: "시스템과 네트워크의 취약점을 찾아 공격을 예방하고 대응합니다.",
    skills: { security: 3, network: 3, systems: 3, programming: 2 },
    certifications: [
      { name: "정보보안기사", issuer: "한국인터넷진흥원", note: "보안 직무 대표 국가기술자격" },
      { name: "네트워크관리사 2급", issuer: "한국정보통신자격협회", note: "네트워크 기초" },
      { name: "정보처리기사", issuer: "한국산업인력공단", note: "IT 기본 자격" },
    ],
    relatedDepartments: ["cs", "ee"],
    activities: ["CTF(해킹방어대회) 참가", "보안 동아리", "KISA 정보보호 교육 프로그램"],
  },
  {
    id: "ux-designer",
    name: "UX/UI 디자이너",
    category: "디자인",
    description: "사용자를 연구하고 쓰기 편한 화면과 서비스 흐름을 설계합니다.",
    skills: { ux: 3, design: 3, research: 2, psychology: 2, web: 1, communication: 1 },
    certifications: [
      { name: "시각디자인산업기사", issuer: "한국산업인력공단", note: "디자인 기초 역량 증명" },
      { name: "웹디자인기능사", issuer: "한국산업인력공단", note: "웹 화면 제작 기초" },
    ],
    relatedDepartments: ["design", "psych"],
    activities: ["포트폴리오(케이스 스터디 3개 이상)", "사용성 테스트 프로젝트", "디자인 공모전"],
  },
  {
    id: "marketer",
    name: "디지털 마케터",
    category: "경영·마케팅",
    description: "데이터와 콘텐츠로 고객을 모으고 브랜드를 성장시킵니다.",
    skills: { marketing: 3, data: 2, media: 2, communication: 2, psychology: 1, writing: 1 },
    certifications: [
      { name: "구글 애널리틱스 자격증(GAIQ)", issuer: "Google", note: "웹 분석 도구 활용" },
      { name: "사회조사분석사 2급", issuer: "한국산업인력공단", note: "소비자 조사·분석" },
      { name: "컴퓨터활용능력 1급", issuer: "대한상공회의소", note: "엑셀 기반 데이터 처리" },
    ],
    relatedDepartments: ["biz", "media"],
    activities: ["SNS 채널 직접 운영", "마케팅 공모전", "광고 대행사 인턴"],
  },
  {
    id: "accountant",
    name: "회계사·세무 전문가",
    category: "경영·금융",
    description: "기업의 재무 정보를 검증하고 세무·회계 자문을 합니다.",
    skills: { accounting: 3, finance: 2, economics: 1, business: 1 },
    certifications: [
      { name: "공인회계사(CPA)", issuer: "금융감독원", note: "회계 분야 최상위 전문 자격" },
      { name: "세무사", issuer: "한국산업인력공단", note: "세무 대리·자문" },
      { name: "전산세무 2급", issuer: "한국세무사회", note: "실무 회계 프로그램 활용" },
      { name: "재경관리사", issuer: "삼일회계법인", note: "기업 재무 실무" },
    ],
    relatedDepartments: ["biz", "econ"],
    activities: ["회계 학회", "CPA 1차 대비 스터디(경영·경제 학점 이수 요건 확인)", "회계법인 인턴"],
  },
  {
    id: "financial-analyst",
    name: "금융 애널리스트",
    category: "경영·금융",
    description: "산업과 기업을 분석해 투자 의견을 제시합니다.",
    skills: { finance: 3, economics: 3, accounting: 2, statistics: 2, data: 1, writing: 1 },
    certifications: [
      { name: "투자자산운용사", issuer: "금융투자협회", note: "금융권 필수 자격" },
      { name: "CFA", issuer: "CFA Institute", note: "국제 공인 재무분석사" },
      { name: "ADsP (데이터분석 준전문가)", issuer: "한국데이터산업진흥원", note: "퀀트·데이터 역량" },
    ],
    relatedDepartments: ["econ", "biz"],
    activities: ["투자 동아리", "기업분석 리포트 작성", "증권사 리서치 인턴"],
  },
  {
    id: "counselor",
    name: "임상·상담심리사",
    category: "심리·복지",
    description: "심리 평가와 상담을 통해 사람들의 정신 건강을 돕습니다.",
    skills: { counseling: 3, psychology: 3, research: 2, communication: 2 },
    certifications: [
      { name: "임상심리사 2급", issuer: "한국산업인력공단", note: "국가기술자격 (실습 1년 필요)" },
      { name: "청소년상담사 3급", issuer: "한국산업인력공단", note: "국가자격" },
      { name: "상담심리사 2급", issuer: "한국상담심리학회", note: "학회 자격, 대학원 진학 권장" },
    ],
    relatedDepartments: ["psych"],
    activities: ["상담센터 자원봉사", "심리학 대학원 진학 준비", "학부연구생"],
  },
  {
    id: "embedded",
    name: "임베디드·반도체 엔지니어",
    category: "전자·하드웨어",
    description: "칩과 기기를 움직이는 회로와 펌웨어를 설계합니다.",
    skills: { circuit: 3, embedded: 3, systems: 2, programming: 2, math: 1 },
    certifications: [
      { name: "전자기사", issuer: "한국산업인력공단", note: "전자 분야 대표 국가기술자격" },
      { name: "반도체설계기사", issuer: "한국산업인력공단", note: "반도체 설계 직무" },
      { name: "정보처리기사", issuer: "한국산업인력공단", note: "SW 역량 보완" },
    ],
    relatedDepartments: ["ee", "cs"],
    activities: ["아두이노·라즈베리파이 프로젝트", "반도체 교육 프로그램", "학부연구생"],
  },
  {
    id: "content-creator",
    name: "콘텐츠 기획자·PD",
    category: "미디어",
    description: "사람들의 관심을 끄는 영상·글 콘텐츠를 기획하고 제작합니다.",
    skills: { media: 3, writing: 2, communication: 2, marketing: 1, design: 1, data: 1 },
    certifications: [
      { name: "GTQ 그래픽기술자격", issuer: "한국생산성본부", note: "디자인 툴 활용" },
      { name: "컴퓨터활용능력 1급", issuer: "대한상공회의소", note: "사무 역량" },
    ],
    relatedDepartments: ["media", "design"],
    activities: ["유튜브·블로그 채널 운영", "교내 방송국·학보사", "방송사 인턴"],
  },
];

const DATA = { SKILLS, DEPARTMENT_CATALOG, GENERAL_COURSES, UNIVERSITIES, CAREERS };

if (typeof module !== "undefined" && module.exports) {
  module.exports = DATA;
}
