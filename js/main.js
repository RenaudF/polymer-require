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

require(['libs/d3/d3', 'libs/q/q'], function(d3, Q){
	var polymerReady = Q.defer();

	var request = d3.html('libs/polymer/polymer.html', function(d){

		var links = d.querySelectorAll('link');
		var linksDeferred = [];
		Array.prototype.forEach.call(links, function(link, i) {
			var linkDeferred = Q.defer();
			var urlTokens = link.href.split('/');
			link.href = 'libs/polymer/'+urlTokens[urlTokens.length-1];
			link.onload = function(e) { linkDeferred.resolve(); }
			linksDeferred.push(linkDeferred.promise);
		});

		var scripts = d.querySelectorAll('script');
		var scriptsDeferred = [];
		Array.prototype.forEach.call(scripts, function(script, i) {
			var scriptDeferred = Q.defer();
			var urlTokens = script.src.split('/');
			script.src = 'libs/polymer/'+urlTokens[urlTokens.length-1];
			script.onload = function(e) { scriptDeferred.resolve(); }
			scriptsDeferred.push(scriptDeferred.promise);
		});

		Q.all(linksDeferred.concat(scriptsDeferred)).done(function(){
			console.log('Polymer is fully loaded');
			polymerReady.resolve();
		});
		document.head.appendChild(d);
	});

	Q.when(polymerReady.promise).done(function(){
		Polymer.import(['elements/my-app.html'], function(){
			debugger;
		});
	});
});