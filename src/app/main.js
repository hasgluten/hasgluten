var React = require('react');
var Router = require('react-router');
var Routes = require('./config/Routes');
var injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();

function startApp(){
	Router.run(Routes, Router.HistoryLocation, function (Handler, state) {
		if (typeof ga !== 'undefined') {
			if (ga1st == 0) ga1st = 1;
			else ga('send', 'pageview', state.path);
		}
		var lang = typeof state.params.lang !== 'undefined' ? state.params.lang : 'en';
	  	React.render(<Handler lang={lang}/>, document.getElementById('universe'));
	});
}
startApp();

// window.onload = function(){
// 	var url = document.URL;
// 	var isSmart = (url.indexOf("http://") === -1 && url.indexOf("https://") === -1);
// 	if( isSmart ){
// 		document.addEventListener('deviceready', startApp, false);
// 	}
// 	else{
// 		startApp();
// 	}
// }
