import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "purple" | "gold" | "green" | "none";
  hoverLift?: boolean;
}

export function GlassCard({ children, className, glow = "none", hoverLift, ...rest }: GlassCardProps) {
  const glowStyle =
    glow === "purple"
      ? "border-[rgba(124,58,237,0.35)] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
      : glow === "gold"
        ? "border-[rgba(245,158,11,0.35)] shadow-[0_0_35px_rgba(245,158,11,0.18)]"
        : glow === "green"
          ? "border-[rgba(34,197,94,0.35)] shadow-[0_0_35px_rgba(34,197,94,0.18)]"
          : "";
  return (
    <div
      className={cn(
        "glass relative",
        hoverLift && "transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(124,58,237,0.35)] hover:shadow-[0_20px_50px_-10px_rgba(124,58,237,0.25)]",
        glowStyle,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
