(function(){
	"use strict";

	let _trigger,
	_kernel = pump.instantiate( 'app-controller' ),
	_init = new Promise(function(fulfill){ _trigger = fulfill; }),
	_initiated = false;
	
	
	
	_kernel.on('SYNC_INIT', ()=>{
		if ( _initiated ) { return; }
		_initiated = true;
	
		return pipe([
			// INFO: Prepare cordova environment
			'./cordova.js',
			()=>{
				// INFO: Cordova will trigger deviceready event shortly after the inclusion of cordova.js
				let doc = $(document);
				doc.one( window.cordova ? 'deviceready' : 'dom-ready', _trigger )
				.ready(function(){  doc.trigger( 'dom-ready' ); });
				
				
				// INFO: Make sure that the cordova environment is initialized completely
				return _init;
			},
			
			
			
			{ path:'./core/js/module/pref.js',	type:'js', modulize:true, cache:true },
			()=>{
				let _body = $('body');
				
				if ( window.device ) {
					_body
					.attr('data-platform', device.platform.toLocaleLowerCase())
					.attr('data-hardware-model', device.model);
				}
				
				
				let appId = env.preference( 'App-Identifier' );
				if ( appId ) {
					_body
					.attr('data-app-id', appId)
					.attr('data-version', env.preference( 'AppVersion' ));
				}
			},
		
		
			
			{ path:'./core/js/module/scale-fix.js', type:'js' },
			()=>{
				window.env.layout.calc();
				return pipe([
					{ path:env.preference( 'Boot-Script' ), type:'js', modulize:false, cache:false },
					()=>{ return app(); }
				]);
			}
		]);
	});
})();
