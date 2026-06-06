import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Grid3x3, List, Plus, Search, Loader2, Star, Brain } from "lucide-react";
import { G as GlassCard } from "./GlassCard-BtFCAJrK.js";
import { P as PurpleButton } from "./PurpleButton-DBsan-dX.js";
import { c as categoryLabels, a as categoryColors } from "./mockData-D_XhyNLF.js";
import { g as useNotes } from "./queries-D1abw7hl.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "./router-BCpxrgjR.js";
function Notes() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [view, setView] = useState("grid");
  const {
    data: notes = [],
    isLoading
  } = useNotes();
  const filtered = useMemo(() => notes.filter((n) => {
    if (cat !== "all" && n.category !== cat) return false;
    if (q && !`${n.title} ${n.content}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat, notes]);
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 py-8 lg:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl font-semibold md:text-4xl", children: "Barcha yozuvlarim" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
          notes.length,
          " ta yozuv"
        ] }),
        isLoading && /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Yuklanmoqda" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass flex rounded-full p-1", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => setView("grid"), className: `grid h-8 w-8 place-items-center rounded-full ${view === "grid" ? "bg-violet-500/30 text-violet-200" : "text-slate-400"}`, children: /* @__PURE__ */ jsx(Grid3x3, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => setView("list"), className: `grid h-8 w-8 place-items-center rounded-full ${view === "list" ? "bg-violet-500/30 text-violet-200" : "text-slate-400"}`, children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxs(PurpleButton, { size: "sm", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          " Yangi yozuv"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(GlassCard, { className: "sticky top-3 z-20 mt-6 p-3", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-full bg-white/5 px-4 py-2", children: [
        /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-slate-400" }),
        /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "3 oy oldin...", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: ["all", ...Object.keys(categoryLabels)].map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCat(c), className: `rounded-full px-3 py-1 text-xs ${cat === c ? "bg-violet-500/25 text-violet-200" : "bg-white/5 text-slate-400"}`, children: c === "all" ? "Barchasi" : categoryLabels[c] }, c)) })
    ] }) }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center text-slate-500", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin" }) }),
    !isLoading && filtered.length === 0 && /* @__PURE__ */ jsx("div", { className: "mt-16 text-center text-sm text-slate-500", children: "Hozircha yozuv yo'q. Dashboard'dan birinchi yozuvingizni qo'shing." }),
    /* @__PURE__ */ jsx("div", { className: view === "grid" ? "mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "mt-6 space-y-3", children: filtered.map((n, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
      opacity: 0,
      y: 15
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsx(Link, { to: "/notes/$id", params: {
      id: n.id
    }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-5", hoverLift: true, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full px-2 py-0.5 text-[10px]", style: {
          background: `${categoryColors[n.category]}22`,
          color: categoryColors[n.category]
        }, children: categoryLabels[n.category] }),
        /* @__PURE__ */ jsx(Star, { className: `h-4 w-4 ${n.starred ? "fill-amber-400 text-amber-400" : "text-slate-600"}` })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 font-semibold", children: n.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-400 line-clamp-3", children: n.content }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1 text-[11px] text-slate-500", children: n.tags.map((t) => /* @__PURE__ */ jsx("span", { children: t }, t)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1.5 border-t border-white/5 pt-2 text-[11px] text-violet-300", children: [
        /* @__PURE__ */ jsx(Brain, { className: "h-3.5 w-3.5" }),
        " ",
        n.aiSummary
      ] })
    ] }) }) }, n.id)) })
  ] });
}
export {
  Notes as component
};
