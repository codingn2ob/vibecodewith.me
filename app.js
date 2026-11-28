/* ==========================================================================
   vibecodewith.me — 網站設定與內容（cc 版，內容與根目錄 app.js 相同）
   ========================================================================== */

const SITE_CONFIG = {
  brand: "vibecodewith.me",
  handle: "@codingn2ob",
  email: "lin5555888@vibecodewith.me",
  githubUrl: "https://github.com/codingn2ob",
  heroSubtitle:
    "把腦海裡的奇思妙想，透過 AI 快速打磨成真正上線的網頁實驗與小工具。這裡是我的個人主頁，也是所有靈感的發射台。",
  bio: "熱衷於探索 AI 與前端網頁的各種可能。喜歡用自然語言和 AI 結對開發，專注打造簡潔直覺、讓人會心一笑的小工具與互動體驗。",
  nowBuilding: "打造 vibecodewith.me 個人實驗室，以及下一批實用的 AI 小玩具。"
};

/**
 * AI 作品實驗室資料
 * category 可填：'ai' | 'web' | 'wip'
 * status 可填：'live' | 'wip'
 * previewTheme 可填：'preview-blue' | 'preview-amber' | 'preview-mint'
 */
const PROJECTS = [
  {
    id: "vcwm-home",
    title: "vibecodewith.me",
    category: "web",
    categoryLabel: "網頁實驗",
    status: "live",
    statusLabel: "Live",
    previewTheme: "preview-blue",
    description:
      "受 Apple 設計語言啟發的個人主頁與作品實驗室。支援淺色／Pro 深色模式、Bento 卡片與 ⌘K Spotlight 指令列。",
    tags: ["HTML / CSS", "Vanilla JS", "Apple UI"],
    actionLabel: "就在這裡",
    href: "#top"
  },
  {
    id: "vibe-generator",
    title: "Vibe 靈感機",
    category: "ai",
    categoryLabel: "AI 工具",
    status: "live",
    statusLabel: "Live",
    previewTheme: "preview-amber",
    description:
      "不知道今天要 Vibe Code 什麼？一鍵隨機抽出 30 分鐘可完成的點子，並附上可直接貼給 Claude 的起手式 Prompt。",
    tags: ["Prompt", "互動元件", "Side Project"],
    actionLabel: "立即試玩",
    href: "#vibe-card"
  },
  {
    id: "next-ai-toy",
    title: "下一個 AI 小工具",
    category: "wip",
    categoryLabel: "進行中",
    status: "wip",
    statusLabel: "Building",
    previewTheme: "preview-mint",
    description:
      "正在用 Claude Team 實驗下一個解決日常小痛點的純前端工具。保留位置給即將登場的實驗作品！",
    tags: ["Claude Team", "籌備中"],
    actionLabel: "敬請期待",
    href: "#contact"
  }
];

/**
 * Vibe 靈感機點子庫
 */
const VIBE_IDEAS = [
  {
    title: "極簡專注白噪音番茄鐘",
    time: "預計 25 分鐘",
    description: "結合雨聲／咖啡廳 Web Audio 合成音效的極簡番茄鐘，寫程式時不用再開一堆分頁。",
    prompt: "用純 HTML/CSS/JS 做一個 Apple 極簡風格的番茄鐘，內建 Web Audio API 產生柔和白噪音，支援鍵盤空白鍵開始與暫停。"
  },
  {
    title: "Prompt 結構化優化器",
    time: "預計 30 分鐘",
    description: "輸入一句模糊需求，自動幫你整理成含「角色、目標、限制、輸出格式」的高品質 Prompt。",
    prompt: "幫我做一個單頁網頁工具，左邊輸入隨口寫的需求，右邊即時組裝成結構化的 Claude Prompt，並提供一鍵複製按鈕。"
  },
  {
    title: "大學生課表 & 學分計算機",
    time: "預計 40 分鐘",
    description: "把雜亂的選課清單變成好看的 Apple 卡片課表，順便自動統計必修／選修學分進度。",
    prompt: "設計一個免後端的大學週課表網頁，支援點選格子新增課程、自動計算總學分，並用 localStorage 儲存資料。"
  },
  {
    title: "會議／聚餐隨機抽籤輪盤",
    time: "預計 20 分鐘",
    description: "解決「中午吃什麼」與「誰上台報告」的世紀難題，加入流暢物理減速動畫。",
    prompt: "用 Canvas 做一個滑順的極簡抽籤輪盤，支援貼上名單換行自動分格、平滑減速停止，並顯示獲選結果彈窗。"
  },
  {
    title: "Markdown 履歷即時預覽器",
    time: "預計 45 分鐘",
    description: "左邊寫純文字、右邊即時排成乾淨高級的 A4 履歷，直接按瀏覽器列印就能存成 PDF。",
    prompt: "做一個雙欄 Markdown 履歷編輯器，右側套用極簡黑白排版與 @media print A4 列印樣式，支援一鍵匯出 PDF。"
  },
  {
    title: "JSON / API 回應視覺化格式化器",
    time: "預計 25 分鐘",
    description: "貼上擠成一團的 JSON，自動排版、摺疊節點、計算欄位數量，離線也能安心用。",
    prompt: "寫一個純前端 JSON 美化與樹狀摺疊工具，支援貼上即時驗證錯誤行數、一鍵展開全部或複製單一節點路徑。"
  }
];

