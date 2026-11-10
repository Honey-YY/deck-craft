# 版式字典

14 种版式的用法、字段、字数上限和常见错误。

骨架代码全在 `assets/deck.html` 里，**复制整段 `<section>` 再改文字**，不要重写布局。

---

## cover · 封面

```html
<section class="slide cover on">
  <div class="glow" style="width:640px;height:640px;left:-160px;top:-260px;"></div>
  <div class="accent-bar"></div>
  <div class="slide-inner">
    <div class="eyebrow">分类标签</div>
    <h1 class="h1">主标题</h1>
    <p class="lead">副标题</p>
    <div class="meta">
      <div>日期<b>2026-11-10</b></div>
      <div>页数<b>14</b></div>
    </div>
  </div>
  <div class="slide-foot"><span>品牌</span><span>01</span></div>
</section>
```

| 字段 | 上限 | 说明 |
|---|---|---|
| `.eyebrow` | 12 字 | 分类、部门、场合。可留空 |
| `.h1` | 16 字（含换行） | 用 `<br>` 手动断行，别指望自动折 |
| `.lead` | 40 字 | 一句话说清这份稿子解决什么 |
| `.meta` | 2–3 组 | 日期 / 页数 / 版本 / 汇报人 |

**只有第一页带 `on`。**全篇只能有一个 `on`。

**别用**：封面放大段说明文字；封面塞 logo 墙。

---

## agenda · 目录

3–6 行，超过 6 行改成分组。

```html
<div class="row"><span class="idx">01</span><span class="h3">第一部分标题</span><small>一句补充</small></div>
```

| 字段 | 上限 |
|---|---|
| `.h3` | 16 字 |
| `small` | 12 字 |

**别用**：目录里写完整句子；超过 6 项（改两页或合并）。

---

## section · 章节

段落切换。深色底，靠 `--bg-2` 与普通页区分。

```html
<div class="big-num">01</div>
<h1 class="h1">章节标题</h1>
<p class="lead">一句话点题</p>
```

| 字段 | 上限 |
|---|---|
| `.big-num` | 两位数字 |
| `.h1` | 14 字 |
| `.lead` | 30 字 |

**别用**：一份稿子出现 8 个以上章节（说明结构太碎）；`section` 后面紧跟又一个 `section`。

---

## bullets · 要点

主武器。2–4 条。

```html
<div class="item"><div class="dot"></div><div>
  <div class="h3">支撑点标题</div>
  <p>一句话解释</p>
</div></div>
```

| 字段 | 上限 | 说明 |
|---|---|---|
| 条数 | 2–4 | 5 条以上拆页 |
| `.h3` | 14 字 | 名词短语或短句 |
| `p` | 45 字 | 一行到一行半，超了会被 check 提醒 |

**别用**：每条下面再套子列表（嵌套超过一层就该换版式）；四条里三条是废话。

---

## columns · 双栏

只用于**真对照**：前后、优劣、我们 vs 他们、现状 vs 目标。

```html
<div class="cols">
  <div class="col"><h4>左栏标签</h4><ul><li>条目</li></ul></div>
  <div class="col"><h4>右栏标签</h4><ul><li>条目</li></ul></div>
</div>
```

| 字段 | 上限 |
|---|---|
| `h4` | 8 字 |
| 每栏条目 | 3–5 条 |
| `li` | 20 字 |

**别用**：两栏没有对照关系（那就是两个 bullets 页）；一边长一边空。

---

## cards · 卡片

并列模块。`data-n` 必须与卡片数量一致。

```html
<section class="slide cards" data-n="3">
  <div class="c"><div class="ico">◧</div><div class="h3">标题</div><p>说明</p></div>
```

| `data-n` | 布局 |
|---|---|
| `3` | 一行三张 |
| `4` | 一行四张 |
| `6` | 两行三列 |

| 字段 | 上限 |
|---|---|
| `.ico` | 1 个字符（几何符号或数字，别用 emoji） |
| `.h3` | 10 字 |
| `p` | 40 字 |

**别用**：8 张卡（超网格）；卡片里再放列表；图标风格混用。

---

## stat · 数据

1–3 个大数字。`data-n` 必须与数量一致。

```html
<section class="slide stat" data-n="3">
  <div class="s"><div class="v num">1<em>个观点</em></div><div class="k">说明</div></div>
```

| 字段 | 说明 |
|---|---|
| `.v` | 主数字。单位放 `<em>` 里，会小一号并着强调色 |
| `.k` | 12–30 字的解释，必须给锚点 |

**数字必须有出处或标注示意。**没有出处的百分比不要放。

**别用**：四个数字（挤）；数字超过 6 位（读不出来）；把句子塞进 `.v`。

---

## chart · 图表

纯 CSS 条形图。`height` 按最大值的百分比手算。

```html
<div class="bar"><b>74</b><i style="height:72%"></i><span>标签</span></div>
<div class="bar alt"><b>31</b><i style="height:29%"></i><span>标签</span></div>
```

