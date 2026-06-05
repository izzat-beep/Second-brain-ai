import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search, Bell, Mic, Image as ImageIcon, ArrowRight, Star, Link2, Plus, Sparkles, Brain, FileText, MessageSquare, Clock, Flame } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { notes, stats, user, categoryColors, categoryLabels, weeklyReport } from "@/data/mockData";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Mente" }] }),
  component: Dashboard,
});

function CountUp({ end }: { end: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setV(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);
  return <span ref={ref}>{v.toLocaleString()}</span>;
}

const statCards = [
  { icon: FileText, label: "Jami Yozuvlar", value: stats.totalNotes, trend: "+12 bugun", color: "#7C3AED" },
  { icon: MessageSquare, label: "AI Tahlillar", value: stats.aiChats, trend: "bu hafta", color: "#3B82F6" },
  { icon: Clock, label: "Eslatmalar", value: stats.reminders, trend: "kelayotgan", color: "#F59E0B" },
  { icon: Flame, label: "Streak", value: stats.streak, trend: "kun 🔥", color: "#22C55E" },
];

function Dashboard() {
  const [noteText, setNoteText] = useState("");

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">
            Xayrli tong, {user.name} <span className="inline-block">👋</span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">{new Date().toLocaleDateString("uz-UZ", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input placeholder="Qidiruv... (⌘K)" className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-500 md:w-56" />
          </div>
          <button className="glass relative grid h-10 w-10 place-items-center rounded-full">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-400" />
          </button>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold">
            {user.name[0]}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="overflow-hidden p-5" hoverLift>
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ background: `${s.color}22`, color: s.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">{s.trend}</div>
                </div>
                <div className="mt-3 text-xs text-slate-500">{s.label}</div>
                <div className="font-serif text-3xl font-semibold"><CountUp end={s.value} /></div>
                <div className="-mx-2 -mb-2 mt-2 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.sparkline.map((v, idx) => ({ v, idx }))}>
                      <Line type="monotone" dataKey="v" stroke={s.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Capture */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <GlassCard glow="purple" className="mt-8 animate-glow-pulse p-5">
          <div className="flex items-center gap-2 text-xs text-violet-300">
            <Sparkles className="h-3.5 w-3.5" /> Tezkor yozib olish
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="💭 Hozir nimani o'ylayapsiz?"
            rows={2}
            className="mt-3 w-full resize-none bg-transparent text-lg text-slate-100 placeholder:text-slate-500 outline-none"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {["#goya", "#ish", "#shaxsiy", "+"].map((t) => (
                <button key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-violet-500/50">{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="glass grid h-9 w-9 place-items-center rounded-full"><Mic className="h-4 w-4" /></button>
              <button className="glass grid h-9 w-9 place-items-center rounded-full"><ImageIcon className="h-4 w-4" /></button>
              <PurpleButton size="sm">Saqlash <ArrowRight className="h-4 w-4" /></PurpleButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Daily companion */}
          <GlassCard glow="gold" className="p-5">
            <div className="flex items-center gap-2 text-amber-300">
              <span className="text-lg">🌅</span> <span className="text-sm font-semibold">Bugungi AI tavsiya</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Kecha 'startup funding' haqida yozdingiz — davom ettiring</li>
              <li>• Bugun 2 ta muhim yozuv eslatmasi bor</li>
              <li>• Bu hafta 8 marta 'marketing' haqida yozdingiz</li>
            </ul>
          </GlassCard>

          {/* Recent notes */}
          <div className="mt-6 flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">So'nggi yozuvlar</h2>
            <Link to="/notes" className="text-xs text-violet-300 hover:text-violet-200">Hammasini ko'rish →</Link>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {["Barchasi", "Bugun", "Muhim", "⭐ Saralangan"].map((f, i) => (
              <button key={f} className={`shrink-0 rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-violet-500/50 bg-violet-500/15 text-violet-200" : "border-white/10 bg-white/5 text-slate-300"}`}>{f}</button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {notes.slice(0, 6).map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                style={{ minHeight: n.height === "lg" ? 220 : n.height === "md" ? 170 : 140 }}
              >
                <Link to="/notes/$id" params={{ id: n.id }} className="block h-full">
                  <GlassCard className="flex h-full flex-col p-5" hoverLift>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ background: `${categoryColors[n.category]}22`, color: categoryColors[n.category] }}
                      >
                        {categoryLabels[n.category]}
                      </span>
                      <span className="text-[10px] text-slate-500">{n.createdAt}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-1 text-sm font-semibold">{n.title}</h3>
                    <p className="mt-1.5 line-clamp-3 text-xs text-slate-400">{n.content}</p>
                    <div className="mt-auto flex flex-wrap gap-1 pt-3">
                      {n.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] text-slate-500">{t}</span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-violet-300">
                      <span className="inline-flex items-center gap-1 line-clamp-1"><Brain className="h-3 w-3" /> {n.aiSummary.slice(0, 40)}…</span>
                      <div className="flex items-center gap-1.5">
                        <Star className={`h-3.5 w-3.5 ${n.starred ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
                        <Link2 className="h-3.5 w-3.5 text-slate-600" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Weekly preview */}
          <GlassCard className="mt-6 p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg">Bu hafta</h3>
              <Link to="/reports" className="text-xs text-violet-300">To'liq hisobot →</Link>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {weeklyReport.topTopics.slice(0, 4).map((t) => (
                <span key={t.name} className="rounded-full px-2 py-0.5 text-xs" style={{ background: `${t.color}22`, color: t.color }}>
                  {t.name} ({t.count})
                </span>
              ))}
            </div>
            <div className="mt-4 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyReport.dailyActivity}>
                  <XAxis dataKey="day" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "#0f1428", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Right rail — AI chat */}
        <GlassCard className="flex h-fit flex-col p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Brain className="h-4 w-4 text-violet-300" /> AI ga so'rang
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500 to-indigo-600 px-3.5 py-2 text-white">Bu hafta nima yozdim?</div>
            </div>
            <div className="flex gap-2">
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-500/20"><Brain className="h-3.5 w-3.5 text-violet-300" /></div>
              <div className="glass rounded-2xl rounded-tl-sm p-3 text-slate-300">23 ta yozuv — asosan **startup**(8), **dizayn**(6) va **shaxsiy**(5).</div>
            </div>
          </div>
          <div className="glass mt-4 flex items-center gap-2 rounded-full px-3 py-2">
            <input placeholder="Yozuvlarimdan so'rang..." className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" />
            <button className="grid h-7 w-7 place-items-center rounded-full bg-violet-500"><ArrowRight className="h-3.5 w-3.5" /></button>
          </div>
        </GlassCard>
      </div>

      {/* FAB */}
      <div className="fixed bottom-20 right-5 z-30 lg:bottom-8 lg:right-8">
        <button className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_15px_40px_-5px_rgba(124,58,237,0.7)] transition-transform hover:scale-110">
          <Plus className="h-6 w-6" />
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-pulse-ring" />
        </button>
      </div>
    </div>
  );
}
