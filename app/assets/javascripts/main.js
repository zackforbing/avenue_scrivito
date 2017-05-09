$(document).ready( function() {
  if (scrivito.in_editable_view()) {
    $(".navbar").removeClass("navbar-fixed-top")
  }
  hideNavbar();
})

function hideNavbar() {
  var lastScroll = 0;
  $(window).scroll(function(event){
      //Sets the current scroll position
      var st = $(this).scrollTop();
      //Determines up-or-down scrolling
      if (st > lastScroll){
         //Replace this with your function call for downward-scrolling
         $(".navbar").hide();
      }
      else {
         //Replace this with your function call for upward-scrolling
         $(".navbar").show();
      }
      //Updates scroll position
      lastScroll = st;
  });
}
