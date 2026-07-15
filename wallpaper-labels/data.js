/**
 * 壁纸栏目数据配置
 * 规则：清川鹭起 → 付费标识；所有栏目资源均展示右下角下载按钮与名称
 */
export const PAID_CATEGORIES = ['清川鹭起'];

export const wallpaperCategories = [
  {
    id: 'liuguangyicai',
    name: '流光溢彩',
    count: 9,
    wallpapers: [
      { id: 'lg-1', title: '赤焰环影', color: '#E85D4C' },
      { id: 'lg-2', title: '青岚流转', color: '#4ECDC4' },
      { id: 'lg-3', title: '紫霞光晕', color: '#9B59B6' },
      { id: 'lg-4', title: '金晖跃动', color: '#F39C12' },
      { id: 'lg-5', title: '碧空波光', color: '#3498DB' },
    ],
  },
  {
    id: 'shanzhidao',
    name: '山之道',
    count: 3,
    wallpapers: [
      { id: 'sz-1', title: '雾锁山峦', color: '#5D6D7E' },
      { id: 'sz-2', title: '远峰静默', color: '#7F8C8D' },
      { id: 'sz-3', title: '岩影晨光', color: '#566573' },
    ],
  },
  {
    id: 'qingchuanluqi',
    name: '清川鹭起',
    count: 6,
    wallpapers: [
      { id: 'qc-1', title: '鹭起清波', color: '#6B9E8E' },
      { id: 'qc-2', title: '水岸薄烟', color: '#7BA7C9' },
      { id: 'qc-3', title: '浮光掠影', color: '#8EC5D6' },
      { id: 'qc-4', title: '芦花浅水', color: '#5A8A9A' },
      { id: 'qc-5', title: '青荇微澜', color: '#A8C4A0' },
      { id: 'qc-6', title: '江天一色', color: '#4A7C8C' },
    ],
  },
  {
    id: 'zhanfang',
    name: '绽放',
    count: 5,
    wallpapers: [
      { id: 'zf-1', title: '金色菊花', color: '#E74C3C' },
      { id: 'zf-2', title: '白色马蹄莲', color: '#F5B7B1' },
      { id: 'zf-3', title: '红色郁金香', color: '#F1948A' },
      { id: 'zf-4', title: '粉荷初开', color: '#C0392B' },
      { id: 'zf-5', title: '琥珀花影', color: '#E67E22' },
    ],
  },
];

/** 获取标识文案 */
export function getPriceLabel() {
  return '付费';
}

/** 获取标识样式类名 */
export function getPriceBadgeClass() {
  return 'badge-paid';
}

/** 是否展示价格标识 */
export function shouldShowPriceBadge(categoryName) {
  return PAID_CATEGORIES.includes(categoryName);
}

/** 是否展示右下角下载按钮 */
export function shouldShowDownloadIcon() {
  return true;
}
