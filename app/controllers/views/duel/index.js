var api = require('api-v1');
var deviceStorage = require('device-storage');
var moment = require('alloy/moment');
var logManager = require('log-manager');
var share = require('share');
var screenDimension = require('screen-dimension');
var utils = require('utils');

$.user.width = $.friend.width = screenDimension.getHalfWidth()-10;
$.user_time.width = $.friend_time.width = screenDimension.getHalfWidth();
var pageID = 0;

var properties,
	data,
	datesView,
	participations = function(friendParticipation) {
		api.mcGetParticipations(deviceStorage.GetAttr('friend','userID'), function callback(result) {
			WinSig.CORE.Loading(true);
			if (api.isValidResponse(result)) {
				result = _.isArray(result) ? result : [result];
				if (_.isArray($.friend_dates.children)) {
					utils.removeAllVerticalViews($.friend_dates);
				}
				
				data.list.dates.friend = {};
					
				if (isset(friendParticipation)) { // see friends/games.js
					$.friend_name.text = friendParticipation.username;
					$.friend_picture.image = utils.loadImage(friendParticipation.image);
					properties.friend = data.result.friend = friendParticipation.participationID;
					data.selected.friend = moment(friendParticipation.date,'YYYY-MM-DD HH:mm:ss').format("DD_MM_YY_HH_mm_ss");
					$.friend_date.text = moment(friendParticipation.date,'YYYY-MM-DD HH:mm:ss').format("D MMM YYYY / HH:mm");
				} else if (isset(result[0]) && isset(result[0].participationID) && isset(result[0].date)) { // friend last participation
					properties.friend = result[0].participationID;
					var date = moment(result[0].date,'YYYY-MM-DD HH:mm:ss');
					data.selected.friend = moment(date).format("DD_MM_YY_HH_mm_ss");
					$.friend_date.text = moment(date).format("D MMM YYYY / HH:mm");
				} else {
					properties.friend = 0;
				}
					
				if (_.isArray(result)) { //build friend games list
					for(var i in result) {
						result[i].date = moment(result[i].date,'YYYY-MM-DD HH:mm:ss');
						var child = moment(result[i].date).format("DD_MM_YY_HH_mm_ss");
						
						data.list.dates.friend[child] = Alloy.createController('ui/games',{
							date:result[i].date,
							points:result[i].magicpoints,
							fieldSize:result[i].fieldSize,
							fieldName:result[i].fieldName,
							child:child,
							participation:result[i].participationID,
							style:Alloy.CFG.colors.darkest,
							close:function() {
								$.friend_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
								$.main.setCurrentPage(0);
							},
							click:function() {
								if (isset(data.selected) && _.isString(data.selected.friend)) {
									(data.list.dates.friend[data.selected.friend]).select(false);	
								}
								data.selected.friend = this.child;
								data.list.dates.friend[this.child].select(true);
								$.friend_date.text = moment(this.date).format("D MMM YYYY / HH:mm");
								logManager.add(39);
								properties.friend = data.result.friend = this.participation;
								properties.reload();
								this.close();
							}
						}).getView();
						data.list.dates.friend[child].participation = result[i].participationID;
						$.friend_dates.add(data.list.dates.friend[child]);
					}
				} else {
					properties.friend = data.result.friend = 0;
				}
					
				if (isset(data.selected) && _.isString(data.selected.friend)) {
					(data.list.dates.friend[data.selected.friend]).select(true);
				}

				properties.reload(); //prepare to load participation stats and heatmap
			} else {
				//TODO on error
			}
			WinSig.CORE.Loading(false);
		});
	},
	header = function(friendParticipation) {
		data.selected.opponent = deviceStorage.GetAttr('friend','userID');
		$.friend_name.text = deviceStorage.GetAttr('friend','username');
		$.friend_picture.image = utils.loadImage(deviceStorage.GetAttr('friend','image'));	
		if (!_.isEmpty(friendParticipation)) {
			participations(friendParticipation);
		} else {
			participations(null);
		}
	};

properties = {
	user:0,
	friend:0,
	opponent:{},
	views:{},
	reload:function() {
		$.content.setCurrentPage(pageID);
		api.mcStatsParticipation(properties.user, function callback(result) {
			if (api.isValidResponse(result)) {
				for (var x in properties.views) {
					try {
						properties.views[x].saveUserResults(result);
					} catch(e) {
						utils.log(e);
					}
				}
			} else {
				//TODO on error
			}
		});
		api.mcStatsParticipation(properties.friend, function callback(result) {
			if (api.isValidResponse(result)) {
				for (var x in properties.views) {
					try {
						properties.views[x].saveFriendResults(result);
					} catch(e) {
						utils.log(e);
					}
				}
			} else {
				//TODO on error
			}
		});	
	}
};

