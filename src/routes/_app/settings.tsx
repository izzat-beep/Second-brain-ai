import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, Brain, Send, Palette, Lock, CreditCard, Check, ExternalLink, Download, Trash2 } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { user } from "@/data/mockData";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Sozlamalar — Mente" }] }),
  component: Settings,
});

type Cat = { id: string; label: string; icon: typeof User; highlight?: boolean };
const cats: readonly Cat[] = [
  { id: "profile", label: "Profil", icon: User },
  { id: "notif", label: "Bildirishnomalar", icon: Bell },
  { id: "ai", label: "AI Sozlamalari", icon: Brain },
  { id: "telegram", label: "Telegram", icon: Send, highlight: true },
  { id: "appearance", label: "Ko'rinish", icon: Palette },
  { id: "privacy", label: "Maxfiylik", icon: Lock },
  { id: "billing", label: "Obuna", icon: CreditCard },
];

function Settings() {
  const [active, setActive] = useState<string>("profile");

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-10">
      <h1 className="font-serif text-3xl font-semibold md:text-4xl">Sozlamalar</h1>

      <div className="mt-6 flex flex-col gap-5 lg:flex-row">
        <nav className="glass h-fit shrink-0 rounded-2xl p-2 lg:w-56">
          {cats.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active === c.id ? "bg-violet-500/15 text-violet-200" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" /> {c.label}
                {c.highlight && <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 space-y-5">
          {active === "profile" && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl font-semibold">{user.name[0]}</div>
                <div>
                  <div className="font-serif text-xl">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="To'liq ism" value={user.name} />
                <Field label="Email" value={user.email} disabled badge="Tasdiqlangan ✓" />
                <Field label="Bio" value="Founder & Builder" />
                <Field label="Timezone" value="Asia/Tashkent (UTC+5)" />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["🇺🇿 O'zbek", "🇷🇺 Русский", "🇬🇧 English"].map((l, i) => (
                  <button key={l} className={`rounded-full px-3 py-1.5 text-xs ${i === 0 ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-300"}`}>{l}</button>
                ))}
              </div>
              <div className="mt-6"><PurpleButton size="sm">O'zgarishlarni saqlash</PurpleButton></div>
            </GlassCard>
          )}

          {active === "telegram" && (
            <GlassCard glow="green" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-500/20 text-sky-300"><Send className="h-6 w-6" /></div>
                  <div>
                    <div className="font-serif text-xl">Telegram Integratsiyasi</div>
                    <div className="text-xs text-slate-500">@SecondBrainAI_bot</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Ulangan
                </span>
              </div>
              <div className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Ulangan akkaunt</span><span>{user.telegramUsername}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Oxirgi sinxronlash</span><span>5 daqiqa oldin</span></div>
              </div>
              <div className="mt-5 space-y-3">
                {["G'oyalarni avtomatik sinxronlashtirish", "Bildirishnomalarni Telegramga yuborish", "Kundalik hisobotni Telegramga yuborish"].map((t) => (
                  <label key={t} className="flex items-center justify-between rounded-xl bg-white/[0.03] p-3 text-sm">
                    {t}
                    <Toggle defaultOn />
                  </label>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <PurpleButton size="sm" variant="ghost"><ExternalLink className="h-4 w-4" /> Telegramda ochish</PurpleButton>
                <button className="rounded-full border border-rose-500/40 px-4 py-2 text-sm text-rose-300 hover:bg-rose-500/10">Uzish</button>
              </div>
            </GlassCard>
          )}

          {active === "ai" && (
            <GlassCard className="p-6 space-y-5">
              <Row label="Javob tili">
                <Pills opts={["O'zbek", "Ruscha", "Ingliz"]} active={0} />
              </Row>
              <Row label="AI shaxsiyati">
                <Pills opts={["Rasmiy", "Do'stona", "Qisqa"]} active={1} />
              </Row>
              <Row label="Avtomatik teglar"><Toggle defaultOn /></Row>
              <Row label="Kundalik AI xulosasi"><Toggle defaultOn /></Row>
              <Row label="Kontekst hajmi">
                <Pills opts={["10", "50", "100"]} active={1} />
              </Row>
              <Row label="Kayfiyat tahlili"><Toggle defaultOn /></Row>
            </GlassCard>
          )}

          {active === "appearance" && (
            <GlassCard className="p-6">
              <h3 className="font-serif text-lg">Mavzu</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { l: "Qorong'i", bg: "#070B14", active: true },
                  { l: "Yorug'", bg: "#F1F5F9" },
                  { l: "Tizim", bg: "linear-gradient(135deg,#070B14 50%, #F1F5F9 50%)" },
                ].map((t) => (
                  <button key={t.l} className={`rounded-2xl p-4 text-left transition-all ${t.active ? "ring-2 ring-violet-500" : "ring-1 ring-white/10"}`}>
                    <div className="mb-2 h-16 rounded-lg" style={{ background: t.bg }} />
                    <div className="text-xs">{t.l}</div>
                  </button>
                ))}
              </div>
              <h3 className="mt-6 font-serif text-lg">Asosiy rang</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["#7C3AED", "#3B82F6", "#06B6D4", "#22C55E", "#F59E0B", "#EC4899"].map((c, i) => (
                  <button key={c} className={`h-9 w-9 rounded-full ring-offset-2 ring-offset-[#070B14] ${i === 0 ? "ring-2 ring-white" : ""}`} style={{ background: c }} />
                ))}
              </div>
            </GlassCard>
          )}

          {active === "notif" && (
            <GlassCard className="p-6 space-y-3">
              <Row label="Push bildirishnomalar"><Toggle defaultOn /></Row>
              <Row label="Yangi AI tahlil"><Toggle defaultOn /></Row>
              <Row label="Eslatmalar"><Toggle defaultOn /></Row>
              <Row label="Haftalik hisobot"><Toggle defaultOn /></Row>
              <Row label="Yangi bog'liqlik"><Toggle /></Row>
              <Row label="🌅 Ertalab">
                <input type="time" defaultValue="07:00" className="rounded-lg bg-white/5 px-3 py-1.5 text-sm outline-none" />
              </Row>
              <Row label="🌙 Kechqurun">
                <input type="time" defaultValue="21:00" className="rounded-lg bg-white/5 px-3 py-1.5 text-sm outline-none" />
              </Row>
            </GlassCard>
          )}

          {active === "billing" && (
            <>
              <GlassCard glow="purple" className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Joriy reja</div>
                    <div className="font-serif text-2xl">{user.plan}</div>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-xs font-bold text-amber-950">Active</span>
                </div>
                <div className="mt-5 space-y-3">
                  <Usage label="AI tahlillar" value="47 / ∞" pct={47} color="#7C3AED" />
                  <Usage label="Saqlash" value="1.2GB / 10GB" pct={12} color="#3B82F6" />
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <h3 className="font-serif text-lg">To'lov usullari</h3>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {["Payme", "Click", "Stripe"].map((p) => <span key={p} className="rounded-full border border-white/10 px-3 py-1.5">{p}</span>)}
                </div>
              </GlassCard>
            </>
          )}

          {active === "privacy" && (
            <>
              <GlassCard glow="gold" className="p-6">
                <h3 className="font-serif text-lg">🔐 Ma'lumotlaringiz — sizniki</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between"><span>End-to-end shifrlash</span><span className="inline-flex items-center gap-1 text-emerald-400"><Check className="h-4 w-4" /> Yoqilgan</span></div>
                  <div className="flex items-center justify-between"><span>Ma'lumotlar joylashuvi</span><span className="text-slate-400">Supabase EU (Frankfurt)</span></div>
                  <div className="flex items-center justify-between"><span>Marketing uchun ishlatish</span><span className="font-bold text-rose-400">🚫 HECH QACHON</span></div>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="space-y-2">
                  <button className="flex w-full items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm hover:bg-white/10"><Download className="h-4 w-4" /> Barcha ma'lumotlarni yuklab olish</button>
                  <button className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-rose-300 hover:bg-rose-500/10"><Trash2 className="h-4 w-4" /> Hisobni o'chirish</button>
                </div>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, disabled, badge }: { label: string; value: string; disabled?: boolean; badge?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 flex items-center justify-between text-xs text-slate-500">
        {label}
        {badge && <span className="text-emerald-400">{badge}</span>}
      </span>
      <input defaultValue={value} disabled={disabled} className="glass w-full rounded-xl px-3 py-2.5 text-sm outline-none disabled:opacity-60" />
    </label>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 last:border-0"><span className="text-sm text-slate-300">{label}</span>{children}</div>;
}
function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-violet-500" : "bg-white/10"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}
function Pills({ opts, active }: { opts: string[]; active: number }) {
  const [a, setA] = useState(active);
  return (
    <div className="flex flex-wrap gap-1.5">
      {opts.map((o, i) => (
        <button key={o} onClick={() => setA(i)} className={`rounded-full px-3 py-1.5 text-xs ${a === i ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-300"}`}>{o}</button>
      ))}
    </div>
  );
}
function Usage({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs"><span className="text-slate-400">{label}</span><span>{value}</span></div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
