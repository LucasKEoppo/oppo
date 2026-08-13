/** 当前编辑态中待解锁的资源（单个壁纸） */
export const pendingPaidResources = [
  {
    id: 'wp-1',
    name: '神烦鸟 整理仪表',
    type: '壁纸',
    coinPrice: 1.0,
    gradient: 'linear-gradient(165deg, #01579B 0%, #0288D1 50%, #4FC3F7 100%)',
  },
];

export const VIP_PRICE = 4;
export const VIP_ORIGIN_PRICE = 15;
export const DIRECT_BUY_PRICE = 1.0;
export const TOTAL_COINS = 100;

export function getPendingResources(resources) {
  return resources.filter((item) => !item.unlocked);
}
