const Insert = 'INSERT INTO [ProductFoundation] VALUES ({0})';

const Fields = [
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
  'ZZID': '组织编号',
  'Name': '物品长名称',
  'BrandID': '品牌ID',
  'CatenaID': '系列ID',
  'SortID': '类别ID',
  'XingHao': '型号',
  'GuiGe': '规格',
  'ZhuCai': '主材ID',
  'FuCai': '辅材ID',
  'JiLiangDanWei': '计量单位',
  'FuZhuJiLiangDanWei': '辅助计量单位',
  'QiYongFuZhuYanSe': '启用辅助颜色',
  'QiYongRuanTi': '启用软体特性',
  'ZuiDiCunLiang': '最低存量',
  'ZuiGaoCunLiang': '最高存量',
  'ZongBaoShu': '总包数',
  'BaoZhuangTiJi': '包装体积',
  'Weight': '重量',
  'BeiZhu': '备注',
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


const recursive = require('recursive-readdir');
const path = require('path');
const convertExcel = require('excel-as-json').processFile;
const writeFile = require('write-file');


var makeInsert = function (dirPath) {

  recursive(dirPath, function (err, files) {

    var now = (new Date()).toLocaleString("zh-CN", {
      hour12: false
    });
    var insertSql = '';
    var i = 0,
      len = files.length;

    files.forEach(file => {
      i++;
      convertExcel(file, null, null, function (err, data) {
        data.forEach(item => {

          var values = '';
          Fields.forEach(field => {

            var colName = FieldsMapping[field.name];
            var colValue = null;
            if (colName) {
              colValue = item[colName];
              if(colValue.length == 0 && field.type == 'number'){
                colValue = 0;
              }
            } else {
              switch (field.name) {
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
            }
            if(field.type == 'string' && colValue != null){
              colValue = 'N\'' + colValue + '\'';
            }
            values += ','+ colValue;
          });
          values = values.substr(1);
          insertSql += Insert.replace('{0}', values) + '\n';
        });

        if (i == len) {
          writeFile('dist/product/insert.sql', insertSql, function (err) {
            if (err) return console.log(err);
          })
        }
      });

    });
  });

}
module.exports.makeInsert = makeInsert;