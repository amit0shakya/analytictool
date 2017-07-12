$(document).ready(function(){

  $('#cssmenu > ul > li:has(ul)').addClass("has-sub");
 $('.cbp-spmenu-open #cssmenu > ul > li > a').click(function() {

 });
 
  $('#cssmenu > ul > li > a').click(function() {
    var checkElement = $(this).next();
    
    $('#cssmenu li').removeClass('selected');
    $(this).closest('li').addClass('selected');	
    
    
    if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
      $(this).closest('li').removeClass('selected');
      checkElement.slideUp('normal');
    }
    
    if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
      $('#cssmenu ul ul:visible').slideUp('normal');
      checkElement.slideDown('normal');
    }
    
    if (checkElement.is('ul')) {
      return false;
    } else {
      return true;	
    }		
  });

});



$(document).ready(function(){
 var heroHeight = $('#sidebar').height();
  var windowHeight = $(window).height();
  $('#scrollbox4').css({'height' : ( heroHeight ) });
 

$('#scrollbox4').enscroll({
    verticalTrackClass: 'track4',
    verticalHandleClass: 'handle4',
    minScrollbarLength: 28
});
});
