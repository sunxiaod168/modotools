var convertExcel = require('excel-as-json').processFile;

module.exports = function (src, dst, options, callback) {

	if (src.length == 0) {
		return null;
	}

	convertExcel(src, dst, options, callback);		
};