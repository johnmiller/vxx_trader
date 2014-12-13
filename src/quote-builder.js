var parser = require('../src/history-parser');
var q = require('q');
var money = require('money-math');

function buildQuotes(path){
	return parser.read(path)
		.then(function(rows){
			return rows.map(toQuote);
		}).then(function(quotes){
			enhance(quotes);
			return quotes;
		});
}

function enhance(quotes){
	var prev = quotes[0];

	for (var i = 0; i <= quotes.length - 1; i++) {
		var quote = quotes[i];

		if (prev){
			quote.open_change = money.subtract(quote.adj_open, prev.adj_close);
			quote.open_change_perc = money.div(quote.open_change, prev.adj_close);
			quote.close_change = money.subtract(quote.adj_close, prev.adj_close);
			quote.close_change_perc = money.div(quote.close_change, prev.adj_close);
			quote.high_change = money.subtract(quote.adj_high, prev.adj_close);
			quote.high_change_perc = money.div(quote.high_change, prev.adj_close);
			quote.low_change = money.subtract(quote.adj_low, prev.adj_close);
			quote.low_change_perc = money.div(quote.low_change, prev.adj_close);
				
		}

		prev = quote;
	}
}

function toQuote(row){
	var quote =  {
		date: parseDate(row['Date']),
		open: row['Open'],
		high: row['High'],
		low: row['Low'],
		close: row['Close'],
		volume: row['Volume'],
		adj_close: row['Adj Close']
	};

	adjustForSplits(quote);
	return quote;
}

function adjustForSplits(quote){
	var adj_multiplier = money.div(quote.adj_close, quote.close);
	quote.adj_open = money.mul(quote.open, adj_multiplier);
	quote.adj_high = money.mul(quote.high, adj_multiplier);
	quote.adj_low = money.mul(quote.low, adj_multiplier);
}

function parseDate(dateStr){
	var parts = dateStr.split('-');
	return new Date(parts[0], parts[1] - 1, parts[2]);
}

exports.buildQuotes = buildQuotes;