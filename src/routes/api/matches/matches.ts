import { db } from "../../../../db/index.js";
import { matches } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { matchId, homeTeam, awayTeam } = await request.json();

  // Update match teams
  await db
    .update(matches)
    .set({ homeTeam, awayTeam })
    .where(eq(matches.id, matchId));

  return Response.json({ success: true });
}