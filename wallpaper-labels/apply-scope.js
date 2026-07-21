import { findWallpaper } from './data.js';

const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get('id') || 'qc-1';
const { wallpaper } = findWallpaper(wallpaperId);

const preview = document.getElementById('preview');
const btnBack = document.getElementById('btn-back');
const options = document.getElementById('options');

/** 若有资源色，叠一层色调；保持绿色草纹底 */
if (wallpaper?.color) {
  preview.style.boxShadow = `inset 0 0 120px ${wallpaper.color}33`;
}

btnBack.addEventListener('click', () => {
  window.location.href = `detail.html?id=${encodeURIComponent(wallpaperId)}`;
});

/** 任选范围 → 进入编辑框架 */
options.addEventListener('click', (e) => {
  const btn = e.target.closest('.option');
  if (!btn) return;
  const scope = btn.dataset.scope || 'lock';
  window.location.href = `edit.html?id=${encodeURIComponent(wallpaperId)}&scope=${encodeURIComponent(scope)}`;
});