/* ==========================================================================
   核心互動邏輯（cc 版）
   ========================================================================== */

const STORAGE_THEME_KEY = "vcwm-theme";
const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
let currentIdeaIndex = -1;
let toastTimer = null;

const $ = (sel, root = document) => root.querySelector(sel);
const motionOK = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ==========================================================================
   動效參考 UI Moments（MIT，© 2026 guanmo-ai，github.com/luojiaping/ui-moments）
   「對齊撥片」的彈性滑塊與「夾頁鍵」的壓扁回彈，依本站元件重新實作。
   許可全文見 THIRD_PARTY_NOTICES.md。
   ========================================================================== */

/* 彈性滑塊：選取底色滑向新項目時先順著方向拉長、再收緊回彈 */
function createElasticThumb(container) {
  const thumb = document.createElement("span");
  thumb.className = "thumb";
  thumb.setAttribute("aria-hidden", "true");
  container.prepend(thumb);
  let target = null;
  let last = null;
  let motion = null;

  const measure = (el) => ({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight });
  const place = (g, scale = "") => `translate(${g.x}px, ${g.y}px)${scale}`;

  function moveTo(el, animate = true) {
    target = el;
    motion?.cancel();
    if (!el) {
      thumb.classList.remove("is-on");
      last = null;
      return;
    }
    const to = measure(el);
    thumb.style.width = to.w + "px";
    thumb.style.height = to.h + "px";
    thumb.style.transform = place(to);
    thumb.classList.add("is-on");

    const sameRow = last && last.y === to.y;
    if (animate && motionOK() && last && sameRow && last.x !== to.x) {
      const origin = to.x > last.x ? "right center" : "left center";
      motion = thumb.animate([
        { transform: place(last), width: last.w + "px", transformOrigin: origin },
        { transform: place(to, " scale(1.28, 0.84)"), width: to.w + "px", transformOrigin: origin, offset: 0.61 },
        { transform: place(to, " scale(0.94, 1.07)"), width: to.w + "px", transformOrigin: origin, offset: 0.83 },
        { transform: place(to), width: to.w + "px", transformOrigin: origin }
      ], { duration: 380, easing: "cubic-bezier(.21,.65,.31,1)" });
    }
    last = to;
  }

  window.addEventListener("resize", () => { if (target) moveTo(target, false); });
  return { moveTo };
}

/* 按鈕放開後的回彈 */
function bounce(el) {
  if (!el || !motionOK()) return;
  el.animate([
    { transform: "translateY(1px) scale(1.05, 0.88)" },
    { transform: "translateY(-2px) scale(0.97, 1.05)", offset: 0.43 },
    { transform: "scale(1.012, 0.99)", offset: 0.73 },
    { transform: "none" }
  ], { duration: 380, easing: "cubic-bezier(.22,.74,.37,1)" });
}

function initPressFeedback() {
  document.addEventListener("click", (e) => {
    bounce(e.target.closest(".btn, .tool-btn, .copy-btn, .filter"));
  });
}
const isExternal = (href) => /^https?:\/\//.test(href);

