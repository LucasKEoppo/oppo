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

function renderCornerBadge(paid) {
  if (paid) {
    return `<span class="corner-badge badge-paid">${brushIconSvg}<span>付费</span></span>`;
  }
  return `<span class="corner-badge badge-brush">${brushIconSvg}</span>`;
}

function renderThemeCard(theme) {
  return `
    <div class="theme-card" data-id="${theme.id}">
      <div class="theme-thumb" style="background: ${theme.gradient}">
        ${renderCornerBadge(theme.paid)}
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
