$.stats_label.text = 'stats'.toUpperCase();

var data = {
	user:{
		result_last_game:'Winner',
		result_2_games_ago:'Winner',
		result_3_games_ago:'Loser',
		result_4_games_ago:'Draw',
		result_5_games_ago:'Draw'
	},
	friend:{
		result_last_game:'Loser',
		result_2_games_ago:'Loser',
		result_3_games_ago:'Loser',
		result_4_games_ago:'Winner',
		result_5_games_ago:'Draw'
	}
};

	//TODO 'for' instead if elses
	if (data.user.result_last_game == 'Winner') {
		$.user_stats_1.borderColor = '#2a9f3a';
		$.user_stats_1.backgroundColor = '#4daf5b';
		$.user_stats_1.text = 'W';
		$.user_stats_1.width = 22;
		$.user_stats_1.left = $.user_stats_1.right = 3;
		$.user_stats_1.visible = true;
	} else if (data.user.result_last_game == 'Draw') {
		$.user_stats_1.borderColor = '#d0ac47';
		$.user_stats_1.backgroundColor = '#d8ba66';
		$.user_stats_1.text = 'D';
		$.user_stats_1.width = 22;
		$.user_stats_1.left = $.user_stats_1.right = 3;
		$.user_stats_1.visible = true;
	} else if (data.user.result_last_game == 'Loser') {
		$.user_stats_1.borderColor = '#cc5050';
		$.user_stats_1.backgroundColor = '#c12b2b';
		$.user_stats_1.text = 'L';
		$.user_stats_1.width = 22;
		$.user_stats_1.left = $.user_stats_1.right = 3;
		$.user_stats_1.visible = true;
	} else {
		$.user_stats_1.visible = false;
	}
	
	if (data.user.result_2_games_ago == 'Winner') {
		$.user_stats_2.borderColor = '#2a9f3a';
		$.user_stats_2.backgroundColor = '#4daf5b';
		$.user_stats_2.text = 'W';
		$.user_stats_2.width = 22;
		$.user_stats_2.left = $.user_stats_2.right = 3;
		$.user_stats_2.visible = true;
	} else if (data.user.result_2_games_ago == 'Draw') {
		$.user_stats_2.borderColor = '#d0ac47';
		$.user_stats_2.backgroundColor = '#d8ba66';
		$.user_stats_2.text = 'D';
		$.user_stats_2.width = 22;
		$.user_stats_2.left = $.user_stats_2.right = 3;
		$.user_stats_2.visible = true;
	} else if (data.user.result_2_games_ago == 'Loser') {
		$.user_stats_2.borderColor = '#cc5050';
		$.user_stats_2.backgroundColor = '#c12b2b';
		$.user_stats_2.text = 'L';
		$.user_stats_2.width = 22;
		$.user_stats_2.left = $.user_stats_2.right = 3;
		$.user_stats_2.visible = true;
	} else {
		$.user_stats_2.visible = false;
	}
	
	if (data.user.result_3_games_ago == 'Winner') {
		$.user_stats_3.borderColor = '#2a9f3a';
		$.user_stats_3.backgroundColor = '#4daf5b';
		$.user_stats_3.text = 'W';
		$.user_stats_3.width = 22;
		$.user_stats_3.left = $.user_stats_3.right = 3;
		$.user_stats_3.visible = true;
	} else if (data.user.result_3_games_ago == 'Draw') {
		$.user_stats_3.borderColor = '#d0ac47';
		$.user_stats_3.backgroundColor = '#d8ba66';
		$.user_stats_3.text = 'D';
		$.user_stats_3.width = 22;
		$.user_stats_3.left = $.user_stats_3.right = 3;
		$.user_stats_3.visible = true;
	} else if (data.user.result_3_games_ago == 'Loser') {
		$.user_stats_3.borderColor = '#cc5050';
		$.user_stats_3.backgroundColor = '#c12b2b';
		$.user_stats_3.text = 'L';
		$.user_stats_3.width = 22;
		$.user_stats_3.left = $.user_stats_3.right = 3;
		$.user_stats_3.visible = true;
	} else {
		$.user_stats_3.visible = false;
	}
	
	if (data.user.result_4_games_ago == 'Winner') {
		$.user_stats_4.borderColor = '#2a9f3a';
		$.user_stats_4.backgroundColor = '#4daf5b';
		$.user_stats_4.text = 'W';
		$.user_stats_4.width = 22;
		$.user_stats_4.left = $.user_stats_4.right = 3;
		$.user_stats_4.visible = true;
	} else if (data.user.result_4_games_ago == 'Draw') {
		$.user_stats_4.borderColor = '#d0ac47';
		$.user_stats_4.backgroundColor = '#d8ba66';
		$.user_stats_4.text = 'D';
		$.user_stats_4.width = 22;
		$.user_stats_4.left = $.user_stats_4.right = 3;
		$.user_stats_4.visible = true;
	} else if (data.user.result_4_games_ago == 'Loser') {
		$.user_stats_4.borderColor = '#cc5050';
		$.user_stats_4.backgroundColor = '#c12b2b';
		$.user_stats_4.text = 'L';
		$.user_stats_4.width = 22;
		$.user_stats_4.left = $.user_stats_4.right = 3;
		$.user_stats_4.visible = true;
	} else {
		$.user_stats_4.visible = false;
	}
	
	if (data.user.result_5_games_ago == 'Winner') {
		$.user_stats_5.borderColor = '#2a9f3a';
		$.user_stats_5.backgroundColor = '#4daf5b';
		$.user_stats_5.text = 'W';
		$.user_stats_5.width = 22;
		$.user_stats_5.left = $.user_stats_5.right = 3;
		$.user_stats_5.visible = true;
	} else if (data.user.result_5_games_ago == 'Draw') {
		$.user_stats_5.borderColor = '#d0ac47';
		$.user_stats_5.backgroundColor = '#d8ba66';
		$.user_stats_5.text = 'D';
		$.user_stats_5.width = 22;
		$.user_stats_5.left = $.user_stats_5.right = 3;
		$.user_stats_5.visible = true;
	} else if (data.user.result_5_games_ago == 'Loser') {
		$.user_stats_5.borderColor = '#cc5050';
		$.user_stats_5.backgroundColor = '#c12b2b';
		$.user_stats_5.text = 'L';
		$.user_stats_5.width = 22;
		$.user_stats_5.left = $.user_stats_5.right = 3;
		$.user_stats_5.visible = true;
	} else {
		$.user_stats_5.visible = false;
	}
	
	if (data.friend.result_last_game == 'Winner') {
		$.friend_stats_1.borderColor = '#2a9f3a';
		$.friend_stats_1.backgroundColor = '#4daf5b';
		$.friend_stats_1.text = 'W';
		$.friend_stats_1.width = 22;
		$.friend_stats_1.left = $.friend_stats_1.right = 3;
		$.friend_stats_1.visible = true;
	} else if (data.friend.result_last_game == 'Draw') {
		$.friend_stats_1.borderColor = '#d0ac47';
		$.friend_stats_1.backgroundColor = '#d8ba66';
		$.friend_stats_1.text = 'D';
		$.friend_stats_1.width = 22;
		$.friend_stats_1.left = $.friend_stats_1.right = 3;
		$.friend_stats_1.visible = true;
	} else if (data.friend.result_last_game == 'Loser') {
		$.friend_stats_1.borderColor = '#cc5050';
		$.friend_stats_1.backgroundColor = '#c12b2b';
		$.friend_stats_1.text = 'L';
		$.friend_stats_1.width = 22;
		$.friend_stats_1.left = $.friend_stats_1.right = 3;
		$.friend_stats_1.visible = true;
	} else {
		$.friend_stats_1.visible = false;
	}
	
	if (data.friend.result_2_games_ago == 'Winner') {
		$.friend_stats_2.borderColor = '#2a9f3a';
		$.friend_stats_2.backgroundColor = '#4daf5b';
		$.friend_stats_2.text = 'W';
		$.friend_stats_2.width = 22;
		$.friend_stats_2.left = $.friend_stats_2.right = 3;
		$.friend_stats_2.visible = true;
	} else if (data.friend.result_2_games_ago == 'Draw') {
		$.friend_stats_2.borderColor = '#d0ac47';
		$.friend_stats_2.backgroundColor = '#d8ba66';
		$.friend_stats_2.text = 'D';
		$.friend_stats_2.width = 22;
		$.friend_stats_2.left = $.friend_stats_2.right = 3;
		$.friend_stats_2.visible = true;
	} else if (data.friend.result_2_games_ago == 'Loser') {
		$.friend_stats_2.borderColor = '#cc5050';
		$.friend_stats_2.backgroundColor = '#c12b2b';
		$.friend_stats_2.text = 'L';
		$.friend_stats_2.width = 22;
		$.friend_stats_2.left = $.friend_stats_2.right = 3;
		$.friend_stats_2.visible = true;
	} else {
		$.friend_stats_2.visible = false;
	}
	
	if (data.friend.result_3_games_ago == 'Winner') {
		$.friend_stats_3.borderColor = '#2a9f3a';
		$.friend_stats_3.backgroundColor = '#4daf5b';
		$.friend_stats_3.text = 'W';
		$.friend_stats_3.width = 22;
		$.friend_stats_3.left = $.friend_stats_3.right = 3;
		$.friend_stats_3.visible = true;
	} else if (data.friend.result_3_games_ago == 'Draw') {
		$.friend_stats_3.borderColor = '#d0ac47';
		$.friend_stats_3.backgroundColor = '#d8ba66';
		$.friend_stats_3.text = 'D';
		$.friend_stats_3.width = 22;
		$.friend_stats_3.left = $.friend_stats_3.right = 3;
		$.friend_stats_3.visible = true;
	} else if (data.friend.result_3_games_ago == 'Loser') {
		$.friend_stats_3.borderColor = '#cc5050';
		$.friend_stats_3.backgroundColor = '#c12b2b';
		$.friend_stats_3.text = 'L';
		$.friend_stats_3.width = 22;
		$.friend_stats_3.left = $.friend_stats_3.right = 3;
		$.friend_stats_3.visible = true;
	} else {
		$.friend_stats_3.visible = false;
	}
	
	if (data.friend.result_4_games_ago == 'Winner') {
		$.friend_stats_4.borderColor = '#2a9f3a';
		$.friend_stats_4.backgroundColor = '#4daf5b';
		$.friend_stats_4.text = 'W';
		$.friend_stats_4.width = 22;
		$.friend_stats_4.left = $.friend_stats_4.right = 3;
		$.friend_stats_4.visible = true;
	} else if (data.friend.result_4_games_ago == 'Draw') {
		$.friend_stats_4.borderColor = '#d0ac47';
		$.friend_stats_4.backgroundColor = '#d8ba66';
		$.friend_stats_4.text = 'D';
		$.friend_stats_4.width = 22;
		$.friend_stats_4.left = $.friend_stats_4.right = 3;
		$.friend_stats_4.visible = true;
	} else if (data.friend.result_4_games_ago == 'Loser') {
		$.friend_stats_4.borderColor = '#cc5050';
		$.friend_stats_4.backgroundColor = '#c12b2b';
		$.friend_stats_4.text = 'L';
		$.friend_stats_4.width = 22;
		$.friend_stats_4.left = $.friend_stats_4.right = 3;
		$.friend_stats_4.visible = true;
	} else {
		$.friend_stats_4.visible = false;
	}
	
	if (data.friend.result_5_games_ago == 'Winner') {
		$.friend_stats_5.borderColor = '#2a9f3a';
		$.friend_stats_5.backgroundColor = '#4daf5b';
		$.friend_stats_5.text = 'W';
		$.friend_stats_5.width = 22;
		$.friend_stats_5.left = $.friend_stats_5.right = 3;
		$.friend_stats_5.visible = true;
	} else if (data.friend.result_5_games_ago == 'Draw') {
		$.friend_stats_5.borderColor = '#d0ac47';
		$.friend_stats_5.backgroundColor = '#d8ba66';
		$.friend_stats_5.text = 'D';
		$.friend_stats_5.width = 22;
		$.friend_stats_5.left = $.friend_stats_5.right = 3;
		$.friend_stats_5.visible = true;
	} else if (data.friend.result_5_games_ago == 'Loser') {
		$.friend_stats_5.borderColor = '#cc5050';
		$.friend_stats_5.backgroundColor = '#c12b2b';
		$.friend_stats_5.text = 'L';
		$.friend_stats_5.width = 22;
		$.friend_stats_5.left = $.friend_stats_5.right = 3;
		$.friend_stats_5.visible = true;
	} else {
		$.friend_stats_5.visible = false;
	}
	

	/*
	$.user_cups.text = properties.result.user.cups;
	$.user_cups.backgroundColor = (parseFloat(properties.result.user.cups) > parseFloat(properties.result.friend.cups)) ? '#cfa93f' : '#b7b7b7';
	$.user_cups.borderColor = (parseFloat(properties.result.user.cups) > parseFloat(properties.result.friend.cups)) ? '#c6981b' : '#acacac';
	$.friend_cups.text = properties.result.friend.cups;
	$.friend_cups.backgroundColor = (parseFloat(properties.result.user.cups) < parseFloat(properties.result.friend.cups)) ? '#cfa93f' : '#b7b7b7';
	$.friend_cups.borderColor = (parseFloat(properties.result.user.cups) < parseFloat(properties.result.friend.cups)) ? '#c6981b' : '#acacac';
	*/
	//for(var i in data.ranking) data.ranking[i].reload(properties.result.user[i],properties.result.friend[i]);
	
	// var counter = {
		// user:0,
		// friend:0
	// };
