var fs = require('fs');
var csv = require('csv');
var q = require('q');

function read(path){
	var deferred = q.defer();
	var parser = csv.parse({delimiter: ',', columns: true});
	var rows = [];

	parser.on('readable', function(){
		while (row = parser.read())
			rows.push(row);
	})
	.on('finish', function(){
		deferred.resolve(rows);
	});

	fs.createReadStream(path).pipe(parser);

	return deferred.promise;
}

exports.read = read;