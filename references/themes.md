# 主题与配色

10 套主题，整份稿子只用一套。切换只改 `<html data-theme="...">`。

---

## 怎么选

**按行业和场合选，不按个人喜好。**

| 场合 | 推荐 | 备选 |
|---|---|---|
| 科技 / AI / 互联网 / 产品发布 | `violet` | `graphite` `aurora` |
| 高端商务 / 金融 / 年度经营汇报 | `obsidian` | `fjord` |
| 投资人路演 / BP | `obsidian` | `violet` |
| 数据 / 云 / 基础设施 / 技术方案 | `aurora` | `graphite` |
| 企业服务 / 咨询 / B 端方案 | `fjord` | `moss` |
| 文化 / 教育 / 品牌 / 出版 | `paper` | `clay` |
| 环保 / 医疗 / 可持续 / 公共事务 | `moss` | `fjord` |
| 消费 / 零售 / 生活 / 设计 | `clay` | `nebula` |
| 极简 / 学术 / 正式答辩 | `ink` | `paper` |
| 创意 / 营销 / 活动 / 年轻品牌 | `nebula` | `graphite` |
| 硬件 / 工程 / 开发者 | `graphite` | `aurora` |

拿不准就用 `violet`——它是中性偏科技的选择，在大多数场合不出错。

### 深浅自动判断

深色主题：`violet` `obsidian` `aurora` `nebula` `graphite`
浅色主题：`paper` `fjord` `moss` `clay` `ink`

投影仪亮度差的会议室，优先选深色主题——对比度更稳。需要打印的稿子，用浅色主题省墨且可读。

---

## 完整色值

每套主题 12 个变量。要做客户定制时照这个表改。

### violet · 紫电

