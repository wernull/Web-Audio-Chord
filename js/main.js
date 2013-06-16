$(function(){
	//render checker background
	var checkers = '',
	numColors = 39,
	classNum = 0;

	for (var i = 0; i < 10000; i++) {
		checkers += '<div class="checker' + classNum + '"></div>';
		if(classNum < numColors){
			classNum++;
		}else{
			classNum = 0;
		}
	}
	$('.checker-bg').empty().append(checkers);

});

