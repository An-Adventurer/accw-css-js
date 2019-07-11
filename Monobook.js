/* Any JavaScript here will be loaded for users using the MonoBook skin */

/* The following code is copied from https://www.mediawiki.org/wiki/Manual:Interface/Sidebar */
/////////////////////////////////////////////////////////
// Code snippet to make your sidebar items expandable  //
// Use this code ONLY for the Monobook skin.           //
/////////////////////////////////////////////////////////

$( document ).ready( function() {
	// Set the default expanded items by their headline
	var defaultExpandItems = ['Navigation'];
	// Set the basic-name for the cookies, which save the current state of expanding
	var expandCookieName = 'disdance_project_wiki_nav_expanded_';

	var maxHeights = [];
	var expandeds = [];
	var labels = [];
	initNav();
});

function initNav() {
	$( '#p-logo' ).css({'position': 'relative', 'display': 'block'});
	$( '.generated-sidebar h5,#p-tb h5 ').each( function( i ) {
		var id = $( this ).parent().attr( 'id' );
		maxHeights[id] = $( this ).next( 'div' ).height();
		var str = $( this ).html();
		labels[id] = str;

		if ( $.cookie( expandCookieName + id ) == 'false' ) {
			expandeds[id] = false;
			minimize( $( this ) );
		} else if ( $.cookie( expandCookieName + id ) == 'true' ) {
			expandeds[id] = true;
			maximize( $( this ) );
		} else if ( defaultExpandItems.indexOf( str ) == -1 ) {
			expandeds[id] = false;
			minimize( $( this ) );
		} else {
			expandeds[id] = true;
			maximize( $( this ) );
		}
		$( this ).css({'cursor': 'pointer'});
		$( this ).click( toggleNav );
	} );
}

function minimize( target ) {
	var id = $( target ).parent().attr( 'id' );
	// You can change the expires parameter to save the cookie longer/shorter than 7 days like in this code
	$.cookie( expandCookieName + id, 'false', { expires: 7} );
	var str = labels[id] + '  ►';
	$( target ).next( 'div' ).animate({'height': '0px'});
	$( target ).html( str );
}

function maximize( target ) {
	var id = $( target ).parent().attr( 'id' );
	// You can change the expires parameter to save the cookie longer/shorter than 7 days like in this code
	$.cookie( expandCookieName + id, 'true', { expires: 7} );
	var str = labels[id] + '  ▼';
	var newHeight = maxHeights[id];
	$( target ).next( 'div' ).animate({'height': newHeight + 'px'});
	$( target ).html( str );
}

function toggleNav( e ) {
	var id = $(e.target ).parent().attr( 'id' );
	expandeds[id] = !expandeds[id];
	if( expandeds[id] == true ) {
		maximize( e.target );
	} else {
		minimize( e.target );
	}
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

