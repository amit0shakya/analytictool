$(document).ready(function() {
    //demo 01
    $("#demo01").animatedModal({
        animatedIn:'zoomIn',
        animatedOut:'bounceOut',
        color:'#fff',
        beforeOpen: function() {
            var children = $(".thumb");
            var index = 0;
        },
        afterClose: function() {
          console.log('closed');
        }
    });
}); // end document ready
