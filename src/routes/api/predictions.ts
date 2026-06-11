import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import { predictions } from "../../../db/schema.js";
import { eq, and } from "drizzle-orm";

export const Route = createFileRoute("/api/predictions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json() as {
          playerId: number;
          matchId: number;
          homeScore: number;
          awayScore: number;
        };

        const { playerId, matchId, homeScore, awayScore } = body;
        if (playerId == null || matchId == null || homeScore == null || awayScore == null) {
          return Response.json({ error: "Missing fields" }, { status: 400 });
        }

        const existing = await db
          .select()
          .from(predictions)
          .where(and(eq(predictions.playerId, playerId), eq(predictions.matchId, matchId)))
          .limit(1);

        if (existing.length > 0) {
          await db
            .update(predictions)
            .set({ homeScore, awayScore, updatedAt: new Date() })
            .where(and(eq(predictions.playerId, playerId), eq(predictions.matchId, matchId)));
        } else {
          await db.insert(predictions).values({ playerId, matchId, homeScore, awayScore });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
