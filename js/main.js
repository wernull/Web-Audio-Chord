
function setBgCheckerColors(h, s, l){
	$('.color-bg').css('background-color', 'hsla('+h+', '+s+'%, '+l+'%, 1)');
	
}

function init(){
	//render background
	setBgCheckerColors(203, 100, 50);
	TweenMax.to($('.pointer-x'), 1.3, {rotation:-360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
	TweenMax.to($('.pointer-y'), 1, {rotation:360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
}

$(init());

