/**
 * 锁屏付费资源交互原型
 *
 * 流程：
 *   锁屏页 → 点击「应用」→ 付费资源弹窗
 *   付费资源弹窗 → 「购买」→ 购买方式弹窗
 *   付费资源弹窗 → 「做任务免费领」→ 免费领弹窗
 *   各弹窗 → 「取消」→ 关闭弹窗
 */

const RESOURCE_NAME = '风来啦全局';

const modalPaid = document.getElementById('modal-paid');
const modalPurchase = document.getElementById('modal-purchase');
const modalFree = document.getElementById('modal-free');

document.getElementById('resource-name').textContent = `"${RESOURCE_NAME}"`;

function showModal(modal, asSheet = false) {
  modal.classList.remove('hidden');
  if (asSheet) {
    modal.classList.add('sheet-mode');
  } else {
    modal.classList.remove('sheet-mode');
  }
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

function hideAllModals() {
  [modalPaid, modalPurchase, modalFree].forEach(hideModal);
}

// 屏幕1 → 屏幕2：点击「应用」
document.getElementById('btn-apply').addEventListener('click', () => {
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

// 占位交互
document.getElementById('btn-open-vip').addEventListener('click', () => {
  alert('原型演示：支付流程');
});

document.getElementById('btn-earn-coins').addEventListener('click', () => {
  alert('原型演示：跳转赚金币任务页');
});

document.getElementById('btn-rules').addEventListener('click', () => {
  alert('原型演示：查看活动规则');
});

document.getElementById('btn-lock-cancel').addEventListener('click', () => {
  hideAllModals();
});
