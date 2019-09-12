var utils = require('utils');

$.user.userID = $.args.userID;
$.user.username = $.name.text = $.args.username;
$.user.image = $.args.image;
$.user.magicpoints = $.args.magicpoints; // really needed?
$.image.image = utils.loadImage($.args.image);
$.points.text = $.args.hide ? '' : utils.addDotSeparator($.args.magicpoints)+' PTS';

if (!_.isEmpty($.args.bg)) {
	$.user.backgroundColor = $.user.backgroundSelectedColor = $.args.bg;	
}

var onClickItem = _.debounce(function(e) {
	e.userID = $.user.userID;
	e.username = $.user.username;
	e.image = $.user.image;
	$.args.click(e);
}, 500, true);

$.user.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.ui.user');
};