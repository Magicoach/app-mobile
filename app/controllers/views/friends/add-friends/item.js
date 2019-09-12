var utils = require('utils');

$.name.text = $.args.username;
$.icon.image = utils.loadImage($.args.image);
$.item.id = $.args.userID;
$.item.status = $.status.status = $.status_icon.status = $.args.state;
$.item.enabled = $.status.enabled = $.status_icon.enabled = true;

$.item.touch = function(status) {
	$.icon.opacity = $.name.opacity = $.status.opacity = status ? 1 : 0.75;
	$.item.enabled = $.status.enabled = $.status_icon.enabled = status;
};

$.item.accept = function() {
	$.item.status = $.status.status = $.status_icon.status = 'friend';
	$.status_icon.image = '/images/invites/checked.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.dark;
};

$.item.invite = function() {
	$.item.status = $.status.status = $.status_icon.status = 'invite_sent';
	$.status_icon.image = '/images/invites/waiting.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.gold;
};

if ($.args.state == 'invite_sent') {
	$.status_icon.image = '/images/invites/waiting.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.gold;
}

if ($.args.state == 'stranger') {
	$.status_icon.image = '/images/invites/accept.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.light;
}

if ($.args.state == 'friend') {
	$.status_icon.image = '/images/invites/checked.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.dark;
}

if ($.args.state == 'confirm_friendship') {
	$.status_icon.image = '/images/invites/checked.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.light;
}

$.item.destructor = function() {
	$.destroy();
	$.off();
};