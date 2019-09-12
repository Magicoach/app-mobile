var logManager = require('log-manager');
var utils = require('utils');

$.view.width = $.args.width;
$.title.text = $.args.text;
$.view.name = $.args.name;

$.view.select = function(status) {
	$.view.backgroundColor = status ? Alloy.CFG.colors.dark : Alloy.CFG.colors.transparent;
	$.title.font = {
		fontSize:12,
		fontWeight:status ? 'bold' : 'normal',
		fontFamily:'GothamRnd-Book'
	};
};

var onClickChangeRankingOption = _.debounce(function(e) {
	logManager.add(28);
	$.args.click(e);
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.log('destructor.rankings.options');
};