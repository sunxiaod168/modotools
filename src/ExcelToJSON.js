const recursive = require('recursive-readdir');
const path = require('path');
const convertExcel = require('excel-as-json').processFile;
const writeFile = require('write-file');


module.exports = function (excelDirPath, startID, done) {

    recursive(excelDirPath, function (err, files) {

        var outDir = 'dist/json/';
        var id = startID;

        files.forEach(file => {

            var fileName = path.basename(file, '.xlsx');
            var outPath = outDir + fileName + '.json';

            convertExcel(file, null, null, function (err, data) {
                if (startID != null) {

                    data.forEach(item => {
                        item.ID = id++;
                    });
                }
                writeFile(outPath, data, function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    done(outPath);
                });
            });
        });
    });
}