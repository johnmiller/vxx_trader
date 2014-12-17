var parser = require('../src/history-parser');
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

		quote.open_change = subtract(quote.adj_open, prev.adj_close);
		quote.open_change_perc = div(quote.open_change, prev.adj_close);
		quote.close_change = subtract(quote.adj_close, prev.adj_close);
		quote.close_change_perc = div(quote.close_change, prev.adj_close);
		quote.high_change = subtract(quote.adj_high, prev.adj_close);
		quote.high_change_perc = div(quote.high_change, prev.adj_close);
		quote.low_change = subtract(quote.adj_low, prev.adj_close);
		quote.low_change_perc = div(quote.low_change, prev.adj_close);
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

		if (quote.date == '02/26/2013') {
			console.log(quotes.slice(i - 1, i + 3));
			//console.log(quote);
		}
		
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
	var adj_multiplier = div(quote.adj_close, quote.close);
	quote.adj_open = mul(quote.open, adj_multiplier);
	quote.adj_high = mul(quote.high, adj_multiplier);
	quote.adj_low = mul(quote.low, adj_multiplier);
}

function parseDate(dateStr){
	var parts = dateStr.split('-');
	//return parts[1] + '/' + parts[2] + '/' + parts[0];
	return new Date(parts[0], parts[1] - 1, parts[2]);
}

function mul(val1, val2){
	return parseFloat((val1 * val2).toFixed(2));
}

function div(val1, val2){
	return parseFloat((val1 / val2).toFixed(2));
}

function add(val1, val2){
	return parseFloat((val1 + val2).toFixed(2));
}

function subtract(val1, val2){
	return parseFloat((val1 - val2).toFixed(2));
}

exports.buildQuotes = buildQuotes;