var fs = require('fs');
var csv = require('csv');

function writeFile(data, path){
	csv.stringify(data, {header: true}, function(err,  output){
		fs.writeFile(path, output, 'UTF-8');
	});
}

exports.writeFile = writeFile;