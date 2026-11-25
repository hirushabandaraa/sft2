export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  accent?: 'primary' | 'secondary' | 'default';
}

export interface TermMarkPoint {
  term: string;
  average: number;
  mcqAvg: number;
  essayAvg: number;
  color: string;
}

export interface CohortData {
  id: '2025' | '2024';
  label: string;
  sampleSize: number;
  gainLabel: string;
  points: TermMarkPoint[];
}

export interface SyllabusUnit {
  number: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  lessonsCount: number;
}

export interface MethodStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export type RecordingCategory = 'theory' | 'revision' | 'papers' | 'moments';

export interface LessonChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface RecordingItem {
  id: string;
  category: RecordingCategory;
  categoryLabel: string;
  categoryStyle: 'secondary' | 'primary' | 'success';
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  imageUrl: string;
  imageAlt: string;
  isPortrait?: boolean;
  tuteTitle: string;
  keyFormulas: string[];
  chapters: LessonChapter[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  initial: string;
  school: string;
  district: string;
  grade: string;
  quote: string;
  avatarVariant: 'primary' | 'secondary';
}

export interface ClassScheduleItem {
  id: string;
  batchValue: string;
  stream: string;
  day: string;
  time: string;
  format: string;
  formatStyle: 'secondary' | 'primary' | 'success';
  centers: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const PORTRAIT_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrApcnknHXRiWBQP4rgqQesoJxrdrC3Sz8GzDjsaB5rWc6QBuLkLMBOuGq6jjmhAdHFu_HgiQsIC1NzSNsiMYK5DzEFdIKtE3GPjA-F9mCW-Yz73UaDFm26HcDYaWF7JNXIy4onG31kgsgqLWr5Vkd6BezAlPnYKdwZFlyALt7aAEdrK1D-igFeceNCHGBzgpee1pvbE8M9YA92UZJuQGUYm8LpcycFH7wHEzQZMLvK0puPFHD1P60mtpTw';

export const HERO_KPIS: KpiMetric[] = [
  {
    id: 'pass-rate',
    label: 'PASS RATE',
    value: '95%',
    description: 'Island-wide A/L SFT pass rate',
    accent: 'primary',
  },
  {
    id: 'paper-archive',
    label: 'PAPER ARCHIVE',
    value: '50+',
    description: 'Full past & model paper discussions',
    accent: 'default',
  },
  {
    id: 'island-reach',
    label: 'ISLAND REACH',
    value: '20+',
    description: 'Districts joining live every week',
    accent: 'default',
  },
  {
    id: 'tracking',
    label: 'TRACKING',
    value: 'Weekly',
    description: 'Individual term & MCQ analytics',
    accent: 'secondary',
  },
];

export const COHORT_RESULTS: Record<'2025' | '2024', CohortData> = {
  '2025': {
    id: '2025',
    label: '2025 Cohort (n = 420)',
    sampleSize: 420,
    gainLabel: '+37% Cohort Avg Gain',
    points: [
      { term: 'Term 01', average: 44, mcqAvg: 21, essayAvg: 23, color: '#DAE2FD' },
      { term: 'Term 02', average: 56, mcqAvg: 27, essayAvg: 29, color: '#B4C5FF' },
      { term: 'Term 03', average: 68, mcqAvg: 33, essayAvg: 35, color: '#06B6D4' },
      { term: 'Term 04', average: 76, mcqAvg: 37, essayAvg: 39, color: '#2563EB' },
      { term: 'Final Mock', average: 81, mcqAvg: 40, essayAvg: 41, color: '#004AC6' },
    ],
  },
  '2024': {
    id: '2024',
    label: '2024 Cohort (n = 365)',
    sampleSize: 365,
    gainLabel: '+35% Cohort Avg Gain',
    points: [
      { term: 'Term 01', average: 43, mcqAvg: 20, essayAvg: 23, color: '#DAE2FD' },
      { term: 'Term 02', average: 54, mcqAvg: 26, essayAvg: 28, color: '#B4C5FF' },
      { term: 'Term 03', average: 65, mcqAvg: 31, essayAvg: 34, color: '#06B6D4' },
      { term: 'Term 04', average: 73, mcqAvg: 36, essayAvg: 37, color: '#2563EB' },
      { term: 'Final Mock', average: 78, mcqAvg: 38, essayAvg: 40, color: '#004AC6' },
    ],
  },
};

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  { number: 'Unit 01', title: 'Introduction to Science & Measurement', status: 'completed', lessonsCount: 6 },
  { number: 'Unit 02', title: 'Mechanics: Kinematics & Equilibrium', status: 'completed', lessonsCount: 10 },
  { number: 'Unit 03', title: 'Rotational Motion & Work-Energy', status: 'completed', lessonsCount: 8 },
  { number: 'Unit 04', title: 'Properties of Matter & Fluid Mechanics', status: 'completed', lessonsCount: 7 },
  { number: 'Unit 05', title: 'Thermodynamics & Heat Engines', status: 'completed', lessonsCount: 8 },
  { number: 'Unit 06', title: 'Oscillations, Waves & Optics', status: 'completed', lessonsCount: 9 },
  { number: 'Unit 07', title: 'Electrostatics & Current Electricity', status: 'completed', lessonsCount: 10 },
  { number: 'Unit 08', title: 'Electromagnetism & Basic Electronics', status: 'completed', lessonsCount: 9 },
  { number: 'Unit 09', title: 'Atomic Structure & Chemical Bonding', status: 'completed', lessonsCount: 7 },
  { number: 'Unit 10', title: 'Organic Chemistry & Polymers', status: 'completed', lessonsCount: 8 },
  { number: 'Unit 11', title: 'Industrial Chemistry & Corrosion', status: 'in-progress', lessonsCount: 6 },
  { number: 'Unit 12', title: 'Microbiology & Environmental Tech', status: 'upcoming', lessonsCount: 5 },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    step: 'STEP 01',
    title: 'Theory & Practicals',
    description:
      'Complete syllabus coverage finished a full month before A/L exams with live lab demonstrations.',
    deliverable: 'Printed & PDF Unit Tutes',
  },
  {
    step: 'STEP 02',
    title: 'Timing Papers',
    description:
      'Short timed drills in every session to build MCQ speed and structured calculation accuracy.',
    deliverable: '25-Min Weekly Speed Drills',
  },
  {
    step: 'STEP 03',
    title: 'Weekly Recall Tutes',
    description:
      'Concise weekly revision sheets that keep earlier mechanics, thermo, and chemistry units fresh.',
    deliverable: 'Cumulative Concept Sheets',
  },
  {
    step: 'STEP 04',
    title: 'Final Paper Classes',
    description:
      'Island-wide ranked mock exams across 20+ districts with full marking-scheme breakdowns.',
    deliverable: 'District & Island Rank List',
  },
  {
    step: 'STEP 05',
    title: 'Practical Viva & Graph Lab',
    description:
      'Dedicated walkthroughs of all SFT school-based practical experiments, error analysis, and gradient questions.',
    deliverable: 'Practical Workbook',
  },
  {
    step: 'STEP 06',
    title: 'Individual Score Diagnostics',
    description:
      'Unit-by-unit tracking on student scorecards to pinpoint weak calculation areas before term exams.',
    deliverable: 'Personal Progress Report',
  },
  {
    step: 'STEP 07',
    title: 'Night-Before Rapid Seminars',
    description:
      'High-yield formula clinics and final 10-year trend reviews in the closing 4 weeks before A/L.',
    deliverable: 'Exam Hall Formula Pack',
  },
];

