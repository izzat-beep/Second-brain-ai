import { motion } from "framer-motion";
import { useState } from "react";

export interface FanCard {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: [string, string];
  emoji: string;
}

const positions = [
  { x: -420, y: 0, z: -30, rz: -32, ry: -8 },
  { x: -210, y: 0, z: -10, rz: -16, ry: -4 },
  { x: 0,   y: 0, z: 0,   rz: 0,   ry: 0  },
  { x: 210,  y: 0, z: -10, rz: 16,  ry: 4  },
  { x: 420,  y: 0, z: -30, rz: 32,  ry: 8  },
];


const floatDelays = [0, 0.6, 1.2, 1.8, 2.4];
// Center fans out last, then alternating outwards
const fanOrder = [0, 4, 1, 3, 2];

function Card({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FanCard;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const pos = positions[index];
  const fanIndex = fanOrder.indexOf(index);
  const isHovered = hovered === index;
  const dim = hovered !== null && hovered !== index;

  const hoverTransform = isHovered
    ? `perspective(1400px) rotateZ(${pos.rz * 0.7}deg) rotateY(${pos.ry * 0.5}deg) translate3d(${pos.x}px, ${pos.y - 18}px, ${pos.z + 55}px) scale(1.18)`
    : `perspective(1400px) rotateZ(${pos.rz}deg) rotateY(${pos.ry}deg) translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${dim ? 0.96 : 1})`;

  const brightness = pos.z < -20 ? 0.88 : pos.z < 0 ? 0.94 : 1;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: 200,
        height: 280,
        marginLeft: -100,
        marginTop: -140,
        transformStyle: "preserve-3d",
      }}
      initial={{
        opacity: 0.6,
        transform: "perspective(1400px) rotateZ(0deg) rotateY(0deg) translate3d(0,0,0) scale(0.85)",
      }}
      animate={{
        opacity: dim ? 0.75 : 1,
        transform: hoverTransform,
      }}
      transition={{
        delay: 0.4 + fanIndex * 0.15,
        type: "spring",
        stiffness: isHovered ? 200 : 45,
        damping: isHovered ? 20 : 14,
        mass: 1.2,
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="h-full w-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -10, 0],
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5 + floatDelays[index],
          },
          rotateY: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl p-5 text-white"
          style={{
            background: `linear-gradient(155deg, ${card.gradient[0]}, ${card.gradient[1]})`,
            boxShadow: isHovered
              ? `0 30px 80px ${card.gradient[1]}80, 0 0 40px ${card.gradient[0]}55`
              : "0 20px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
            filter: `brightness(${brightness})`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/30" />
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" />
          <div className="relative flex h-full flex-col">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{card.label}</div>
            <div className="mt-auto">
              <div className="mb-3 text-4xl">{card.emoji}</div>
              <div className="font-serif text-xl font-semibold leading-tight">{card.title}</div>
              <div className="mt-1.5 text-xs leading-snug opacity-85">{card.subtitle}</div>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl p-5 text-white"
          style={{
            background: `linear-gradient(195deg, ${card.gradient[1]}, ${card.gradient[0]})`,
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex h-full flex-col">
            <div className="text-3xl">{card.emoji}</div>
            <div className="mt-2 font-serif text-lg font-semibold">{card.title}</div>
            <p className="mt-3 text-xs leading-relaxed opacity-90">{card.description}</p>
            <div className="mt-auto text-[10px] uppercase tracking-widest opacity-70">Yopish uchun bosing</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CinematicCardFan({ cards }: { cards: FanCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[720px]" style={{ perspective: 1400 }}>
      {/* Floating badges */}
      <FloatBadge style={{ top: 0, left: "10%" }} color="#06B6D4" delay={0}>
        🎙 Ovoz→Matn
      </FloatBadge>
      <FloatBadge style={{ top: "15%", right: "5%" }} color="#7C3AED" delay={1}>
        🧠 Claude API
      </FloatBadge>
      <FloatBadge style={{ bottom: "12%", left: "3%" }} color="#3B82F6" delay={2}>
        📱 Telegram Bot
      </FloatBadge>
      <FloatBadge style={{ bottom: "5%", right: "12%" }} color="#22C55E" delay={1.5}>
        🇺🇿 O'zbek tili
      </FloatBadge>

      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}
      >
        {cards.map((c, i) => (
          <Card key={i} card={c} index={i} hovered={hovered} setHovered={setHovered} />
        ))}
      </div>
    </div>
  );
}

function FloatBadge({
  children,
  style,
  color,
  delay,
}: {
  children: React.ReactNode;
  style: React.CSSProperties;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="glass absolute z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-100"
      style={{ ...style, borderColor: `${color}55`, boxShadow: `0 8px 25px ${color}33` }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0, 6, 0],
        rotateZ: [0, 3, 0, -3, 0],
      }}
      transition={{
        opacity: { delay: 2 + delay * 0.2, duration: 0.5 },
        scale: { delay: 2 + delay * 0.2, duration: 0.5 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
        rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}
