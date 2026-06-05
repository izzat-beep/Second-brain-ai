import { createFileRoute } from "@tanstack/react-router";
import { Plus, Check, Clock } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { reminders } from "@/data/mockData";

export const Route = createFileRoute("/_app/reminders")({
  head: () => ({ meta: [{ title: "Eslatmalar — Mente" }] }),
  component: Reminders,
});

const groups = ["Bugun", "Ertaga", "Bu hafta"];

function Reminders() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold md:text-4xl">Eslatmalarim</h1>
          <p className="mt-1 text-sm text-slate-500">{reminders.filter(r => !r.done).length} kelayotgan</p>
        </div>
        <PurpleButton size="sm"><Plus className="h-4 w-4" /> Yangi eslatma</PurpleButton>
      </div>

      <div className="mt-8 space-y-8">
        {groups.map((g) => {
          const items = reminders.filter((r) => r.when === g);
          if (!items.length) return null;
          return (
            <div key={g}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">{g}</h2>
              <div className="space-y-2">
                {items.map((r) => (
                  <GlassCard key={r.id} className={`flex items-center gap-4 p-4 ${r.priority === "Muhim" ? "border-l-4 border-l-rose-500" : "border-l-4 border-l-amber-500"} ${r.done ? "opacity-50" : ""}`}>
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-violet-500/10 text-xs font-medium text-violet-200">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${r.done ? "line-through" : ""}`}>{r.title}</div>
                      <div className="text-xs text-slate-500">{r.dueDate}</div>
                    </div>
                    <button className={`grid h-7 w-7 place-items-center rounded-full border ${r.done ? "border-emerald-500/50 bg-emerald-500/20" : "border-white/10 hover:border-emerald-500/50"}`}>
                      {r.done && <Check className="h-3.5 w-3.5 text-emerald-300" />}
                    </button>
                  </GlassCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <GlassCard glow="gold" className="mt-10 p-5">
        <h3 className="font-serif text-lg">Kundalik hamroh</h3>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>🌅 Ertalab eslatmasi</span>
            <input type="time" defaultValue="07:00" className="rounded-lg bg-white/5 px-2.5 py-1.5 text-sm outline-none" />
          </div>
          <div className="flex items-center justify-between">
            <span>🌙 Kechqurun eslatmasi</span>
            <input type="time" defaultValue="21:00" className="rounded-lg bg-white/5 px-2.5 py-1.5 text-sm outline-none" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
