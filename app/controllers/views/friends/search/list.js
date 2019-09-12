var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.label.text = L('magicoach_players').toUpperCase();
var data = {};

$.search.add(Alloy.createController('ui/search', {
	change:function(text) {
		data.like = text.replace(/\s/g, '%20');
		$.search.children[0].enabled();
	},
	touch:function() {
		$.view.blur();
		if ($.search.children[0].status) {
			utils.removeAllVerticalViews($.search_list);
			$.search_list.visible = false;
			
			api.mcSearchUser(data.like, function callback(result) {
				if (api.isValidResponse(result)) {
					result = _.isArray(result) ? result : [result];
					for (var i in result) {
						result[i].click = function(e) {
							if (e.state === 'stranger') {
								e.createInvite(e.userID);
							} else if (e.state === 'confirm_friendship') {
								e.acceptInvite(e.userID);
							}
						};
						$.search_list.add(Alloy.createController('views/friends/search/item', result[i]).getView());
					}
					$.search_list.visible = true;		
					$.search.children[0].clear();
				} else {
					//TODO on error
				}
			});
		}
	}
}).getView());

$.view.blur = function() {
	$.search.children[0].blur();
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	$.view.blur();
	utils.removeAllVerticalViews($.search_list);
	utils.removeAllVerticalViews($.search);
	data = null;
};