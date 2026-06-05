export type Category = "ish" | "shaxsiy" | "goya" | "organish" | "qaror" | "maqsad";
export type Priority = "Muhim" | "Oddiy" | "Arxiv";

export const categoryColors: Record<Category, string> = {
  ish: "#3B82F6",
  shaxsiy: "#06B6D4",
  goya: "#7C3AED",
  organish: "#F59E0B",
  qaror: "#22C55E",
  maqsad: "#EC4899",
};

export const categoryLabels: Record<Category, string> = {
  ish: "Ish",
  shaxsiy: "Shaxsiy",
  goya: "G'oya",
  organish: "O'rganish",
  qaror: "Qaror",
  maqsad: "Maqsad",
};

export const user = {
  name: "Izzatilla",
  email: "izzatilla@mente.ai",
  plan: "Pro+" as const,
  streak: 14,
  telegramConnected: true,
  telegramUsername: "@izzatilla_dev",
};

export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  tags: string[];
  priority: Priority;
  mood: string;
  source: string;
  createdAt: string;
  starred: boolean;
  aiSummary: string;
  connections: string[];
  height?: "sm" | "md" | "lg";
}

export const notes: Note[] = [
  {
    id: "n1",
    title: "Startup uchun yangi funding strategiyasi",
    content: "Pre-seed da $250k yig'ish uchun 3 ta yo'l: angellar, mikro-VC, va revenue-based. Birinchi navbatda Uzbek angel listini tayyorlash kerak. Pitch deck-ni 10 slide-ga qisqartirish.",
    category: "goya",
    tags: ["#startup", "#funding", "#strategiya"],
    priority: "Muhim",
    mood: "Ijobiy",
    source: "Widget",
    createdAt: "2 soat oldin",
    starred: true,
    aiSummary: "Pre-seed funding bo'yicha 3 yo'nalishli reja — angel investor ro'yxatidan boshlash.",
    connections: ["n3", "n5"],
    height: "lg",
  },
  {
    id: "n2",
    title: "Kitobdan: Atomic Habits",
    content: "1% kunlik yaxshilanish — 1 yilda 37x natija. Tizim > maqsad. Identity-based habits eng kuchli.",
    category: "organish",
    tags: ["#kitob", "#odat"],
    priority: "Oddiy",
    mood: "Ilhom",
    source: "Telegram",
    createdAt: "4 soat oldin",
    starred: false,
    aiSummary: "Identity-based habit yondashuvi eng samarali ekanligi haqida.",
    connections: ["n4"],
    height: "md",
  },
  {
    id: "n3",
    title: "Marketing kanali tahlili",
    content: "Instagram CPM 4x past Facebook'dan. Telegram bot orqali viral loop yaratish mumkin. Reels — eng arzon reach.",
    category: "ish",
    tags: ["#marketing", "#startup"],
    priority: "Muhim",
    mood: "Tahliliy",
    source: "Ovoz",
    createdAt: "Kecha",
    starred: true,
    aiSummary: "Instagram va Telegram — eng samarali kanallar.",
    connections: ["n1"],
    height: "md",
  },
  {
    id: "n4",
    title: "Ertalabki rituallar",
    content: "06:30 turish, 10 daqiqa meditatsiya, sovuq dush. Telefon — 1 soatdan keyin.",
    category: "shaxsiy",
    tags: ["#odat", "#sogliq"],
    priority: "Oddiy",
    mood: "Tinch",
    source: "Matn",
    createdAt: "2 kun oldin",
    starred: false,
    aiSummary: "Ertalabki rituallar — telefonga kech tegish muhim.",
    connections: ["n2"],
    height: "sm",
  },
  {
    id: "n5",
    title: "Pitch deck strukturasi",
    content: "1. Problem 2. Solution 3. Market 4. Product 5. Traction 6. Team 7. Ask. Har slide — 1 fikr.",
    category: "qaror",
    tags: ["#startup", "#pitch"],
    priority: "Muhim",
    mood: "Aniq",
    source: "Widget",
    createdAt: "3 kun oldin",
    starred: false,
    aiSummary: "10 slide pitch deck shabloni.",
    connections: ["n1"],
    height: "md",
  },
  {
    id: "n6",
    title: "Bu yilgi maqsadlar",
    content: "1. MVP launch. 2. 1000 foydalanuvchi. 3. $10k MRR. 4. Sport — 3x/hafta. 5. 12 ta kitob.",
    category: "maqsad",
    tags: ["#yil", "#maqsad"],
    priority: "Muhim",
    mood: "Ilhom",
    source: "Matn",
    createdAt: "5 kun oldin",
    starred: true,
    aiSummary: "5 ta katta yillik maqsad — biznes va shaxsiy aralash.",
    connections: ["n1", "n7"],
    height: "lg",
  },
  {
    id: "n7",
    title: "Dizayn tizimi g'oyasi",
    content: "Cinematic 3D — Apple + Tesla + Arc. Glass cards, purple gradients, slow motion.",
    category: "goya",
    tags: ["#dizayn", "#brand"],
    priority: "Oddiy",
    mood: "Ijodiy",
    source: "Widget",
    createdAt: "6 kun oldin",
    starred: false,
    aiSummary: "Premium cinematic dizayn yo'nalishi.",
    connections: ["n6"],
    height: "sm",
  },
  {
    id: "n8",
    title: "Oilaviy kechki ovqat",
    content: "Yakshanba — onam uchun palov. Choy bilan. Hammasiga qo'ng'iroq qilish.",
    category: "shaxsiy",
    tags: ["#oila"],
    priority: "Oddiy",
    mood: "Iliq",
    source: "Ovoz",
    createdAt: "1 hafta oldin",
    starred: false,
    aiSummary: "Yakshanbalik oilaviy reja.",
    connections: [],
    height: "sm",
  },
];

