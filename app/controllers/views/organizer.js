var api = require('api-v1');
var logManager = require('log-manager');
var utils = require('utils');

//Global references :BAD
WinSig.SCREEN.Locker = Alloy.createController('ui/locker').getView();
$.views.add(WinSig.SCREEN.Locker);

var data = {
	buttons:[],
	status:false,
	hide:Ti.UI.createAnimation({
		opacity:0.25,
		duration:100
	}),
	complete:{
		hide:function() { 			
			$.content.animate(Ti.UI.createAnimation({
				opacity:1,
				duration:100
			}));
		}
	},
	page:_.debounce(function(e) {
		logManager.add(6);
		closeMenu();
		WinSig.MODULE(this.name, {});	
	})
};

//Global var used to change screens.. BAD! FIXME
WinSig.MODULE = function(title, arguments) {
	Ti.Analytics.featureEvent('menu:'+title);
	$.title.text = L(title);
	
	WinSig.CORE.Loading(true);
	utils.removeAllVerticalViews($.content);
	$.content.add(Alloy.createController('views/'+title+'/index').getView());
	WinSig.CORE.Loading(false);
	
	if (_.isArray($.content.children) && $.content.children.length !== 1) {
		utils.log("Memory Leak Main View", 'error');
	}
	
	if (_.isEmpty(arguments)) {
		$.content.children[$.content.children.length-1].constructor();
	} else {
		$.content.children[$.content.children.length-1].constructor(arguments);
	}

	$.content.animate(data.hide);
};

data.hide.addEventListener('complete', data.complete.hide);

// Build green Menu.
var menu = ['play', 'duel', 'rankings', 'friends', 'profile']; // folder structure
for (var i in menu) {
	data.buttons[i] = Ti.UI.createView({
		'left':0,
		'height':48,
		'layout':'horizontal'
	});
	
	data.buttons[i].name = menu[i];
	data.buttons[i].id = i;
	
	data.buttons[i].add(Ti.UI.createImageView({
		'height':20,
		'width':20,
		'left':16,
		'image':'/images/menu/'+data.buttons[i].name+'.png'
	}));
	
	data.buttons[i].add(Ti.UI.createLabel({
		'text':L(data.buttons[i].name),
		'height':48,
		'left':14,
		'color':Alloy.CFG.colors.white,
		'textAlign':'left',
		'font':{
			'fontSize':16,
			'fontFamily':'GothamRnd-Book'
		}
	}));
	
	data.buttons[i].addEventListener('click', data.page);	
	$.items.add(data.buttons[i]);
}

if (!utils.isSessionActive()) {
	data.buttons[0].opacity = 0.3;
	data.buttons[0].removeEventListener('click', data.page);
	data.buttons[3].opacity = 0.3;
	data.buttons[3].removeEventListener('click', data.page);
	data.buttons[4].opacity = 0.3;
	data.buttons[4].removeEventListener('click', data.page);
}

if (utils.isMagicoachFreeVersion() && utils.isSessionActive()) {
	$.extra_menu.add(Alloy.createController('ui/buttonPremium', {
		click:function() {
			Ti.Platform.openURL(Alloy.CFG.linkPro);
			closeMenu();	
		}
	}).getView());
}

if (!utils.isSessionActive()) {
	$.extra_menu.add(Alloy.createController('ui/buttonSession').getView());
}

var closeMenu = function() {
	logManager.add(3);
	$.locker.zIndex = 1;
	$.menu.animate(Ti.UI.createAnimation({
		left:-$.menu.getWidth(),
		duration:150
	}));
};

var openMenu = function() {
	logManager.add(2);
	$.locker.zIndex = 3;
	$.menu.animate(Ti.UI.createAnimation({
		left:0,
		duration:150
	}));
};

openMenu();

var onClickMenuIcon = _.debounce(function(e) {
	utils.hideKeyboard();
	openMenu();
}, 500, true);

var onClickMenuClose = _.debounce(function(e) {
	closeMenu();
}, 500, true);

var onClickLogo = _.debounce(function(e) {
	logManager.add(4);
	utils.hideKeyboard();
	$.info_site.text = Ti.App.description;
	$.version.text = L('info_version')+Ti.App.version;
	$.info.visible = $.info.touchEnabled = true;
	$.info.zIndex = 200;
}, 500, true);

var onClickLogoScreen = _.debounce(function(e) {
	logManager.add(5);
	$.info.visible = $.info.touchEnabled = false;
	$.info.zIndex = 1;
}, 500, true);

//WinSig.MODULE('matches', {});
//WinSig.MODULE('rankings', {});
WinSig.MODULE('duel', {});
//WinSig.MODULE('play', {});
//WinSig.MODULE('friends', {});
//WinSig.MODULE('profile', {});
_.delay(function() {
	closeMenu(); // close menu after few seconds.
}, 4000);

$.views.destructor = function() {
	$.destroy();
	$.off();
	data.hide.removeEventListener('complete', data.complete.hide);
	for (var i in menu) {
		data.buttons[i].removeEventListener('click', data.page);
	}
	utils.removeAllVerticalViews($.extra_menu);
	utils.removeAllVerticalViews($.items);
	utils.log('destructor.organizer');
};