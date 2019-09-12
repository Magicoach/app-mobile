var kit = require('kit');
var utils = require('utils');

var result = {
	user:{},
	friend:{}
};

$.defense.text = L('defense').toUpperCase();
$.middle.text = L('middle').toUpperCase();
$.attack.text = L('attack').toUpperCase();

$.view.builder = function(val) {
	return (parseFloat(val) > 0) ? parseFloat(val).toFixed(1) : 0;
};
	
var build_values = function(user,friend,mode,win) {
	$['win_left_'+mode].visible = $['win_right_'+mode].visible = $['medal_left_'+mode].visible = $['medal_right_'+mode].visible = true;
	$['user_'+mode].width = $['friend_'+mode].width = $['user_'+mode].height = $['friend_'+mode].height = 26;
	$['user_'+mode].borderRadius = $['friend_'+mode].borderRadius = 13;
	$['win_left_'+mode].color = $['win_right_'+mode].color = $['medal_left_'+mode].borderColor = $['medal_right_'+mode].borderColor = Alloy.CFG.colors.grey;
	$['medal_left_'+mode].backgroundColor = $['medal_right_'+mode].backgroundColor = Alloy.CFG.colors.grey;
	$['win_left_'+mode].text = $['win_right_'+mode].text = L('draw');
	
	if (win == 0) {
		$['user_'+mode].width = $['user_'+mode].height = 40;
		$['user_'+mode].borderRadius = 20;
		$['win_right_'+mode].visible = $['medal_right_'+mode].visible = false;
		$['win_left_'+mode].color = Alloy.CFG.colors.gold;
		$['medal_left_'+mode].borderColor = Alloy.CFG.colors.gold;
		$['medal_left_'+mode].backgroundColor = Alloy.CFG.colors.gold;
		$['win_left_'+mode].visible = true;
		$['win_left_'+mode].text = L('winner');
	}
	
	if (win == 2) {
		$['friend_'+mode].width = $['friend_'+mode].height = 40;
		$['friend_'+mode].borderRadius = 20;
		$['win_left_'+mode].visible = $['medal_left_'+mode].visible = false;
		$['win_right_'+mode].color = Alloy.CFG.colors.gold;
		$['medal_right_'+mode].borderColor = Alloy.CFG.colors.gold;
		$['medal_right_'+mode].backgroundColor = Alloy.CFG.colors.gold;
		$['win_right_'+mode].visible = true;
		$['win_right_'+mode].text = L('winner');
	}

	$['user_'+mode].text = $.view.builder(user);
	$['friend_'+mode].text = $.view.builder(friend);
}; 

$.view.saveUserResults = function(results) {
	result.user = results;
	constructor();
};
$.view.saveFriendResults = function(results) {
	result.friend = results;
	constructor();
};

 var constructor = function() {
	if (_.isEmpty(result.user) || (_.isEmpty(result.friend))) {
		return;
	}
	
	var properties = {
		attack:1.0,
		middle:1.0,
		defense:1.0
	};
	
	if($.view.builder(result.user.attackKm) > $.view.builder(result.friend.attackKm)) properties.attack = 0;
	if($.view.builder(result.user.attackKm) < $.view.builder(result.friend.attackKm)) properties.attack = 2;
	build_values(result.user.attackKm, result.friend.attackKm,'attack', properties.attack);
	
	if($.view.builder(result.user.middleKm) > $.view.builder(result.friend.middleKm)) properties.middle = 0;
	if($.view.builder(result.user.middleKm) < $.view.builder(result.friend.middleKm)) properties.middle = 2;
	build_values(result.user.middleKm, result.friend.middleKm,'middle', properties.middle);
	
	if($.view.builder(result.user.defenseKm) > $.view.builder(result.friend.defenseKm)) properties.defense = 0;
	if($.view.builder(result.user.defenseKm) < $.view.builder(result.friend.defenseKm)) properties.defense = 2;
	build_values(result.user.defenseKm, result.friend.defenseKm,'defense', properties.defense);

	var user_field_zone_won = 0;
	var friend_field_zone_won = 0;
	if (result.user.attackKm > result.friend.attackKm) {
		user_field_zone_won++;
	} else if(result.user.attackKm < result.friend.attackKm) {
		friend_field_zone_won++;
	}
	
	if (result.user.middleKm > result.friend.middleKm) {
		user_field_zone_won++;
	} else if(result.user.middleKm < result.friend.middleKm) {
		friend_field_zone_won++;
	}
	
	if (result.user.defenseKm > result.friend.defenseKm) {
		user_field_zone_won++;
	} else if (result.user.defenseKm < result.friend.defenseKm) {
		friend_field_zone_won++;
	}

	if (user_field_zone_won == friend_field_zone_won) {
		kit.medal($.left_wrap,$.left_text,'silver');
		kit.medal($.right_wrap,$.right_text,'silver');
	} else {
		var im_winner = (user_field_zone_won > friend_field_zone_won);
		kit.medal(im_winner ? $.left_wrap : $.right_wrap, im_winner ? $.left_text : $.right_text, 'gold');
		kit.medal(im_winner ? $.right_wrap : $.left_wrap, im_winner ? $.right_text : $.left_text);
	}

	$.user_attack.font = $.friend_attack.font = $.user_middle.font = $.friend_middle.font = $.user_defense.font = $.friend_defense.font = {
		fontSize:12,
		fontWeight:'bold',
		fontFamily:'GothamRnd-Book'
	};
	
};

$.user_attack.font = $.friend_attack.font = $.user_middle.font = $.friend_middle.font = $.user_defense.font = $.friend_defense.font = {
	fontSize:12,
	fontWeight:'bold',
	fontFamily:'GothamRnd-Book'
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	result = null;
};