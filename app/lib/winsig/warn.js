var utils = require('utils');

var data = {
	'Show':function(view, properties, style) {			
		utils.removeAllVerticalViews(WinSig.SCREEN.WarnContent);
		WinSig.SCREEN.WarnContent.add(Alloy.createController('ui/popup/'+view, properties).getView());
		WinSig.SCREEN.Warn.zIndex = 10;
		WinSig.SCREEN.Warn.animate({
			'opacity':1,
			'duration':75
		});
	},
	'Hide':function() {
		WinSig.SCREEN.Warn.zIndex = 1;
		WinSig.SCREEN.Warn.animate(Ti.UI.createAnimation({
			'opacity':0,
			'duration':75
		}));
	}
};

exports.Show = data.Show;
exports.Hide = data.Hide;