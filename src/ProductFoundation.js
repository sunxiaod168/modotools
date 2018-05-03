const Fields = [{
  name: 'ID',
  type: 'number'
},
{
  name: 'ZZID',
  type: 'string'
},
{
  name: 'Name',
  type: 'string'
},
{
  name: 'BrandID',
  type: 'number'
},
{
  name: 'CatenaID',
  type: 'number'
},
{
  name: 'SortID',
  type: 'number'
},
{
  name: 'XingHao',
  type: 'string'
},
{
  name: 'GuiGe',
  type: 'string'
},
{
  name: 'ZhuCai',
  type: 'number'
},
{
  name: 'FuCai',
  type: 'number'
},
{
  name: 'JiLiangDanWei',
  type: 'string'
},
{
  name: 'FuZhuJiLiangDanWei',
  type: 'string'
},
{
  name: 'QiYongFuZhuYanSe',
  type: 'number'
},
{
  name: 'QiYongRuanTi',
  type: 'number'
},
{
  name: 'ZuiDiCunLiang',
  type: 'number'
},
{
  name: 'ZuiGaoCunLiang',
  type: 'number'
},
{
  name: 'ZongBaoShu',
  type: 'number'
},
{
  name: 'BaoZhuangTiJi',
  type: 'number'
},
{
  name: 'Weight',
  type: 'number'
},
{
  name: 'BeiZhu',
  type: 'string'
},
{
  name: 'Enable',
  type: 'number'
},
{
  name: 'ImagePath',
  type: 'string'
},
{
  name: 'CreateTime',
  type: 'string'
},
{
  name: 'CreateUser',
  type: 'number'
},
{
  name: 'UpdateUser',
  type: 'number'
},
{
  name: 'UpdateTime',
  type: 'string'
},
{
  name: 'IsDelete',
  type: 'number'
},
{
  name: 'ProductCode',
  type: 'string'
},
{
  name: 'ShortName',
  type: 'string'
}
];
const FieldsMapping = {
  'ID': null,
  'ZZID': '组织ID',
  'Name': '物品名称',
  'BrandID': '品牌ID',
  'CatenaID': '系列ID',
  'SortID': '类别ID',
  'XingHao': '型号',
  'GuiGe': '规格',
  'ZhuCai': '主材ID',
  'FuCai': '辅材ID',
  'JiLiangDanWei': '计量单位',
  'FuZhuJiLiangDanWei': '辅助计量单位',
  'QiYongFuZhuYanSe': '启用辅色',
  'QiYongRuanTi': '启用软体',
  'ZuiDiCunLiang': '最低存量',
  'ZuiGaoCunLiang': '最高存量',
  'ZongBaoShu': '包装数量',
  'BaoZhuangTiJi': '包装体积',
  'Weight': '重量',
  'BeiZhu': null,
  'Enable': null,
  'ImagePath': null,
  'CreateTime': null,
  'CreateUser': null,
  'UpdateUser': null,
  'UpdateTime': null,
  'IsDelete': null,
  'ProductCode': '物品编号',
  'ShortName': '物品短名称',
};
const insertSQL = require('./insertSQL');

var makeInsert = function (data, fileName, startID) {
  var now = (new Date()).toLocaleString("zh-CN", {
    hour12: false
  });

  function nullFieldHandler(field) {

    var colValue = null;
    switch (field.name) {
      case 'ID':
        colValue = startID++;
        break;    
      case 'BeiZhu':
        colValue = null;
        break;
      case 'Enable':
        colValue = 1;
        break;
      case 'ImagePath':
        colValue = null;
        break;
      case 'CreateTime':
        colValue = now;
        break;
      case 'CreateUser':
        colValue = 20;
        break;
      case 'UpdateUser':
        colValue = 20;
        break;
      case 'UpdateTime':
        colValue = now;
        break;
      case 'IsDelete':
        colValue = 0;
        break;
      default:
        break;
    }
    return colValue;
  }

  insertSQL(data, fileName, 'ProductFoundation', Fields, FieldsMapping, nullFieldHandler, true);
}

module.exports.makeInsert = makeInsert;