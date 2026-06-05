import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mic, Pencil, Image as ImageIcon, Link as LinkIcon, Bot, Smartphone,
  Sparkles, Check, Lock, Shield, Download, Star, Sun, Sunset, Moon,
  ArrowRight, Play,
} from "lucide-react";
import { LandingNavbar } from "@/components/mente/LandingNavbar";
import { AmbientBackground } from "@/components/mente/AmbientBackground";
import { GlassCard } from "@/components/mente/GlassCard";
import { PurpleButton } from "@/components/mente/PurpleButton";
import { CinematicCardFan, type FanCard } from "@/components/mente/CinematicCardFan";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mente — Hech narsa unutilmasin" },
      { name: "description", content: "Shaxsiy AI xotira tizimi. Yozib oling, AI tahlil qiladi, hech qachon yo'qotmang." },
      { property: "og:title", content: "Mente — Hech narsa unutilmasin" },
      { property: "og:description", content: "Shaxsiy AI xotira tizimi. Yozib oling, AI tahlil qiladi, hech qachon yo'qotmang." },
    ],
  }),
  component: Landing,
});

const fanCards: FanCard[] = [
  { label: "Capture", title: "Yozib olish", subtitle: "Ovoz, matn, rasm — 10 soniya", description: "Widget, Telegram bot yoki app — qaerda bo'lsangiz, fikrlaringizni darhol qayd eting. Offline rejimda ham ishlaydi.", gradient: ["#F59E0B", "#E8824A"], emoji: "📥" },
  { label: "Organize", title: "AI Tizimlashtirish", subtitle: "Avtomatik kategoriya va teglar", description: "Claude API har bir yozuvni avtomatik tahlil qiladi: kategoriya, teglar, prioritet va kayfiyat aniqlanadi.", gradient: ["#7C3AED", "#6D28D9"], emoji: "🤖" },
  { label: "Connect", title: "Bog'lash", subtitle: "G'oyalar orasidagi yashirin bog'liqlik", description: "Eski yozuvlaringiz orasidagi bog'liqlikni AI topadi. 2 g'oya birlashsa — yangi imkoniyat.", gradient: ["#3B82F6", "#1F4E96"], emoji: "🔗" },
  { label: "Reflect", title: "Tahlil", subtitle: "Haftalik AI hisobot va pattern", description: "Har hafta sizning fokusingiz, takroriy mavzularingiz va o'sish grafigi haqida AI hisobot.", gradient: ["#06B6D4", "#0F766E"], emoji: "🪞" },
  { label: "Act", title: "Harakat", subtitle: "Kundalik reja va qaror yordami", description: "Ertalab AI sizga 3 ta vazifa taklif qiladi. Kechqurun — kun xulosasi. Hech qachon yo'lingizdan adashmang.", gradient: ["#22C55E", "#166534"], emoji: "⚡" },
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Landing() {
  return (
    <div className="relative overflow-x-hidden">
      <AmbientBackground />
      <LandingNavbar />

      {/* HERO */}
      <header className="relative px-5 pb-10 pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-200 backdrop-blur-xl animate-glow-pulse"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Shaxsiy AI Xotira Tizimi · MVP v1.0
          </motion.div>

          <h1 className="mt-7 font-serif text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block text-slate-100"
            >
              Hech narsa
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block font-bold text-gradient-purple"
            >
              Unutilmasin.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl"
          >
            Har kuni yo'qotayotgan g'oyalaringiz, qarorlaringiz, o'rganganlaringiz —
            endi bitta joyda. AI tahlil qiladi, eslatadi, bog'laydi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/onboarding">
              <PurpleButton size="lg">
                Bepul Boshlash <ArrowRight className="h-5 w-5" />
              </PurpleButton>
            </Link>
            <PurpleButton size="lg" variant="ghost">
              <Play className="h-4 w-4" /> Qanday ishlaydi?
            </PurpleButton>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500"
          >
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> 14 kun bepul</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> Karta shart emas</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> O'zbek tili</span>
          </motion.p>
        </div>

        {/* Cinematic Card Fan */}
        <div className="mx-auto mt-16 max-w-7xl">
          <CinematicCardFan cards={fanCards} />
        </div>
      </header>

      {/* HOW IT WORKS */}
      <Section id="how" className="px-5 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">3 qadam — xolos</h2>
          <p className="mt-3 text-slate-400">Murakkab emas. Odatga aylantirish oson.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: 1, icon: "📤", title: "Yozib olish", text: "Widget bosing, gapiring yoki yozing. 10 soniya — tugadi." },
              { n: 2, icon: "🧠", title: "AI Ishlaydi", text: "Mente avtomatik kategoriya, teg beradi. Eski yozuvlar bilan bog'liqlik topadi." },
              { n: 3, icon: "🔍", title: "Eslash", text: "Oylar oldin yozganingizni so'rang. AI xotirangizdan javob beradi." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <GlassCard className="relative p-7 text-left" hoverLift>
                  <div className="absolute -top-4 left-7 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold">
                    {s.n}
                  </div>
                  <div className="mb-3 text-4xl">{s.icon}</div>
                  <h3 className="font-serif text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CAPTURE METHODS */}
      <Section className="px-5 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-semibold md:text-4xl">Qanday usulda ham yozing</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { i: Mic, l: "Ovoz" },
              { i: Pencil, l: "Matn" },
              { i: ImageIcon, l: "Rasm" },
              { i: LinkIcon, l: "Link" },
              { i: Bot, l: "Telegram" },
              { i: Smartphone, l: "Widget" },
            ].map(({ i: Icon, l }, idx) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
              >
                <GlassCard className="group flex flex-col items-center gap-2 p-5 transition-all hover:border-violet-500/40" hoverLift>
                  <Icon className="h-7 w-7 text-violet-300 transition-transform group-hover:scale-110" />
                  <div className="text-xs text-slate-300">{l}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">Batafsil imkoniyatlar</h2>
            <p className="mt-3 text-slate-400">Bir nechta odat, butun bir hayot tartibi.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { e: "📥", t: "Tezkor Yozib Olish", d: "Ovoz → matn + kategoriya → 10 soniya. Widget, Telegram bot, offline rejim." },
              { e: "🤖", t: "AI Tizimlashtirish", d: "Teglar: #goya #qaror #kitob. Prioritet va takroriy mavzular." },
              { e: "🔍", t: "Aqlli Qidiruv", d: "'3 oy oldin restoran haqida' → topadi. Semantik qidiruv." },
              { e: "☀️", t: "Kundalik Hamroh", d: "Ertalab AI reja taklif qiladi. Kechqurun — kundalik jurnal." },
              { e: "🗺", t: "G'oyalar Xaritasi", d: "G'oyalar orasidagi vizual bog'liqlik. Birlashganda — yangi imkoniyat." },
              { e: "📊", t: "Haftalik Hisobot", d: "12 g'oya, 3 muhim qaror. Fokus tahlili. O'sish grafigi." },
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
              >
                <GlassCard className="h-full p-6" hoverLift>
                  <div className="text-3xl">{f.e}</div>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{f.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.d}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* DAILY FLOW */}
      <Section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-semibold md:text-5xl">Kundalik hayotingizda</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { i: Sun, c: "amber", t: "ERTALAB 07:00", b: "Push: \"Xayrli tong!\" → AI 3 ta vazifa taklif qiladi → Tasdiqlash" },
              { i: Sunset, c: "orange", t: "KUN DAVOMIDA", b: "Widget → Gapiring (30 s) → AI saqlaydi → 10 soniya" },
              { i: Moon, c: "violet", t: "KECHQURUN 21:00", b: "Push: \"Bugun qanday o'tdi?\" → AI bugungi xulosa → Kundalik jurnal" },
            ].map((s, i) => {
              const Icon = s.i;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
                  <GlassCard className="p-7" hoverLift>
                    <Icon className={`h-7 w-7 text-${s.c}-400`} />
                    <div className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500">{s.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{s.b}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* USER SEGMENTS */}
      <Section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-semibold">Kim uchun?</h2>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
            {[
              { e: "🚀", t: "Tadbirkor", d: "G'oyalar, qarorlar, uchrashuvlar — yo'qolmasin", c: "violet" },
              { e: "💼", t: "Professional", d: "Menejer, muhandis, shifokor — ish xotirasi", c: "blue" },
              { e: "🎓", t: "Talaba", d: "Konspekt, o'rganish, imtihon tayyorgarlik", c: "teal" },
              { e: "🎨", t: "Ijodkor", d: "Blogger, dizayner — ilhom va g'oyalar", c: "amber" },
              { e: "👤", t: "Har kim", d: "25–45 yosh — hayotni tartibga solish", c: "emerald" },
            ].map((s, i) => (
              <GlassCard key={i} className={`min-w-[220px] p-5 border-${s.c}-500/30`} hoverLift>
                <div className="text-2xl">{s.e}</div>
                <div className="mt-2 font-serif text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-xs text-slate-400">{s.d}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-semibold md:text-5xl">Oddiy narxlar</h2>
            <p className="mt-3 text-slate-400">Hech qanday yashirin to'lov. Istalgan vaqt bekor.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Bepul", price: "0", per: "so'm/oy", bullets: ["50 yozuv/oy", "30 kun saqlash", "Asosiy qidiruv"], cta: "Bepul Boshlash", variant: "ghost" as const },
              { name: "Pro", price: "49,000", per: "so'm/oy", bullets: ["Cheksiz yozuv", "2 yil tarix", "AI qidiruv", "Haftalik hisobot"], cta: "Pro ni Boshlash", variant: "ghost" as const },
              { name: "Pro+", price: "99,000", per: "so'm/oy", bullets: ["Hammasi + ovoz", "AI suhbat", "Eksport", "2 qurilma"], cta: "Pro+ ni Boshlash", variant: "purple" as const, featured: true },
              { name: "Team", price: "199,000", per: "so'm/oy", bullets: ["5 kishi", "Umumiy brain", "Admin panel", "API"], cta: "Bog'lanish", variant: "ghost" as const },
            ].map((p) => (
              <GlassCard
                key={p.name}
                className={`relative flex flex-col p-7 ${p.featured ? "animate-glow-pulse border-violet-500/50" : ""}`}
                hoverLift={!p.featured}
              >
                {p.featured && (
                  <div className="absolute -top-3 right-5 rotate-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Eng Mashhur
                  </div>
                )}
                <div className="font-serif text-xl">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-serif text-4xl font-semibold">{p.price}</span>
                  <span className="text-xs text-slate-500">{p.per}</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <PurpleButton variant={p.variant} size="sm" className="w-full">{p.cta}</PurpleButton>
                </div>
              </GlassCard>
            ))}
          </div>
          <GlassCard glow="gold" className="mt-8 p-5 text-center text-sm text-amber-100">
            <Lock className="mr-2 inline h-4 w-4" />
            Qanchalik ko'p yozsangiz — shunchalik qimmatli. Bu sizning shaxsiy ikkinchi miyangiz.
          </GlassCard>
        </div>
      </Section>

      {/* SECURITY */}
      <Section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-4xl font-semibold">Ma'lumotlaringiz — sizniki</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { i: Lock, t: "End-to-end shifrlash", d: "Eng shaxsiy fikrlaringiz faqat sizga ko'rinadi" },
              { i: Shield, t: "Reklama yo'q", d: "Ma'lumotlaringiz hech qachon sotilmaydi" },
              { i: Download, t: "Export", d: "Istalgan vaqt PDF, Markdown export" },
            ].map((s, i) => {
              const Icon = s.i;
              return (
                <GlassCard key={i} className="p-7" hoverLift>
                  <Icon className="h-8 w-8 text-violet-300" />
                  <div className="mt-3 font-serif text-xl font-semibold">{s.t}</div>
                  <div className="mt-2 text-sm text-slate-400">{s.d}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </Section>

      {/* STATS */}
      <Section className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            { n: 10000, suf: "+", l: "Foydalanuvchi" },
            { n: 247, suf: "+", l: "Yozuv/foydalanuvchi" },
            { n: 85, suf: "%", l: "AI aniqlik" },
            { n: 14, suf: " kun", l: "Bepul sinov" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-4xl font-bold text-gradient-purple md:text-5xl">
                <CountUp end={s.n} suffix={s.suf} />
              </div>
              <div className="mt-2 text-sm text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="overflow-hidden py-20">
        <h2 className="px-5 text-center font-serif text-4xl font-semibold">Ularning aytishicha</h2>
        <div className="mt-10 group relative">
          <div className="flex w-max animate-marquee gap-5 px-5 group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <GlassCard key={i} className="w-[320px] shrink-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">"{t.quote}"</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* FOOTER CTA */}
      <section className="relative bg-[#040608] px-5 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-5xl font-semibold md:text-6xl">Bugun boshlang</h2>
          <p className="mt-4 text-slate-400">Birinchi yozuvingizni qiling — 10 soniya ketadi.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="email@misol.uz"
              className="glass w-full max-w-xs rounded-full px-5 py-3 text-sm outline-none focus:border-violet-500/50"
            />
            <Link to="/onboarding">
              <PurpleButton>Bepul Kirish <ArrowRight className="h-4 w-4" /></PurpleButton>
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500">14 kun bepul · Karta shart emas · Istalgan vaqt bekor qilish</p>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#040608] px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-slate-500 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg text-slate-300">Mente</span>
            <span>· Hech narsa unutilmasin</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Imkoniyatlar</a>
            <a href="#" className="hover:text-white">Narxlar</a>
            <a href="#" className="hover:text-white">Blog</a>
            <a href="#" className="hover:text-white">Maxfiylik</a>
          </div>
          <div className="text-xs">@SecondBrainAI_bot</div>
        </div>
      </footer>
    </div>
  );
}

const testimonials = [
  { name: "Aziza R.", role: "Founder, Tashkent", quote: "Endi har kuni boshim ochiq. Yozuvlar AI orqali bog'lanadi — bu sehr." },
  { name: "Bekzod M.", role: "PM, Samarkand", quote: "Ovoz orqali yozish — eng yaxshi qism. 10 soniyada hammasi tayyor." },
  { name: "Dilnoza K.", role: "Designer", quote: "Haftalik hisobotlar diqqatimni qayerdaligini tushunishga yordam beradi." },
  { name: "Sardor T.", role: "Investor", quote: "Pitch deck'lar haqidagi g'oyalarim oxir-oqibat tartibga keldi." },
  { name: "Mohira A.", role: "Talaba, ISFT", quote: "Konspektlarim endi yo'qolmaydi. Imtihondan oldin AI dan so'rayman." },
];
