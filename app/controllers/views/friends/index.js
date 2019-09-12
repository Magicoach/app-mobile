var logManager = require('log-manager');
var screenDimension = require('screen-dimension');
var share = require('share');
var utils = require('utils');

$.games.width = $.friends.width = $.search.width = screenDimension.getOneThirdWidth();

$.container.views = [
	Alloy.createController('views/friends/add-friends/list').getView(),
	Alloy.createController('views/friends/games/list').getView(),
	Alloy.createController('views/friends/search/list').getView()
];

var onClickGamesTab = _.debounce(function(e) {
	logManager.add(18);
	$.games.backgroundColor = Alloy.CFG.colors.green;
	$.friends.backgroundColor = $.search.backgroundColor = Alloy.CFG.colors.light;
	$.container.scrollToView(1);
}, 500, true);

var onClickFriendsTab = _.debounce(function(e) {
	logManager.add(19);
	$.friends.backgroundColor = Alloy.CFG.colors.green; 
	$.games.backgroundColor = $.search.backgroundColor = Alloy.CFG.colors.light;
	$.container.scrollToView(0);
}, 500, true);

var onClickSearchTab = _.debounce(function(e) {
	$.search.backgroundColor = Alloy.CFG.colors.green; 
	$.games.backgroundColor = $.friends.backgroundColor = Alloy.CFG.colors.light;
	$.container.scrollToView(2);
}, 500, true);

var onClickSendInvitation = _.debounce(function(e) {
	share.sendInvite();
}, 500, true);

$.view.constructor = function() {};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllHorizontalViews($.container);
	utils.log('destructor.profile.index');
};