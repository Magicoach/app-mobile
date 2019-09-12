var utils = require('utils');

var data = {
	'Loading':function(status) {
		WinSig.SCREEN.View.touchEnabled = !status;
		WinSig.SCREEN.View.zIndex = status ? 1 : 2;
		WinSig.SCREEN.Loading.zIndex = status ? 2 : 1;
		WinSig.SCREEN.Icon[status ? 'show' : 'hide']();
	},
	'Load':function(name,args) {
		utils.removeAllVerticalViews(WinSig.SCREEN.View);
		WinSig.SCREEN.View.add(Alloy.createController(name,args).getView());
	}
};

exports.Loading = data.Loading;
exports.Load = data.Load;