import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Home,
  FileText,
  MessageSquare,
  Clock,
  Network,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { AmbientBackground } from "./AmbientBackground";
import { Logo } from "./Logo";
import { user } from "@/data/mockData";
import { signOutMock } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/notes", label: "Yozuvlarim", icon: FileText },
  { to: "/chat", label: "AI Suhbat", icon: MessageSquare },
  { to: "/reminders", label: "Eslatmalar", icon: Clock },
  { to: "/map", label: "G'oyalar Xaritasi", icon: Network },
  { to: "/reports", label: "Haftalik Hisobot", icon: BarChart3 },
  { to: "/settings", label: "Sozlamalar", icon: Settings },
] as const;

export function AppLayout({ children }: { children?: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen text-slate-100">
      <AmbientBackground />
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside
          className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-white/[0.05] bg-[rgba(7,11,20,0.85)] backdrop-blur-xl lg:flex"
        >
          <div className="px-5 py-5">
            <Logo />
          </div>
          <nav className="flex-1 space-y-1 px-3">
            {nav.map((item) => {
              const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl border border-violet-500/30 bg-violet-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {active && <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r bg-gradient-to-b from-violet-400 to-violet-600" />}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="m-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-medium">{user.name}</div>
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-1.5 py-0.5 text-[9px] font-bold text-amber-950">
                  {user.plan}
                </div>
              </div>
              <button
                onClick={() => { signOutMock(); navigate({ to: "/" }); }}
                className="grid h-8 w-8 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Chiqish"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="relative min-w-0 flex-1 pb-24 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children ?? <Outlet />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="glass fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-full px-2 py-2 lg:hidden">
        {nav.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors ${
                active ? "bg-violet-500/20 text-violet-300" : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
