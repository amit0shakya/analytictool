var hide_show_navigation_menu = function() {
		var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
		body = document.body;
		classie.toggle( body, 'cbp-spmenu-push-toright' );
		classie.toggle( menuLeft, 'cbp-spmenu-open' );
};

$(document).click(function() {
         $('.cbp-spmenu-push-toright #cssmenu .nav .selected').removeClass('selected'); //make all inactive
		 $('.cbp-spmenu-push-toright #cssmenu .nav ul').hide();
		 $('.mob-aside-nav #cssmenu .nav ul').hide();
		
 });
 
 
$(document).ready(function(){	
$(".mob-aside-nav #cssmenu   a").click(function() {
	alert("hi");
 		 $('.mob-aside-nav #cssmenu .nav li ul').hide();
		 
});


 
});	
	

// var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
// menuRight = document.getElementById( 'cbp-spmenu-s2' ),
// showLeftPush = document.getElementById( 'showLeftPush' ),
// showRightPush = document.getElementById( 'showRightPush' ),
// body = document.body;


// showLeftPush.onclick = function() {
// 	alert("hi");
// classie.toggle( this, 'active' );
// classie.toggle( body, 'cbp-spmenu-push-toright' );
// classie.toggle( menuLeft, 'cbp-spmenu-open' );
// disableOther( 'showLeftPush' );
// };
// showRightPush.onclick = function() {
// classie.toggle( this, 'active' );
// classie.toggle( body, 'cbp-spmenu-push-toleft' );
// classie.toggle( menuRight, 'cbp-spmenu-open' );
// disableOther( 'showRightPush' );
// };

