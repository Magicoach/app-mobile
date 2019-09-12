$.medal.constructor = function(result) {
	if (result.tie)
		result.win = false;

	$.title.text = result.title;
	$.title.color = Alloy.CFG.colors.dark;
};

$.medal.reload = function(properties) { };

$.medal.destructor = function() {
	$.destroy();
	$.off();
};