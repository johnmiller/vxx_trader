var should = require('should');
var fs = require('fs');
var quoteExport = require('../src/quote-export');

describe('QuoteExport', function(){

	describe('#writeFile()', function(){

		it('should write results in reverse order', function(done){
			var quotes = [
				{col1: 'string1', col2: '100.12'},
				{col1: 'string2', col2: '200.12'}
			];

			var fileName = __dirname+'/quote-export-test.csv';

			quoteExport.writeFile(quotes, fileName)
				.done(function(){
					var result = fs.readFileSync(fileName, 'utf8');
					result.should.eql('col1,col2\nstring2,200.12\nstring1,100.12');
					done();
				});
		});
	});
});