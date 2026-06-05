import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, X } from "lucide-react";
import { GlassCard } from "@/components/mente/GlassCard";
import { notes, categoryColors, categoryLabels, graphData } from "@/data/mockData";

export const Route = createFileRoute("/_app/map")({
  head: () => ({ meta: [{ title: "G'oyalar Xaritasi — Mente" }] }),
  component: IdeaMap,
});

interface NodeState {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  title: string;
  category: string;
}

function IdeaMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const draggingNode = useRef<NodeState | null>(null);
  const panning = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });

  const nodesRef = useRef<NodeState[]>([]);
  const linksRef = useRef(graphData.links.map((l) => ({ ...l, particle: Math.random() })));

  // Initialize positions
  useEffect(() => {
    nodesRef.current = graphData.nodes.map((n, i) => {
      const a = (i / graphData.nodes.length) * Math.PI * 2;
      return {
        id: n.id,
        x: Math.cos(a) * 180,
        y: Math.sin(a) * 180,
        vx: 0,
        vy: 0,
        color: n.color,
        size: n.size,
        title: n.title,
        category: n.category,
      };
    });
  }, []);

  // Force simulation + render
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const nodes = nodesRef.current;
      const links = linksRef.current;

      // Forces
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        // center gravity
        a.vx += -a.x * 0.001;
        a.vy += -a.y * 0.001;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy + 0.01;
          const d = Math.sqrt(d2);
          const rep = 1800 / d2;
          a.vx -= (dx / d) * rep;
          a.vy -= (dy / d) * rep;
          b.vx += (dx / d) * rep;
          b.vy += (dy / d) * rep;
        }
      }
      for (const l of links) {
        const a = nodes.find((n) => n.id === l.source);
        const b = nodes.find((n) => n.id === l.target);
        if (!a || !b) continue;
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = 140;
        const k = 0.02 * (d - target);
        a.vx += (dx / d) * k;
        a.vy += (dy / d) * k;
        b.vx -= (dx / d) * k;
        b.vy -= (dy / d) * k;
      }
      for (const n of nodes) {
        if (draggingNode.current?.id === n.id) continue;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
      }

      // Render
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2 + pan.x, h / 2 + pan.y);
      ctx.scale(zoom, zoom);

      // Links + flowing particles
      for (const l of links) {
        const a = nodes.find((n) => n.id === l.source);
        const b = nodes.find((n) => n.id === l.target);
        if (!a || !b) continue;
        ctx.strokeStyle = `rgba(124,58,237,${0.18 + l.strength * 0.35})`;
        ctx.lineWidth = 0.6 + l.strength * 1.6;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        // particle
        l.particle = (l.particle + 0.006) % 1;
        const px = a.x + (b.x - a.x) * l.particle;
        const py = a.y + (b.y - a.y) * l.particle;
        ctx.fillStyle = "rgba(167,139,250,0.9)";
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "rgba(167,139,250,0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Nodes
      for (const n of nodes) {
        const isSel = selected === n.id;
        const r = n.size + (isSel ? 4 : 0);
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isSel ? 25 : 15;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(255,255,255,0.6)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (zoom > 0.7) {
          ctx.fillStyle = "rgba(241,245,249,0.9)";
          ctx.font = "500 11px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          const label = n.title.length > 22 ? n.title.slice(0, 22) + "…" : n.title;
          ctx.fillText(label, n.x, n.y + r + 6);
        }
      }

      ctx.restore();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [zoom, pan, selected]);

  // Pointer interaction
  const getWorldPos = (clientX: number, clientY: number) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2 - pan.x) / zoom;
    const y = (clientY - rect.top - rect.height / 2 - pan.y) / zoom;
    return { x, y };
  };
  const hitNode = (x: number, y: number) => {
    for (const n of nodesRef.current) {
      const dx = n.x - x, dy = n.y - y;
      if (dx * dx + dy * dy <= (n.size + 4) ** 2) return n;
    }
    return null;
  };
  const onDown = (e: React.PointerEvent) => {
    const w = getWorldPos(e.clientX, e.clientY);
    const hit = hitNode(w.x, w.y);
    if (hit) {
      draggingNode.current = hit;
      setSelected(hit.id);
    } else {
      panning.current = true;
    }
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    if (draggingNode.current) {
      draggingNode.current.x += dx / zoom;
      draggingNode.current.y += dy / zoom;
      draggingNode.current.vx = 0;
      draggingNode.current.vy = 0;
    } else if (panning.current) {
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
    }
  };
  const onUp = () => {
    draggingNode.current = null;
    panning.current = false;
  };
  const onWheel = (e: React.WheelEvent) => {
    setZoom((z) => Math.max(0.4, Math.min(2.5, z - e.deltaY * 0.001)));
  };

  const selectedNote = selected ? notes.find((n) => n.id === selected) : null;

  return (
    <div className="relative h-[calc(100vh-1rem)] lg:h-screen">
      <div className="absolute left-5 right-5 top-5 z-10 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-semibold md:text-3xl">G'oyalar Xaritasi</h1>
          <p className="text-xs text-slate-500">{graphData.nodes.length} ta tugun · {graphData.links.length} ta bog'liqlik</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))} className="glass grid h-9 w-9 place-items-center rounded-full"><ZoomOut className="h-4 w-4" /></button>
          <button onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))} className="glass grid h-9 w-9 place-items-center rounded-full"><ZoomIn className="h-4 w-4" /></button>
        </div>
      </div>

      <div ref={wrapRef} className="absolute inset-0">
        <canvas
          ref={canvasRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onWheel={onWheel}
          className="h-full w-full cursor-grab active:cursor-grabbing"
        />
      </div>

      {selectedNote && (
        <GlassCard className="absolute right-4 top-20 z-10 w-[300px] p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: `${categoryColors[selectedNote.category]}22`, color: categoryColors[selectedNote.category] }}>
                {categoryLabels[selectedNote.category]}
              </span>
              <h3 className="mt-2 font-serif text-lg">{selectedNote.title}</h3>
            </div>
            <button onClick={() => setSelected(null)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/5"><X className="h-4 w-4" /></button>
          </div>
          <p className="mt-2 text-sm text-slate-400 line-clamp-3">{selectedNote.content}</p>
          <div className="mt-3 text-xs text-violet-300">🤖 {selectedNote.aiSummary}</div>
          <Link to="/notes/$id" params={{ id: selectedNote.id }} className="mt-4 inline-block text-xs text-violet-300 hover:text-violet-200">
            Yozuvni ochish →
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
