import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Brain, ArrowRight, Mic, Pencil, Image as ImageIcon, Check } from "lucide-react";
import { AmbientBackground } from "@/components/mente/AmbientBackground";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { signInMock } from "@/lib/auth";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Mente" }] }),
  component: Onboarding,
});

const interests = [
  { e: "💼", t: "Ish g'oyalari" },
  { e: "📚", t: "Kitobdan o'rganganlar" },
  { e: "💭", t: "Kundalik fikrlar" },
  { e: "🎯", t: "Maqsadlar" },
  { e: "🚀", t: "Startup / Biznes" },
  { e: "📝", t: "Hammasini" },
];

function Onboarding() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [morning, setMorning] = useState("07:00");
  const [evening, setEvening] = useState("21:00");
  const [noteText, setNoteText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const nav = useNavigate();

  const next = () => setStep((s) => Math.min(4, s + 1));
  const submitNote = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 1500);
  };
  const finish = () => { signInMock(); nav({ to: "/dashboard" }); };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-8">
        {/* Step indicator */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? "w-10 bg-violet-500" : i < step ? "w-6 bg-violet-500/60" : "w-6 bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="w-full"
            >
              {step === 0 && (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="mx-auto grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_20px_60px_-10px_rgba(124,58,237,0.6)]"
                  >
                    <Brain className="h-12 w-12 text-white" />
                  </motion.div>
                  <h1 className="mt-8 font-serif text-4xl font-semibold md:text-5xl">Mente ga xush kelibsiz</h1>
                  <p className="mt-4 text-slate-400">Shaxsiy AI xotirangizni sozlaylik. 3 daqiqa.</p>
                  <div className="mt-10">
                    <PurpleButton onClick={next} size="lg">Boshlash <ArrowRight className="h-5 w-5" /></PurpleButton>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-center font-serif text-3xl font-semibold">Siz ko'proq nima yozasiz?</h2>
                  <p className="mt-2 text-center text-sm text-slate-400">Bir nechtasini tanlashingiz mumkin</p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {interests.map((it) => {
                      const on = selected.includes(it.t);
                      return (
                        <button
                          key={it.t}
                          onClick={() =>
                            setSelected((s) => (on ? s.filter((x) => x !== it.t) : [...s, it.t]))
                          }
                          className={`glass flex items-center gap-3 p-4 text-left transition-all ${
                            on ? "border-violet-500/60 bg-violet-500/15" : ""
                          }`}
                        >
                          <span className="text-2xl">{it.e}</span>
                          <span className="text-sm">{it.t}</span>
                          {on && <Check className="ml-auto h-4 w-4 text-violet-300" />}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-8 text-center">
                    <PurpleButton onClick={next} disabled={!selected.length}>
                      Davom etish <ArrowRight className="h-4 w-4" />
                    </PurpleButton>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-center font-serif text-3xl font-semibold">Eslatmalar qachon kelsin?</h2>
                  <div className="mt-8 space-y-4">
                    <GlassCard className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3"><span className="text-2xl">🌅</span><span>Ertalab</span></div>
                      <input type="time" value={morning} onChange={(e) => setMorning(e.target.value)} className="rounded-lg bg-white/5 px-3 py-2 text-sm outline-none" />
                    </GlassCard>
                    <GlassCard className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3"><span className="text-2xl">🌙</span><span>Kechqurun</span></div>
                      <input type="time" value={evening} onChange={(e) => setEvening(e.target.value)} className="rounded-lg bg-white/5 px-3 py-2 text-sm outline-none" />
                    </GlassCard>
                  </div>
                  <div className="mt-8 text-center"><PurpleButton onClick={next}>Tayyor <ArrowRight className="h-4 w-4" /></PurpleButton></div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-center font-serif text-3xl font-semibold">Birinchi yozuvingizni qiling</h2>
                  <GlassCard className="mt-6 p-5">
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      rows={5}
                      placeholder="Hozir nimani o'ylayapsiz?"
                      className="w-full resize-none bg-transparent text-slate-100 placeholder:text-slate-500 outline-none"
                    />
                    <div className="mt-3 flex gap-2">
                      <button className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"><Pencil className="h-3.5 w-3.5" /> Yozing</button>
                      <button className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"><Mic className="h-3.5 w-3.5" /> Gapiring</button>
                      <button className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"><ImageIcon className="h-3.5 w-3.5" /> Rasm</button>
                    </div>
                  </GlassCard>

                  {analyzing && (
                    <GlassCard className="mt-4 flex items-center gap-3 p-4">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                      <span className="text-sm text-slate-300">AI tahlil qilmoqda...</span>
                    </GlassCard>
                  )}

                  {analyzed && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <GlassCard glow="purple" className="mt-4 p-5">
                        <div className="text-xs text-violet-300">Zo'r! AI tahlil qildi:</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-500/20 px-2.5 py-1 text-xs text-blue-200">💼 Ish</span>
                          <span className="rounded-full bg-violet-500/20 px-2.5 py-1 text-xs text-violet-200">#goya</span>
                          <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs text-amber-200">Muhim</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-300">Birinchi qadam tayyor — AI fikringizni tushundi.</p>
                      </GlassCard>
                    </motion.div>
                  )}

                  <div className="mt-8 text-center">
                    {!analyzed ? (
                      <PurpleButton onClick={submitNote} disabled={!noteText.trim() || analyzing}>
                        AI tahlil qilsin <ArrowRight className="h-4 w-4" />
                      </PurpleButton>
                    ) : (
                      <PurpleButton onClick={next}>Davom etish <ArrowRight className="h-4 w-4" /></PurpleButton>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <h2 className="font-serif text-3xl font-semibold">14 kun — barcha imkoniyatlar bepul</h2>
                  <p className="mt-3 text-slate-400">Pro+ rejasi sizning yangi miyangiz</p>
                  <div className="mt-8 grid gap-3 md:grid-cols-3">
                    {[
                      { n: "Bepul", p: "0", c: false },
                      { n: "Pro", p: "49K", c: false },
                      { n: "Pro+", p: "99K", c: true },
                    ].map((p) => (
                      <GlassCard key={p.n} className={`p-5 text-center ${p.c ? "border-violet-500/50 animate-glow-pulse" : ""}`}>
                        <div className="font-serif text-lg">{p.n}</div>
                        <div className="mt-2 font-serif text-2xl font-semibold">{p.p}</div>
                      </GlassCard>
                    ))}
                  </div>
                  <div className="mt-10">
                    <PurpleButton onClick={finish} size="lg">Bepul boshlash — to'lovsiz <ArrowRight className="h-5 w-5" /></PurpleButton>
                    <p className="mt-3 text-xs text-slate-500">14 kundan keyin bepul rejaga o'tiladi</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
