const writeFile = require('write-file');

var create = function (data, fileName, tableName, fields, fieldMapping, nullFieldHandler, idInsertOn) {

    var Insert = 'INSERT INTO [' + tableName + '] ({0}) VALUES ({1})';
    var col = '';
    fields.forEach(field => {
        col += ',[' + field.name + ']';
    });
    Insert = Insert.replace('{0}', col.substr(1));

    var insertSql = '';

    data.forEach(item => {

        var values = '';
        fields.forEach(field => {

            var colName = fieldMapping[field.name];
            var colValue = null;
            if (colName) {
                colValue = item[colName];
                if (colValue.length == 0 && field.type == 'number') {
                    colValue = 0;
                }
            } else {
                colValue = nullFieldHandler(field);
            }
            if (field.type == 'string' && colValue != null) {
                colValue = 'N\'' + colValue + '\'';
            }
            values += ',' + colValue;
        });
        values = values.substr(1);
        insertSql += Insert.replace('{1}', values) + '\n';
    });

    if (idInsertOn == true) {

        insertSql = 'set IDENTITY_INSERT [' + tableName + '] on\n' + insertSql + 'set IDENTITY_INSERT [' + tableName + '] off\n';
    }
    writeFile('dist/sql/' + fileName + '_' + tableName + '_Insert.sql', insertSql, function (err) {
        if (err) return console.log(err);
    });
}

module.exports = create;