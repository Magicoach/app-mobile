var utils = require('utils');

var PlayMenu = {
	changeToPlayComplete:function() {
		utils.removeAllVerticalViews($.container);
		$.container.add(Alloy.createController('views/play/complete', PlayMenu).getView());	
	}
};
	
$.container.add(Alloy.createController('views/play/play', PlayMenu).getView());

$.view.constructor = function() {
};
	
$.view.destructor = function() {
	$.destroy();
	$.off();
	PlayMenu = null;
	utils.removeAllVerticalViews($.container);
	utils.log('destructor.play.index');
};