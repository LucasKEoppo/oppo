/**
 * 壁纸栏目数据配置
 * 规则：清川鹭起 → 付费标识；所有栏目资源均展示右下角下载按钮
 */
export const PAID_CATEGORIES = ['清川鹭起'];

export const wallpaperCategories = [
  {
    id: 'liuguangyicai',
    name: '流光溢彩',
    count: 9,
    wallpapers: [
      { id: 'lg-1', color: '#E85D4C' },
      { id: 'lg-2', color: '#4ECDC4' },
      { id: 'lg-3', color: '#9B59B6' },
      { id: 'lg-4', color: '#F39C12' },
      { id: 'lg-5', color: '#3498DB' },
    ],
  },
  {
    id: 'shanzhidao',
    name: '山之道',
    count: 3,
    wallpapers: [
      { id: 'sz-1', color: '#5D6D7E' },
      { id: 'sz-2', color: '#7F8C8D' },
      { id: 'sz-3', color: '#566573' },
    ],
  },
  {
    id: 'qingchuanluqi',
    name: '清川鹭起',
    count: 6,
    wallpapers: [
      { id: 'qc-1', color: '#6B9E8E' },
      { id: 'qc-2', color: '#7BA7C9' },
      { id: 'qc-3', color: '#8EC5D6' },
      { id: 'qc-4', color: '#5A8A9A' },
      { id: 'qc-5', color: '#A8C4A0' },
      { id: 'qc-6', color: '#4A7C8C' },
    ],
  },
  {
    id: 'zhanfang',
    name: '绽放',
    count: 5,
    wallpapers: [
      { id: 'zf-1', color: '#E74C3C' },
      { id: 'zf-2', color: '#F5B7B1' },
      { id: 'zf-3', color: '#F1948A' },
      { id: 'zf-4', color: '#C0392B' },
      { id: 'zf-5', color: '#E67E22' },
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
