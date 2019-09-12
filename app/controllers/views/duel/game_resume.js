var utils = require('utils');

var result = {
	user:{},
	friend:{}
};

var data = {
	user:{
		physical:Alloy.createController('views/duel/game_resume/medals', {icon:'physical'}).getView(),
		field_occupation:Alloy.createController('views/duel/game_resume/medals', {icon:'goals'}).getView(),
		field_zones:Alloy.createController('views/duel/game_resume/medals', {icon:'tactics'}).getView(),
		game_style:Alloy.createController('views/duel/game_resume/medals', {icon:'tactics'}).getView(),
		goals:Alloy.createController('views/duel/game_resume/no_medals').getView(),
		gameresult:Alloy.createController('views/duel/game_resume/no_medals').getView()
	},
	friend:{
		physical:Alloy.createController('views/duel/game_resume/medals', {icon:'physical'}).getView(),
		field_occupation:Alloy.createController('views/duel/game_resume/medals', {icon:'goals'}).getView(),
		field_zones:Alloy.createController('views/duel/game_resume/medals', {icon:'tactics'}).getView(),
		game_style:Alloy.createController('views/duel/game_resume/medals', {icon:'tactics'}).getView(),
		goals:Alloy.createController('views/duel/game_resume/no_medals').getView(),
		gameresult:Alloy.createController('views/duel/game_resume/no_medals').getView()
	},
	challenge:Alloy.createController('views/duel/game_resume/challenge').getView()
};

$.title_goals.text = L('goals').toUpperCase();
$.title_phisic.text = L('phisic_part').toUpperCase();
$.title_game_result.text = L('team_result').toUpperCase();
$.title_field_occupation.text = 'Positional'.toUpperCase();
$.title_field_zones.text = 'Field Zones'.toUpperCase();
$.title_game_style.text = 'Game Style'.toUpperCase();

//$.report_header.add(data.challenge);
$.user_phisic.add(data.user.physical);
$.friend_phisic.add(data.friend.physical);
$.user_goals.add(data.user.goals);
$.friend_goals.add(data.friend.goals);
$.user_game_result.add(data.user.gameresult);
$.friend_game_result.add(data.friend.gameresult);
$.user_field_occupation.add(data.user.field_occupation);
$.friend_field_occupation.add(data.friend.field_occupation);
$.user_field_zones.add(data.user.field_zones);
$.friend_field_zones.add(data.friend.field_zones);
$.user_game_style.add(data.user.game_style);
$.friend_game_style.add(data.friend.game_style);

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

	data.user.goals.constructor({
		win:result.user.goals > result.friend.goals,
		tie:result.user.goals == result.friend.goals,
		title:result.user.goals
	});
	data.friend.goals.constructor({
		win:result.user.goals < result.friend.goals,
		tie:result.user.goals == result.friend.goals,
		title:result.friend.goals
	});
	
	data.user.gameresult.constructor({
		win:result.user.gameResult == 'Winner',
		tie:result.user.gameResult == 'Draw',
		title:result.user.gameResult
	});
	data.friend.gameresult.constructor({
		win:result.friend.gameResult == 'Winner',
		tie:result.friend.gameResult == 'Draw',
		title:result.friend.gameResult
	});
	
	data.user.physical.constructor({
		win:result.user.magicpoints > result.friend.magicpoints,
		tie:result.user.magicpoints == result.friend.magicpoints,
		title:result.user.magicpoints
	});
	data.friend.physical.constructor({
		win:result.user.magicpoints < result.friend.magicpoints,
		tie:result.user.magicpoints == result.friend.magicpoints,
		title:result.friend.magicpoints
	});
	
	data.user.field_occupation.constructor({
		win:result.user.percPositionalMap > result.friend.percPositionalMap,
		tie:result.user.percPositionalMap == result.friend.percPositionalMap,
		title:result.user.percPositionalMap + '%'
	});
	data.friend.field_occupation.constructor({
		win:result.user.percPositionalMap < result.friend.percPositionalMap,
		tie:result.user.percPositionalMap == result.friend.percPositionalMap,
		title:result.friend.percPositionalMap + '%'
	});
	
	
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
	} else if(result.user.defenseKm < result.friend.defenseKm) {
		friend_field_zone_won++;
	}
	 data.user.field_zones.constructor({
		win:user_field_zone_won > friend_field_zone_won,
		tie:user_field_zone_won == friend_field_zone_won,
		title:result.user.fieldZone
	});
	data.friend.field_zones.constructor({
		win:user_field_zone_won < friend_field_zone_won,
		tie:user_field_zone_won == friend_field_zone_won,
		title:result.friend.fieldZone
	});
	
	data.user.game_style.constructor({
		win:result.user.gameStyleXY > result.friend.gameStyleXY,
		tie:result.user.gameStyleXY == result.friend.gameStyleXY,
		title:result.user.gameStyle
	});
	data.friend.game_style.constructor({
		win:result.user.gameStyleXY < result.friend.gameStyleXY,
		tie:result.user.gameStyleXY == result.friend.gameStyleXY,
		title:result.friend.gameStyle
	});
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.friend_game_style);
	utils.removeAllVerticalViews($.user_game_style);
	utils.removeAllVerticalViews($.friend_field_zones);
	utils.removeAllVerticalViews($.user_field_zones);
	utils.removeAllVerticalViews($.friend_field_occupation);
	utils.removeAllVerticalViews($.user_field_occupation);
	utils.removeAllVerticalViews($.user_field_occupation);
	utils.removeAllVerticalViews($.friend_phisic);
	utils.removeAllVerticalViews($.user_phisic);
	utils.removeAllVerticalViews($.friend_game_result);
	utils.removeAllVerticalViews($.user_game_result);
	utils.removeAllVerticalViews($.friend_goals);
	utils.removeAllVerticalViews($.user_goals);
	data = result = null;
};