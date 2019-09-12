var utils = require('utils');
var logManager = require('log-manager');

$.title.text = L('sign_in').toUpperCase();

var onClickButton = _.debounce(function(e) {
	WinSig.CORE.Load('views/session/index');
}, 500, true);

$.button.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.buttonSession');
};