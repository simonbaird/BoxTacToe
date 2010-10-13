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
	return this;
}

$.extend(Board.prototype,{
	gameOver: function() {
		return false;
	},

	movePlayed: function(position_string,player) {
		//console.log(position_string + ": " + player);
		position = position_string.split('_');
		// todo
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























