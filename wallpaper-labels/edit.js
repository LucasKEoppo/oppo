import { findWallpaper } from './data.js';

const APPLY_DURATION_MS = 2200;
const UNLOCK_KEY_PREFIX = 'wallpaper-unlocked:';

const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get('id');
const { wallpaper } = findWallpaper(wallpaperId);

const wallpaperEl = document.getElementById('lock-wallpaper');
const btnApply = document.getElementById('btn-apply');
const btnCancel = document.getElementById('btn-cancel');
const loadingOverlay = document.getElementById('loading-overlay');
const modalPurchaseHint = document.getElementById('modal-purchase-hint');
const btnHintCancel = document.getElementById('btn-hint-cancel');
const btnHintBuy = document.getElementById('btn-hint-buy');

wallpaperEl.style.background = `linear-gradient(165deg, ${wallpaper.color} 0%, ${wallpaper.color}aa 50%, #0D47A1 100%)`;

if (params.get('unlocked') === '1') {
  sessionStorage.setItem(UNLOCK_KEY_PREFIX + wallpaper.id, '1');
}

function isUnlocked() {
  if (!wallpaper.paid) return true;
  return sessionStorage.getItem(UNLOCK_KEY_PREFIX + wallpaper.id) === '1';
}

let isApplying = false;

function showPurchaseHint() {
  modalPurchaseHint.classList.remove('hidden');
}

function hidePurchaseHint() {
  modalPurchaseHint.classList.add('hidden');
}

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
  hidePurchaseHint();
  showApplying();

  setTimeout(() => {
    hideApplying();
    isApplying = false;
    btnApply.textContent = '已应用';
    btnApply.classList.add('is-done');
  }, APPLY_DURATION_MS);
}

btnApply.addEventListener('click', () => {
  if (isApplying || btnApply.classList.contains('is-done')) return;

  if (wallpaper.paid && !isUnlocked()) {
    showPurchaseHint();
    return;
  }

  startApplying();
});

btnHintCancel.addEventListener('click', hidePurchaseHint);

btnHintBuy.addEventListener('click', () => {
  const q = new URLSearchParams({ id: wallpaper.id });
  window.location.href = `store-detail.html?${q.toString()}`;
});

modalPurchaseHint.addEventListener('click', (e) => {
  if (e.target === modalPurchaseHint) hidePurchaseHint();
});

btnCancel.addEventListener('click', () => {
  if (isApplying) return;
  window.location.href = `detail.html?id=${encodeURIComponent(wallpaper.id)}`;
});
