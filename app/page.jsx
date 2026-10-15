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
import DayArt from "./DayArt";

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

const LOGO_SRC =
  "data:image/png;base64,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";

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
  const [splashOut, setSplashOut] = useState(false);
  const [ready, setReady] = useState(false);
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

  // заставка -> логотип уезжает вверх -> скелетон -> контент
  useEffect(() => {
    const t1 = setTimeout(() => setSplashOut(true), 2600);
    const t2 = setTimeout(() => setIsLoading(false), 3100);
    const t3 = setTimeout(() => setReady(true), 4900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

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
    if (tab !== "home" || isLoading || !ready) return;
    setRatingStep(0);
    const t = setTimeout(() => setRatingStep(1), 700);
    return () => clearTimeout(t);
  }, [tab, isLoading, ready]);

  // карусель расписания на главной: сразу показываем сегодняшний день
  useEffect(() => {
    if (tab !== "home" || isLoading || !ready) return;
    const t = setTimeout(() => {
      const car = carRef.current;
      const card = homeTodayRef.current;
      if (car && card) {
        car.scrollLeft =
          card.offsetLeft - (car.clientWidth - card.offsetWidth) / 2;
      }
    }, 50);
    return () => clearTimeout(t);
  }, [tab, isLoading, ready]);

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
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#161628",
          color: "#fff",
          fontFamily: font,
          zIndex: 9999,
          overflow: "hidden",
          animation: splashOut ? "splashBg .5s ease forwards" : "none",
        }}
      >
        <style>{`
          @keyframes logoIn { from { opacity: 0; transform: translateY(10px) scale(.94); } to { opacity: 1; transform: none; } }
          @keyframes textIn { from { opacity: 0; letter-spacing: 3px; } to { opacity: 1; letter-spacing: .3px; } }
          @keyframes textOut { from { opacity: 1; } to { opacity: 0; } }
          @keyframes splashBg { from { background-color: #161628; } to { background-color: #1c2486; } }
          @keyframes logoOut { 0% { transform: none; opacity: 1; } 60% { opacity: 1; } 100% { transform: translateY(-4vh) scale(1.34); opacity: 0; } }
        `}</style>

        {/* логотип */}
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              animation: splashOut
                ? "logoOut .5s cubic-bezier(.4,0,.2,1) forwards"
                : "logoIn .7s ease both",
            }}
          >
            <img
              src={LOGO_SRC}
              alt="emaktab"
              width="214"
              style={{ display: "block", width: 214, height: "auto" }}
            />
          </div>
        </div>

        {/* подпись */}
        <div
          style={{
            position: "absolute",
            top: "50.5%",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 12,
            color: "#fff",
            animation: splashOut
              ? "textOut .25s ease forwards"
              : "textIn .7s .35s ease both",
          }}
        >
          Готовим ваше расписание 📚
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
  ? (numericGrades.reduce((a, b) => a + b, 0) / numericGrades.length).toFixed(1)
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
  <div style={{ position: "relative", height: RATING_ROW_H * 3, marginTop: 6 }}>
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

/* ---------- карточка урока ---------- */
const lessonCard = (item, d = anchor, idx = 0) => {
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
        animation: "fadeIn .35s " + Math.min(idx, 8) * 0.05 + "s ease both",
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
        <ChevronRight size={18} color={BLUE} />
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
        scrollSnapStop: "always",
        background: "var(--s2)",
        color: "var(--fg)",
        borderRadius: 28,
        padding: "17px 11px 14px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!empty && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            pointerEvents: "none",
          }}
        >
          <DayArt day={d.getDay()} />
        </div>
      )}
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
              <Share
                size={16}
                color="#c3c6cf"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigator.clipboard?.writeText(
                    lessons
                      .map(
                        (x) => `${x.subject} (${x.time}): ${x.homework || "-"}`,
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
          {lessons.map((x, i) => lessonCard(x, d, i))}
        </div>
      )}
    </div>
  );
};

// высота блока = высоте карточки дня, которая сейчас по центру
const fitHome = (el) => {
  if (!el) return;
  const center = el.scrollLeft + el.clientWidth / 2;
  let best = null;
  let bd = Infinity;
  Array.from(el.children).forEach((c) => {
    const dd = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
    if (dd < bd) {
      bd = dd;
      best = c;
    }
  });
  if (!best) return;
  const h = best.offsetHeight + "px";
  if (el.style.height === h) return;
  if (!el.dataset.fit) {
    // первый раз — без анимации
    el.style.transition = "none";
    el.style.height = h;
    void el.offsetHeight;
    el.style.transition = "";
    el.dataset.fit = "1";
  } else {
    el.style.height = h;
  }
};
const setHomeCar = (el) => {
  carRef.current = el;
  if (!el) return;
  if (!el.dataset.init) {
    const t = homeTodayRef.current;
    if (t) {
      el.scrollLeft = t.offsetLeft - (el.clientWidth - t.offsetWidth) / 2;
      el.dataset.init = "1";
    }
  }
  requestAnimationFrame(() => fitHome(el));
};

const homeDays = [];
for (let i = -7; i <= 14; i++) homeDays.push(addDays(anchor, i));
const slide = (dir) => {
  const el = carRef.current;
  if (!el) return;
  el.scrollBy({ left: dir * (el.clientWidth * 0.9 + 11), behavior: "smooth" });
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
            {g.kind}
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
            {g.date}
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
        ref={setHomeCar}
        onScroll={(e) => fitHome(e.currentTarget)}
        style={{
          display: "flex",
          gap: 11,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          padding: "0 5%",
          scrollbarWidth: "none",
          alignItems: "flex-start",
          position: "relative",
          transition: "height .35s cubic-bezier(.4,0,.2,1)",
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
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}
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
                    style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.2 }}
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
                <ChevronRight
                  size={18}
                  color={BLUE}
                  style={{
                    transform: open ? "rotate(90deg)" : "none",
                    transition: "transform .25s",
                  }}
                />
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
    { id: "chat", icon: MessageCircle, dot: chats.some((c) => c.unread) ? "#ef4444" : null },
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
      <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} style={{ display: "none" }} />
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
                <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.15 }}>{profile.name}</div>
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
              <Dot style={{ top: -2, right: -2, border: "none", width: 8, height: 8 }} />
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
          style={{ padding: `0 ${pagePad}px`, animation: "fadeIn .3s ease both" }}
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
                  todayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
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
                    background: darkNav ? "var(--navact)" : "rgba(255,255,255,0.12)",
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
