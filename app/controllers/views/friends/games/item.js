var moment = require('alloy/moment');
var logManager = require('log-manager');
var utils = require('utils');

$.image.image = utils.loadImage($.args.image);
$.name.text = utils.addLimitToText($.args.username);
$.date.text = moment($.args.date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY');
$.goals.text = $.args.goals;
$.points.text = utils.addDotSeparator($.args.magicpoints);
$.field.text = utils.addLimitToText($.args.fieldName) + ' ('+ $.args.fieldSize + 'x' + $.args.fieldSize + ')';

if (utils.isMagicoachFreeVersion()) {
	$.logo_gold.visible = true;
	$.date.right = 50;
}

$.item.hidePremium = function(status) {
	$.logo_gold.visible = !status;
	if($.logo_gold.visible) {
		$.date.right = 50;
	} else {
		$.date.right = 20;
	}
};

var onClickItem = _.debounce(function(e) {
	if (!utils.isMagicoachFreeVersion() || !$.logo_gold.visible) {
		logManager.add(35);
		$.args.click();
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

$.item.destructor = function() {
	$.destroy();
	$.off();
};