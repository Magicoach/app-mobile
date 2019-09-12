/**
 * The contents of this file will be executed before any of your view controllers are ever executed, including the index.js
 * You have access to all functionality on the `Alloy` namespace.
 * This is a great place to do any initialization for your app or create any global variables/functions that you'd like to
 * make available throughout your app. You can easily make things accessible globally by attaching them to the `Alloy.Globals`
 * object. For example: Alloy.Globals.someGlobalFunction = function(){};
 */

/****************
 * Everything here is a global variable. Use Lib instead... call functions only when needed.
 * GOAL: erase everything below
 */
var isset = function(val) {
	return val != null && val != undefined;
};

var WinSig = {
	CORE:require('winsig/core'),
	WARN:require('winsig/warn')
};