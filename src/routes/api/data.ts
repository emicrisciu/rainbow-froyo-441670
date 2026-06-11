import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import { matches, players, predictions } from "../../../db/schema.js";
import { asc } from "drizzle-orm";

export const Route = createFileRoute("/api/data")({
  server: {
    handlers: {
      GET: async () => {
        const allPlayers = await db.select().from(players).orderBy(asc(players.id));
        const allMatches = await db.select().from(matches).orderBy(asc(matches.sortOrder));
        const allPredictions = await db.select().from(predictions);
        return Response.json({ players: allPlayers, matches: allMatches, predictions: allPredictions });
      },
    },
  },
});
