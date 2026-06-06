import { jsxs, jsx } from "react/jsx-runtime";
import { Loader2, Plus, Clock, Check } from "lucide-react";
import { G as GlassCard } from "./GlassCard-BtFCAJrK.js";
import { P as PurpleButton } from "./PurpleButton-DBsan-dX.js";
import { c as useReminders, d as useToggleReminder, e as useCreateReminder } from "./queries-D1abw7hl.js";
import "clsx";
import "tailwind-merge";
import "framer-motion";
import "@tanstack/react-query";
import "./router-BCpxrgjR.js";
import "@tanstack/react-router";
import "react";
const groups = ["Bugun", "Ertaga", "Bu hafta", "Keyinroq"];
function Reminders() {
  const {
    data: reminders = [],
    isLoading
  } = useReminders();
  const toggle = useToggleReminder();
  const create = useCreateReminder();
  const addReminder = () => {
    if (typeof window === "undefined") return;
    const title = window.prompt("Eslatma matni:");
    if (!title?.trim()) return;
    const due = /* @__PURE__ */ new Date();
    due.setHours(due.getHours() + 3);
    create.mutate({
      title: title.trim(),
      dueAt: due.toISOString(),
      priority: "Oddiy"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-5 py-8 lg:px-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl font-semibold md:text-4xl", children: "Eslatmalarim" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-slate-500", children: [
          reminders.filter((r) => !r.done).length,
          " kelayotgan"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(PurpleButton, { size: "sm", onClick: addReminder, disabled: create.isPending, children: [
        create.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        " Yangi eslatma"
      ] })
    ] }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "mt-16 flex justify-center text-slate-500", children: /* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin" }) }),
    !isLoading && reminders.length === 0 && /* @__PURE__ */ jsx("div", { className: "mt-16 text-center text-sm text-slate-500", children: "Hozircha eslatma yo'q." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-8", children: groups.map((g) => {
      const items = reminders.filter((r) => r.when === g);
      if (!items.length) return null;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500", children: g }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: items.map((r) => /* @__PURE__ */ jsxs(GlassCard, { className: `flex items-center gap-4 p-4 ${r.priority === "Muhim" ? "border-l-4 border-l-rose-500" : "border-l-4 border-l-amber-500"} ${r.done ? "opacity-50" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: "grid h-10 w-10 place-items-center rounded-full bg-violet-500/10 text-xs font-medium text-violet-200", children: /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: `text-sm font-medium ${r.done ? "line-through" : ""}`, children: r.title }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-500", children: r.dueDate })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => toggle.mutate({
            id: r.id,
            done: !r.done
          }), className: `grid h-7 w-7 place-items-center rounded-full border transition-colors ${r.done ? "border-emerald-500/50 bg-emerald-500/20" : "border-white/10 hover:border-emerald-500/50"}`, children: r.done && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-emerald-300" }) })
        ] }, r.id)) })
      ] }, g);
    }) }),
    /* @__PURE__ */ jsxs(GlassCard, { glow: "gold", className: "mt-10 p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg", children: "Kundalik hamroh" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "🌅 Ertalab eslatmasi" }),
          /* @__PURE__ */ jsx("input", { type: "time", defaultValue: "07:00", className: "rounded-lg bg-white/5 px-2.5 py-1.5 text-sm outline-none" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "🌙 Kechqurun eslatmasi" }),
          /* @__PURE__ */ jsx("input", { type: "time", defaultValue: "21:00", className: "rounded-lg bg-white/5 px-2.5 py-1.5 text-sm outline-none" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Reminders as component
};
