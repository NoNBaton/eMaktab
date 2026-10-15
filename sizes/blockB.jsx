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
