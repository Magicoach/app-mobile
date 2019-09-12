var deviceStorage = require('device-storage');
var moment = require('alloy/moment');
var utils = require('utils');

var content = [];

var http = function() {
	var xhr = Ti.Network.createHTTPClient({
		onload:function() {
			try {
				var output = JSON.parse(this.responseText).magicoach;
				if (_.isNumber(output) && output === 0) {
					content = [];
				}
			} catch(e) {
				return;
			}
		},
		onerror:function(e) {
			return;
		},
		timeout: 15000
	});
	xhr.url = Alloy.CFG.serverAPIUrl + '/api-post/v1/logs';
	utils.log(xhr.url);	
	xhr.open('POST', xhr.url);
	xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');	
	xhr.setRequestHeader('Cache-Control', 'no-cache');
	xhr.setRequestHeader('Cache-Control', 'no-store');
	return xhr;	
};

exports.add = function(eventID) {	
	content.push({
		'userID':_.isNumber(deviceStorage.GetAttr('user', 'userID')) ? deviceStorage.GetAttr('user', 'userID') : -1,
		'date':moment().format('YYYY-MM-DD HH:mm:ss'),
		'device':utils.deviceInfo(),
		'version':Ti.App.version,
		'eventID':eventID
	});
};

exports.sendAllLogs = function() {
	if (content && content.length > 2) { // send logs in blocks of 3
		http().send(JSON.stringify({'logs':content}));	
	}
};