function initSiteBindings() {
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const key = el.getAttribute("data-bind");
    if (SITE_CONFIG[key]) el.textContent = SITE_CONFIG[key];
  });
  document.querySelectorAll("[data-bind-href]").forEach((el) => {
    const key = el.getAttribute("data-bind-href");
    if (SITE_CONFIG[key]) el.setAttribute("href", SITE_CONFIG[key]);
  });
  document.querySelectorAll("[data-kbd]").forEach((el) => {
    el.textContent = IS_MAC ? "⌘K" : "Ctrl K";
  });
}

/* Toast：畫面上的提示用 popover，報讀用一直存在的 live region */
let lastToast = "";
function showToast(message) {
  const el = $("#toast");
  const live = $("#toast-live");
  if (!el) return;
  // 同一句話連續出現時，VoiceOver 會略過，所以加一個不換行空白讓它不同
  const spoken = message === lastToast ? message + " " : message;
  lastToast = spoken;
  if (live) live.textContent = spoken;

  el.textContent = message;
  const hasPopover = typeof el.showPopover === "function";
  if (hasPopover) {
    if (el.matches(":popover-open")) el.hidePopover();
    el.showPopover();
  } else {
    el.classList.add("no-popover", "is-open");
  }
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (hasPopover) { if (el.matches(":popover-open")) el.hidePopover(); }
    else el.classList.remove("is-open");
  }, 2400);
}

/* Clipboard（HTTPS 與 file:// 都能用） */
function legacyCopy(text) {
  const prev = document.activeElement;
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  try {
    ta.select();
    if (!document.execCommand("copy")) throw new Error("copy failed");
  } finally {
    ta.remove();
    prev?.focus?.({ preventScroll: true });
  }
}

async function copyText(text, successMessage, button) {
  let ok = true;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); }
      catch (e) { legacyCopy(text); }
    } else {
      legacyCopy(text);
    }
  } catch (err) {
    ok = false;
  }
  showToast(ok ? successMessage : "複製失敗，請手動選取文字複製");
  if (button) flashButton(button, ok ? "已複製" : "複製失敗");
}

/* 複製後在按鈕上也顯示結果，不只靠浮動提示 */
function flashButton(button, text) {
  const label = button.querySelector("[data-label]");
  if (!label) return;
  label.dataset.original ??= label.textContent;
  label.textContent = text;
  clearTimeout(button._flashTimer);
  button._flashTimer = setTimeout(() => { label.textContent = label.dataset.original; }, 2000);
}

/* Theme：<meta name="color-scheme"> 是唯一依據。沒存偏好＝跟系統。
   切換時選「目前看到的相反」；如果剛好等於系統設定，就清掉偏好回到跟系統。 */
const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
const schemeMeta = () => $('meta[name="color-scheme"]');
const systemTheme = () => (systemDark.matches ? "dark" : "light");
function renderedTheme() {
  const v = schemeMeta()?.content;
  return v === "light" || v === "dark" ? v : systemTheme();
}

function syncThemeUI() {
  const dark = renderedTheme() === "dark";
  $("#theme-toggle")?.setAttribute("aria-pressed", dark ? "true" : "false");
  $('meta[name="theme-color"]')?.setAttribute("content", dark ? "#141311" : "#eff0eb");
}

function setStoredTheme(value) {
  try {
    if (value) localStorage.setItem(STORAGE_THEME_KEY, value);
    else localStorage.removeItem(STORAGE_THEME_KEY);
  } catch (e) {}
  const meta = schemeMeta();
  if (meta) meta.content = value || "light dark";
  syncThemeUI();
}

function toggleTheme() {
  const target = renderedTheme() === "dark" ? "light" : "dark";
  setStoredTheme(target === systemTheme() ? null : target);
  const icon = $(target === "dark" ? "#theme-toggle .icon-moon" : "#theme-toggle .icon-sun");
  if (icon && motionOK()) {
    icon.animate([
      { transform: "rotate(-120deg) scale(0.3)", opacity: 0 },
      { transform: "rotate(12deg) scale(1.1)", opacity: 1, offset: 0.7 },
      { transform: "none", opacity: 1 }
    ], { duration: 520, easing: "cubic-bezier(.22,.74,.37,1)" });
  }
  showToast(target === "dark" ? "已切換為深色模式" : "已切換為淺色模式");
}

