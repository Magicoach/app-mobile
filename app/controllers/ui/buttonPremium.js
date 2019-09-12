var utils = require('utils');
var logManager = require('log-manager');

$.title.text = L('go_premium').toUpperCase();

var onClickButton = _.debounce(function(e) {
	$.args.click();
}, 500, true);

$.button.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.buttonPremium');
};