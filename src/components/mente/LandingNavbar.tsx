import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { PurpleButton } from "./PurpleButton";

const links = [
  { href: "#features", label: "Imkoniyatlar" },
  { href: "#pricing", label: "Narxlar" },
  { href: "#how", label: "Qanday ishlaydi" },
  { href: "#about", label: "Biz haqimizda" },
];

export function LandingNavbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(7,11,20,${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px) saturate(180%)`),
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-300 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/dashboard" className="text-sm text-slate-300 transition-colors hover:text-white">
            Kirish
          </Link>
          <Link to="/onboarding">
            <PurpleButton size="sm">Mulohaza bepul</PurpleButton>
          </Link>
        </div>
        <button
          aria-label="Menyu"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/5 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mb-3 rounded-2xl p-5 lg:hidden"
        >
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-slate-200" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <Link to="/onboarding" onClick={() => setOpen(false)}>
              <PurpleButton size="sm" className="w-full">Bepul boshlash</PurpleButton>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
