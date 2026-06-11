import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import { players } from "../../../db/schema.js";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";

export const Route = createFileRoute("/api/players")({
  server: {
    handlers: {
      GET: async () => {
        const allPlayers = await db.select().from(players).orderBy(asc(players.id));
        return Response.json(allPlayers);
      },
      PUT: async ({ request }) => {
        const body = await request.json() as { id: number; name: string; color: string }[];
        for (const p of body) {
          await db.update(players).set({ name: p.name, color: p.color }).where(eq(players.id, p.id));
        }
        return Response.json({ ok: true });
      },
    },
  },
});
