const Fields = [{
    name: 'ID',
    type: 'string'
  },
  {
    name: 'ProductID',
    type: 'number'
  },
  {
    name: 'PriceVersionID',
    type: 'string'
  },
  {
    name: 'ZZID',
    type: 'string'
  },
  {
    name: 'RetailPrice',
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
    name: 'UpdateUser',
    type: 'number'
  },
  {
    name: 'UpdateTime',
    type: 'string'
  }
];
const FieldsMapping = {
  'ID': null,
  'ProductID': 'ID',
  'PriceVersionID': null,
  'ZZID': '组织编号',
  'RetailPrice': '零售价',
  'CreateUser': null,
  'CreateTime': null,
  'UpdateUser': null,
  'UpdateTime': null
};
const insertSQL = require('./insertSQL');
const uuidv1 = require('uuid/v1');

var makeInsert = function (data, fileName, priceVersionID) {
 
  var now = (new Date()).toLocaleString("zh-CN", {
    hour12: false
  });

  function nullFieldHandler(field) {

    var colValue = null;
    switch (field.name) {
      case 'ID':
        colValue = uuidv1();
        break;     
      case 'PriceVersionID':
        colValue = priceVersionID;
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

  insertSQL(data, fileName, 'ProductRetailPrice', Fields, FieldsMapping, nullFieldHandler, false);
}

module.exports.makeInsert = makeInsert;