data = {
	build:{},
	result:{},
	controls:{},
	selected:{
		date:{}
	},
	views:{
		friends:{}
	},
	list:{
		buttons:{},
		controls:{
			play:function() {
				if (utils.isSessionActive()) { 
					WinSig.MODULE('play', {});
				}
			},
			rankings:function() { WinSig.MODULE('rankings', {}); },
			share:function() { share.captureScreenshot(WinSig.SCREEN.Window); }
		},
		views:['positional_map', 'phisic_performance', 'field_zones', 'game_style', 'game_resume'],
		dates:{}
	}
};

for (var i in data.list.views) {
	properties.views[data.list.views[i]] = Alloy.createController('views/duel/'+data.list.views[i]).getView();
	$.content.addView(properties.views[data.list.views[i]]);
}

for (var i in data.list.controls) {
	$.options.add(Alloy.createController('ui/footer', {
		width:screenDimension.getOneThirdWidth(),
		icon:i,
		title:L(i),
		click:data.list.controls[i]
	}).getView());
}

if (!utils.isSessionActive()) {
	$.options.children[0].opacity = 0.3;
} 

core = {
	list:{},
	views:{
		users:{}
	},
	friendListClick:function(e) {
		logManager.add(41);

		deviceStorage.Set('friend', {
			userID:e.userID,
			username:e.username,
			image:e.image
		});
		header();
		data.selected.opponent = e.userID;
		$.friend_time.backgroundColor = $.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
		$.wrapper.setCurrentPage(0);
		$.main.setCurrentPage(0);
	}
};

$.view.constructor = function(_init) {
	$.user_name.text = deviceStorage.GetAttr('user','username');
	$.user_picture.image = utils.loadImage(deviceStorage.GetAttr('user','image'));
	
	$.friends.add(Alloy.createController('ui/user', {
		bg:Alloy.CFG.colors.whiteSmoke,
		username:L('my_games'),
		userID:deviceStorage.GetAttr('user','userID'),
		image:deviceStorage.GetAttr('user','image'),
		hide:true,
		click:function(e) {
			core.friendListClick(e);
		}
	}).getView());
	
	api.mcGetFriends(function callback(result) {
		if (api.isValidResponse(result)) {
			result = _.isArray(result) ? result : [result];
			
			if (_.isEmpty(deviceStorage.Get('friend'))) { // Default friend
				deviceStorage.Set('friend', {
					userID:result[0].userID,
					username:result[0].username,
					image:result[0].image
				});
			}
			
			for (var i in result) {
				result[i].click = function(e) {
					core.friendListClick(e);
				};
				$.friends.add(Alloy.createController('ui/user', result[i]).getView());
			}
		
	
		api.mcGetParticipations(deviceStorage.GetAttr('user','userID'), function callback(result) {
		if (api.isValidResponse(result)) {
			result = _.isArray(result) ? result : [result];
			if (_.isArray($.user_dates.children)) utils.removeAllVerticalViews($.user_dates);
			data.list.dates.user = {};
					
			if (isset(result[0]) && isset(result[0].participationID) && isset(result[0].date)) { //user last participation
				properties.user = result[0].participationID;	
				var date = moment(result[0].date,'YYYY-MM-DD HH:mm:ss');
				data.selected.user = moment(date).format("DD_MM_YY_HH_mm_ss");
				$.user_date.text = moment(date).format("D MMM YYYY / HH:mm");
			}
		
			for (var i in result) { //build user games list
				result[i].date = moment(result[i].date,'YYYY-MM-DD HH:mm:ss');
				var child = moment(result[i].date).format("DD_MM_YY_HH_mm_ss");
				
				data.list.dates.user[child] = Alloy.createController('ui/games', {
					date:result[i].date,
					points:result[i].magicpoints,
					fieldSize:result[i].fieldSize,
					fieldName:result[i].fieldName,
					child:child,
					participation:result[i].participationID,
					style:Alloy.CFG.colors.light,
					close:function() {
						$.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
						$.main.setCurrentPage(0);
					},
					click:function() {
						if (isset(data.selected) && isset(data.selected.user)) {
							(data.list.dates.user[data.selected.user]).select(false);
						}
						data.selected.user = this.child;
						data.list.dates.user[this.child].select(true);
						$.user_date.text = moment(this.date).format("D MMM YYYY / HH:mm");
						properties.user = data.result.user = this.participation;
						properties.reload();
						this.close();
					}
				}).getView();
							
				data.list.dates.user[child].participation = result[i].participationID;
				$.user_dates.add(data.list.dates.user[child]);
			}

			if (isset(data.selected) && isset(data.selected.user)) {
				(data.list.dates.user[data.selected.user]).select(true);	
			}
			
			if (_init && !_.isEmpty(_init.friendParticipation)) {	
				header(_init.friendParticipation);
			} else {
				header(null);
			}
		} else {
			//TODO on error
		}
	});
	} else {
		//TODO on error
	}
	});
};

