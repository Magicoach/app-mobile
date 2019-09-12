var kit = require('kit');
var utils = require('utils');

$.title.text = L('points').toUpperCase();

var result = {
	user:{},
	friend:{}
};

var data = {
	views:{},
	list:{
		'durationMinutes':{
			title:L('duration'),
			subtitle:L('minutes')
		},
		'distance':{
			title:L('distance'),
			subtitle:L('km')
		},
		'percRunning':{
			title:L('running'),
			subtitle:L('percent_of_time')
		},
		'sprints':{
			title:L('sprints_nr'),
			subtitle:L('number')
		},
		'avgSpeed':{
			title:L('vel_med'),
			subtitle:L('km_h')
		}/*,
		'maxSpeed':{
			title:L('vel_max'),
			subtitle:L('km_h')
		}*/
	}
};

for(var i in data.list) {
	data.views[i] = Alloy.createController('views/duel/phisic_performance/compare', data.list[i]).getView();
	$.content.add(data.views[i]);
}

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
	
	for (var i in data.views) {
		
		if(!isset(result.user[i])) result.user[i] = 0;
		if(!isset(result.friend[i])) result.friend[i] = 0;
		
		var percent = {
			user:60,
			friend:60
		};
		
		if (result.user[i] > result.friend[i]) {
			var ratio = isFinite(result.friend[i]/result.user[i]) ? (100*result.friend[i]/result.user[i]) : 0;
			percent = {
				user:100,
				friend:Math.max(60, ratio)
			};
		}
		
		if (result.user[i] < result.friend[i]) {
			var ratio = isFinite(result.user[i]/result.friend[i]) ? (100*result.user[i]/result.friend[i]) : 0;
			percent = {
				user:Math.max(60, ratio),
				friend:100
			};
		}

		data.views[i].reload({
			user:{
				medal:result.user[i+'Medal'],
				percent:percent.user+'%',
				points:result.user[i]
			},
			friend:{
				medal:result.friend[i+'Medal'],
				percent:percent.friend+'%',
				points:result.friend[i]
			}
		});
	}

	var points = {
		user:result.user.magicpoints,
		friend:result.friend.magicpoints
	};
	points.win = points.user > points.friend;
	
	if (result.user.magicpoints === result.friend.magicpoints) {
		kit.medal($.left_wrap,$.left_text,'silver');
		kit.medal($.right_wrap,$.right_text,'silver');
	} else {
		kit.medal(points.win ? $.left_wrap : $.right_wrap, points.win ? $.left_text : $.right_text,'gold');
		kit.medal(points.win ? $.right_wrap : $.left_wrap, points.win ? $.right_text : $.left_text);
	}

	$.user_icon.image = '/images/report/'+(points.win && points.user != points.friend ? 'medals_win' : 'medals')+'.png';
	$.user_text.text = utils.addDotSeparator(points.user);
	$.user_medal.top = points.win && points.user != points.friend ? 10 : 20;
	$.user_medal.borderRadius = points.win && points.user != points.friend ? 23 : 17;
	$.user_medal.borderColor = points.win && points.user != points.friend ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
	$.user_medal.backgroundColor = points.win && points.user != points.friend ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
	$.user_medal.height = $.user_medal.width = points.win && points.user != points.friend ? 46 : 34;
	
	$.friend_icon.image = '/images/report/'+(!points.win && points.user != points.friend ? 'medals_win' : 'medals')+'.png';
	$.friend_text.text = utils.addDotSeparator(points.friend);
	$.friend_medal.top = !points.win && points.user != points.friend ? 10 : 20;
	$.friend_medal.borderRadius = !points.win && points.user != points.friend ? 23 : 17;
	$.friend_medal.borderColor = !points.win && points.user != points.friend ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
	$.friend_medal.backgroundColor = !points.win && points.user != points.friend ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
	$.friend_medal.height = $.friend_medal.width = !points.win && points.user != points.friend ? 46 : 34;
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.content);
	data = result = null;
};