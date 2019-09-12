var logManager = require('log-manager');
var utils = require('utils');

$.buttons.add(Ti.UI.createView({
	'bottom':20,
	'left':60,
	'right':60,
	'height':1,
	'backgroundColor':Alloy.CFG.colors.lightGrey
}));

$.buttons.add(Alloy.createController('ui/button', {
	'title':L('email_register'),
	'style':Alloy.CFG.colors.light,
	'touch':function() {
		logManager.add(61);
		$.args.openRegister();
	}
}).getView());

$.buttons.add(Alloy.createController('ui/button', {
	'title':L('account_created'),
	'style':Alloy.CFG.colors.dark,
	'touch':function() { 
		logManager.add(62);
		$.args.openLogin();
	}
}).getView());

var onClickFooter = _.debounce(function(e) {
	logManager.add(63);
	Ti.Platform.openURL(Alloy.CFG.termsAndCondition);
}, 500, true);

$.start.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.buttons);
	utils.log('destructor.session.start');
};