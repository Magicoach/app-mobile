var api = require('api-v1');
var kit = require('kit');
var screenDimension = require('screen-dimension');
var utils = require('utils');

var result = {
	user:{},
	friend:{}
};

var field = {};

$.left_map.width = $.right_map.width = screenDimension.getHalfWidth();
field.width = (screenDimension.getHalfWidth()-10).toFixed(0);
field.height = (screenDimension.getWidth()*0.75).toFixed(0); 
field.widthGoalLine = field.width;
field.heightGoalLine = field.height-17;

$.user_map.add(Alloy.createController('ui/maps/heatmap', field).getView());
$.friend_map.add(Alloy.createController('ui/maps/heatmap', field).getView());

$.view.saveUserResults = function(results) {
	api.mcPositionalMapVer(results.participationID, field.widthGoalLine, field.heightGoalLine, function callback(userMap) {
		if (api.isValidResponse(userMap)) {
			$.user_percent.text = results.percPositionalMap+'%';
			$.user_map.children[0].reload(_.isArray(userMap) ? userMap : [userMap]);
		} else {
			$.user_map.children[0].reload();
		}
		
		result.user = results;
		constructor();
	});
};
$.view.saveFriendResults = function(results) {
	api.mcPositionalMapVer(results.participationID, field.widthGoalLine, field.heightGoalLine, function callback(friendMap) {
		if (api.isValidResponse(friendMap)) {
			$.friend_percent.text = results.percPositionalMap+'%';
			$.friend_map.children[0].reload(_.isArray(friendMap) ? friendMap : [friendMap]);
		} else {
			$.friend_map.children[0].reload();
		}
		
		result.friend = results;
		constructor();
	});
};

 var constructor = function() {
	if (_.isEmpty(result.user) || (_.isEmpty(result.friend))) {
		return;
	}

	if (result.user.percPositionalMap === result.friend.percPositionalMap) {
		kit.medal($.left_wrap,$.left_text,'silver');
		kit.medal($.right_wrap,$.right_text,'silver');
	} else {
		var im_winner = (result.user.percPositionalMap > result.friend.percPositionalMap);
		kit.medal(im_winner ? $.left_wrap : $.right_wrap, im_winner ? $.left_text : $.right_text, 'gold');
		kit.medal(im_winner ? $.right_wrap : $.left_wrap, im_winner ? $.right_text : $.left_text);
	}
	result.user = result.friend = null;
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.user_map);
	utils.removeAllVerticalViews($.friend_map);
	field = result = null;
};