var updateHorizontalDots = function(e) {
	pageID = parseInt(e.currentPage);
	if (e.currentPage === 0) {
		$.first_dot.opacity = 0.6;
		$.second_dot.opacity = $.third_dot.opacity = $.forth_dot.opacity = $.fifth_dot.opacity = 0.3;
	} else if (e.currentPage === 1) {
		$.second_dot.opacity = 0.6;
		$.first_dot.opacity = $.third_dot.opacity = $.forth_dot.opacity = $.fifth_dot.opacity = 0.3;
	} else if (e.currentPage === 2) {
		$.third_dot.opacity = 0.6;
		$.first_dot.opacity = $.second_dot.opacity = $.forth_dot.opacity = $.fifth_dot.opacity = 0.3;
	} else if (e.currentPage === 3) {
		$.forth_dot.opacity = 0.6;
		$.first_dot.opacity = $.second_dot.opacity = $.third_dot.opacity = $.fifth_dot.opacity = 0.3;
	} else if (e.currentPage === 4) {
		$.fifth_dot.opacity = 0.6;
		$.first_dot.opacity = $.second_dot.opacity = $.third_dot.opacity = $.forth_dot.opacity = 0.3;
	}
};

$.content.addEventListener('scrollend', updateHorizontalDots);

if (!utils.isSessionActive()) {
	$.paid_description.text = L('sign_in_stats').toUpperCase();
}

var onClickPaidDescription = _.debounce(function(e) {
	if (!utils.isSessionActive()) {
		WinSig.CORE.Load('views/session/index');
	}
}, 500, true);

var onClickFirstDot = _.debounce(function(e) {
	updateHorizontalDots({currentPage:0});
	$.content.scrollToView(0);
}, 500, true);

var onClickSecondDot = _.debounce(function(e) {
	updateHorizontalDots({currentPage:1});
	$.content.scrollToView(1);
}, 500, true);

var onClickThirdDot = _.debounce(function(e) {
	updateHorizontalDots({currentPage:2});
	$.content.scrollToView(2);
}, 500, true);

var onClickForthDot = _.debounce(function(e) {
	updateHorizontalDots({currentPage:3});
	$.content.scrollToView(3);
}, 500, true);

var onClickFifthDot = _.debounce(function(e) {
	updateHorizontalDots({currentPage:4});
	$.content.scrollToView(4);
}, 500, true);

var onClickFriendHeader = _.debounce(function(e) {
	logManager.add(40);
	$.friend_time.backgroundColor = $.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
	$.wrapper.setCurrentPage(1);
}, 500, true);

var onClickCancel = _.debounce(function(e) {
	logManager.add(42);
	$.friend_time.backgroundColor = $.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
	$.wrapper.setCurrentPage(0);
	$.main.setCurrentPage(0);
}, 500, true);

var onClickUserParticipationList = _.debounce(function(e) {
	logManager.add(43);
	var name = 'user';
	if (_.isString(datesView) && datesView == name) {
		datesView = null;
		$.friend_time.backgroundColor = $.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
		$.main.setCurrentPage(0);
	} else {
		$.friend_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
		$.user_time.backgroundColor = Alloy.CFG.colors.lightGrey;
		$.main.setCurrentPage(1);
		datesView = name;
	}
}, 500, true);

var onClickFriendParticipationList = _.debounce(function(e) {
	logManager.add(44);
	var name = 'friend';
	if (_.isString(datesView) && datesView == name) {
		datesView = null;
		$.friend_time.backgroundColor = $.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
		$.main.setCurrentPage(0);
	} else {
		$.friend_time.backgroundColor = Alloy.CFG.colors.lightGrey;
		$.user_time.backgroundColor = Alloy.CFG.colors.whiteSmoke;
		$.main.setCurrentPage(2);
		datesView = name;
	}
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	$.content.removeEventListener('scrollend', updateHorizontalDots);
	utils.removeAllVerticalViews($.friends);
	utils.removeAllVerticalViews($.options);
	utils.removeAllVerticalViews($.user_dates);
	utils.removeAllVerticalViews($.friend_dates);
	utils.removeAllHorizontalViews($.content);
	dates = data = core = header = properties = null;
	utils.log('destructor.gamesreport.index');
};