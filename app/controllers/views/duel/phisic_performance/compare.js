var moment = require('alloy/moment');
var utils = require('utils');

if (_.isString($.args.title)) {
	$.title.text = $.args.title.toUpperCase();
}
if (_.isString($.args.subtitle)) {
	$.subtitle.text = $.args.subtitle;
}

var build = function(name, properties) {
	if (!_.isEmpty(properties[name]['medal'])) {
		var medal = properties[name]['medal'];
	
		if(medal === 'gold') {
			$[name+'_medal'].visible = true;
			$[name+'_image'].image = '/images/icons/medals_win.png';
			$[name+'_medal'].width = $[name+'_medal'].height = 26;
			$[name+'_medal'].backgroundColor = Alloy.CFG.colors.gold;
			$[name+'_medal'].borderColor = Alloy.CFG.colors.gold;
			$[name+'_medal'].borderWidth = 1;
			$[name+'_medal'].borderRadius = 13;
			$[name+'_medal'][name == 'user' ? 'right' : 'left'] = 0;
		} else if(medal === 'silver') {
			$[name+'_medal'].visible = true;
			$[name+'_image'].image = '/images/icons/medals_middle.png';
			$[name+'_medal'].width = $[name+'_medal'].height = 22;
			$[name+'_medal'].backgroundColor = Alloy.CFG.colors.grey;
			$[name+'_medal'].borderColor = Alloy.CFG.colors.grey;
			$[name+'_medal'].borderWidth = 1;
			$[name+'_medal'].borderRadius = 11;
			$[name+'_medal'][name == 'user' ? 'right' : 'left'] = 2;
		} else if(medal === 'bronze') {
			$[name+'_medal'].visible = true;
			$[name+'_image'].image = '/images/icons/medals.png';
			$[name+'_medal'].width = $[name+'_medal'].height = 18;
			$[name+'_medal'].backgroundColor = '#8b6b46';
			$[name+'_medal'].borderColor = '#724c1e';
			$[name+'_medal'].borderWidth = 1;
			$[name+'_medal'].borderRadius = 9;
			$[name+'_medal'][name == 'user' ? 'right' : 'left'] = 4;
		} else {
			$[name+'_medal'].visible = false;
		}
	}
	$[name+'_bg'].width = properties[name]['percent'];
	$[name+'_value'].text = ''+properties[name]['points'];	
};

$.medal.reload = function(properties) {
	build('user', properties);
	build('friend', properties);
};

$.medal.destructor = function() {
	$.destroy();
	$.off();
};