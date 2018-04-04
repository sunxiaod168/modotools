const writeFile = require('write-file');

var create = function (data, fileName, tableName, fields, keyCol, keyIsString) {

    var Update = 'update [' + tableName + '] set {cols} where ' + keyCol + '={keyVal}' ;
    if(keyIsString){
        Update = 'update [' + tableName + '] set {cols} where ' + keyCol + '=\'{keyVal}\'' ;
    }
    var sql = '';

    data.forEach(item => {

        var cols = '';
        fields.forEach(field => {
            cols += ',' + field + '=' + item[field]           
        });
        cols = cols.substr(1);
        var keyVal = item[keyCol];     
        sql += Update.replace('{cols}', cols).replace('{keyVal}', keyVal) + '\n';

    });

    writeFile('dist/sql/' + fileName + '_' + tableName + '_Update.sql', sql, function (err) {
        if (err) return console.log(err);
    });
}

module.exports = create;