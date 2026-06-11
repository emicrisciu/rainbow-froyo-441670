CREATE TABLE "matches" (
	"id" serial PRIMARY KEY,
	"stage" text NOT NULL,
	"group_name" text,
	"home_team" text NOT NULL,
	"away_team" text NOT NULL,
	"match_date" text,
	"home_score" integer,
	"away_score" integer,
	"played" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"color" text DEFAULT '#3b82f6' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "predictions" (
	"id" serial PRIMARY KEY,
	"player_id" integer NOT NULL,
	"match_id" integer NOT NULL,
	"home_score" integer NOT NULL,
	"away_score" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_match_id_matches_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id");