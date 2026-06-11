export type MatchSeed = {
  stage: string;
  groupName: string | null;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  sortOrder: number;
};

// FIFA World Cup 2026 — Group Stage matches
// Groups based on the official December 2024 draw
const GROUP_MATCHES: MatchSeed[] = [
  // Group A
  { stage: "group", groupName: "A", homeTeam: "Mexic", awayTeam: "Africa de Sud", matchDate: "2026-06-11", sortOrder: 1 },
  { stage: "group", groupName: "A", homeTeam: "Coreea de Sud", awayTeam: "Cehia", matchDate: "2026-06-12", sortOrder: 2 },
  { stage: "group", groupName: "A", homeTeam: "Cehia", awayTeam: "Africa de Sud", matchDate: "2026-06-18", sortOrder: 3 },
  { stage: "group", groupName: "A", homeTeam: "Mexic", awayTeam: "Coreea de Sud", matchDate: "2026-06-19", sortOrder: 4 },
  { stage: "group", groupName: "A", homeTeam: "Cehia", awayTeam: "Mexic", matchDate: "2026-06-24", sortOrder: 5 },
  { stage: "group", groupName: "A", homeTeam: "Africa de Sud", awayTeam: "Coreea de Sud", matchDate: "2026-06-24", sortOrder: 6 },
  // Group B
  { stage: "group", groupName: "B", homeTeam: "Canada", awayTeam: "Bosnia", matchDate: "2026-06-12", sortOrder: 7 },
  { stage: "group", groupName: "B", homeTeam: "Qatar", awayTeam: "Elvetia", matchDate: "2026-06-13", sortOrder: 8 },
  { stage: "group", groupName: "B", homeTeam: "Elvetia", awayTeam: "Bosnia", matchDate: "2026-06-18", sortOrder: 9 },
  { stage: "group", groupName: "B", homeTeam: "Canada", awayTeam: "Qatar", matchDate: "2026-06-18", sortOrder: 10 },
  { stage: "group", groupName: "B", homeTeam: "Elvetia", awayTeam: "Canada", matchDate: "2026-06-24", sortOrder: 11 },
  { stage: "group", groupName: "B", homeTeam: "Bosnia", awayTeam: "Qatar", matchDate: "2026-06-24", sortOrder: 12 },
  // Group C
  { stage: "group", groupName: "C", homeTeam: "Brazilia", awayTeam: "Maroc", matchDate: "2026-06-13", sortOrder: 13 },
  { stage: "group", groupName: "C", homeTeam: "Haiti", awayTeam: "Scotia", matchDate: "2026-06-13", sortOrder: 14 },
  { stage: "group", groupName: "C", homeTeam: "Maroc", awayTeam: "Scotia", matchDate: "2026-06-17", sortOrder: 15 },
  { stage: "group", groupName: "C", homeTeam: "Haiti", awayTeam: "Brazilia", matchDate: "2026-06-17", sortOrder: 16 },
  { stage: "group", groupName: "C", homeTeam: "Scotia", awayTeam: "Brazilia", matchDate: "2026-06-21", sortOrder: 17 },
  { stage: "group", groupName: "C", homeTeam: "Maroc", awayTeam: "Haiti", matchDate: "2026-06-21", sortOrder: 18 },
  // Group D
  { stage: "group", groupName: "D", homeTeam: "SUA", awayTeam: "Paraguay", matchDate: "2026-06-13", sortOrder: 19 },
  { stage: "group", groupName: "D", homeTeam: "Australia", awayTeam: "Turcia", matchDate: "2026-06-14", sortOrder: 20 },
  { stage: "group", groupName: "D", homeTeam: "Australia", awayTeam: "SUA", matchDate: "2026-06-17", sortOrder: 21 },
  { stage: "group", groupName: "D", homeTeam: "Paraguay", awayTeam: "Turcia", matchDate: "2026-06-18", sortOrder: 22 },
  { stage: "group", groupName: "D", homeTeam: "Turcia", awayTeam: "SUA", matchDate: "2026-06-21", sortOrder: 23 },
  { stage: "group", groupName: "D", homeTeam: "Paraguay", awayTeam: "Australia", matchDate: "2026-06-21", sortOrder: 24 },
  // Group E
  { stage: "group", groupName: "E", homeTeam: "Germania", awayTeam: "Curaçao", matchDate: "2026-06-14", sortOrder: 25 },
  { stage: "group", groupName: "E", homeTeam: "Coasta de Fildeș", awayTeam: "Ecuador", matchDate: "2026-06-14", sortOrder: 26 },
  { stage: "group", groupName: "E", homeTeam: "Coasta de Fildeș", awayTeam: "Japan", matchDate: "2026-06-18", sortOrder: 27 },
  { stage: "group", groupName: "E", homeTeam: "Curaçao", awayTeam: "Nigeria", matchDate: "2026-06-18", sortOrder: 28 },
  { stage: "group", groupName: "E", homeTeam: "Spain", awayTeam: "Nigeria", matchDate: "2026-06-22", sortOrder: 29 },
  { stage: "group", groupName: "E", homeTeam: "Curaçao", awayTeam: "Coasta de Fildeș", matchDate: "2026-06-22", sortOrder: 30 },
  // Group F
  { stage: "group", groupName: "F", homeTeam: "Germany", awayTeam: "Colombia", matchDate: "2026-06-14", sortOrder: 31 },
  { stage: "group", groupName: "F", homeTeam: "Ecuador", awayTeam: "Cameroon", matchDate: "2026-06-14", sortOrder: 32 },
  { stage: "group", groupName: "F", homeTeam: "Germany", awayTeam: "Germania", matchDate: "2026-06-18", sortOrder: 33 },
  { stage: "group", groupName: "F", homeTeam: "Colombia", awayTeam: "Cameroon", matchDate: "2026-06-19", sortOrder: 34 },
  { stage: "group", groupName: "F", homeTeam: "Germany", awayTeam: "Germania", matchDate: "2026-06-22", sortOrder: 35 },
  { stage: "group", groupName: "F", homeTeam: "Colombia", awayTeam: "Ecuador", matchDate: "2026-06-22", sortOrder: 36 },
  // Group G
  { stage: "group", groupName: "G", homeTeam: "England", awayTeam: "Kenya", matchDate: "2026-06-15", sortOrder: 37 },
  { stage: "group", groupName: "G", homeTeam: "Netherlands", awayTeam: "Iran", matchDate: "2026-06-15", sortOrder: 38 },
  { stage: "group", groupName: "G", homeTeam: "England", awayTeam: "Netherlands", matchDate: "2026-06-19", sortOrder: 39 },
  { stage: "group", groupName: "G", homeTeam: "Iran", awayTeam: "Kenya", matchDate: "2026-06-19", sortOrder: 40 },
  { stage: "group", groupName: "G", homeTeam: "England", awayTeam: "Iran", matchDate: "2026-06-23", sortOrder: 41 },
  { stage: "group", groupName: "G", homeTeam: "Netherlands", awayTeam: "Kenya", matchDate: "2026-06-23", sortOrder: 42 },
  // Group H
  { stage: "group", groupName: "H", homeTeam: "Portugal", awayTeam: "Morocco", matchDate: "2026-06-15", sortOrder: 43 },
  { stage: "group", groupName: "H", homeTeam: "Cuba", awayTeam: "Venezuela", matchDate: "2026-06-15", sortOrder: 44 },
  { stage: "group", groupName: "H", homeTeam: "Portugal", awayTeam: "Cuba", matchDate: "2026-06-19", sortOrder: 45 },
  { stage: "group", groupName: "H", homeTeam: "Morocco", awayTeam: "Venezuela", matchDate: "2026-06-20", sortOrder: 46 },
  { stage: "group", groupName: "H", homeTeam: "Portugal", awayTeam: "Venezuela", matchDate: "2026-06-23", sortOrder: 47 },
  { stage: "group", groupName: "H", homeTeam: "Morocco", awayTeam: "Cuba", matchDate: "2026-06-23", sortOrder: 48 },
  // Group I
  { stage: "group", groupName: "I", homeTeam: "Belgium", awayTeam: "Egypt", matchDate: "2026-06-15", sortOrder: 49 },
  { stage: "group", groupName: "I", homeTeam: "Italy", awayTeam: "South Korea", matchDate: "2026-06-16", sortOrder: 50 },
  { stage: "group", groupName: "I", homeTeam: "Belgium", awayTeam: "Italy", matchDate: "2026-06-19", sortOrder: 51 },
  { stage: "group", groupName: "I", homeTeam: "Egypt", awayTeam: "South Korea", matchDate: "2026-06-20", sortOrder: 52 },
  { stage: "group", groupName: "I", homeTeam: "Belgium", awayTeam: "South Korea", matchDate: "2026-06-24", sortOrder: 53 },
  { stage: "group", groupName: "I", homeTeam: "Italy", awayTeam: "Egypt", matchDate: "2026-06-24", sortOrder: 54 },
  // Group J
  { stage: "group", groupName: "J", homeTeam: "Serbia", awayTeam: "Tunisia", matchDate: "2026-06-16", sortOrder: 55 },
  { stage: "group", groupName: "J", homeTeam: "Czech Republic", awayTeam: "Honduras", matchDate: "2026-06-16", sortOrder: 56 },
  { stage: "group", groupName: "J", homeTeam: "Serbia", awayTeam: "Czech Republic", matchDate: "2026-06-20", sortOrder: 57 },
  { stage: "group", groupName: "J", homeTeam: "Tunisia", awayTeam: "Honduras", matchDate: "2026-06-20", sortOrder: 58 },
  { stage: "group", groupName: "J", homeTeam: "Serbia", awayTeam: "Honduras", matchDate: "2026-06-24", sortOrder: 59 },
  { stage: "group", groupName: "J", homeTeam: "Czech Republic", awayTeam: "Tunisia", matchDate: "2026-06-24", sortOrder: 60 },
  // Group K
  { stage: "group", groupName: "K", homeTeam: "Saudi Arabia", awayTeam: "Ukraine", matchDate: "2026-06-16", sortOrder: 61 },
  { stage: "group", groupName: "K", homeTeam: "Australia", awayTeam: "Slovakia", matchDate: "2026-06-17", sortOrder: 62 },
  { stage: "group", groupName: "K", homeTeam: "Saudi Arabia", awayTeam: "Australia", matchDate: "2026-06-20", sortOrder: 63 },
  { stage: "group", groupName: "K", homeTeam: "Ukraine", awayTeam: "Slovakia", matchDate: "2026-06-21", sortOrder: 64 },
  { stage: "group", groupName: "K", homeTeam: "Saudi Arabia", awayTeam: "Slovakia", matchDate: "2026-06-25", sortOrder: 65 },
  { stage: "group", groupName: "K", homeTeam: "Ukraine", awayTeam: "Australia", matchDate: "2026-06-25", sortOrder: 66 },
  // Group L
  { stage: "group", groupName: "L", homeTeam: "Switzerland", awayTeam: "Ivory Coast", matchDate: "2026-06-17", sortOrder: 67 },
  { stage: "group", groupName: "L", homeTeam: "Costa Rica", awayTeam: "Tanzania", matchDate: "2026-06-17", sortOrder: 68 },
  { stage: "group", groupName: "L", homeTeam: "Switzerland", awayTeam: "Costa Rica", matchDate: "2026-06-21", sortOrder: 69 },
  { stage: "group", groupName: "L", homeTeam: "Ivory Coast", awayTeam: "Tanzania", matchDate: "2026-06-21", sortOrder: 70 },
  { stage: "group", groupName: "L", homeTeam: "Switzerland", awayTeam: "Tanzania", matchDate: "2026-06-25", sortOrder: 71 },
  { stage: "group", groupName: "L", homeTeam: "Costa Rica", awayTeam: "Ivory Coast", matchDate: "2026-06-25", sortOrder: 72 },
];

