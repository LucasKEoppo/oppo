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
