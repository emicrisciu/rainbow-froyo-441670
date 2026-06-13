import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { matches } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/matches/teams")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json() as {
          matchId: number;
          homeTeam: string;
          awayTeam: string;
        };

        const { matchId, homeTeam, awayTeam } = body;

        await db
          .update(matches)
          .set({ homeTeam, awayTeam })
          .where(eq(matches.id, matchId));

        return Response.json({ ok: true });
      },
    },
  },
});
