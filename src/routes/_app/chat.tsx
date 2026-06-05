import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, Send, Paperclip, Mic, Brain } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { conversations } from "@/data/mockData";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "AI Suhbat — Mente" }] }),
  component: Chat,
});

const suggested = [
  "📝 Bu hafta nima yozdim?",
  "🎯 Bugun nimaga e'tibor qilsam?",
  "💡 Eng ko'p takrorlaydigan mavzularim?",
  "🔗 Bog'langan g'oyalarim bormi?",
];

function Chat() {
  const [active, setActive] = useState(conversations[0].id);
  const [input, setInput] = useState("");
  const conv = conversations.find((c) => c.id === active)!;

  return (
    <div className="mx-auto flex h-[calc(100vh-1rem)] max-w-7xl px-3 py-4 lg:h-screen lg:px-5">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 flex-col gap-3 pr-3 md:flex">
        <button className="btn-purple flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
          <Plus className="h-4 w-4" /> Yangi suhbat
        </button>
        <input placeholder="Suhbatlarni qidiring..." className="glass rounded-full px-4 py-2 text-sm outline-none placeholder:text-slate-500" />
        <div className="flex-1 space-y-1 overflow-y-auto pr-1">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`relative w-full rounded-xl p-3 text-left transition-colors ${
                active === c.id ? "bg-violet-500/10" : "hover:bg-white/5"
              }`}
            >
              {active === c.id && <div className="absolute left-0 top-3 h-8 w-[3px] rounded-r bg-violet-500" />}
              <div className="truncate text-sm font-medium">{c.title}</div>
              <div className="mt-0.5 truncate text-xs text-slate-500">{c.preview}</div>
              <div className="mt-1 text-[10px] text-slate-600">{c.time}</div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex flex-1 flex-col">
        <GlassCard className="flex items-center justify-between p-4">
          <div className="font-serif text-lg font-semibold">{conv.title}</div>
          <div className="text-xs text-slate-500">Claude API</div>
        </GlassCard>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {conv.messages.length === 0 ? (
            <div className="grid h-full place-items-center">
              <div>
                <h2 className="text-center font-serif text-2xl">Nima so'raysiz?</h2>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {suggested.map((s) => (
                    <button key={s} className="glass rounded-2xl p-4 text-left text-sm transition-all hover:border-violet-500/50">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            conv.messages.map((m, i) =>
              m.role === "user" ? (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-gradient-to-br from-violet-500 to-indigo-600 px-4 py-3 text-white">
                    {m.text}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex max-w-[80%] gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-500/20">
                    <Brain className="h-4 w-4 text-violet-300" />
                  </div>
                  <GlassCard className="rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">
                    {m.text}
                  </GlassCard>
                </motion.div>
              ),
            )
          )}
        </div>

        <GlassCard className="m-2 p-3">
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/5"><Paperclip className="h-4 w-4" /></button>
            <button className="grid h-9 w-9 place-items-center rounded-full text-slate-400 hover:bg-white/5"><Mic className="h-4 w-4" /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Yozuvlarimdan so'rang..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
            <button className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600">
              <Send className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-1.5 text-center text-[10px] text-slate-600">Mente · Claude API bilan ishlaydi</div>
        </GlassCard>
      </div>
    </div>
  );
}
