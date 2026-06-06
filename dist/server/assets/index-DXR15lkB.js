import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X, Menu, Sparkles, ArrowRight, Play, Check, Mic, Pencil, Image, Link as Link$1, Bot, Smartphone, Sun, Sunset, Moon, Lock, Shield, Download, Star } from "lucide-react";
import { L as Logo } from "./Logo-CNoUDhS9.js";
import { P as PurpleButton } from "./PurpleButton-DBsan-dX.js";
import { A as AmbientBackground } from "./AmbientBackground-CACvtjfQ.js";
import { G as GlassCard } from "./GlassCard-BtFCAJrK.js";
import "clsx";
import "tailwind-merge";
const links = [
  { href: "#features", label: "Imkoniyatlar" },
  { href: "#pricing", label: "Narxlar" },
  { href: "#how", label: "Qanday ishlaydi" },
  { href: "#about", label: "Biz haqimizda" }
];
function LandingNavbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    motion.header,
    {
      className: "fixed inset-x-0 top-0 z-50 border-b border-transparent",
      style: {
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(7,11,20,${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(180%)`)
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-5 py-4", children: [
          /* @__PURE__ */ jsx(Logo, {}),
          /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, className: "text-sm text-slate-300 transition-colors hover:text-white", children: l.label }, l.href)) }),
          /* @__PURE__ */ jsxs("div", { className: "hidden items-center gap-3 lg:flex", children: [
            /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "text-sm text-slate-300 transition-colors hover:text-white", children: "Kirish" }),
            /* @__PURE__ */ jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsx(PurpleButton, { size: "sm", children: "Mulohaza bepul" }) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Menyu",
              className: "grid h-10 w-10 place-items-center rounded-full bg-white/5 lg:hidden",
              onClick: () => setOpen((v) => !v),
              children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: "glass mx-4 mb-3 rounded-2xl p-5 lg:hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
              links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, className: "text-slate-200", onClick: () => setOpen(false), children: l.label }, l.href)),
              /* @__PURE__ */ jsx(Link, { to: "/onboarding", onClick: () => setOpen(false), children: /* @__PURE__ */ jsx(PurpleButton, { size: "sm", className: "w-full", children: "Bepul boshlash" }) })
            ] })
          }
        )
      ]
    }
  );
}
const positions = [
  { x: -420, y: 0, z: -30, rz: -32, ry: -8 },
  { x: -210, y: 0, z: -10, rz: -16, ry: -4 },
  { x: 0, y: 0, z: 0, rz: 0, ry: 0 },
  { x: 210, y: 0, z: -10, rz: 16, ry: 4 },
  { x: 420, y: 0, z: -30, rz: 32, ry: 8 }
];
const floatDelays = [0, 0.6, 1.2, 1.8, 2.4];
const fanOrder = [0, 4, 1, 3, 2];
function Card({
  card,
  index,
  hovered,
  setHovered
}) {
  const [flipped, setFlipped] = useState(false);
  const pos = positions[index];
  const fanIndex = fanOrder.indexOf(index);
  const isHovered = hovered === index;
  const dim = hovered !== null && hovered !== index;
  const hoverTransform = isHovered ? `perspective(1400px) rotateZ(${pos.rz * 0.7}deg) rotateY(${pos.ry * 0.5}deg) translate3d(${pos.x}px, ${pos.y - 18}px, ${pos.z + 55}px) scale(1.18)` : `perspective(1400px) rotateZ(${pos.rz}deg) rotateY(${pos.ry}deg) translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${dim ? 0.96 : 1})`;
  const brightness = pos.z < -20 ? 0.88 : pos.z < 0 ? 0.94 : 1;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "absolute left-1/2 top-1/2 will-change-transform",
      style: {
        width: 200,
        height: 280,
        marginLeft: -100,
        marginTop: -140,
        transformStyle: "preserve-3d"
      },
      initial: {
        opacity: 0.6,
        transform: "perspective(1400px) rotateZ(0deg) rotateY(0deg) translate3d(0,0,0) scale(0.85)"
      },
      animate: {
        opacity: dim ? 0.75 : 1,
        transform: hoverTransform
      },
      transition: {
        delay: 0.4 + fanIndex * 0.15,
        type: "spring",
        stiffness: isHovered ? 200 : 45,
        damping: isHovered ? 20 : 14,
        mass: 1.2
      },
      onMouseEnter: () => setHovered(index),
      onMouseLeave: () => setHovered(null),
      onClick: () => setFlipped((f) => !f),
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "h-full w-full cursor-pointer",
          style: { transformStyle: "preserve-3d" },
          animate: {
            y: [0, -10, 0],
            rotateY: flipped ? 180 : 0
          },
          transition: {
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5 + floatDelays[index]
            },
            rotateY: { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
          },
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "absolute inset-0 overflow-hidden rounded-2xl p-5 text-white",
                style: {
                  background: `linear-gradient(155deg, ${card.gradient[0]}, ${card.gradient[1]})`,
                  boxShadow: isHovered ? `0 30px 80px ${card.gradient[1]}80, 0 0 40px ${card.gradient[0]}55` : "0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
                  filter: `brightness(${brightness})`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/30" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative flex h-full flex-col", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-[0.2em] opacity-80", children: card.label }),
                    /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
                      /* @__PURE__ */ jsx("div", { className: "mb-3 text-4xl", children: card.emoji }),
                      /* @__PURE__ */ jsx("div", { className: "font-serif text-xl font-semibold leading-tight", children: card.title }),
                      /* @__PURE__ */ jsx("div", { className: "mt-1.5 text-xs leading-snug opacity-85", children: card.subtitle })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "absolute inset-0 overflow-hidden rounded-2xl p-5 text-white",
                style: {
                  background: `linear-gradient(195deg, ${card.gradient[1]}, ${card.gradient[0]})`,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                },
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20" }),
                  /* @__PURE__ */ jsxs("div", { className: "relative flex h-full flex-col", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-3xl", children: card.emoji }),
                    /* @__PURE__ */ jsx("div", { className: "mt-2 font-serif text-lg font-semibold", children: card.title }),
                    /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs leading-relaxed opacity-90", children: card.description }),
                    /* @__PURE__ */ jsx("div", { className: "mt-auto text-[10px] uppercase tracking-widest opacity-70", children: "Yopish uchun bosing" })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function CinematicCardFan({ cards }) {
  const [hovered, setHovered] = useState(null);
  return /* @__PURE__ */ jsxs("div", { className: "relative mx-auto h-[420px] w-full max-w-[720px]", style: { perspective: 1400 }, children: [
    /* @__PURE__ */ jsx(FloatBadge, { style: { top: 0, left: "10%" }, color: "#06B6D4", delay: 0, children: "🎙 Ovoz→Matn" }),
    /* @__PURE__ */ jsx(FloatBadge, { style: { top: "15%", right: "5%" }, color: "#7C3AED", delay: 1, children: "🧠 Claude API" }),
    /* @__PURE__ */ jsx(FloatBadge, { style: { bottom: "12%", left: "3%" }, color: "#3B82F6", delay: 2, children: "📱 Telegram Bot" }),
    /* @__PURE__ */ jsx(FloatBadge, { style: { bottom: "5%", right: "12%" }, color: "#22C55E", delay: 1.5, children: "🇺🇿 O'zbek tili" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "relative h-full w-full",
        style: { transformStyle: "preserve-3d", transform: "translateZ(0)" },
        children: cards.map((c, i) => /* @__PURE__ */ jsx(Card, { card: c, index: i, hovered, setHovered }, i))
      }
    )
  ] });
}
function FloatBadge({
  children,
  style,
  color,
  delay
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "glass absolute z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-100",
      style: { ...style, borderColor: `${color}55`, boxShadow: `0 8px 25px ${color}33` },
      initial: { opacity: 0, scale: 0.8 },
      animate: {
        opacity: 1,
        scale: 1,
        y: [0, -6, 0, 6, 0],
        rotateZ: [0, 3, 0, -3, 0]
      },
      transition: {
        opacity: { delay: 2 + delay * 0.2, duration: 0.5 },
        scale: { delay: 2 + delay * 0.2, duration: 0.5 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }
      },
      children
    }
  );
}
const fanCards = [{
  label: "Capture",
  title: "Yozib olish",
  subtitle: "Ovoz, matn, rasm — 10 soniya",
  description: "Widget, Telegram bot yoki app — qaerda bo'lsangiz, fikrlaringizni darhol qayd eting. Offline rejimda ham ishlaydi.",
  gradient: ["#F59E0B", "#E8824A"],
  emoji: "📥"
}, {
  label: "Organize",
  title: "AI Tizimlashtirish",
  subtitle: "Avtomatik kategoriya va teglar",
  description: "Claude API har bir yozuvni avtomatik tahlil qiladi: kategoriya, teglar, prioritet va kayfiyat aniqlanadi.",
  gradient: ["#7C3AED", "#6D28D9"],
  emoji: "🤖"
}, {
  label: "Connect",
  title: "Bog'lash",
  subtitle: "G'oyalar orasidagi yashirin bog'liqlik",
  description: "Eski yozuvlaringiz orasidagi bog'liqlikni AI topadi. 2 g'oya birlashsa — yangi imkoniyat.",
  gradient: ["#3B82F6", "#1F4E96"],
  emoji: "🔗"
}, {
  label: "Reflect",
  title: "Tahlil",
  subtitle: "Haftalik AI hisobot va pattern",
  description: "Har hafta sizning fokusingiz, takroriy mavzularingiz va o'sish grafigi haqida AI hisobot.",
  gradient: ["#06B6D4", "#0F766E"],
  emoji: "🪞"
}, {
  label: "Act",
  title: "Harakat",
  subtitle: "Kundalik reja va qaror yordami",
  description: "Ertalab AI sizga 3 ta vazifa taklif qiladi. Kechqurun — kun xulosasi. Hech qachon yo'lingizdan adashmang.",
  gradient: ["#22C55E", "#166534"],
  emoji: "⚡"
}];
function Section({
  children,
  className = "",
  id
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.15
  });
  return /* @__PURE__ */ jsx("section", { id, ref, className: `relative ${className}`, children: /* @__PURE__ */ jsx(motion.div, { initial: {
    opacity: 0,
    y: 30
  }, animate: inView ? {
    opacity: 1,
    y: 0
  } : {}, transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }, children }) });
}
function CountUp({
  end,
  suffix = ""
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true
  });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    val.toLocaleString(),
    suffix
  ] });
}
function Landing() {
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(AmbientBackground, {}),
    /* @__PURE__ */ jsx(LandingNavbar, {}),
    /* @__PURE__ */ jsxs("header", { className: "relative px-5 pb-10 pt-32 lg:pt-40", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl text-center", children: [
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, className: "inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-200 backdrop-blur-xl animate-glow-pulse", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          "Shaxsiy AI Xotira Tizimi · MVP v1.0"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-7 font-serif text-5xl font-light leading-[1.05] tracking-tight md:text-7xl lg:text-[88px]", children: [
          /* @__PURE__ */ jsx(motion.span, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 0.1
          }, className: "block text-slate-100", children: "Hech narsa" }),
          /* @__PURE__ */ jsx(motion.span, { initial: {
            opacity: 0,
            y: 20
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.6,
            delay: 0.3
          }, className: "block font-bold text-gradient-purple", children: "Unutilmasin." })
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5,
          delay: 0.5
        }, className: "mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl", children: "Har kuni yo'qotayotgan g'oyalaringiz, qarorlaringiz, o'rganganlaringiz — endi bitta joyda. AI tahlil qiladi, eslatadi, bog'laydi." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5,
          delay: 0.7
        }, className: "mt-9 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxs(PurpleButton, { size: "lg", children: [
            "Bepul Boshlash ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-5 w-5" })
          ] }) }),
          /* @__PURE__ */ jsxs(PurpleButton, { size: "lg", variant: "ghost", children: [
            /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" }),
            " Qanday ishlaydi?"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          delay: 0.9
        }, className: "mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-emerald-400" }),
            " 14 kun bepul"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-emerald-400" }),
            " Karta shart emas"
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 text-emerald-400" }),
            " O'zbek tili"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-16 max-w-7xl", children: /* @__PURE__ */ jsx(CinematicCardFan, { cards: fanCards }) })
    ] }),
    /* @__PURE__ */ jsx(Section, { id: "how", className: "px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold md:text-5xl", children: "3 qadam — xolos" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-400", children: "Murakkab emas. Odatga aylantirish oson." }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", children: [{
        n: 1,
        icon: "📤",
        title: "Yozib olish",
        text: "Widget bosing, gapiring yoki yozing. 10 soniya — tugadi."
      }, {
        n: 2,
        icon: "🧠",
        title: "AI Ishlaydi",
        text: "Mente avtomatik kategoriya, teg beradi. Eski yozuvlar bilan bog'liqlik topadi."
      }, {
        n: 3,
        icon: "🔍",
        title: "Eslash",
        text: "Oylar oldin yozganingizni so'rang. AI xotirangizdan javob beradi."
      }].map((s, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.12
      }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "relative p-7 text-left", hoverLift: true, children: [
        /* @__PURE__ */ jsx("div", { className: "absolute -top-4 left-7 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold", children: s.n }),
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-4xl", children: s.icon }),
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold", children: s.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-400", children: s.text })
      ] }) }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { className: "px-5 py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-serif text-3xl font-semibold md:text-4xl", children: "Qanday usulda ham yozing" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6", children: [{
        i: Mic,
        l: "Ovoz"
      }, {
        i: Pencil,
        l: "Matn"
      }, {
        i: Image,
        l: "Rasm"
      }, {
        i: Link$1,
        l: "Link"
      }, {
        i: Bot,
        l: "Telegram"
      }, {
        i: Smartphone,
        l: "Widget"
      }].map(({
        i: Icon,
        l
      }, idx) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        scale: 0.9
      }, whileInView: {
        opacity: 1,
        scale: 1
      }, viewport: {
        once: true
      }, transition: {
        delay: idx * 0.06
      }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "group flex flex-col items-center gap-2 p-5 transition-all hover:border-violet-500/40", hoverLift: true, children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-7 w-7 text-violet-300 transition-transform group-hover:scale-110" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-300", children: l })
      ] }) }, l)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { id: "features", className: "px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold md:text-5xl", children: "Batafsil imkoniyatlar" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-400", children: "Bir nechta odat, butun bir hayot tartibi." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: [{
        e: "📥",
        t: "Tezkor Yozib Olish",
        d: "Ovoz → matn + kategoriya → 10 soniya. Widget, Telegram bot, offline rejim."
      }, {
        e: "🤖",
        t: "AI Tizimlashtirish",
        d: "Teglar: #goya #qaror #kitob. Prioritet va takroriy mavzular."
      }, {
        e: "🔍",
        t: "Aqlli Qidiruv",
        d: "'3 oy oldin restoran haqida' → topadi. Semantik qidiruv."
      }, {
        e: "☀️",
        t: "Kundalik Hamroh",
        d: "Ertalab AI reja taklif qiladi. Kechqurun — kundalik jurnal."
      }, {
        e: "🗺",
        t: "G'oyalar Xaritasi",
        d: "G'oyalar orasidagi vizual bog'liqlik. Birlashganda — yangi imkoniyat."
      }, {
        e: "📊",
        t: "Haftalik Hisobot",
        d: "12 g'oya, 3 muhim qaror. Fokus tahlili. O'sish grafigi."
      }].map((f, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i % 3 * 0.08
      }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "h-full p-6", hoverLift: true, children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl", children: f.e }),
        /* @__PURE__ */ jsx("h3", { className: "mt-3 font-serif text-xl font-semibold", children: f.t }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-400", children: f.d })
      ] }) }, f.t)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { className: "px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-serif text-4xl font-semibold md:text-5xl", children: "Kundalik hayotingizda" }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-3", children: [{
        i: Sun,
        c: "amber",
        t: "ERTALAB 07:00",
        b: 'Push: "Xayrli tong!" → AI 3 ta vazifa taklif qiladi → Tasdiqlash'
      }, {
        i: Sunset,
        c: "orange",
        t: "KUN DAVOMIDA",
        b: "Widget → Gapiring (30 s) → AI saqlaydi → 10 soniya"
      }, {
        i: Moon,
        c: "violet",
        t: "KECHQURUN 21:00",
        b: `Push: "Bugun qanday o'tdi?" → AI bugungi xulosa → Kundalik jurnal`
      }].map((s, i) => {
        const Icon = s.i;
        return /* @__PURE__ */ jsx(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.12
        }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-7", hoverLift: true, children: [
          /* @__PURE__ */ jsx(Icon, { className: `h-7 w-7 text-${s.c}-400` }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs font-semibold uppercase tracking-widest text-slate-500", children: s.t }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-slate-300", children: s.b })
        ] }) }, i);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { className: "px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-serif text-4xl font-semibold", children: "Kim uchun?" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible", children: [{
        e: "🚀",
        t: "Tadbirkor",
        d: "G'oyalar, qarorlar, uchrashuvlar — yo'qolmasin",
        c: "violet"
      }, {
        e: "💼",
        t: "Professional",
        d: "Menejer, muhandis, shifokor — ish xotirasi",
        c: "blue"
      }, {
        e: "🎓",
        t: "Talaba",
        d: "Konspekt, o'rganish, imtihon tayyorgarlik",
        c: "teal"
      }, {
        e: "🎨",
        t: "Ijodkor",
        d: "Blogger, dizayner — ilhom va g'oyalar",
        c: "amber"
      }, {
        e: "👤",
        t: "Har kim",
        d: "25–45 yosh — hayotni tartibga solish",
        c: "emerald"
      }].map((s, i) => /* @__PURE__ */ jsxs(GlassCard, { className: `min-w-[220px] p-5 border-${s.c}-500/30`, hoverLift: true, children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl", children: s.e }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 font-serif text-lg font-semibold", children: s.t }),
        /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-slate-400", children: s.d })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { id: "pricing", className: "px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold md:text-5xl", children: "Oddiy narxlar" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-slate-400", children: "Hech qanday yashirin to'lov. Istalgan vaqt bekor." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: [{
        name: "Bepul",
        price: "0",
        per: "so'm/oy",
        bullets: ["50 yozuv/oy", "30 kun saqlash", "Asosiy qidiruv"],
        cta: "Bepul Boshlash",
        variant: "ghost"
      }, {
        name: "Pro",
        price: "49,000",
        per: "so'm/oy",
        bullets: ["Cheksiz yozuv", "2 yil tarix", "AI qidiruv", "Haftalik hisobot"],
        cta: "Pro ni Boshlash",
        variant: "ghost"
      }, {
        name: "Pro+",
        price: "99,000",
        per: "so'm/oy",
        bullets: ["Hammasi + ovoz", "AI suhbat", "Eksport", "2 qurilma"],
        cta: "Pro+ ni Boshlash",
        variant: "purple",
        featured: true
      }, {
        name: "Team",
        price: "199,000",
        per: "so'm/oy",
        bullets: ["5 kishi", "Umumiy brain", "Admin panel", "API"],
        cta: "Bog'lanish",
        variant: "ghost"
      }].map((p) => /* @__PURE__ */ jsxs(GlassCard, { className: `relative flex flex-col p-7 ${p.featured ? "animate-glow-pulse border-violet-500/50" : ""}`, hoverLift: !p.featured, children: [
        p.featured && /* @__PURE__ */ jsx("div", { className: "absolute -top-3 right-5 rotate-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg", children: "Eng Mashhur" }),
        /* @__PURE__ */ jsx("div", { className: "font-serif text-xl", children: p.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "font-serif text-4xl font-semibold", children: p.price }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: p.per })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-2.5", children: p.bullets.map((b) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 text-sm text-slate-300", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-emerald-400" }),
          " ",
          b
        ] }, b)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(PurpleButton, { variant: p.variant, size: "sm", className: "w-full", children: p.cta }) })
      ] }, p.name)) }),
      /* @__PURE__ */ jsxs(GlassCard, { glow: "gold", className: "mt-8 p-5 text-center text-sm text-amber-100", children: [
        /* @__PURE__ */ jsx(Lock, { className: "mr-2 inline h-4 w-4" }),
        "Qanchalik ko'p yozsangiz — shunchalik qimmatli. Bu sizning shaxsiy ikkinchi miyangiz."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { className: "px-5 py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-serif text-4xl font-semibold", children: "Ma'lumotlaringiz — sizniki" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 md:grid-cols-3", children: [{
        i: Lock,
        t: "End-to-end shifrlash",
        d: "Eng shaxsiy fikrlaringiz faqat sizga ko'rinadi"
      }, {
        i: Shield,
        t: "Reklama yo'q",
        d: "Ma'lumotlaringiz hech qachon sotilmaydi"
      }, {
        i: Download,
        t: "Export",
        d: "Istalgan vaqt PDF, Markdown export"
      }].map((s, i) => {
        const Icon = s.i;
        return /* @__PURE__ */ jsxs(GlassCard, { className: "p-7", hoverLift: true, children: [
          /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8 text-violet-300" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 font-serif text-xl font-semibold", children: s.t }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-slate-400", children: s.d })
        ] }, i);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(Section, { className: "px-5 py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center md:grid-cols-4", children: [{
      n: 1e4,
      suf: "+",
      l: "Foydalanuvchi"
    }, {
      n: 247,
      suf: "+",
      l: "Yozuv/foydalanuvchi"
    }, {
      n: 85,
      suf: "%",
      l: "AI aniqlik"
    }, {
      n: 14,
      suf: " kun",
      l: "Bepul sinov"
    }].map((s) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "font-serif text-4xl font-bold text-gradient-purple md:text-5xl", children: /* @__PURE__ */ jsx(CountUp, { end: s.n, suffix: s.suf }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-slate-400", children: s.l })
    ] }, s.l)) }) }),
    /* @__PURE__ */ jsxs(Section, { className: "overflow-hidden py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "px-5 text-center font-serif text-4xl font-semibold", children: "Ularning aytishicha" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 group relative", children: /* @__PURE__ */ jsx("div", { className: "flex w-max animate-marquee gap-5 px-5 group-hover:[animation-play-state:paused]", children: [...testimonials, ...testimonials].map((t, i) => /* @__PURE__ */ jsxs(GlassCard, { className: "w-[320px] shrink-0 p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold", children: t.name[0] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: t.name }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: t.role })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-0.5", children: Array.from({
          length: 5
        }).map((_, i2) => /* @__PURE__ */ jsx(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }, i2)) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm leading-relaxed text-slate-300", children: [
          '"',
          t.quote,
          '"'
        ] })
      ] }, i)) }) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative bg-[#040608] px-5 py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-5xl font-semibold md:text-6xl", children: "Bugun boshlang" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-slate-400", children: "Birinchi yozuvingizni qiling — 10 soniya ketadi." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center", children: [
        /* @__PURE__ */ jsx("input", { type: "email", placeholder: "email@misol.uz", className: "glass w-full max-w-xs rounded-full px-5 py-3 text-sm outline-none focus:border-violet-500/50" }),
        /* @__PURE__ */ jsx(Link, { to: "/onboarding", children: /* @__PURE__ */ jsxs(PurpleButton, { children: [
          "Bepul Kirish ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-slate-500", children: "14 kun bepul · Karta shart emas · Istalgan vaqt bekor qilish" })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "border-t border-white/5 bg-[#040608] px-5 py-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm text-slate-500 md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "font-serif text-lg text-slate-300", children: "Mente" }),
        /* @__PURE__ */ jsx("span", { children: "· Hech narsa unutilmasin" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white", children: "Imkoniyatlar" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white", children: "Narxlar" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white", children: "Blog" }),
        /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-white", children: "Maxfiylik" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs", children: "@SecondBrainAI_bot" })
    ] }) })
  ] });
}
const testimonials = [{
  name: "Aziza R.",
  role: "Founder, Tashkent",
  quote: "Endi har kuni boshim ochiq. Yozuvlar AI orqali bog'lanadi — bu sehr."
}, {
  name: "Bekzod M.",
  role: "PM, Samarkand",
  quote: "Ovoz orqali yozish — eng yaxshi qism. 10 soniyada hammasi tayyor."
}, {
  name: "Dilnoza K.",
  role: "Designer",
  quote: "Haftalik hisobotlar diqqatimni qayerdaligini tushunishga yordam beradi."
}, {
  name: "Sardor T.",
  role: "Investor",
  quote: "Pitch deck'lar haqidagi g'oyalarim oxir-oqibat tartibga keldi."
}, {
  name: "Mohira A.",
  role: "Talaba, ISFT",
  quote: "Konspektlarim endi yo'qolmaydi. Imtihondan oldin AI dan so'rayman."
}];
export {
  Landing as component
};
