var fs = require('fs');
var csv = require('csv');

function writeFile(data, path){
	csv.stringify(data.reverse(), {header: true}, function(err,  output){
		fs.writeFileSync(path, output, 'UTF-8');
	});
}


exports.writeFile = writeFile;