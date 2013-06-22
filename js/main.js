var app = {
	dial: $('.dial'),
	site: $('html'),
	bg: $('.color-bg'),
	init: function(){
		//render background
		app.setBgCheckerColors(203, 100, 50);
		app.setMoveEvents();
	},
	setBgCheckerColors: function(h, s, l){
		app.bg.css('background-color', 'hsla('+h+', '+s+'%, '+l+'%, 1)');	
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
		var leftTo = e.pageX > app.dial.width()/2 ? e.pageX : app.dial.width()/2;
		var topTo = e.pageY > app.dial.height()/2 ? e.pageY : app.dial.height()/2;

		if(leftTo > app.site.width() - app.dial.width()/2){
			leftTo = app.site.width() - app.dial.width()/2;
		}
		if(topTo > app.bg.height() - app.dial.height()/2){
			topTo = app.bg.height() - app.dial.height()/2;
		}
			
		

		TweenMax.to(app.dial, .1, {left: leftTo, top: topTo});



		//TweenMax.to($('.pointer-x'), 1.3, {rotation:-360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
		//TweenMax.to($('.pointer-y'), 1, {rotation:360, transformOrigin:"47% bottom", repeat:-1, ease:Linear.easeNone});
	}

}

$(app.init());