export const RECORDINGS: RecordingItem[] = [
  {
    id: 'rec-mechanics',
    category: 'theory',
    categoryLabel: '2026 Theory',
    categoryStyle: 'secondary',
    title: 'Unit 03: Mechanics & Rotational Motion',
    description:
      'Torque, angular momentum, and equilibrium applications with worked examples.',
    duration: '54:20',
    durationSeconds: 3260,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrC_NMkC104RaWwNeiQx0_zSQIM2Zc_S_HSFfkBHXWK9YZFkLj6bAEIp-kgrBXNFQFnfC7RI5KNIVuRjr0babTVj8-OlqroxogW1YPGGKw_Qx0sWk0ZaPUKwyC654SxhENB_0wEe-NV5uQILo8sAKZux8HcLj-j4oLkb93J9Pny2ZmGxAKCAhgrZhgg-fkGkPsftHn-YR9EpjDXNBXyMZWz1fFuo6A1peNrLQYEWwhlPy9RtuHQ6Hd3c6gk',
    imageAlt: 'Unit 03 Mechanics and Rotational Motion',
    tuteTitle: 'Unit 03 — Rotational Dynamics & Torque Tute (24 pages)',
    keyFormulas: ['τ = F × r sinθ', 'L = Iω', 'Στ = Iα', 'KE_rot = ½Iω²'],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Moment of Force & Couple Systems' },
      { time: '14:35', seconds: 875, title: 'Conditions for Rigid Body Equilibrium' },
      { time: '31:10', seconds: 1870, title: 'Angular Momentum Conservation Examples' },
      { time: '44:50', seconds: 2690, title: '2022–2024 Past Paper MCQ Walkthrough' },
    ],
  },
  {
    id: 'rec-thermo',
    category: 'revision',
    categoryLabel: '2026 Revision',
    categoryStyle: 'primary',
    title: 'Unit 05: Thermodynamics & Heat Engines',
    description:
      'Rapid-fire formulas for specific heat capacity, calorimetry, and thermal efficiency.',
    duration: '48:15',
    durationSeconds: 2895,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrDTMBYqvp1JtbBWW24m81hzotl9bEJCTNXEsYKKxArbZIJB_wsVBR9PH5hMAC29SA7wBpwiGL3r22IHk9ugap0QeXe8LldFmqbSQ687-6mSgQw7Rl52J9d3G6SShteIYN1RNpwUYzpNLfmfBXe1iRKSa315PItskD-VRVuLA18x6z9_nh0PP1eHCKlTgL1nUdusFk_yaoInXPDJjVj4VCIqyooIqcI_OZ_4oOKzCRhgjWS-LHtOpDwE1ERL92E2',
    imageAlt: 'Unit 05 Thermodynamics and Heat Engines',
    tuteTitle: 'Unit 05 — Rapid Revision Formula & Calorimetry Sheet',
    keyFormulas: ['Q = mcΔθ', 'Q = mL', 'ΔU = Q − W', 'η = 1 − (T_c / T_h)'],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Calorimetry & Mixture Temperature Method' },
      { time: '15:20', seconds: 920, title: 'Latent Heat & Phase Change Graphs' },
      { time: '28:40', seconds: 1720, title: 'First Law of Thermodynamics & PV Diagrams' },
      { time: '39:05', seconds: 2345, title: 'Timed Structured Calculation Drill' },
    ],
  },
  {
    id: 'rec-papers',
    category: 'papers',
    categoryLabel: 'Paper Class',
    categoryStyle: 'success',
    title: '2024 A/L SFT Paper II: Structured Essay',
    description:
      'Full marking-scheme breakdown showing how to secure full marks on Part B.',
    duration: '01:12:40',
    durationSeconds: 4360,
    imageUrl:
      'https://lh3.googleusercontent.com/aida/ALJJyrBL92LXZAg9JP-39tGvQY0BOuErUeXil4q6o__7HqQjcvq61djwItUv6ZUnOsk0LW52gyj9c2VkE5bLxIykuR3QiWoe8k16_jRXnYFLP2U5cJqP-nJeVIpLM6fjbcLXNWxWaod6P1Ie4tpJwj1pfPAA6e-Zi6sc92ICxaM9aFvd4oDHKaA4SHLM5g4OYGYDrS5mz5rp85mvZOMj0LAFqd0cq-NVjoOlYYYuzZltla4sUqqvmSJ0MJWO3yiJyA',
    imageAlt: '2024 A/L SFT Paper II Structured Essay',
    tuteTitle: '2024 A/L SFT Paper II Official Marking Scheme Pack',
    keyFormulas: ['Gradient = Δy / Δx', 'V = IR (Ohmic Plot)', 'pH = −log[H⁺]', 'Efficiency = P_out / P_in'],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Part A Q1: Measurement & Practical Graph' },
      { time: '21:15', seconds: 1275, title: 'Part A Q3: Organic Titration & Stoichiometry' },
      { time: '42:30', seconds: 2550, title: 'Part B Q5: Electronics & Logic Gates' },
      { time: '58:10', seconds: 3490, title: 'Common Examiner Deductions to Avoid' },
    ],
  },
  {
    id: 'rec-moment-1',
    category: 'moments',
    categoryLabel: 'Classroom Short',
    categoryStyle: 'secondary',
    title: 'Live SFT Class Highlight — Part 01',
    description:
      'Inside our physical & online A/L SFT session with Hirusha Bandara.',
    duration: '00:24',
    durationSeconds: 24,
    imageUrl: '/src/assets/images/classroom_moment_one_1795642431660.jpg',
    imageAlt: 'Hirusha Bandara teaching Mechanics vector resolution in lecture hall',
    isPortrait: true,
    tuteTitle: 'Colombo Hall — Mechanics Vector Resolution Live Clip',
    keyFormulas: ['Fx = F cosθ', 'Fy = F sinθ', 'R = √(Fx² + Fy²)'],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Resolving Inclined Forces on Board' },
      { time: '00:12', seconds: 12, title: 'Instant Student Check & Q&A' },
    ],
  },
  {
    id: 'rec-moment-2',
    category: 'moments',
    categoryLabel: 'Classroom Short',
    categoryStyle: 'secondary',
    title: 'Live SFT Class Highlight — Part 02',
    description:
      'Student engagement and interactive concept breakdown in class.',
    duration: '00:20',
    durationSeconds: 20,
    imageUrl: '/src/assets/images/classroom_moment_two_1795642432040.jpg',
    imageAlt: 'Students collaborating on engineering science circuits and calculations',
    isPortrait: true,
    tuteTitle: 'Peer Problem Solving — Applied Circuits Workshop',
    keyFormulas: ['R_total = R1 + R2', 'P = I²R', 'V_out = V_in × R2/(R1+R2)'],
    chapters: [
      { time: '00:00', seconds: 0, title: 'Group Circuit Analysis Drill' },
      { time: '00:10', seconds: 10, title: 'Timed Check-In Before Paper Review' },
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-nethmi',
    name: 'Nethmi Jayawardena',
    initial: 'N',
    school: 'Visakha Vidyalaya',
    district: 'Colombo',
    grade: 'A Grade - SFT',
    quote:
      'I struggled with Mechanics and Electronics until joining Hirusha Sir’s revision class. His visual diagrams and timed past paper drills helped me jump from 48% to an A.',
    avatarVariant: 'primary',
  },
  {
    id: 'rev-tharindu',
    name: 'Tharindu Wickramasinghe',
    initial: 'T',
    school: 'Dharmaraja College',
    district: 'Kandy',
    grade: 'A Grade - SFT',
    quote:
      'The online recordings library saved me hours every week. Being able to pause, replay derivations, and check weekly assessment feedback kept me consistent all year.',
    avatarVariant: 'secondary',
  },
  {
    id: 'rev-kasun',
    name: 'Kasun Rajapaksha',
    initial: 'K',
    school: 'Richmond College',
    district: 'Galle',
    grade: 'A Grade - SFT',
    quote:
      'Sir explains practical units and structured essay marking schemes so clearly. I entered the A/L hall feeling completely prepared for every calculation and graph question.',
    avatarVariant: 'primary',
  },
];

