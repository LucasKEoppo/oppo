import { currentResource, recommendResources } from './data.js';

const hero = document.getElementById('detail-hero');
const recommendList = document.getElementById('recommend-list');
const btnSet = document.getElementById('btn-set');

const modalPaid = document.getElementById('modal-paid');
const modalPurchase = document.getElementById('modal-purchase');
const modalFree = document.getElementById('modal-free');
const loadingOverlay = document.getElementById('loading-overlay');

const APPLY_DURATION_MS = 2500;

let resourceUnlocked = false;
let isApplying = false;
let activeGradient = currentResource.gradient;

hero.style.background = activeGradient;

document.getElementById('resource-name').textContent = `"${currentResource.title}"`;
document.getElementById('modal-preview').style.background = activeGradient;
document.getElementById('free-thumb').style.background = activeGradient;
document.getElementById('free-thumb-inner').style.background = activeGradient;

recommendList.innerHTML = recommendResources
  .map(
    (item) => `
    <div class="recommend-card" data-id="${item.id}">
      <div class="recommend-thumb" style="background: ${item.gradient}"></div>
      <span class="price-badge badge-paid">付费</span>
    </div>`
  )
  .join('');

function showModal(modal, asSheet = false) {
  modal.classList.remove('hidden');
  modal.classList.toggle('sheet-mode', asSheet);
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function hideAllModals() {
  [modalPaid, modalPurchase, modalFree].forEach(hideModal);
}

function showLoading() {
  loadingOverlay.classList.remove('hidden');
  btnSet.classList.add('loading');
}

function hideLoading() {
  loadingOverlay.classList.add('hidden');
  btnSet.classList.remove('loading');
}

function startApplying() {
  if (isApplying) return;
  isApplying = true;

  hideAllModals();
  showLoading();

  setTimeout(() => {
    resourceUnlocked = true;
    hideLoading();
    isApplying = false;
    btnSet.textContent = '已设置';
    btnSet.classList.add('applied');
  }, APPLY_DURATION_MS);
}

function handleSetClick() {
  if (isApplying) return;

  if (resourceUnlocked) {
    startApplying();
    return;
  }

  hideAllModals();
  showModal(modalPaid);
}

document.getElementById('btn-back').addEventListener('click', () => {
  history.back();
});

btnSet.addEventListener('click', handleSetClick);

document.getElementById('btn-buy').addEventListener('click', () => {
  hideModal(modalPaid);
  showModal(modalPurchase, true);
});

document.getElementById('btn-free-task').addEventListener('click', () => {
  hideModal(modalPaid);
  showModal(modalFree, true);
});

document.getElementById('btn-paid-cancel').addEventListener('click', () => {
  hideModal(modalPaid);
});

document.getElementById('btn-purchase-cancel').addEventListener('click', () => {
  hideModal(modalPurchase);
});

document.getElementById('btn-free-cancel').addEventListener('click', () => {
  hideModal(modalFree);
});

[modalPaid, modalPurchase, modalFree].forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal(modal);
  });
});

document.querySelectorAll('.purchase-option').forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.purchase-option').forEach((o) => {
      o.classList.remove('selected');
      o.querySelector('.radio').classList.remove('checked');
    });
    option.classList.add('selected');
    option.querySelector('.radio').classList.add('checked');

    const isVip = option.dataset.option === 'vip';
    document.getElementById('btn-open-vip').textContent = isVip ? '立即开通' : '立即购买';
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

document.querySelectorAll('.recommend-card').forEach((card) => {
  card.addEventListener('click', () => {
    const item = recommendResources.find((r) => r.id === card.dataset.id);
    if (item) {
      activeGradient = item.gradient;
      hero.style.background = activeGradient;
      document.getElementById('modal-preview').style.background = activeGradient;
      document.getElementById('free-thumb').style.background = activeGradient;
      document.getElementById('free-thumb-inner').style.background = activeGradient;
    }
  });
});
