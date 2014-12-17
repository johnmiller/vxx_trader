var should = require('should');
var fs = require('fs');
var quoteExport = require('../src/quote-export');

describe('QuoteExport', function(){
	it('should write results in reverse order', function(){
		var quotes = [
			{col1: 'string1', col2: '100.12'},
			{col1: 'string2', col2: '200.12'}
		];

		var fileName = __dirname+'/quote-export-test.csv';

		quoteExport.writeFile(quotes, fileName);

		var result = fs.readFileSync(fileName, 'utf8');
		result.should.eql('col1,col2\nstring2,200.12\nstring1,100.12\n');
	});
});