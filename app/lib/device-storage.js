var utils = require('utils');

exports.Set = function(name, val) {
	if (_.isString(name) && _.isObject(val)) {
		var tmp = Ti.App.Properties.getObject('app_data', {});
		tmp[name] = val;
		Ti.App.Properties.setObject('app_data', tmp);
	}
};
exports.SetAttr = function(name, val, property) {
	if (_.isString(name) && _.isString(val) && _.isObject(property)) {
		var tmp = Ti.App.Properties.getObject('app_data', {});
		tmp[name][val] = property;
		Ti.App.Properties.setObject('app_data', tmp);
	}
};
exports.Get = function(name) {
	try {
		return Ti.App.Properties.getObject('app_data')[name];
	} catch (e) {
		return '';
	}
};
exports.GetAttr = function(name, property) {
	try {
		return Ti.App.Properties.getObject('app_data')[name][property];
	} catch (e) {
		return '';
	}
};