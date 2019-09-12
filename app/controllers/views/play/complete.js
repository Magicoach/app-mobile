var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var gps = require('gps');
var moment = require('alloy/moment');
var screenDimension = require('screen-dimension');
var utils = require('utils');

$.start_label.text = L('start').toUpperCase();
$.now_label.text = L('now').toUpperCase();
$.duration_label.text = L('duration').toUpperCase();
$.field_label.text = L('field').toUpperCase();
$.result_label.text = L('result').toUpperCase();
$.goals_label.text = L('goals').toUpperCase();

$.save.width = $.cancel.width = screenDimension.getHalfWidth();

var data = {
	id:122, // unknown field
	goals:-1,
	result:0, // win:3 ; draw:2 ; lost:1
	cancel:function(participation) {
		WinSig.WARN.Show('options', {
			'backgroundColor':Alloy.CFG.colors.red,
			'title':L('erase_game'),
			'text':L('cancel_game_text'),
			'yes':function() {
				WinSig.MODULE('play', {});
			},
			'no':WinSig.WARN.Hide
		});
	},
	smallGame:function() {
		WinSig.CORE.Loading(false);
		WinSig.WARN.Show('done', {
			'backgroundColor':Alloy.CFG.colors.red,
			'title':L('play_small_game_title1'),
			'text':L('play_small_game_text1'),
			'desc':L('play_small_game_text2'),
			'close':function() {
				WinSig.MODULE('play', {});
			}
		});
	},
	unknownField:function() {
		WinSig.CORE.Loading(false);
		WinSig.WARN.Show('done', {
			'title':L('play_field_122_title1'),
			'text':L('play_field_122_text1'),
			'desc':L('play_field_122_text2'),
			'close':function() {
				WinSig.MODULE('play', {});
			}
		});
	},
	validGame:function(participationID) {
		WinSig.CORE.Loading(false);
		WinSig.WARN.Show('done',{
			'title':L('play_ok_title1'),
			'text':L('play_ok_text1'),
			'close':function() {
				WinSig.MODULE('duel', {});
			}
		});
	},
	invalidGame:function() {
		WinSig.CORE.Loading(false);
		WinSig.WARN.Show('done', {
			'backgroundColor':Alloy.CFG.colors.red,
			'title':L('play_error_title1'),
			'text':L('play_error_text1'),
			'desc':L('play_error_text2'),
			'close':WinSig.WARN.Hide
		});
	},
	active:{
		on:function() {
			if(isset(this)) this.opacity = 0.5;
		},
		off:function() {
			var self = this;
			if(isset(this)) setTimeout(function() {
				if(isset(self)) self.opacity = 1;
			},800);
		}
	},
	invalidInput:function() {
		WinSig.WARN.Show('done', {
			'backgroundColor':Alloy.CFG.colors.red,
			'title':L('warning'),
			'text':L('before_save'),
			'close':WinSig.WARN.Hide
		});
	},
	save:function() {
		if (!(data.result > 0 && data.goals > -1)) {
			data.invalidInput();
			return;
		}
					
		WinSig.CORE.Loading(true);
		api.mcCreateParticipation({'userID':deviceStorage.GetAttr('user','userID'), 'fieldID':data.id,
				'goals':data.goals,'start':moment(moment($.start.text,'HH:mm:ss')).format('YYYY-MM-DD HH:mm:ss'),
				'end':moment(moment($.now.text,'HH:mm:ss')).format('YYYY-MM-DD HH:mm:ss'),
				'result':data.result, 'device':utils.deviceInfo(), 'version':Ti.App.version}, function callback(result) {
				if (api.isValidResponse(result)) {
					var participation = result.participationID;
					
					api.mcSendPositions({'id':participation, 'positions':gps.positions()}, function callback(isSent) {
						if (api.isValidResponse(isSent)) {
							Ti.Analytics.featureEvent('play:completed');
							
							if (gps.positions().length < 120) {
								data.smallGame();
							} else if (data.id === 122) {
								data.unknownField();
							} else {
								api.mcCalculateParticipation({'id':participation}, function callback(subresult) {
									if (api.isValidResponse(subresult)) {
										data.validGame(participation);
									} else {
										data.invalidGame();
									}
								});
							}
						} else {
							data.invalidGame();
						}
					});
				} else {
					data.invalidGame();
				}
		});
	},
	checkField:function() {
		var gpsPosition = gps.getAvgPosition();
		api.mcNearestField(gpsPosition.latitude, gpsPosition.longitude, function callback(result) {
			if (api.isValidResponse(result) && result.fieldID !== 122) {
				data.id = result.fieldID;
				$.field_icon.image = '/images/icons/field.png';
				$.field_label.color = Alloy.CFG.colors.dark;
				$.unknown_field.visible = $.new_calibration.visible = false;
				$.known_field.visible = $.field_valid.visible = $.location_based.visible = true;
				$.known_field.text = result.fieldName + ' ' + result.fieldSize + 'x' + result.fieldSize;
			} else {
				//TODO on error
			}
		});
	}
};

