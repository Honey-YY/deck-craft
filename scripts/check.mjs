#!/usr/bin/env node
/**
 * deck-craft · 自检
 *
 *   node scripts/check.mjs ./我的演示稿
 *
 * 有问题退出码 1，全绿退出码 0。
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const LAYOUTS = ['cover', 'agenda', 'section', 'bullets', 'columns', 'cards',
  'stat', 'chart', 'timeline', 'quote', 'table', 'image', 'process', 'end'];
const THEMES = ['violet', 'obsidian', 'aurora', 'paper', 'fjord', 'moss', 'clay', 'ink', 'nebula', 'graphite'];
const SPECIAL_SINGLE = ['cover', 'end'];   // 只应出现一次、可以没有标题的版式
const NO_TITLE = ['cover', 'section', 'quote', 'end', 'image']; // 标题可能不是 h1/h2 的版式

const errors = [];
const warns = [];
const ok = [];

const strip = s => s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const err = m => errors.push(m);
const warn = m => warns.push(m);

const arg = process.argv[2] || '.';
const dir = path.resolve(process.cwd(), arg);
const file = path.join(dir, 'index.html');

let html;
try {
  html = await fs.readFile(file, 'utf8');
} catch {
  console.error(`找不到 ${path.relative(process.cwd(), file)}`);
  console.error('先在目标目录里跑 node scripts/new.mjs <名字>');
  process.exit(1);
}
// 编辑器可能写入 BOM，先剥掉，否则第一个标签会解析失败
html = html.replace(/^\uFEFF/, '');

// --- 1. 主题 ---------------------------------------------------------------
const themeM = html.match(/<html[^>]*data-theme="([^"]+)"/);
if (!themeM) err('缺 <html data-theme="...">，整份稿子会没有配色');
else if (!THEMES.includes(themeM[1])) err(`主题 "${themeM[1]}" 不存在。可用：${THEMES.join(', ')}`);
else ok.push(`主题 ${themeM[1]}`);

// --- 2. 页面 ---------------------------------------------------------------
// 先剥掉内联的 style/script，否则 CSS 注释里的示例标签会被当成真实页面
const markup = html
  .replace(/<style>[\s\S]*?<\/style>/g, '')
  .replace(/<script>[\s\S]*?<\/script>/g, '');

const slideRe = /<section\b[^>]*class="([^"]*\bslide\b[^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
const slides = [];
let m;
while ((m = slideRe.exec(markup))) {
  const cls = m[1].split(/\s+/).filter(Boolean);
  const layout = cls.find(c => LAYOUTS.includes(c)) || null;
  slides.push({ cls, layout, body: m[2], raw: m[0] });
}

if (!slides.length) {
  err('一页都没有。找 <section class="slide 版式">');
  report();
}

const n = slides.length;
if (n < 3) warn(`只有 ${n} 页，演示稿通常 8 页以上`);
if (n > 30) err(`${n} 页，超过 30 页上限——应该拆成两份稿子`);
ok.push(`共 ${n} 页`);

// --- 3. 逐页检查 -----------------------------------------------------------
const layoutUse = {};
let onCount = 0;

slides.forEach((s, idx) => {
  const no = String(idx + 1).padStart(2, '0');
  const tag = `第 ${no} 页`;

  if (!s.layout) {
    err(`${tag}：没有版式 class。class 里必须有一个：${LAYOUTS.join(' / ')}`);
    return;
  }
  layoutUse[s.layout] = (layoutUse[s.layout] || 0) + 1;

  if (s.cls.includes('on')) onCount++;

  // 页码
  const footM = s.body.match(/<div class="slide-foot">([\s\S]*?)<\/div>/);
  if (!footM) warn(`${tag}（${s.layout}）：缺 slide-foot 页脚`);
  else if (!/\d/.test(strip(footM[1]))) warn(`${tag}（${s.layout}）：页脚里没有页码`);

  // 标题
  const titleM = s.body.match(/<(h1|h2|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/);
  const title = titleM ? strip(titleM[2]) : '';
  if (!title) {
    if (!NO_TITLE.includes(s.layout)) err(`${tag}（${s.layout}）：没有标题元素 h1/h2/h3`);
  } else {
    const limit = titleM[1] === 'h1' ? 22 : 28;
    if (title.length > limit) warn(`${tag}：标题 ${title.length} 字，超过 ${limit} 字可能折行溢出 —— 「${title.slice(0, 20)}…」`);
    // 分类名检测
    if (/^(市场分析|产品规划|竞争格局|下一步|背景介绍|现状分析|总结|目录)$/.test(title)) {
      warn(`${tag}：标题「${title}」像分类名。改成一个观点句。`);
    }
  }

  // data-n
  if (s.layout === 'cards' && !/data-n="(3|4|6)"/.test(s.raw)) err(`${tag}：cards 需要 data-n="3|4|6"`);
  if (s.layout === 'stat' && !/data-n="(1|2|3)"/.test(s.raw)) err(`${tag}：stat 需要 data-n="1|2|3"`);

  // 卡片数量与 data-n 是否一致
  if (s.layout === 'cards') {
    const dn = s.raw.match(/data-n="(\d)"/);
    const cnt = (s.body.match(/<div class="c">/g) || []).length;
    if (dn && cnt && Number(dn[1]) !== cnt) err(`${tag}：data-n="${dn[1]}" 但实际有 ${cnt} 张卡片`);
  }
  if (s.layout === 'stat') {
    const dn = s.raw.match(/data-n="(\d)"/);
    const cnt = (s.body.match(/<div class="s">/g) || []).length;
    if (dn && cnt && Number(dn[1]) !== cnt) err(`${tag}：data-n="${dn[1]}" 但实际有 ${cnt} 个数字`);
  }

  // 正文过密
  const paras = [...s.body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(x => strip(x[1]));
  const longP = paras.filter(p => p.length > 90);
  if (longP.length) warn(`${tag}：有 ${longP.length} 段正文超过 90 字，考虑拆页或删减`);
});

// --- 4. 全局检查 -----------------------------------------------------------
if (onCount !== 1) err(`拿 on 类的页有 ${onCount} 个，应该正好 1 个（第一页）`);

for (const l of SPECIAL_SINGLE) {
  if ((layoutUse[l] || 0) > 1) warn(`「${l}」出现 ${layoutUse[l]} 次，通常一份稿子只用一次`);
}

// 连续三页同版式
for (let i = 2; i < slides.length; i++) {
  const a = slides[i - 2].layout, b = slides[i - 1].layout, c = slides[i].layout;
  if (a && a === b && b === c) warn(`第 ${i - 1}–${i + 1} 页连续三页都是 ${a}，节奏会塌`);
}

// 占位符残留
const placeholders = [
  [/\{\{[A-Z_]+\}\}/, '模板占位符 {{...}}'],
  [/<!--\s*TODO/i, 'TODO 注释'],
  [/Lorem ipsum/i, 'Lorem ipsum'],
  [/待填|待补充|XXXX/i, '待填占位'],
];
for (const [re, label] of placeholders) {
  if (re.test(html)) err(`还有${label}没替换`);
}

// 外链图
if (/<img[^>]+src="https?:\/\//.test(html)) {
  warn('有外链图片。单文件交付时会加载失败，改成相对路径或 data URI');
}

// CSS/JS 是否就位（未打包时）
for (const dep of ['themes.css', 'layouts.css', 'player.js']) {
  const re = new RegExp(`(href|src)="${dep.replace('.', '\\.')}"`);
  if (re.test(html)) {
    try { await fs.access(path.join(dir, dep)); }
    catch { err(`引用了 ${dep} 但目录里没有这个文件`); }
  }
}

// 页脚总页码与真实页数
const lastFoot = slides[n - 1]?.body.match(/<div class="slide-foot">([\s\S]*?)<\/div>/);
if (lastFoot) {
  const nums = strip(lastFoot[1]).match(/(\d+)\s*\/\s*(\d+)/);
  if (nums && Number(nums[2]) !== n) warn(`最后一页写的是 ${nums[1]}/${nums[2]}，实际 ${n} 页`);
}

report();

// ---------------------------------------------------------------------------
function report() {
  const line = '─'.repeat(52);

  if (ok.length) {
    console.log('\n通过');
    for (const s of ok) console.log(`  ✓ ${s}`);
  }
  if (warns.length) {
    console.log('\n提醒');
    for (const s of warns) console.log(`  ! ${s}`);
  }
  if (errors.length) {
    console.log('\n必须修');
    for (const s of errors) console.log(`  ✗ ${s}`);
  }

  if (!warns.length && !errors.length) {
    console.log(`\n${line}\n全绿。可以打包：node scripts/build.mjs ${arg}`);
    process.exit(0);
  }
  if (errors.length) {
    console.log(`\n${line}\n${errors.length} 个错误${warns.length ? `，${warns.length} 个提醒` : ''}。改完再跑。`);
    process.exit(1);
  }
  console.log(`\n${line}\n${warns.length} 个提醒，没有阻塞问题。确认无误即可打包。`);
  process.exit(0);
}
