var deviceStorage = require('device-storage');

exports.log = function(message, level) {
	level = level || 'warn';
	if (ENV_DEV || ENV_TEST) {
		Ti.API.log(level, JSON.stringify(message, null, 4));
	}
};

exports.objectArrayLength = function(obj) {
	var result = 0;
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			result++;
		}
	}
	return result;
};

exports.isMagicoachFreeVersion = function() {
	if (Ti.App.Properties.getBool('magicoach-free-version')) {
		return true;
	}
	return false;
};

exports.defaultID = -100;
exports.defaultUsername = 'Trial User';
exports.defaultEmail = 'support@magicoach.com';
exports.defaultImage = 'supportmagicoach.com.png';
exports.isSessionActive = function() {
	var id = deviceStorage.GetAttr('user','userID');
	if (_.isNumber(id) && id !== this.defaultID) {
		return true;
	}
	return false;
};

exports.hideKeyboard = function() {
	if (OS_ANDROID) {
		Ti.UI.Android.hideSoftKeyboard();
	}
};

exports.isEmail = function(value) {
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(value);
};

exports.loadImage = function(name) {
	return _.isEmpty(name) ? '/images/picture.png' : Alloy.CFG.serverImagesUrl + name;
};

exports.addDotSeparator = function(number) {
	return _.isFinite(number) ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : number.toString();
};

exports.addLimitToText = function(text) {
	return _.isString(text) && text.length >= 20 ? text.substr(0, 17)+'...' : text;
};

exports.deviceInfo = function() {
	try {
		return 'DEVICE INFO: '+Ti.Platform.architecture+', density: '+Ti.Platform.displayCaps.density+', dpi: '+Ti.Platform.displayCaps.dpi+', width: '+Ti.Platform.displayCaps.platformWidth+', height: '+Ti.Platform.displayCaps.platformHeight+', logicalDensityFactor: '+Ti.Platform.displayCaps.logicalDensityFactor+', manufacturer: '+Ti.Platform.manufacturer+', model: '+Ti.Platform.model+', name: '+Ti.Platform.name+', osname: '+Ti.Platform.osname+', ostype: '+Ti.Platform.ostype+', version: '+Ti.Platform.version;
	} catch(e) {
		return 'Unknown Device';
	}
};

exports.removeAllHorizontalViews = function(reference) {
	try {
		for (var i = reference.views.length; i > 0; i--) {
			if (_.isFunction(reference.views[i-1].destructor)) {
				reference.views[i-1].destructor();	
			}		
			reference.removeView(reference.views[i-1]);
		}
	} catch (e) {
		this.log('Cannot remove horizontal view: ' + e, 'error');
	} 
};

exports.removeAllVerticalViews = function(reference) {
	try {
		for (var i = reference.children.length; i > 0; i--) {
			if (_.isFunction(reference.children[i-1].destructor)) {
				reference.children[i-1].destructor();	
			}
			reference.remove(reference.children[i-1]);
		}
	} catch (e) {
		this.log('Cannot remove vertical view: ' + e, 'error');
	}
};