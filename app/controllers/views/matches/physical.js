var utils = require('utils');
var screensize = require('screen-dimension');
var apiDev = require('winsig/api-dev');


$.physical.text = 'physical'.toUpperCase();

$.distancegraph.add(Alloy.createController('ui/maps/polygon', {'color':Alloy.CFG.colors.red}).getView());
$.velocitygraph.add(Alloy.createController('ui/maps/polygon', {'color':Alloy.CFG.colors.gold}).getView());

apiDev.mcMapsGraph(2322, 4, function callback(result) {
		if (apiDev.isValidResponse(result)) {
			$.distancegraph.children[0].reloadAvgSpeed(_.isArray(result) ? result : [result]);
			$.velocitygraph.children[0].reloadAvgSpeed(_.isArray(result) ? result : [result]);	
			//$.sprintsgraph.children[0].reloadSprints(_.isArray(result) ? result : [result]);
			//$.attackgraph.children[0].reloadAttack(_.isArray(result) ? result : [result]);		
		} else {
			$.distancegraph.children[0].reloadAvgSpeed();
			$.velocitygraph.children[0].reloadAvgSpeed();	
			//$.sprintsgraph.children[0].reloadSprints();
			//$.attackgraph.children[0].reloadAttack();
		}
	});

$.view.constructor = function() {
	
};

$.view.desctructor = function() {
	
};