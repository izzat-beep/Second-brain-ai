import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FileText, MessageSquare, Clock, Flame, Search, Bell, Sparkles, Mic, Image, Loader2, ArrowRight, Brain, Star, Link2, Plus } from "lucide-react";
import { G as GlassCard } from "./GlassCard-BtFCAJrK.js";
import { P as PurpleButton } from "./PurpleButton-DBsan-dX.js";
import { c as categoryLabels, a as categoryColors } from "./mockData-D_XhyNLF.js";
import { u as useCurrentUser, h as useStats, g as useNotes, b as useWeekly, i as useDaily, j as useCreateNote } from "./queries-D1abw7hl.js";
import { ResponsiveContainer, LineChart, Line, BarChart, XAxis, Tooltip, Bar } from "recharts";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "./router-BCpxrgjR.js";
function CountUp({
  end
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true
  });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / 1200);
      setV(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end]);
  return /* @__PURE__ */ jsx("span", { ref, children: v.toLocaleString() });
}
function Dashboard() {
  const [noteText, setNoteText] = useState("");
  const [askText, setAskText] = useState("");
  const navigate = useNavigate();
  const {
    data: user
  } = useCurrentUser();
  const {
    data: stats
  } = useStats();
  const {
    data: notes = []
  } = useNotes();
  const {
    data: weekly
  } = useWeekly();
  const {
    data: daily
  } = useDaily();
  const createNote = useCreateNote();
  const statCards = [{
    icon: FileText,
    label: "Jami Yozuvlar",
    value: stats?.totalNotes ?? 0,
    trend: "jami",
    color: "#7C3AED"
  }, {
    icon: MessageSquare,
    label: "AI Tahlillar",
    value: stats?.aiChats ?? 0,
    trend: "bu hafta",
    color: "#3B82F6"
  }, {
    icon: Clock,
    label: "Eslatmalar",
    value: stats?.reminders ?? 0,
    trend: "kelayotgan",
    color: "#F59E0B"
  }, {
    icon: Flame,
    label: "Streak",
    value: stats?.streak ?? 0,
    trend: "kun 🔥",
    color: "#22C55E"
  }];
  const sparkline = stats?.sparkline ?? [0, 0, 0, 0, 0, 0, 0];
  const dailySuggestions = daily?.suggestions ?? [];
  const saveNote = () => {
    const content = noteText.trim();
    if (!content || createNote.isPending) return;
    createNote.mutate({
      content,
      source: "Widget"
    }, {
      onSuccess: () => setNoteText("")
    });
  };
  const ask = () => {
    const q = askText.trim();
    if (!q) return;
    if (typeof window !== "undefined") sessionStorage.setItem("sba_pending_question", q);
    navigate({
      to: "/chat"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 py-8 lg:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h1", { className: "font-serif text-3xl font-semibold md:text-4xl", children: [
          "Xayrli tong, ",
          user?.name ?? "do'stim",
          " ",
          /* @__PURE__ */ jsx("span", { className: "inline-block", children: "👋" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-slate-500", children: (/* @__PURE__ */ new Date()).toLocaleDateString("uz-UZ", {
          weekday: "long",
          day: "numeric",
          month: "long"
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass flex items-center gap-2 rounded-full px-4 py-2", children: [
          /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-slate-400" }),
          /* @__PURE__ */ jsx("input", { placeholder: "Qidiruv... (⌘K)", className: "w-40 bg-transparent text-sm outline-none placeholder:text-slate-500 md:w-56" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "glass relative grid h-10 w-10 place-items-center rounded-full", children: [
          /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-violet-400" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold", children: user?.name?.[0]?.toUpperCase() ?? "M" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4", children: statCards.map((s, i) => {
      const Icon = s.icon;
      return /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.1
      }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "overflow-hidden p-5", hoverLift: true, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl", style: {
            background: `${s.color}22`,
            color: s.color
          }, children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400", children: s.trend })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs text-slate-500", children: s.label }),
        /* @__PURE__ */ jsx("div", { className: "font-serif text-3xl font-semibold", children: /* @__PURE__ */ jsx(CountUp, { end: s.value }) }),
        /* @__PURE__ */ jsx("div", { className: "-mx-2 -mb-2 mt-2 h-10", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(LineChart, { data: sparkline.map((v, idx) => ({
          v,
          idx
        })), children: /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "v", stroke: s.color, strokeWidth: 2, dot: false }) }) }) })
      ] }) }, s.label);
    }) }),
    /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.5
    }, children: /* @__PURE__ */ jsxs(GlassCard, { glow: "purple", className: "mt-8 animate-glow-pulse p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-violet-300", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        " Tezkor yozib olish"
      ] }),
      /* @__PURE__ */ jsx("textarea", { value: noteText, onChange: (e) => setNoteText(e.target.value), onKeyDown: (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") saveNote();
      }, placeholder: "💭 Hozir nimani o'ylayapsiz?", rows: 2, className: "mt-3 w-full resize-none bg-transparent text-lg text-slate-100 placeholder:text-slate-500 outline-none" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: ["#goya", "#ish", "#shaxsiy", "+"].map((t) => /* @__PURE__ */ jsx("button", { className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-violet-500/50", children: t }, t)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("button", { className: "glass grid h-9 w-9 place-items-center rounded-full", children: /* @__PURE__ */ jsx(Mic, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { className: "glass grid h-9 w-9 place-items-center rounded-full", children: /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(PurpleButton, { size: "sm", onClick: saveNote, disabled: !noteText.trim() || createNote.isPending, children: createNote.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Saqlash ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(GlassCard, { glow: "gold", className: "p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-amber-300", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: "🌅" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Bugungi AI tavsiya" })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2 text-sm text-slate-300", children: (dailySuggestions.length ? dailySuggestions : ["Bugun birinchi yozuvingizni qiling", "Bir g'oyani ovoz orqali yozib ko'ring", "Kun oxirida xulosa qiling"]).map((s, i) => /* @__PURE__ */ jsxs("li", { children: [
            "• ",
            s
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl font-semibold", children: "So'nggi yozuvlar" }),
          /* @__PURE__ */ jsx(Link, { to: "/notes", className: "text-xs text-violet-300 hover:text-violet-200", children: "Hammasini ko'rish →" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-2 overflow-x-auto pb-2", children: ["Barchasi", "Bugun", "Muhim", "⭐ Saralangan"].map((f, i) => /* @__PURE__ */ jsx("button", { className: `shrink-0 rounded-full border px-3 py-1 text-xs ${i === 0 ? "border-violet-500/50 bg-violet-500/15 text-violet-200" : "border-white/10 bg-white/5 text-slate-300"}`, children: f }, f)) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-1 gap-4 md:grid-cols-2", children: notes.slice(0, 6).map((n, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
          opacity: 0,
          y: 15
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.6 + i * 0.05
        }, style: {
          minHeight: n.height === "lg" ? 220 : n.height === "md" ? 170 : 140
        }, children: /* @__PURE__ */ jsx(Link, { to: "/notes/$id", params: {
          id: n.id
        }, className: "block h-full", children: /* @__PURE__ */ jsxs(GlassCard, { className: "flex h-full flex-col p-5", hoverLift: true, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full px-2 py-0.5 text-[10px] font-medium", style: {
              background: `${categoryColors[n.category]}22`,
              color: categoryColors[n.category]
            }, children: categoryLabels[n.category] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500", children: n.createdAt })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 line-clamp-1 text-sm font-semibold", children: n.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-3 text-xs text-slate-400", children: n.content }),
          /* @__PURE__ */ jsx("div", { className: "mt-auto flex flex-wrap gap-1 pt-3", children: n.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsx("span", { className: "text-[10px] text-slate-500", children: t }, t)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[10px] text-violet-300", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 line-clamp-1", children: [
              /* @__PURE__ */ jsx(Brain, { className: "h-3 w-3" }),
              " ",
              n.aiSummary.slice(0, 40),
              "…"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Star, { className: `h-3.5 w-3.5 ${n.starred ? "fill-amber-400 text-amber-400" : "text-slate-600"}` }),
              /* @__PURE__ */ jsx(Link2, { className: "h-3.5 w-3.5 text-slate-600" })
            ] })
          ] })
        ] }) }) }, n.id)) }),
        /* @__PURE__ */ jsxs(GlassCard, { className: "mt-6 p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg", children: "Bu hafta" }),
            /* @__PURE__ */ jsx(Link, { to: "/reports", className: "text-xs text-violet-300", children: "To'liq hisobot →" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: (weekly?.topTopics ?? []).slice(0, 4).map((t) => /* @__PURE__ */ jsxs("span", { className: "rounded-full px-2 py-0.5 text-xs", style: {
            background: `${t.color}22`,
            color: t.color
          }, children: [
            t.name,
            " (",
            t.count,
            ")"
          ] }, t.name)) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 h-32", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: weekly?.dailyActivity ?? [], children: [
            /* @__PURE__ */ jsx(XAxis, { dataKey: "day", stroke: "#475569", fontSize: 10, axisLine: false, tickLine: false }),
            /* @__PURE__ */ jsx(Tooltip, { cursor: {
              fill: "rgba(255,255,255,0.04)"
            }, contentStyle: {
              background: "#0f1428",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12
            } }),
            /* @__PURE__ */ jsx(Bar, { dataKey: "count", fill: "#7C3AED", radius: [6, 6, 0, 0] })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(GlassCard, { className: "flex h-fit flex-col p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Brain, { className: "h-4 w-4 text-violet-300" }),
          " AI ga so'rang"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500 to-indigo-600 px-3.5 py-2 text-white", children: "Bu hafta nima yozdim?" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-500/20", children: /* @__PURE__ */ jsx(Brain, { className: "h-3.5 w-3.5 text-violet-300" }) }),
            /* @__PURE__ */ jsx("div", { className: "glass rounded-2xl rounded-tl-sm p-3 text-slate-300", children: "23 ta yozuv — asosan **startup**(8), **dizayn**(6) va **shaxsiy**(5)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass mt-4 flex items-center gap-2 rounded-full px-3 py-2", children: [
          /* @__PURE__ */ jsx("input", { value: askText, onChange: (e) => setAskText(e.target.value), onKeyDown: (e) => e.key === "Enter" && ask(), placeholder: "Yozuvlarimdan so'rang...", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" }),
          /* @__PURE__ */ jsx("button", { onClick: ask, className: "grid h-7 w-7 place-items-center rounded-full bg-violet-500", children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-20 right-5 z-30 lg:bottom-8 lg:right-8", children: /* @__PURE__ */ jsxs("button", { className: "relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_15px_40px_-5px_rgba(124,58,237,0.7)] transition-transform hover:scale-110", children: [
      /* @__PURE__ */ jsx(Plus, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-violet-500 animate-pulse-ring" })
    ] }) })
  ] });
}
export {
  Dashboard as component
};
