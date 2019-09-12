var utils = require('utils');
var logManager = require('log-manager');

$.search.blur = function() {
	utils.hideKeyboard();
	$.field.blur();
};

$.search.clear = function() {
	$.field.value = '';
	$.search.enabled();
};

$.search.enabled = function() {
	$.search.status = $.submit.touchEnabled = !_.isEmpty($.field.value);
	$.submit.opacity = $.submit.touchEnabled ? 1 : 0.75;
};

function onChangeText(e) {
	logManager.add(67);
	$.args.change($.field.value);
}

var onClickSearch = _.debounce(function(e) {
	logManager.add(68);
	$.args.touch();
}, 500, true);


$.search.destructor = function() {
	$.destroy();
	$.off();
	$.search.blur();
	utils.log('destructor.ui.search');
};