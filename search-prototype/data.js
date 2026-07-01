/**
 * 资源类型配置
 * 从搜索入口传入 type 参数，决定提示词、热词和搜索结果范围
 */
export const RESOURCE_TYPES = {
  wallpaper: {
    id: 'wallpaper',
    name: '壁纸',
    placeholder: '搜索壁纸',
    history: ['官方', '简约壁纸', '风景', '动漫', '星空'],
    hotSearch: [
      { word: '简约', hot: true },
      { word: '风景', hot: false },
      { word: '动漫', hot: false },
      { word: '星空', hot: true },
      { word: 'ins风', hot: false },
      { word: '治愈', hot: false },
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
    officialResources: [
      { id: 'official-1', color: '#546E7A' },
      { id: 'official-2', color: '#78909C' },
      { id: 'official-3', color: '#607D8B' },
    ],
  },
  theme: {
    id: 'theme',
    name: '主题',
    placeholder: '搜索主题',
    history: ['却步全局主题', '苹果主题', '全局主题', '简约主题'],
    hotSearch: [
      { word: '苹果主题', hot: true },
      { word: '全局主题', hot: false },
      { word: '简约', hot: false },
      { word: '可爱', hot: true },
      { word: 'ins风', hot: false },
      { word: '深色模式', hot: false },
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
    officialResources: [
      { id: 'official-1', color: '#455A64' },
      { id: 'official-2', color: '#37474F' },
    ],
  },
  icon: {
    id: 'icon',
    name: '图标',
    placeholder: '图标',
    history: ['图标', '苹果图标', '扁平图标', '可爱图标'],
    hotSearch: [
      { word: '图标', hot: true },
      { word: '苹果图标', hot: false },
      { word: '扁平', hot: false },
      { word: '可爱', hot: true },
      { word: '简约', hot: false },
      { word: '3D', hot: false },
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
    officialResources: [
      { id: 'official-1', color: '#90A4AE' },
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

/** 官方资源检索关键词 */
export const OFFICIAL_KEYWORD = '官方';

/** 判断搜索词是否命中官方资源 */
export function isOfficialSearch(query) {
  return query.trim().includes(OFFICIAL_KEYWORD);
}

/** 将官方资源转为搜索结果项 */
function toOfficialResultItem(item) {
  return {
    ...item,
    isOfficial: true,
    title: '官方资源',
    showPrice: true,
    price: '免费',
  };
}

/** 将普通资源转为搜索结果项 */
function toNormalResultItem(item) {
  return { ...item, isOfficial: false };
}

/**
 * 根据搜索词返回结果列表
 * - 命中「官方」关键词：返回该类型下的官方资源
 * - 其他关键词：返回匹配的普通资源（标题包含搜索词）
 */
export function searchResources(typeId, query) {
  const type = getResourceType(typeId);
  const q = query.trim();

  if (isOfficialSearch(q)) {
    return (type.officialResources || []).map(toOfficialResultItem);
  }

  return type.results
    .filter((item) => !q || item.title.includes(q))
    .map(toNormalResultItem);
}
