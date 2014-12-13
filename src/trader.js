var parser = require('../src/quote-builder');
var quoteExport = require('../src/quote-export');

var sourceFile = __dirname + '/vxx.csv';
var outputFile = __dirname + '/quotes.csv';

parser.buildQuotes(sourceFile)
	.then(function(quotes){
		quoteExport.writeFile(quotes, outputFile);
	});
