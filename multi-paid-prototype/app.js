import {
  pendingPaidResources,
  USER_COINS,
  getTotalPrice,
  getTotalCoinCost,
  getPendingResources,
} from './data.js';

const APPLY_DURATION_MS = 2500;

let resources = pendingPaidResources.map((item) => ({ ...item }));
let isApplying = false;

const modalMultiPaid = document.getElementById('modal-multi-paid');
const modalPurchase = document.getElementById('modal-purchase');
const modalFree = document.getElementById('modal-free');
const loadingOverlay = document.getElementById('loading-overlay');
const btnApply = document.getElementById('btn-apply');

function formatPrice(value) {
  return `¥${value.toFixed(1)}`;
}

function formatBuyLabel(value) {
  return `¥ ${value.toFixed(1)} 购买`;
}

function getPending() {
  return getPendingResources(resources);
}

function showModal(modal, asSheet = false) {
  modal.classList.remove('hidden');
  modal.classList.toggle('sheet-mode', asSheet);
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function hideAllModals() {
  [modalMultiPaid, modalPurchase, modalFree].forEach(hideModal);
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
  const total = getTotalPrice(pending);

  document.getElementById('multi-count').textContent = pending.length;
  document.getElementById('btn-buy').textContent = formatBuyLabel(total);
  document.getElementById('purchase-total-price').textContent = formatPrice(total);

  document.getElementById('resource-list').innerHTML = pending
    .map(
      (item) => `
      <div class="resource-item">
        <div class="resource-thumb" style="background: ${item.gradient}"></div>
        <div class="resource-info">
          <span class="resource-name">${item.name}</span>
          <span class="resource-type">${item.type}</span>
        </div>
        <span class="resource-price">${formatPrice(item.price)}</span>
      </div>`
    )
    .join('');
}

function renderFreeList() {
  const pending = getPending();
  const totalCoins = getTotalCoinCost(pending);
  const needed = Math.max(0, totalCoins - USER_COINS);
  const progress = Math.min(100, (USER_COINS / totalCoins) * 100);

  document.getElementById('free-multi-list').innerHTML = pending
    .map(
      (item) => `
      <div class="free-item">
        <div class="resource-thumb small" style="background: ${item.gradient}"></div>
        <div class="resource-info">
          <span class="resource-name">${item.name}</span>
          <span class="resource-type">${item.type} · ${item.coinCost} 金币</span>
        </div>
      </div>`
    )
    .join('');

  document.getElementById('coins-needed').textContent = needed;
  document.getElementById('user-coins').textContent = USER_COINS;
  document.getElementById('total-coins').textContent = totalCoins;
  document.getElementById('progress-fill').style.width = `${progress}%`;
  document.getElementById('progress-coin').style.left = `${progress}%`;
}

function startApplying() {
  if (isApplying) return;
  isApplying = true;

  hideAllModals();
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

function handleApplyClick() {
  if (isApplying) return;

  const pending = getPending();
  if (pending.length === 0) {
    startApplying();
    return;
  }

  hideAllModals();
  renderResourceList();
  showModal(modalMultiPaid);
}

btnApply.addEventListener('click', handleApplyClick);

document.getElementById('btn-buy').addEventListener('click', () => {
  hideModal(modalMultiPaid);
  showModal(modalPurchase, true);
  selectPurchaseOption('vip');
});

document.getElementById('btn-free-task').addEventListener('click', () => {
  hideModal(modalMultiPaid);
  renderFreeList();
  showModal(modalFree, true);
});

document.getElementById('btn-multi-cancel').addEventListener('click', () => {
  hideModal(modalMultiPaid);
});

document.getElementById('btn-purchase-cancel').addEventListener('click', () => {
  hideModal(modalPurchase);
});

document.getElementById('btn-free-cancel').addEventListener('click', () => {
  hideModal(modalFree);
});

[modalMultiPaid, modalPurchase, modalFree].forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal(modal);
  });
});

function selectPurchaseOption(option) {
  document.querySelectorAll('.purchase-option').forEach((el) => {
    const isSelected = el.dataset.option === option;
    el.classList.toggle('selected', isSelected);
    el.querySelector('.radio').classList.toggle('checked', isSelected);
  });
  document.getElementById('btn-open-vip').textContent =
    option === 'vip' ? '立即开通' : '立即购买';
}

document.querySelectorAll('.purchase-option').forEach((option) => {
  option.addEventListener('click', () => {
    selectPurchaseOption(option.dataset.option);
  });
});

document.getElementById('btn-open-vip').addEventListener('click', () => {
  startApplying();
});

document.getElementById('btn-earn-coins').addEventListener('click', () => {
  startApplying();
});

document.getElementById('btn-rules').addEventListener('click', () => {
  alert('原型演示：查看活动规则');
});

document.getElementById('btn-lock-cancel').addEventListener('click', () => {
  hideAllModals();
});

renderResourceList();
