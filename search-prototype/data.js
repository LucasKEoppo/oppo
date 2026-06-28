/**
 * 资源类型配置
 * 从搜索入口传入 type 参数，决定提示词、热词和搜索结果范围
 */
export const RESOURCE_TYPES = {
  wallpaper: {
    id: 'wallpaper',
    name: '壁纸',
    placeholder: '搜索壁纸',
    history: ['简约壁纸', '风景', '动漫', '星空'],
    hotComprehensive: [
      { rank: 1, word: '简约', heat: '1008 万热度' },
      { rank: 2, word: '风景', heat: '365 万热度' },
      { rank: 3, word: '动漫', heat: '298 万热度' },
      { rank: 4, word: '星空', heat: '256 万热度' },
      { rank: 5, word: 'ins风', heat: '198 万热度' },
      { rank: 6, word: '治愈', heat: '176 万热度' },
      { rank: 7, word: '可爱', heat: '152 万热度' },
      { rank: 8, word: '文字', heat: '128 万热度' },
    ],
    hotRising: [
      { rank: 1, word: '火影忍者', heat: '33 万热度' },
      { rank: 2, word: '蜡笔小新', heat: '28 万热度' },
      { rank: 3, word: '小猫主题', heat: '25 万热度' },
      { rank: 4, word: '可爱', heat: '22 万热度' },
      { rank: 5, word: '小猫', heat: '20 万热度' },
      { rank: 6, word: '蓝色主题', heat: '18 万热度' },
      { rank: 7, word: '鬼灭之刃', heat: '16 万热度' },
      { rank: 8, word: '赛博朋克', heat: '14 万热度' },
    ],
    results: [
      { id: 1, title: '简约 OS', price: '1.0 可币', vip: true, tag: '畅销', color: '#E8DDD4' },
      { id: 2, title: '简约ins幸运四叶草', price: '免费', vip: false, color: '#C5E1A5' },
      { id: 3, title: '山海相见 简约', price: '6.0 可币', vip: true, color: '#B3E5FC' },
      { id: 4, title: '简约线条', price: '免费', vip: false, color: '#F0F0F0' },
      { id: 5, title: '极简黑白', price: '3.0 可币', vip: true, color: '#424242' },
      { id: 6, title: '简约渐变', price: '免费', vip: false, color: '#FFCCBC' },
      { id: 7, title: '莫兰迪简约', price: '2.0 可币', vip: true, color: '#D7CCC8' },
      { id: 8, title: '简约几何', price: '免费', vip: false, color: '#B2DFDB' },
      { id: 9, title: '简约花卉', price: '4.0 可币', vip: true, tag: '优质', color: '#F8BBD0' },
    ],
  },
  theme: {
    id: 'theme',
    name: '主题',
    placeholder: '搜索主题',
    history: ['却步全局主题', '苹果主题', '全局主题', '简约主题'],
    hotComprehensive: [
      { rank: 1, word: '苹果主题', heat: '1008 万热度' },
      { rank: 2, word: '全局主题', heat: '365 万热度' },
      { rank: 3, word: '图标', heat: '298 万热度' },
      { rank: 4, word: '简约', heat: '256 万热度' },
      { rank: 5, word: '可爱', heat: '198 万热度' },
      { rank: 6, word: 'ins风', heat: '176 万热度' },
      { rank: 7, word: '深色模式', heat: '152 万热度' },
      { rank: 8, word: '扁平化', heat: '128 万热度' },
    ],
    hotRising: [
      { rank: 1, word: '火影忍者', heat: '33 万热度' },
      { rank: 2, word: '蜡笔小新', heat: '28 万热度' },
      { rank: 3, word: '小猫主题', heat: '25 万热度' },
      { rank: 4, word: '可爱', heat: '22 万热度' },
      { rank: 5, word: '小猫', heat: '20 万热度' },
      { rank: 6, word: '键盘皮肤', heat: '18 万热度' },
      { rank: 7, word: '蓝色主题', heat: '16 万热度' },
      { rank: 8, word: '鬼灭之刃', heat: '14 万热度' },
    ],
    results: [
      { id: 1, title: '山海相见 简约', price: '6.0 可币', vip: true, tag: '热门', color: '#81D4FA' },
      { id: 2, title: '苹果拟态主题', price: '免费', vip: false, color: '#E0E0E0' },
      { id: 3, title: '全局简约白', price: '8.0 可币', vip: true, color: '#FAFAFA' },
      { id: 4, title: '可爱猫咪', price: '3.0 可币', vip: true, color: '#FFE0B2' },
      { id: 5, title: '深色极简', price: '免费', vip: false, color: '#37474F' },
      { id: 6, title: 'ins风主题', price: '5.0 可币', vip: true, color: '#F5F5F5' },
      { id: 7, title: '莫兰迪配色', price: '4.0 可币', vip: true, tag: '优质', color: '#BCAAA4' },
      { id: 8, title: '扁平化主题', price: '免费', vip: false, color: '#4FC3F7' },
      { id: 9, title: '赛博朋克', price: '6.0 可币', vip: true, color: '#7C4DFF' },
    ],
  },
  icon: {
    id: 'icon',
    name: '图标',
    placeholder: '图标',
    history: ['图标', '苹果图标', '扁平图标', '可爱图标'],
    hotComprehensive: [
      { rank: 1, word: '图标', heat: '856 万热度' },
      { rank: 2, word: '苹果图标', heat: '432 万热度' },
      { rank: 3, word: '扁平', heat: '298 万热度' },
      { rank: 4, word: '可爱', heat: '256 万热度' },
      { rank: 5, word: '简约', heat: '198 万热度' },
      { rank: 6, word: '3D', heat: '176 万热度' },
      { rank: 7, word: '拟态', heat: '152 万热度' },
      { rank: 8, word: '手绘', heat: '128 万热度' },
    ],
    hotRising: [
      { rank: 1, word: '蜡笔小新', heat: '33 万热度' },
      { rank: 2, word: '小猫', heat: '28 万热度' },
      { rank: 3, word: '火影忍者', heat: '25 万热度' },
      { rank: 4, word: '可爱', heat: '22 万热度' },
      { rank: 5, word: '蓝色', heat: '20 万热度' },
      { rank: 6, word: '绿色', heat: '18 万热度' },
      { rank: 7, word: '粉色', heat: '16 万热度' },
      { rank: 8, word: '鬼灭之刃', heat: '14 万热度' },
    ],
    results: [
      { id: 1, title: '简约图标包', price: '免费', vip: false, color: '#ECEFF1' },
      { id: 2, title: '苹果拟态图标', price: '3.0 可币', vip: true, color: '#CFD8DC' },
      { id: 3, title: '可爱手绘图标', price: '2.0 可币', vip: true, color: '#FFECB3' },
      { id: 4, title: '扁平彩色图标', price: '免费', vip: false, color: '#B2EBF2' },
      { id: 5, title: '3D立体图标', price: '5.0 可币', vip: true, tag: '热门', color: '#D1C4E9' },
      { id: 6, title: '深色图标包', price: '1.0 可币', vip: true, color: '#455A64' },
      { id: 7, title: 'ins风图标', price: '免费', vip: false, color: '#F5F5F5' },
      { id: 8, title: '莫兰迪图标', price: '4.0 可币', vip: true, color: '#D7CCC8' },
      { id: 9, title: '赛博朋克图标', price: '6.0 可币', vip: true, color: '#651FFF' },
    ],
  },
};

export function getResourceType(typeId) {
  return RESOURCE_TYPES[typeId] || RESOURCE_TYPES.wallpaper;
}

export function getTypeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('type') || 'wallpaper';
}

export function buildResultsUrl(typeId, query) {
  const params = new URLSearchParams({ type: typeId, q: query });
  return `results.html?${params.toString()}`;
}

export function buildSearchUrl(typeId) {
  return typeId === 'wallpaper' ? 'index.html' : `index.html?type=${typeId}`;
}
