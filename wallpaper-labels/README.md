# 壁纸免费/付费标识

为「更换壁纸」页面中的壁纸缩略图添加右上角 **免费** / **付费** 标识。

## 标识规则

| 栏目 | 标识 |
|------|------|
| 绿野闲行 | 免费 |
| 青空漫行、幻彩花绽及其他栏目 | 付费 |

## 目录结构

```
wallpaper-labels/
├── index.html          # 可预览的移动端 UI 演示
├── styles.css          # 样式（含 badge 定位）
├── data.js             # 栏目数据与标识逻辑
├── app.js              # 页面渲染
├── label_images.py     # 批量为图片文件添加标识（Python）
├── WallpaperLabels.tsx # React Native 集成组件
└── requirements.txt
```

## 快速预览

在浏览器中打开 `wallpaper-labels/index.html` 即可查看效果。每张壁纸右上角会根据所属栏目自动显示标识：

- **绿野闲行** → 半透明小胶囊「免费」角标
- **青空漫行 / 幻彩花绽** → 半透明小胶囊「付费」角标

## 批量处理图片文件

若需要对实际壁纸图片文件批量添加标识：

```bash
cd wallpaper-labels
pip install -r requirements.txt

# 绿野闲行 → 免费
python label_images.py -i ./images/绿野闲行 -o ./output/绿野闲行 -c 绿野闲行

# 青空漫行 → 付费
python label_images.py -i ./images/青空漫行 -o ./output/青空漫行 -c 青空漫行

# 幻彩花绽 → 付费
python label_images.py -i ./images/幻彩花绽 -o ./output/幻彩花绽 -c 幻彩花绽
```

## 核心逻辑

```javascript
const FREE_CATEGORY = '绿野闲行';

function getPriceLabel(categoryName) {
  return categoryName === FREE_CATEGORY ? '免费' : '付费';
}
```

CSS 定位（右上角半透明小胶囊）：

```css
.price-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  padding: 2px 7px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(6px);
  color: rgba(255, 255, 255, 0.95);
  font-size: 10px;
}
```

## 集成到 App

- **Web / H5**：参考 `app.js` 中的 `renderWallpaperCard` 函数
- **React Native**：直接使用 `WallpaperLabels.tsx` 中的 `PriceBadge` 组件
- **Android**：在壁纸 Item 布局 XML 中添加 `TextView`，通过 `categoryName.equals("绿野闲行")` 判断显示文案与背景色
