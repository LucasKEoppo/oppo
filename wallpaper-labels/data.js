/**
 * 壁纸资源列表
 * - brush: 左上角小刷子
 * - paid: 刷子 +「付费」胶囊（仅部分资源）
 * - download: 右下角下载图标
 * 缩略图统一蓝色系
 */
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
    id: 'shanzhidao',
    name: '山之道',
    count: 3,
    wallpapers: [
      { id: 'sz-1', color: BLUE[5], brush: false, paid: false, download: false },
      { id: 'sz-2', color: BLUE[6], brush: false, paid: false, download: true },
      { id: 'sz-3', color: BLUE[7], brush: false, paid: false, download: true },
    ],
  },
  {
    id: 'qingchuanluqi',
    name: '清川鹭起',
    count: 6,
    wallpapers: [
      { id: 'qc-1', color: BLUE[0], brush: true, paid: true, download: false },
      { id: 'qc-2', color: BLUE[2], brush: true, paid: false, download: false },
      { id: 'qc-3', color: BLUE[4], brush: true, paid: false, download: false },
      { id: 'qc-4', color: BLUE[5], brush: true, paid: true, download: false },
      { id: 'qc-5', color: BLUE[7], brush: true, paid: false, download: false },
      { id: 'qc-6', color: BLUE[8], brush: true, paid: false, download: false },
    ],
  },
  {
    id: 'zhanfang',
    name: '绽放',
    count: 5,
    wallpapers: [
      { id: 'zf-1', color: BLUE[1], brush: false, paid: false, download: false },
      { id: 'zf-2', color: BLUE[3], brush: false, paid: false, download: false },
      { id: 'zf-3', color: BLUE[6], brush: false, paid: false, download: false },
      { id: 'zf-4', color: BLUE[8], brush: false, paid: false, download: false },
      { id: 'zf-5', color: BLUE[9], brush: false, paid: false, download: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    count: 9,
    wallpapers: [
      { id: 'cl-1', color: BLUE[0], brush: false, paid: false, download: false },
      { id: 'cl-2', color: BLUE[3], brush: false, paid: false, download: false },
      { id: 'cl-3', color: BLUE[6], brush: false, paid: false, download: false },
    ],
  },
];
