var data = {};

$.wrap.visible = false;
$.icon.image = '/images/report/'+$.args.icon+'.png';

$.medal.constructor = function(result) {
	$.wrap.visible = true;
	
	if(result.tie) result.win = false;

	$.title.text = result.title;
	$.wrap.height = $.wrap.width = 38;
	$.wrap.borderRadius = 19;
	$.wrap.borderColor = result.win ? '#c6981b' : '#acacac';
	$.wrap.backgroundColor = result.win ? Alloy.CFG.colors.gold : '#c7c7c7';
	$.title.top = result.win ? 1 : 2; // 2 : 8
	$.icon.image = '/images/report/'+$.args.icon+(result.win ? '_win' : '')+'.png';
};

$.medal.reload = function(properties) {};

$.medal.destructor = function() {
	$.destroy();
	$.off();
	data = null;
};