import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { matches } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/api/matches/result")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json() as {
          matchId: number;
          homeScore: number | null;
          awayScore: number | null;
          played: boolean;
        };

        const { matchId, homeScore, awayScore, played } = body;

        await db
          .update(matches)
          .set({ homeScore, awayScore, played })
          .where(eq(matches.id, matchId));

        return Response.json({ ok: true });
      },
    },
  },
});
