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
