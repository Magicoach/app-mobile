var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

var http = function(httpMethod, uri, callback) {
	var xhr = Ti.Network.createHTTPClient({
		onload: function() {
			try {
				logManager.sendAllLogs();
				var output = JSON.parse(this.responseText).magicoach;
				//utils.log(output);
				callback(output);
			} catch(e) {
				callback(null);
				return;
			}
		},
		onerror: function(e) {
			logManager.sendAllLogs();
			callback(null);
		},
		ondatastream: function(e) { // data is being downloaded
		},
		onsendstream: function(e) { // data is being uploaded
		},
		timeout: 15000
	});
	
	if (httpMethod.toUpperCase() !== 'GET') {
		xhr.url = Alloy.CFG.serverAPIUrl + '/api-post/v1' + uri;
	} else {
		xhr.url = Alloy.CFG.serverAPIUrl + '/api-get/v1' + uri;
	}
	utils.log(xhr.url);	
	xhr.open(httpMethod.toUpperCase(), xhr.url);
	if (httpMethod.toUpperCase() !== 'GET') {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');	
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		xhr.setRequestHeader('Cache-Control', 'no-store');
	}
	return xhr;	
};

exports.isValidResponse = function(output) {
	try {
		if (_.isNumber(output) && output === 0) { // Valid, API returned 0.
			return true;
		} else if (_.isNumber(output) && output !== 0) { // Invalid, API returned 1.
			return false;
		} else if (!_.isEmpty(output)) { // Valid, API returned a set of results.
			return true;
		} else {
			return false;
		}
	} catch(e) {
		return false;
	}
};

exports.mcNotifications = function(callback) {
	http('GET', '/users/'+deviceStorage.GetAttr('user','userID')+'/notifications', callback).send(null);
};
exports.mcGetProfile = function(id, callback) {
	http('GET', '/users/'+id, callback).send(null);
};
exports.mcLoginUser = function(data, callback) {
	http('POST', '/users/login', callback).send(JSON.stringify(data));
};	
exports.mcEditProfile = function(data, callback) {	
	http('PUT', '/users/'+deviceStorage.GetAttr('user','userID'), callback).send(JSON.stringify(data));
};
exports.mcRegisterUser = function(data, callback) {
	http('POST', '/users/new', callback).send(JSON.stringify(data));
};
exports.mcUpdatePassword = function(data, callback) {
	http('POST', '/users/update', callback).send(JSON.stringify(data));
};
exports.mcSearchUser = function(pattern, callback) {
	http('GET', '/users/'+deviceStorage.GetAttr('user','userID')+'/find/'+pattern, callback).send(null);
};
exports.mcStatsUser = function(userID, callback) {
	http('GET', '/users/'+userID+'/stats', callback).send(null);
};
exports.mcSendImage = function(data, callback) {
	http('POST', '/users/images', callback).send(JSON.stringify(data));
};
exports.mcUpdateImage = function(data, callback) {
	http('POST', '/users/images/update', callback).send(JSON.stringify(data));
};
//TODO: better name for API endpoint to users/{id}/friends.
exports.mcGetFriends = function(callback) {
	http('GET', '/friends/'+deviceStorage.GetAttr('user','userID'), callback).send(null);
};
//------------	
exports.mcCreateInvite = function(data, callback) {
	http('POST', '/invites/new', callback).send(JSON.stringify(data));
};
exports.mcAcceptInvite = function(data, callback) {
	http('POST', '/invites/accept', callback).send(JSON.stringify(data));
};
exports.mcPendingInvites = function(callback) {
	http('GET', '/invites/pending/'+deviceStorage.GetAttr('user','userID'), callback).send(null);
};
//------------	
exports.mcRankingSprints = function(dateStart, dateEnd, orderBy, callback) {
	http('GET', '/rankings/sprints/'+deviceStorage.GetAttr('user','userID')+
		'/start/'+dateStart+'/end/'+dateEnd+'/order/'+orderBy, callback).send(null);
};
exports.mcRankingGoals = function(dateStart, dateEnd, orderBy, callback) {
	http('GET', '/rankings/goals/'+deviceStorage.GetAttr('user','userID')+
		'/start/'+dateStart+'/end/'+dateEnd+'/order/'+orderBy, callback).send(null);
};
exports.mcRankingDistance = function(dateStart, dateEnd, orderBy, callback) {
	http('GET', '/rankings/distance/'+deviceStorage.GetAttr('user','userID')+
		'/start/'+dateStart+'/end/'+dateEnd+'/order/'+orderBy, callback).send(null);
};
exports.mcRankingMagicpoints = function(dateStart, dateEnd, orderBy, callback) {
	http('GET', '/rankings/magicpoints/'+deviceStorage.GetAttr('user','userID')+
		'/start/'+dateStart+'/end/'+dateEnd+'/order/'+orderBy, callback).send(null);
};
//------------
exports.mcGetParticipations = function(id, callback) {
	http('GET', '/participations/users/'+id, callback).send(null);
};
exports.mcCreateParticipation = function(data, callback) {
	http('POST', '/participations/new', callback).send(JSON.stringify(data));
};
exports.mcSendPositions = function(data, callback) {
	http('POST', '/participations/positions', callback).send(JSON.stringify(data));
};
exports.mcCalculateParticipation = function(data, callback) {
	http('POST', '/participations/calculate', callback).send(JSON.stringify(data));
};
exports.mcStatsParticipation = function(ParticipationID, callback) {
	http('GET', '/participations/'+ParticipationID+'/stats', callback).send(null);
};
exports.mcPositionalMapHor = function(ParticipationID, x, y, callback) {
	http('GET', '/participations/'+ParticipationID+'/positional/w/'+x+'/h/'+y, callback).send(null);
};
exports.mcPositionalMapVer = function(ParticipationID, x, y, callback) {
	http('GET', '/participations/'+ParticipationID+'/positional/vertical/w/'+x+'/h/'+y, callback).send(null);
};
exports.mcWhoPlayedWithMe = function(participationID, callback) {
	http('GET', '/participations/'+participationID+'/team', callback).send(null);
};
//------------
exports.mcNearestField = function(latitude, longitude, callback) {
	http('GET', '/fields/lat/'+latitude+'/lon/'+longitude, callback).send(null);
};
//------------
/*
exports.mcGetChallenges = function(callback) {
	http('GET', '/challenges/users/'+deviceStorage.GetAttr('user','userID'), callback).send(null);
};
exports.mcGetActiveChallenges = function(callback) {
	http('GET', '/challenges/users/'+deviceStorage.GetAttr('user','userID')+'/active', callback).send(null);
};
exports.mcCreateChallenge = function(data, callback) {
	http('POST', '/challenges/new', callback).send(JSON.stringify(data));
};
exports.mcRemoveChallenge = function(data, callback) {
	http('POST', '/challenges/remove', callback).send(JSON.stringify(data));
};
exports.mcUpdateChallenge = function(data, callback) {
	http('POST', '/challenges/update', callback).send(JSON.stringify(data));
};
*/