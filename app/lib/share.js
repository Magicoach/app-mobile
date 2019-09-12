var deviceStorage = require('device-storage');

var share = function(args) {
	if (OS_ANDROID) {
		var intent = Ti.Android.createIntent({
			action: Ti.Android.ACTION_SEND
		});

		if(args.text) intent.putExtra(Ti.Android.EXTRA_TEXT, args.text);
		
		if(args.image) {
			intent.type = "image/*";
			var temp = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,'image.png');
			temp.write(args.image);
			intent.putExtraUri(Ti.Android.EXTRA_STREAM,temp.nativePath);
		} else {
			intent.type = "text/plain";
			intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
		}
		
	    Ti.Android.currentActivity.startActivity(Ti.Android.createIntentChooser(intent, 'share'));
	} else if (OS_IOS) {
		var social = require('dk.napp.social');
		var payload = {
			text:args.text || {},
			image:args.image || {}
		};
		if (social.isActivityViewSupported()) {
			social.activityView(payload);
		}
	}
};

exports.captureScreenshot = function(view) {
	share({
		text:'Hello,\nCheck out this screen from my Magicoach App.\nAnalytics by www.magicoach.com\n',
		image:view.toImage()
	});
};

exports.sendInvite = function() {
	var message = 'Hello,';		
		message += '\nI\'m ' + deviceStorage.GetAttr('user','username');
		message += ' and I\'m inviting you to join me in Magicoach.';
		message += '\nWe\'ll be able to compare our soccer games, goals and performance!';
		message += '\n\nThe app is free for iOS and Android.';
		message += '\nCheck it at magicoach.com';
		message += '\n\nSee you soon!';
	share({
		text:message,
	});
};