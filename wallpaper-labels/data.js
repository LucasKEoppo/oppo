/**
 * 壁纸栏目数据配置
 * 规则：绿野闲行 → 免费，其余栏目 → 付费
 */
export const FREE_CATEGORY = '绿野闲行';

export const wallpaperCategories = [
  {
    id: 'lvyexianxing',
    name: '绿野闲行',
    count: 13,
    wallpapers: [
      { id: 'ly-1', color: '#6B9E4E' },
      { id: 'ly-2', color: '#4A8B6F' },
      { id: 'ly-3', color: '#7CB342' },
      { id: 'ly-4', color: '#558B2F' },
      { id: 'ly-5', color: '#689F38' },
    ],
  },
  {
    id: 'qingkongmanxing',
    name: '青空漫行',
    count: 10,
    wallpapers: [
      { id: 'qk-1', color: '#64B5F6' },
      { id: 'qk-2', color: '#42A5F5' },
      { id: 'qk-3', color: '#29B6F6' },
      { id: 'qk-4', color: '#4FC3F7' },
      { id: 'qk-5', color: '#81D4FA' },
    ],
  },
  {
    id: 'huancaihuazhan',
    name: '幻彩花绽',
    count: 10,
    wallpapers: [
      { id: 'hc-1', color: '#AB47BC' },
      { id: 'hc-2', color: '#EC407A' },
      { id: 'hc-3', color: '#7E57C2' },
      { id: 'hc-4', color: '#5C6BC0' },
      { id: 'hc-5', color: '#EF5350' },
    ],
  },
];

/** 根据栏目名称判断是否为免费 */
export function isFreeCategory(categoryName) {
  return categoryName === FREE_CATEGORY;
}

/** 获取标识文案 */
export function getPriceLabel(categoryName) {
  return isFreeCategory(categoryName) ? '免费' : '付费';
}

/** 获取标识样式类名 */
export function getPriceBadgeClass(categoryName) {
  return isFreeCategory(categoryName) ? 'badge-free' : 'badge-paid';
}
