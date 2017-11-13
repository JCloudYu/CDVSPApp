(function() {
	"use strict";
	
	let msgArea, viewportSize,
	viewport = $( 'div[data-comp="loading-overlay"]' );
	
	if ( viewport.length === 0 ) {
		viewport = $( '<div class="loading-overlay"><div data-id="msg" class="msg">Loading...</div></div>' ).appendTo( $( 'body' ) );
	}
		
	
	msgArea = viewport.find( 'div[data-id="msg"]' );
	viewportSize = { width:viewport.width(), height:viewport.height() };
	
	
	
	// Center msg
	viewport.css({ "line-height": viewportSize.height + "px" });
	viewport.on( 'click', 'span[data-id="error-detail"]', function(){ alert(JSON.stringify(env.error)); });
	
	window.overlay = window.overlay || {};
	Object.defineProperties(window.overlay, {
		show:{
			value:(...args)=>{
				if ( args.length > 0 ) msgArea.html( args[0] );
				viewport.show();
			},
			writable:false, configurable:false, enumerable:true
		},
		hide:{
			value:()=>{
				viewport.hide();
			},
			writable:false, configurable:false, enumerable:true
		}
	});
})();