| 变量 | 值 |
|---|---|
| `--bg` | `#14121b` |
| `--bg-2` | `#1c1926` |
| `--fg` | `#f4f1fa` |
| `--fg-2` | `#c9c2d9` |
| `--muted` | `#8b83a0` |
| `--accent` | `#9e57fa` |
| `--accent-2` | `#7733f8` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(255,255,255,.10)` |
| `--card` | `rgba(255,255,255,.045)` |
| `--glow` | `rgba(119,51,248,.34)` |
| `--grad` | `linear-gradient(135deg,#3b2af9,#b547e4 52%,#f335ec)` |

### obsidian · 曜石金

| 变量 | 值 |
|---|---|
| `--bg` | `#0e0e10` |
| `--bg-2` | `#17171a` |
| `--fg` | `#f5f3ee` |
| `--fg-2` | `#c4bfb4` |
| `--muted` | `#837c70` |
| `--accent` | `#d9b05c` |
| `--accent-2` | `#b8912f` |
| `--accent-fg` | `#14120d` |
| `--line` | `rgba(255,255,255,.09)` |
| `--card` | `rgba(255,255,255,.04)` |
| `--glow` | `rgba(217,176,92,.26)` |
| `--grad` | `linear-gradient(135deg,#d9b05c,#f0d89a 50%,#a8811f)` |

### aurora · 极光

| 变量 | 值 |
|---|---|
| `--bg` | `#0a1224` |
| `--bg-2` | `#111c34` |
| `--fg` | `#eaf1ff` |
| `--fg-2` | `#a9bcdc` |
| `--muted` | `#6e82a6` |
| `--accent` | `#4ecdc4` |
| `--accent-2` | `#2b9fd4` |
| `--accent-fg` | `#04141c` |
| `--line` | `rgba(140,180,255,.13)` |
| `--card` | `rgba(120,170,255,.055)` |
| `--glow` | `rgba(78,205,196,.28)` |
| `--grad` | `linear-gradient(135deg,#4ecdc4,#5b8def 50%,#8a5cf6)` |

### paper · 纸感

| 变量 | 值 |
|---|---|
| `--bg` | `#faf7f2` |
| `--bg-2` | `#f2ede4` |
| `--fg` | `#1f1b16` |
| `--fg-2` | `#4a443c` |
| `--muted` | `#8a8175` |
| `--accent` | `#c0392b` |
| `--accent-2` | `#96271c` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(31,27,22,.13)` |
| `--card` | `rgba(31,27,22,.035)` |
| `--glow` | `rgba(192,57,43,.16)` |
| `--grad` | `linear-gradient(135deg,#c0392b,#e07a5f)` |

### fjord · 峡湾

| 变量 | 值 |
|---|---|
| `--bg` | `#f4f7fb` |
| `--bg-2` | `#e8eef7` |
| `--fg` | `#10202f` |
| `--fg-2` | `#3d5266` |
| `--muted` | `#7d8fa3` |
| `--accent` | `#1b6ca8` |
| `--accent-2` | `#124f7d` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(16,32,47,.12)` |
| `--card` | `rgba(16,32,47,.03)` |
| `--glow` | `rgba(27,108,168,.16)` |
| `--grad` | `linear-gradient(135deg,#1b6ca8,#4aa3d8 60%,#7fd0e8)` |

### moss · 苔原

| 变量 | 值 |
|---|---|
| `--bg` | `#f5f7f2` |
| `--bg-2` | `#e9eee2` |
| `--fg` | `#1a2416` |
| `--fg-2` | `#43543c` |
| `--muted` | `#7f8f76` |
| `--accent` | `#3f7d3a` |
| `--accent-2` | `#2c5c29` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(26,36,22,.12)` |
| `--card` | `rgba(26,36,22,.03)` |
| `--glow` | `rgba(63,125,58,.16)` |
| `--grad` | `linear-gradient(135deg,#3f7d3a,#7ab55c)` |

### clay · 赤陶

| 变量 | 值 |
|---|---|
| `--bg` | `#fbf5ef` |
| `--bg-2` | `#f3e8dc` |
| `--fg` | `#2d1f17` |
| `--fg-2` | `#5c4437` |
| `--muted` | `#9b8271` |
| `--accent` | `#b5562f` |
| `--accent-2` | `#8f3d1e` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(45,31,23,.13)` |
| `--card` | `rgba(45,31,23,.035)` |
| `--glow` | `rgba(181,86,47,.16)` |
| `--grad` | `linear-gradient(135deg,#b5562f,#e0906a)` |

### ink · 墨白

| 变量 | 值 |
|---|---|
| `--bg` | `#ffffff` |
| `--bg-2` | `#f4f4f4` |
| `--fg` | `#0a0a0a` |
| `--fg-2` | `#3d3d3d` |
| `--muted` | `#8a8a8a` |
| `--accent` | `#0a0a0a` |
| `--accent-2` | `#333333` |
| `--accent-fg` | `#ffffff` |
| `--line` | `rgba(0,0,0,.14)` |
| `--card` | `rgba(0,0,0,.025)` |
| `--glow` | `rgba(0,0,0,.10)` |
| `--grad` | `linear-gradient(135deg,#0a0a0a,#4a4a4a)` |

### nebula · 星尘

| 变量 | 值 |
|---|---|
| `--bg` | `#17111f` |
| `--bg-2` | `#221830` |
| `--fg` | `#f6eefe` |
| `--fg-2` | `#cbaddd` |
| `--muted` | `#91789f` |
| `--accent` | `#e879f9` |
| `--accent-2` | `#c026d3` |
| `--accent-fg` | `#1a0b1f` |
| `--line` | `rgba(255,255,255,.10)` |
| `--card` | `rgba(255,255,255,.045)` |
| `--glow` | `rgba(232,121,249,.30)` |
| `--grad` | `linear-gradient(135deg,#c026d3,#e879f9 55%,#f9a8d4)` |

### graphite · 石墨电光

| 变量 | 值 |
|---|---|
| `--bg` | `#131518` |
| `--bg-2` | `#1b1e23` |
| `--fg` | `#eef2f5` |
| `--fg-2` | `#b3bcc6` |
| `--muted` | `#78838f` |
| `--accent` | `#35e0c4` |
| `--accent-2` | `#14b8a6` |
| `--accent-fg` | `#06201d` |
| `--line` | `rgba(255,255,255,.10)` |
| `--card` | `rgba(255,255,255,.04)` |
| `--glow` | `rgba(53,224,196,.26)` |
| `--grad` | `linear-gradient(135deg,#14b8a6,#35e0c4 60%,#a3f7e4)` |

---

## 定制一套主题

用户给了品牌色时，加一段到 `themes.css` 末尾：

```css
:root[data-theme="brand"] {
  --bg: #0f1115;              /* 深色底，或浅色 #ffffff */
  --bg-2: #171a20;            /* 比 --bg 略亮/略暗一档 */
  --fg: #f2f4f7;              /* 主文字，与 --bg 对比度 ≥ 7:1 */
  --fg-2: #b8bfc9;            /* 次文字，对比度 ≥ 4.5:1 */
  --muted: #7a828d;           /* 弱化文字，对比度 ≥ 3:1 */
  --accent: #2f81f7;          /* 品牌主色 */
  --accent-2: #1a5fb4;        /* 主色加深一档 */
  --accent-fg: #ffffff;       /* 主色上的文字，要能读清 */
  --line: rgba(255,255,255,.10);
  --card: rgba(255,255,255,.04);
  --glow: rgba(47,129,247,.30);   /* 主色低透明版 */
  --grad: linear-gradient(135deg,#1a5fb4,#2f81f7);
}
```

然后在 `<html data-theme="brand">` 引用。

### 定值规则

- `--bg-2` 与 `--bg` 差一档亮度即可（深色往亮走约 6%，浅色往暗走约 4%）
- `--fg` 与 `--bg` 对比度至少 7:1（正文可读的下限）
- `--accent-fg` 必须和 `--accent` 有足够对比——浅色 accent（如黄色）配深色文字
- `--glow` 用 `--accent` 的 rgba，透明度 .25–.35
- `--grad` 两到三个色停，第一个偏深，和 `--accent` 同色系

---

## 常见错误

| 错误 | 后果 |
|---|---|
| 一份稿子混用两套主题 | 视觉撕裂，check 不报但人一眼看出 |
| 浅色主题配白色卡片 | 卡片消失 |
| 自定义 accent 后没改 `--accent-fg` | 按钮上的字看不见 |
| `--glow` 透明度太高 | 背景糊成一片，文字发灰 |
| 自定义深色主题忘了 `--line` | 分割线消失，表格塌成一片 |
