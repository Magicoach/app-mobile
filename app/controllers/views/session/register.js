var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.buttons.add(Alloy.createController('ui/button', {
	'title':L('register'),
	'touch':function() {
		logManager.add(59);
		$.register.blur();
		_.delay(function() {
			$.user.color = $.name.color = Alloy.CFG.colors.darkGrey;
			$.user.borderColor = $.name.borderColor = $.pass.borderColor = $.pass2.borderColor = Alloy.CFG.colors.lightGrey;
		}, 2000);
		
		if (!($.user.value.length > 0 && utils.isEmail($.user.value))) {
			$.user.color = $.user.borderColor = Alloy.CFG.colors.red;
			return;
		}
		
		if (!($.name.value.length > 0 && $.name.value.length < 18)) {
			$.name.color = $.name.borderColor = Alloy.CFG.colors.red;
			return;
		}
		
		if (!($.pass.value.length > 0 && $.pass.value === $.pass2.value)) {
			$.pass.borderColor = $.pass2.borderColor = Alloy.CFG.colors.red;
			return;
		}
		
		api.mcRegisterUser({'email':$.user.value, 'username':$.name.value, 'pw':$.pass.value}, function callback(result) {
			if (api.isValidResponse(result)) {
				deviceStorage.Set('user', result);
			 	Ti.Analytics.featureEvent('login:accepted');
				WinSig.CORE.Load('views/organizer');
			} else {
				WinSig.WARN.Show('done', {
					'backgroundColor':Alloy.CFG.colors.red,
					'title':L('register_error_title'),
					'text':L('register_error_text'),
					'desc':L('register_error_desc'),
					'close':WinSig.WARN.Hide
				});
			}
		});
	}
}).getView());
 
$.register.blur = function() {
	utils.hideKeyboard();
	$.user.blur();
	$.name.blur();
	$.pass.blur();
	$.pass2.blur();
};

var onClickBack = _.debounce(function(e) {
	logManager.add(60);
	$.register.blur();
	$.args.openStart();
}, 500, true);

$.register.destructor = function() {
	$.destroy();
	$.off();
	$.register.blur();
	utils.removeAllVerticalViews($.buttons);
	utils.log('destructor.session.register');
};