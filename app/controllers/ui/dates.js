var moment = require('alloy/moment');
var logManager = require('log-manager');
var utils = require('utils');

$.date.text = $.args.text;
$.view.text = $.args.text;

if (utils.isMagicoachFreeVersion() && utils.isSessionActive()) {
	$.logo_gold.visible = true;
}

$.view.select = function(status) {
	$.date.color = status ? Alloy.CFG.colors.white : Alloy.CFG.colors.darkest;
	$.view.backgroundColor = status ? Alloy.CFG.colors.green : Alloy.CFG.colors.white;
	if (utils.isMagicoachFreeVersion() && utils.isSessionActive()) {
		$.logo_gold.visible = !status;
	}
};

var onClickItem = _.debounce(function(e) {
	if (!utils.isMagicoachFreeVersion() || !$.logo_gold.visible) {
		logManager.add(35);
		$.args.click(e);
	} else {
		WinSig.WARN.Show('options', {
			'title':'GET PREMIUM APP!',
			'text':'Visit Appstore.',
			'yes':function() {
				$.args.close();
				Ti.Platform.openURL(Alloy.CFG.linkPro);
				WinSig.WARN.Hide();
			},
			'no':function() {
				$.args.close();
				WinSig.WARN.Hide();
			}
		});
	}
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.dates');
};