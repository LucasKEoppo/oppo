import { wallpaperCategories } from './data.js?v=9';

const DOWNLOAD_STORAGE_KEY = 'wallpaper-labels-downloaded';
const DOWNLOAD_DURATION_MS = 2200;

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

function loadDownloadedIds() {
  try {
    const raw = sessionStorage.getItem(DOWNLOAD_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
}

function saveDownloadedIds(ids) {
  sessionStorage.setItem(DOWNLOAD_STORAGE_KEY, JSON.stringify([...ids]));
}

const downloadedIds = loadDownloadedIds();
const downloadingIds = new Set();

function renderCornerBadge(wallpaper) {
  if (!wallpaper.brush && !wallpaper.paid) return '';
  if (wallpaper.paid) {
    return `<span class="corner-badge badge-paid">${brushIconSvg}<span>付费</span></span>`;
  }
  return `<span class="corner-badge badge-brush">${brushIconSvg}</span>`;
}

/** 环形进度条：灰底轨 + 白色进度弧 + 前端小圆点 */
function renderProgressRing(progress = 0) {
  const size = 20;
  const stroke = 2.2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  const offset = c * (1 - p);
  const angle = -Math.PI / 2 + p * Math.PI * 2;
  const cx = size / 2 + r * Math.cos(angle);
  const cy = size / 2 + r * Math.sin(angle);
  const showDot = p > 0.01 && p < 0.995;

  return `
    <span class="download-progress" role="progressbar" aria-valuenow="${Math.round(p * 100)}" aria-valuemin="0" aria-valuemax="100">
      <svg class="progress-ring-svg" viewBox="0 0 ${size} ${size}" aria-hidden="true">
        <circle class="progress-track" cx="${size / 2}" cy="${size / 2}" r="${r}"
          fill="none" stroke-width="${stroke}"/>
        <circle class="progress-arc" cx="${size / 2}" cy="${size / 2}" r="${r}"
          fill="none" stroke-width="${stroke}"
          stroke-dasharray="${c.toFixed(2)}"
          stroke-dashoffset="${offset.toFixed(2)}"
          transform="rotate(-90 ${size / 2} ${size / 2})"/>
        ${showDot ? `<circle class="progress-tip" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.1"/>` : ''}
      </svg>
    </span>
  `;
}

function renderDownloadSlot(wallpaperId) {
  if (downloadedIds.has(wallpaperId)) return '';
  return `
    <span class="download-icon" data-download-slot="${wallpaperId}" aria-hidden="true">
      ${downloadIconSvg}
    </span>
  `;
}

function adjustColor(hex, amount) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function renderWallpaperCard(wallpaper, categoryId) {
  const bg = `linear-gradient(160deg, ${wallpaper.color} 0%, ${adjustColor(wallpaper.color, -28)} 100%)`;
  const done = downloadedIds.has(wallpaper.id);
  return `
    <a class="wallpaper-card${done ? ' is-downloaded' : ''}"
       href="detail.html?id=${encodeURIComponent(wallpaper.id)}"
       data-id="${wallpaper.id}"
       data-category="${categoryId}"
       data-state="${done ? 'done' : 'idle'}">
      <div class="wallpaper-placeholder" style="background: ${bg}"></div>
      ${renderCornerBadge(wallpaper)}
      ${renderDownloadSlot(wallpaper.id)}
    </a>
  `;
}

function renderCategorySection(category) {
  const cards = category.wallpapers
    .map((wp) => renderWallpaperCard(wp, category.id))
    .join('');
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

function startCardDownload(card) {
  const id = card.dataset.id;
  if (!id || downloadingIds.has(id) || downloadedIds.has(id)) return;

  downloadingIds.add(id);
  card.dataset.state = 'downloading';
  card.classList.add('is-downloading');

  const slot = card.querySelector('[data-download-slot]');
  if (!slot) {
    downloadingIds.delete(id);
    return;
  }

  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / DOWNLOAD_DURATION_MS);
    const progress = 1 - (1 - t) * (1 - t);
    slot.innerHTML = renderProgressRing(progress);

    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }

    downloadedIds.add(id);
    saveDownloadedIds(downloadedIds);
    downloadingIds.delete(id);
    card.dataset.state = 'done';
    card.classList.remove('is-downloading');
    card.classList.add('is-downloaded');
    slot.remove();
  }

  slot.innerHTML = renderProgressRing(0.02);
  requestAnimationFrame(tick);
}

document.getElementById('content').innerHTML = wallpaperCategories
  .map(renderCategorySection)
  .join('');

document.getElementById('content').addEventListener('click', (e) => {
  const card = e.target.closest('.wallpaper-card');
  if (!card) return;

  const id = card.dataset.id;
  if (!id) return;

  // 下载中：拦截跳转
  if (downloadingIds.has(id) || card.dataset.state === 'downloading') {
    e.preventDefault();
    return;
  }

  // 未下载：首次点击开始下载，不进详情
  if (!downloadedIds.has(id)) {
    e.preventDefault();
    startCardDownload(card);
  }
  // 已下载：放行，进入详情页
});

const btnBack = document.getElementById('btn-back');
if (btnBack) {
  btnBack.addEventListener('click', () => history.back());
}
