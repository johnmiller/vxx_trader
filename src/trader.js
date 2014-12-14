var historyDownloader = require('../src/history-downloader');
var quoteBuilder = require('../src/quote-builder');
var quoteExport = require('../src/quote-export');

var sourceFile = __dirname + '/vxx.csv';
var outputFile = __dirname + '/quotes.csv';

historyDownloader.retrieve('vxx', sourceFile)
	.then(function(){
		quoteBuilder.buildQuotes(sourceFile)
			.then(function(quotes){
				quoteExport.writeFile(quotes, outputFile);
			})
	});
