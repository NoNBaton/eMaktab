// Запуск из корня проекта:  node sizes/apply.js
// Заменяет в app/page.jsx два участка (между маркерами) на blockA.jsx и blockB.jsx
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
const A = fs
  .readFileSync(path.join(dir, "blockA.jsx"), "utf8")
  .replace(/\s+$/, "");
const B = fs.readFileSync(path.join(dir, "blockB.jsx"), "utf8");

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

const out = src.slice(0, a1) + A + "\n\n  " + src.slice(a2, b1) + B;

fs.writeFileSync(target, out);
console.log("Готово. Резервная копия: " + target + ".bak");
