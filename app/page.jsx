"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  MessageCircle,
  BookOpen,
  BarChart3,
  UserCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Bell,
  Share,
  ListChecks,
  Check,
  Loader,
  PlusCircle,
  Plus,
  Trash2,
  Save,
  Settings,
  Send,
  Calendar,
  Trophy,
  Globe,
  LogOut,
  QrCode,
  User,
  Sun,
  Moon,
  HelpCircle,
  ShieldCheck,
  Star,
} from "lucide-react";

const AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80";

const DEFAULT_GRADES = [
  {
    id: 1,
    subject: "Геометрия",
    kind: "Текущая",
    date: "ОТВ, ЗА 13 ОКТ.",
    score: "6",
    dot: true,
  },
  {
    id: 2,
    subject: "НДП",
    kind: "Важная",
    date: "СОР, за 5 окт.",
    score: "1/50",
    dot: true,
  },
  {
    id: 3,
    subject: "История Узбекистана",
    kind: "Текущая",
    date: "ОТВ, ЗА 13 ОКТ.",
    score: "3",
    dot: true,
  },
  {
    id: 4,
    subject: "География",
    kind: "Текущая",
    date: "ОТВ, ЗА 8 ОКТ.",
    score: "10",
    dot: false,
  },
];

const DEFAULT_SCHEDULE = [
  {
    id: 1,
    time: "8:00-8:45",
    subject: "1. ОГП",
    homework: "Параграф 7, ответить на вопросы",
    done: false,
  },
  {
    id: 2,
    time: "8:50-9:35",
    subject: "2. Всемирная история",
    homework: "Прочитать §5, составить план",
    done: false,
  },
  {
    id: 3,
    time: "9:40-10:25",
    subject: "3. НДП",
    homework: "Упражнения 12–15",
    done: false,
  },
  {
    id: 4,
    time: "10:40-11:25",
    subject: "4. Воспитание",
    homework: "Подготовить сообщение",
    done: false,
  },
  {
    id: 5,
    time: "11:30-12:15",
    subject: "5. Информатика",
    homework: "Практическая работа №3",
    done: false,
  },
  {
    id: 6,
    time: "12:20-13:05",
    subject: "6. Узбекский язык",
    homework: "Выучить новые слова",
    done: false,
  },
  {
    id: 7,
    time: "13:10-13:55",
    subject: "7. Алгебра",
    homework: "Стр. 48, № 214–218",
    grade: "5",
    done: false,
  },
];

const DEFAULT_CHATS = [
  {
    id: "class",
    name: "Класс 5-А",
    sub: "Общий чат",
    color: "#8b5cf6",
    unread: 2,
    messages: [
      {
        me: false,
        who: "Madina",
        text: "Ребята, кто сделал ДЗ по алгебре?",
        t: "18:02",
      },
      { me: false, who: "Sardor", text: "Я, стр. 48 всё", t: "18:05" },
    ],
  },
  {
    id: "teacher",
    name: "Классный руководитель",
    sub: "Родительское собрание в пятницу",
    color: "#f97316",
    unread: 1,
    messages: [
      {
        me: false,
        who: "Классный руководитель",
        text: "Напоминаю: родительское собрание в пятницу в 18:00.",
        t: "12:40",
      },
    ],
  },
  {
    id: "math",
    name: "Учитель математики",
    sub: "Контрольная перенесена",
    color: "#22c55e",
    unread: 0,
    messages: [
      {
        me: false,
        who: "Учитель математики",
        text: "Контрольная перенесена на следующую неделю.",
        t: "вчера",
      },
      { me: true, text: "Хорошо, спасибо!", t: "вчера" },
    ],
  },
  {
    id: "support",
    name: "Поддержка emaktab",
    sub: "Добро пожаловать!",
    color: "#3b82f6",
    unread: 0,
    messages: [
      {
        me: false,
        who: "emaktab",
        text: "Добро пожаловать в emaktab!",
        t: "12 окт.",
      },
    ],
  },
];

const SUBJECTS = [
  "ОГП",
  "Всемирная история",
  "НДП",
  "Воспитание",
  "Информатика",
  "Узбекский язык",
  "Алгебра",
  "Геометрия",
  "История Узбекистана",
  "География",
  "Химия",
  "Физика",
  "Биология",
  "Русский язык",
  "Литература",
  "Англ. язык",
  "Математика",
  "Физкультура",
  "Музыка",
  "ИЗО",
  "Технология",
];

const TIMES = [
  "8:00-8:45",
  "8:50-9:35",
  "9:40-10:25",
  "10:40-11:25",
  "11:30-12:15",
  "12:20-13:05",
  "13:10-13:55",
];
const mkDay = (d, list) =>
  list.map(([name, homework], i) => ({
    id: `${d}-${i}`,
    time: TIMES[i],
    subject: `${i + 1}. ${name}`,
    homework,
  }));

const WEEK = {
  0: mkDay(0, [
    ["Математика", "Стр. 40"],
    ["Русский язык", "Упр. 35"],
    ["Литература", "Читать рассказ"],
    ["Англ. язык", "Unit 2"],
    ["Музыка", ""],
    ["Физкультура", ""],
  ]),
  1: mkDay(1, [
    ["Алгебра", "№ 200–205"],
    ["История Узбекистана", "§6"],
    ["Химия", "§3"],
    ["Узбекский язык", "Упр. 18"],
    ["ИЗО", ""],
  ]),
  3: mkDay(3, [
    ["Геометрия", "Задачи 25–28"],
    ["География", "§5"],
    ["Информатика", "Задание 4"],
    ["Англ. язык", "Слова Unit 3"],
    ["Технология", ""],
  ]),
  4: mkDay(4, [
    ["Алгебра", "№ 220–224"],
    ["Физика", "§9"],
    ["Биология", "Конспект"],
    ["Физкультура", ""],
    ["География", "Параграф 4"],
    ["Геометрия", "Задачи 31–33"],
  ]),
  5: mkDay(5, [
    ["Химия", ""],
    ["Русский язык", "Упр. 40"],
    ["Литература", "Выучить стих"],
    ["Англ. язык", "Unit 3, ex. 2"],
  ]),
};

const CLASSMATES = [
  { name: "Islombek", score: 8.7, me: true },
  { name: "Madina K.", score: 8.4 },
  { name: "Sardor A.", score: 8.1 },
  { name: "Dilnoza R.", score: 7.8 },
  { name: "Jasur T.", score: 7.5 },
  { name: "Aziza M.", score: 7.2 },
  { name: "Bekzod N.", score: 6.9 },
];

const DEFAULT_WEEK = {
  1: WEEK[0],
  2: WEEK[1],
  3: DEFAULT_SCHEDULE,
  4: WEEK[3],
  5: WEEK[4],
  6: WEEK[5],
};

const WD = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MON = [
  "янв.",
  "февр.",
  "мар.",
  "апр.",
  "мая",
  "июн.",
  "июл.",
  "авг.",
  "сент.",
  "окт.",
  "нояб.",
  "дек.",
];
const WD_CHIPS = [
  { n: 1, l: "Пн" },
  { n: 2, l: "Вт" },
  { n: 3, l: "Ср" },
  { n: 4, l: "Чт" },
  { n: 5, l: "Пт" },
  { n: 6, l: "Сб" },
];
const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const dateKey = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
const HOLIDAYS = {
  "1-1": "Новый год",
  "3-8": "Международный женский день",
  "3-21": "Навруз",
  "5-9": "День памяти и почестей",
  "9-1": "День независимости",
  "10-1": "День учителя",
  "12-8": "День Конституции",
  // Хайиты каждый год в разные даты — поправь при необходимости (формат "год-месяц-день")
  "2027-3-10": "Рамазан хайит",
  "2027-5-17": "Курбан хайит",
};
const dayInfo = (d) => {
  const h =
    HOLIDAYS[`${d.getMonth() + 1}-${d.getDate()}`] ||
    HOLIDAYS[`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`];
  if (h) return { holiday: true, title: h };
  if (d.getDay() === 0) return { holiday: false, title: "Отдых" };
  return null;
};
const fmtDate = (d) => `${WD[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`;

const BLUE = "#1a7bff";
const font =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const toTen = (sc) => {
  if (String(sc).includes("/")) {
    const [a, b] = String(sc).split("/").map(Number);
    return (a / b) * 10;
  }
  return parseFloat(sc);
};
const scoreColor = (sc) => {
  const n = toTen(sc);
  if (isNaN(n)) return "#3b82f6";
  if (n >= 8) return "#22c55e";
  if (n >= 5) return "#f97316";
  return "#ef4444";
};

const ORDER_BEFORE = { a: 0, me: 1, b: 2 };
const ORDER_AFTER = { me: 0, a: 1, b: 2 };
const ROW_H = 46;

const Dot = ({ color = BLUE, style }) => (
  <span
    style={{
      position: "absolute",
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: color,
      border: "2px solid #fff",
      boxSizing: "border-box",
      ...style,
    }}
  />
);

