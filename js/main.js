var app = {
	dial: $('.dial'),
	site: $('html'),
	init: function(){
		//render background
		app.setBgCheckerColors(203, 100, 50);
		app.setMoveEvents();
	},
	setBgCheckerColors: function(h, s, l){
		$('.color-bg').css('background-color', 'hsla('+h+', '+s+'%, '+l+'%, 1)');	
	},
	setMoveEvents: function(){
		app.site.on('mousedown', function(e){app.enableMovement(e)});
		app.site.on('mouseup', function(e){app.disableMovement(e)});
	},
	enableMovement: function(e){
		TweenMax.to(app.dial, .2, {left: e.pageX, top: e.pageY});
		app.site.on('mousemove', function(e){app.onMove(e)});
	},
	disableMovement: function(e){
		app.site.off('mousemove');
	},
	onMove: function(e){
		TweenMax.to(app.dial, .1, {left: e.pageX, top: e.pageY});



		//TweenMax.to($('.pointer-x'), 1.3, {rotation:-360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
		//TweenMax.to($('.pointer-y'), 1, {rotation:360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
	}

}

$(app.init());

