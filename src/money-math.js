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

exports.mul = mul;
exports.div = div;
exports.add = add;
exports.subtract = subtract;