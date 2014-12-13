var should = require('should');
var fs = require('fs');
var csv = require('csv');
var rewire = require('rewire');
var quoteExport = rewire('../src/quote-export');

describe('QuoteExport', function(){
	it('should write results to csv file', function(){
		var quotes = [{col1: 'some string', col2: '100.12'}];
		var fileName = __dirname+'/result.csv';

		quoteExport.writeFile(quotes, fileName);

		var result = fs.readFileSync(fileName, 'utf8');
		result.should.eql('col1,col2\nsome string,100.12\n');
	});
});