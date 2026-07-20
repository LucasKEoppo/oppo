/**
 * 全部灵感主题 - 栏目数据
 * paid: true 时左上角展示「刷子 + 付费」胶囊，否则仅刷子
 * 缩略图统一蓝色系，保证原型视觉一致
 */
const BLUE = [
  'linear-gradient(165deg, #0D47A1 0%, #1976D2 50%, #64B5F6 100%)',
  'linear-gradient(165deg, #01579B 0%, #0288D1 45%, #4FC3F7 100%)',
  'linear-gradient(165deg, #1565C0 0%, #1E88E5 50%, #90CAF9 100%)',
  'linear-gradient(165deg, #0A3D91 0%, #1565C0 55%, #42A5F5 100%)',
  'linear-gradient(165deg, #0277BD 0%, #039BE5 50%, #81D4FA 100%)',
  'linear-gradient(165deg, #0D47A1 0%, #2196F3 55%, #BBDEFB 100%)',
  'linear-gradient(165deg, #003C8F 0%, #1565C0 45%, #5C9CE6 100%)',
  'linear-gradient(165deg, #01579B 0%, #00ACC1 50%, #80DEEA 100%)',
  'linear-gradient(165deg, #1A237E 0%, #1976D2 50%, #64B5F6 100%)',
];

export const themeSections = [
  {
    id: 'live-clock',
    title: 'Live 时钟',
    subtitle: '在时间的缝隙里捕捉光阴',
    themes: [
      { id: 'lc-1', paid: true, gradient: BLUE[0] },
      { id: 'lc-2', paid: false, gradient: BLUE[1] },
      { id: 'lc-3', paid: true, gradient: BLUE[2] },
    ],
  },
  {
    id: 'seize-now',
    title: '趁现在',
    subtitle: '尽兴而活，就趁现在',
    themes: [
      { id: 'sn-1', paid: false, gradient: BLUE[3] },
      { id: 'sn-2', paid: true, gradient: BLUE[4] },
      { id: 'sn-3', paid: false, gradient: BLUE[5] },
    ],
  },
  {
    id: 'with-light',
    title: '与光同行者',
    subtitle: '每个追光瞬间都彰显独特生命力',
    themes: [
      { id: 'wl-1', paid: true, gradient: BLUE[6] },
      { id: 'wl-2', paid: false, gradient: BLUE[7] },
      { id: 'wl-3', paid: true, gradient: BLUE[8] },
    ],
  },
];
