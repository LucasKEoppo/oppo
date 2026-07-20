import {
  pendingPaidResources,
  VIP_PRICE,
  VIP_ORIGIN_PRICE,
  DIRECT_BUY_PRICE,
  TOTAL_COINS,
  getPendingResources,
} from './data.js';

const APPLY_DURATION_MS = 2500;

let resources = pendingPaidResources.map((item) => ({ ...item, unlocked: false }));
let isApplying = false;

const screenDesktop = document.getElementById('screen-desktop');
const screenAcquire = document.getElementById('screen-acquire');
const dialogInfo = document.getElementById('dialog-info');
const loadingOverlay = document.getElementById('loading-overlay');
const btnApply = document.getElementById('btn-apply');

function getPending() {
  return getPendingResources(resources);
}

function showAcquire() {
  screenDesktop.classList.remove('active');
  screenAcquire.classList.add('active');
}

function hideAcquire() {
  screenAcquire.classList.remove('active');
  screenDesktop.classList.add('active');
}

function showDialog() {
  dialogInfo.classList.remove('hidden');
}

function hideDialog() {
  dialogInfo.classList.add('hidden');
}

function hideAll() {
  hideAcquire();
  hideDialog();
}

function showLoading() {
  loadingOverlay.classList.remove('hidden');
  btnApply.classList.add('loading');
}

function hideLoading() {
  loadingOverlay.classList.add('hidden');
  btnApply.classList.remove('loading');
}

function renderResourceList() {
  const pending = getPending();

  document.getElementById('resource-list').innerHTML = pending
    .map(
      (item) => `
      <div class="resource-row">
        <div class="resource-thumb wallpaper-thumb" style="background: ${item.gradient}"></div>
        <div class="resource-meta">
          <span class="resource-type">${item.type}</span>
          <span class="resource-name">${item.name}</span>
          <span class="resource-price-line">
            <strong>${item.coinPrice.toFixed(1)}</strong> 可币
            <span class="vip-free-tag">VIP 免费</span>
          </span>
        </div>
      </div>`
    )
    .join('');
}

function startApplying() {
  if (isApplying) return;
  isApplying = true;

  hideAll();
  showLoading();

  setTimeout(() => {
    resources = resources.map((item) => ({ ...item, unlocked: true }));
    hideLoading();
    isApplying = false;
    btnApply.textContent = '已应用';
    btnApply.classList.add('applied');
    renderResourceList();
  }, APPLY_DURATION_MS);
}

function handleBuyClick() {
  if (isApplying) return;

  if (getPending().length === 0) {
    startApplying();
    return;
  }

  hideDialog();
  renderResourceList();
  showAcquire();
}

btnApply.addEventListener('click', handleBuyClick);

document.getElementById('btn-info').addEventListener('click', showDialog);

document.getElementById('btn-info-ok').addEventListener('click', hideDialog);

document.getElementById('btn-vip').addEventListener('click', startApplying);

document.getElementById('btn-direct-buy').addEventListener('click', startApplying);

document.getElementById('btn-coin-exchange').addEventListener('click', startApplying);

document.getElementById('btn-cancel').addEventListener('click', hideAll);

dialogInfo.addEventListener('click', (e) => {
  if (e.target === dialogInfo) hideDialog();
});

document.getElementById('vip-price').textContent = VIP_PRICE;
document.getElementById('vip-origin').textContent = VIP_ORIGIN_PRICE;
document.getElementById('direct-price').textContent = `¥${DIRECT_BUY_PRICE.toFixed(1)}`;
document.getElementById('coin-total').textContent = TOTAL_COINS;

renderResourceList();
