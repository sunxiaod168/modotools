const Fields = [{
    name: 'ID',
    type: 'number'
  },
  {
    name: 'ZZID',
    type: 'string'
  },
  {
    name: 'ProductID',
    type: 'number'
  },
  {
    name: 'BatchID',
    type: 'string'
  },
  {
    name: 'CostPrice',
    type: 'number'
  },
  {
    name: 'WholesalePrice',
    type: 'number'
  },
  {
    name: 'CreateUser',
    type: 'number'
  },
  {
    name: 'CreateTime',
    type: 'string'
  },
  {
    name: 'UpdateTime',
    type: 'string'
  },
  {
    name: 'UpdateUser',
    type: 'number'
  }
];
const FieldsMapping = {
  'ID': null,
  'ZZID': '组织ID',
  'ProductID': null,
  'BatchID': null,
  'CostPrice': '成本价',
  'WholesalePrice': null,
  'CreateUser': null,
  'CreateTime': null,
  'UpdateTime': null,
  'UpdateUser': null
};
const insertSQL = require('./insertSQL');
const moment = require('moment');

var makeInsert = function (data, fileName, startID, productStartID) {  
 
  var now = (new Date()).toLocaleString("zh-CN", {
    hour12: false
  });
  var batchID = 'PC' + moment().format('YYYYMMDDHHmm');

  function nullFieldHandler(field) {

    var colValue = null;
    switch (field.name) {
      case 'ID':
        colValue = startID++;
        break; 
      case 'ProductID':
        colValue = productStartID++;
        break;             
      case 'BatchID':
        colValue = batchID;
        break;
      case 'WholesalePrice':
        colValue = null;
        break;
      case 'CreateUser':
      case 'UpdateUser':
        colValue = 20;
        break;
      case 'CreateTime':
      case 'UpdateTime':
        colValue = now;
        break;
      default:
        break;
    }
    return colValue;
  }

  insertSQL(data, fileName, 'ProductPrice', Fields, FieldsMapping, nullFieldHandler, true);
}

module.exports.makeInsert = makeInsert;