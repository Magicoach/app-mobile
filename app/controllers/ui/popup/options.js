var logManager = require('log-manager');

$.title.text = $.args.title || '';
$.text.text = $.args.text || '';

if (!_.isEmpty($.text.text)) {
	$.text.bottom = 20;
}

if (!_.isEmpty($.args.backgroundColor)) {
	$.popup.backgroundColor = $.args.backgroundColor;
}

var onClickNo = _.debounce(function(e) {
	logManager.add(70);
	$.args.no(); 
}, 500, true);

var onClickYes = _.debounce(function(e) {
	logManager.add(71);
	$.args.yes(); 
}, 500, true);

$.popup.destructor = function() {
	$.destroy();
	$.off();
};