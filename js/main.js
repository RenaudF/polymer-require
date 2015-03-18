require.config({
	baseUrl: 'js',
	paths: {
		"libs": "../libs"
	},
	shim: {
		'libs/q/q': {
			deps: [],
			exports: 'Q'
		}
	}
});

require(['libs/q/q'], function(Q){
	var polymerLoaded = Q.defer();
	var appLoaded = Q.defer();
	window.addEventListener('polymer-ready', function(){ console.log('polymer-ready'); });

	Q.when(polymerLoaded.promise)
	.then(function(){
		// polymer-ready
		console.log('polymer loaded');
		Polymer.import(['elements/my-app.html'], appLoaded.resolve);
		return appLoaded.promise;
	}).then(function(){
		// bootstrapping logic goes here
		console.log('app loaded');
	}).done(function(){
		console.log('init done');
	});

	console.log('initialising');
	var link = document.createElement('link');
	link.rel = 'import';
	link.href = 'libs/polymer/polymer.html';
	link.onload = polymerLoaded.resolve;
	var head = document.querySelector('head');
	head.appendChild(link);
});