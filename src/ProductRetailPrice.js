const insert = 'INSERT INTO [ProductRetailPrice]' +
  '([ProductID]' +
  ',[PriceVersionID]' +
  ',[ZZID]' +
  ',[RetailPrice]' +
  ',[CreateUser]' +
  ',[CreateTime]' +
  ',[UpdateTime]' +
  ',[UpdateUser])' +
  'VALUES' +
  '(<ProductID>' +
  ',<PriceVersionID>' +
  ',<ZZID>' +
  ',<RetailPrice>' +
  ',<CreateUser>' +
  ',<CreateTime>' +
  ',<UpdateTime>' +
  ',<UpdateUser>)';

const cols = [

  '<ProductID>',
  '<PriceVersionID>',
  '<ZZID>',
  '<RetailPrice>',
  '<CreateUser>',
  '<CreateTime>',
  '<UpdateTime>',
  '<UpdateUser>'
];

const mapping = {
  '<ProductID>': '',
  '<PriceVersionID>': '',
  '<ZZID>': '组织编号',  
  '<RetailPrice>': '单价2',
  '<CreateUser>': '',
  '<CreateTime>': '',
  '<UpdateTime>': '',
  '<UpdateUser>': ''
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

  var now = (new Date()).toLocaleString("zh-CN", {
        hour12: false
      });

  var productID = 458;
  var priceVersionID = 'V4100008001';

  for (var i = 0, iLen = data.length; i < iLen; i++) {
    
    var dataItem = data[i];
    if (dataItem['单价2'].length == 0) {
      continue;
    }

    var sql = insert;
    for (var j = 0, jLen = cols.length; j < jLen; j++) {

      var colName = cols[j];
      var fieldName = mapping[colName];
      var colValue = fieldName.length == 0 ? null : dataItem[fieldName];
      

      if (colValue == null) {

        switch (colName) {  
          case '<ProductID>':
            colValue = productID++;
            break;
          case '<PriceVersionID>':
          colValue = priceVersionID;
            break;     
          case '<CreateUser>':
            colValue = 20;
            break;
          case '<CreateTime>':
            colValue = now;
            break;
          case '<UpdateTime>':
            colValue = now;
            break;
          case '<UpdateUser>':
            colValue = 20;
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

  writeFile('dist/sql/ProductRetailPrice_Insert.sql', insertSql, function(err) {

  });
});