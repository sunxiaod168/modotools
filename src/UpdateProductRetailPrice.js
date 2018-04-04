const updateSQL = require('./UpdateSQL');

module.exports = function(data, fileName){

    var fields = ['RetailPrice'];
    data.forEach(item => {
        item.RetailPrice = parseInt(item.RetailPrice);
    });

    updateSQL(data, fileName, 'ProductRetailPrice', fields, 'ID', true);

}