// 	
	// if (_.isArray(properties.result.user.results)) {
		// for (var i in properties.result.user.results) {
			// if (properties.result.user.results[i].result > 0) {
				// counter.user += parseInt(properties.result.user.results[i].result);
			// }
			// var id = 'user_stats_'+parseInt(parseInt(i)+1);
			// var result = {
				// border:'#cc5050',
				// bg:'#c12b2b',
				// symbol:'L'
			// };			
// 	
			// if (isset(properties.result.user.results[i]) &&
				// isset(properties.result.user.results[i].result) && 
				// parseInt(properties.result.user.results[i].result) > 1) {
					// result = (parseInt(properties.result.user.results[i].result) == 2) ? {
						// border:'#d0ac47',
						// bg:'#d8ba66',
						// symbol:'D'
					// } : {
						// border:'#2a9f3a',
						// bg:'#4daf5b',
						// symbol:'W'
					// };
			// }
			// $[id].borderColor = result.border;
			// $[id].backgroundColor = result.bg;
			// $[id].text = result.symbol;
			// $[id].width = 22;
			// $[id].left = $[id].right = 3;
			// $[id].visible = true;	
		// }
	// }
// 	
	// if (_.isArray(properties.result.friend.results)) {
		// for (var i in properties.result.friend.results) {
			// if (properties.result.friend.results[i].result > 0) {
				// counter.friend += parseInt(properties.result.friend.results[i].result);
			// }
