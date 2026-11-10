# 设计手法库

从 aippt 96 个行业模板的 1255 页真实成品里提取。这些是让页面"看起来是设计师做的"的具体手法，不是形容词。

写版式时逐条对照——一页至少用 6 条，否则就是素的。

---

## 1. 巨型背景字

把页面的主题词放到 200–260px，透明度压到 0.10–0.15，当装饰而不是信息。

```css
.bg-word {
  position: absolute;
  right: 52px; top: 36px;
  font-size: 220px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -8px;
  color: rgba(255,255,255,.13);   /* 深底用白，浅底用主色 */
  pointer-events: none;
}
```

用在：`stat` 右上角放季度、`section` 放章节号、`cover` 放年份。

---

## 2. 两端渐隐的分割线

不要用 1px 实线。线要有"呼吸"。

```css
.divider {
  width: 2px;
  height: 230px;
  background: linear-gradient(180deg,
    transparent 0%,
    var(--accent) 20%,
    var(--accent) 80%,
    transparent 100%);
  opacity: .55;
}
```

横向版把 `180deg` 换 `90deg`。用于 KPI 列之间、卡片组之间、页眉下方的分隔。

---

## 3. 编号 + 短横 + 英文小标

页面左上角的标准装置，三件套。

```html
<div class="eyebrow">
  <span class="no">01</span>
  <span class="dash"></span>
  <span class="en">BUSINESS OVERVIEW</span>
</div>
```

```css
.eyebrow { display: flex; align-items: center; gap: 22px; }
.eyebrow .no  { font-size: 26px; color: var(--accent); font-weight: 800; letter-spacing: 6px; }
.eyebrow .dash{ width: 40px; height: 2px; background: currentColor; opacity: .4; }
.eyebrow .en  { font-size: 22px; letter-spacing: 4px; color: var(--muted); }
```

英文全大写、字距 4–6px。这一条用上，页面立刻从"文档"变成"版式"。

---

## 4. 双色顶条

页面最顶部一条 6–8px 的分段色条。

```css
.topbar { position: absolute; left: 0; top: 0; width: 100%; height: 8px; display: flex; }
.topbar .a { width: 200px; background: var(--accent-2); }
.topbar .b { flex: 1;     background: var(--accent); }
```

比满色条贵气，因为暗示了比例。

---

## 5. 点阵装饰

右上角铺一片小圆点，纯装饰。

```css
.dots {
  position: absolute; right: 96px; top: 98px;
  display: grid;
  grid-template-columns: repeat(5, 10px);
  gap: 14px;
}
.dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); opacity: .35; }
```

3 行 × 5 列 = 15 个。别铺满，留白才有节奏。

---

## 6. 数字三段式

KPI 的标准写法，三层信息垂直叠。

```
REVENUE            ← 20px 英文，字距 4px，灰
营业收入            ← 22px 中文，主色，weight 800
12.8 亿            ← 112px，weight 900，"亿"单独 32px
↗ 同比 +18.6%      ← 22px，金色/强调色
```

大数字 `letter-spacing: -3px`，让数字更紧。单位不并进大数字，单独排。

---

## 7. 胶囊标签

带毛玻璃的圆角标签，压在图上。

```css
.pill {
  display: inline-flex; align-items: center; gap: 14px;
  padding: 14px 22px;
  background: color-mix(in srgb, var(--accent) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 60%, transparent);
  border-radius: 30px;
  backdrop-filter: blur(4px);
  font-size: 22px; font-weight: 800; letter-spacing: 3px;
}
```

---

## 8. 角标块

右下角一个纯色矩形，压两行字。替代"页脚居中"这种做法。

```css
.corner {
  position: absolute; right: 0; bottom: 0;
  width: 200px; height: 70px;
  background: var(--accent-2);
  display: flex; align-items: center; justify-content: flex-end;
  padding-right: 20px;
}
```

---

## 9. 中英混排的层级差

中文 weight 800 + 字距 3px；英文 weight 400–700 + 字距 4–6px + 全大写。

同一行里交替使用，视觉上就有了"排版感"。

```html
<h1 style="font-size:52px;font-weight:800;color:var(--accent)">
  经营业绩总览 <span style="color:#333;font-weight:400;font-size:32px;margin-left:16px;">/ 核心 KPI 一览</span>
</h1>
```

---

## 10. 渐变色块 + 遮罩

图片当底色时，一定要压渐变遮罩，否则文字读不清。

```css
.banner-img  { filter: grayscale(1) contrast(1.1) brightness(.92); }
.banner-mask {
  background: linear-gradient(90deg,
    color-mix(in srgb, var(--accent-2) 94%, transparent) 0%,
    color-mix(in srgb, var(--accent-2) 78%, transparent) 50%,
    color-mix(in srgb, var(--accent-2) 35%, transparent) 100%);
}
```

没有图时，用三层渐变也能做出质感（斜切 + 径向 + 线性）。

---

## 11. 45° 斜切

用 `clip-path` 切一块几何形，比整块底色高级得多。

```css
.slice {
  clip-path: polygon(0 0, 1180px 0, 830px 1080px, 0 1080px);
  background: linear-gradient(135deg, #6A34A0 0%, #4A2380 45%, #3A1B68 100%);
}
```

斜边加一条 8px 的强调色描边线，再配两条细的渐隐线（见手法 2）。

---

## 12. 字重对比

同一屏内必须有 `900` 和 `300/400` 同时出现。全是 700 会闷。

```
主标题 900 / 128px
英文副标 300 / 34px
说明 400 / 20px
```

---

## 13. 进度条带刻度

不要光秃秃一条。加填充渐变、当前值竖线、底部刻度文字。

```css
.progress { width: 100%; height: 16px; background: var(--bg-3); border-radius: 8px; position: relative; }
.progress .fill { width: 68.4%; height: 100%; border-radius: 8px; background: linear-gradient(90deg, var(--accent-2), var(--accent)); }
.progress .marker { position: absolute; left: calc(68.4% - 1.5px); top: -5px; width: 3px; height: 26px; background: var(--accent-2); }
```

刻度行：`0 · 25% · 50% · [68.4%] · 75% · 100%`，当前值加粗变色。

---

## 14. 数据来源必须有

页面底部左下，20px，带一个小图标。

```
▤ 数据来源：财务中心 · 更新至 2026-09-30
```

这是可信度装置。没有它，数字就是编的。

---

## 15. 金色/强调色的四种用法

强调色（`--accent`）不要大面积铺，只用在这四处：

1. 编号数字（`01`）
2. 标题里的关键词（`稳中有进，双<span style="color:accent">增长</span>.`）
3. 图标
4. 一个细节点（圆点、短线、胶囊）

一处一个，不要遍地。

---

## 层次自检

写完一页，数一下有多少个**独立的视觉元素**。少于 8 个，页面就是素的。

qbr 的 KPI 页数出来是 12 个：

```
双色顶条 / 编号三件套 / 主标题+副标 / 点阵装饰 / banner(图+遮罩+金句+英文标+说明)
/ 背景巨字Q3 / 金色胶囊 / 四列KPI / 渐隐分割线×3 / 进度条 / 角标块 / 数据来源
```

对照自己的稿子，缺哪类补哪类。
