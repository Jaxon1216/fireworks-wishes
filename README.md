# Fireworks Wishes 🎆

一个开箱即用的 **烟花祝福动画页面**，适用于各种场景——新年、生日、圣诞、跨年、节日庆祝等。打开页面 → 点击"开始" → 绚丽烟花满屏绽放 → 名字逐个浮现 → 最终所有名字排列在一起，配上你的祝福语。

> 基于 Vite + TypeScript + tsParticles 构建，纯前端项目，无需后端。

---

## 效果预览

1. 点击 **"点击开始"** 按钮
2. 背景持续放烟花（带爆炸音效）
3. 名字以随机位置、随机颜色、炫酷文字特效逐个浮现
4. 所有名字播完后，整齐排列在屏幕中央，弹出一句总祝福语
5. 烟花在全过程中持续播放

---

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 3456，自动打开浏览器）
npm run dev

# 构建生产版本到 dist/
npm run build

# 预览构建产物
npm run preview
```

---

## 如何自定义你的祝福

**所有需要修改的内容都集中在 `src/main.ts` 文件顶部**，非常容易找到和修改：

### 1. 修改名字列表

```typescript
const NAMES = [
  "张三", "李四", "王五", "赵六",
  // 在这里添加或修改名字，数量不限
].sort(() => Math.random() - 0.5); // 每次加载自动随机排序
```

### 2. 修改总祝福语

```typescript
const FINAL_BLESSING = "生日快乐！\n愿你天天开心！";
```

### 3. 修改过程中的轮播祝福语

```typescript
const BLESSINGS = [
  "生日快乐，幸福满满！",
  "愿每一天都充满阳光！",
  "快乐永远伴随你！",
];
```

### 4. 调节动画节奏

| 变量               | 作用                    | 默认值   |
| ------------------ | ----------------------- | -------- |
| `NAME_INTERVAL`    | 名字出现间隔（毫秒）   | `1500`   |
| `BLESSING_INTERVAL`| 底部祝福切换间隔（毫秒）| `3500`   |

### 5. 切换文字主题

在 `src/main.ts` 顶部的 import 区域，注释/取消注释即可切换三种风格：

```typescript
// import "./themes/neon.css";           // 霓虹灯主题
// import "./themes/golden-engrave.css"; // 金色烫金主题
import "./themes/frost-glass.css";       // 冰霜玻璃主题（当前使用）
```

| 主题文件                   | 风格       | 效果描述                           |
| -------------------------- | ---------- | ---------------------------------- |
| `frost-glass.css`          | 冰霜玻璃   | 半透明磨砂质感 + 冰蓝色光晕 + 结霜微粒 |
| `neon.css`                 | 霓虹灯     | 霓虹管发光 + 地面倒影 + 呼吸闪烁       |
| `golden-engrave.css`       | 金色烫金   | 金色渐变 + 金属浮雕边 + 金箔光泽       |

### 6. 修改页面标题

在 `index.html` 中修改 `<title>` 标签：

```html
<title>Happy Birthday!</title>
```

### 7. 修改按钮文字

在 `index.html` 中修改按钮文案：

```html
<button id="start-btn">点击开始</button>
```

---

## 项目结构

```
fireworks-wishes/
├── index.html              # 入口 HTML
├── package.json            # 项目依赖
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
└── src/
    ├── main.ts             # 🎯 主控文件（名字、祝福语、动画流程都在这里改）
    ├── engine-setup.ts     # tsParticles 引擎初始化 + 插件加载
    ├── configs.ts          # 烟花粒子效果参数配置
    ├── audio.ts            # 音效管理（爆炸音效播放）
    ├── style.css           # 全局样式 + 动画
    └── themes/             # 文字主题样式
        ├── frost-glass.css     # 冰霜玻璃（默认）
        ├── neon.css            # 霓虹灯
        └── golden-engrave.css  # 金色烫金
```

---

## 技术栈

| 技术                 | 版本    | 用途                     |
| -------------------- | ------- | ------------------------ |
| Vite                 | 6.x     | 构建工具 + 开发服务器    |
| TypeScript           | 5.x     | 类型安全                 |
| tsParticles          | 3.9.x   | 烟花粒子引擎            |

---

## 音效说明

音效不依赖 tsParticles 的内置 sounds 插件，而是通过 `src/audio.ts` 自行管理 `AudioContext`。这样做的好处是在用户点击"开始"按钮时同步创建音频上下文，规避浏览器的 autoplay 限制，确保首次点击就能听到声音。音频文件从 `https://particles.js.org/audio/` 远程加载，项目本身不包含本地音频文件。

---

## 部署

构建产物为纯静态文件，可以部署到任何静态托管服务：

```bash
npm run build
# 将 dist/ 目录部署到 GitHub Pages / Vercel / Netlify / 任何静态服务器
```

---

## License

MIT
