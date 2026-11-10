#!/usr/bin/env node
/**
 * deck-craft · 打包
 *
 *   node scripts/build.mjs ./我的演示稿
 *
 * 把 themes.css / layouts.css / player.js 内联进 index.html，
 * 产出 dist/deck.html —— 单文件，双击就能放。
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const arg = process.argv[2] || '.';
const dir = path.resolve(process.cwd(), arg);
const srcFile = path.join(dir, 'index.html');

let html;
try {
  html = await fs.readFile(srcFile, 'utf8');
} catch {
  console.error(`找不到 ${path.relative(process.cwd(), srcFile)}`);
  process.exit(1);
}

const read = async f => {
  try { return await fs.readFile(path.join(dir, f), 'utf8'); }
  catch { return null; }
};

const themes = await read('themes.css');
const layouts = await read('layouts.css');
const player = await read('player.js');

if (!themes || !layouts || !player) {
  const missing = [['themes.css', themes], ['layouts.css', layouts], ['player.js', player]]
    .filter(([, v]) => !v).map(([k]) => k);
  console.error(`缺文件：${missing.join(', ')}`);
  console.error('从 assets/ 拷过来，或重新跑 node scripts/new.mjs');
  process.exit(1);
}

let out = html;

// 内联样式
out = out.replace(
  /<link[^>]*href="themes\.css"[^>]*>/,
  `<style>\n${themes}\n</style>`,
);
out = out.replace(
  /<link[^>]*href="layouts\.css"[^>]*>/,
  `<style>\n${layouts}\n</style>`,
);

// 内联脚本（防止 CSS 里出现 </style> 之类的边界）
out = out.replace(
  /<script[^>]*src="player\.js"[^>]*><\/script>/,
  () => {
    const safe = player.replace(/<\/script/gi, '<\\/script');
    return `<script>\n${safe}\n</script>`;
  },
);

// 兜底：任何漏网的外部资源引用都报出来
const leftovers = [...out.matchAll(/(?:href|src)="(?!#|data:|https?:)([^"]+\.(?:css|js))"/g)]
  .map(m => m[1])
  .filter(f => !f.startsWith('http'));

if (leftovers.length) {
  console.error(`还有没内联的资源：${[...new Set(leftovers)].join(', ')}`);
  process.exit(1);
}

const distDir = path.join(dir, 'dist');
await fs.mkdir(distDir, { recursive: true });
const outFile = path.join(distDir, 'deck.html');
await fs.writeFile(outFile, out, 'utf8');

const kb = (Buffer.byteLength(out, 'utf8') / 1024).toFixed(1);
// 统计页数时先剥掉内联的 style/script，免得注释里的示例标签被算进去
const markup = out
  .replace(/<style>[\s\S]*?<\/style>/g, '')
  .replace(/<script>[\s\S]*?<\/script>/g, '');
const pages = (markup.match(/<section\b[^>]*class="slide[\s"]/g) || []).length;

console.log('');
console.log(`  ${path.relative(process.cwd(), outFile)}`);
console.log(`  ${pages} 页 · ${kb} KB · 单文件`);
console.log('');
console.log('  双击打开 → 方向键翻页 → F 全屏');
console.log('  要 PDF：Ctrl/Cmd + P → 另存为 PDF → 边距「无」→ 勾「背景图形」');