function initTheme() {
  syncThemeUI();
  $("#theme-toggle")?.addEventListener("click", toggleTheme);
  // 其他分頁改了主題就跟著變；系統切換深淺色時更新按鈕狀態（CSS 會自己跟上）
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_THEME_KEY) return;
    const meta = schemeMeta();
    if (meta) meta.content = e.newValue === "light" || e.newValue === "dark" ? e.newValue : "light dark";
    syncThemeUI();
  });
  systemDark.addEventListener("change", syncThemeUI);
}

/* 台北時間 */
function startTaipeiClock() {
  const el = $("#taipei-clock");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"
  });
  const tick = () => {
    const now = new Date();
    el.textContent = fmt.format(now);
    el.setAttribute("datetime", now.toISOString());
  };
  tick();
  setInterval(tick, 1000);
}

/* Vibe 靈感機 */
function renderIdea(index, animate = false) {
  const idea = VIBE_IDEAS[index];
  if (!idea) return;
  const sheet = $("#vibe-content");
  const apply = () => {
    $("#vibe-title").textContent = idea.title;
    $("#vibe-desc").textContent = idea.description;
    $("#vibe-prompt").textContent = idea.prompt;
    $("#vibe-time").textContent = idea.time;
    const count = $("#vibe-count");
    if (count) count.textContent = `No. ${String(index + 1).padStart(2, "0")} / ${String(VIBE_IDEAS.length).padStart(2, "0")}`;
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && sheet && !reduce) {
    sheet.classList.add("is-swapping");
    setTimeout(() => {
      apply();
      requestAnimationFrame(() => sheet.classList.remove("is-swapping"));
    }, 220);
  } else {
    apply();
  }
}

function rollNextIdea(animate = true) {
  if (VIBE_IDEAS.length === 0) return;
  let next = Math.floor(Math.random() * VIBE_IDEAS.length);
  if (VIBE_IDEAS.length > 1 && next === currentIdeaIndex) next = (next + 1) % VIBE_IDEAS.length;
  currentIdeaIndex = next;
  renderIdea(currentIdeaIndex, animate);
}

function initVibeMachine() {
  rollNextIdea(false);
  $("#vibe-next-btn")?.addEventListener("click", () => rollNextIdea(true));
  $("#vibe-copy-btn")?.addEventListener("click", () => {
    const idea = VIBE_IDEAS[currentIdeaIndex];
    if (idea) copyText(idea.prompt, "已複製起手式 Prompt，去貼給 Claude 吧！", $("#vibe-copy-btn"));
  });
}

/* AI 作品實驗室 */
const matchesFilter = (p, filter) => filter === "all" || p.category === filter || p.status === filter;

function renderProjects(filter = "all") {
  const list = $("#projects-list");
  if (!list) return;
  list.replaceChildren();
  const items = PROJECTS.filter((p) => matchesFilter(p, filter));

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.className = "projects-empty";
    empty.textContent = "這個分類目前還沒有作品，敬請期待。";
    list.appendChild(empty);
    return;
  }

  items.forEach((p) => {
    const li = document.createElement("li");
    li.className = "project";
    const external = isExternal(p.href);
    li.innerHTML = `
      <a class="project-link" href="">
        <div class="project-head">
          <h3 class="project-name"></h3>
          <div class="project-meta">
            <span class="project-cat"></span>
            <span class="status ${p.status === "live" ? "status-live" : "status-wip"}"></span>
          </div>
        </div>
        <div class="project-body">
          <p class="project-desc"></p>
          <div class="project-tags"></div>
        </div>
        <span class="project-cta">
          <span class="project-cta-label"></span>
          <svg class="icon" aria-hidden="true"><use href="${external ? "#i-arrow-out" : "#i-arrow"}"/></svg>
        </span>
      </a>`;
    const a = li.querySelector("a");
    a.setAttribute("href", p.href);
    if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    li.querySelector(".project-name").textContent = p.title;
    li.querySelector(".project-cat").textContent = p.categoryLabel;
    li.querySelector(".status").textContent = p.statusLabel;
    li.querySelector(".project-desc").textContent = p.description;
    li.querySelector(".project-cta-label").textContent = p.actionLabel;
    const tags = li.querySelector(".project-tags");
    p.tags.forEach((t) => {
      const s = document.createElement("span");
      s.textContent = t;
      tags.appendChild(s);
    });
    list.appendChild(li);
  });
}

