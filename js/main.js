
function setBgCheckerColors(h, s, l){
	$('.color-bg').css('background-color', 'hsla('+h+', '+s+'%, '+l+'%, 1)');
	
}

$(function(){
	//render background
	setBgCheckerColors(203, 100, 50);
});