const Tree = () => (
  <svg width="150" height="130" viewBox="0 0 150 130" fill="none">
    <ellipse cx="75" cy="106" rx="68" ry="20" fill="#4e9a1f" />
    <path
      d="M70 100 L72 60 M72 78 L60 62 M73 72 L84 54"
      stroke="#7a5a45"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M60 74 C44 70 46 50 58 46 C54 28 66 12 78 14 C92 16 96 34 92 46 C106 52 102 74 86 74 Z"
      fill="#8fb581"
    />
    <path
      d="M72 100 L72 70"
      stroke="#7a5a45"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M72 80 L60 64 M73 74 L85 56"
      stroke="#7a5a45"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const THEMES = {
  dark: {
    "--s0": "#0d0e12",
    "--s1": "#1b1b1e",
    "--s2": "#18181b",
    "--s3": "#23252b",
    "--s4": "#33363f",
    "--s5": "#3a3d45",
    "--line": "#34363d",
    "--fg": "#ffffff",
    "--mut": "#c3c6cf",
    "--mut2": "#9aa0b4",
    "--nav": "rgba(30,30,34,0.95)",
    "--navact": "#33353b",
    "--outer": "#05080f",
    "--bub": "rgba(255,255,255,0.12)",
  },
  light: {
    "--s0": "#eef1f7",
    "--s1": "#e8ebf3",
    "--s2": "#ffffff",
    "--s3": "#ffffff",
    "--s4": "#e6eaf4",
    "--s5": "#d5dae6",
    "--line": "#ccd2e0",
    "--fg": "#151821",
    "--mut": "#4f566a",
    "--mut2": "#6b7385",
    "--nav": "rgba(255,255,255,0.96)",
    "--navact": "#e1e6f2",
    "--outer": "#dfe3ec",
    "--bub": "#e3e7f1",
  },
};

const SPLASH_MSGS = [
  "Загружаем твои успехи ✨",
  "Проверяем оценки 📚",
  "Собираем расписание 🗓️",
  "Почти готово 🚀",
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState("home");
  const [profile, setProfile] = useState({
    name: "Islombek",
    fullName: "Исломбек Сапаров",
    className: "5-SONLI UMUMIYLASHTIRILGAN...",
    avatar: "",
  });
  const [grades, setGrades] = useState(DEFAULT_GRADES);
  const [week, setWeek] = useState(DEFAULT_WEEK);
  const [editDay, setEditDay] = useState(3);
  const schedule = week[editDay] || [];
  const setSchedule = (v) =>
    setWeek((w) => ({
      ...w,
      [editDay]: typeof v === "function" ? v(w[editDay] || []) : v,
    }));
  const [chats, setChats] = useState(DEFAULT_CHATS);
  const [openChat, setOpenChat] = useState(null);
  const [draft, setDraft] = useState("");
  const [chatSeg, setChatSeg] = useState("events");
  const [hwDone, setHwDone] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showToday, setShowToday] = useState(false);
  const todayRef = useRef(null);
  const homeTodayRef = useRef(null);
  const carRef = useRef(null);
  const [quarter, setQuarter] = useState(1);
  const [finals, setFinals] = useState(false);
  const [settings, setSettings] = useState({
    notify: true,
    hwRemind: true,
    lang: "Русский",
    light: false,
  });
  const [splashMsg, setSplashMsg] = useState(0);
  const [ratingStep, setRatingStep] = useState(0);
  const [rankAnim, setRankAnim] = useState(false);
  const chatEnd = useRef(null);
  const fileRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loadedFor, setLoadedFor] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authErr, setAuthErr] = useState("");
  const [form, setForm] = useState({
    login: "",
    pass: "",
    fullName: "",
    className: "",
  });

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 3800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const t = setInterval(() => setSplashMsg((m) => m + 1), 950);
    return () => clearInterval(t);
  }, [isLoading]);

  // восстановить вход после перезагрузки
  useEffect(() => {
    try {
      const u = localStorage.getItem("emaktab_session");
      const users = JSON.parse(localStorage.getItem("emaktab_users") || "{}");
      if (u && users[u]) setUser(u);
    } catch (e) {}
  }, []);

  // загрузка данных текущего аккаунта
  useEffect(() => {
    if (!user) return;
    try {
      const get = (k) => localStorage.getItem(`emaktab_${user}_${k}`);
      const p = get("profile");
      const g = get("grades");
      const w = get("week");
      const hw = get("hw");
      const st = get("settings");
      const ch = get("chats");
      if (p) setProfile((old) => ({ ...old, ...JSON.parse(p) }));
      if (g) setGrades(JSON.parse(g));
      if (w) setWeek(JSON.parse(w));
      if (hw) setHwDone(JSON.parse(hw));
      if (st) setSettings((old) => ({ ...old, ...JSON.parse(st) }));
      if (ch) setChats(JSON.parse(ch));
    } catch (e) {}
    setLoadedFor(user);
  }, [user]);

  // автосохранение всего в аккаунт
  useEffect(() => {
    if (!user || loadedFor !== user) return;
    try {
      const put = (k, v) =>
        localStorage.setItem(`emaktab_${user}_${k}`, JSON.stringify(v));
      put("profile", profile);
      put("grades", grades);
      put("week", week);
      put("hw", hwDone);
      put("settings", settings);
      put("chats", chats);
    } catch (e) {}
  }, [user, loadedFor, profile, grades, week, hwDone, settings, chats]);

  useEffect(() => {
    if (tab !== "home" || isLoading) return;
    setRatingStep(0);
    const t = setTimeout(() => setRatingStep(1), 700);
    return () => clearTimeout(t);
  }, [tab, isLoading]);

  // карусель расписания на главной: сразу показываем сегодняшний день
  useEffect(() => {
    if (tab !== "home" || isLoading) return;
    const t = setTimeout(() => {
      homeTodayRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "center",
      });
    }, 50);
    return () => clearTimeout(t);
  }, [tab, isLoading]);

  useEffect(() => {
    if (tab !== "rating") return;
    setRankAnim(false);
    const t = setTimeout(() => setRankAnim(true), 80);
    return () => clearTimeout(t);
  }, [tab]);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [openChat, chats]);

  useEffect(() => {
    if (tab !== "diary") return;
    const t = setTimeout(
      () =>
        todayRef.current?.scrollIntoView({ behavior: "auto", block: "start" }),
      60,
    );
    const on = () => {
      const el = todayRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setShowToday(r.bottom < 150 || r.top > window.innerHeight - 120);
    };
    window.addEventListener("scroll", on);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", on);
      setShowToday(false);
    };
  }, [tab]);

  const handleSave = () => {
    alert("Изменения успешно сохранены!");
    setTab("profile");
  };

  const hashPass = (p) => {
    try {
      return btoa(unescape(encodeURIComponent(p)));
    } catch (e) {
      return p;
    }
  };

  const submitAuth = () => {
    const login = form.login.trim().toLowerCase();
    const pass = form.pass;
    setAuthErr("");
    if (!login || !pass) return setAuthErr("Введите логин и пароль");
    if (!/^[a-z0-9_.-]{3,}$/.test(login))
      return setAuthErr("Логин: минимум 3 символа, латиница, цифры, _ . -");
    let users = {};
    try {
      users = JSON.parse(localStorage.getItem("emaktab_users") || "{}");
    } catch (e) {}
    if (authMode === "login") {
      if (!users[login] || users[login] !== hashPass(pass))
        return setAuthErr("Неверный логин или пароль");
    } else {
      if (pass.length < 4) return setAuthErr("Пароль: минимум 4 символа");
      if (users[login]) return setAuthErr("Такой логин уже занят");
      const full = form.fullName.trim() || login;
      users[login] = hashPass(pass);
      try {
        localStorage.setItem("emaktab_users", JSON.stringify(users));
        localStorage.setItem(
          `emaktab_${login}_profile`,
          JSON.stringify({
            name: full.split(/\s+/)[0],
            fullName: full,
            className: form.className.trim(),
            avatar: "",
          }),
        );
      } catch (e) {}
    }
    try {
      localStorage.setItem("emaktab_session", login);
    } catch (e) {}
    setLoadedFor(null);
    setTab("home");
    setUser(login);
    setForm({ login: "", pass: "", fullName: "", className: "" });
  };

  const logout = () => {
    if (!window.confirm("Выйти из аккаунта? Данные сохранены, войдите снова."))
      return;
    try {
      localStorage.removeItem("emaktab_session");
    } catch (e) {}
    setLoadedFor(null);
    setUser(null);
    setTab("home");
    setOpenChat(null);
    setProfile({ name: "", fullName: "", className: "", avatar: "" });
    setGrades(DEFAULT_GRADES);
    setWeek(DEFAULT_WEEK);
    setHwDone({});
    setChats(DEFAULT_CHATS);
    setSettings({
      notify: true,
      hwRemind: true,
      lang: "Русский",
      light: false,
    });
  };

  const pickPhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f || !f.type.startsWith("image/")) return;
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const S = 360;
        const c = document.createElement("canvas");
        c.width = S;
        c.height = S;
        const m = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(
          img,
          (img.width - m) / 2,
          (img.height - m) / 2,
          m,
          m,
          0,
          0,
          S,
          S,
        );
        setProfile((p) => ({ ...p, avatar: c.toDataURL("image/jpeg", 0.85) }));
      };
      img.src = r.result;
    };
    r.readAsDataURL(f);
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !openChat) return;
    const now = new Date();
    const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setChats((cs) =>
      cs.map((c) =>
        c.id === openChat
          ? {
              ...c,
              unread: 0,
              sub: text,
              messages: [...c.messages, { me: true, text, t }],
            }
          : c,
      ),
    );
    setDraft("");
  };

  const openThread = (id) => {
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    setOpenChat(id);
  };

  if (isLoading) {
    const msg = SPLASH_MSGS[Math.min(splashMsg, SPLASH_MSGS.length - 1)];
    const rays = [-66, -44, -22, 0, 22, 44, 66];
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#161628",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: font,
          zIndex: 9999,
          overflow: "hidden",
        }}
      >
        <style>{`
          @keyframes logoIn { from { opacity: 0; transform: translateY(14px) scale(.86); } to { opacity: 1; transform: none; } }
          @keyframes letterIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
          @keyframes rayPulse { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
          @keyframes sunUp { from { transform: translateY(10px); opacity: 0; } to { transform: none; opacity: 1; } }
          @keyframes msgSwap { 0% { opacity: 0; transform: translateY(8px); } 15%,85% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-6px); } }
          @keyframes dotBounce { 0%,80%,100% { transform: scale(.5); opacity: .4; } 40% { transform: scale(1); opacity: 1; } }
        `}</style>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "logoIn .8s ease both",
          }}
        >
          <svg width="92" height="96" viewBox="0 0 92 96" fill="none">
            {rays.map((deg, i) => (
              <line
                key={deg}
                x1="46"
                y1="21"
                x2="46"
                y2="9"
                stroke="#fff"
                strokeWidth="3.4"
                strokeLinecap="round"
                transform={`rotate(${deg} 46 34)`}
                style={{
                  animation: `rayPulse 1.6s ${i * 0.12}s ease-in-out infinite`,
                }}
              />
            ))}
            <path
              d="M27 36 A19 19 0 0 1 65 36 Z"
              fill="#e8f31a"
              style={{ animation: "sunUp .9s .2s ease both" }}
            />
            <path
              d="M8 30 H28 Q40 30 46 42 Q52 30 64 30 H84 V80 H64 Q52 80 46 90 Q40 80 28 80 H8 Z"
              stroke="#fff"
              strokeWidth="5"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M46 42 V90" stroke="#fff" strokeWidth="3" />
            <text
              x="27"
              y="68"
              textAnchor="middle"
              fill="#fff"
              fontSize="36"
              fontStyle="italic"
              fontWeight="700"
              fontFamily="Georgia, serif"
            >
              e
            </text>
          </svg>
          <div
            style={{
              fontFamily:
                '"Baloo 2","Fredoka","Nunito","Arial Rounded MT Bold","Trebuchet MS",sans-serif',
              fontSize: 62,
              fontWeight: 700,
              letterSpacing: 1,
              lineHeight: 1,
              display: "flex",
            }}
          >
            {"maktab".split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animation: `letterIn .5s ${0.25 + i * 0.09}s ease both`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: 70 }} />
        <div
          key={splashMsg}
          style={{
            fontSize: 20,
            color: "#e9eaf5",
            height: 28,
            animation: "msgSwap .95s ease both",
            textAlign: "center",
          }}
        >
          {msg}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fff",
                animation: `dotBounce 1.2s ${i * 0.18}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ---------- вход / регистрация ---------- */
  if (!user) {
    const reg = authMode === "register";
    const setF = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const BG = "#171729";
    const underline = {
      width: "100%",
      height: 52,
      background: "transparent",
      border: "none",
      borderBottom: "1.5px solid #8e97bd",
      borderRadius: 0,
      color: "#fff",
      fontSize: 20,
      padding: "0 2px",
      boxSizing: "border-box",
      outline: "none",
      fontFamily: font,
    };
    const skin = "#c58f6a";

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          background: BG,
          color: "#fff",
          fontFamily: font,
        }}
      >
        <style>{`
          .em-in::placeholder { color: #7d8197; opacity: 1; }
          .em-in:focus { border-bottom-color: #4d9bff !important; }
          .em-in:-webkit-autofill {
            -webkit-text-fill-color: #fff;
            -webkit-box-shadow: 0 0 0 1000px ${BG} inset;
          }
        `}</style>

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 420,
            minHeight: "100vh",
            background: BG,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {/* иллюстрация внизу */}
          <svg
            viewBox="0 0 420 324"
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: "auto",
              display: "block",
              pointerEvents: "none",
            }}
          >
            <path
              d="M0 232 Q90 196 180 206 Q300 222 420 244 L420 324 L0 324 Z"
              fill="#1d3a10"
            />
            {/* дерево */}
            <ellipse cx="22" cy="96" rx="62" ry="84" fill="#3c4a22" />
            <path
              d="M22 24 L27 228"
              stroke="#2f3a18"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M22 130 L-4 68 M24 160 L72 92 M22 190 L-10 150 M25 194 L64 150"
              stroke="#2f3a18"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <ellipse cx="29" cy="232" rx="17" ry="4" fill="#2a3512" />
            <path
              d="M0 282 Q90 250 200 262 Q320 276 420 262 L420 324 L0 324 Z"
              fill="#38572a"
            />

            {/* стоящая девушка */}
            <path
              d="M172 196 L202 196 L210 280 L198 281 L188 224 L182 284 L169 284 Z"
              fill="#5577d4"
            />
            <ellipse cx="174" cy="288" rx="10" ry="3" fill="#2d2020" />
            <ellipse cx="204" cy="285" rx="10" ry="3" fill="#2d2020" />
            <path
              d="M172 134 Q172 112 190 112 Q206 114 205 134 Q205 152 196 160 L174 160 Q168 148 172 134 Z"
              fill="#8a5a3c"
            />
            <path
              d="M163 166 Q168 154 186 152 Q206 154 212 168 L208 200 Q186 208 168 200 Z"
              fill="#a3402f"
            />
            <path
              d="M166 172 Q158 190 160 200 Q166 204 172 198 Z"
              fill={skin}
            />
            <ellipse cx="190" cy="136" rx="10" ry="12" fill={skin} />
            <rect
              x="187"
              y="162"
              width="32"
              height="27"
              rx="4"
              fill="#2f3558"
              transform="rotate(-6 203 175)"
            />
            <circle cx="206" cy="193" r="5" fill={skin} />

            {/* сидящая девушка */}
            <path
              d="M288 270 L322 282 L336 280 L338 285 L318 288 L290 281 Z"
              fill={skin}
            />
            <ellipse cx="337" cy="285" rx="6" ry="2.5" fill="#2d2020" />
            <path
              d="M246 262 Q250 284 270 285 Q290 284 292 262 Z"
              fill="#5b6b84"
            />
            <path
              d="M258 188 Q260 178 270 178 Q282 180 282 192 L284 232 L258 232 Z"
              fill="#6b4228"
            />
            <path
              d="M246 234 Q250 220 270 220 Q292 222 296 236 L292 264 L250 264 Z"
              fill="#c9a13a"
            />
            <path d="M262 224 L280 224 L278 262 L264 262 Z" fill="#efefef" />
            <ellipse cx="270" cy="192" rx="9" ry="11" fill={skin} />
            <rect x="266" y="242" width="7" height="14" rx="2" fill="#3a2418" />

            {/* сидящий парень */}
            <path
              d="M356 262 L392 262 L394 296 L384 298 L374 280 L350 286 L326 280 L330 270 Z"
              fill="#4a6ad0"
            />
            <ellipse cx="327" cy="283" rx="7" ry="3" fill="#4a2c1c" />
            <ellipse cx="382" cy="301" rx="8" ry="3" fill="#4a2c1c" />
            <path
              d="M348 232 Q360 222 380 228 L396 262 L352 262 Z"
              fill="#eeeeee"
            />
            <path
              d="M358 232 L356 262 M385 232 L388 258"
              stroke="#3a2418"
              strokeWidth="3"
            />
            <ellipse cx="366" cy="212" rx="9" ry="11" fill={skin} />
            <path
              d="M356 210 Q358 196 372 198 Q381 202 377 212 Q368 204 358 214 Z"
              fill="#3a2417"
            />
            <ellipse cx="338" cy="270" rx="5" ry="4" fill="#5a3a28" />
          </svg>

          {/* контент */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "0 26px 40px",
              boxSizing: "border-box",
            }}
          >
            {/* логотип */}
            <div
              style={{
                marginTop: "15vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <svg width="48" height="72" viewBox="0 0 48 72" fill="none">
                {[-64, -42, -21, 0, 21, 42, 64].map((deg) => (
                  <line
                    key={deg}
                    x1="24"
                    y1="17"
                    x2="24"
                    y2="8"
                    stroke="#fff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 24 33)`}
                  />
                ))}
                <path d="M13 33 A11 11 0 0 1 35 33 Z" fill="#f0f81c" />
                <path
                  d="M3 30 H14 Q21 30 24 38 Q27 30 34 30 H45 V62 H34 Q27 62 24 69 Q21 62 14 62 H3 Z"
                  stroke="#fff"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                  fill="none"
                />
                <text
                  x="24"
                  y="55"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="26"
                  fontStyle="italic"
                  fontWeight="700"
                  fontFamily="Georgia, serif"
                >
                  e
                </text>
              </svg>
              <div
                style={{
                  fontFamily:
                    '"Baloo 2","Fredoka","Nunito","Arial Rounded MT Bold","Trebuchet MS",sans-serif',
                  fontSize: 64,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: 1,
                  marginTop: 4,
                }}
              >
                maktab
              </div>
            </div>

            {/* форма */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitAuth();
              }}
              style={{ marginTop: 60 }}
            >
              {reg && (
                <>
                  <input
                    className="em-in"
                    style={underline}
                    placeholder="Имя и фамилия"
                    value={form.fullName}
                    onChange={setF("fullName")}
                  />
                  <input
                    className="em-in"
                    style={{ ...underline, marginTop: 8 }}
                    placeholder="Класс (необязательно)"
                    value={form.className}
                    onChange={setF("className")}
                  />
                </>
              )}
              <input
                className="em-in"
                style={{ ...underline, marginTop: reg ? 8 : 0 }}
                placeholder="Логин"
                autoCapitalize="none"
                autoComplete="username"
                value={form.login}
                onChange={setF("login")}
              />
              <input
                className="em-in"
                style={{ ...underline, marginTop: 8 }}
                type="password"
                placeholder="Пароль"
                autoComplete={reg ? "new-password" : "current-password"}
                value={form.pass}
                onChange={setF("pass")}
              />

              {authErr && (
                <div
                  style={{
                    color: "#ff7b7b",
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 14,
                  }}
                >
                  {authErr}
                </div>
              )}

              <button
                type="submit"
                style={{
                  marginTop: 30,
                  width: "100%",
                  height: 46,
                  borderRadius: 24,
                  border: "none",
                  background: "linear-gradient(90deg,#0a7aff,#4d9bff)",
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: font,
                }}
              >
                {reg ? "Зарегистрироваться" : "Войти"}
              </button>
            </form>

            {!reg && (
              <>
                <div
                  onClick={() =>
                    alert(
                      "Данные хранятся на этом устройстве. Если забыли пароль, создайте новый аккаунт.",
                    )
                  }
                  style={{
                    textAlign: "center",
                    color: "#1a85ff",
                    fontSize: 18,
                    marginTop: 24,
                    cursor: "pointer",
                  }}
                >
                  Забыли логин или пароль?
                </div>

                <button
                  type="button"
                  onClick={() => alert("Вход по QR-коду пока недоступен")}
                  style={{
                    marginTop: 40,
                    width: "100%",
                    height: 50,
                    borderRadius: 16,
                    border: "1.5px solid #3b3b52",
                    background: "transparent",
                    color: "#1a85ff",
                    fontSize: 18,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    fontFamily: font,
                  }}
                >
                  <QrCode size={26} strokeWidth={1.8} /> Войти по QR-коду
                </button>
              </>
            )}

            <div
              onClick={() => {
                setAuthMode(reg ? "login" : "register");
                setAuthErr("");
              }}
              style={{
                textAlign: "center",
                color: "#1a85ff",
                fontSize: 16,
                marginTop: reg ? 24 : 22,
                cursor: "pointer",
              }}
            >
              {reg ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Регистрация"}
            </div>
          </div>
        </div>
      </div>
    );
  }
  /* ---------- общие куски ---------- */
  const realToday = new Date();
  const realTodayD = new Date(
    realToday.getFullYear(),
    realToday.getMonth(),
    realToday.getDate(),
  );
  const anchor = realTodayD;
  const isRealToday = anchor.getTime() === realTodayD.getTime();
  const todayInfo = dayInfo(anchor);
  const todayLessons = todayInfo ? [] : week[anchor.getDay()] || [];
  const todayHw = todayLessons.filter((l) => l.homework);
  const lkey = (d, l) => `${dateKey(d)}|${l.id}`;
  const isDoneL = (d, l) => !!hwDone[lkey(d, l)];
  const toggleL = (d, l) =>
    setHwDone((h) => ({ ...h, [lkey(d, l)]: !h[lkey(d, l)] }));
  const doneCount = todayHw.filter((l) => isDoneL(anchor, l)).length;
  const numericGrades = grades
    .map((g) => toTen(g.score))
    .filter((n) => !isNaN(n));
  const avg = numericGrades.length
    ? (numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length).toFixed(
        1,
      )
    : "—";

  const hasPhoto = !!profile.avatar && profile.avatar !== AVATAR;
  const initial = (
    (profile.name || profile.fullName || user || "?").trim()[0] || "?"
  ).toUpperCase();
  const avatarImg = (size) =>
    hasPhoto ? (
      <img
        src={profile.avatar}
        alt=""
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: "50%",
          objectFit: "cover",
          background: "#fff",
        }}
      />
    ) : (
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#5b8cff,#8b5cf6)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.46,
          fontWeight: 800,
          lineHeight: 1,
          boxSizing: "border-box",
        }}
      >
        {initial}
      </div>
    );
  const light = !!settings.light;

  const glass = {
    background: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 16,
  };
  const outlined = {
    border: "1.5px solid rgba(160,175,255,0.45)",
    borderRadius: 24,
  };

  const Sub = ({ title, back = "home", right }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        margin: "4px 0 16px",
      }}
    >
      <button
        onClick={() => setTab(back)}
        style={{
          width: 40,
          height: 40,
          borderRadius: 14,
          background: "rgba(255,255,255,0.12)",
          border: "none",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={22} />
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, flex: 1 }}>
        {title}
      </h2>
      {right}
    </div>
  );

  /* ---------- рейтинг на главной ---------- */
  const RATING_ROW_H = 32;
  const ratingData = [
    { id: "me", me: true, fill: 100 },
    { id: "a", fill: 72, badge: "- 1" },
    { id: "b", fill: 55, badge: "- 2" },
  ];
  const isTop = ratingStep === 1;

  const ratingRows = (
    <div
      style={{ position: "relative", height: RATING_ROW_H * 3, marginTop: 6 }}
    >
      {ratingData.map((r) => {
        const rank = (isTop ? ORDER_AFTER : ORDER_BEFORE)[r.id];
        const me = !!r.me;
        const green = me && isTop;
        const badge = me ? (isTop ? "+ 1" : "- 1") : r.badge;
        return (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: me ? -5 : 0,
              right: me ? -5 : 0,
              top: rank * RATING_ROW_H,
              height: 30,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: me ? "0 5px" : "0",
              border: me ? "1.5px solid #fff" : "1.5px solid transparent",
              borderRadius: 999,
              boxSizing: "border-box",
              transition: "top .9s cubic-bezier(.34,1.35,.5,1)",
              zIndex: me ? 2 : 1,
              animation: me && isTop ? "glow 2s ease-in-out infinite" : "none",
            }}
          >
            <div
              style={{
                width: 19,
                height: 19,
                minWidth: 19,
                borderRadius: "50%",
                background: me ? "#7ea6ff" : "#141a4a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {rank + 1}
            </div>
            <div
              style={{
                flex: 1,
                height: 17,
                borderRadius: 999,
                background: "#141a4a",
                position: "relative",
                maxWidth: 100,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${isTop ? r.fill : r.fill * 0.55}%`,
                  borderRadius: 999,
                  background: me ? "#7ea6ff" : "#2b3590",
                  transition: "width 1s ease",
                  position: "relative",
                }}
              >
                {me && (
                  <div style={{ position: "absolute", right: -3, top: -2.5 }}>
                    {avatarImg(22)}
                    {isTop && (
                      <span
                        style={{
                          position: "absolute",
                          top: -11,
                          left: 4,
                          fontSize: 12,
                          animation: "pop .6s ease both",
                        }}
                      >
                        👑
                      </span>
                    )}
                  </div>
                )}
              </div>
              {!me && (
                <Loader
                  size={12}
                  color="#4d5aa8"
                  style={{
                    position: "absolute",
                    right: 4,
                    top: 2.5,
                    animation: "spin 1.4s linear infinite",
                  }}
                />
              )}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "2px 9px",
                borderRadius: 999,
                color: "#fff",
                border: `1px solid ${green ? "#22c55e" : "#e11d2e"}`,
                background: me && !green ? "#e11d2e" : "transparent",
                transition: "all .4s",
                animation: green ? "pop .6s .5s ease both" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {badge}
            </span>
          </div>
        );
      })}
    </div>
  );

  /* ---------- пустой день ---------- */
  const emptyDay = (info) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "22px 8px 36px",
      }}
    >
      <div style={{ width: 105, height: 91 }}>
        <div
          style={{
            transform: "scale(0.7)",
            transformOrigin: "top left",
            width: 150,
            height: 130,
          }}
        >
          <Tree />
        </div>
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, marginTop: 16 }}>
        Нет уроков
      </div>
      <div
        style={{
          fontSize: 13.5,
          color: "var(--mut)",
          marginTop: 8,
          lineHeight: 1.35,
        }}
      >
        {info && info.holiday ? `${info.title}. ` : ""}
        Отличный день, чтобы отдохнуть!
      </div>
    </div>
  );

  /* ---------- зелёная плашка с оценкой за урок ---------- */
  const gradeTile = (g) =>
    g ? (
      <div
        style={{
          minWidth: 30,
          height: 30,
          padding: "0 6px",
          borderRadius: 9,
          background: "#22c55e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 16,
          boxSizing: "border-box",
        }}
      >
        {g}
      </div>
    ) : null;

  /* ---------- карточка урока ---------- */
  const lessonCard = (item, d = anchor) => {
    const dn = isDoneL(d, item);
    return (
      <div
        key={item.id}
        style={{
          background: "var(--s4)",
          color: "var(--fg)",
          borderRadius: 16,
          padding: "11px 11px 11px",
          display: "flex",
          flexDirection: "column",
          gap: 7.5,
          opacity: dn ? 0.75 : 1,
          transition: "opacity .3s",
        }}
      >
        <div
          onClick={() => setTab("diary")}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            cursor: "pointer",
          }}
        >
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.2 }}>
              {item.subject}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--mut)",
                marginTop: 1,
                lineHeight: 1.2,
              }}
            >
              {item.time}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {gradeTile(item.grade)}
            <ChevronRight size={18} color={BLUE} />
          </div>
        </div>
        {item.homework && (
          <div
            style={{
              background: "#4d6385",
              borderRadius: 13,
              minHeight: 43,
              padding: "6px 7px 6px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              boxSizing: "border-box",
            }}
          >
            <span style={{ fontSize: 12.5, color: "#dbe3f2" }}>
              Есть домашнее задание
            </span>
            <button
              onClick={() => toggleL(d, item)}
              style={{
                width: 21,
                height: 21,
                minWidth: 21,
                borderRadius: "50%",
                background: dn ? "#22c55e" : "#2f3b4e",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "background .3s",
              }}
            >
              <Check size={13} color={dn ? "#fff" : "#7f8a9c"} />
            </button>
          </div>
        )}
      </div>
    );
  };

  /* ---------- карточка дня для карусели на главной ---------- */
  const homeDayCard = (d) => {
    const isToday = d.getTime() === anchor.getTime();
    const info = dayInfo(d);
    const lessons = info ? [] : week[d.getDay()] || [];
    const withHw = lessons.filter((l) => l.homework);
    const done = withHw.filter((l) => isDoneL(d, l)).length;
    const empty = !!info || lessons.length === 0;
    return (
      <div
        key={dateKey(d)}
        ref={isToday ? homeTodayRef : null}
        style={{
          flex: "0 0 100%",
          scrollSnapAlign: "center",
          background: "var(--s2)",
          color: "var(--fg)",
          borderRadius: 28,
          padding: "17px 11px 14px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ padding: "0 11px" }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>
            {fmtDate(d)}{" "}
            {isToday && !empty && <span style={{ color: BLUE }}>Сегодня</span>}
          </div>
          {!empty && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 7,
                }}
              >
                <div
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: 5,
                    background: "#e4e0ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListChecks size={12} color="#6a5de0" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                  {done}/{withHw.length}{" "}
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "var(--mut)",
                      fontWeight: 400,
                    }}
                  >
                    ДЗ на {isToday ? "сегодня" : "день"}
                  </span>
                </span>
                <Share
                  size={16}
                  color="#c3c6cf"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigator.clipboard?.writeText(
                      lessons
                        .map(
                          (x) =>
                            `${x.subject} (${x.time}): ${x.homework || "-"}`,
                        )
                        .join("\n"),
                    )
                  }
                />
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "var(--s5)",
                  margin: "9px 0 8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${withHw.length ? (done / withHw.length) * 100 : 0}%`,
                    background: "#22c55e",
                    borderRadius: 999,
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </>
          )}
        </div>
        {empty ? (
          emptyDay(info)
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {lessons.map((x) => lessonCard(x, d))}
          </div>
        )}
      </div>
    );
  };

  const homeDays = [];
  for (let i = -7; i <= 14; i++) homeDays.push(addDays(anchor, i));
  const slide = (dir) => {
    const el = carRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * (el.clientWidth * 0.9 + 11),
      behavior: "smooth",
    });
  };

  /* ---------- ГЛАВНАЯ ---------- */
  const HomeTab = (
    <>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <div
          onClick={() => setTab("rating")}
          style={{
            ...outlined,
            border: "1px solid rgba(160,175,255,0.45)",
            flex: 1,
            padding: "12px 16px 9px",
            minWidth: 0,
            cursor: "pointer",
            borderRadius: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>
              Рейтинг в классе
            </span>
            <ChevronRight size={15} color="#fff" />
          </div>
          {ratingRows}
        </div>

        <div
          style={{
            width: 74,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            flexShrink: 0,
          }}
        >
          <div
            onClick={() => {
              setChatSeg("events");
              setOpenChat(null);
              setTab("chat");
            }}
            style={{
              ...outlined,
              border: "1px solid rgba(160,175,255,0.45)",
              borderRadius: 18,
              padding: "13px 9px 12px",
              cursor: "pointer",
            }}
          >
            <div style={{ marginLeft: 4 }}>
              <Bell size={20} color="#fff" strokeWidth={1.6} />
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                marginTop: 7,
                whiteSpace: "nowrap",
              }}
            >
              События
            </div>
          </div>
          <div
            style={{
              ...outlined,
              border: "1px solid rgba(160,175,255,0.45)",
              borderRadius: 18,
              flex: 1,
              minHeight: 64,
              background: "#1c2a8f",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 4,
                right: 4,
                height: 21,
                background: "#1b1b1f",
                borderRadius: 10,
                padding: "0 6px 0 4px",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 10,
                zIndex: 2,
                boxSizing: "border-box",
              }}
            >
              {avatarImg(14)}
              <span style={{ whiteSpace: "nowrap" }}>В школе</span>
            </div>
            <svg
              viewBox="0 0 100 90"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <path
                d="M0 55 Q30 45 50 60 T100 50"
                stroke="#3a4bc0"
                strokeWidth="3"
                fill="none"
              />
              <path d="M30 90 L45 60" stroke="#3a4bc0" strokeWidth="3" />
              <path d="M52 62 L88 90" stroke="#ef1c1c" strokeWidth="3" />
              <path d="M48 36 a8 8 0 1 1 0.1 0 L48 58 Z" fill="#f97316" />
              <circle cx="48" cy="36" r="3" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          margin: "16px 0 9px",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>
          Последние оценки
        </h3>
        <button
          onClick={() => setTab("grades")}
          style={{
            background: "none",
            border: "none",
            color: "#9db8ff",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Все
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 7,
          overflowX: "auto",
          margin: "0 -14px",
          padding: "0 14px",
          scrollbarWidth: "none",
        }}
      >
        {grades.map((g, i) => (
          <div
            key={g.id ?? i}
            onClick={() => setTab("grades")}
            style={{
              flex: "0 0 89px",
              height: 89,
              background: i === 3 ? "#16207a" : "#3a4592",
              borderRadius: 17,
              padding: "12px 2px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              boxSizing: "border-box",
              cursor: "pointer",
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: scoreColor(g.score),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: String(g.score).length > 2 ? 11 : 17,
                  fontWeight: 900,
                }}
              >
                {g.score}
              </div>
              {g.dot && (
                <Dot
                  style={{
                    top: -3.5,
                    right: -4,
                    width: 10,
                    height: 10,
                    border: "1.5px solid #fff",
                  }}
                />
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              {String(g.date).split(",")[0]}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#b4bde6",
                marginTop: 3,
                padding: "0 2px",
                lineHeight: 1.2,
              }}
            >
              {String(g.date).split(",").slice(1).join(",").trim()}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 24,
          background: "#9b4dff",
          borderRadius: 16,
          height: 113,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 118,
            height: "100%",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 26,
              width: 52,
              height: 100,
              background: "#111",
              borderRadius: "10px 10px 0 0",
              border: "2px solid #333",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 12,
              background: "#ff8a00",
              color: "#fff",
              fontSize: 38,
              fontWeight: 900,
              fontStyle: "italic",
              padding: "0 15px",
              transform: "rotate(-6deg)",
              borderRadius: 4,
              lineHeight: 1.1,
            }}
          >
            7
          </div>
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 54,
              background: "#ffd400",
              color: "#222",
              fontWeight: 800,
              fontSize: 10,
              padding: "2px 9px",
              borderRadius: 999,
              transform: "rotate(-12deg)",
            }}
          >
            дней
          </div>
          <div
            style={{
              position: "absolute",
              left: 3,
              top: 74,
              background: "#ffd400",
              color: "#222",
              fontWeight: 800,
              fontSize: 10,
              padding: "2px 9px",
              borderRadius: 999,
              transform: "rotate(10deg)",
            }}
          >
            бесплатно
          </div>
        </div>
        <div style={{ flex: 1, paddingRight: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3 }}>
            Вам подарок 🎁
            <br />
            PRO-подписка на 7 дней!
          </div>
          <button
            onClick={() => alert("PRO-подписка на 7 дней активирована 🎉")}
            style={{
              marginTop: 10,
              background: "#5fb800",
              color: "#fff",
              fontWeight: 800,
              fontSize: 13,
              border: "none",
              borderRadius: 4,
              padding: "0 20px",
              height: 26,
              cursor: "pointer",
            }}
          >
            Получить подарок
          </button>
        </div>
      </div>

      <div
        style={{
          background: "var(--s0)",
          color: "var(--fg)",
          borderRadius: "28px 28px 0 0",
          margin: "24px -14px 0",
          padding: "24px 0 110px",
          minHeight: 520,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 18px 19px",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 800 }}>Расписание</span>
          <div style={{ display: "flex", gap: 22, paddingRight: 8 }}>
            <ChevronLeft
              size={22}
              color={BLUE}
              onClick={() => slide(-1)}
              style={{ cursor: "pointer" }}
            />
            <ChevronRight
              size={22}
              color={BLUE}
              onClick={() => slide(1)}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <div
          ref={carRef}
          style={{
            display: "flex",
            gap: 11,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "0 5%",
            scrollbarWidth: "none",
            alignItems: "flex-start",
          }}
        >
          {homeDays.map(homeDayCard)}
        </div>
      </div>
    </>
  );

  /* ---------- ЧАТ / СОБЫТИЯ ---------- */
  const Yoga = (
    <svg width="90" height="90" viewBox="0 0 270 270" fill="none">
      <rect x="2" y="170" width="266" height="96" rx="48" fill="#8cb36e" />
      <path d="M96 92 L174 92 L186 190 L84 190 Z" fill="#f3c9a0" />
      <path
        d="M100 100 L80 205"
        stroke="#f3c9a0"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path
        d="M170 100 L190 205"
        stroke="#f3c9a0"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path d="M104 88 L135 118 L166 88 L172 150 L98 150 Z" fill="#fff" />
      <ellipse cx="135" cy="205" rx="82" ry="30" fill="#5b7fd6" />
      <ellipse cx="100" cy="226" rx="30" ry="12" fill="#f3c9a0" />
      <ellipse cx="170" cy="226" rx="30" ry="12" fill="#f3c9a0" />
      <circle cx="135" cy="52" r="27" fill="#f3c9a0" />
      <path
        d="M108 52 C106 22 164 22 162 52 C156 36 120 36 108 52 Z"
        fill="#8a4b2d"
      />
      <circle cx="135" cy="22" r="9" fill="#8a4b2d" />
    </svg>
  );

  const ChatTab = (() => {
    const panel = {
      background: "var(--s0)",
      color: "var(--fg)",
      borderRadius: "30px 30px 0 0",
      margin: "0 -14px",
      padding: "16px 14px 110px",
      minHeight: "calc(100vh - 165px)",
      boxSizing: "border-box",
    };

    if (openChat) {
      const c = chats.find((x) => x.id === openChat);
      return (
        <div
          style={{
            ...panel,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <button
              onClick={() => setOpenChat(null)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: "rgba(255,255,255,0.12)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: c.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              {c.name[0]}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</div>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            {c.messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.me ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  background: m.me ? BLUE : "var(--bub)",
                  borderRadius: m.me
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  padding: "7px 11px",
                  animation: "pop .25s ease both",
                }}
              >
                {!m.me && (
                  <div
                    style={{ fontSize: 10, color: "#b4bde6", marginBottom: 2 }}
                  >
                    {m.who}
                  </div>
                )}
                <div style={{ fontSize: 13.5 }}>{m.text}</div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.6)",
                    textAlign: "right",
                    marginTop: 3,
                  }}
                >
                  {m.t}
                </div>
              </div>
            ))}
            <div ref={chatEnd} />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 89,
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 28px)",
              maxWidth: 392,
              display: "flex",
              gap: 6,
              zIndex: 45,
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Сообщение..."
              style={{
                flex: 1,
                minWidth: 0,
                background: "var(--s2)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "9px 14px",
                color: "var(--fg)",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: 38,
                height: 38,
                minWidth: 38,
                borderRadius: "50%",
                background: BLUE,
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      );
    }

    const segBtn = (id, label) => (
      <button
        onClick={() => setChatSeg(id)}
        style={{
          flex: 1,
          height: 25,
          borderRadius: 11,
          border: "none",
          background: chatSeg === id ? "#2c3486" : "transparent",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          transition: "background .25s",
          position: "relative",
          padding: 0,
        }}
      >
        {label}
        {id === "chats" && chats.some((c) => c.unread > 0) && (
          <span
            style={{
              position: "absolute",
              top: 5,
              right: "26%",
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        )}
      </button>
    );

    return (
      <>
        <div
          style={{
            display: "flex",
            background: "#171d70",
            borderRadius: 14,
            padding: 2,
            margin: "15px 4px 16px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {segBtn("events", "События")}
          {segBtn("chats", "Чаты")}
        </div>
        <div style={panel}>
          {chatSeg === "events" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                paddingTop: 43,
                animation: "fadeIn .4s ease both",
              }}
            >
              {Yoga}
              <div style={{ fontSize: 15, fontWeight: 800, marginTop: 22 }}>
                Пока нет публикаций
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  marginTop: 7,
                  maxWidth: 260,
                  lineHeight: 1.3,
                }}
              >
                Скоро здесь появятся интересные новости и объявления
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {chats.map((c) => (
                <div
                  key={c.id}
                  onClick={() => openThread(c.id)}
                  style={{
                    background: "var(--s2)",
                    color: "var(--fg)",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: c.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--mut2)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.sub}
                    </div>
                  </div>
                  {c.unread > 0 && (
                    <span
                      style={{
                        background: BLUE,
                        borderRadius: 999,
                        minWidth: 18,
                        height: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 800,
                      }}
                    >
                      {c.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  })();

  /* ---------- ДНЕВНИК ---------- */
  const diaryDays = [];
  for (let i = -7; i <= 28; i++) {
    const d = addDays(anchor, i);
    diaryDays.push(d);
  }

  const dayCard = (d) => {
    const isToday = d.getTime() === anchor.getTime();
    const info = dayInfo(d);
    const lessons = info ? [] : week[d.getDay()] || [];
    const keyOf = (l) => lkey(d, l);
    const withHw = lessons.filter((l) => l.homework);
    const done = withHw.filter((l) => isDoneL(d, l)).length;
    const empty = !!info || lessons.length === 0;
    return (
      <div
        key={dateKey(d)}
        ref={isToday ? todayRef : null}
        style={{
          background: "var(--s2)",
          color: "var(--fg)",
          borderRadius: 30,
          padding: "17px 11px 14px",
          position: "relative",
          overflow: "hidden",
          scrollMarginTop: 108,
        }}
      >
        <div style={{ position: "relative", padding: "0 11px" }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>
            {fmtDate(d)}{" "}
            {isToday && !empty && <span style={{ color: BLUE }}>Сегодня</span>}
          </div>
          {!empty && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 7,
                }}
              >
                <div
                  style={{
                    width: 17,
                    height: 17,
                    borderRadius: 5,
                    background: "#e4e0ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ListChecks size={12} color="#6a5de0" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>
                  {done}/{withHw.length}{" "}
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "var(--mut)",
                      fontWeight: 400,
                    }}
                  >
                    ДЗ на {isToday ? "сегодня" : "день"}
                  </span>
                </span>
                <Share size={16} color="#c3c6cf" />
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "var(--s5)",
                  margin: "9px 0 8px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${withHw.length ? (done / withHw.length) * 100 : 0}%`,
                    background: "#22c55e",
                    borderRadius: 999,
                    transition: "width .5s ease",
                  }}
                />
              </div>
            </>
          )}
        </div>
        {empty && emptyDay(info)}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {lessons.map((l) => {
            const k = keyOf(l);
            const open = !!expanded[k];
            const dn = isDoneL(d, l);
            return (
              <div
                key={l.id}
                style={{
                  background: "var(--s4)",
                  color: "var(--fg)",
                  borderRadius: 16,
                  padding: "11px 11px",
                  opacity: dn ? 0.75 : 1,
                  transition: "opacity .3s",
                }}
              >
                <div
                  onClick={() =>
                    l.homework && setExpanded((e) => ({ ...e, [k]: !e[k] }))
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    cursor: l.homework ? "pointer" : "default",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14.5,
                        fontWeight: 800,
                        lineHeight: 1.2,
                      }}
                    >
                      {l.subject}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "var(--mut)",
                        marginTop: 1,
                        lineHeight: 1.2,
                      }}
                    >
                      {l.time}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {gradeTile(l.grade)}
                    <ChevronRight
                      size={18}
                      color={BLUE}
                      style={{
                        transform: open ? "rotate(90deg)" : "none",
                        transition: "transform .25s",
                      }}
                    />
                  </div>
                </div>
                {l.homework && (
                  <div
                    style={{
                      background: "#4d6385",
                      borderRadius: 13,
                      minHeight: 43,
                      padding: "6px 7px 6px 12px",
                      marginTop: 7.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12.5,
                        color: "#dbe3f2",
                        textDecoration: dn ? "line-through" : "none",
                      }}
                    >
                      {open ? l.homework : "Есть домашнее задание"}
                    </span>
                    <button
                      onClick={() => toggleL(d, l)}
                      style={{
                        width: 21,
                        height: 21,
                        minWidth: 21,
                        borderRadius: "50%",
                        background: dn ? "#22c55e" : "#2f3b4e",
                        border: "none",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "background .3s",
                      }}
                    >
                      <Check size={13} color={dn ? "#fff" : "#7f8a9c"} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const DiaryTab = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        paddingBottom: 170,
        margin: "0 -8px",
      }}
    >
      {diaryDays.map(dayCard)}
    </div>
  );

  /* ---------- ОЦЕНКИ ---------- */
  const PALETTES = [
    { a: "#8fb0f5", b: "#5d7cc9", p1: "#1d2a7a", p2: "#3b55c0" },
    { a: "#fca59a", b: "#c2584b", p1: "#b3142a", p2: "#ef4d62" },
    { a: "#ffbd5c", b: "#c9824f", p1: "#e0630a", p2: "#f8d25c" },
    { a: "#7ddba0", b: "#3f9a68", p1: "#0f6b3f", p2: "#3dc47a" },
    { a: "#c4a1f5", b: "#7d5ac0", p1: "#4a1d8a", p2: "#8b5cf6" },
  ];

  const Diamond = ({ n, silver, size = 34 }) => (
    <div
      style={{
        width: size,
        height: size,
        transform: "rotate(45deg)",
        borderRadius: size * 0.28,
        background: silver
          ? "linear-gradient(135deg,#eef2fb,#9fb0d6)"
          : "linear-gradient(135deg,#ffe27a,#f5b800)",
        border: `3px solid ${silver ? "#c9d4ee" : "#ffd84d"}`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,.3)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          transform: "rotate(-45deg)",
          color: silver ? "#32406b" : "#7a4a00",
          fontWeight: 900,
          fontSize: size * 0.45,
        }}
      >
        {n}
      </span>
    </div>
  );

  const gTile = (txt, o = {}) => (
    <div style={{ textAlign: "center", flexShrink: 0 }}>
      <div
        style={{
          position: "relative",
          width: o.w || 32,
          height: 32,
          borderRadius: 9,
          background: "rgba(255,255,255,0.2)",
          border: "1.5px solid rgba(255,255,255,0.4)",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize:
            String(txt).length > 3 ? 11 : String(txt).length > 2 ? 12 : 16,
        }}
      >
        {txt}
        {o.dot && (
          <Dot
            style={{
              top: -6,
              left: -4,
              width: 11,
              height: 11,
              border: "1.5px solid #fff",
            }}
          />
        )}
      </div>
      {o.caption && (
        <div style={{ fontSize: 11, marginTop: 3 }}>{o.caption}</div>
      )}
    </div>
  );

  const subjects = [];
  grades.forEach((g) => {
    let sj = subjects.find((x) => x.name === g.subject);
    if (!sj) {
      sj = { name: g.subject, formative: [], summative: [] };
      subjects.push(sj);
    }
    (g.kind === "Важная" ? sj.summative : sj.formative).push(g);
  });
  const mean = (arr) => {
    const n = arr.map((g) => toTen(g.score)).filter((x) => !isNaN(x));
    return n.length ? n.reduce((x, y) => x + y, 0) / n.length : NaN;
  };

  const GradesTab = (
    <div>
      <div
        style={{
          display: "flex",
          gap: 10,
          margin: "0 0 20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 17,
          }}
        >
          <Calendar size={20} color="#b4bde6" /> 2026/2027{" "}
          <ChevronDown size={18} color="#b4bde6" />
        </div>
        <div
          onClick={() => setQuarter((quarter % 4) + 1)}
          style={{
            background: "rgba(255,255,255,0.12)",
            borderRadius: 14,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 17,
            cursor: "pointer",
          }}
        >
          {quarter} четверть <ChevronDown size={18} color="#b4bde6" />
        </div>
        <div
          onClick={() => setFinals(!finals)}
          style={{
            background: finals ? BLUE : "#171d70",
            borderRadius: 14,
            padding: "10px 16px",
            fontSize: 17,
            cursor: "pointer",
            transition: "background .25s",
          }}
        >
          Итоговые
        </div>
      </div>

      <div
        style={{
          background: "var(--s0)",
          borderRadius: "34px 34px 0 0",
          margin: "0 -16px",
          padding: "4px 16px 220px",
          minHeight: "calc(100vh - 220px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            margin: "0 0 18px",
            paddingTop: 0,
          }}
        >
          {[
            { t: "Рейтинг в классе", n: 1, silver: false },
            { t: "Рейтинг в параллели", n: 3, silver: true },
          ].map((b) => (
            <div
              key={b.t}
              onClick={() => setTab("rating")}
              style={{
                flex: 1,
                background: "linear-gradient(120deg,#0a3fa8,#0a0a40)",
                borderRadius: 16,
                height: 72,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 14px",
                cursor: "pointer",
              }}
            >
              <Diamond n={b.n} silver={b.silver} size={30} />
              <span
                style={{
                  fontSize: 16,
                  lineHeight: 1.25,
                  whiteSpace: "pre-line",
                }}
              >
                {b.t.replace(" в ", "\nв ")}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {subjects.map((sj, si) => {
            const p = PALETTES[si % PALETTES.length];
            const all = [...sj.formative, ...sj.summative];
            const total = mean(all);
            const fAvg = mean(sj.formative);
            return (
              <div
                key={sj.name}
                style={{
                  position: "relative",
                  borderRadius: 22,
                  overflow: "hidden",
                  animation: `fadeIn .35s ${si * 0.06}s ease both`,
                }}
              >
                <div
                  style={{
                    background: p.a,
                    padding: "14px 112px 14px 16px",
                    minHeight: 96,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 800 }}>{sj.name}</div>
                  {sj.formative.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: 14,
                        marginTop: 6,
                        alignItems: "flex-end",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.75)",
                            marginBottom: 5,
                          }}
                        >
                          Формативные баллы
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          {sj.formative.slice(0, 4).map((g, i) => (
                            <React.Fragment key={g.id ?? i}>
                              {gTile(g.score, { dot: g.dot })}
                            </React.Fragment>
                          ))}
                          {sj.formative.length > 4 && gTile("…")}
                        </div>
                      </div>
                      {sj.formative.length > 1 && (
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "rgba(255,255,255,0.75)",
                              marginBottom: 5,
                            }}
                          >
                            Средний
                          </div>
                          {gTile(isNaN(fAvg) ? "—" : fAvg.toFixed(1), {
                            w: 44,
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    background: p.b,
                    padding: "14px 112px 14px 16px",
                    minHeight: 64,
                  }}
                >
                  {sj.summative.length === 0 ? (
                    <div
                      style={{
                        fontSize: 17,
                        lineHeight: 1.3,
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      Суммативные баллы ещё
                      <br />
                      не выставлены
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.8)",
                          marginBottom: 5,
                        }}
                      >
                        Суммативные баллы
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {sj.summative.map((g, i) => (
                          <React.Fragment key={g.id ?? i}>
                            {gTile(g.score, {
                              w: 44,
                              dot: g.dot,
                              caption: String(g.date).split(",")[0],
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    bottom: 8,
                    width: 88,
                    borderRadius: 18,
                    background: `linear-gradient(180deg,${p.p1},${p.p2})`,
                    border: "1.5px solid rgba(255,255,255,0.35)",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 6px",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <div
                      style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.1 }}
                    >
                      {isNaN(total)
                        ? "—"
                        : finals
                          ? Math.round(total)
                          : total.toFixed(1)}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.7)",
                        marginTop: 2,
                      }}
                    >
                      {finals ? "Итоговый балл" : "Общий балл"}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.25 }}>
                    рейтинг
                    <br />в классе
                  </div>
                  <Diamond n={1} size={28} />
                </div>
              </div>
            );
          })}
          {subjects.length === 0 && (
            <div
              style={{ textAlign: "center", color: "var(--mut2)", padding: 30 }}
            >
              Оценок пока нет
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ---------- РЕЙТИНГ ---------- */
  const RatingTab = (
    <div style={{ paddingBottom: 130 }}>
      <Sub title="Рейтинг в классе" />
      <div style={{ ...glass, textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 56, animation: "pop .6s ease both" }}>🏆</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Ты на 1 месте!</div>
        <div style={{ fontSize: 13, color: "#b4bde6", marginTop: 4 }}>
          Так держать, {profile.name}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {CLASSMATES.map((c, i) => (
          <div
            key={c.name}
            style={{
              ...glass,
              padding: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: c.me ? "2px solid #fff" : "2px solid transparent",
              background: c.me ? "rgba(126,166,255,0.28)" : glass.background,
              animation: c.me ? "glow 2s ease-in-out infinite" : "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  i === 0
                    ? "#facc15"
                    : i === 1
                      ? "#cbd5e1"
                      : i === 2
                        ? "#d97706"
                        : "#141a4a",
                color: i < 3 ? "#111" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            {c.me ? (
              avatarImg(36)
            ) : (
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#2b3590",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {c.name[0]}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>
                {c.me ? profile.name : c.name} {c.me && "👑"}
              </div>
              <div
                style={{
                  height: 6,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.12)",
                  marginTop: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: rankAnim ? `${c.score * 10}%` : "0%",
                    background: c.me ? "#7ea6ff" : "#4d5aa8",
                    borderRadius: 3,
                    transition: `width .9s ${i * 0.08}s ease`,
                  }}
                />
              </div>
            </div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>
              {c.score.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------- ПРОФИЛЬ ---------- */
  const langs = ["Русский", "O'zbekcha", "English"];

  const MenuRow = ({ icon, label, right, onClick, color, last }) => (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        cursor: onClick ? "pointer" : "default",
        color: color || "var(--fg)",
        minHeight: 62,
      }}
    >
      <div
        style={{
          width: 34,
          display: "flex",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          minHeight: 62,
          marginLeft: 14,
          borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.1)",
          fontSize: 20,
        }}
      >
        <span style={{ flex: 1 }}>{label}</span>
        {right && (
          <span style={{ color: "var(--mut)", marginRight: 6 }}>{right}</span>
        )}
        <ChevronRight size={22} color={color || "#b9bdc9"} />
      </div>
    </div>
  );

  const menuCard = {
    background: "var(--s3)",
    color: "var(--fg)",
    borderRadius: 24,
    overflow: "hidden",
  };
  const ic = (C, c = "#9fb0d6") => <C size={28} strokeWidth={1.5} color={c} />;

  const ProfileTab = (
    <div style={{ margin: "0 -16px", paddingBottom: 130 }}>
      <div
        style={{
          background: "linear-gradient(180deg,#0f2a5c 0%,#2a4068 100%)",
          padding: "70px 16px 34px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {avatarImg(130)}
          <button
            onClick={() => fileRef.current && fileRef.current.click()}
            style={{
              position: "absolute",
              left: 160,
              top: 38,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#1e2430",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={30} color={BLUE} strokeWidth={2.5} />
          </button>
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginTop: 22,
            textAlign: "center",
          }}
        >
          {profile.fullName}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#b7bfd0",
            fontWeight: 600,
            marginTop: 14,
          }}
        >
          Базовая версия
        </div>
        <button
          onClick={() => alert("PRO-подписка на 7 дней активирована 🎉")}
          style={{
            marginTop: 40,
            width: "100%",
            height: 56,
            borderRadius: 22,
            border: "none",
            background: "linear-gradient(90deg,#1e6bff,#4d9bff)",
            color: "#fff",
            fontSize: 21,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Получить доступ к ПРО-подписке
        </button>
      </div>

      <div
        style={{
          background: "var(--s1)",
          color: "var(--fg)",
          borderRadius: "34px 34px 0 0",
          marginTop: -16,
          padding: "32px 22px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div style={menuCard}>
          <MenuRow
            icon={ic(QrCode)}
            label="QR-код для входа"
            onClick={() => alert("QR-код для входа")}
          />
          <MenuRow
            icon={ic(User)}
            label="Связанные аккаунты"
            onClick={() => alert("Связанные аккаунты")}
          />
          <MenuRow
            icon={ic(Globe)}
            label="Язык"
            right={settings.lang}
            onClick={() =>
              setSettings({
                ...settings,
                lang: langs[(langs.indexOf(settings.lang) + 1) % langs.length],
              })
            }
          />
          <MenuRow
            icon={ic(Bell)}
            label="Уведомления"
            right={settings.notify ? "Вкл." : "Выкл."}
            onClick={() =>
              setSettings({ ...settings, notify: !settings.notify })
            }
          />
          <MenuRow
            icon={ic(Settings, "#9db8ff")}
            label="Редактор оценок и расписания"
            color="#9db8ff"
            onClick={() => setTab("editor")}
          />
          <MenuRow
            icon={ic(light ? Sun : Moon)}
            label="Тема оформления"
            right={light ? "Светлая" : "Тёмная"}
            onClick={() => setSettings({ ...settings, light: !settings.light })}
            last
          />
        </div>

        <div style={menuCard}>
          <MenuRow
            icon={ic(HelpCircle)}
            label="Поддержка"
            onClick={() => {
              setChatSeg("chats");
              openThread("support");
              setTab("chat");
            }}
          />
          <MenuRow
            icon={ic(ShieldCheck)}
            label="Политика конфиденциальности"
            onClick={() => alert("Политика конфиденциальности")}
            last
          />
        </div>

        <div style={menuCard}>
          <MenuRow
            icon={ic(Star)}
            label="Восстановить подписку"
            onClick={() => alert("Подписка не найдена")}
            last
          />
        </div>

        <div style={menuCard}>
          <MenuRow
            icon={ic(LogOut, "#ef3b3b")}
            label="Выход из аккаунта"
            color="#ef3b3b"
            onClick={logout}
            last
          />
        </div>
      </div>
    </div>
  );

  /* ---------- РЕДАКТОР ---------- */
  const card = {
    background: "var(--s3)",
    color: "var(--fg)",
    borderRadius: 24,
    padding: 16,
  };
  const fieldLabel = {
    fontSize: 12,
    color: "var(--mut2)",
    marginBottom: 6,
    display: "block",
  };
  const inputS = {
    width: "100%",
    background: "var(--s1)",
    border: "1.5px solid var(--line)",
    borderRadius: 14,
    padding: "12px 14px",
    fontSize: 15,
    color: "var(--fg)",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: font,
  };
  const smallBtn = {
    background: BLUE,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 4,
  };
  const trashBtn = {
    background: "rgba(239,68,68,0.14)",
    border: "none",
    cursor: "pointer",
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const SecTitle = ({ icon, title, right }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 11,
          background: "#2c3486",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 19, fontWeight: 800, flex: 1 }}>{title}</span>
      {right}
    </div>
  );

  const Toggle = ({ on, onClick }) => (
    <button
      onClick={onClick}
      style={{
        width: 52,
        height: 31,
        minWidth: 52,
        borderRadius: 999,
        border: "none",
        background: on ? "#22c55e" : "var(--s5)",
        position: "relative",
        cursor: "pointer",
        transition: "background .25s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 24 : 3,
          width: 25,
          height: 25,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .25s",
        }}
      />
    </button>
  );

  const SubjectSelect = ({ value, onChange }) => {
    const list =
      SUBJECTS.includes(value) || !value ? SUBJECTS : [value, ...SUBJECTS];
    return (
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value === "__custom") {
            const v = window.prompt("Название предмета");
            if (v && v.trim()) onChange(v.trim());
          } else onChange(e.target.value);
        }}
        style={{
          ...inputS,
          flex: 1,
          minWidth: 0,
          padding: "10px 12px",
          fontSize: 15,
        }}
      >
        {list.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
        <option value="__custom">✏️ Свой предмет…</option>
      </select>
    );
  };

  const updGrade = (idx, key, val) => {
    const n = [...grades];
    n[idx] = { ...n[idx], [key]: val };
    setGrades(n);
  };
  const updSch = (idx, key, val) => {
    const n = [...schedule];
    n[idx] = { ...n[idx], [key]: val };
    setSchedule(n);
  };
  const resetAll = () => {
    if (!window.confirm("Сбросить оценки, расписание и отметки ДЗ к исходным?"))
      return;
    setGrades(DEFAULT_GRADES);
    setWeek(DEFAULT_WEEK);
    setHwDone({});
  };
  const dayHint = WD_CHIPS.find((c) => c.n === editDay)?.l;

  const EditorTab = (
    <div>
      <Sub title="Редактор" back="profile" />
      <div
        style={{
          background: "var(--s0)",
          color: "var(--fg)",
          borderRadius: "34px 34px 0 0",
          margin: "0 -16px",
          padding: "20px 16px 230px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          minHeight: "calc(100vh - 120px)",
          boxSizing: "border-box",
        }}
      >
        {/* профиль */}
        <div style={card}>
          <SecTitle
            icon={<UserCircle size={20} color="#fff" />}
            title="Профиль"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 14,
            }}
          >
            {avatarImg(64)}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                style={smallBtn}
                onClick={() => fileRef.current && fileRef.current.click()}
              >
                <Plus size={16} /> Загрузить фото
              </button>
              <button
                onClick={() => setProfile({ ...profile, avatar: "" })}
                style={{
                  background: "var(--s1)",
                  color: "var(--mut2)",
                  border: "none",
                  borderRadius: 12,
                  padding: "8px 14px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Убрать фото
              </button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label>
              <span style={fieldLabel}>Имя (в шапке)</span>
              <input
                style={inputS}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </label>
            <label>
              <span style={fieldLabel}>Имя и фамилия (в профиле)</span>
              <input
                style={inputS}
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </label>
            <label>
              <span style={fieldLabel}>Класс</span>
              <input
                style={inputS}
                value={profile.className}
                onChange={(e) =>
                  setProfile({ ...profile, className: e.target.value })
                }
              />
            </label>
            <label>
              <span style={fieldLabel}>Или ссылка на фото</span>
              <input
                style={inputS}
                placeholder="https://..."
                value={
                  !hasPhoto || String(profile.avatar).startsWith("data:")
                    ? ""
                    : profile.avatar
                }
                onChange={(e) =>
                  setProfile({ ...profile, avatar: e.target.value })
                }
              />
            </label>
          </div>
        </div>

        {/* оценки */}
        <div style={card}>
          <SecTitle
            icon={<BarChart3 size={20} color="#fff" />}
            title="Оценки"
            right={
              <button
                style={smallBtn}
                onClick={() =>
                  setGrades([
                    {
                      id: Date.now(),
                      subject: "Алгебра",
                      kind: "Текущая",
                      date: "ОТВ, ЗА 14 ОКТ.",
                      score: "5",
                      dot: true,
                    },
                    ...grades,
                  ])
                }
              >
                <Plus size={16} /> Оценка
              </button>
            }
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {grades.map((g, idx) => (
              <div
                key={g.id ?? idx}
                style={{
                  background: "var(--s1)",
                  color: "var(--fg)",
                  borderRadius: 18,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    value={g.score}
                    placeholder="Балл"
                    onChange={(e) => updGrade(idx, "score", e.target.value)}
                    style={{
                      width: 58,
                      minWidth: 58,
                      height: 44,
                      borderRadius: 12,
                      border: "none",
                      background: scoreColor(g.score),
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: String(g.score).length > 2 ? 14 : 20,
                      textAlign: "center",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: font,
                    }}
                  />
                  <SubjectSelect
                    value={g.subject}
                    onChange={(v) => updGrade(idx, "subject", v)}
                  />
                  <button
                    style={trashBtn}
                    onClick={() =>
                      setGrades(grades.filter((_, i) => i !== idx))
                    }
                  >
                    <Trash2 size={17} color="#ef4444" />
                  </button>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Текущая", "Важная"].map((k) => (
                    <button
                      key={k}
                      onClick={() => updGrade(idx, "kind", k)}
                      style={{
                        flex: 1,
                        padding: "9px 0",
                        borderRadius: 12,
                        border: "none",
                        background: g.kind === k ? BLUE : "var(--s5)",
                        color: g.kind === k ? "#fff" : "var(--fg)",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      {k === "Текущая" ? "Формативная" : "Суммативная"}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <input
                    style={{
                      ...inputS,
                      flex: 1,
                      padding: "10px 12px",
                      fontSize: 14,
                    }}
                    value={g.date}
                    placeholder="Дата, например ОТВ, ЗА 13 ОКТ."
                    onChange={(e) => updGrade(idx, "date", e.target.value)}
                  />
                  <span style={{ fontSize: 13, color: "var(--mut2)" }}>
                    Новая
                  </span>
                  <Toggle
                    on={!!g.dot}
                    onClick={() => updGrade(idx, "dot", !g.dot)}
                  />
                </div>
              </div>
            ))}
            {grades.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--mut2)",
                  padding: 12,
                }}
              >
                Оценок нет
              </div>
            )}
          </div>
        </div>

        {/* расписание */}
        <div style={card}>
          <SecTitle
            icon={<Calendar size={20} color="#fff" />}
            title="Расписание"
            right={
              <button
                style={smallBtn}
                onClick={() =>
                  setSchedule([
                    ...schedule,
                    {
                      id: Date.now(),
                      time: TIMES[schedule.length] || "14:00-14:45",
                      subject: `${schedule.length + 1}. Новый урок`,
                      homework: "",
                      done: false,
                    },
                  ])
                }
              >
                <Plus size={16} /> Урок
              </button>
            }
          />
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {WD_CHIPS.map((c) => (
              <button
                key={c.n}
                onClick={() => setEditDay(c.n)}
                style={{
                  flex: 1,
                  padding: "11px 0",
                  borderRadius: 14,
                  border: "none",
                  background: editDay === c.n ? BLUE : "var(--s1)",
                  color: editDay === c.n ? "#fff" : "var(--fg)",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background .2s",
                }}
              >
                {c.l}
              </button>
            ))}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--mut2)",
              marginBottom: 12,
              lineHeight: 1.4,
            }}
          >
            Редактируется день: {dayHint}. Расписание повторяется каждую неделю,
            воскресенье и праздники — отдых.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {schedule.map((it, idx) => (
              <div
                key={it.id}
                style={{
                  background: "var(--s1)",
                  color: "var(--fg)",
                  borderRadius: 18,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      minWidth: 32,
                      borderRadius: "50%",
                      background: "#2c3486",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <SubjectSelect
                    value={it.subject.replace(/^\d+\.\s*/, "")}
                    onChange={(v) => updSch(idx, "subject", `${idx + 1}. ${v}`)}
                  />
                  <button
                    style={trashBtn}
                    onClick={() =>
                      setSchedule(
                        schedule
                          .filter((_, i) => i !== idx)
                          .map((x, i) => ({
                            ...x,
                            subject: `${i + 1}. ${x.subject.replace(/^\d+\.\s*/, "")}`,
                          })),
                      )
                    }
                  >
                    <Trash2 size={17} color="#ef4444" />
                  </button>
                </div>
                <input
                  style={{ ...inputS, padding: "10px 12px", fontSize: 14 }}
                  value={it.time}
                  placeholder="Время, например 8:00-8:45"
                  onChange={(e) => updSch(idx, "time", e.target.value)}
                />
                <input
                  style={{ ...inputS, padding: "10px 12px", fontSize: 14 }}
                  value={it.homework || ""}
                  placeholder="Домашнее задание"
                  onChange={(e) => updSch(idx, "homework", e.target.value)}
                />
                <input
                  style={{ ...inputS, padding: "10px 12px", fontSize: 14 }}
                  value={it.grade || ""}
                  placeholder="Оценка за урок (необязательно)"
                  onChange={(e) => updSch(idx, "grade", e.target.value)}
                />
              </div>
            ))}
            {schedule.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "var(--mut2)",
                  padding: 12,
                }}
              >
                В этот день уроков нет
              </div>
            )}
          </div>
        </div>

        {/* настройки */}
        <div style={card}>
          <SecTitle
            icon={<Settings size={20} color="#fff" />}
            title="Настройки"
          />
          {[
            { l: "Уведомления", k: "notify" },
            { l: "Напоминать о ДЗ", k: "hwRemind" },
            { l: "Светлая тема", k: "light" },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                display: "flex",
                alignItems: "center",
                minHeight: 52,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontSize: 17,
              }}
            >
              <span style={{ flex: 1 }}>{s.l}</span>
              <Toggle
                on={settings[s.k]}
                onClick={() =>
                  setSettings({ ...settings, [s.k]: !settings[s.k] })
                }
              />
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: 52,
              fontSize: 17,
            }}
          >
            <span style={{ flex: 1 }}>Язык</span>
            <div style={{ display: "flex", gap: 6 }}>
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setSettings({ ...settings, lang: l })}
                  style={{
                    padding: "7px 10px",
                    borderRadius: 12,
                    border: "none",
                    background: settings.lang === l ? BLUE : "var(--s1)",
                    color: settings.lang === l ? "#fff" : "var(--fg)",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* сброс */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setHwDone({})}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 18,
              border: "none",
              background: "var(--s3)",
              color: "var(--fg)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Сбросить отметки ДЗ
          </button>
          <button
            onClick={resetAll}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 18,
              border: "none",
              background: "rgba(239,68,68,0.14)",
              color: "#ff6b6b",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Сбросить всё
          </button>
        </div>
      </div>
    </div>
  );

  /* ---------- навигация ---------- */
  const tabs = [
    { id: "home", icon: Home, dot: "#ef4444" },
    {
      id: "chat",
      icon: MessageCircle,
      dot: chats.some((c) => c.unread) ? "#ef4444" : null,
    },
    { id: "diary", icon: BookOpen },
    { id: "grades", icon: BarChart3, dot: "#ef4444" },
    { id: "profile", icon: UserCircle },
  ];
  const darkNav = tab === "chat" || tab === "grades" || tab === "profile";
  const activeId = { editor: "profile", rating: "home" }[tab] || tab;
  const isProfile = tab === "profile";
  const pagePad = tab === "home" || tab === "chat" || tab === "diary" ? 14 : 16;

  const screens = {
    home: HomeTab,
    chat: ChatTab,
    diary: DiaryTab,
    grades: GradesTab,
    profile: ProfileTab,
    editor: EditorTab,
    rating: RatingTab,
  };

  const floatBtn = {
    position: "fixed",
    bottom: 89,
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 28px)",
    maxWidth: 392,
    height: 42,
    borderRadius: 16,
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    zIndex: 45,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--outer)",
        display: "flex",
        justifyContent: "center",
        color: "#fff",
        fontFamily: font,
        ...THEMES[light ? "light" : "dark"],
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={pickPhoto}
        style={{ display: "none" }}
      />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pop { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 0 rgba(126,166,255,0); } 50% { box-shadow: 0 0 16px rgba(126,166,255,.7); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          minHeight: "100vh",
          position: "relative",
          background: isProfile
            ? "var(--s1)"
            : "linear-gradient(180deg, #1c2486 0%, #2a2fa3 45%, #262a96 100%)",
          boxSizing: "border-box",
          overflowX: "clip",
        }}
      >
        {!isProfile && (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 40,
              background: "#1c2486",
              padding: `calc(env(safe-area-inset-top, 0px) + 9px) ${pagePad}px 7px`,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <div
              onClick={() => setTab("profile")}
              style={{
                position: "relative",
                background: "rgba(255,255,255,0.12)",
                borderRadius: 11,
                padding: "0 10px 0 7px",
                height: 39,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: 8,
                minWidth: 0,
                maxWidth: 200,
                cursor: "pointer",
              }}
            >
              {avatarImg(25)}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.15 }}
                >
                  {profile.name}
                </div>
                <div
                  style={{
                    fontSize: 9.5,
                    color: "#b4bde6",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 80,
                    marginTop: 1,
                  }}
                >
                  {profile.className}
                </div>
              </div>
              <Dot
                style={{
                  top: -2,
                  right: -2,
                  border: "none",
                  width: 8,
                  height: 8,
                }}
              />
            </div>
            <div
              onClick={() => setTab("editor")}
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: 11,
                height: 39,
                padding: "0 12px 0 9px",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                whiteSpace: "nowrap",
                cursor: "pointer",
              }}
            >
              <PlusCircle size={21} strokeWidth={1.7} /> Ребенок
            </div>
          </div>
        )}

        <div
          key={tab + (openChat || "")}
          style={{
            padding: `0 ${pagePad}px`,
            animation: "fadeIn .3s ease both",
          }}
        >
          {screens[tab]}
        </div>

        {tab === "editor" && (
          <button
            onClick={handleSave}
            style={{
              ...floatBtn,
              background: "linear-gradient(90deg,#1e6bff,#4d9bff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Save size={17} /> Сохранить изменения
          </button>
        )}
        {tab === "grades" && (
          <button
            onClick={() => alert(`Средний балл: ${avg}`)}
            style={{
              ...floatBtn,
              background: "linear-gradient(90deg,#1e6bff,#4d9bff)",
            }}
          >
            Узнать оценки
          </button>
        )}
        {tab === "diary" && (
          <>
            {showToday && (
              <button
                onClick={() =>
                  todayRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                style={{
                  position: "fixed",
                  top: 112,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 45,
                  background: "var(--s2)",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  color: "var(--fg)",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "6px 16px 6px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  animation: "fadeIn .25s ease both",
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: BLUE,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChevronDown size={15} />
                </span>
                К сегодняшнему дню
              </button>
            )}
            <button
              onClick={() => setTab("grades")}
              style={{
                ...floatBtn,
                background: "#6f9bff",
              }}
            >
              Узнать ДЗ и оценки
            </button>
          </>
        )}

        <div
          style={{
            position: "fixed",
            bottom: 19,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 38px)",
            maxWidth: 382,
            height: 54,
            background: darkNav ? "var(--nav)" : "rgba(24,30,110,0.92)",
            backdropFilter: "blur(10px)",
            border: darkNav ? "1.5px solid var(--line)" : "1.5px solid #2f4bd8",
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            padding: "0 6px",
            boxSizing: "border-box",
            zIndex: 50,
          }}
        >
          {tabs.map((t) => {
            const active = activeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  if (t.id !== "chat") setOpenChat(null);
                }}
                style={{
                  position: "relative",
                  flex: 1,
                  height: 48,
                  padding: 0,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    width: 76,
                    height: 48,
                    marginLeft: -38,
                    borderRadius: 24,
                    background: darkNav
                      ? "var(--navact)"
                      : "rgba(255,255,255,0.12)",
                    opacity: active ? 1 : 0,
                    transform: active ? "scale(1)" : "scale(0.6)",
                    transition: "transform .3s, opacity .3s",
                  }}
                />
                <t.icon
                  size={30}
                  strokeWidth={1.5}
                  color={active ? BLUE : "#8f9fd0"}
                  style={{ position: "relative" }}
                />
                {t.dot && (
                  <span
                    style={{
                      position: "absolute",
                      top: 9,
                      left: "calc(50% + 8px)",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: t.dot,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
