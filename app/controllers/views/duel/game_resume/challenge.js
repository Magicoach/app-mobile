$.title_challenge.text = L('challenge_label').toUpperCase();

$.challenge.constructor = function(properties) {
	var challenge = (properties && properties.show);
	
	if(challenge) {
		
		if(properties.win() == 0) {
			$.wrap_user.height = $.wrap_user.width = 46;
			$.wrap_friend.height = $.wrap_friend.width = 30;
			$.wrap_user.borderRadius = 23;
			$.wrap_friend.borderRadius = 15;
			$.wrap_user.borderColor = '#c6981b';
			$.wrap_friend.borderColor = '#acacac';
			$.wrap_user.backgroundColor = '#cfa93f';
			$.wrap_friend.backgroundColor = '#b7b7b7';
			$.title_user.top = 8;
			$.title_friend.top = 14;
			$.title_user.text = 'Winner';
			$.title_friend.text = 'Loser';
			$.icon_user.image = '/images/report/challenge_win.png';
			$.icon_friend.image = '/images/report/challenge.png';
		} else if (properties.win() == 2) {
			$.wrap_user.height = $.wrap_user.width = 30;
			$.wrap_friend.height = $.wrap_friend.width = 46;
			$.wrap_user.borderRadius = 15;
			$.wrap_friend.borderRadius = 23;
			$.wrap_user.borderColor = '#acacac';
			$.wrap_friend.borderColor = '#c6981b';
			$.wrap_user.backgroundColor = '#b7b7b7';
			$.wrap_friend.backgroundColor = '#cfa93f';
			$.title_user.top = 14;
			$.title_friend.top = 8;
			$.title_user.text = 'Loser';
			$.title_friend.text = 'Winner';
			$.icon_user.image = '/images/report/challenge.png';
			$.icon_friend.image = '/images/report/challenge_win.png';
		} else if (properties.win() == 1) {
			$.wrap_user.height = $.wrap_user.width = 30;
			$.wrap_friend.height = $.wrap_friend.width = 30;
			$.wrap_user.borderRadius = 15;
			$.wrap_friend.borderRadius = 15;
			$.wrap_user.borderColor = '#acacac';
			$.wrap_friend.borderColor = '#acacac';
			$.wrap_user.backgroundColor = '#b7b7b7';
			$.wrap_friend.backgroundColor = '#b7b7b7';
			$.title_user.top = 14;
			$.title_friend.top = 14;
			$.title_user.text = 'Draw';
			$.title_friend.text = 'Draw';
			$.icon_user.image = '/images/report/challenge.png';
			$.icon_friend.image = '/images/report/challenge.png';
		}
	}
	
	$.user_challenge.visible = $.friend_challenge.visible = challenge;
	
	if (properties.type == 'tactics') {
		$.style.text = L('challenge_tactics');
	} else if (properties.type == 'field') {
		$.style.text = L('challenge_field');
	} else if(properties.type == 'style') {
		$.style.text = L('challenge_style');
	} else if(properties.type == 'phisic') {
		$.style.text = L('challenge_phisic');
	} else {
		$.style.text = '';
	}
};

$.challenge.destructor = function() {
	$.destroy();
	$.off();
};