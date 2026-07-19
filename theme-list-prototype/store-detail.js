import { themeSections } from './data.js';

const UNLOCK_KEY_PREFIX = 'theme-unlocked:';

const params = new URLSearchParams(window.location.search);
const themeId = params.get('id');

const allThemes = themeSections.flatMap((s) => s.themes);
const theme = allThemes.find((t) => t.id === themeId) || allThemes[0];

const previewArt = document.getElementById('preview-art');
const resourceName = document.getElementById('resource-name');
const btnBack = document.getElementById('btn-back');
const btnBuy = document.getElementById('btn-buy');
const btnFree = document.getElementById('btn-free');
const modalBuy = document.getElementById('modal-buy');
const btnBuyCancel = document.getElementById('btn-buy-cancel');
const btnBuyConfirm = document.getElementById('btn-buy-confirm');

previewArt.style.background = theme.gradient;
resourceName.textContent = 'little emoji';

function returnToEdit(unlocked) {
  const q = new URLSearchParams({ id: theme.id });
  if (unlocked) q.set('unlocked', '1');
  window.location.href = `edit.html?${q.toString()}`;
}

function completePurchase() {
  sessionStorage.setItem(UNLOCK_KEY_PREFIX + theme.id, '1');
  returnToEdit(true);
}

btnBack.addEventListener('click', () => returnToEdit(false));

btnBuy.addEventListener('click', () => {
  modalBuy.classList.remove('hidden');
});

btnBuyCancel.addEventListener('click', () => {
  modalBuy.classList.add('hidden');
});

btnBuyConfirm.addEventListener('click', completePurchase);

/** 免费领：原型中同样视为完成获取并返回编辑页 */
btnFree.addEventListener('click', completePurchase);

modalBuy.addEventListener('click', (e) => {
  if (e.target === modalBuy) modalBuy.classList.add('hidden');
});
