var logManager = require('log-manager');
var screenDimension = require('screen-dimension');
var utils = require('utils');

var data = {
	coords:0,
	limitToUnlock:screenDimension.getWidth()-$.button.getWidth()-$.title.getRight(),
	touchend:function() {
		$.button.animate({left:14, duration:150});
	},
	touchcancel:function() {	
		$.button.animate({left:14, duration:150});
	},
	touchmove:function(e) {
		data.coords = e.source.convertPointToView({
			x:e.x,
			y:e.y
		}, $.view);
		
		try {
			var size = (OS_IOS) ? data.coords.x : data.coords.x/screenDimension.getRatio();
			if (size > 14 && size < data.limitToUnlock) {
				$.button.left = size;
			}
			
			if (size >= data.limitToUnlock-5) { // easier unlock
				$.locker.unlock();
			}
		} catch(e) { // out of bounds?
			utils.log(e, 'error');
			$.locker.unlock();
		}
	}
};

$.locker.lock = function() {
	$.button.left = 14;
	$.locker.zIndex = 100;
	$.locker.visible = $.locker.touchEnabled = true;
};

$.locker.unlock = function() {
	$.locker.zIndex = 1;
	$.locker.visible = $.locker.touchEnabled = false;
	$.button.left = 14;
};

$.button.addEventListener('touchmove',data.touchmove);
$.button.addEventListener('touchend',data.touchend);
$.button.addEventListener('touchcancel',data.touchcancel);

$.locker.destructor = function() {
	$.destroy();
	$.off();
	$.locker.unlock();
	$.button.removeEventListener('touchmove',data.touchmove);
	$.button.removeEventListener('touchend',data.touchend);
	$.button.removeEventListener('touchcancel',data.touchcancel);
};