exports.medal = function(view,text,medal) {
	if(_.isString(medal)) {
		view.visible = true;
		view.borderColor = medal == 'gold' ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
		view.backgroundColor = medal == 'gold' ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
		text.text = L(medal == 'gold' ? 'winner' : 'draw');
		text.color = medal == 'gold' ? Alloy.CFG.colors.gold : Alloy.CFG.colors.grey;
	}
	else {
		view.visible = false;
		view.borderColor = Alloy.CFG.colors.white;
		view.backgroundColor = Alloy.CFG.colors.white;
		text.text = '';
		text.color = Alloy.CFG.colors.white;
	}
};