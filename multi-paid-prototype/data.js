/** 当前编辑态中待解锁的付费资源 */
export const pendingPaidResources = [
  {
    id: 'wp-1',
    name: '风来啦全局',
    type: '壁纸',
    price: 6.0,
    gradient: 'linear-gradient(165deg, #87CEEB 0%, #4A7C8C 50%, #90EE90 100%)',
    coinCost: 300,
    unlocked: false,
  },
  {
    id: 'ic-1',
    name: '山海图标包',
    type: '图标',
    price: 6.0,
    gradient: 'linear-gradient(165deg, #5D6D7E 0%, #2C3E50 100%)',
    coinCost: 300,
    unlocked: false,
  },
];

export const VIP_PRICE = 3.8;
export const VIP_ORIGIN_PRICE = 15;
export const USER_COINS = 110;

export function getTotalPrice(resources) {
  return resources.reduce((sum, item) => sum + item.price, 0);
}

export function getTotalCoinCost(resources) {
  return resources.reduce((sum, item) => sum + item.coinCost, 0);
}

export function getPendingResources(resources) {
  return resources.filter((item) => !item.unlocked);
}
