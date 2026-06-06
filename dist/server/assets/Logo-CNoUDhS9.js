import { jsxs, jsx } from "react/jsx-runtime";
import { Brain } from "lucide-react";
import { Link } from "@tanstack/react-router";
function Logo({ withBadge = true }) {
  return /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_8px_25px_-8px_rgba(124,58,237,0.7)]", children: [
      /* @__PURE__ */ jsx(Brain, { className: "h-5 w-5 text-white", strokeWidth: 2.2 }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-xl bg-violet-400/20 blur-xl group-hover:blur-2xl transition-all" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1.5", children: [
      /* @__PURE__ */ jsx("span", { className: "font-serif text-xl font-semibold tracking-tight text-slate-100", children: "Mente" }),
      withBadge && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white", children: "AI" })
    ] })
  ] });
}
export {
  Logo as L
};
