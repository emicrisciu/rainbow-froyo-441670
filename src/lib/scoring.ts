export type Player = { id: number; name: string; color: string };
export type Match = {
  id: number;
  stage: string;
  groupName: string | null;
  homeTeam: string;
  awayTeam: string;
  matchDate: string | null;
  homeScore: number | null;
  awayScore: number | null;
  played: boolean;
  sortOrder: number;
};
export type Prediction = {
  id: number;
  playerId: number;
  matchId: number;
  homeScore: number;
  awayScore: number;
};

export function calcPoints(
  predHome: number,
  predAway: number,
  realHome: number,
  realAway: number
): number {
  if (predHome === realHome && predAway === realAway) return 10;

  const predResult = predHome > predAway ? "H" : predHome < predAway ? "A" : "D";
  const realResult = realHome > realAway ? "H" : realHome < realAway ? "A" : "D";

  if (predResult === realResult) return 5;
  return 0;
}

export function computeLeaderboard(
  players: Player[],
  matches: Match[],
  predictions: Prediction[]
): { player: Player; points: number; exact: number; winner: number; wrong: number }[] {
  return players
    .map((player) => {
      let points = 0;
      let exact = 0;
      let winner = 0;
      let wrong = 0;

      const playedMatches = matches.filter((m) => m.played && m.homeScore != null && m.awayScore != null);
      for (const match of playedMatches) {
        const pred = predictions.find((p) => p.playerId === player.id && p.matchId === match.id);
        if (!pred) { wrong++; continue; }
        const pts = calcPoints(pred.homeScore, pred.awayScore, match.homeScore!, match.awayScore!);
        points += pts;
        if (pts === 10) exact++;
        else if (pts === 5) winner++;
        else wrong++;
      }

      return { player, points, exact, winner, wrong };
    })
    .sort((a, b) => b.points - a.points);
}

export const STAGE_LABELS: Record<string, string> = {
  group: "Grupe",
  r32: "Șaisprezecimi",
  r16: "Optimi",
  qf: "Sferturi",
  sf: "Semifinale",
  "3rd": "Locul 3",
  final: "Finala",
};
