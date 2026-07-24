import { findWallpaper } from './data.js';

const UNLOCK_KEY_PREFIX = 'wallpaper-unlocked:';

const params = new URLSearchParams(window.location.search);
const wallpaperId = params.get('id');
const { wallpaper } = findWallpaper(wallpaperId);

const hero = document.getElementById('hero');
const resourceName = document.getElementById('resource-name');
const btnBack = document.getElementById('btn-back');
const btnBuy = document.getElementById('btn-buy');
const btnFree = document.getElementById('btn-free');
const modalBuy = document.getElementById('modal-buy');
const btnBuyCancel = document.getElementById('btn-buy-cancel');
const btnBuyConfirm = document.getElementById('btn-buy-confirm');

hero.style.background = `linear-gradient(165deg, ${wallpaper.color} 0%, ${wallpaper.color}aa 50%, #0D47A1 100%)`;
resourceName.textContent = '琉璃';

function returnToEdit(unlocked) {
  const q = new URLSearchParams({ id: wallpaper.id });
  if (unlocked) q.set('unlocked', '1');
  window.location.href = `edit.html?${q.toString()}`;
}

function completePurchase() {
  sessionStorage.setItem(UNLOCK_KEY_PREFIX + wallpaper.id, '1');
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

btnFree.addEventListener('click', completePurchase);

modalBuy.addEventListener('click', (e) => {
  if (e.target === modalBuy) modalBuy.classList.add('hidden');
});