`.bar.alt` 是弱化样式，用来做对照项。`.legend` 最多三条。

| 约束 | 值 |
|---|---|
| 条形数 | 3–6 |
| 图例 | ≤ 3 条 |
| 标题 | 必须是结论句，不是「图 1」 |

**别用**：折线图（这个版式没有）；饼图；把不同量纲放一起。

需要折线或更复杂图表时，改用 `image` 版式放图。

---

## timeline · 时间线

3–5 个节点，横向。用于阶段、演化、版本、排期。

```html
<div class="track">
  <div class="node"><div class="t">STEP 1</div><div class="h3">标题</div><p>说明</p></div>
```

| 字段 | 上限 |
|---|---|
| `.t` | 8 字（`2024 Q1` / `STEP 1` / `第一阶段`） |
| `.h3` | 10 字 |
| `p` | 26 字 |

**别用**：6 个以上节点（横向挤死）；节点间时间跨度不均却等距排列。

---

## quote · 引用

一页只用一次，做节奏换气。

```html
<blockquote>原话</blockquote>
<cite>人名 · 出处</cite>
```

| 字段 | 上限 |
|---|---|
| `blockquote` | 40 字（超出会换三行以上，压掉呼吸感） |
| `cite` | 30 字 |

**别用**：自己编的"名言"；连续两页引用。

---

## table · 表格

≤ 6 行 × 3–4 列。

```html
<table>
  <thead><tr><th>列名</th><th>列名</th></tr></thead>
  <tbody><tr><td>首列</td><td>值</td></tr></tbody>
</table>
```

| 约束 | 值 |
|---|---|
| 行数 | 3–6 |
| 列数 | 2–4 |
| 单元格文字 | ≤ 14 字 |

首列自动加粗。数字列加 `class="num"` 会变强调色 + 等宽。

**别用**：超过 6 行（改成 `bullets` 提炼，或拆成两页）；单元格里写句子。

---

## image · 图文

左图右文。图是证据，不是装饰。

```html
<div class="split">
  <div class="frame"><img src="shot.png" alt=""></div>
  <div class="side">
    <div class="item"><div class="h3">标题</div><p>说明</p></div>
  </div>
</div>
```

| 约束 | 值 |
|---|---|
| 右侧条目 | 2–3 条 |
| `.h3` | 12 字 |
| `p` | 40 字 |

`<div class="frame">` 里没有图时会显示占位提示文字——**交付前要么放图，要么换成别的版式**。

图片必须是相对路径或 data URI。外链图在单文件交付时会挂（check 会提醒）。

**别用**：没有图却留着占位框；放低分辨率截图。

---

## process · 流程

3–5 步，等宽横排，自动带箭头。

```html
<div class="flow">
  <div class="step"><div class="n">01</div><div class="h3">步骤名</div><p>说明</p></div>
</div>
```

| 字段 | 上限 |
|---|---|
| 步数 | 3–5 |
| `.h3` | 8 字 |
| `p` | 30 字 |

**别用**：6 步以上（箭头挤掉）；把 `process` 和 `timeline` 搞混——有明确时间轴用 `timeline`，只是先后顺序用 `process`。

---

## end · 结尾

```html
<h1 class="h1">行动号召</h1>
<p class="lead">一句话说清下一步</p>
<div class="actions">
  <div class="btn primary">主动作</div>
  <div class="btn ghost">次动作</div>
</div>
```

| 字段 | 上限 |
|---|---|
| `.h1` | 16 字 |
| `.lead` | 36 字 |
| 按钮 | 1–2 个 |

**别用**：「谢谢观看」当唯一内容——那是浪费一页。写清你要对方做什么。

---

## 页脚

每页都要有：

```html
<div class="slide-foot"><span>品牌或章节名</span><span>07</span></div>
```

- 左：品牌名、章节名，或留空 `<span></span>`
- 右：页码。两位数补零（`01`）。最后一页可以写 `14 / 14`
- 字号固定 13px，不用改

---

## 选版式的判断流程

1. 这页的核心是**一个判断**吗？→ `bullets`
2. 是**两个东西的对比**吗？→ `columns`
3. 是**数字**吗？→ 单个大数字用 `stat`，多个并列用 `chart`
4. 是**并列的模块**吗？→ `cards`
5. 是**顺序/阶段**吗？→ 有日期用 `timeline`，只是步骤用 `process`
6. 是**对照参数**吗？→ `table`
7. 是**一张图**吗？→ `image`
8. 都不是？→ 可能是两句 `bullets` 硬挤，拆成两页。

---

## 节奏

连续三页同版式会塌（check 会提醒）。经验配比：

```
封面 1 · 目录 1 · 章节 2–3 · 要点 30% · 数据 20% · 卡片 15% · 其余按需 · 结尾 1
```

每 4–5 页插一个 `section` 或 `quote` 换气。
