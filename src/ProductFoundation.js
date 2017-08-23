const insert = ' INSERT INTO [ProductFoundation]' +
  '([ZZID]' +
  ',[Name]' +
  ',[BrandID]' +
  ',[CatenaID]' +
  ',[SortID]' +
  ',[XingHao]' +
  ',[GuiGe]' +
  ',[ZhuCai]' +
  ',[FuCai]' +
  ',[JiLiangDanWei]' +
  ',[FuZhuJiLiangDanWei]' +
  ',[QiYongFuZhuYanSe]' +
  ',[QiYongRuanTi]' +
  ',[ZuiDiCunLiang]' +
  ',[ZuiGaoCunLiang]' +
  ',[ZongBaoShu]' +
  ',[BaoZhuangTiJi]' +
  ',[Weight]' +
  ',[BeiZhu]' +
  ',[Enable]' +
  ',[ImagePath]' +
  ',[CreateTime]' +
  ',[CreateUser]' +
  ',[UpdateUser]' +
  ',[UpdateTime]' +
  ',[IsDelete]' +
  ',[ProductCode])' +
  'VALUES' +
  '(<ZZID>' +
  ',<Name>' +
  ',<BrandID>' +
  ',<CatenaID>' +
  ',<SortID>' +
  ',<XingHao>' +
  ',<GuiGe>' +
  ',<ZhuCai>' +
  ',<FuCai>' +
  ',<JiLiangDanWei>' +
  ',<FuZhuJiLiangDanWei>' +
  ',<QiYongFuZhuYanSe>' +
  ',<QiYongRuanTi>' +
  ',<ZuiDiCunLiang>' +
  ',<ZuiGaoCunLiang>' +
  ',<ZongBaoShu>' +
  ',<BaoZhuangTiJi>' +
  ',<Weight>' +
  ',<BeiZhu>' +
  ',<Enable>' +
  ',<ImagePath>' +
  ',<CreateTime>' +
  ',<CreateUser>' +
  ',<UpdateUser>' +
  ',<UpdateTime>' +
  ',<IsDelete>' +
  ',<ProductCode>)';

const cols = [
  "<ZZID>",
  "<Name>",
  "<BrandID>",
  "<CatenaID>",
  "<SortID>",
  "<XingHao>",
  "<GuiGe>",
  "<ZhuCai>",
  "<FuCai>",
  "<JiLiangDanWei>",
  "<FuZhuJiLiangDanWei>",
  "<QiYongFuZhuYanSe>",
  "<QiYongRuanTi>",
  "<ZuiDiCunLiang>",
  "<ZuiGaoCunLiang>",
  "<ZongBaoShu>",
  "<BaoZhuangTiJi>",
  "<Weight>",
  "<BeiZhu>",
  "<Enable>",
  "<ImagePath>",
  "<CreateTime>",
  "<CreateUser>",
  "<UpdateUser>",
  "<UpdateTime>",
  "<IsDelete>",
  "<ProductCode>"
];

const mapping = {
  "<ZZID>": "组织编号",
  "<Name>": "物品名称",
  "<BrandID>": "品牌ID",
  "<CatenaID>": "系列ID",
  "<SortID>": "类别ID",
  "<XingHao>": "型号",
  "<GuiGe>": "规格",
  "<ZhuCai>": "主材ID",
  "<FuCai>": "辅材ID",
  "<JiLiangDanWei>": "计量单位",
  "<FuZhuJiLiangDanWei>": "辅助计量单位",
  "<QiYongFuZhuYanSe>": "",
  "<QiYongRuanTi>": "",
  "<ZuiDiCunLiang>": "",
  "<ZuiGaoCunLiang>": "",
  "<ZongBaoShu>": "包装数量",
  "<BaoZhuangTiJi>": "",
  "<Weight>": "",
  "<BeiZhu>": "备注",
  "<Enable>": "",
  "<ImagePath>": "",
  "<CreateTime>": "",
  "<CreateUser>": "",
  "<UpdateUser>": "",
  "<UpdateTime>": "",
  "<IsDelete>": "",
  "<ProductCode>": "物品编号"
};

const excelLoader = require('./excelLoader.js');
const writeFile = require('write-file');

var src = 'src/简艺物品清单.xlsx';
var dst = 'dist/json/product.json';
var options = {
  sheet: '1'
};
var insertSql = '';

excelLoader(src, dst, options, function(err, data) {

  for (var i = 0, iLen = data.length; i < iLen; i++) {

    var sql = insert;
    var dataItem = data[i];

    for (var j = 0, jLen = cols.length; j < jLen; j++) {

      var colName = cols[j];
      var fieldName = mapping[colName];
      var colValue = fieldName.length == 0 ? null : dataItem[fieldName];
      var now = (new Date()).toLocaleString("zh-CN", {
        hour12: false
      });

      if (colValue == null) {

        switch (colName) {  
          case '<FuZhuJiLiangDanWei>':
            colValue = '-';
            break;
          case '<QiYongFuZhuYanSe>':
            colValue = 0;
            break;
          case '<QiYongRuanTi>':
            colValue = 0;
            break;
          case '<ZuiDiCunLiang>':
            colValue = 0;
            break;
          case '<ZuiGaoCunLiang>':
            colValue = 0;
            break;
          case '<ZongBaoShu>':
            colValue = 0;
            break;
          case '<BaoZhuangTiJi>':
            colValue = 0;
            break;
          case '<Weight>':
            colValue = 0;
            break;
          case '<Enable>':
            colValue = 1;
            break;
          case '<ImagePath>':
            colValue = null;
            break;
          case '<CreateTime>':
            colValue = now;
            break;
          case '<CreateUser>':
            colValue = 20;
            break;
          case '<UpdateUser>':
            colValue = 20;
            break;
          case '<UpdateTime>':
            colValue = now;
            break;
          case '<IsDelete>':
            colValue = 0;
            break;
        }
      }

      if (colValue != null && colValue != 'null') {
        colValue = 'N\'' + colValue + '\'';
      }

      if (colValue == 'null') {

        colValue = null;
      }

      sql = sql.replace(colName, colValue);

    }

    insertSql += sql + '\nGO\n';
  }

  

  writeFile('dist/sql/ProductFoundation_Insert.sql', insertSql, function(err) {

  });

});