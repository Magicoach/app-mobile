var api = require('api-v1');
var gps = require('gps');
var logManager = require('log-manager');
var utils = require('utils');

$.start_label.text = L('start').toUpperCase();
$.now_label.text = L('now').toUpperCase();
$.duration.text = L('duration').toUpperCase();

var data = {
	timer:{},
	playing:false,
	button:function(name, enabled) {
		$[name].touchEnabled = enabled;
		$[name].opacity = enabled ? 1 : 0.75;
	},
	checkGpsPermission:function() {
		if (OS_ANDROID) {
			var gpsPermission = 'android.permission.ACCESS_FINE_LOCATION';
			var permissionsToRequest = [];
			if (!Ti.Android.hasPermission(gpsPermission)) { //user has to manually accept the gps permission.
				permissionsToRequest.push(gpsPermission);
			} else { // the permission was previously accepted.
				data.play();
			}
			
			if (permissionsToRequest.length > 0) {
    			Ti.Android.requestPermissions(permissionsToRequest, function(e) {
			        if (e && e.success) {
			        	data.play();
			        } else {
			        	return;
			        }
			    });
			}
		} else if (OS_IOS) {
			data.play();
		}
	},
	play:function() {
		if (!data.playing) {
			if (gps.start()) {
				WinSig.SCREEN.Locker.lock();
				$.start.text = gps.getStartTime();
				data.timer = setInterval(function() {
					$.now.text = gps.getCurrentTime();
					$.time.text = gps.getDuration();
				}, 500);
				data.playing = true;
				Ti.Analytics.featureEvent('play:playing');
				data.button('stop',true);
			} else {
				WinSig.WARN.Show('done', {
					title:L('gps_title'),
					text:L('gps_text'),
					close:WinSig.WARN.Hide
				});
			}
		} else { //just lock, already playing
			WinSig.SCREEN.Locker.lock();
		}
	},
	stop:function() {
		WinSig.WARN.Show('options',{
			'title':L('end_game'),
			'yes':function() {
				gps.stop();
				clearInterval(data.timer);
				data.playing = false;
				$.args.changeToPlayComplete();
				WinSig.WARN.Hide();
			},
			'no':WinSig.WARN.Hide
		});
	}
};

var onClickPlay = _.debounce(function(e) {
	logManager.add(12);
	data.checkGpsPermission();
}, 500, true);

var onClickStop = _.debounce(function(e) {
	logManager.add(13);
	if (data.playing) {
		data.stop();	
	}
}, 500, true);

$.view.destructor = function() {
	$.destroy();
	$.off();
	gps.stop();
	clearInterval(data.timer);
	data = null;
	utils.log('destructor.play.play');
};