/**
 * 自管理音频播放器。
 * 在用户手势（点击/触摸）内直接创建 AudioContext，确保首次交互即可播放音效。
 * 不使用 tsParticles 内置的 sounds 插件，以规避浏览器 autoplay 限制。
 */

/** 爆炸音效远程地址（无需本地音频资源） */
const EXPLOSION_URLS = [
  "https://particles.js.org/audio/explosion0.mp3",
  "https://particles.js.org/audio/explosion1.mp3",
  "https://particles.js.org/audio/explosion2.mp3",
];

let audioCtx: AudioContext | null = null;
let audioBuffers: AudioBuffer[] = [];
let ready = false;

/**
 * 初始化音频：必须在用户手势回调（click/touch）内调用。
 * 创建 AudioContext 并预加载所有爆炸音效文件。
 */
export async function initAudio(): Promise<void> {
  audioCtx = new AudioContext();
  await audioCtx.resume();

  const fetchPromises = EXPLOSION_URLS.map(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return null;
      const arrayBuffer = await response.arrayBuffer();
      return await audioCtx!.decodeAudioData(arrayBuffer);
    } catch {
      return null;
    }
  });

  const results = await Promise.all(fetchPromises);
  audioBuffers = results.filter((b): b is AudioBuffer => b !== null);
  ready = audioBuffers.length > 0;
}

/**
 * 随机播放一个爆炸音效。
 */
export function playExplosion(): void {
  if (!ready || !audioCtx || audioBuffers.length === 0) return;

  const buffer = audioBuffers[Math.floor(Math.random() * audioBuffers.length)];
  const source = audioCtx.createBufferSource();
  const gain = audioCtx.createGain();

  gain.gain.value = 0.5;
  gain.connect(audioCtx.destination);

  source.buffer = buffer;
  source.connect(gain);
  source.start();
}
