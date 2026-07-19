import { wallpaperCategories } from './data.js';

/** 小刷子图标（三齿笔头 + 箍 + 短笔杆，斜向） */
const brushIconSvg = `
  <svg class="brush-icon" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="currentColor" transform="translate(12 12) rotate(-45) translate(-12 -12)">
      <rect x="8.2" y="3.2" width="1.8" height="7.2" rx="0.4"/>
      <rect x="11.1" y="2.2" width="1.8" height="8.2" rx="0.4"/>
      <rect x="14" y="3.2" width="1.8" height="7.2" rx="0.4"/>
      <rect x="7.2" y="10.6" width="9.6" height="2.6" rx="0.5"/>
      <rect x="10" y="13.2" width="4" height="7.2" rx="0.7"/>
    </g>
  </svg>
`;

/** 右下角下载图标 */
const downloadIconSvg = `
  <svg class="download-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3.5v11"/>
      <path d="M7.5 10.5L12 15l4.5-4.5"/>
      <path d="M5 16.5v2.2c0 .7.5 1.3 1.2 1.3h11.6c.7 0 1.2-.6 1.2-1.3v-2.2"/>
    </g>
  </svg>
`;

function renderCornerBadge(wallpaper) {
  if (!wallpaper.brush && !wallpaper.paid) return '';
  if (wallpaper.paid) {
    return `<span class="corner-badge badge-paid">${brushIconSvg}<span>付费</span></span>`;
  }
  return `<span class="corner-badge badge-brush">${brushIconSvg}</span>`;
}

function renderDownloadIcon(wallpaper) {
  if (!wallpaper.download) return '';
  return `<span class="download-icon" aria-hidden="true">${downloadIconSvg}</span>`;
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function renderWallpaperCard(wallpaper) {
  const bg = `linear-gradient(160deg, ${wallpaper.color} 0%, ${adjustColor(wallpaper.color, -28)} 100%)`;
  return `
    <div class="wallpaper-card" data-id="${wallpaper.id}">
      <div class="wallpaper-placeholder" style="background: ${bg}"></div>
      ${renderCornerBadge(wallpaper)}
      ${renderDownloadIcon(wallpaper)}
    </div>
  `;
}

function renderCategorySection(category) {
  const cards = category.wallpapers.map(renderWallpaperCard).join('');
  return `
    <section class="category-section" data-category-id="${category.id}">
      <div class="category-header">
        <div class="category-title-row">
          <span class="category-name">${category.name}</span>
          <span class="category-count">${category.count}</span>
        </div>
      </div>
      <div class="wallpaper-scroll">
        ${cards}
      </div>
    </section>
  `;
}

document.getElementById('content').innerHTML = wallpaperCategories
  .map(renderCategorySection)
  .join('');
