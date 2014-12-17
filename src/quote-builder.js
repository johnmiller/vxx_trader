var parser = require('../src/history-parser');
var money = require('../src/money-math');
var q = require('q');
var _ = require('underscore');

function buildQuotes(path){
	return parser.read(path)
		.then(function(rows){
			return rows.reverse().map(toQuote);
		}).then(function(quotes){
			enhance(quotes);
			return quotes;
		});
}

function enhance(quotes){
	var prev = quotes[0];

	for (var i = 0; i <= quotes.length - 1; i++) {
		var quote = quotes[i];

		quote.open_change = money.subtract(quote.adj_open, prev.adj_close);
		quote.open_change_perc = money.div(quote.open_change, prev.adj_close);
		quote.close_change = money.subtract(quote.adj_close, prev.adj_close);
		quote.close_change_perc = money.div(quote.close_change, prev.adj_close);
		quote.high_change = money.subtract(quote.adj_high, prev.adj_close);
		quote.high_change_perc = money.div(quote.high_change, prev.adj_close);
		quote.low_change = money.subtract(quote.adj_low, prev.adj_close);
		quote.low_change_perc = money.div(quote.low_change, prev.adj_close);
		quote.high_above_5_perc = quote.high_change_perc >= 0.05;
		quote.high_above_10_perc = quote.high_change_perc >= 0.10;	
		quote.low_below_5_perc = quote.low_change_perc <= -0.05;
		quote.low_below_10_perc = quote.low_change_perc <= -0.10;

		quote.days_to_drop_to_prev_close = daysUntil(quotes, i, function(q){
			return q.adj_low <= prev.adj_close;
		});

		quote.days_to_rise_to_prev_close = daysUntil(quotes, i, function(q){
			return q.adj_high >= prev.adj_close;
		});

		prev = quote;
	}
}

function daysUntil(quotes, current_index, callback)
{
	var rest = _.rest(quotes, current_index);
	var match = _.find(rest, callback);

	if (match != undefined)
		return quotes.indexOf(match) - current_index;
	
	return '+' + ((quotes.length - 1) - current_index).toString();
}

function toQuote(row){
	var quote =  {
		date: parseDate(row['Date']),
		open: parseFloat(row['Open']),
		high: parseFloat(row['High']),
		low: parseFloat(row['Low']),
		close: parseFloat(row['Close']),
		volume: parseFloat(row['Volume']),
		adj_close: parseFloat(row['Adj Close'])
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
	//return parts[1] + '/' + parts[2] + '/' + parts[0];
	return new Date(parts[0], parts[1] - 1, parts[2]);
}

exports.buildQuotes = buildQuotes;