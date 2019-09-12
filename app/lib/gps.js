var moment = require('alloy/moment');
var utils = require('utils');

var now = moment();
var startTime = moment();
var savedPositions = []; 
var savedTimes = [];

var locate = function(e) {
	now = moment();
	try {
		if (e && e.success && !_.contains(savedTimes, now.format('YYYYMMDDHHmmss'))) {
			savedTimes.push(now.format('YYYYMMDDHHmmss'));
			savedPositions.push({
				time:now.format('YYYY-MM-DD HH:mm:ss'),
				latitude:e.coords.latitude,
				longitude:e.coords.longitude
			});
			utils.log('GPS: ' + e.coords.latitude + ':' + e.coords.longitude);
		}
	} catch(e) {
		utils.log('No GPS!');
	}
};

var Timer = {
	interval:{},
	start:function() {
		if (Ti.Geolocation.locationServicesEnabled) {
			savedPositions = [];
			savedTimes = [];
			startTime = moment();
			now = moment();
			
			if (OS_IOS) {
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST_FOR_NAVIGATION;
				Ti.Geolocation.distanceFilter = 0;
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
			} else if (OS_ANDROID) {
				Ti.Geolocation.Android.manualMode = true;
				Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({
					name: Ti.Geolocation.PROVIDER_GPS,
				    minUpdateDistance: 0.0,
				    minUpdateTime: 0
				}));
			}
	
			Ti.Geolocation.addEventListener('location', locate);
			this.interval = setInterval(function() {
				Ti.Geolocation.getCurrentPosition(locate);
			}, 1000);
			
			return true;
		} else {
			return false;
		}
	},
	stop:function() {
		Ti.Geolocation.removeEventListener('location', locate);
		clearInterval(this.interval);
	}
};

exports.start = Timer.start;
exports.stop = Timer.stop;

exports.positions = function() {
	return savedPositions;
};
exports.getStartTime = function() {
	return startTime.format('HH:mm:ss');
};
exports.getCurrentTime = function() {
	return now.format('HH:mm:ss');
};
exports.getDuration = function() {
	return moment(now.diff(startTime)).format('HH:mm:ss');
};

function rad2degr(rad) { return rad * 180 / Math.PI; }
function degr2rad(degr) { return degr * Math.PI / 180; }
exports.getAvgPosition = function() { // TODO remove outliers.
	var initialPortion = Math.round(savedPositions.length*0.6);
	var restPortion = Math.round(savedPositions.length*0.2); 
	// filter last 40% of the positions
	// filter first 20% of the positions
	var filteredPositions =	_.rest(_.initial(savedPositions, initialPortion), restPortion);
    var sumX = 0;
    var sumY = 0;
    var sumZ = 0;

    for (var i = 0; i < utils.objectArrayLength(filteredPositions); i++) {
        var lat = degr2rad(filteredPositions[i].latitude);
        var lng = degr2rad(filteredPositions[i].longitude);

        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng);
        sumY += Math.cos(lat) * Math.sin(lng);
        sumZ += Math.sin(lat);
    }
    
    var avgX = sumX/utils.objectArrayLength(filteredPositions);
    var avgY = sumY/utils.objectArrayLength(filteredPositions);
    var avgZ = sumZ/utils.objectArrayLength(filteredPositions);
    // convert average x, y, z coordinate to latitude and longitude
    var lng = Math.atan2(avgY, avgX);
    var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
    var lat = Math.atan2(avgZ, hyp);
	
	return {
		'latitude':rad2degr(lat),
        'longitude':rad2degr(lng)
    };
};