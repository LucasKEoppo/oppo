/**
 * 全部灵感主题 - 栏目数据
 * paid: true 时左上角展示「刷子 + 付费」胶囊，否则仅刷子
 */
export const themeSections = [
  {
    id: 'live-clock',
    title: 'Live 时钟',
    subtitle: '在时间的缝隙里捕捉光阴',
    themes: [
      { id: 'lc-1', paid: true, gradient: 'linear-gradient(165deg, #1a1a2e 0%, #4a3f6b 45%, #c9a87c 100%)' },
      { id: 'lc-2', paid: false, gradient: 'linear-gradient(165deg, #0d1b2a 0%, #1b4965 50%, #bee9e8 100%)' },
      { id: 'lc-3', paid: true, gradient: 'linear-gradient(165deg, #2b2d42 0%, #8d99ae 55%, #edf2f4 100%)' },
    ],
  },
  {
    id: 'seize-now',
    title: '趁现在',
    subtitle: '尽兴而活，就趁现在',
    themes: [
      { id: 'sn-1', paid: false, gradient: 'linear-gradient(165deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)' },
      { id: 'sn-2', paid: true, gradient: 'linear-gradient(165deg, #5f27cd 0%, #341f97 40%, #c8d6e5 100%)' },
      { id: 'sn-3', paid: false, gradient: 'linear-gradient(165deg, #222f3e 0%, #576574 50%, #c8d6e5 100%)' },
    ],
  },
  {
    id: 'with-light',
    title: '与光同行者',
    subtitle: '每个追光瞬间都彰显独特生命力',
    themes: [
      { id: 'wl-1', paid: true, gradient: 'linear-gradient(165deg, #f9ca24 0%, #f0932b 40%, #eb4d4b 100%)' },
      { id: 'wl-2', paid: false, gradient: 'linear-gradient(165deg, #6ab04c 0%, #badc58 45%, #f6e58d 100%)' },
      { id: 'wl-3', paid: true, gradient: 'linear-gradient(165deg, #30336b 0%, #686de0 50%, #dff9fb 100%)' },
    ],
  },
];
