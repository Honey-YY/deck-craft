#!/usr/bin/env node
/**
 * deck-craft · 新建
 *
 *   node scripts/new.mjs 我的演示稿
 *   node scripts/new.mjs 我的演示稿 --theme obsidian --title "2026 年度规划"
 *
 * 产物：<目录>/index.html + themes.css + layouts.css + player.js
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(HERE, '..', 'assets');

const THEMES = ['violet', 'obsidian', 'aurora', 'paper', 'fjord', 'moss', 'clay', 'ink', 'nebula', 'graphite'];

function parseArgs(argv) {
  const out = { dir: '', theme: 'violet', title: '', brand: '', eyebrow: 'Deck Craft' };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--theme') out.theme = argv[++i];
    else if (a === '--title') out.title = argv[++i];
    else if (a === '--brand') out.brand = argv[++i];
    else if (a === '--eyebrow') out.eyebrow = argv[++i];
    else if (a.startsWith('--')) { /* 忽略未知参数 */ }
    else rest.push(a);
  }
  out.dir = rest[0] || 'deck';
  return out;
}

const args = parseArgs(process.argv.slice(2));

if (!THEMES.includes(args.theme)) {
  console.error(`未知主题 "${args.theme}"。可用：${THEMES.join(', ')}`);
  process.exit(1);
}

const target = path.resolve(process.cwd(), args.dir);
const today = new Date().toISOString().slice(0, 10);

await fs.mkdir(target, { recursive: true });

for (const f of ['themes.css', 'layouts.css', 'player.js']) {
  await fs.copyFile(path.join(ASSETS, f), path.join(target, f));
}

const title = args.title || path.basename(target);
const brand = args.brand || 'Deck Craft';

let html = await fs.readFile(path.join(ASSETS, 'skeleton.html'), 'utf8');
html = html
  .replace('data-theme="violet"', `data-theme="${args.theme}"`)
  .replaceAll('{{TITLE}}', title)
  .replaceAll('{{EYEBROW}}', args.eyebrow)
  .replaceAll('{{H1}}', title)
  .replaceAll('{{LEAD}}', '一句话说清这份稿子要给谁解决什么问题')
  .replaceAll('{{SUBEN}}', 'SUBTITLE IN ENGLISH')
  .replaceAll('{{DESC}}', 'Two lines of context. Who this is for,<br>and what decision it should drive.')
  .replaceAll('{{DATE}}', today)
  .replaceAll('{{PAGES}}', '1')
  .replaceAll('{{BRAND}}', brand);

await fs.writeFile(path.join(target, 'index.html'), html, 'utf8');

console.log(`已创建 ${path.relative(process.cwd(), target)}/`);
console.log(`  index.html     ← 在这里写页面`);
console.log(`  themes.css / layouts.css / player.js`);
console.log('');
console.log(`主题：${args.theme}`);
console.log(`打开：${path.join(path.relative(process.cwd(), target), 'index.html')}`);
console.log('');
console.log('下一步：把 assets/deck.html 里需要的 <section> 整段复制过来，替换文字。');
