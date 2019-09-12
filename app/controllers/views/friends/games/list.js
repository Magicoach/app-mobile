var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

api.mcNotifications(function callback(result) {
	if (api.isValidResponse(result)) {
		result = _.isArray(result) ? result : [result];
		for (var i in result) {
			$.games_list.add(Alloy.createController('views/friends/games/item', {
				participationID:result[i].participationID,
				userID:result[i].userID,
				username:result[i].username,
				image:result[i].image,
				date:result[i].date,
				goals:result[i].goals,
				magicpoints:result[i].magicpoints,
				fieldName:result[i].fieldName,
				fieldSize:result[i].fieldSize,
				close:function() {
		
				},
				click:function() {
					logManager.add(27);
					deviceStorage.Set('friend', {
						userID:this.userID,
						username:this.username,
						image:this.image
					});
					WinSig.MODULE('duel', {friendParticipation:{
						participationID:this.participationID,
						username:this.username,
						image:this.image,
						date:this.date,
					}});
				}
			}).getView());
		}
		$.games_list.children[0].hidePremium(true);
		$.empty.visible = false;
	} else {
		$.empty.text = L('no_notif');
		$.empty.visible = true;
	}
});

$.view.constructor = function() {};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.games_list);
	utils.log('destructor.games.list');
};