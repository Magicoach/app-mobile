var api = require('api-v1');
var logManager = require('log-manager');
var utils = require('utils');
	
$.buttons.add(Alloy.createController('ui/button', {
	title:L('reset_pass'),
	touch:function() {
		logManager.add(54);
		$.forgot.blur();
		_.delay(function() {
			$.user.color = Alloy.CFG.colors.darkGrey;
			$.user.borderColor = Alloy.CFG.colors.lightGrey;
		}, 2000);
		
		if (!($.user.value.length > 0 && utils.isEmail($.user.value))) {
			$.user.color = $.user.borderColor = Alloy.CFG.colors.red;
			return;
		}

		api.mcUpdatePassword({'email':$.user.value}, function callback(result) {
			WinSig.WARN.Show('done',{
				'title':L('forgot_done_title'),
				'text':L('forgot_done_text'),
				'desc':L('forgot_done_desc'),
				'close':function() {
					WinSig.WARN.Hide();
					$.args.openLogin();
				}
			});
		});
	}
}).getView());
 
$.forgot.blur = function() {
	utils.hideKeyboard();
	$.user.blur();
};

var onClickBack = _.debounce(function(e) {
	logManager.add(55);
	$.forgot.blur();
	$.args.openLogin();
}, 500, true);

$.forgot.destructor = function() {
	$.destroy();
	$.off();
	$.forgot.blur();
	utils.removeAllVerticalViews($.buttons);
	utils.log('destructor.session.forgot');
};