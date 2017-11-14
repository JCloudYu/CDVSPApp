(function(){
	"use strict";

	let
	_errors = [];
	
	
	
	
	
	// INFO: Update core libraries using built-in pipe
	pipe([
		function(){
			window.env = {
				get error(){return _errors.slice(0);},
				set error(val){_errors.push(val);}
			}
		},
		'./core/js/module/overlay.js',
		undefined,
		
		// INFO: Load boot script
		'./core/js/init.js'
	])
	.then(function(){
		return pump.fire('SYNC_INIT');
	})
	.catch(function( error ){
		overlay.show( "<span data-id='error-detail'>Error</span>" );
		_errors.push( error );
	});
})();
