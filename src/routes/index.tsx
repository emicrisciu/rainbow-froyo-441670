import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { calcPoints, computeLeaderboard, STAGE_LABELS } from "../lib/scoring.js";
import type { Player, Match, Prediction } from "../lib/scoring.js";

export const Route = createFileRoute("/")({
  component: App,
});

type Tab = "predictions" | "leaderboard" | "admin" | "teams" | "settings";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("predictions");
  const [loading, setLoading] = useState(true);
  const [filterStage, setFilterStage] = useState<string>("all");
  const [filterGroup, setFilterGroup] = useState<string>("all");

  const loadData = useCallback(async () => {
    const res = await fetch("/api/data");
    const data = await res.json();
    setPlayers(data.players);
    setMatches(data.matches);
    setPredictions(data.predictions);
  }, []);

  useEffect(() => {
    (async () => {
      await fetch("/api/init", { method: "POST" });
      await loadData();
      setLoading(false);
    })();
  }, [loadData]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-950">
      <Header />
      <nav className="bg-black/30 border-b border-white/10 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {(["predictions", "leaderboard", "admin", "settings"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab === "predictions" && "⚽ Pronosticuri"}
              {tab === "leaderboard" && "🏆 Clasament"}
              {tab === "admin" && "🔧 Rezultate"}
              {tab === "teams" && "👥 Echipe"}
              {tab === "settings" && "⚙️ Setări"}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "predictions" && (
          <PredictionsTab
            players={players}
            matches={matches}
            predictions={predictions}
            filterStage={filterStage}
            filterGroup={filterGroup}
            setFilterStage={setFilterStage}
            setFilterGroup={setFilterGroup}
            onSaved={loadData}
          />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardTab players={players} matches={matches} predictions={predictions} />
        )}
        {activeTab === "admin" && (
          <AdminTab matches={matches} onSaved={loadData} />
        )}
        {activeTab === "teams" && (
          <TeamsTab matches={matches} onSaved={loadData} />
        )}
        {activeTab === "settings" && (
          <SettingsTab players={players} onSaved={loadData} />
        )}
      </main>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 to-emerald-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">⚽</div>
        <div className="text-white text-xl font-semibold animate-pulse">Se încarcă...</div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-700 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
        <div className="text-5xl">🌍</div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Cupa Mondială 2026
          </h1>
          <p className="text-green-200 text-sm">Joc de pronosticuri • 3 jucători</p>
        </div>
      </div>
    </div>
  );
}

// ─── Predictions Tab ─────────────────────────────────────────────────────────

