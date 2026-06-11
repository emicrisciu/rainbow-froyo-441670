import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: serial().primaryKey(),
  name: text().notNull(),
  color: text().notNull().default("#3b82f6"),
});

export const matches = pgTable("matches", {
  id: serial().primaryKey(),
  stage: text().notNull(), // "group", "r32", "r16", "qf", "sf", "3rd", "final"
  groupName: text("group_name"), // "A", "B", ... or null for knockout
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  matchDate: text("match_date"), // ISO string
  homeScore: integer("home_score"), // null until played
  awayScore: integer("away_score"), // null until played
  played: boolean().notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const predictions = pgTable("predictions", {
  id: serial().primaryKey(),
  playerId: integer("player_id").notNull().references(() => players.id),
  matchId: integer("match_id").notNull().references(() => matches.id),
  homeScore: integer("home_score").notNull(),
  awayScore: integer("away_score").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
