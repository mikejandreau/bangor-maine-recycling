(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // // fancybox - not using it this time around
  // $(document).ready(function () {
  //   $('[data-fancybox="images"]').fancybox({
  //     infobar: false,
  //     buttons: [
  //     // "zoom",
  //     //"share",
  //     // "slideShow",
  //     //"fullScreen",
  //     "download",
  //     // "thumbs",
  //     "close"
  //     ]
  //   });
  // });


  // $(document).ready(function () {
  //   $(window).scroll(function() {
  //     if ($(this).scrollTop() >= 500) { // If page is scrolled more than 500px
  //       $("#scrollup").addClass("scrollup-visible"); // Fade in the arrow
  //     } else {
  //       $("#scrollup").removeClass("scrollup-visible"); // Else fade out the arrow
  //     }
  //   });
  // });


  // clickable map
  // var allNeighborhoods = $("svg.bangor > *"); // target all child elements
  var allNeighborhoods = $("svg.bangor > .map-region-group"); // target all child elements
  var mapRegion = $(".map-region"); // map polygons in SVG
  var mapLegendItem = $(".map-legend-item"); // map legend
  var mapShowAll = $("#showall"); // map legend
  var allDaysDesc = $("#allDaysDesc"); // map legend
  var mapDescription = $(".map-region-description"); // text divs

  // change color of map items
  allNeighborhoods.click(function(event) {
    allNeighborhoods.removeClass("map-region-selected");
    $(this).addClass("map-region-selected");
    event.stopPropagation();
  });

  // show/hide text associated with map items
  allNeighborhoods.click(function(){
    mapDescription.removeClass("map-region-selected");
    allDaysDesc.removeClass("map-region-selected");
    $("#description"+$(this).attr("target")).addClass("map-region-selected");
    mapLegendItem.removeClass("map-region-selected");
    $("#legend"+$(this).attr("target")).addClass("map-region-selected");
    mapShowAll.removeClass("map-region-selected");
  });

  // change color of map legend
  mapLegendItem.click(function(event) {
    mapLegendItem.removeClass("map-region-selected");
    $(this).addClass("map-region-selected");
    event.stopPropagation();
  });

  // show/hide text associated with map legend
  mapLegendItem.click(function(){
    mapDescription.removeClass("map-region-selected");
    allDaysDesc.removeClass("map-region-selected");
    $("#description"+$(this).attr("target")).addClass("map-region-selected");
    allNeighborhoods.removeClass("map-region-selected");
    $("#mapRegion"+$(this).attr("target")).addClass("map-region-selected");
    mapShowAll.removeClass("map-region-selected");
  });

  // highlight all of map
  $(function(){
    mapShowAll.click(function(){
      allNeighborhoods.addClass("map-region-selected");
      mapLegendItem.removeClass("map-region-selected");
      mapDescription.removeClass("map-region-selected");
      allDaysDesc.addClass("map-region-selected");
      $(this).addClass("map-region-selected");
    });
  });













  // var allDaysDesc = $("#springCleanupAlert"); // alert div
  // var springCleanupStart = new Date("March 13, 2019 00:00:00");
  // var springCleanupEnd = new Date("April 30, 2019 00:00:00");

  // if( new Date() < springCleanupStart && new Date() > springCleanupEnd ) {

  //   $(allDaysDesc).show();
  // }


// if (new Date() <= new Date(2019, 04, 29))

// {
//   document.getElementById("springCleanupAlert").innerHTML = "greeting";

// }


// function showOnDate(from, to, element){
    
// var springCleanupStart = new Date("March 13, 2019 00:00:00");
//   var springCleanupEnd = new Date("April 30, 2019 00:00:00");
    
//     if( springCleanupEnd < from || springCleanupEnd > to ){
//         $(element).hide();
//     }else{
//         $(element).show();
//     }
    
// }

// $(document).ready(function(){
//     showOnDate(10,17,"#springCleanupAlert"); //Show #TestDiv from 10:00 to 13:59; 
// });




})(jQuery); // End of use strict
