/* Author: 

*/
;(function($){

var cross    = '\u25EF',
	nought   = '\u2715',
	blank    = '',
	whosTurn = cross;

function turnRotate() {
	whosTurn = (whosTurn == cross) ? nought : cross;
}

function Board() {
	this.faces = ['top','north','south','east','west','base'];

	this.squares = {
		'top':  [[],[],[]],
		'north':[[],[],[]],
		'south':[[],[],[]],
		'east': [[],[],[]],
		'west': [[],[],[]],
		'base': [[],[],[]]
	};

	return this;
}

$.extend(Board.prototype,{
	same: function(first,second,third) {
		if (first == second && first == third) return first;
		return false;
	},

	gameOver: function() {
		for (var square in this.squares) {
			winner = this.same(this.squares[square][0][0],this.squares[square][1][1],this.squares[square][2][2]);
			if (winner) return winner;
			winner = this.same(this.squares[square][2][0],this.squares[square][1][1],this.squares[square][0][2]);
			if (winner) return winner;
		}
		return false;
	},

	movePlayed: function(position_string,player) {
		console.log(position_string);
		position = position_string.split('_');
		this.squares[position[0]][position[1]][position[2]] = player;
	}
});


$(function(){

	$.each(["base","north","south","east","west","top"],function(index,value){
		$('#boardTemplate').tmpl({'face':value}).appendTo('#'+value);
	});

	var b = new Board();

	$('.board a').hover(
		function() {
			if (!$(this).hasClass('played')) {
				$(this).html(whosTurn == cross ? cross : nought);
				$(this).addClass(whosTurn == cross ? 'cross' : 'nought');
				$(this).addClass('hover');
			}
		},
		function() {
			if ($(this).hasClass('hover')) {
				$(this).html('');
				$(this).removeClass('hover cross nought');
			}
		}
	);

	$('.board a').click(function(){
		if (!$(this).hasClass('played')) {
			$(this).removeClass('hover');
			b.movePlayed(this.id,this.className);
			$(this).addClass('played');
			turnRotate();
		}
		if (b.gameOver()) {
			alert('Game Over');
		}
		return false;
	});

	$('#reset').click(function(){
		$('.board a').html('');
		$('.board a').removeClass('played nought cross');
		return false;
	});


});


})(jQuery);























