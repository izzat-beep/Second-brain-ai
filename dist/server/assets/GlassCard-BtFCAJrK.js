import { jsx } from "react/jsx-runtime";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function GlassCard({ children, className, glow = "none", hoverLift, ...rest }) {
  const glowStyle = glow === "purple" ? "border-[rgba(124,58,237,0.35)] shadow-[0_0_40px_rgba(124,58,237,0.25)]" : glow === "gold" ? "border-[rgba(245,158,11,0.35)] shadow-[0_0_35px_rgba(245,158,11,0.18)]" : glow === "green" ? "border-[rgba(34,197,94,0.35)] shadow-[0_0_35px_rgba(34,197,94,0.18)]" : "";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "glass relative",
        hoverLift && "transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(124,58,237,0.35)] hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.25)]",
        glowStyle,
        className
      ),
      ...rest,
      children
    }
  );
}
export {
  GlassCard as G,
  cn as c
};
