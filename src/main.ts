import "./style.css";
// ---- 文字主题：取消注释其中一行即可切换 ----
// import "./themes/neon.css";           // 霓虹灯主题
// import "./themes/golden-engrave.css"; // 金色烫金主题
import "./themes/frost-glass.css";       // 冰霜玻璃主题（当前使用）
// -------------------------------------------
import { tsParticles, EventType } from "@tsparticles/engine";
import { setupEngine } from "./engine-setup";
import { getFireworksWithNamesConfig } from "./configs";
import { initAudio, playExplosion } from "./audio";

// ============================================================
// 自定义配置 —— 修改这里来定制你的祝福页面
// ============================================================

/** 要依次浮现的名字列表（每次加载自动随机打乱顺序） */
const NAMES = [
  "纯情旭", "纯情福", "纯情邹", "纯情毛", "纯情蒲",
  "纯情熙", "纯情老白菜", "纯情屹", "纯情垚", "纯情臭",
  "纯情小白菜", "纯情王", "纯情宝", "纯情姐姐",
].sort(() => Math.random() - 0.5);

/** 所有名字播完后显示的总祝福语 */
const FINAL_BLESSING = "联合国の纯情家族，马年大吉！🐴\n初中的我们早已各奔东西，但友谊永远不散场！";

/** 名字播放过程中底部轮播的祝福语 */
const BLESSINGS = [
  "马年冲冲冲，一马当先全都行！🐎",
  "马到成功，搞钱搞事业统统拿下！💰",
  "万马奔腾的一年，纯情家族永远young！🔥",
  "愿我们二十几岁的日子，wild & free 🏄‍♂️",
  "友谊万岁，联合国永不解散！✊",
];

/** 底部祝福语切换间隔（毫秒） */
const BLESSING_INTERVAL = 3500;
/** 名字出现间隔（毫秒） */
const NAME_INTERVAL = 1500;

// ============================================================
// 应用状态
// ============================================================

const containerId = "tsparticles";
let currentBlessingIndex = 0;
let currentNameIndex = 0;
let engineReady = false;
let blessingTimer: ReturnType<typeof setInterval> | null = null;

// ============================================================
// DOM 元素
// ============================================================

const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const blessingEl = document.getElementById("blessing-text") as HTMLDivElement;
const namesOverlay = document.getElementById("names-overlay") as HTMLDivElement;

// ============================================================
// 引擎预初始化（在用户点击之前）
// ============================================================

setupEngine(tsParticles).then(() => {
  engineReady = true;
});

// ============================================================
// 流程控制
// ============================================================

async function startShow(): Promise<void> {
  startBtn.classList.add("hidden");

  // 优先在点击手势内同步创建 AudioContext，规避浏览器 autoplay 限制
  const audioReady = initAudio();

  if (!engineReady) {
    await setupEngine(tsParticles);
  }

  // 等待音频缓冲区加载完成
  await audioReady;

  // 加载烟花粒子配置
  const config = getFireworksWithNamesConfig();

  await tsParticles.load({
    id: containerId,
    options: config,
  });

  // 监听烟花爆炸事件并播放音效
  tsParticles.addEventListener(EventType.particleRemoved, (args: any) => {
    const data = args?.data as { particle: any } | undefined;
    if (
      data?.particle?.shape === "circle" &&
      data.particle.splitCount !== undefined &&
      data.particle.splitCount < 2 &&
      data.particle.splitCount >= 1
    ) {
      playExplosion();
    }
  });

  // 开始依次展示名字
  startNameCycle();

  // 延迟后开始底部祝福语轮播
  setTimeout(() => startBlessingCycle(), 1500);
}

// ============================================================
// 名字展示
// ============================================================

/** 名字随机配色 */
const NAME_COLORS = [
  "#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93",
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff8fab",
  "#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8",
];

