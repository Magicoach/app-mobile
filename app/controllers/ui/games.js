var moment = require('alloy/moment');
var logManager = require('log-manager');
var utils = require('utils');

$.time.text = moment($.args.date).format('DD/MM/YYYY HH:mm - ');
$.time.text += utils.addLimitToText($.args.fieldName) + ' ('+ $.args.fieldSize + 'x' + $.args.fieldSize + ')';
$.points.text = utils.addDotSeparator($.args.points)+' PTS';
$.view.date = $.args.date;

if (utils.isMagicoachFreeVersion() && utils.isSessionActive()) {
	$.logo_gold.visible = true;
	$.points.right = 50;
}

$.view.select = function(status) {
	$.view.status = status;
	$.time.color = status ? Alloy.CFG.colors.white : Alloy.CFG.colors.darkGrey;
	$.points.color = status ? Alloy.CFG.colors.white : Alloy.CFG.colors.green;
	$.view.backgroundColor = status ? $.args.style : Alloy.CFG.colors.white;
	if (utils.isMagicoachFreeVersion() && utils.isSessionActive()) {
		$.logo_gold.visible = !status;
		if ($.logo_gold.visible) {
			$.points.right = 50;
		} else {
			$.points.right = 20;
		}
	}
};

var onClickItem = _.debounce(function(e) {
	if (!utils.isMagicoachFreeVersion() || !$.logo_gold.visible) {
		logManager.add(65);
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

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.games');
};