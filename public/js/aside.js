var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
menuRight = document.getElementById( 'cbp-spmenu-s2' ),
showLeftPush = document.getElementById( 'showLeftPush' ),
showRightPush = document.getElementById( 'showRightPush' ),
body = document.body;


showLeftPush.onclick = function() {
classie.toggle( this, 'active' );
classie.toggle( body, 'cbp-spmenu-push-toright' );
classie.toggle( menuLeft, 'cbp-spmenu-open' );
disableOther( 'showLeftPush' );
};
showRightPush.onclick = function() {
classie.toggle( this, 'active' );
classie.toggle( body, 'cbp-spmenu-push-toleft' );
classie.toggle( menuRight, 'cbp-spmenu-open' );
disableOther( 'showRightPush' );
};


