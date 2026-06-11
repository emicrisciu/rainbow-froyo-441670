import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import { matches, players, predictions } from "../../../db/schema.js";
import { ALL_MATCHES, DEFAULT_PLAYERS } from "../../data/matches.js";
import { eq, asc } from "drizzle-orm";

async function ensureSeeded() {
  const existingPlayers = await db.select().from(players).limit(1);
  if (existingPlayers.length === 0) {
    await db.insert(players).values(DEFAULT_PLAYERS);
  }
  const existingMatches = await db.select().from(matches).limit(1);
  if (existingMatches.length === 0) {
    await db.insert(matches).values(ALL_MATCHES);
  }
}

export const Route = createFileRoute("/api/init")({
  server: {
    handlers: {
      POST: async () => {
        await ensureSeeded();
        const allPlayers = await db.select().from(players).orderBy(asc(players.id));
        const allMatches = await db.select().from(matches).orderBy(asc(matches.sortOrder));
        return Response.json({ players: allPlayers, matches: allMatches });
      },
    },
  },
});
