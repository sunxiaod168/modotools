const path = require('path');
const excelToJSON = require('./ExcelToJSON');
const product = require('./ProductFoundation');
const productPrice = require('./ProductPrice');
const productRetailPrice = require('./ProductRetailPrice');
const loadJsonFile = require('load-json-file');
const updateProductRetailPrice = require('./UpdateProductRetailPrice');
const installDispatchHeader =require('./InstallDispatchHeader');

excelToJSON('Excel/ProductFoundation', 600, function (jsonFile) {

    var fileName = path.basename(jsonFile, '.json');
    loadJsonFile(jsonFile).then(data => {
        
        var productStartID = 862
        product.makeInsert(data, fileName, productStartID);
        productPrice.makeInsert(data, fileName, 631, productStartID);
        productRetailPrice.makeInsert(data, fileName, productStartID, 'V2100001001');
    });
});

// excelToJSON('Excel/ProductRetailPrice', null, function (jsonFile) {

//     var fileName = path.basename(jsonFile, '.json');
//     loadJsonFile(jsonFile).then(data => {
//         updateProductRetailPrice(data, fileName);       
//     });
// });


// excelToJSON('Excel/InstallDispatchHeader', null, function (jsonFile) {

//     var fileName = path.basename(jsonFile, '.json');
//     loadJsonFile(jsonFile).then(data => {
//         installDispatchHeader.makeInsert(data, fileName);       
//     });
// });