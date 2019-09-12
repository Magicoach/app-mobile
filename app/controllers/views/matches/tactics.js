var api = require('api-v1');
var kit = require('kit');
var screenDimension = require('screen-dimension');
var utils = require('utils');

$.tactics.text = 'tactics'.toUpperCase();

var result = {
	user:{},
	friend:{}
};

var field = {};

field.width = screenDimension.getWidth()*0.5-8;
field.height = screenDimension.getWidth()*0.8; 
field.widthGoalLine = field.width;
field.heightGoalLine = field.height-17;

$.user_map.add(Alloy.createController('ui/maps/heatmap', field).getView());
$.field.add(Alloy.createController('ui/maps/heatmap', field).getView());

	api.mcPositionalMapVer($.args.participations()[0].id, field.widthGoalLine, field.heightGoalLine, function callback(userMap) {
		if (api.isValidResponse(userMap)) {
			$.user_map.children[0].reload(_.isArray(userMap) ? userMap : [userMap]);
		} else {
			$.user_map.children[0].reload();
		}
		
	});

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.user_map);
	field = result = null;
};