/** 启动名字循环展示 */
function startNameCycle(): void {
  showName(NAMES[currentNameIndex]);

  const timer = setInterval(() => {
    currentNameIndex++;

    if (currentNameIndex >= NAMES.length) {
      clearInterval(timer);
      // 等最后一个名字淡出后进入最终画面
      setTimeout(() => showFinalScreen(), NAME_INTERVAL - 200);
      return;
    }

    showName(NAMES[currentNameIndex]);
  }, NAME_INTERVAL);
}

/** 在屏幕随机位置显示一个名字，短暂停留后淡出 */
function showName(name: string): void {
  const el = document.createElement("div");
  el.className = "floating-name";
  el.textContent = name;
  el.setAttribute("data-text", name);

  // 随机位置、颜色、字号
  const x = 10 + Math.random() * 70;
  const y = 8 + Math.random() * 50;

  const color = NAME_COLORS[Math.floor(Math.random() * NAME_COLORS.length)];
  const fontSize = 28 + Math.random() * 36;

  el.style.left = `${x}%`;
  el.style.top = `${y}%`;
  el.style.color = color;
  el.style.fontSize = `${fontSize}px`;

  namesOverlay.appendChild(el);

  requestAnimationFrame(() => {
    el.classList.add("visible");
  });

  // 停留 40% 时长后淡出，淡出动画占 50% 时长
  const visibleDuration = Math.max(NAME_INTERVAL * 0.4, 200);
  const fadeOutDuration = Math.min(NAME_INTERVAL * 0.5, 1200);
  el.style.setProperty("--fade-duration", `${fadeOutDuration}ms`);

  setTimeout(() => {
    el.classList.add("fade-out");
    setTimeout(() => el.remove(), fadeOutDuration);
  }, visibleDuration);
}

// ============================================================
// 最终画面：所有名字整齐排列 + 总祝福语
// ============================================================

function showFinalScreen(): void {
  // 停止祝福语轮播
  if (blessingTimer) {
    clearInterval(blessingTimer);
    blessingTimer = null;
  }
  blessingEl.classList.remove("visible");
  blessingEl.classList.add("fade-out");

  // 清除残留的浮动名字
  namesOverlay.innerHTML = "";

  // 创建最终画面容器
  const finalEl = document.createElement("div");
  finalEl.id = "final-screen";
  namesOverlay.appendChild(finalEl);

  // 逐个添加名字，带交错入场动画
  NAMES.forEach((name, i) => {
    const el = document.createElement("span");
    el.className = "final-name";
    el.textContent = name;
    el.setAttribute("data-text", name);

    const color = NAME_COLORS[i % NAME_COLORS.length];
    el.style.color = color;
    el.style.animationDelay = `${i * 0.15}s`;

    finalEl.appendChild(el);
  });

  // 在名字下方添加总祝福语
  const blessingFinalEl = document.createElement("div");
  blessingFinalEl.id = "final-blessing";
  blessingFinalEl.textContent = FINAL_BLESSING;
  blessingFinalEl.style.animationDelay = `${NAMES.length * 0.15 + 0.5}s`;
  finalEl.appendChild(blessingFinalEl);
}

// ============================================================
// 祝福语轮播
// ============================================================

/** 启动底部祝福语轮播 */
function startBlessingCycle(): void {
  showBlessing(BLESSINGS[0]);

  blessingTimer = setInterval(() => {
    currentBlessingIndex = (currentBlessingIndex + 1) % BLESSINGS.length;

    blessingEl.classList.remove("visible");
    blessingEl.classList.add("fade-out");

    setTimeout(() => {
      showBlessing(BLESSINGS[currentBlessingIndex]);
    }, 600);
  }, BLESSING_INTERVAL);
}

/** 显示一条祝福语 */
function showBlessing(text: string): void {
  blessingEl.textContent = text;
  blessingEl.classList.remove("hidden", "fade-out");
  void blessingEl.offsetWidth; // 强制重排以重新触发过渡动画
  blessingEl.classList.add("visible");
}

// ============================================================
// 事件监听
// ============================================================

startBtn.addEventListener("click", () => {
  startShow();
});