$.start.text = gps.getStartTime();
$.now.text = gps.getCurrentTime();
$.duration.text = gps.getDuration();
data.checkField();

Ti.Network.addEventListener('change', data.checkField);
$.cancel.addEventListener('touchstart',data.active.on);
$.cancel.addEventListener('touchcancel',data.active.off);
$.cancel.addEventListener('touchend',data.active.off);
$.save.addEventListener('touchstart',data.active.on);
$.save.addEventListener('touchcancel',data.active.off);
$.save.addEventListener('touchend',data.active.off);

var onClickDeleteGame = _.debounce(function(e) {
	logManager.add(8);
	data.cancel(e);
}, 500, true);

var onClickSendGame = _.debounce(function(e) {
	logManager.add(9);
	data.save(); 
}, 500, true);

var onClickResult  = _.debounce(function(e) {
	for (var i in $.results.children) {
		$.results.children[i].color = Alloy.CFG.colors.grey;
		$.results.children[i].font = {
			fontSize:20,
			fontWeight:'normal',
			fontFamily:'GothamRnd-Book'
		};
	}
	
	if (e.source.text === L('win')) {
		data.result = 3;
	} else if(e.source.text === L('draw')) {
		data.result = 2;
	} else if(e.source.text === L('lost')) {
		data.result = 1;	
	}
	e.source.color = Alloy.CFG.colors.dark;
	e.source.font = {
		fontSize:20,
		fontWeight:'bold',
		fontFamily:'GothamRnd-Book'
	};
}, 300, true);

var onClickGoals = _.debounce(function(e) {
	for (var i in $.all_goals.children) {
		for (var j in $.all_goals.children[i].children) {
			$.all_goals.children[i].children[j].color = Alloy.CFG.colors.grey;
			$.all_goals.children[i].children[j].borderColor = Alloy.CFG.colors.transparent;
			$.all_goals.children[i].children[j].font = {
				fontSize:20,
				fontWeight:'normal',
				fontFamily:'GothamRnd-Book'
			};
		}
	}

	data.goals = parseInt(e.source.text);
	e.source.color = Alloy.CFG.colors.dark;
	e.source.borderColor = Alloy.CFG.colors.darkest;
	e.source.font = {
		fontSize:20,
		fontWeight:'bold',
		fontFamily:'GothamRnd-Book'
	};
}, 300, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	WinSig.WARN.Hide();
	Ti.Network.removeEventListener('change', data.checkField);
	$.cancel.removeEventListener('touchstart',data.active.on);
	$.cancel.removeEventListener('touchcancel',data.active.off);
	$.cancel.removeEventListener('touchend',data.active.off);
	$.save.removeEventListener('touchstart',data.active.on);
	$.save.removeEventListener('touchcancel',data.active.off);
	$.save.removeEventListener('touchend',data.active.off);
	data = null;
	utils.log('destructor.play.complete');
};