var utils = require('utils');
var logManager = require('log-manager');

if (_.isString($.args.icon)) {
	$.image.image = '/images/icons/'+$.args.icon+'.png';
} else {
	$.icon.visible = $.image.visible = false;
	$.title.left = 10;
}

if (!_.isEmpty($.args.style)) {
	$.button.backgroundColor = $.args.style;
}

if (!_.isEmpty($.args.border)) {
	$.border.backgroundColor = $.args.border;
}

if (!_.isEmpty($.args.title)) {
	$.title.text = $.args.title;
}

var onClickButton = _.debounce(function(e) {
	logManager.add(64);
	$.args.touch();
}, 500, true);

$.button.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.button');
};