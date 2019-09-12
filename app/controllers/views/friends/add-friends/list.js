var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.pending_label.text = L('pending_invites').toUpperCase();
$.friends_label.text = 'Friends'.toUpperCase();

api.mcPendingInvites(function callback(result) {
	if (api.isValidResponse(result)) {
		result = _.isArray(result) ? result : [result];
		var rows = [];
		for (var i in result) {
			rows.push(Alloy.createController('views/friends/add-friends/item', result[i]).getView());
		}
		$.pending_list.setData(rows);
		$.pending_list.setHeight(3*42);
	} else {
		// TODO on error to stuff.
	}
});

api.mcGetFriends(function callback(result) {
	if (api.isValidResponse(result)) {
		result = _.isArray(result) ? result : [result];
		var rowsFriends = [];
		for (var i in result) {
			rowsFriends.push(Alloy.createController('views/friends/add-friends/item', result[i]).getView());
		}
		$.friend_list.setData(rowsFriends);
		$.friend_list.setHeight(rowsFriends.length*42);		
	} else {
		//TODO on error
	}
});

var onClickSearchList = _.debounce(function(table) {
	logManager.add(20);
	if (table.source && table.source.id && table.source.enabled && (table.source.id == 'status' || table.source.id == 'status_icon')) {
		if (table.source.status == 'stranger' || table.source.status == 'confirm_friendship') {
			table.row.touch(false);
		}

		if (table.source.status == 'stranger') {
			api.mcCreateInvite({'id':deviceStorage.GetAttr('user','userID'), 'to':table.row.id}, function callback(result) {
				if (api.isValidResponse(result)) {
					table.row.invite();
					table.row.touch(true);
				} else {
					//TODO
				}
			});
		}
		
		if (table.source.status == 'confirm_friendship') {
			api.mcAcceptInvite({'id':deviceStorage.GetAttr('user','userID'), 'from':table.row.id}, function callback(result) {
				if (api.isValidResponse(result)) {
					table.row.accept();	
					table.row.touch(true);
				} else {
					//TODO
				}
			});
		}
	}
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	$.pending_list.setData([]);
	$.friend_list.setData([]);
};