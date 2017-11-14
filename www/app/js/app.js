(function(){
	"use strict";
	
	window.app = ()=>{
		return pipe([
			'https://res.purimize.com/lib/js/jquery/jquery.tmpl.min.js',
			{ path:'app/css/app.css', type:'css' },
			()=>{
				overlay.show( 'Welcome CDVSPApp!' );
			}
		])
		.then(()=>{
			if ( window.cordova ) {
				StatusBar.styleBlackTranslucent();
			}
			
//			overlay.hide();
		});
	};
})();