export const TIMETABLE_ROWS: ClassScheduleItem[] = [
  {
    id: 'batch-2026-theory',
    batchValue: '2026 A/L Theory',
    stream: '2026 Theory',
    day: 'Saturday',
    time: '08:00 AM – 12:30 PM',
    format: 'Hybrid',
    formatStyle: 'secondary',
    centers: 'Colombo (Nugegoda) + Live Zoom',
  },
  {
    id: 'batch-2027-theory',
    batchValue: '2027 A/L Theory',
    stream: '2027 Theory',
    day: 'Sunday',
    time: '08:30 AM – 01:00 PM',
    format: 'Hybrid',
    formatStyle: 'secondary',
    centers: 'Kandy (Peradeniya Rd) + Live Zoom',
  },
  {
    id: 'batch-2026-revision',
    batchValue: '2026 A/L Revision + Paper',
    stream: '2026 Revision',
    day: 'Wednesday',
    time: '06:30 PM – 09:30 PM',
    format: 'Live Zoom',
    formatStyle: 'primary',
    centers: 'Island-wide Online Studio',
  },
  {
    id: 'batch-paper-class',
    batchValue: '2026 A/L Revision + Paper',
    stream: 'Paper Class',
    day: 'Friday',
    time: '04:00 PM – 07:30 PM',
    format: 'Island-wide',
    formatStyle: 'success',
    centers: 'Colombo, Kandy & Live Online',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-join',
    question: 'How do I join the next live class?',
    answer:
      'Fill out the Quick Registration form above with your batch year and WhatsApp number. You will receive the Zoom link, timetable, and Unit 01 PDF tute within minutes.',
  },
  {
    id: 'faq-missed',
    question: 'What happens if I miss a live lesson?',
    answer:
      'Every session is recorded in HD and uploaded to the Class Recordings Library the same evening, so you can replay any explanation or derivation at your own pace.',
  },
  {
    id: 'faq-tracking',
    question: 'How is my weekly progress tracked?',
    answer:
      'Students complete weekly timed MCQs and monthly term papers. Scores are logged into your student profile so you and your parents can track improvement across every unit.',
  },
  {
    id: 'faq-centers',
    question: 'Where are physical classes held and can I switch between physical and online?',
    answer:
      'Physical sessions run in Colombo (Nugegoda) and Kandy, while all students receive full Live Zoom access and on-demand HD recordings inside the Student Portal.',
  },
];
