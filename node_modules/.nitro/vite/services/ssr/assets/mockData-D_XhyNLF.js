const categoryColors = {
  ish: "#3B82F6",
  shaxsiy: "#06B6D4",
  goya: "#7C3AED",
  organish: "#F59E0B",
  qaror: "#22C55E",
  maqsad: "#EC4899"
};
const categoryLabels = {
  ish: "Ish",
  shaxsiy: "Shaxsiy",
  goya: "G'oya",
  organish: "O'rganish",
  qaror: "Qaror",
  maqsad: "Maqsad"
};
const notes = [
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
    height: "lg"
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
    height: "md"
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
    height: "md"
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
    height: "sm"
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
    height: "md"
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
    height: "lg"
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
    height: "sm"
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
    height: "sm"
  }
];
({
  nodes: notes.map((n) => ({
    id: n.id,
    title: n.title,
    category: n.category,
    color: categoryColors[n.category],
    size: 14 + n.connections.length * 6
  })),
  links: notes.flatMap(
    (n) => n.connections.map((target) => ({ source: n.id, target, strength: 0.4 + Math.random() * 0.5 }))
  )
});
export {
  categoryColors as a,
  categoryLabels as c
};