function initLabFilters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const f = el.getAttribute("data-count");
    el.textContent = PROJECTS.filter((p) => matchesFilter(p, f)).length;
  });
  renderProjects("all");

  const buttons = [...document.querySelectorAll(".filter")];
  const thumb = createElasticThumb($(".filters"));
  thumb.moveTo(buttons.find((b) => b.getAttribute("aria-pressed") === "true"), false);
  const select = (btn) => {
    thumb.moveTo(btn);
    buttons.forEach((b) => b.setAttribute("aria-pressed", b === btn ? "true" : "false"));
    renderProjects(btn.getAttribute("data-filter") || "all");
  };
  buttons.forEach((btn) => btn.addEventListener("click", () => select(btn)));
}

/* 聯絡 */
function initContact() {
  $("#copy-email-btn")?.addEventListener("click", () => {
    copyText(SITE_CONFIG.email, `已複製信箱：${SITE_CONFIG.email}`, $("#copy-email-btn"));
  });
}

/* 快速指令（Ctrl+K / ⌘K） */
function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function getCommands() {
  const base = [
    { title: "前往：關於我", meta: "導覽", keywords: "about 關於 我 工具", run: () => scrollToId("about") },
    { title: "前往：Vibe 靈感機", meta: "導覽", keywords: "vibe idea 靈感 玩具", run: () => scrollToId("vibe-card") },
    { title: "前往：AI 作品實驗室", meta: "導覽", keywords: "lab 實驗室 作品 projects", run: () => scrollToId("lab") },
    { title: "前往：聯絡方式", meta: "導覽", keywords: "contact 聯絡 email", run: () => scrollToId("contact") },
    { title: "切換淺色／深色外觀", meta: "外觀", keywords: "theme dark light 深色 淺色 主題", run: toggleTheme },
    {
      title: "Vibe 靈感機：抽一個新點子", meta: "互動", keywords: "vibe idea 靈感 抽 random",
      run: () => { scrollToId("vibe-card"); rollNextIdea(true); }
    },
    {
      title: `複製信箱（${SITE_CONFIG.email}）`, meta: "複製", keywords: "copy email 信箱 郵件",
      run: () => copyText(SITE_CONFIG.email, `已複製信箱：${SITE_CONFIG.email}`)
    },
    {
      title: "開啟 GitHub 個人頁", meta: "外部連結", keywords: "github repo code",
      run: () => window.open(SITE_CONFIG.githubUrl, "_blank", "noopener,noreferrer")
    }
  ];
  const projects = PROJECTS.map((p) => ({
    title: `作品：${p.title}`,
    meta: p.categoryLabel,
    keywords: `${p.title} ${p.tags.join(" ")} ${p.categoryLabel}`,
    run: () => {
      if (isExternal(p.href)) window.open(p.href, "_blank", "noopener,noreferrer");
      else document.querySelector(p.href)?.scrollIntoView({ behavior: "smooth" });
    }
  }));
  return [...base, ...projects];
}

/* 進出 top layer 的關閉動畫：支援 overlay/display 過渡就直接 close()，
   不支援（Firefox、Safari）就先加 data-closing 播完再關 */
let supportsDisplayTransition;
function canTransitionDisplay() {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) return false;
  const probe = document.createElement("div");
  probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}
const supportsTopLayerExit = () => window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay();

async function closeTopLayer(el) {
  if (!supportsTopLayerExit()) {
    el.setAttribute("data-closing", "");
    const animations = el.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((r) => setTimeout(r, 2000))
      ]);
    }
    if (!el.hasAttribute("data-closing")) return;
    el.removeAttribute("data-closing");
  }
  el.close();
}

