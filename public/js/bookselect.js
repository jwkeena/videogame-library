var Games = (function() {

	var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		}, 
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		$games = $( '#bk-list > li > div.bk-game' ), gamesCount = 13, currentgame = -1,counter = 0; 
	
	function init() {

		$games.each( function( i ) {
			
			var $game = $( this ),
				$other = $games.not( $game ),
				$parent = $game.parent(),
				$page = $game.children( 'div.bk-page' ),
				$content = $page.children( 'div.bk-content' ), current = 0;
			
			if (counter === 13){
				counter = 0;
			}

			if( counter < gamesCount / 2 ) {
				$parent.css( 'z-index', counter ).data( 'stackval', counter );
				counter ++;
			
			}
			else {
				$parent.css( 'z-index', gamesCount - 1 - counter ).data( 'stackval', gamesCount - 1 - counter );
				counter ++;	
			}

			$game.on( 'click', function() {
				
				if( currentgame !== -1 && currentgame !== $parent.index() ) {
					closeCurrent();
				}
				
				if( $game.data( 'opened' ) ) {
					$game.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function() {
						$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
						$parent.css( 'z-index', $parent.data( 'stackval' ) );
						currentgame = -1;
					} );
				}
				else {
					$game.data( 'opened', true ).addClass( 'bk-outside' ).on( transEndEventName, function() {
						$( this ).off( transEndEventName ).addClass( 'bk-viewinside' );  
						$parent.css( 'z-index', gamesCount );
						currentgame = $parent.index();
					} );
					current = 0;
					$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
				}

			} );

			if( $content.length > 1 ) {

				var $navPrev = $( '<span class="bk-page-prev">&lt;</span>' ),
					$navNext = $( '<span class="bk-page-next">&gt;</span>' );
				
				$page.append( $( '<nav></nav>' ).append( $navPrev, $navNext ) );

				$navPrev.on( 'click', function() {
					if( current > 0 ) {
						--current;
						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
					}
					return false;
				} );

				$navNext.on( 'click', function() {
					if( current < $content.length - 1 ) {
						++current;
						$content.removeClass( 'bk-content-current' ).eq( current ).addClass( 'bk-content-current' );
					}
					return false;
				} );

			}
			
		} );

	}

	function closeCurrent() {

		var $game = $games.eq( currentgame ),
			$parent = $game.parent();
		
		$game.data( 'opened', false ).removeClass( 'bk-viewinside' ).on( transEndEventName, function(e) {
			$( this ).off( transEndEventName ).removeClass( 'bk-outside' );
			$parent.css( 'z-index', $parent.data( 'stackval' ) );
		} );

	}

	return { init : init };

})();

init();