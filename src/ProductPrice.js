const insert = 'INSERT INTO [ProductPrice]' +
  '([ZZID]' +
  ',[ProductID]' +
  ',[BatchID]' +
  ',[CostPrice]' +
  ',[WholesalePrice]' +
  ',[CreateUser]' +
  ',[CreateTime]' +
  ',[UpdateTime]' +
  ',[UpdateUser])' +
  'VALUES' +
  '(<ZZID>' +
  ',<ProductID>' +
  ',<BatchID>' +
  ',<CostPrice>' +
  ',<WholesalePrice>' +
  ',<CreateUser>' +
  ',<CreateTime>' +
  ',<UpdateTime>' +
  ',<UpdateUser>)';

const cols = [
  '<ZZID>',
  '<ProductID>',
  '<BatchID>',
  '<CostPrice>',
  '<WholesalePrice>',
  '<CreateUser>',
  '<CreateTime>',
  '<UpdateTime>',
  '<UpdateUser>'
];

const mapping = {
  '<ZZID>': '组织编号',
  '<ProductID>': '',
  '<BatchID>': '',
  '<CostPrice>': '单价1',
  '<WholesalePrice>': '',
  '<CreateUser>': '',
  '<CreateTime>': '',
  '<UpdateTime>': '',
  '<UpdateUser>': ''
};

const excelLoader = require('./excelLoader.js');
const writeFile = require('write-file');


var src = './简艺物品清单.xlsx';
var dst = './json/product.json';
var options = {
  sheet: '1'
};
var insertSql = '';

require("date-format-lite");

excelLoader(src, dst, options, function(err, data) {

  var now = (new Date()).toLocaleString("zh-CN", {
        hour12: false
      });

  var batchID = 'PC' + (new Date()).format('YYYYMMDDhhmm');
  var productID = 458;

  for (var i = 0, iLen = data.length; i < iLen; i++) {

    var sql = insert;
    var dataItem = data[i];

    for (var j = 0, jLen = cols.length; j < jLen; j++) {

      var colName = cols[j];
      var fieldName = mapping[colName];
      var colValue = fieldName.length == 0 ? null : dataItem[fieldName];
      

      if (colValue == null) {

        switch (colName) {  
          case '<ProductID>':
            colValue = productID++;
            break;
          case '<BatchID>':
            colValue = batchID;
            break;
          case '<WholesalePrice>':
            colValue = null;
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

  writeFile('./sql/ProductPrice_Insert.sql', insertSql, function(err) {

  });

});