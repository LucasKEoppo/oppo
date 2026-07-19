/**
 * 壁纸栏目数据配置
 * 规则：清川鹭起 → 付费标识；所有栏目资源均展示右下角下载按钮
 * 缩略图统一蓝色系，保证原型视觉一致
 */
export const PAID_CATEGORIES = ['清川鹭起'];

const BLUE = [
  '#0D47A1',
  '#1565C0',
  '#1976D2',
  '#1E88E5',
  '#2196F3',
  '#0277BD',
  '#0288D1',
  '#42A5F5',
  '#01579B',
  '#64B5F6',
];

export const wallpaperCategories = [
  {
    id: 'liuguangyicai',
    name: '流光溢彩',
    count: 9,
    wallpapers: [
      { id: 'lg-1', color: BLUE[0] },
      { id: 'lg-2', color: BLUE[1] },
      { id: 'lg-3', color: BLUE[2] },
      { id: 'lg-4', color: BLUE[3] },
      { id: 'lg-5', color: BLUE[4] },
    ],
  },
  {
    id: 'shanzhidao',
    name: '山之道',
    count: 3,
    wallpapers: [
      { id: 'sz-1', color: BLUE[5] },
      { id: 'sz-2', color: BLUE[6] },
      { id: 'sz-3', color: BLUE[7] },
    ],
  },
  {
    id: 'qingchuanluqi',
    name: '清川鹭起',
    count: 6,
    wallpapers: [
      { id: 'qc-1', color: BLUE[0] },
      { id: 'qc-2', color: BLUE[2] },
      { id: 'qc-3', color: BLUE[4] },
      { id: 'qc-4', color: BLUE[5] },
      { id: 'qc-5', color: BLUE[7] },
      { id: 'qc-6', color: BLUE[8] },
    ],
  },
  {
    id: 'zhanfang',
    name: '绽放',
    count: 5,
    wallpapers: [
      { id: 'zf-1', color: BLUE[1] },
      { id: 'zf-2', color: BLUE[3] },
      { id: 'zf-3', color: BLUE[6] },
      { id: 'zf-4', color: BLUE[8] },
      { id: 'zf-5', color: BLUE[9] },
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
