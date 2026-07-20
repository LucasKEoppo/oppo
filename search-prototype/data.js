/**
 * 资源类型配置
 * 从搜索入口传入 type 参数，决定提示词、热词和搜索结果范围
 */
export const RESOURCE_TYPES = {
  wallpaper: {
    id: 'wallpaper',
    name: '壁纸',
    placeholder: '搜索在线壁纸',
    history: [
      '小星星',
      '简约',
      '王者荣耀',
      '和平精英2.0',
      '小星星',
      '和平精英2.0',
      '简约',
      '官方',
      '星空',
    ],
    hotSearch: [
      { word: '山野清风' },
      { word: '骏马迎春' },
      { word: '二十四节气' },
      { word: '清凉一夏' },
      { word: '猫' },
      { word: '花卉' },
      { word: '落日余晖' },
      { word: '线条小狗' },
      { word: '海贼王' },
      { word: '简约' },
      { word: '星空' },
      { word: '治愈' },
    ],
    results: [
      { id: 1, title: '简约 OS', price: '1.0 可币', vip: true, tag: '畅销', color: '#1565C0' },
      { id: 2, title: '简约ins幸运四叶草', price: '免费', vip: false, color: '#1976D2' },
      { id: 3, title: '山海相见 简约', price: '6.0 可币', vip: true, color: '#1E88E5' },
      { id: 4, title: '简约线条', price: '免费', vip: false, color: '#2196F3' },
      { id: 5, title: '极简黑白', price: '3.0 可币', vip: true, color: '#0D47A1' },
      { id: 6, title: '简约渐变', price: '免费', vip: false, color: '#42A5F5' },
      { id: 7, title: '莫兰迪简约', price: '2.0 可币', vip: true, color: '#0277BD' },
      { id: 8, title: '简约几何', price: '免费', vip: false, color: '#64B5F6' },
      { id: 9, title: '简约花卉', price: '4.0 可币', vip: true, tag: '优质', color: '#0288D1' },
    ],
    officialResources: [
      { id: 'official-1', color: '#01579B' },
      { id: 'official-2', color: '#0277BD' },
      { id: 'official-3', color: '#1565C0' },
    ],
  },
  theme: {
    id: 'theme',
    name: '主题',
    placeholder: '搜索主题',
    history: ['却步全局主题', '苹果主题', '全局主题', '简约主题'],
    hotSearch: [
      { word: '苹果主题' },
      { word: '全局主题' },
      { word: '简约' },
      { word: '可爱' },
      { word: 'ins风' },
      { word: '深色模式' },
    ],
    results: [
      { id: 1, title: '山海相见 简约', price: '6.0 可币', vip: true, tag: '热门', color: '#1565C0' },
      { id: 2, title: '苹果拟态主题', price: '免费', vip: false, color: '#1976D2' },
      { id: 3, title: '全局简约白', price: '8.0 可币', vip: true, color: '#1E88E5' },
      { id: 4, title: '可爱猫咪', price: '3.0 可币', vip: true, color: '#2196F3' },
      { id: 5, title: '深色极简', price: '免费', vip: false, color: '#0D47A1' },
      { id: 6, title: 'ins风主题', price: '5.0 可币', vip: true, color: '#42A5F5' },
      { id: 7, title: '莫兰迪配色', price: '4.0 可币', vip: true, tag: '优质', color: '#0277BD' },
      { id: 8, title: '扁平化主题', price: '免费', vip: false, color: '#64B5F6' },
      { id: 9, title: '赛博朋克', price: '6.0 可币', vip: true, color: '#0288D1' },
    ],
    officialResources: [
      { id: 'official-1', color: '#01579B' },
      { id: 'official-2', color: '#0277BD' },
    ],
  },
  icon: {
    id: 'icon',
    name: '图标',
    placeholder: '图标',
    history: ['图标', '苹果图标', '扁平图标', '可爱图标'],
    hotSearch: [
      { word: '图标' },
      { word: '苹果图标' },
      { word: '扁平' },
      { word: '可爱' },
      { word: '简约' },
      { word: '3D' },
    ],
    results: [
      { id: 1, title: '简约图标包', price: '免费', vip: false, color: '#1565C0' },
      { id: 2, title: '苹果拟态图标', price: '3.0 可币', vip: true, color: '#1976D2' },
      { id: 3, title: '可爱手绘图标', price: '2.0 可币', vip: true, color: '#1E88E5' },
      { id: 4, title: '扁平彩色图标', price: '免费', vip: false, color: '#2196F3' },
      { id: 5, title: '3D立体图标', price: '5.0 可币', vip: true, tag: '热门', color: '#0D47A1' },
      { id: 6, title: '深色图标包', price: '1.0 可币', vip: true, color: '#42A5F5' },
      { id: 7, title: 'ins风图标', price: '免费', vip: false, color: '#0277BD' },
      { id: 8, title: '莫兰迪图标', price: '4.0 可币', vip: true, color: '#64B5F6' },
      { id: 9, title: '赛博朋克图标', price: '6.0 可币', vip: true, color: '#0288D1' },
    ],
    officialResources: [
      { id: 'official-1', color: '#01579B' },
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
  // 保留编辑框架内搜索上下文，结果页据此展示下载标识
  const current = new URLSearchParams(window.location.search);
  if (current.get('from') === 'edit') {
    params.set('from', 'edit');
  }
  return `results.html?${params.toString()}`;
}

export function buildSearchUrl(typeId) {
  const current = new URLSearchParams(window.location.search);
  const fromEdit = current.get('from') === 'edit';
  const base = typeId === 'wallpaper' ? 'index.html' : `index.html?type=${typeId}`;
  if (!fromEdit) return base;
  return base.includes('?') ? `${base}&from=edit` : `${base}?from=edit`;
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
    price: '免费',
  };
}

/** 将普通资源转为搜索结果项 */
function toNormalResultItem(item) {
  return { ...item, isOfficial: false };
}

/** 是否为付费资源（免费及官方资源不展示标识） */
export function isPaidResource(item) {
  if (item.isOfficial) return false;
  return item.price !== '免费';
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
