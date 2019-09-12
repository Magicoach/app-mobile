var api = require('api-v1');
var logManager = require('log-manager');
var moment = require('alloy/moment');
var share = require('share');
var screenDimension = require('screen-dimension');
var utils = require('utils');

var Ranking = {
	allDates:{
		now:{
			title:moment().format('MMMM')+' - '+moment().format('YYYY'),
			start:moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		year1:{
			title:'YEAR ' + moment().startOf('year').format('Y'),
			start:moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().endOf('year').format('YYYY-MM-DD HH:mm:ss')
		},
		year2:{
			title:'YEAR ' + moment().startOf('year').subtract(1, 'years').format('Y'),
			start:moment().startOf('year').subtract(1, 'years').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().endOf('year').subtract(1, 'years').format('YYYY-MM-DD HH:mm:ss')
		},
		month1:{
			title:moment().subtract(1, 'M').format('MMMM')+' - '+moment().subtract(1, 'M').format('YYYY'),
			start:moment().subtract(1, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(1, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		month2:{
			title:moment().subtract(2, 'M').format('MMMM')+' - '+moment().subtract(2, 'M').format('YYYY'),
			start:moment().subtract(2, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(2, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		month3:{
			title:moment().subtract(3, 'M').format('MMMM')+' - '+moment().subtract(3, 'M').format('YYYY'),
			start:moment().subtract(3, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(3, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		month4:{
			title:moment().subtract(4, 'M').format('MMMM')+' - '+moment().subtract(4, 'M').format('YYYY'),
			start:moment().subtract(4, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(4, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		month5:{
			title:moment().subtract(5, 'M').format('MMMM')+' - '+moment().subtract(5, 'M').format('YYYY'),
			start:moment().subtract(5, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(5, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		},
		month6:{
			title:moment().subtract(6, 'M').format('MMMM')+' - '+moment().subtract(6, 'M').format('YYYY'),
			start:moment().subtract(6, 'M').startOf('month').format('YYYY-MM-DD HH:mm:ss'),
			end:moment().subtract(6, 'M').endOf('month').format('YYYY-MM-DD HH:mm:ss')
		}
	},
	currentCategory:'distance',
	currentOrder:'avg',
	currentDate:(function() {
		if (!utils.isSessionActive()) {
			return {
				start:moment().startOf('year').format('YYYY-MM-DD HH:mm:ss'),
				end:moment().endOf('year').format('YYYY-MM-DD HH:mm:ss')
			};
		} else {
			return {
				start:moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'),
				end:moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
			};
		}
	})(),
	reload:function() {
		utils.removeAllVerticalViews($.classification);
		var callback = function(result) {
			if (api.isValidResponse(result)) {
				result = _.isArray(result) ? result : [result];
				for (var i in result) {
					$.classification.add(Alloy.createController('ui/rank', result[i]).getView());
				}
			} else {
				//TODO on error
			}
		};
		
		if (Ranking.currentCategory === 'sprints') {
			api.mcRankingSprints(moment(Ranking.currentDate.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), moment(Ranking.currentDate.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), Ranking.currentOrder, callback);
		} else if (Ranking.currentCategory == 'goals') {
			api.mcRankingGoals(moment(Ranking.currentDate.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), moment(Ranking.currentDate.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), Ranking.currentOrder, callback);
		} else if (Ranking.currentCategory == 'distance') {
			api.mcRankingDistance(moment(Ranking.currentDate.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), moment(Ranking.currentDate.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), Ranking.currentOrder, callback);
		} else if (Ranking.currentCategory == 'magicpoints') {
			api.mcRankingMagicpoints(moment(Ranking.currentDate.start, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), moment(Ranking.currentDate.end, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'), Ranking.currentOrder, callback);
		}
	}
};

$.select.text = utils.isSessionActive() ? Ranking.allDates.now.title : Ranking.allDates.year1.title;

var options = ['sprints', 'goals', 'distance', 'magicpoints'];
for (var i in options) {
	$.category.add(Alloy.createController('ui/options', {
		width:screenDimension.getOneQuarterWidth(),
		text:L(options[i]),
		name:options[i],
		click:function(e) {
			logManager.add(36);
			$.content.setCurrentPage(0);
			for (var i in $.category.children) {
				$.category.children[i].select(false);
			}
			
			if (e.source.text === L('sprints') || e.source.name === options[0]) {
				$.category.children[0].select(true);
				Ranking.currentCategory = options[0];
			} else if (e.source.text === L('goals') || e.source.name === options[1]) {
				$.category.children[1].select(true);
				Ranking.currentCategory = options[1];
			} else if (e.source.text === L('distance') || e.source.name === options[2]) {
				$.category.children[2].select(true);
				Ranking.currentCategory = options[2];
			} else if (e.source.text === L('magicpoints') || e.source.name === options[3]) {
				$.category.children[3].select(true);
				Ranking.currentCategory = options[3];
			}
			
			Ranking.reload();
		}
	}).getView());
}

for (var i in Ranking.allDates) {
	$.times.add(Alloy.createController('ui/dates', {
		text:Ranking.allDates[i].title,
		time:i,
		redraw:function(e) {
			var index = 0;
			if (_.isArray($.times.children)) {
				for (var i in $.times.children) {
					$.times.children[i].select(false);
					if ($.times.children[i].text === e.source.text) {
						index = i;
					}
				}
				$.times.children[index].select(true);	
			}
		},
		close:function() {
			$.content.setCurrentPage(0);
		},
		click:function(e) {
			this.close();
			this.redraw(e);
			$.select.text = this.text;
			Ranking.currentDate = Ranking.allDates[this.time];
			Ranking.reload();		
		}
	}).getView());
	$.times.children[0].select(true);
}

var footerOptions = {
	play:function() { 
		if (utils.isSessionActive()) { 
			WinSig.MODULE('play', {});
		}
	},
	duel:function() { WinSig.MODULE('duel', {}); },
	share:function() { share.captureScreenshot(WinSig.SCREEN.Window); }
};

for (var i in footerOptions) {
	$.footer.add(Alloy.createController('ui/footer', {
		width:screenDimension.getOneThirdWidth(),
		icon:i,
		title:L(i),
		click:footerOptions[i]
	}).getView());
}

if (!utils.isSessionActive()) {
	$.footer.children[0].opacity = 0.3;
} 

if (!utils.isSessionActive()) {
	$.paid_description.text = L('sign_in_stats').toUpperCase();
}

var onClickPaidDescription = _.debounce(function(e) {
	if (!utils.isSessionActive()) {
		WinSig.CORE.Load('views/session/index');
	}
}, 500, true);

var onClickOrder = _.debounce(function(e) {
	logManager.add(37);
	$.content.setCurrentPage(0);
	for (var i in $.order.children) {
		$.order.children[i].color = Alloy.CFG.colors.dark;
		$.order.children[i].font = {
			fontSize:12,
			fontWeight:'normal',
			fontFamily:'GothamRnd-Book'
		};
	}
	
	if (e.source.text === L('total')) {
		Ranking.currentOrder = 'sum';
	} else if(e.source.text === L('med')) {
		Ranking.currentOrder = 'avg';
	} else if(e.source.text === L('max')) {
		Ranking.currentOrder = 'max';	
	}
	
	e.source.color = Alloy.CFG.colors.darkest;
	e.source.font = {
		fontSize:12,
		fontWeight:'bold',
		fontFamily:'GothamRnd-Book'
	};
	
	Ranking.reload();
}, 300, true);

var onClickDateHeader = _.debounce(function(e) {
	if (utils.isSessionActive()) {
		if ($.content.getCurrentPage() === 0) {
			$.content.setCurrentPage(1);
		} else {
			$.content.setCurrentPage(0);
		}
	}
}, 300, true);

$.view.constructor = function() {
	$.category.children[2].select(true); //Distance white bold
	Ranking.reload();
};

$.view.destructor = function() {
	$.destroy();
	$.off();
	utils.removeAllVerticalViews($.footer);
	utils.removeAllVerticalViews($.times);
	utils.removeAllVerticalViews($.classification);
	utils.removeAllVerticalViews($.category);
	Ranking = null;
};