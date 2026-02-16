# Fireworks Wishes 🎆

English | [中文](./README.md)

A ready-to-use **fireworks blessing animation page** for any occasion — New Year, birthdays, Christmas, holidays, and more. Open the page → click "Start" → stunning fireworks fill the sky → names appear one by one → finally all names line up with a blessing message.

> Built with Vite + TypeScript + tsParticles. Pure frontend, no backend needed.

**Live Demo**: [https://wishes.jiangxu.net/](https://wishes.jiangxu.net/)

---

## Preview

1. Click the **"Start"** button
2. Fireworks launch continuously with explosion sound effects
3. Names float in at random positions with random colors and stylish text effects
4. After all names are shown, they arrange neatly at the center with a final blessing
5. Fireworks keep playing throughout the entire show

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (default port 3456, auto-opens browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Customization

**Everything you need to change is at the top of `src/main.ts`** — easy to find and modify:

### 1. Names List

```typescript
const NAMES = [
  "Alice", "Bob", "Charlie", "Diana",
  // Add or remove names as you like
].sort(() => Math.random() - 0.5); // Shuffled on each page load
```

### 2. Final Blessing

```typescript
const FINAL_BLESSING = "Happy Birthday!\nWishing you all the best!";
```

### 3. Rotating Blessings

```typescript
const BLESSINGS = [
  "Happy Birthday! 🎂",
  "May all your dreams come true!",
  "Best wishes to you!",
];
```

### 4. Animation Timing

| Variable            | Purpose                         | Default  |
| ------------------- | ------------------------------- | -------- |
| `NAME_INTERVAL`     | Delay between names (ms)        | `1500`   |
| `BLESSING_INTERVAL` | Blessing rotation interval (ms) | `3500`   |

### 5. Text Themes

Toggle themes by commenting/uncommenting imports at the top of `src/main.ts`:

```typescript
// import "./themes/neon.css";           // Neon sign theme
// import "./themes/golden-engrave.css"; // Golden engrave theme
import "./themes/frost-glass.css";       // Frost glass theme (active)
```

| Theme File              | Style          | Description                                |
| ----------------------- | -------------- | ------------------------------------------ |
| `frost-glass.css`       | Frost Glass    | Frosted glass texture + icy blue glow      |
| `neon.css`              | Neon Sign      | Neon tube glow + reflection + breathing    |
| `golden-engrave.css`    | Golden Engrave | Gold gradient + metallic emboss + shimmer  |

### 6. Page Title

Edit the `<title>` tag in `index.html`:

```html
<title>Happy Birthday!</title>
```

### 7. Button Text

Edit the button text in `index.html`:

```html
<button id="start-btn">Click to Start</button>
```

---

## Project Structure

```
fireworks-wishes/
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── src/
    ├── main.ts             # 🎯 Main file (names, blessings, animation flow)
    ├── engine-setup.ts     # tsParticles engine init + plugin loading
    ├── configs.ts          # Fireworks particle config
    ├── audio.ts            # Audio manager (explosion sounds)
    ├── style.css           # Global styles + animations
    └── themes/             # Text theme styles
        ├── frost-glass.css     # Frost glass (default)
        ├── neon.css            # Neon sign
        └── golden-engrave.css  # Golden engrave
```

---

## Tech Stack

| Tech                 | Version | Purpose                  |
| -------------------- | ------- | ------------------------ |
| Vite                 | 6.x     | Build tool + dev server  |
| TypeScript           | 5.x     | Type safety              |
| tsParticles          | 3.9.x   | Fireworks particle engine|

---

## Audio

Audio is managed by a custom `AudioContext` in `src/audio.ts` instead of tsParticles' built-in sounds plugin. This ensures the `AudioContext` is created synchronously inside the user's click gesture, bypassing browser autoplay restrictions so sound plays on the very first click. Audio files are loaded remotely from `https://particles.js.org/audio/` — no local audio assets needed.

---

## Deployment

The build output is purely static and can be deployed anywhere:

```bash
npm run build
# Deploy dist/ to GitHub Pages / Vercel (recommended) / Netlify / any static host
```

---

## License

MIT
