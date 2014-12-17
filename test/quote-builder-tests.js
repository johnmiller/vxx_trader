var should = require('should');
var rewire = require('rewire');
var builder = rewire('../src/quote-builder');
var _ = require('underscore');
var q = require('q');

describe('quote-builder', function(){

	describe('#buildQuotes()', function(){
		var rows = [{
						'Date': '2014-11-30',
						'Open': '11.45',
						'High': '11.85',
						'Low': '11.23',
						'Close': '11.63',
						'Volume': '213455234',
						'Adj Close': '23.26',
					},
					{
						'Date': '2014-11-30',
						'Open': '11.45',
						'High': '11.85',
						'Low': '11.23',
						'Close': '11.63',
						'Volume': '213455234',
						'Adj Close': '23.26',
					},
					{
						'Date': '2014-11-30',
						'Open': '11.45',
						'High': '11.85',
						'Low': '11.23',
						'Close': '11.63',
						'Volume': '213455234',
						'Adj Close': '23.26',
					}];

		beforeEach(function(){
			var deferred = q.defer();
			var mockParser = {
				read: function(path){
					return q.when(rows);
				}
			};

			builder.__set__("parser", mockParser);
		});

		quoteShould('assign date', function(quote){ 
			quote.date.should.eql(new Date(2014, 10, 30));
		});

		quoteShould('assign open', function(quote){ 
			quote.open.should.eql(11.45);
		});

		quoteShould('assign high', function(quote){ 
			quote.high.should.eql(11.85);
		});

		quoteShould('assign low', function(quote){ 
			quote.low.should.eql(11.23);
		});

		quoteShould('assign close', function(quote){ 
			quote.close.should.eql(11.63);
		});

		quoteShould('assign volume', function(quote){ 
			quote.volume.should.eql(213455234);
		});

		quoteShould('assign adj close', function(quote){ 
			quote.adj_close.should.eql(23.26);
		});

		quoteShould('assign adj high', function(quote){ 
			quote.adj_high.should.eql(23.70);
		});

		quoteShould('assign adj low', function(quote){ 
			quote.adj_low.should.eql(22.46);
		});

		quoteShould('assign adj open', function(quote){ 
			quote.adj_open.should.eql(22.90);
		});

		it('assign ', function(){

		});

		function quoteShould(description, callback){
			it('should ' + description, function(done){
				builder.buildQuotes('some file path')
					.done(function(quotes){
						var quote = _.first(quotes);
						callback(quote);
						done();
					});
			});
		}
	});
});