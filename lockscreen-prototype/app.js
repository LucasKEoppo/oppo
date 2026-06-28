/**
 * 锁屏付费资源交互原型
 *
 * 流程：
 *   锁屏页 → 点击「应用」→ 付费资源弹窗（未解锁时）
 *   付费资源弹窗 → 「购买」→ 购买方式弹窗 → 解锁 → 转圈应用
 *   付费资源弹窗 → 「做任务免费领」→ 免费领弹窗 → 解锁 → 转圈应用
 *   已解锁 → 点击「应用」→ 转圈应用
 */

const RESOURCE_NAME = '风来啦全局';
const APPLY_DURATION_MS = 2500;
const RING_CIRCUMFERENCE = 2 * Math.PI * 34; // r=34

let resourceUnlocked = false;
let isApplying = false;

const modalPaid = document.getElementById('modal-paid');
const modalPurchase = document.getElementById('modal-purchase');
const modalFree = document.getElementById('modal-free');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingProgress = document.getElementById('loading-progress');
const btnApply = document.getElementById('btn-apply');

document.getElementById('resource-name').textContent = `"${RESOURCE_NAME}"`;
loadingProgress.style.strokeDasharray = RING_CIRCUMFERENCE;
loadingProgress.style.strokeDashoffset = RING_CIRCUMFERENCE;

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
  loadingProgress.style.strokeDashoffset = RING_CIRCUMFERENCE;
  loadingOverlay.classList.remove('hidden');
  btnApply.classList.add('loading');
}

function hideLoading() {
  loadingOverlay.classList.add('hidden');
  btnApply.classList.remove('loading');
}

function updateRingProgress(percent) {
  const offset = RING_CIRCUMFERENCE * (1 - percent / 100);
  loadingProgress.style.strokeDashoffset = offset;
}

/**
 * 模拟解锁后应用资源，展示转圈 + 环形进度
 */
function startApplying(onComplete) {
  if (isApplying) return;
  isApplying = true;

  hideAllModals();
  showLoading();

  const startTime = Date.now();

  const tick = () => {
    const elapsed = Date.now() - startTime;
    const percent = Math.min(100, (elapsed / APPLY_DURATION_MS) * 100);
    updateRingProgress(percent);

    if (elapsed < APPLY_DURATION_MS) {
      requestAnimationFrame(tick);
    } else {
      resourceUnlocked = true;
      hideLoading();
      isApplying = false;
      btnApply.textContent = '已应用';
      btnApply.classList.add('applied');
      if (onComplete) onComplete();
    }
  };

  requestAnimationFrame(tick);
}

// 屏幕1 → 屏幕2 或 直接应用
btnApply.addEventListener('click', () => {
  if (isApplying) return;

  if (resourceUnlocked) {
    startApplying();
    return;
  }

  hideAllModals();
  showModal(modalPaid);
});

// 屏幕2 → 屏幕3：点击「购买」
document.getElementById('btn-buy').addEventListener('click', () => {
  hideModal(modalPaid);
  showModal(modalPurchase, true);
});

// 屏幕2 → 屏幕4：点击「做任务免费领」
document.getElementById('btn-free-task').addEventListener('click', () => {
  hideModal(modalPaid);
  showModal(modalFree, true);
});

// 屏幕2：点击「取消」
document.getElementById('btn-paid-cancel').addEventListener('click', () => {
  hideModal(modalPaid);
});

// 屏幕3：点击「取消」
document.getElementById('btn-purchase-cancel').addEventListener('click', () => {
  hideModal(modalPurchase);
});

// 屏幕4：点击「取消」
document.getElementById('btn-free-cancel').addEventListener('click', () => {
  hideModal(modalFree);
});

// 点击遮罩关闭弹窗
[modalPaid, modalPurchase, modalFree].forEach((modal) => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal(modal);
  });
});

// 购买方式：选项切换
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

// 购买完成 → 解锁并应用（转圈进度）
document.getElementById('btn-open-vip').addEventListener('click', () => {
  startApplying();
});

// 赚金币免费兑 → 解锁并应用（原型模拟金币已够）
document.getElementById('btn-earn-coins').addEventListener('click', () => {
  startApplying();
});

document.getElementById('btn-rules').addEventListener('click', () => {
  alert('原型演示：查看活动规则');
});

document.getElementById('btn-lock-cancel').addEventListener('click', () => {
  hideAllModals();
});
