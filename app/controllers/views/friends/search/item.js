var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.name.text = $.args.username;
if (!_.isEmpty($.args.city)) {
	$.name.text += ', ' + $.args.city;
}
$.icon.image = utils.loadImage($.args.image);
$.item.status = $.status.status = $.status_icon.status = $.args.state;

var acceptInvite = function(receivedUserID) {
	api.mcAcceptInvite({'id':deviceStorage.GetAttr('user','userID'), 'from':receivedUserID}, function callback(result) {
		if (api.isValidResponse(result)) {
			$.item.status = $.status.status = $.status_icon.status = 'friend';
			$.status_icon.image = '/images/invites/checked.png';
			$.status_icon.backgroundColor = Alloy.CFG.colors.dark;
		} else {
			$.item.animate(Ti.UI.createAnimation({
				opacity:0.2,
				backgroundColor:Alloy.CFG.colors.red,
				duration:50
			}));
			_.delay(function() {
				$.item.opacity = 1;
				$.item.backgroundColor = Alloy.CFG.colors.white;
			}, 100);
		}
	});
};

var createInvite = function(targetUserID) {
	api.mcCreateInvite({'id':deviceStorage.GetAttr('user','userID'), 'to':targetUserID}, function callback(result) {
		if (api.isValidResponse(result)) {
			$.item.status = $.status.status = $.status_icon.status = 'invite_sent';
			$.status_icon.image = '/images/invites/waiting.png';
			$.status_icon.backgroundColor = Alloy.CFG.colors.gold;
		} else {
			$.item.animate(Ti.UI.createAnimation({
				opacity:0.2,
				backgroundColor:Alloy.CFG.colors.red,
				duration:50
			}));
			_.delay(function() {
				$.item.opacity = 1;
				$.item.backgroundColor = Alloy.CFG.colors.white;
			}, 100);
		}
	});
};

if ($.args.state === 'invite_sent') {
	$.status_icon.image = '/images/invites/waiting.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.gold;
}

if ($.args.state === 'stranger') {
	$.status_icon.image = '/images/invites/accept.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.light;
}

if ($.args.state === 'friend') {
	$.status_icon.opacity = 0.1;
	$.status_icon.image = '/images/invites/checked.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.dark;
	$.item.backgroundColor = $.item.backgroundSelectedColor = Alloy.CFG.colors.greenSmoke;
	$.name.color = Alloy.CFG.colors.black;
	$.friend.visible = true;
}

if ($.args.state === 'confirm_friendship') {
	$.status_icon.image = '/images/invites/checked.png';
	$.status_icon.backgroundColor = Alloy.CFG.colors.light;
}

var onClickItem = _.debounce(function(e) {
	logManager.add(20);
	e.acceptInvite = function(arg) {
		acceptInvite(arg);
	};
	e.createInvite = function(arg) {
		createInvite(arg);
	};
	e.state = $.args.state;
	e.userID = $.args.userID;
	$.args.click(e);
}, 500, true);

$.item.destructor = function() {
	$.destroy();
	$.off();
};