var deviceStorage = require('device-storage');
var utils = require('utils');

var SessionMenu = {
	openStart:function(){
		utils.removeAllVerticalViews($.content);
		$.content.add(Alloy.createController('views/session/start', SessionMenu).getView());	
	},
	openRegister:function() {
		utils.removeAllVerticalViews($.content);
		$.content.add(Alloy.createController('views/session/register', SessionMenu).getView());	
	},
	openLogin:function() {
		utils.removeAllVerticalViews($.content);
		$.content.add(Alloy.createController('views/session/login', SessionMenu).getView());
	},
	openForgotPassword:function() {
		utils.removeAllVerticalViews($.content);
		$.content.add(Alloy.createController('views/session/forgot', SessionMenu).getView());	
	}
};

deviceStorage.Set('user', {});
deviceStorage.Set('friend', {});
SessionMenu.openStart();

$.session.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.content);
	SessionMenu = null;
	utils.log('destructor.session.index');
};