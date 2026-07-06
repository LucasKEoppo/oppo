/** 定投条件类型（全部定投标签） */
export const CONDITION_TYPES = [
  '年龄段',
  '机型',
  'OS版本',
  '客户端版本',
  '品牌',
  '安卓版本',
  '账号类型',
  '营销中台标签',
  'OS数字版本',
  '会员用户',
  '会员签约状态',
  '启动来源（实时）',
  '设备类型',
  '内外销设备用户',
  '是否屏蔽未成年模式标识',
  'OS系统特性',
  '运行内存大小',
  '红薯用户',
];

export const RESOURCE_TYPES = ['主题', '壁纸', '字体', '图标', '组件卡', '视频铃声'];

export function createEmptyCondition(id) {
  return { id, type: '', value: '' };
}

/** 各条件类型的筛选占位提示 */
export const CONDITION_PLACEHOLDERS = {
  机型: '请输入机型，多个用逗号分隔，如：Find X8 Ultra, Reno 13 Pro',
  品牌: '请输入品牌，如：OPPO, OnePlus, realme',
  年龄段: '请输入年龄段',
  OS版本: '请输入 OS 版本',
  客户端版本: '请输入客户端版本号',
  安卓版本: '请输入安卓版本',
  账号类型: '请输入账号类型',
  营销中台标签: '请输入营销中台标签 ID',
  OS数字版本: '请输入 OS 数字版本',
  会员用户: '是 / 否',
  会员签约状态: '请输入签约状态',
  '启动来源（实时）': '请输入启动来源',
  设备类型: '请输入设备类型',
  内外销设备用户: '内销 / 外销',
  是否屏蔽未成年模式标识: '是 / 否',
  OS系统特性: '请输入 OS 系统特性',
  运行内存大小: '请输入运行内存大小（GB）',
  红薯用户: '是 / 否',
};

export function getConditionPlaceholder(type) {
  return CONDITION_PLACEHOLDERS[type] || '请输入条件筛选值';
}
