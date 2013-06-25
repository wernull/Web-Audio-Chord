app = {
	site: $('html'),
	dialMarkup: '<div class="dial"><div class="pointer-x"></div><div class="pointer-y"></div></div>',
	bg: $('.color-bg'),
	dialPool: [],

	init: function(){
		//render background
		app.setBgCheckerColors(203, 100, 50);

		//render dial
		app.addNewDial();
		app.halfDial = app.dial.width()/2;

		//start listeners
		app.setMoveEvents();
	},

	addNewDial: function(startX, startY){
		var newDial = $(app.dialMarkup);
		app.dialPool.push(newDial);
		app.dial = app.dialPool[0];
		app.site.append(newDial);
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
		//assume dial width and height are equal

		//keep dial within bounds of viewport
		var leftTo = e.pageX > app.halfDial ? e.pageX : app.halfDial;
		var topTo = e.pageY > app.halfDial ? e.pageY : app.halfDial;
		if(leftTo > app.site.width() - app.halfDial){
			leftTo = app.site.width() - app.halfDial;
		}
		if(topTo > app.bg.height() - app.halfDial){
			topTo = app.bg.height() - app.halfDial;
		}

		//find percentage for x and y values of dial
		var xPercent = app.dial.offset().left / (app.site.width() - app.halfDial*2);
		var yPercent = app.dial.offset().top / (app.bg.height() - app.halfDial*2);

		//tween dial and hands. Hands 0-100% are 20-340
		var rotX = xPercent * 320 - 160;
		var rotY = yPercent * 320 - 160;
		TweenMax.to(app.dial, .1, {left: leftTo, top: topTo});
		TweenMax.to($('.pointer-x'), 1, {rotation:rotX, transformOrigin:"47% bottom", ease:Back.easeOut});
		TweenMax.to($('.pointer-y'), 1, {rotation:rotY, transformOrigin:"47% bottom", ease:Back.easeOut});
	}


}

$(app.init());

