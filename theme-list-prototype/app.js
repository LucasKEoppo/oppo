import { themeSections } from './data.js';

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

/** 右下角下载图标（圆角箭头 + 托盘） */
const downloadIconSvg = `
  <svg class="download-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3.5v11"/>
      <path d="M7.5 10.5L12 15l4.5-4.5"/>
      <path d="M5 16.5v2.2c0 .7.5 1.3 1.2 1.3h11.6c.7 0 1.2-.6 1.2-1.3v-2.2"/>
    </g>
  </svg>
`;

/** 环形进度条：灰底轨 + 白色进度弧 + 前端小圆点 */
function renderProgressRing(progress = 0) {
  const size = 20;
  const stroke = 2.2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  const offset = c * (1 - p);
  // 从 12 点方向顺时针；前端点坐标
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

function renderCornerBadge(paid) {
  if (paid) {
    return `<span class="corner-badge badge-paid">${brushIconSvg}<span>付费</span></span>`;
  }
  return `<span class="corner-badge badge-brush">${brushIconSvg}</span>`;
}

function renderDownloadButton() {
  return `
    <button type="button" class="download-btn" aria-label="下载">
      <span class="download-icon">${downloadIconSvg}</span>
    </button>
  `;
}

function renderThemeCard(theme) {
  return `
    <div class="theme-card" data-id="${theme.id}">
      <div class="theme-thumb" style="background: ${theme.gradient}">
        ${renderCornerBadge(theme.paid)}
        ${renderDownloadButton()}
        <div class="theme-thumb-shine"></div>
      </div>
    </div>
  `;
}

function renderSection(section) {
  const cards = section.themes.map(renderThemeCard).join('');
  return `
    <section class="theme-section" data-section="${section.id}">
      <div class="section-heading">
        <h2 class="section-title">${section.title}</h2>
        <p class="section-subtitle">${section.subtitle}</p>
      </div>
      <div class="theme-row">
        ${cards}
      </div>
    </section>
  `;
}

document.getElementById('content').innerHTML = themeSections.map(renderSection).join('');

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

const activeDownloads = new WeakSet();

function startDownloadProgress(btn) {
  if (activeDownloads.has(btn) || btn.dataset.state === 'done') return;
  activeDownloads.add(btn);
  btn.dataset.state = 'downloading';
  btn.setAttribute('aria-label', '下载中');
  btn.classList.add('is-downloading');

  let progress = 0;
  const duration = 2200;
  const start = performance.now();

  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    // ease-out：前期稍快，接近完成时放慢
    progress = 1 - (1 - t) * (1 - t);
    btn.innerHTML = renderProgressRing(progress);

    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      btn.innerHTML = renderProgressRing(1);
      btn.dataset.state = 'done';
      btn.setAttribute('aria-label', '已下载');
      btn.classList.remove('is-downloading');
      btn.classList.add('is-done');
      activeDownloads.delete(btn);
    }
  }

  btn.innerHTML = renderProgressRing(0.02);
  requestAnimationFrame(tick);
}

document.getElementById('content').addEventListener('click', (e) => {
  const btn = e.target.closest('.download-btn');
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  startDownloadProgress(btn);
});
