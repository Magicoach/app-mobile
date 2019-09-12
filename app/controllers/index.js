var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

//Global references :BAD
WinSig.SCREEN = {
	'Window':$.index,
	'View':$.view,
	'Warn':$.warn,
	'WarnContent':$.warn_content,
	'Loading':$.loading,
	'Icon':$.icon
};

// clean all cached files like images. appcelerator caches all images from web.
Ti.Filesystem.getFile(Ti.Filesystem.getApplicationCacheDirectory()).deleteDirectory(true);
	
if (!utils.isSessionActive()) {
	deviceStorage.Set('user', {
		userID:utils.defaultID,
		username:utils.defaultUsername,
		email:utils.defaultEmail,
		image:utils.defaultImage
	});
}
WinSig.CORE.Load('views/organizer');

// open application
$.index.open();

// ignore actions from android back button.
$.index.addEventListener('androidback', function() {
	logManager.add(1);
});