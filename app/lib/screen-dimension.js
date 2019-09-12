var pWidth = 1;
var pHeight = 1;
var ratio = 1;

_.once(function() {
	pWidth = Ti.Platform.displayCaps.platformWidth; // android uses px and iOS dp.
	pHeight = Ti.Platform.displayCaps.platformHeight;
	ratio = Ti.Platform.displayCaps.logicalDensityFactor; // ratio between px and dp.
})();

exports.getWidth = function() {
	var size = (pWidth > pHeight) ? pHeight : pWidth; //always in portrait mode 
	if (OS_ANDROID) {
		return size /= ratio; // convert px to dp.
	} else {
		return size;
	}
};

exports.getHeight = function() {
	var size = (pWidth > pHeight) ? pWidth : pHeight; //always in portrait mode 
	if (OS_ANDROID) {
		return size /= ratio; // convert px to dp.
	} else {
		return size;
	}
};

exports.getRatio = function() {
	return ratio;
};

exports.getHalfWidth = function() {
	return this.getWidth()/2;
};

exports.getOneThirdWidth = function() {
	return this.getWidth()/3;
};

exports.getOneQuarterWidth = function() {
	return this.getWidth()/4;
};