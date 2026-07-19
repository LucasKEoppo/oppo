import { findWallpaper, getRelatedWallpapers } from './data.js';

const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get('id');

const { wallpaper, category } = findWallpaper(wallpaperId);
const related = getRelatedWallpapers(category.id, wallpaper.id);

const hero = document.getElementById('detail-hero');
const recommendList = document.getElementById('recommend-list');
const btnBack = document.getElementById('btn-back');
const btnSet = document.getElementById('btn-set');

function gradient(color) {
  return `linear-gradient(165deg, ${color} 0%, ${color}88 55%, #0D47A1 100%)`;
}

hero.style.background = gradient(wallpaper.color);

function renderRecommendCard(item, isCurrent = false) {
  const paid = item.paid
    ? '<span class="paid-tag">付费</span>'
    : '';
  return `
    <div class="recommend-card${isCurrent ? ' is-current' : ''}" data-id="${item.id}">
      <div class="recommend-thumb" style="background: ${gradient(item.color)}"></div>
      ${paid}
    </div>
  `;
}

/** 同栏目：当前资源 + 其他资源 */
const rowItems = [wallpaper, ...related];
recommendList.innerHTML = rowItems
  .map((item) => renderRecommendCard(item, item.id === wallpaper.id))
  .join('');

recommendList.addEventListener('click', (e) => {
  const card = e.target.closest('.recommend-card');
  if (!card) return;
  const id = card.dataset.id;
  if (!id || id === wallpaper.id) return;
  window.location.href = `detail.html?id=${encodeURIComponent(id)}`;
});

btnBack.addEventListener('click', () => {
  window.location.href = 'index.html';
});

/** 设为 → 进入锁屏编辑框架（免费直接应用 / 付费需购买） */
btnSet.addEventListener('click', () => {
  window.location.href = `edit.html?id=${encodeURIComponent(wallpaper.id)}`;
});