// 			
			// var id = 'friend_stats_'+parseInt(parseInt(i)+1);
			// var result = {
				// border:'#cc5050',
				// bg:'#c12b2b',
				// symbol:'L'
			// };
// 			
			// if (isset(properties.result.friend.results[i]) && 
				// isset(properties.result.friend.results[i].result) &&
				// parseInt(properties.result.friend.results[i].result) > 1) {
					// result = (parseInt(properties.result.friend.results[i].result) == 2) ? {
						// border:'#d0ac47',
						// bg:'#d8ba66',
						// symbol:'D'
					// } : {
						// border:'#2a9f3a',
						// bg:'#4daf5b',
						// symbol:'W'
					// };
			// }
			// $[id].borderColor = result.border;
			// $[id].backgroundColor = result.bg;
			// $[id].text = result.symbol;
			// $[id].width = 22;
			// $[id].left = $[id].right = 3;
			// $[id].visible = true;
		// }
	// }
// 		
	// data.performance.reload(counter.user,counter.friend,true);
// 	
	// for (var i in data.games) {
		// data.games[i].reload(properties.result.user[i],properties.result.friend[i]);
	// }
// 	
	// for (var i in data.result) {
		// data.result[i].reload(properties.result.user[i],properties.result.friend[i]);
	// }
// 	
	// data.minutes.reload(properties.result.user.totalminutes,properties.result.friend.totalminutes);
	// $.user_bronze.text = Fx.numb(properties.result.user.medals.bronze);
	// $.user_silver.text = Fx.numb(properties.result.user.medals.silver);
	// $.user_gold.text = Fx.numb(properties.result.user.medals.gold);
	// $.friend_bronze.text = Fx.numb(properties.result.friend.medals.bronze);
	// $.friend_silver.text = Fx.numb(properties.result.friend.medals.silver);
	// $.friend_gold.text = Fx.numb(properties.result.friend.medals.gold);
	//Ti.App.fireEvent('app:global', { name:'totals' });
//};

$.view.destructor = function() {
	$.destroy();
	$.off();
	data = null;
};