export const stats = {
  totalNotes: 247,
  aiChats: 89,
  reminders: 5,
  streak: 14,
  weeklyNotes: 23,
  topTopics: [
    { name: "#startup", count: 8 },
    { name: "#dizayn", count: 6 },
    { name: "#oila", count: 4 },
    { name: "#kitob", count: 3 },
  ],
  sparkline: [4, 6, 3, 8, 5, 9, 12],
};

export const reminders = [
  { id: "r1", title: "Pitch deck'ni yangilash", dueDate: "Bugun 18:00", priority: "Muhim", noteId: "n5", done: false, when: "Bugun" },
  { id: "r2", title: "Onamga qo'ng'iroq qilish", dueDate: "Bugun 21:00", priority: "Oddiy", noteId: "n8", done: false, when: "Bugun" },
  { id: "r3", title: "Investor bilan uchrashuv", dueDate: "Ertaga 11:00", priority: "Muhim", noteId: "n1", done: false, when: "Ertaga" },
  { id: "r4", title: "Kitob — 2-bob", dueDate: "Payshanba", priority: "Oddiy", noteId: "n2", done: false, when: "Bu hafta" },
  { id: "r5", title: "Sport — yugurish", dueDate: "Shanba 07:00", priority: "Oddiy", noteId: "n4", done: true, when: "Bu hafta" },
];

export const conversations = [
  {
    id: "c1",
    title: "Bu hafta nima yozdim?",
    preview: "23 ta yozuv, asosan startup va dizayn",
    time: "2 soat oldin",
    unread: 0,
    messages: [
      { role: "user", text: "Bu hafta nima yozdim?" },
      { role: "ai", text: "Bu hafta siz **23 ta yozuv** qildingiz:\n\n- **Startup**: 8 yozuv (funding, pitch, marketing)\n- **Dizayn**: 6 yozuv (brand identity, 3D fan)\n- **Shaxsiy**: 5 yozuv (oila, sport)\n- **O'rganish**: 4 yozuv (Atomic Habits, podcast'lar)\n\nEng faol kuningiz — *seshanba* (7 yozuv)." },
    ],
  },
  { id: "c2", title: "Bugun nimaga e'tibor qilsam?", preview: "3 ta muhim qaror sizni kutmoqda", time: "Kecha", unread: 1, messages: [{ role: "user", text: "Bugun nimaga e'tibor qilsam?" }, { role: "ai", text: "3 ta muhim qaror harakat kutmoqda. Birinchi — **pitch deck**." }] },
  { id: "c3", title: "Eng ko'p takrorlanadigan mavzular", preview: "Startup, dizayn, oila", time: "3 kun oldin", unread: 0, messages: [] },
];

export const weeklyReport = {
  topTopics: [
    { name: "#startup", count: 8, color: "#7C3AED" },
    { name: "#dizayn", count: 6, color: "#3B82F6" },
    { name: "#oila", count: 4, color: "#06B6D4" },
    { name: "#kitob", count: 3, color: "#F59E0B" },
    { name: "#qaror", count: 2, color: "#22C55E" },
  ],
  keyInsights: [
    "Bu hafta 4 marta pul va moliyalash haqida yozdingiz",
    "Startup idea va marketing bir-biriga bog'liq — birlashtirishingiz mumkin",
    "Seshanba kuni 7 ta yozuv — eng faol kuningiz",
    "2 ta muhim qaror hali harakat kutmoqda",
  ],
  dailyActivity: [
    { day: "Du", count: 2 },
    { day: "Se", count: 7 },
    { day: "Cho", count: 3 },
    { day: "Pa", count: 4 },
    { day: "Ju", count: 5 },
    { day: "Sh", count: 1 },
    { day: "Ya", count: 1 },
  ],
  connections: [
    { a: "Startup funding", b: "Pitch deck", strength: 0.88, reason: "Ikkalasi ham investor jalb qilish haqida" },
    { a: "Marketing kanali", b: "Telegram bot", strength: 0.72, reason: "Bot — viral loop kanal sifatida" },
    { a: "Atomic Habits", b: "Ertalabki ritual", strength: 0.65, reason: "Identity-based habits — ertalabki amaliyot" },
  ],
};

export const graphData = {
  nodes: notes.map((n) => ({
    id: n.id,
    title: n.title,
    category: n.category,
    color: categoryColors[n.category],
    size: 14 + n.connections.length * 6,
  })),
  links: notes.flatMap((n) =>
    n.connections.map((target) => ({ source: n.id, target, strength: 0.4 + Math.random() * 0.5 })),
  ),
};
