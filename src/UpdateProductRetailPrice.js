const updateSQL = require('./UpdateSQL');
const FieldsMapping = {    
    'ZZID': '组织ID',
    'ProductID': '物品ID',
    'RetailPrice':'销售价'   
  };
  

function makeUpdate(data, fileName){

    var updateFields = [{name: 'RetailPrice', type: 'number'}];
    var conditionFields = [{name: 'ZZID', type: 'string'}, {name: 'ProductID', type: 'number'}];
    
    data.forEach(item => {
        item.RetailPrice = parseInt(item.RetailPrice);
    });

    updateSQL(data, fileName, 'ProductRetailPrice', updateFields, conditionFields, FieldsMapping);

}

module.exports.makeUpdate = makeUpdate;