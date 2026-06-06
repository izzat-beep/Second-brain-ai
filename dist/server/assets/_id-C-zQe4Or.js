import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { Loader2, ChevronRight, Brain, Link2, Star, Share2, Trash2 } from "lucide-react";
import { G as GlassCard } from "./GlassCard-BtFCAJrK.js";
import { a as categoryColors, c as categoryLabels } from "./mockData-D_XhyNLF.js";
import { m as useNote, n as useUpdateNote, o as useDeleteNote } from "./queries-D1abw7hl.js";
import { R as Route } from "./router-BCpxrgjR.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "react";
function NoteDetail() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError
  } = useNote(id);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  if (isLoading || !data && !isError) {
    return /* @__PURE__ */ jsx("div", { className: "grid min-h-[60vh] place-items-center text-slate-500", children: /* @__PURE__ */ jsx(Loader2, { className: "h-7 w-7 animate-spin" }) });
  }
  if (isError || !data) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-20 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-2xl", children: "Yozuv topilmadi" }),
      /* @__PURE__ */ jsx(Link, { to: "/notes", className: "mt-4 inline-block text-sm text-violet-300", children: "← Yozuvlarga qaytish" })
    ] });
  }
  const n = data.note;
  const connected = data.connected;
  const catColor = categoryColors[n.category];
  const catLabel = categoryLabels[n.category];
  const toggleStar = () => updateNote.mutate({
    id: n.id,
    patch: {
      starred: !n.starred
    }
  });
  const remove = () => {
    if (typeof window !== "undefined" && !window.confirm("Yozuvni o'chirishni tasdiqlaysizmi?")) return;
    deleteNote.mutate(n.id, {
      onSuccess: () => navigate({
        to: "/notes"
      })
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-5 py-8 lg:px-10", children: [
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-1 text-xs text-slate-500", children: [
      /* @__PURE__ */ jsx(Link, { to: "/dashboard", className: "hover:text-white", children: "Dashboard" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }),
      /* @__PURE__ */ jsx(Link, { to: "/notes", className: "hover:text-white", children: "Yozuvlarim" }),
      /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }),
      /* @__PURE__ */ jsx("span", { className: "text-slate-300 line-clamp-1", children: n.title })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "rounded-full px-2.5 py-1 text-xs", style: {
        background: `${catColor}22`,
        color: catColor
      }, children: catLabel }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full bg-amber-500/15 px-2.5 py-1 text-xs text-amber-300", children: n.priority }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: n.createdAt })
    ] }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl font-semibold", children: n.title }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: n.tags.map((t) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-violet-500/15 px-2 py-0.5 text-xs text-violet-300", children: t }, t)) }),
    /* @__PURE__ */ jsxs(GlassCard, { className: "mt-6 p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed text-slate-200 whitespace-pre-wrap", children: n.content }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-slate-500", children: "Saqlandi ✓" })
    ] }),
    /* @__PURE__ */ jsxs(GlassCard, { glow: "purple", className: "mt-5 p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Brain, { className: "h-4 w-4 text-violet-300" }),
        " AI Tahlili"
      ] }),
      /* @__PURE__ */ jsxs("dl", { className: "mt-4 grid gap-2 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-slate-500", children: "Kategoriya" }),
          /* @__PURE__ */ jsx("dd", { children: catLabel })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-slate-500", children: "Prioritet" }),
          /* @__PURE__ */ jsx("dd", { children: n.priority })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-slate-500", children: "Kayfiyat" }),
          /* @__PURE__ */ jsx("dd", { children: n.mood })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 border-t border-white/5 pt-2 text-slate-300", children: n.aiSummary })
      ] })
    ] }),
    connected.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-serif text-xl", children: [
        /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4" }),
        " Bog'liq yozuvlar"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 grid gap-3 md:grid-cols-2", children: connected.map((c) => {
        const pct = Math.round((c.strength ?? 0.6) * 100);
        return /* @__PURE__ */ jsx(Link, { to: "/notes/$id", params: {
          id: c.id
        }, children: /* @__PURE__ */ jsxs(GlassCard, { className: "p-4", hoverLift: true, children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: c.title }),
          /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-slate-500 line-clamp-2", children: c.content }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 h-1 w-full overflow-hidden rounded bg-white/5", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-violet-500 to-indigo-500", style: {
            width: `${pct}%`
          } }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-1 text-[10px] text-slate-500", children: [
            "Bog'liqlik: ",
            pct,
            "%",
            c.reason ? ` · ${c.reason}` : ""
          ] })
        ] }) }, c.id);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sticky bottom-20 mt-8 lg:bottom-5", children: /* @__PURE__ */ jsxs(GlassCard, { className: "flex flex-wrap items-center justify-around gap-2 p-3", children: [
      /* @__PURE__ */ jsxs("button", { onClick: toggleStar, className: `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5 ${n.starred ? "text-amber-300" : ""}`, children: [
        /* @__PURE__ */ jsx(Star, { className: `h-4 w-4 ${n.starred ? "fill-amber-400 text-amber-400" : ""}` }),
        " ",
        n.starred ? "Saralangan" : "Saralash"
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/map", className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5", children: [
        /* @__PURE__ */ jsx(Link2, { className: "h-4 w-4" }),
        " Xaritada"
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white/5", children: [
        /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
        " Ulashish"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: remove, disabled: deleteNote.isPending, className: "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-rose-400 hover:bg-white/5", children: [
        deleteNote.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }),
        " O'chirish"
      ] })
    ] }) })
  ] });
}
export {
  NoteDetail as component
};
