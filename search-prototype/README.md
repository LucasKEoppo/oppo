# 资源搜索页面原型

包含**搜索页**和**搜索结果页**，资源类型由入口决定，结果页不再展示分类 Tab。

## 页面结构

### 搜索页（index.html）

- 搜索框 + 分类提示词（placeholder 随资源类型变化）
- 历史搜索（可清空）
- 热门搜索（热词综合榜 + 热词飙升榜）
- **不含**今日话题、推荐卡片等底部内容

### 搜索结果页（results.html）

- 搜索框（含清除按钮）
- 结果统计 + 排序
- 三列资源网格
- **不含**全部/主题/字体/壁纸等分类 Tab

## 资源类型

通过 URL 参数 `type` 区分入口：

| type | 名称 | 搜索页地址 |
|------|------|-----------|
| `wallpaper` | 壁纸 | `index.html`（默认） |
| `theme` | 主题 | `index.html?type=theme` |
| `icon` | 图标 | `index.html?type=icon` |

从壁纸入口进入 → 只搜壁纸；从主题入口进入 → 只搜主题。

## 预览

```bash
cd search-prototype
python3 -m http.server 8080
```

- 壁纸搜索页：http://localhost:8080/search-prototype/index.html
- 主题搜索页：http://localhost:8080/search-prototype/index.html?type=theme
- 图标搜索页：http://localhost:8080/search-prototype/index.html?type=icon
- 搜索结果示例：http://localhost:8080/search-prototype/results.html?type=wallpaper&q=简约

## 官方资源

搜索关键词包含「官方」时，返回当前资源类型下的系统内置资源。官方资源与普通资源展示规则不同：

| 字段 | 普通资源 | 官方资源 |
|------|---------|---------|
| 资源标签 | 可有（畅销、热门等） | 无 |
| 标题 | 资源名称 | 固定为「官方资源」 |
| 价格 | 价格 / 免费 / VIP 免费 | 免费（可通过 `showPrice: false` 隐藏） |

预览：http://localhost:8080/search-prototype/results.html?type=wallpaper&q=官方

## 交互

1. 搜索页输入关键词或点击历史/热词 → 跳转结果页
2. 结果页点击返回 → 回到对应类型的搜索页
3. 修改 `data.js` 中各类型的 `placeholder`、`history`、`hotComprehensive`、`results` 等数据即可定制
