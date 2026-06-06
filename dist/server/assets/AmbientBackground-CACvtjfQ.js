import { jsxs, jsx } from "react/jsx-runtime";
function AmbientBackground() {
  return /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "animate-blob absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full",
        style: { background: "radial-gradient(closest-side, rgba(124,58,237,0.20), transparent 70%)", animationDuration: "8s" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "animate-blob absolute -top-32 right-[-200px] h-[500px] w-[500px] rounded-full",
        style: { background: "radial-gradient(closest-side, rgba(59,130,246,0.15), transparent 70%)", animationDuration: "10s" }
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "animate-blob absolute bottom-[-300px] left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full",
        style: { background: "radial-gradient(closest-side, rgba(6,182,212,0.12), transparent 70%)", animationDuration: "12s" }
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "noise absolute inset-0" })
  ] });
}
export {
  AmbientBackground as A
};
