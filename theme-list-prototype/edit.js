import { themeSections } from './data.js';

const APPLY_DURATION_MS = 2200;

const params = new URLSearchParams(window.location.search);
const themeId = params.get('id');

const allThemes = themeSections.flatMap((s) => s.themes);
const theme = allThemes.find((t) => t.id === themeId) || allThemes[0];

const wallpaperEl = document.getElementById('lock-wallpaper');
const btnApply = document.getElementById('btn-apply');
const btnCancel = document.getElementById('btn-cancel');
const loadingOverlay = document.getElementById('loading-overlay');

wallpaperEl.style.background = theme.gradient;

let isApplying = false;

function showApplying() {
  loadingOverlay.classList.remove('hidden');
  btnApply.classList.add('is-applying');
  btnApply.disabled = true;
}

function hideApplying() {
  loadingOverlay.classList.add('hidden');
  btnApply.classList.remove('is-applying');
  btnApply.disabled = false;
}

function startApplying() {
  if (isApplying || btnApply.classList.contains('is-done')) return;
  isApplying = true;
  showApplying();

  setTimeout(() => {
    hideApplying();
    isApplying = false;
    btnApply.textContent = '已应用';
    btnApply.classList.add('is-done');
  }, APPLY_DURATION_MS);
}

btnApply.addEventListener('click', startApplying);

btnCancel.addEventListener('click', () => {
  if (isApplying) return;
  window.location.href = 'index.html';
});
