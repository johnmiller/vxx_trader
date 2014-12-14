var fs = require('fs');
var request = require("request");
var q = require('q');

function retrieve(stockSymbol, filePath){
	var deferred = q.defer();
	var url = 'http://real-chart.finance.yahoo.com/table.csv?s=' + stockSymbol;

	var file = fs.createWriteStream(filePath);
	
	request(url, function(error, response, body){
		deferred.resolve();
	}).pipe(file);

	return deferred.promise;
}

exports.retrieve = retrieve;