import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, Star, Link2, Share2, Trash2, Brain } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { notes, categoryColors, categoryLabels } from "@/data/mockData";

export const Route = createFileRoute("/_app/notes/$id")({
  head: () => ({ meta: [{ title: "Yozuv — Mente" }] }),
  loader: ({ params }) => {
    const exists = notes.find((x) => x.id === params.id);
    if (!exists) throw notFound();
    return { id: params.id };
  },
  component: NoteDetail,
});

function NoteDetail() {
  const { id } = Route.useLoaderData();
  const n = notes.find((x) => x.id === id)!;
  const connected = notes.filter((x) => n.connections.includes(x.id));
  const catColor = categoryColors[n.category];
  const catLabel = categoryLabels[n.category];

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 lg:px-10">
      <nav className="flex items-center gap-1 text-xs text-slate-500">
        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/notes" className="hover:text-white">Yozuvlarim</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-300 line-clamp-1">{n.title}</span>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="rounded-full px-2.5 py-1 text-xs" style={{ background: `${catColor}22`, color: catColor }}>
          {catLabel}
        </span>
        <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs text-amber-300">{n.priority}</span>
        <span className="text-xs text-slate-500">{n.createdAt}</span>
      </div>

      <h1 className="mt-3 font-serif text-4xl font-semibold">{n.title}</h1>

      <div className="mt-3 flex flex-wrap gap-2">
        {n.tags.map((t: string) => (
          <span key={t} className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-violet-300">{t}</span>
        ))}
      </div>

      <GlassCard className="mt-6 p-6">
        <p className="text-base leading-relaxed text-slate-200">{n.content}</p>
        <p className="mt-4 text-xs text-slate-500">Saqlandi ✓</p>
      </GlassCard>

      <GlassCard glow="purple" className="mt-5 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold"><Brain className="h-4 w-4 text-violet-300" /> AI Tahlili</div>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between"><dt className="text-slate-500">Kategoriya</dt><dd>{catLabel}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Prioritet</dt><dd>{n.priority}</dd></div>
          <div className="flex justify-between"><dt className="text-slate-500">Kayfiyat</dt><dd>{n.mood}</dd></div>
          <div className="mt-2 border-t border-white/5 pt-2 text-slate-300">{n.aiSummary}</div>
        </dl>
      </GlassCard>

      {connected.length > 0 && (
        <div className="mt-6">
          <h2 className="flex items-center gap-2 font-serif text-xl"><Link2 className="h-4 w-4" /> Bog'liq yozuvlar</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {connected.map((c) => (
              <Link key={c.id} to="/notes/$id" params={{ id: c.id }}>
                <GlassCard className="p-4" hoverLift>
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-1 text-xs text-slate-500 line-clamp-2">{c.content}</div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded bg-white/5">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500" style={{ width: "72%" }} />
                  </div>
                  <div className="mt-1 text-[10px] text-slate-500">Bog'liqlik: 72%</div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-20 mt-8 lg:bottom-5">
        <GlassCard className="flex flex-wrap items-center justify-around gap-2 p-3">
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5"><Star className="h-4 w-4" /> Saralash</button>
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5"><Link2 className="h-4 w-4" /> Bog'lash</button>
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5"><Share2 className="h-4 w-4" /> Ulashish</button>
          <button className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-rose-400 hover:bg-white/5"><Trash2 className="h-4 w-4" /> O'chirish</button>
        </GlassCard>
      </div>
    </div>
  );
}
