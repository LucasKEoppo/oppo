/** 当前编辑态中待解锁的资源 */
export const pendingPaidResources = [
  {
    id: 'ic-1',
    name: '外卖小狗图标',
    type: '图标',
    coinPrice: 3.0,
    gradient: 'linear-gradient(165deg, #FFE082 0%, #FFB74D 100%)',
  },
  {
    id: 'wp-1',
    name: '神烦鸟 整理仪表',
    type: '壁纸',
    coinPrice: 1.0,
    gradient: 'linear-gradient(165deg, #FFF9C4 0%, #FFEE58 100%)',
  },
];

export const VIP_PRICE = 4;
export const VIP_ORIGIN_PRICE = 15;
export const DIRECT_BUY_PRICE = 4.0;
export const TOTAL_COINS = 400;

export function getPendingResources(resources) {
  return resources.filter((item) => !item.unlocked);
}
