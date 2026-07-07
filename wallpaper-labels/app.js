import {
  wallpaperCategories,
  getPriceLabel,
  getPriceBadgeClass,
  shouldShowPriceBadge,
} from './data.js';

const arrowSvg = `
  <svg class="category-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9 6l6 6-6 6"/>
  </svg>
`;

/** 渲染单张壁纸卡片（含右上角标识） */
function renderWallpaperCard(wallpaper, categoryName) {
  const showBadge = shouldShowPriceBadge(categoryName);
  const badgeHtml = showBadge
    ? `<span class="price-badge ${getPriceBadgeClass(categoryName)}">${getPriceLabel(categoryName)}</span>`
    : '';

  return `
    <div class="wallpaper-card" data-id="${wallpaper.id}" data-category="${categoryName}">
      <div class="wallpaper-placeholder" style="background: linear-gradient(160deg, ${wallpaper.color} 0%, ${adjustColor(wallpaper.color, -30)} 100%)"></div>
      ${badgeHtml}
    </div>
  `;
}

/** 渲染栏目区块 */
function renderCategorySection(category) {
  const cards = category.wallpapers
    .map((wp) => renderWallpaperCard(wp, category.name))
    .join('');

  return `
    <section class="category-section" data-category-id="${category.id}">
      <div class="category-header">
        <div class="category-title-row">
          <span class="category-name">${category.name}</span>
          <span class="category-count">${category.count}</span>
        </div>
        ${arrowSvg}
      </div>
      <div class="wallpaper-scroll">
        ${cards}
      </div>
    </section>
  `;
}

/** 简单颜色加深 */
function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** 初始化页面 */
function init() {
  const content = document.getElementById('content');
  content.innerHTML = wallpaperCategories
    .map(renderCategorySection)
    .join('');
}

init();
