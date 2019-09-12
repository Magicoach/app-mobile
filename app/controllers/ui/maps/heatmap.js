var utils = require('utils');
var positions = [];

$.widget.width = $.args.width;
$.widget.height = $.args.height;
$.web.width = $.args.widthGoalLine, //don't draw over the goal area. (horizontal)
$.web.height = $.args.heightGoalLine; //don't draw over the goal area. (vertical)

function onLoadWeb(e) {
	$.widget.children[0].evalJS("loadHeatmap({width:'"+$.args.widthGoalLine+"', height:'"+$.args.heightGoalLine+"', points:"+JSON.stringify(positions)+"})");
}

$.widget.reload = function(points) {
	positions = points || [];
	$.widget.children[0].setUrl('/map.html');
};

$.widget.destructor = function() {
	$.destroy();
	$.off();
};