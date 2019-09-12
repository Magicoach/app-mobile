var logManager = require('log-manager');
var screenDimension = require('screen-dimension');

$.view.backgroundColor = $.args.backgroundColor || Alloy.CFG.colors.light;
$.view.width = $.args.width || Ti.UI.FILL; //screenDimension.getOneThirdWidth();
$.title.text = $.args.title || '';
$.icon.image = '/images/menu/'+$.args.icon+'.png';
	
var onClickFooter = _.debounce(function(e) {
	logManager.add(38);
	$.args.click();
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
};