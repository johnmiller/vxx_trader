var should = require('should');
var money = require('../src/money-math.js');

describe("money-math", function(){

	describe("#add()", function(){
		it('should add whole numbers', function(){
			money.add(3, 2).should.eql(5);
		});

		it('should add negative numbers', function(){
			money.add(3, -2).should.eql(1);
		});

		it('should round fractions to two decimal places', function(){
			money.add(1.25, 1.251111).should.eql(2.5);
			money.add(1.255, 1.2).should.eql(2.46);
		});
	});

	describe('#subtract()', function(){
		it('should subtract whole numbers', function(){
			money.subtract(3, 2).should.eql(1);
		});

		it('should subtract negative numbers', function(){
			money.subtract(-3, 2).should.eql(-5);
		});

		it('should round fractions to two decimal places', function(){
			money.subtract(3.511111, 2).should.eql(1.51);
			money.subtract(3.519999, 2).should.eql(1.52);
		});
	});

	describe('#div()', function(){
		it('should divide whole numbers', function(){
			money.div(4, 2).should.eql(2);
		});

		it('should round fractions to two decimal places', function(){
			money.div(3.511111, 2).should.eql(1.76);
			money.div(4, 6).should.eql(.67);
		});
	});

	describe('#mul()', function(){
		it('should multiply whole numbers', function(){
			money.mul(4, 2).should.eql(8);
		});

		it('should round fractions to two decimal places', function(){
			money.mul(3.511111, 2).should.eql(7.02);
			money.mul(3.5151111, 2).should.eql(7.03);
		});
	});
});
