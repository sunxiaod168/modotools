const writeFile = require('write-file');

var create = function (data, fileName, tableName, updateFields, conditionFields,  fieldsMapping) {

    var Update = 'update [' + tableName + '] set {fields} where {conditions}';
    
    var sql = '';

    data.forEach(item => {

        var fields = '';
        updateFields.forEach(field => {
            var jsonField = fieldsMapping[field.name];
            var value = field.type === 'string'? 'N\''+ item[jsonField] +'\'': item[jsonField];
            fields += ',' + field.name + '=' + value;      
        });
        fields = fields.substr(1);

        var conditions = '';
        conditionFields.forEach(field => {
            var jsonField = fieldsMapping[field.name];
            var value = field.type === 'string'? 'N\''+ item[jsonField] +'\'': item[jsonField];
            conditions += ' and ' + field.name + '=' + value;      
        });
        conditions = conditions.substr(5);

        sql += Update.replace('{fields}', fields).replace('{conditions}', conditions) + '\n';

    });

    writeFile('dist/sql/' + fileName + '_' + tableName + '_Update.sql', sql, function (err) {
        if (err) return console.log(err);
    });
}

module.exports = create;