function initSpotlight() {
  const dialog = $("#spotlight");
  const input = $("#spotlight-input");
  const list = $("#spotlight-list");
  if (!dialog || !input || !list) return;

  let results = [];
  let selected = 0;

  const close = () => (dialog.open ? closeTopLayer(dialog) : Promise.resolve());

  const render = (query = "") => {
    const q = query.trim().toLowerCase();
    const all = getCommands();
    results = q
      ? all.filter((c) => `${c.title} ${c.meta} ${c.keywords}`.toLowerCase().includes(q))
      : all;
    selected = 0;
    list.replaceChildren();

    if (results.length === 0) {
      const li = document.createElement("li");
      li.className = "spotlight-empty";
      li.textContent = `找不到「${query.trim()}」相關的項目，試試「作品」或「深色」。`;
      list.appendChild(li);
      input.removeAttribute("aria-activedescendant");
      return;
    }

    results.forEach((cmd, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "presentation");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = `sp-opt-${i}`;
      btn.className = "spotlight-item";
      btn.setAttribute("role", "option");
      btn.tabIndex = -1;
      const t = document.createElement("span");
      t.textContent = cmd.title;
      const m = document.createElement("span");
      m.className = "spotlight-item-meta";
      m.textContent = cmd.meta;
      btn.append(t, m);
      btn.addEventListener("click", () => run(i));
      btn.addEventListener("mousemove", () => { if (selected !== i) highlight(i); });
      li.appendChild(btn);
      list.appendChild(li);
    });
    highlight(0);
  };

  const highlight = (i) => {
    const items = list.querySelectorAll(".spotlight-item");
    if (!items.length) return;
    selected = (i + items.length) % items.length;
    items.forEach((el, idx) => {
      const on = idx === selected;
      el.classList.toggle("is-selected", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
      if (on) el.scrollIntoView({ block: "nearest" });
    });
    input.setAttribute("aria-activedescendant", `sp-opt-${selected}`);
  };

  const run = async (i) => {
    const cmd = results[i];
    await close();
    if (cmd) cmd.run();
  };

  const open = () => {
    if (dialog.open) return;
    input.value = "";
    render("");
    dialog.showModal();
    input.focus();
  };

  $("#spotlight-trigger")?.addEventListener("click", open);
  $("#spotlight-close")?.addEventListener("click", close);
  // Esc 與點背景關閉都走同一個有動畫的關閉流程
  dialog.addEventListener("cancel", (e) => { e.preventDefault(); close(); });
  // 不支援 closedby="any" 的瀏覽器：點到對話框外面才關
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (e) => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
      if (!inside) close();
    });
  }
  input.addEventListener("input", () => render(input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); highlight(selected + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); highlight(selected - 1); }
    else if (e.key === "Enter") { e.preventDefault(); run(selected); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      dialog.open ? close() : open();
    }
  });
}

/* 頂欄貼住頂端時出現分隔線：支援 scroll-state 查詢的瀏覽器用 CSS，其他用 JS 補 */
function initMasthead() {
  const bar = $(".masthead");
  if (!bar || CSS.supports("container-type", "scroll-state")) return;
  const update = () => bar.classList.toggle("is-stuck", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* 導覽列：標出目前所在的區塊 */
function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav [data-spy]")];
  const sections = links.map((a) => document.getElementById(a.dataset.spy)).filter(Boolean);
  if (!sections.length) return;
  const thumb = createElasticThumb($(".nav"));
  let currentId;
  const setActive = (id) => {
    if (id === currentId) return;
    currentId = id;
    thumb.moveTo(links.find((a) => a.dataset.spy === id) || null);
    links.forEach((a) => {
      const on = a.dataset.spy === id;
      a.classList.toggle("is-current", on);
      if (on) {
        a.setAttribute("aria-current", "location");
        const nav = a.parentElement;
        if (nav.scrollWidth > nav.clientWidth) {
          nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
        }
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };
  // 以畫面 35% 高度的一條線判斷目前區塊；捲到底時算最後一個區塊
  const crossing = new Set();
  let atBottom = false;
  const update = () => {
    if (atBottom) return setActive(sections[sections.length - 1].id);
    const hit = sections.filter((sec) => crossing.has(sec));
    setActive(hit.length ? hit[hit.length - 1].id : null);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? crossing.add(e.target) : crossing.delete(e.target)));
    update();
  }, { rootMargin: "-35% 0px -64% 0px" });
  sections.forEach((sec) => io.observe(sec));
  const footer = $(".footer");
  if (footer) {
    new IntersectionObserver(([e]) => { atBottom = e.isIntersecting; update(); }, { threshold: 0.6 }).observe(footer);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initSiteBindings();
  initTheme();
  startTaipeiClock();
  initVibeMachine();
  initLabFilters();
  initContact();
  initSpotlight();
  initMasthead();
  initScrollSpy();
  initPressFeedback();
});
