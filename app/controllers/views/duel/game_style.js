var api = require('api-v1');
var deviceStorage = require('device-storage');
var kit = require('kit');
var utils = require('utils');

var result = {
	user:{},
	friend:{}
};

var data = {
	players:false,
	ready:false,
	map_center_in_percentage:50,
	map_size_x_y:256, // dimension(x,y) of game style map
	player_image_radius:16,
	map_edge: function() { // fix position of players at edge of map. value: 93,75
		return 100 - (this.player_image_radius*100/this.map_size_x_y);
	}//,
	/*played:function() {
		if (data.ready) {
			data.players = !data.players;
			$.played.opacity = data.players ? 1 : 0.75;
			$.others.visible = data.players;
			$.user_name.visible = $.friend_name.visible = !$.others.visible;
		}
	}*/
};

$.combative.text = L('combative').toUpperCase();
$.explosive.text = L('explosive').toUpperCase();
$.boxtobox.text = L('boxtobox').toUpperCase();
$.posicional.text = L('posicional').toUpperCase();

// $.played.addEventListener('click',data.played);

$.view.saveUserResults = function(results) {
	// set user position
	$.user.left = positionRatio(data.map_size_x_y, results.gameStyleSprintsX, 16);
	$.user.bottom = positionRatio(data.map_size_x_y, results.gameStyleDistanceY, 16);
	$.user_name.text = deviceStorage.GetAttr('user','username');
	
	// at edges, fix position
	if (results.gameStyleDistanceY >= data.map_edge()) { $.user.bottom = data.map_size_x_y-32; }
	if (results.gameStyleSprintsX >= data.map_edge()) {	$.user.left = data.map_size_x_y-32; }
	
	//position of users' name
	$.user_name.bottom = $.user.bottom;
	if (results.gameStyleSprintsX <= data.map_center_in_percentage) {
		$.user_name.left = $.user.left+34;
		$.user_name.textAlign = 'left'; 
	} else {
		$.user_name.left = $.user.left-104;
		$.user_name.textAlign = 'right'; 
	}
	
	result.user = results;
	constructor();
};
$.view.saveFriendResults = function(results) {
	// set friend position
	$.friend.left = positionRatio(data.map_size_x_y, results.gameStyleSprintsX, 16);
	$.friend.bottom = positionRatio(data.map_size_x_y, results.gameStyleDistanceY, 16);
	$.friend_name.text = deviceStorage.GetAttr('friend','username');
	
	// at edges, fix position
	if (results.gameStyleDistanceY >= data.map_edge()) { $.friend.bottom = data.map_size_x_y-32; }
	if (results.gameStyleSprintsX >= data.map_edge()) { $.friend.left = data.map_size_x_y-32; }
	
	//position of friends' name
	$.friend_name.bottom = $.friend.bottom;
	if (results.gameStyleSprintsX <= data.map_center_in_percentage) {
		$.friend_name.left = $.friend.left+34;
		$.friend_name.textAlign = 'left'; 
	} else {
		$.friend_name.left = $.friend.left-104;
		$.friend_name.textAlign = 'right';
	}
	
	result.friend = results;
	constructor();
};

var positionRatio = function(totalSize, position, displacement) {
	var result = (totalSize*position/100)-displacement;
	try {
		return result < 0 ? 0 : result;
	} catch(e) {
		return 0;
	}
};

 var constructor = function() {
	if (_.isEmpty(result.user) || (_.isEmpty(result.friend))) {
		return;
	}
	
//$.view.constructor = function(result) {
	//$.others.visible = data.ready = data.players = false;
	//$.played.opacity = 0.75;
	//$.others.removeAllChildren();
	
	$.others.visible = false;
	utils.removeAllVerticalViews($.others);
	
	api.mcWhoPlayedWithMe(result.user.participationID, function(result) {
		if (api.isValidResponse(result)) {
			result = _.isArray(result) ? result : [result];
			for (var i in result)
				$.others.add(Ti.UI.createImageView({
					width:16,
					height:16,
					borderWidth:1,
					borderRadius:8,
					borderColor:Alloy.CFG.colors.black,
					left:positionRatio(256, result[i].gameStyleSprintsX, 16),
					bottom:positionRatio(256, result[i].gameStyleDistanceY, 16),
					image:utils.loadImage(result[i].image)
				}));
		} else {
			//TODO on error
		}
	});

	var properties = {
		user:{
			val:parseFloat(parseFloat(result.user.gameStyleSprintsX)+parseFloat(result.user.gameStyleDistanceY))
		},
		friend:{
			val:parseFloat(parseFloat(result.friend.gameStyleSprintsX)+parseFloat(result.friend.gameStyleDistanceY))
		}
	};
	
	if (properties.user.val == properties.friend.val)
		properties.user.medal = properties.friend.medal = 'silver';
	else 
		properties[(properties.user.val > properties.friend.val) ? 'user' : 'friend'].medal = 'gold';
	
	$.user_pic.setImage(utils.loadImage(deviceStorage.GetAttr('user','image')));
	$.friend_pic.setImage(utils.loadImage(deviceStorage.GetAttr('friend','image')));
	
	kit.medal($.left_wrap, $.left_text, properties.user.medal);
	kit.medal($.right_wrap, $.right_text, properties.friend.medal);
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	//$.others.removeAllChildren();
	utils.removeAllVerticalViews($.others);
	//$.played.removeEventListener('click',data.played);
	data = result = null;
};