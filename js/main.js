require.config({
	baseUrl: '../js',
	paths: {
		"libs": "../libs"
	},
	shim: {
		'libs/d3/d3': {
			deps: [],
			exports: 'd3'
		},
		'libs/q/q': {
			deps: [],
			exports: 'Q'
		}
	}
});

require([], function(){
	var link = document.createElement('link');
	link.rel = 'import';
	link.href = 'libs/polymer/polymer.html';
	link.onload = function(e){ Polymer.import(['elements/my-app.html'], function(){}); }
	var head = document.querySelector('head');
	head.appendChild(link);
});