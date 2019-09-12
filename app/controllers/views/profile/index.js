var api = require('api-v1');
var deviceStorage = require('device-storage');
var logManager = require('log-manager');
var utils = require('utils');

$.picture.image = utils.loadImage(deviceStorage.GetAttr('user','image'));
$.username.text = deviceStorage.GetAttr('user','username');
$.email.text = deviceStorage.GetAttr('user','email');
$.username_label.text = L('name').toUpperCase();
$.password_label.text = L('password').toUpperCase();
$.password_label2.text = 'confirm'.toUpperCase();
$.weight_label.text = L('weight').toUpperCase();
$.country_label.text = L('country').toUpperCase();
$.city_label.text = L('city').toUpperCase();
$.club_label.text = L('club').toUpperCase();

var data = {
	storedPicture:{},
	imageName:deviceStorage.GetAttr('user','email').toString().replace(/[^\w\-\\.]/g,'')+'.png',
	openCamera:function() {
		$.view.blur();
		Ti.Media.showCamera({
			success:function(res) {
				if (res.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					logManager.add(26);
					data.storedPicture = res.media.imageAsThumbnail(100, 0, 0);
					api.mcSendImage({'name':data.imageName, 'content':Ti.Utils.base64encode(data.storedPicture).toString()}, function callback(result) {
						if (api.isValidResponse(result)) {

							api.mcUpdateImage({'userID':deviceStorage.GetAttr('user','userID')}, function callback(result) {
								if (api.isValidResponse(result)) {
									utils.log(data.image);
									$.picture.image = data.storedPicture;
									deviceStorage.SetAttr('user','image', data.imageName);
								} else {
									//TODO on error
								}
							});
						} else {
							//TODO on error
						}
					});
				}
			},
			saveToPhotoGallery:false		
		});
	}
};

var onClickPicture = _.debounce(function(e) {
	if (OS_ANDROID) {
		var storagePermission = 'android.permission.WRITE_EXTERNAL_STORAGE';
		var cameraPermission = 'android.permission.CAMERA';
		var permissionsToRequest = [];
		if (!Ti.Android.hasPermission(storagePermission)) { //user has to manually accept the storage permission.
			permissionsToRequest.push(storagePermission);
		}
		
		if (!Ti.Android.hasPermission(cameraPermission)) { //user has to manually accept the camera permission.
			permissionsToRequest.push(cameraPermission);
		}
		
		if (Ti.Android.hasPermission(storagePermission) && Ti.Android.hasPermission(cameraPermission)) { // the permission was previously accepted.
			data.openCamera();
		}
							
		if (permissionsToRequest.length > 0) {	   			
			Ti.Android.requestPermissions(permissionsToRequest, function(e) {
		        if (e && e.success) {
		        	data.openCamera();
		        } else {
		           	return;
		        }
		    });
		}
	} else if (OS_IOS) {
		data.openCamera();
	}
}, 1000, true);

api.mcGetProfile(deviceStorage.GetAttr('user','userID'), function callback(result) {
	if (api.isValidResponse(result)) {
		deviceStorage.Set('user', result);
		$.picture.image = utils.loadImage(result.image);
		$.username.text = result.username.toString() || '';
		$.username_value.value = result.username.toString() || '';
		$.password_value2.value = $.password_value.value = result.pw.toString() || '';
		$.weight_value.value = result.weight.toString() || '';
		$.country_value.value = result.country.toString() || '';
		$.city_value.value = result.city.toString() || '';
		$.club_value.value = result.club.toString() || '';
	} else {
		//TODO on error
	}
});

$.content.add(Alloy.createController('ui/button', {
	'title':L('save'),
	'style':Alloy.CFG.colors.light,
	'touch':function() {
		logManager.add(24);
		
		_.delay(function() {
			$.password_value2.borderColor = Alloy.CFG.colors.lightGrey;
		}, 2000);
		
		if (!($.password_value2.value.length > 0 && $.password_value.value === $.password_value2.value)) {
			$.password_value2.borderColor = Alloy.CFG.colors.red;
			$.password_value2.value = '';
			return;
		}
		
		api.mcEditProfile({'username':$.username_value.value, 'pw':$.password_value.value, 'weight':parseFloat($.weight_value.value).toFixed(1),
		  'country':$.country_value.value, 'city':$.city_value.value, 'club':$.club_value.value}, function callback(result) {
			if (api.isValidResponse(result)) {
				$.username.text = $.username_value.value || '';
				WinSig.WARN.Show('done', {
					'title':L('data_updated'),
					'text':L('data_saved'),
					'close':WinSig.WARN.Hide
				});
			} else {
				WinSig.WARN.Show('done', {
					'backgroundColor':Alloy.CFG.colors.red,
					'title':L('edit_title'),
					'text':L('edit_text'),
					'desc':L('edit_desc'),
					'close':WinSig.WARN.Hide
				});
			}
		});
	}
}).getView());

$.content.add(Alloy.createController('ui/button', {
	'title':L('logout'),
	'style':Alloy.CFG.colors.dark,
	'touch':function() {
		logManager.add(25);
		deviceStorage.Set('user', {});
		deviceStorage.Set('friend', {});
		WinSig.SCREEN.Window.close();
		if (OS_IOS) { //in android, close() will kill application, but not in iOS.
			WinSig.SCREEN.Window.open();
			WinSig.CORE.Load('views/session/index');
		}
	}
}).getView());

$.view.constructor = function() {
	/* EMPTY */
};

$.view.blur = function() {
	utils.hideKeyboard();
	$.username_value.blur();
	$.password_value.blur();
	$.weight_value.blur();
	$.country_value.blur();
	$.city_value.blur();
	$.club_value.blur();
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	$.view.blur();
	utils.removeAllVerticalViews($.content);
	data = null;
};