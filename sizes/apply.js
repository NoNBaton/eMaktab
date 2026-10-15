// Запуск из корня проекта:  node sizes/apply.js
// 1) заменяет в app/page.jsx два участка (между маркерами) на blockA.jsx и blockB.jsx
// 2) добавляет к расписанию на главной: подгонку высоты под количество уроков,
//    свою картинку на каждый день недели и плавное появление уроков
// 3) копирует sizes/DayArt.jsx в app/DayArt.jsx и добавляет import
const fs = require("fs");
const path = require("path");

const target = process.argv[2] || path.join("app", "page.jsx");
const dir = __dirname;

if (!fs.existsSync(target)) {
  console.error("Не найден файл: " + target);
  console.error("Запускайте команду из корня проекта (там, где папка app).");
  process.exit(1);
}

const src = fs.readFileSync(target, "utf8");
let A = fs
  .readFileSync(path.join(dir, "blockA.jsx"), "utf8")
  .replace(/\s+$/, "");
const B = fs.readFileSync(path.join(dir, "blockB.jsx"), "utf8");

/* ---------- дополнения к blockA (расписание на главной) ---------- */
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const flex = (t) =>
  new RegExp(t.trim().split(/\s+/).map(esc).join("\\s+"), "g");
function rep(name, oldText, newText) {
  const re = flex(oldText);
  const n = (A.match(re) || []).length;
  if (n !== 1) {
    console.error("НЕ НАЙДЕНО в blockA.jsx (" + n + " совпадений): " + name);
    console.error("Ничего не изменено.");
    process.exit(1);
  }
  A = A.replace(re, () => newText);
}

if (!A.includes("fitHome")) {
  rep(
    "lessonCard: параметр idx",
    "const lessonCard = (item, d = anchor) => {",
    "const lessonCard = (item, d = anchor, idx = 0) => {",
  );
  rep(
    "lessonCard: анимация появления",
    `opacity: dn ? 0.75 : 1,
        transition: "opacity .3s",
      }}
    >
      <div
        onClick={() => setTab("diary")}`,
    String.raw`opacity: dn ? 0.75 : 1,
        transition: "opacity .3s",
        animation: "fadeIn .35s " + Math.min(idx, 8) * 0.05 + "s ease both",
      }}
    >
      <div
        onClick={() => setTab("diary")}`,
  );
  rep(
    "список уроков с индексом",
    "{lessons.map((x) => lessonCard(x, d))}",
    "{lessons.map((x, i) => lessonCard(x, d, i))}",
  );
  rep(
    "карточка дня + картинка",
    `flex: "0 0 100%",
        scrollSnapAlign: "center",
        background: "var(--s2)",
        color: "var(--fg)",
        borderRadius: 28,
        padding: "17px 11px 14px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ padding: "0 11px" }}>`,
    String.raw`flex: "0 0 100%",
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
      <div style={{ position: "relative", padding: "0 11px" }}>`,
  );
  rep(
    "функция подгонки высоты",
    "const homeDays = [];",
    String.raw`// высота блока = высоте карточки дня, которая сейчас по центру
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

const homeDays = [];`,
  );
  rep(
    "панель без minHeight",
    'padding: "24px 0 110px", minHeight: 520,',
    'padding: "24px 0 110px",',
  );
  rep(
    "контейнер карусели",
    `<div
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
      >`,
    String.raw`<div
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
      >`,
  );
}

/* ---------- замена блоков в page.jsx ---------- */
const M_A1 = "/* ---------- общие куски ---------- */";
const M_A2 = "/* ---------- ОЦЕНКИ ---------- */";
const M_B1 = "/* ---------- навигация ---------- */";

const a1 = src.indexOf(M_A1);
const a2 = src.indexOf(M_A2);
const b1 = src.indexOf(M_B1);

if (a1 < 0 || a2 < 0 || b1 < 0 || !(a1 < a2 && a2 < b1)) {
  console.error("Не нашёл маркеры в файле. Ничего не изменено.");
  console.error({ "общие куски": a1, ОЦЕНКИ: a2, навигация: b1 });
  process.exit(1);
}

fs.writeFileSync(target + ".bak", src);

let out = src.slice(0, a1) + A + "\n\n  " + src.slice(a2, b1) + B;

/* ---------- DayArt: файл и import ---------- */
const artSrc = path.join(dir, "DayArt.jsx");
const artDst = path.join(path.dirname(target), "DayArt.jsx");
fs.copyFileSync(artSrc, artDst);
if (!out.includes('import DayArt from "./DayArt"')) {
  const k = '} from "lucide-react";';
  if (!out.includes(k)) {
    console.error(
      "Не нашёл строку " +
        k +
        ' — добавьте вручную: import DayArt from "./DayArt";',
    );
  } else {
    out = out.replace(k, k + '\nimport DayArt from "./DayArt";');
  }
}

fs.writeFileSync(target, out);
console.log("Готово. Резервная копия: " + target + ".bak");
console.log("DayArt.jsx скопирован в " + artDst);