// Knockout stage placeholders
const KNOCKOUT_MATCHES: MatchSeed[] = [
  // Round of 32 (16 matches)
  { stage: "r32", groupName: null, homeTeam: "1A", awayTeam: "3D/E/F", matchDate: "2026-06-28", sortOrder: 73 },
  { stage: "r32", groupName: null, homeTeam: "1B", awayTeam: "3A/C/D", matchDate: "2026-06-28", sortOrder: 74 },
  { stage: "r32", groupName: null, homeTeam: "1C", awayTeam: "3G/H/I", matchDate: "2026-06-28", sortOrder: 75 },
  { stage: "r32", groupName: null, homeTeam: "1D", awayTeam: "3B/E/F", matchDate: "2026-06-29", sortOrder: 76 },
  { stage: "r32", groupName: null, homeTeam: "1E", awayTeam: "3A/B/C", matchDate: "2026-06-29", sortOrder: 77 },
  { stage: "r32", groupName: null, homeTeam: "1F", awayTeam: "3J/K/L", matchDate: "2026-06-29", sortOrder: 78 },
  { stage: "r32", groupName: null, homeTeam: "1G", awayTeam: "3D/G/H", matchDate: "2026-06-30", sortOrder: 79 },
  { stage: "r32", groupName: null, homeTeam: "1H", awayTeam: "3I/J/K", matchDate: "2026-06-30", sortOrder: 80 },
  { stage: "r32", groupName: null, homeTeam: "2A", awayTeam: "2C", matchDate: "2026-06-30", sortOrder: 81 },
  { stage: "r32", groupName: null, homeTeam: "2B", awayTeam: "2D", matchDate: "2026-07-01", sortOrder: 82 },
  { stage: "r32", groupName: null, homeTeam: "1I", awayTeam: "3A/B/F", matchDate: "2026-07-01", sortOrder: 83 },
  { stage: "r32", groupName: null, homeTeam: "2E", awayTeam: "2G", matchDate: "2026-07-01", sortOrder: 84 },
  { stage: "r32", groupName: null, homeTeam: "2F", awayTeam: "2H", matchDate: "2026-07-02", sortOrder: 85 },
  { stage: "r32", groupName: null, homeTeam: "1J", awayTeam: "3C/G/I", matchDate: "2026-07-02", sortOrder: 86 },
  { stage: "r32", groupName: null, homeTeam: "2I", awayTeam: "2K", matchDate: "2026-07-02", sortOrder: 87 },
  { stage: "r32", groupName: null, homeTeam: "1K", awayTeam: "1L", matchDate: "2026-07-03", sortOrder: 88 },
  // Round of 16
  { stage: "r16", groupName: null, homeTeam: "W49", awayTeam: "W50", matchDate: "2026-07-04", sortOrder: 89 },
  { stage: "r16", groupName: null, homeTeam: "W51", awayTeam: "W52", matchDate: "2026-07-04", sortOrder: 90 },
  { stage: "r16", groupName: null, homeTeam: "W53", awayTeam: "W54", matchDate: "2026-07-05", sortOrder: 91 },
  { stage: "r16", groupName: null, homeTeam: "W55", awayTeam: "W56", matchDate: "2026-07-05", sortOrder: 92 },
  { stage: "r16", groupName: null, homeTeam: "W57", awayTeam: "W58", matchDate: "2026-07-06", sortOrder: 93 },
  { stage: "r16", groupName: null, homeTeam: "W59", awayTeam: "W60", matchDate: "2026-07-06", sortOrder: 94 },
  { stage: "r16", groupName: null, homeTeam: "W61", awayTeam: "W62", matchDate: "2026-07-07", sortOrder: 95 },
  { stage: "r16", groupName: null, homeTeam: "W63", awayTeam: "W64", matchDate: "2026-07-07", sortOrder: 96 },
  // Quarter-finals
  { stage: "qf", groupName: null, homeTeam: "W65", awayTeam: "W66", matchDate: "2026-07-10", sortOrder: 97 },
  { stage: "qf", groupName: null, homeTeam: "W67", awayTeam: "W68", matchDate: "2026-07-10", sortOrder: 98 },
  { stage: "qf", groupName: null, homeTeam: "W69", awayTeam: "W70", matchDate: "2026-07-11", sortOrder: 99 },
  { stage: "qf", groupName: null, homeTeam: "W71", awayTeam: "W72", matchDate: "2026-07-11", sortOrder: 100 },
  // Semi-finals
  { stage: "sf", groupName: null, homeTeam: "W73", awayTeam: "W74", matchDate: "2026-07-14", sortOrder: 101 },
  { stage: "sf", groupName: null, homeTeam: "W75", awayTeam: "W76", matchDate: "2026-07-15", sortOrder: 102 },
  // 3rd place
  { stage: "3rd", groupName: null, homeTeam: "L75", awayTeam: "L76", matchDate: "2026-07-18", sortOrder: 103 },
  // Final
  { stage: "final", groupName: null, homeTeam: "W77", awayTeam: "W78", matchDate: "2026-07-19", sortOrder: 104 },
];

export const ALL_MATCHES: MatchSeed[] = [...GROUP_MATCHES, ...KNOCKOUT_MATCHES];

export const DEFAULT_PLAYERS = [
  { name: "Jucător 1", color: "#3b82f6" },
  { name: "Jucător 2", color: "#10b981" },
  { name: "Jucător 3", color: "#f59e0b" },
];
