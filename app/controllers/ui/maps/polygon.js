var api = require('winsig/api-dev');
//var pm = require('participation-manager');
var screenDimension = require('screen-dimension');
var utils = require('utils');
var vector = [];

$.background.width = $.html.width = screenDimension.getWidth()-$.background.left-$.background.right;
$.b.left = $.c.left = $.d.left = $.d.right = ($.html.width/8) -$.a.borderRadius;
$.a.left = $.a.right = $.b.right = $.c.right = ($.html.width/8)-$.a.borderRadius;

function onLoadWeb(e) {
	$.html.evalJS("load({color:'"+ $.args.color +"', width:'"+$.html.width+"', height:'"+$.html.height+"', points:"+JSON.stringify(vector)+"})");
}

$.background.reloadAvgSpeed = function(points) {
	api.mcMapsGraph(2322, 8, function callback(result) {
		if (api.isValidResponse(result) && utils.objectArrayLength(result) === 4) {
			$.a.text = result[0].distance.toFixed(1).toString();
			$.b.text = result[1].distance.toFixed(1).toString();
			$.c.text = result[2].distance.toFixed(1).toString();
			$.d.text = result[3].distance.toFixed(1).toString();	
		} else {
			$.a.text = '-';
			$.b.text = '-';
			$.c.text = '-';
			$.d.text = '-';
		}
	});
		
	var length = utils.objectArrayLength(points);
	var max = 0;
	for (var i = 0; i < length; i++) {
		if (points[i].avgSpeed > max) {
			max = points[i].avgSpeed;
		}
	}

	var polygon = [{"x":0, "y":$.html.height}];
	for (var i = 0; i < length; i++) {
		polygon.push({"x":$.html.width-($.html.width/length)*(length-i-1), "y":$.html.height-($.html.height*points[i].avgSpeed)});
	}
	polygon.push({"x":$.html.width, "y":$.html.height});
	
	vector = polygon;
	$.html.setUrl('/polygon.html');
};
$.background.reloadSprints = function(points) {
	api.mcMapsGraph(pm.getParticipation(), 4, function callback(result) {
		if (api.isValidResponse(result) && utils.objectArrayLength(result) === 4) {
			$.a.text = result[0].sprints.toString();
			$.b.text = result[1].sprints.toString();
			$.c.text = result[2].sprints.toString();
			$.d.text = result[3].sprints.toString();	
		} else {
			$.a.text = '-';
			$.b.text = '-';
			$.c.text = '-';
			$.d.text = '-';
		}
	});
	
	var length = utils.objectArrayLength(points);
	var max = 0;
	for (var i = 0; i < length; i++) {
		if (points[i].sprintsGraph > max) {
			max = points[i].sprintsGraph;
		}
	}

	var polygon = [{"x":0, "y":$.html.height}];
	for (var i = 0; i < length; i++) {
		polygon.push({"x":$.html.width-($.html.width/length)*(length-i-1), "y":$.html.height-($.html.height*points[i].sprintsGraph)});
	}
	polygon.push({"x":$.html.width, "y":$.html.height});
	
	vector = polygon;
	$.html.setUrl('/polygon.html');
};
$.background.reloadAttack = function(points) {
	api.mcMapsGraph(pm.getParticipation(), 4, function callback(result) {
		if (api.isValidResponse(result) && utils.objectArrayLength(result) === 4) {
			$.a.text = (result[0].attack*100).toFixed(0).toString();
			$.b.text = (result[1].attack*100).toFixed(0).toString();
			$.c.text = (result[2].attack*100).toFixed(0).toString();
			$.d.text = (result[3].attack*100).toFixed(0).toString();	
		} else {
			$.a.text = '-';
			$.b.text = '-';
			$.c.text = '-';
			$.d.text = '-';
		}
	});
	
	var length = utils.objectArrayLength(points);
	/*var max = 0;
	for (var i = 0; i < length; i++) {
		if (points[i].attack > max) {
			max = points[i].attack;
		}
	}*/

	var polygon = [{"x":0, "y":$.html.height}];
	for (var i = 0; i < length; i++) {
		polygon.push({"x":$.html.width-($.html.width/length)*(length-i-1), "y":$.html.height-($.html.height*points[i].attack)});
	}
	polygon.push({"x":$.html.width, "y":$.html.height});
	
	vector = polygon;
	$.html.setUrl('/polygon.html');
};