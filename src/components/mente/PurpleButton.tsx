import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface Props extends HTMLMotionProps<"button"> {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "purple" | "ghost";
}

export function PurpleButton({ children, className, size = "md", variant = "purple", ...rest }: Props) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  } as const;

  const base =
    variant === "purple"
      ? "btn-purple"
      : "btn-ghost hover:bg-white/[0.07]";

  return (
    <motion.button
      whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
        base,
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
