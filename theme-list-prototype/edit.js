import { themeSections } from './data.js';

const APPLY_DURATION_MS = 2200;
const UNLOCK_KEY_PREFIX = 'theme-unlocked:';

const params = new URLSearchParams(window.location.search);
const themeId = params.get('id');

const allThemes = themeSections.flatMap((s) => s.themes);
const theme = allThemes.find((t) => t.id === themeId) || allThemes[0];

const wallpaperEl = document.getElementById('lock-wallpaper');
const btnApply = document.getElementById('btn-apply');
const btnCancel = document.getElementById('btn-cancel');
const loadingOverlay = document.getElementById('loading-overlay');
const modalPurchaseHint = document.getElementById('modal-purchase-hint');
const btnHintCancel = document.getElementById('btn-hint-cancel');
const btnHintBuy = document.getElementById('btn-hint-buy');

wallpaperEl.style.background = theme.gradient;

/** 购买完成后从详情页带回 unlocked=1，写入本地状态 */
if (params.get('unlocked') === '1') {
  sessionStorage.setItem(UNLOCK_KEY_PREFIX + theme.id, '1');
}

function isUnlocked() {
  if (!theme.paid) return true;
  return sessionStorage.getItem(UNLOCK_KEY_PREFIX + theme.id) === '1';
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

  // 付费且未购买 → 购买提示；免费或已购买 → 直接应用
  if (theme.paid && !isUnlocked()) {
    showPurchaseHint();
    return;
  }

  startApplying();
});

btnHintCancel.addEventListener('click', hidePurchaseHint);

btnHintBuy.addEventListener('click', () => {
  const q = new URLSearchParams({ id: theme.id });
  window.location.href = `store-detail.html?${q.toString()}`;
});

modalPurchaseHint.addEventListener('click', (e) => {
  if (e.target === modalPurchaseHint) hidePurchaseHint();
});

btnCancel.addEventListener('click', () => {
  if (isApplying) return;
  window.location.href = 'index.html';
});
