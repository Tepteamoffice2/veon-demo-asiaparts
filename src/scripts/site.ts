// Page behaviour: picker tabs, brand marker (signature), today's dispatch deadline,
// mobile menu, bottom bar and active anchor. Everything works without it; motion respects reduced-motion.

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Tabs: За авто / VIN / Артикул ---------- */
const tabs = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-tab]"));
const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));
function selectTab(i: number, focus = false) {
  tabs.forEach((t, j) => {
    const on = i === j;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    panels[j]?.classList.toggle("is-active", on);
  });
  if (focus) tabs[i]?.focus();
  if (i === 0) placeMarker(false);
}
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(i));
  t.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k !== "ArrowRight" && k !== "ArrowLeft" && k !== "Home" && k !== "End") return;
    e.preventDefault();
    const n = tabs.length;
    const next = k === "Home" ? 0 : k === "End" ? n - 1 : (i + (k === "ArrowRight" ? 1 : -1) + n) % n;
    selectTab(next, true);
  });
});

/* ---------- Brand marker: one red block moves under the chosen make ---------- */
const track = document.querySelector<HTMLElement>("[data-track]");
const marker = document.querySelector<HTMLElement>("[data-marker]");
const hint = document.querySelector<HTMLElement>("[data-hint]");
const hintBrand = document.querySelector<HTMLElement>("[data-hint-brand]");
const stepLabels = document.querySelectorAll<HTMLButtonElement>("[data-step-label]");
const brandBtns = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-brand]"));
let current: HTMLButtonElement | null = null;

function placeMarker(animate: boolean) {
  if (!track || !marker || !current) return;
  const tr = track.getBoundingClientRect();
  const br = current.getBoundingClientRect();
  if (!br.width) return;
  const x = br.left - tr.left;
  const y = br.top - tr.top;
  // The marker is a 100x100 box scaled to the word: only transform changes.
  marker.style.transition = animate && !reduce.matches ? "" : "none";
  marker.style.transform = `translate(${x}px, ${y}px) scale(${br.width / 100}, ${br.height / 100})`;
  marker.classList.add("is-on");
  if (!animate || reduce.matches) {
    void marker.offsetWidth;
    marker.style.transition = "";
  }
}

brandBtns.forEach((b) => {
  b.addEventListener("click", () => {
    const first = !current;
    if (current) current.setAttribute("aria-pressed", "false");
    current = b;
    b.setAttribute("aria-pressed", "true");
    placeMarker(!first);
    if (hintBrand) hintBrand.textContent = `${b.dataset.brand}: обрано.`;
    hint?.classList.add("is-shown");
    stepLabels.forEach((s) => (s.textContent = "У повній версії"));
    const scroller = track?.parentElement;
    if (scroller && scroller.scrollWidth > scroller.clientWidth) {
      b.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce.matches ? "auto" : "smooth" });
    }
  });
});
let rz = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(rz);
  rz = requestAnimationFrame(() => placeMarker(false));
});
document.fonts?.ready.then(() => placeMarker(false));

/* ---------- Today's dispatch deadline (Kyiv time) ---------- */
const day = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Kyiv", weekday: "short" }).format(new Date());
const kind = day === "Sun" ? "sunday" : day === "Sat" ? "saturday" : "weekday";
const todayBox = document.querySelector(`[data-day="${kind}"]`);
if (todayBox) {
  todayBox.classList.add("is-today");
  const label = todayBox.querySelector("[data-today-label]");
  if (label) label.textContent = "сьогодні";
}
if (kind === "sunday") document.querySelector("[data-sunday]")?.classList.add("is-today");

/* ---------- Mobile menu ---------- */
const burger = document.querySelector<HTMLButtonElement>("[data-burger]");
const mnav = document.querySelector<HTMLElement>("[data-mnav]");
const mobileQuery = window.matchMedia("(max-width: 63.999rem)");
function setMenu(open: boolean) {
  if (!burger || !mnav) return;
  burger.setAttribute("aria-expanded", String(open));
  mnav.classList.toggle("is-open", open);
  document.documentElement.classList.toggle("menu-open", open);
  if (mobileQuery.matches) mnav.inert = !open;
  if (open) mnav.querySelector<HTMLElement>("a")?.focus();
}
if (mnav) mnav.inert = mobileQuery.matches;
mobileQuery.addEventListener("change", (e) => {
  if (!mnav) return;
  if (!e.matches) setMenu(false);
  mnav.inert = e.matches && !mnav.classList.contains("is-open");
});
burger?.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
mnav?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a[href^='#']")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && burger?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    burger.focus();
  }
});

/* ---------- Bottom bar (phone): shows once the first-screen call button is out of view ---------- */
const bar = document.querySelector<HTMLElement>("[data-mbar]");
const heroCall = document.querySelector<HTMLElement>("[data-call-mobile]");
if (bar && heroCall && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => {
    const below = !e.isIntersecting && e.boundingClientRect.top < 0;
    bar.classList.toggle("is-shown", below);
  }).observe(heroCall);
} else bar?.classList.add("is-shown");

/* ---------- Active anchor in the desktop nav ---------- */
const spyLinks = new Map<string, HTMLElement>();
document.querySelectorAll<HTMLElement>("[data-spy]").forEach((a) => spyLinks.set(a.dataset.spy!, a));
if ("IntersectionObserver" in window && spyLinks.size) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      spyLinks.forEach((a, id) => {
        if (id === e.target.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  spyLinks.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}
