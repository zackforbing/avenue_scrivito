$(document).ready( function() {
  if (scrivito.in_editable_view()) {
    $(".navbar").removeClass("navbar-fixed-top")

    scrivito.editors.medium_editor.options = function() {
      return {
        toolbar: {
          buttons: ['bold', 'italic', 'underline', 'scrivito_anchor', 'orderedlist', 'unorderedlist', 'justifyCenter', 'justifyFull', 'justifyLeft', 'justifyRight', 'h1', 'h2', 'quote'],
          autoLink: true
        }
      };
    };

    scrivito.on("load", function(){
      scrivito.select_editor(function(element, editor){
        if($(element).is("[data-scrivito-field-name$=color]")) {
          editor.use("minicolors");
        }
      })
    })
  } else {
    hideNavbar();
    $(".section-image").addClass("zoom");
  }
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
