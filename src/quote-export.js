var csv = require('fast-csv');
var q = require('q');

function writeFile(data, path){
	var deferred = q.defer();

	csv.writeToPath(path, data.reverse(), {headers: true})
		.on('finish', function(){
			deferred.resolve();
		});

	return deferred.promise;
}

exports.writeFile = writeFile;