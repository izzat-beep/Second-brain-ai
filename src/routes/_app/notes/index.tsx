import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Plus, Star, Brain, Grid3x3, List as ListIcon } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { notes, categoryColors, categoryLabels } from "@/data/mockData";

export const Route = createFileRoute("/_app/notes/")({
  head: () => ({ meta: [{ title: "Yozuvlarim — Mente" }] }),
  component: Notes,
});

function Notes() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(
    () =>
      notes.filter((n) => {
        if (cat !== "all" && n.category !== cat) return false;
        if (q && !`${n.title} ${n.content}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, cat],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">Barcha yozuvlarim</h1>
          <p className="mt-1 text-sm text-slate-500">{notes.length} ta yozuv</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass flex rounded-full p-1">
            <button onClick={() => setView("grid")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-violet-500/30 text-violet-200" : "text-slate-400"}`}><Grid3x3 className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-violet-500/30 text-violet-200" : "text-slate-400"}`}><ListIcon className="h-4 w-4" /></button>
          </div>
          <PurpleButton size="sm"><Plus className="h-4 w-4" /> Yangi yozuv</PurpleButton>
        </div>
      </div>

      <GlassCard className="sticky top-3 z-20 mt-6 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/5 px-4 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="3 oy oldin..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["all", ...Object.keys(categoryLabels)].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-3 py-1 text-xs ${cat === c ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`}
              >
                {c === "all" ? "Barchasi" : categoryLabels[c as keyof typeof categoryLabels]}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className={view === "grid" ? "mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "mt-6 space-y-3"}>
        {filtered.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Link to="/notes/$id" params={{ id: n.id }}>
              <GlassCard className="p-5" hoverLift>
                <div className="flex items-center justify-between">
                  <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: `${categoryColors[n.category]}22`, color: categoryColors[n.category] }}>
                    {categoryLabels[n.category]}
                  </span>
                  <Star className={`h-4 w-4 ${n.starred ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
                </div>
                <h3 className="mt-2 font-semibold">{n.title}</h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-3">{n.content}</p>
                <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-500">
                  {n.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <div className="mt-3 flex items-center gap-1.5 border-t border-white/5 pt-2 text-[11px] text-violet-300">
                  <Brain className="h-3.5 w-3.5" /> {n.aiSummary}
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
