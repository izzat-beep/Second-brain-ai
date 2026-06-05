import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { weeklyReport } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Cell as _C } from "recharts";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "Haftalik Hisobot — Mente" }] }),
  component: Reports,
});

function Reports() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold md:text-4xl">Haftalik Hisobot</h1>
        <div className="glass flex items-center gap-2 rounded-full p-1">
          <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          <span className="px-2 text-sm">May 26 – Jun 1, 2026</span>
          <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Yozuvlar", v: "23", s: "+18% o'tgan haftadan" },
          { l: "Kategoriyalar", v: "4", s: "ish, dizayn, oila" },
          { l: "Yangi bog'liqlik", v: "6", s: "AI tomonidan" },
          { l: "O'sish", v: "+18%", s: "trend", icon: TrendingUp },
        ].map((s, i) => (
          <GlassCard key={i} className="p-5" hoverLift>
            <div className="text-xs text-slate-500">{s.l}</div>
            <div className="mt-1 font-serif text-3xl font-semibold">{s.v}</div>
            <div className="mt-1 text-[11px] text-emerald-400">{s.s}</div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <GlassCard className="p-5">
          <h3 className="font-serif text-lg">Asosiy mavzular</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyReport.topTopics} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" stroke="#475569" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={70} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "#0f1428", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {weeklyReport.topTopics.map((t, i) => <Cell key={i} fill={t.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-serif text-lg">🎯 Diqqatingiz qayerda?</h3>
          <div className="flex items-center gap-4">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={weeklyReport.topTopics} dataKey="count" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3}>
                    {weeklyReport.topTopics.map((t, i) => <Cell key={i} fill={t.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">Siz bu hafta asosan <b>ish va startup</b> haqida o'yladingiz (62%). <span className="text-slate-500">Shaxsiy hayot haqida kamroq yozdingiz (12%).</span></p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mt-5 p-5">
        <h3 className="font-serif text-lg">Kunlik faollik</h3>
        <div className="mt-3 h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyReport.dailyActivity}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.04)" }} contentStyle={{ background: "#0f1428", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="count" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard glow="purple" className="mt-5 p-5">
        <h3 className="font-serif text-lg">🤖 AI Xulosasi</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          {weeklyReport.keyInsights.map((i) => <li key={i}>• {i}</li>)}
        </ul>
      </GlassCard>

      <div className="mt-5">
        <h3 className="mb-3 font-serif text-lg">Bu hafta topilgan bog'liqliklar</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {weeklyReport.connections.map((c, i) => (
            <GlassCard key={i} className="p-5" hoverLift>
              <div className="text-sm font-semibold">{c.a}<span className="mx-2 text-slate-500">↔</span>{c.b}</div>
              <div className="mt-3 h-1 w-full overflow-hidden rounded bg-white/5">
                <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: `${c.strength * 100}%` }} />
              </div>
              <div className="mt-1 text-[10px] text-slate-500">{Math.round(c.strength * 100)}% bog'liqlik</div>
              <p className="mt-3 text-xs text-slate-400">{c.reason}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
