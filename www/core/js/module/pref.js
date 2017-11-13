//# sourceURL=pref.js
(function() {
	"use strict";
	
	let
	__preferences = {},
	__parser = ___BYPASS,
	__prefReader = function( prefName ) {
		return __parser( prefName, __preferences[ prefName.toLowerCase() ] );
	};
	
	__prefReader.parser = function( parser ){
		if ( !parser || __preferences.toString.call(parser) !== '[object Function]' ) return;
		__parser = parser;
	};
	
	
	
	if ( !window.env ) {
		Object.defineProperty(window, 'env', {
			value:{},
			writable:false, configurable:false, enumerable:true
		});
	}
	
	Object.defineProperties(window.env, {
		preference:{
			value:__prefReader,
			writable:false, configurable:false, enumerable:true
		}
	});
	
	
	
	module.signal = new Promise(function( fulfill ){
		cordova.preferences.all(function( pref ){
			__preferences = pref; fulfill();
		});
	});
	
	function ___BYPASS( name, value ){ return value; }
})();
