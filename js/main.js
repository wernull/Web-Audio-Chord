app = {
	site: $('html'),
	dialMarkup: '<div class="dial"><div class="pointer-x"></div><div class="pointer-y"></div></div>',
	bg: $('.color-bg'),
	dialPool: [],

	init: function(){
		//render background
		app.setBgColor(203, 50, 50);

		//render dial
		app.addNewDial();
		app.halfDial = app.dial.width()/2;

		//start listeners
		app.setMoveEvents();

		app.initAudio();
	},

	addNewDial: function(startX, startY){
		var newDial = $(app.dialMarkup);
		app.dialPool.push(newDial);
		app.dial = app.dialPool[0];
		app.site.append(newDial);
	},

	setBgColor: function(h, s, l){
		app.bg.css('background-color', 'hsla('+h+', '+s+'%, '+l+'%, 1)');	
	},

	setMoveEvents: function(){
		app.site.on('mousedown', function(e){app.enableMovement(e)});
		app.site.on('mouseup', function(e){app.disableMovement(e)});
	},

	enableMovement: function(e){
		app.site.on('mousemove', function(e){app.onMove(e)});
	},

	disableMovement: function(e){
		app.currentMovingDial = false;
		app.site.off('mousemove');
	},

	onMove: function(e){
		//check for dials under event, new dials can be added here
		var hitDial = $(e.target);
		if(hitDial.hasClass("dial") || app.currentMovingDial){
			app.currentMovingDial = true;
			app.updateXY(e.pageX, e.pageY);
		}
	},

	updateXY: function(epX, epY){
		//assume dial width and height are equal
		//keep dial within bounds of viewport
		var leftTo = epX > app.halfDial ? epX : app.halfDial;
		var topTo = epY > app.halfDial ? epY : app.halfDial;
		if(leftTo > app.site.width() - app.halfDial){
			leftTo = app.site.width() - app.halfDial;
		}
		if(topTo > app.bg.height() - app.halfDial){
			topTo = app.bg.height() - app.halfDial;
		}

		TweenMax.to(app.dial, .1, {left: leftTo, top: topTo});

		//find percentage for x and y values of dial
		var xPercent = app.dial.offset().left / (app.site.width() - app.halfDial*2);
		var yPercent = app.dial.offset().top / (app.bg.height() - app.halfDial*2);

		app.setDialHands(xPercent, yPercent);
		app.setBgColorFromXY(xPercent, yPercent);
		app.setAudioFromXY(xPercent, yPercent);
	},

	setDialHands: function(xP, yP){
		//tween dial and hands. Hands 0-100% are 20-340
		var rotX = xP * 320 - 160;
		var rotY = yP * 320 - 160;
		TweenMax.to($('.pointer-x'), 1, {rotation:rotX, transformOrigin:"47% bottom", ease:Back.easeOut});
		TweenMax.to($('.pointer-y'), 1, {rotation:rotY, transformOrigin:"47% bottom", ease:Back.easeOut});
	},

	setBgColorFromXY: function(xP, yP){
		app.setBgColor(353-300*xP, 100-yP*100, 50);
	},

	//audio section
	oscillator: null,
	gainNode: null,
	initAudio: function(){
		var contextClass = window.AudioContext || window.webkitAudioContext;
		if (contextClass) {
		  // Web Audio API is available.
		  var context = new contextClass();
		} else {
		  // Web Audio API is not available.
		  alert('Web Audio API not available')
		}

		app.oscillator = context.createOscillator();
		app.gainNode = context.createGainNode();
		app.gainNode.gain.value = 1;
		app.oscillator.connect(app.gainNode);
		app.gainNode.connect(context.destination);
		app.oscillator.frequency.value = 440;
		app.oscillator.type = app.oscillator.SINE;
		app.oscillator.start(0);

	},

	setAudioFromXY: function(xP, yP){
		app.oscillator.detune.value = (xP - .5) * 1000;
		app.gainNode.gain.value = 1 - yP;

	}

}

$(app.init());