function PredictionsTab({
  players, matches, predictions, filterStage, filterGroup,
  setFilterStage, setFilterGroup, onSaved,
}: {
  players: Player[];
  matches: Match[];
  predictions: Prediction[];
  filterStage: string;
  filterGroup: string;
  setFilterStage: (s: string) => void;
  setFilterGroup: (g: string) => void;
  onSaved: () => void;
}) {
  const stages = ["all", ...Array.from(new Set(matches.map((m) => m.stage)))];
  const groups = ["all", ...Array.from(new Set(matches.filter((m) => m.groupName).map((m) => m.groupName!))).sort()];

  const filtered = matches.filter((m) => {
    if (filterStage !== "all" && m.stage !== filterStage) return false;
    if (filterGroup !== "all" && m.groupName !== filterGroup) return false;
    return true;
  });

  const stageGroups = filtered.reduce<Record<string, Match[]>>((acc, m) => {
    const key = m.groupName ? `Grupa ${m.groupName}` : STAGE_LABELS[m.stage] ?? m.stage;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div>
      <div className="bg-white/5 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm">Fază:</span>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="bg-white/10 text-white rounded-lg px-3 py-1.5 text-sm border border-white/20 focus:outline-none"
          >
            {stages.map((s) => (
              <option key={s} value={s} className="bg-green-900">
                {s === "all" ? "Toate" : STAGE_LABELS[s] ?? s}
              </option>
            ))}
          </select>
        </div>
        {filterStage === "all" || filterStage === "group" ? (
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Grupă:</span>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="bg-white/10 text-white rounded-lg px-3 py-1.5 text-sm border border-white/20 focus:outline-none"
            >
              {groups.map((g) => (
                <option key={g} value={g} className="bg-green-900">
                  {g === "all" ? "Toate" : `Grupa ${g}`}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <div className="ml-auto text-white/40 text-xs">
          {filtered.length} meciuri
        </div>
      </div>

      {Object.entries(stageGroups).map(([groupLabel, groupMatches]) => (
        <div key={groupLabel} className="mb-8">
          <h2 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
            {groupLabel}
          </h2>
          <div className="space-y-3">
            {groupMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                players={players}
                predictions={predictions.filter((p) => p.matchId === match.id)}
                onSaved={onSaved}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MatchCard({
  match, players, predictions, onSaved,
}: {
  match: Match;
  players: Player[];
  predictions: Prediction[];
  onSaved: () => void;
}) {
  const [editing, setEditing] = useState<Record<number, { home: string; away: string }>>({});
  const [saving, setSaving] = useState(false);

  const getPred = (playerId: number) =>
    predictions.find((p) => p.playerId === playerId);

  const getEdit = (playerId: number) =>
    editing[playerId] ?? {
      home: String(getPred(playerId)?.homeScore ?? ""),
      away: String(getPred(playerId)?.awayScore ?? ""),
    };

  const handleChange = (playerId: number, field: "home" | "away", val: string) => {
    setEditing((prev) => ({
      ...prev,
      [playerId]: { ...getEdit(playerId), [field]: val.replace(/[^0-9]/g, "").slice(0, 2) },
    }));
  };

  const handleSave = async (playerId: number) => {
    const e = getEdit(playerId);
    if (e.home === "" || e.away === "") return;
    setSaving(true);
    await fetch("/api/predictions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        matchId: match.id,
        homeScore: Number(e.home),
        awayScore: Number(e.away),
      }),
    });
    setEditing((prev) => { const n = { ...prev }; delete n[playerId]; return n; });
    await onSaved();
    setSaving(false);
  };

  const isPlayed = match.played && match.homeScore != null && match.awayScore != null;

  return (
    <div className={`bg-white/5 rounded-xl border border-white/10 overflow-hidden ${isPlayed ? "border-yellow-500/30" : ""}`}>
      {/* Match header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-white font-semibold text-base">{match.homeTeam}</span>
          <span className="text-white/40 text-sm font-mono">vs</span>
          <span className="text-white font-semibold text-base">{match.awayTeam}</span>
        </div>
        <div className="text-right flex items-center gap-3">
          {match.matchDate && (
            <span className="text-white/40 text-xs">
              {new Date(match.matchDate).toLocaleDateString("ro-RO", { day: "numeric", month: "short" })}
            </span>
          )}
          {isPlayed && (
            <div className="bg-yellow-500 text-black font-black text-sm px-3 py-1 rounded-full">
              {match.homeScore} - {match.awayScore}
            </div>
          )}
        </div>
      </div>

      {/* Player predictions */}
      <div className="grid grid-cols-3 divide-x divide-white/10">
        {players.map((player) => {
          const pred = getPred(player.id);
          const edit = editing[player.id];
          const hasEdit = edit !== undefined;
          const pts = isPlayed && pred
            ? calcPoints(pred.homeScore, pred.awayScore, match.homeScore!, match.awayScore!)
            : null;

          return (
            <div key={player.id} className="px-3 py-3">
              <div className="text-xs mb-2 font-medium" style={{ color: player.color }}>
                {player.name}
              </div>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  inputMode="numeric"
                  value={hasEdit ? edit.home : (pred?.homeScore ?? "")}
                  onChange={(e) => handleChange(player.id, "home", e.target.value)}
                  placeholder="0"
                  disabled={isPlayed}
                  className="w-8 h-8 text-center text-sm font-bold bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                />
                <span className="text-white/40 text-xs">-</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={hasEdit ? edit.away : (pred?.awayScore ?? "")}
                  onChange={(e) => handleChange(player.id, "away", e.target.value)}
                  placeholder="0"
                  disabled={isPlayed}
                  className="w-8 h-8 text-center text-sm font-bold bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:border-yellow-400 disabled:opacity-50"
                />
                {hasEdit && !isPlayed && (
                  <button
                    onClick={() => handleSave(player.id)}
                    disabled={saving || edit.home === "" || edit.away === ""}
                    className="ml-1 text-xs bg-yellow-400 text-black font-bold px-2 py-1 rounded hover:bg-yellow-300 disabled:opacity-50 transition-colors"
                  >
                    ✓
                  </button>
                )}
              </div>
              {pts !== null && (
                <div className={`mt-1.5 text-xs font-bold ${pts === 10 ? "text-yellow-400" : pts === 5 ? "text-blue-400" : "text-red-400/60"}`}>
                  {pts === 10 ? "🎯 10p" : pts === 5 ? "✅ 5p" : "❌ 0p"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Leaderboard Tab ─────────────────────────────────────────────────────────

function LeaderboardTab({ players, matches, predictions }: {
  players: Player[];
  matches: Match[];
  predictions: Prediction[];
}) {
  const board = computeLeaderboard(players, matches, predictions);
  const playedCount = matches.filter((m) => m.played).length;
  const totalMatches = matches.length;

  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-xl p-4 text-center">
        <div className="text-white/60 text-sm">Meciuri jucate</div>
        <div className="text-2xl font-bold text-white">{playedCount} / {totalMatches}</div>
      </div>

      {board.map((entry, i) => (
        <div
          key={entry.player.id}
          className={`rounded-xl p-5 border ${i === 0 ? "bg-yellow-500/10 border-yellow-500/40" : "bg-white/5 border-white/10"}`}
        >
          <div className="flex items-center gap-4">
            <div className={`text-3xl font-black ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : "text-amber-600"}`}>
              #{i + 1}
            </div>
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.player.color }}
            />
            <div className="flex-1">
              <div className="text-white font-bold text-lg">{entry.player.name}</div>
              <div className="text-white/50 text-sm flex gap-3 mt-0.5">
                <span>🎯 {entry.exact} exacte</span>
                <span>✅ {entry.winner} câștig/egal</span>
                <span>❌ {entry.wrong} greșite</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">{entry.points}</div>
              <div className="text-white/40 text-xs">puncte</div>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white/5 rounded-xl p-4 text-sm text-white/60 space-y-1">
        <h3 className="text-white font-semibold mb-2">Sistem de punctaj</h3>
        <div className="flex items-center gap-2"><span className="text-yellow-400">🎯 10 puncte</span> — scor exact</div>
        <div className="flex items-center gap-2"><span className="text-blue-400">✅ 5 puncte</span> — echipă câștigătoare sau egal prezis corect</div>
        <div className="flex items-center gap-2"><span className="text-red-400/60">❌ 0 puncte</span> — pronostic greșit</div>
      </div>
    </div>
  );
}

// ─── Admin Tab ────────────────────────────────────────────────────────────────

function AdminTab({ matches, onSaved }: { matches: Match[]; onSaved: () => void }) {
  const [results, setResults] = useState<Record<number, { home: string; away: string }>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [filterPlayed, setFilterPlayed] = useState<"all" | "pending" | "played">("pending");

  const handleChange = (matchId: number, field: "home" | "away", val: string) => {
    setResults((prev) => ({
      ...prev,
      [matchId]: { ...(prev[matchId] ?? { home: "", away: "" }), [field]: val.replace(/[^0-9]/g, "").slice(0, 2) },
    }));
  };

  const handleSave = async (match: Match) => {
    const r = results[match.id];
    if (!r || r.home === "" || r.away === "") return;
    setSaving(match.id);
    await fetch("/api/matches/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId: match.id,
        homeScore: Number(r.home),
        awayScore: Number(r.away),
        played: true,
      }),
    });
    setResults((prev) => { const n = { ...prev }; delete n[match.id]; return n; });
    await onSaved();
    setSaving(null);
  };

  const handleUndo = async (matchId: number) => {
    setSaving(matchId);
    await fetch("/api/matches/result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchId, homeScore: null, awayScore: null, played: false }),
    });
    await onSaved();
    setSaving(null);
  };

  const filtered = matches.filter((m) => {
    if (filterPlayed === "pending") return !m.played;
    if (filterPlayed === "played") return m.played;
    return true;
  });

  return (
    <div>
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-5 text-yellow-200 text-sm">
        <strong>Panou admin:</strong> Introduceți scorurile reale ale meciurilor aici. Clasamentul se actualizează automat.
      </div>

      <div className="flex gap-2 mb-5">
        {(["pending", "played", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilterPlayed(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterPlayed === f ? "bg-yellow-400 text-black" : "bg-white/10 text-white/60 hover:text-white"}`}
          >
            {f === "pending" ? "Neprelucrate" : f === "played" ? "Introduse" : "Toate"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((match) => (
          <div key={match.id} className={`bg-white/5 rounded-xl border border-white/10 p-4 flex items-center gap-4 ${match.played ? "opacity-70" : ""}`}>
            <div className="flex-1">
              <div className="text-white font-semibold">
                {match.homeTeam} vs {match.awayTeam}
              </div>
              <div className="text-white/40 text-xs">
                {STAGE_LABELS[match.stage] ?? match.stage}
                {match.groupName ? ` • Grupa ${match.groupName}` : ""}
                {match.matchDate ? ` • ${new Date(match.matchDate).toLocaleDateString("ro-RO")}` : ""}
              </div>
            </div>
            {match.played ? (
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-black font-black px-3 py-1 rounded-full">
                  {match.homeScore} - {match.awayScore}
                </div>
                <button
                  onClick={() => handleUndo(match.id)}
                  disabled={saving === match.id}
                  className="text-white/40 hover:text-red-400 text-xs transition-colors"
                  title="Anulează"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={results[match.id]?.home ?? ""}
                  onChange={(e) => handleChange(match.id, "home", e.target.value)}
                  className="w-10 h-9 text-center font-bold bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:border-yellow-400"
                />
                <span className="text-white/40">-</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={results[match.id]?.away ?? ""}
                  onChange={(e) => handleChange(match.id, "away", e.target.value)}
                  className="w-10 h-9 text-center font-bold bg-white/10 text-white rounded border border-white/20 focus:outline-none focus:border-yellow-400"
                />
                <button
                  onClick={() => handleSave(match)}
                  disabled={saving === match.id || !results[match.id]?.home || !results[match.id]?.away}
                  className="bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-lg text-sm hover:bg-yellow-300 disabled:opacity-40 transition-colors"
                >
                  {saving === match.id ? "..." : "Salvează"}
                </button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-white/40 py-10">Niciun meci de afișat</div>
        )}
      </div>
    </div>
  );
}

// ─── Teams Tab ─────────────────────────────────────────────────────────────

function TeamsTab({ matches, onSaved }: { matches: Match[]; onSaved: () => void }) {
  const [edits, setEdits] = useState<Record<number, { home: string; away: string }>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [filterStage, setFilterStage] = useState<string>("r32");

  // Show only knockout matches with placeholder teams
  const knockoutMatches = matches.filter(
    (m) => m.stage !== "group" && 
           (m.homeTeam.match(/^[123][A-L]/) || m.awayTeam.match(/^[WL]\d+/))
  );

  const filtered = knockoutMatches.filter(
    (m) => filterStage === "all" || m.stage === filterStage
  );

  const handleChange = (matchId: number, field: "home" | "away", val: string) => {
    setEdits((prev) => ({
      ...prev,
      [matchId]: { ...(prev[matchId] ?? { home: "", away: "" }), [field]: val.slice(0, 30) },
    }));
  };

  const handleSave = async (matchId: number) => {
    const e = edits[matchId];
    if (!e || !e.home.trim() || !e.away.trim()) return;

    setSaving(matchId);
    await fetch("/api/matches/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchId,
        homeTeam: e.home.trim(),
        awayTeam: e.away.trim(),
      }),
    });
    setEdits((prev) => {
      const n = { ...prev };
      delete n[matchId];
      return n;
    });
    await onSaved();
    setSaving(null);
  };

  const knockoutStages = Array.from(new Set(knockoutMatches.map((m) => m.stage)));

  return (
    <div>
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-5 text-blue-200 text-sm">
        <strong>Editare echipe:</strong> După finalizarea grupelor, completați echipele pentru faza eliminatorie.
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setFilterStage("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            filterStage === "all" ? "bg-yellow-400 text-black" : "bg-white/10 text-white/60"
          }`}
        >
          Toate
        </button>
        {knockoutStages.map((stage) => (
          <button
            key={stage}
            onClick={() => setFilterStage(stage)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterStage === stage ? "bg-yellow-400 text-black" : "bg-white/10 text-white/60"
            }`}
          >
            {STAGE_LABELS[stage] ?? stage}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((match) => {
          const edit = edits[match.id];
          const homeVal = edit?.home ?? match.homeTeam;
          const awayVal = edit?.away ?? match.awayTeam;

          return (
            <div key={match.id} className="bg-white/5 rounded-xl border border-white/10 p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="text-white/60 text-xs mb-2">
                  {STAGE_LABELS[match.stage]} • {match.matchDate ? new Date(match.matchDate).toLocaleDateString("ro-RO") : ""}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={homeVal}
                    onChange={(e) => handleChange(match.id, "home", e.target.value)}
                    placeholder="Echipa acasă"
                    className="flex-1 bg-white/10 text-white rounded px-3 py-2 text-sm border border-white/20 focus:outline-none focus:border-yellow-400"
                  />
                  <span className="text-white/40 text-sm font-mono">vs</span>
                  <input
                    type="text"
                    value={awayVal}
                    onChange={(e) => handleChange(match.id, "away", e.target.value)}
                    placeholder="Echipa oaspeți"
                    className="flex-1 bg-white/10 text-white rounded px-3 py-2 text-sm border border-white/20 focus:outline-none focus:border-yellow-400"
                  />
                  <button
                    onClick={() => handleSave(match.id)}
                    disabled={saving === match.id || homeVal === match.homeTeam && awayVal === match.awayTeam}
                    className="bg-yellow-400 text-black font-bold px-3 py-2 rounded-lg text-sm hover:bg-yellow-300 disabled:opacity-40 transition-colors whitespace-nowrap"
                  >
                    {saving === match.id ? "..." : "Salvează"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab({ players, onSaved }: { players: Player[]; onSaved: () => void }) {
  const [names, setNames] = useState<Record<number, string>>({});
  const [colors, setColors] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const PRESET_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];

  const handleSave = async () => {
    setSaving(true);
    const updated = players.map((p) => ({
      id: p.id,
      name: names[p.id] ?? p.name,
      color: colors[p.id] ?? p.color,
    }));
    await fetch("/api/players", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    await onSaved();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-lg space-y-6">
      <div className="text-white/60 text-sm">Personalizați numele și culorile jucătorilor.</div>

      {players.map((player) => (
        <div key={player.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: colors[player.id] ?? player.color }} />
            <span className="text-white font-semibold">Jucătorul {player.id}</span>
          </div>
          <label className="block text-white/60 text-xs mb-1.5">Nume</label>
          <input
            type="text"
            value={names[player.id] ?? player.name}
            onChange={(e) => setNames((p) => ({ ...p, [player.id]: e.target.value }))}
            className="w-full bg-white/10 text-white rounded-lg px-3 py-2 text-sm border border-white/20 focus:outline-none focus:border-yellow-400 mb-3"
          />
          <label className="block text-white/60 text-xs mb-2">Culoare</label>
          <div className="flex gap-2 flex-wrap">
            {PRESET_COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColors((p) => ({ ...p, [player.id]: c }))}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${(colors[player.id] ?? player.color) === c ? "ring-2 ring-white ring-offset-1 ring-offset-transparent scale-110" : ""}`}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-colors"
      >
        {saved ? "✓ Salvat!" : saving ? "Se salvează..." : "Salvează setările"}
      </button>
    </div>
  );
}
