var parser = require('../src/history-parser');
var should = require('should');
var _ = require('underscore');

describe("history-parser", function(){

	it('should parse options file', function(done){
		read(function(rows){
			rows.length.should.equal(1460);
		}, done);
	});

	it('should read the first row', function(done){
		read(function(rows){
			var row = _.first(rows)
			row['Date'].should.equal('2014-11-14');
			row['Open'].should.equal('28.73');
			row['High'].should.equal('29.26');
			row['Low'].should.equal('28.55');
			row['Close'].should.equal('28.66');
			row['Volume'].should.equal('25706400');
			row['Adj Close'].should.equal('28.66');
		}, done);
	});	

	it('should read the last row', function(done){
		read(function(rows){
			var row = _.last(rows);
			row['Date'].should.equal('2009-01-30');
			row['Open'].should.equal('100.08');
			row['High'].should.equal('105.01');
			row['Low'].should.equal('99.72');
			row['Close'].should.equal('104.55');
			row['Volume'].should.equal('3300');
			row['Adj Close'].should.equal('6690.98');
		}, done);
	});	

	function read(callback, done){
		parser.read(__dirname+'/history-parser-test.csv')
			.done(function(rows){
				callback(rows);
				done();
			});
	}
});