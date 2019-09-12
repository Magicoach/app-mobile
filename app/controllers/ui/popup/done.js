var logManager = require('log-manager');

$.title.text = $.args.title || '';
$.text.text = $.args.text || '';
$.desc.text = $.args.desc || '';

if (!_.isEmpty($.args.backgroundColor)) {
	$.popup.backgroundColor = $.args.backgroundColor;
	$.icon.image = '/images/icons/no.png';
}

var onClickClose = _.debounce(function(e) {
	logManager.add(69);
	$.args.close(); 
}, 500, true);

$.popup.destructor = function() {
	$.destroy();
	$.off();
};