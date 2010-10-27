/*
 *	Author:  Simon Baird
 *
 */
;(function($){

var cross    = '\u25EF',
	nought   = '\u2715',
	blank    = '',
	whosTurn = cross;

function turnRotate() {
	whosTurn = (whosTurn == cross) ? nought : cross;
}

//
// A face
// Six of them make a cube
//
function Face(name,edges) {
	// A face has four edges, north, south, east and west
	// (Am imagining the cube unfolded here, otherwise it gets confusing)
	this.name  = name;
	this.edges = edges;
	return this;
}

function Cube() {
	//
	// Imagine you are holding the cube and looking at it
	// Left is your left, right is your right.
	// Front is closest to you. Back is furthest from you.
	//
	// Now imagine unfolding the box with the front in the middle,
	// so it looks like this:
	//       +-----+
	//       | Top |
	// +-----+-----+-----+
	// | Left| Frnt| Rght|
	// +-----+-----+-----+
	//       | Botm|
	//       +-----+
	//       | Back|
	//       +-----+
	this.faces = {
		top: new Face('top',{
			north: {face:'back',  edge:'south'},
			south: {face:'front', edge:'north'},
			west:  {face:'left',  edge:'north'},
			east:  {face:'right', edge:'north'},
		}),

		left: new Face('left',{
			north: {face:'top',   edge:'west'},
			south: {face:'bottom',edge:'west'},
			west:  {face:'back',  edge:'west'},
			east:  {face:'front', edge:'west'},
		}),
		front: new Face('front',{
			north: {face:'top',   edge:'south'},
			south: {face:'bottom',edge:'north'},
			west:  {face:'left',  edge:'east'},
			east:  {face:'right', edge:'west'}
		}),
		right: new Face('right',{
			north: {face:'top',   edge:'east'},
			south: {face:'bottom',edge:'east'},
			west:  {face:'front', edge:'east'},
			east:  {face:'back',  edge:'east'}
		}),
		bottom: new Face('bottom',{
			north: {face:'front', edge:'south'},
			south: {face:'back',  edge:'north'},
			west:  {face:'left',  edge:'south'},
			east:  {face:'right', edge:'south'}
		}),
		back: new Face('back',{
			north: {face:'bottom',edge:'south'},
			south: {face:'top',   edge:'north'},
			west:  {face:'left',  edge:'west'},
			east:  {face:'right', edge:'east'}
		})
	};

	return this;
}


function Board() {
	this.cube = new Cube(); // not used yet

	this.squares = {
		'top':  [[],[],[]],
		'left':[[],[],[]],
		'front':[[],[],[]],
		'right': [[],[],[]],
		'bottom': [[],[],[]],
		'back': [[],[],[]]
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

	$.each(["top","left","front","right","bottom","back"],function(index,value){
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























