import { findWallpaper } from './data.js';

const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get('id') || 'qc-1';
const { wallpaper } = findWallpaper(wallpaperId);

const preview = document.getElementById('preview');
const btnBack = document.getElementById('btn-back');
const options = document.getElementById('options');

/** 用资源色作为蓝色系预览底，与其他页占位风格统一 */
if (wallpaper?.color) {
  preview.style.background = `linear-gradient(165deg, ${wallpaper.color} 0%, ${wallpaper.color}88 55%, #0D47A1 100%)`;
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
