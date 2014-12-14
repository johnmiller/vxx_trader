var should = require('should');
var fs = require('fs');
var nock = require('nock');
var downloader = require('../src/history-downloader');

describe('HistoryDownloader', function(){
	it('should download latest file', function(done){
		var outputFile = __dirname+'/downloaded-file.csv';

		if (fs.existsSync(outputFile))
			fs.unlinkSync(outputFile);
		
		nock('http://real-chart.finance.yahoo.com')
			.get('/table.csv?s=vxx')
				.reply(200, 'testing');

		downloader.retrieve('vxx', outputFile)
			.done(function(){
				var result = fs.readFileSync(outputFile, 'utf8');
				result.should.eql('testing');
				done();
			});
	});
});