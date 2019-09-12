var utils = require('utils');
var screensize = require('screen-dimension');
var apiDev = require('winsig/api-dev');

var LastFourParticipations = function() {
	return [{'id': 2322}, {'id': 2322}, {'id': 2322}, {'id': 2322}];
};

$.stats.add(Alloy.createController('views/matches/stats', {
	'participations':LastFourParticipations
}).getView());

$.tactics.add(Alloy.createController('views/matches/tactics', {
	'participations':LastFourParticipations
}).getView());

$.physical.add(Alloy.createController('views/matches/physical', {
	'participations':LastFourParticipations
}).getView());

$.view.constructor = function() {
	utils.log('galinha');
};

$.view.destructor = function() {
	
};
