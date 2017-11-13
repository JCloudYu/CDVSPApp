(function() {
	"use strict";
	
	if ( !window.env ) {
		Object.defineProperty(window, 'env', {
			value:{},
			writable:false, configurable:false, enumerable:true
		});
	}
	
	
	window.env.layout = {
		calc: function() {

			$( '.stage' ).each(function(){
				var
				target = $( this ),
				parent = target.parent();
	
	
				if ( !target.is('[data-base-width]') ) return;
	
	
	
				var
				parentSize = {
					width:  parent.width(),
					height: parent.height()
				},
				bWidth	= parseInt( target.attr( 'data-base-width' ) ),
				scale	= parentSize.width / bWidth,
				bHeight = Math.ceil( parentSize.height / scale );
	
	
				target
				.attr( 'data-scale', scale )
				.css({
					width: bWidth, height: bHeight,
					'transform-origin': '0 0',
					'transform': 'scale3d( ' + scale + ',' + scale + ',' +  '1 )',
					'-webkit-transform-origin': '0 0',
					'-webkit-transform': 'scale3d( ' + scale + ',' + scale + ',' +  '1 )'
				});
			});
		}
	};
})();
