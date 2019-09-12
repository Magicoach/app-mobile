var deviceStorage = require('device-storage');
var utils = require('utils');

$.place.text = ($.args.rank || '')+'º';
$.name.text = utils.addLimitToText($.args.username);
$.total.text = ($.args.sum).toFixed(0).toString();
$.avg.text = ($.args.avg).toFixed(0).toString();
$.max.text = ($.args.max).toFixed(0).toString();
$.image.image = utils.loadImage($.args.image);

if ($.args.userID === deviceStorage.GetAttr('user','userID')) {
	$.view.backgroundColor = $.view.backgroundSelectedColor = Alloy.CFG.colors.light;
	$.place.color = $.name.color = $.total.color = $.avg.color = $.max.color = Alloy.CFG.colors.white;
}

if ($.args.isFriend === 1) {
	$.view.backgroundColor = $.view.backgroundSelectedColor = Alloy.CFG.colors.greenSmoke;
	$.place.color = $.name.color = $.total.color = $.avg.color = $.max.color = Alloy.CFG.colors.black;
	$.friend.visible = true;
}

$.view.destructor = function() {
	$.destroy();
	$.off();
};