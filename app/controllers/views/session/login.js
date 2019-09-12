var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.buttons.add(Alloy.createController('ui/button', {
	title:L('login'),
	touch:function() {
		logManager.add(56);
		$.login.blur();
		_.delay(function() {
			$.user.color = Alloy.CFG.colors.darkGrey;
			$.user.borderColor = $.pass.borderColor = Alloy.CFG.colors.lightGrey;
		}, 2000);
		
		if (!($.user.value.length > 0 && utils.isEmail($.user.value))) {
			$.user.color = $.user.borderColor = Alloy.CFG.colors.red;
			return;
		}
		
		if (!$.pass.value.length > 0) {
			$.pass.borderColor = Alloy.CFG.colors.red;
			return;
		}
		
		api.mcLoginUser({'email':$.user.value, 'pw':$.pass.value}, function callback(result) {
			if (api.isValidResponse(result)) {
				deviceStorage.Set('user', result);
				Ti.Analytics.featureEvent('login:accepted');
				WinSig.CORE.Load('views/organizer');
			} else {
				WinSig.WARN.Show('done', {
					'backgroundColor':Alloy.CFG.colors.red,
					'title':L('login_error_title'),
					'text':L('login_error_text'),
					'desc':L('login_error_desc'),
					'close':WinSig.WARN.Hide
				});
			}
		});		
	}
}).getView());

var onClickForgotPassword = _.debounce(function(e) {
	logManager.add(57);
	$.login.blur();
	$.args.openForgotPassword();
}, 500, true);

var onClickBack = _.debounce(function(e) {
	logManager.add(58);
	$.login.blur();
	$.args.openStart();
}, 500, true);

$.login.blur = function() {
	utils.hideKeyboard();
	$.user.blur();
	$.pass.blur();
};

$.login.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.buttons);
	utils.log('destructor.session.login');
};