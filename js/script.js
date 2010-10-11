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

$(function(){

	$.each(["2_1","1_2","2_2","3_2","2_3","2_4"],function(index,value){
		$('#boardTemplate').tmpl([{'index':'1'}]).appendTo('#'+value);
	});

	$('#board a').hover(
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
				$(this).removeClass('hover');
			}
		}
	);

	$('#board a').click(function(){
		if (!$(this).hasClass('played')) {
			turnRotate();
			$(this).removeClass('hover');
			$(this).addClass('played');
		}
		return false;
	});

	$('#reset').click(function(){
		$('#board a').html('');
		$('#board a').removeClass('played nought cross');
		return false;
	});


});


})(jQuery);























