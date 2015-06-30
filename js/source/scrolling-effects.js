jQuery(document).ready(function($){
  function updateScrollAnimations() {
    // get position of scrollbar relative to document top
    var scrollPosition = parseInt( $(document).scrollTop() );
    // get window height, as an integer
    var windowHeight = parseInt( $(window).height() );

    // add/remove a class from the top nav depending on whether the scrollbar is
    // or isn't near the top of the page
    if (scrollPosition < (windowHeight / 3) ) {
      if ( !$('.region-top-nav').hasClass('at-the-top') ) {
        $('.region-top-nav').addClass('at-the-top');
      }
    } else {
      if ( $('.region-top-nav').hasClass('at-the-top') ) {
        $('.region-top-nav').removeClass('at-the-top');
      }
    }
    
    if ($('body').hasClass('admin-menu') ) {
      if (scrollPosition > 29) {
        $('.region-top-nav').css('marginTop', 0);
        $('.region-top-nav').removeClass('at-the-top');
      } else if (scrollPosition < 29) { 
        if ( !$('.region-top-nav').hasClass('at-the-top') ) {
          $('.region-top-nav').addClass('at-the-top');
        }
        $('.region-top-nav').css('marginTop', 29 - scrollPosition);
      }
    }

    
    // cycle through each slide on the page
    $('.region-stripes .block').each(function(){
      // get the slide position relative to the document top, as an integer
      var slidePos = parseInt( $(this).offset().top );
      var slideHeight = parseInt( $(this).height() );
      // calculate when to begin altering the element
      var startPos = slidePos - windowHeight;
      var endPos = slidePos + slideHeight;
      // figure out the highest value (greatest difference) between the scroll position and the visible slide
      var ceiling = endPos + windowHeight - slidePos;
      var ceilingRatio = 1 / ceiling;
      // only act if the slide is on the screen
      if ( (scrollPosition > startPos) && (scrollPosition < endPos) ) {
        // calculate the percentage of alteration
        var pixelDifference = endPos - scrollPosition;
        var percentToTop = (1 - (pixelDifference * ceilingRatio) ) * 100;  
        if ($(this).hasClass('parallax') ) {
          
          var alterationAmount = -50 * alterationPercent;
          //$('.inner', this).css('transform', 'translate3d(0,' + alterationAmount + 'px, 0');  
        }
        if ( $(this).hasClass('highlights-stripe') && !$(this).hasClass('scroll-effect-executed') ) {
          alterationPercent = (25 - percentToTop );
          alterationPercent = Math.max(alterationPercent, 0) * 4;
          if (alterationPercent < 75) {
            $('.views-row-1', this).css('marginTop', '0px');
            var parent = this;
            setTimeout(function(){ $('.views-row-2', parent).css('marginTop', '0px'); }, 100);
            setTimeout(function(){ $('.views-row-3', parent).css('marginTop', '0px'); }, 200);
            $(this).addClass('scroll-effect-executed');
          }
          /*if (alterationPercent > 75) {
            $('.views-row-3', this).css('marginTop', '-300px');
            setTimeout(function(){ $('.views-row-2', parent).css('marginTop', '-300px'); }, 100);
            setTimeout(function(){ $('.views-row-1', parent).css('marginTop', '-300px'); }, 200);
          }
          */
        } 
        if ( $(this).hasClass('fade-in-stripe') ) {
          // For the trigger distance, a smaller multiplier will delay the effect. A larger multiplier will hasten it.
          var triggerDistance = $(window).height() * 1.4;
          if (pixelDifference < triggerDistance ) {
            $(this).css('opacity', 1);
            setTimeout(function(){ $(this).removeClass('fade-in-stripe'); }, 2500);
          }
        } 
      }
    });
  }
  if ($(window).width() > 767) {
    setTimeout(updateScrollAnimations, 100);

    $(window).scroll(function() {
      updateScrollAnimations();
    });
  }

  setTimeout( 
    function() { 
      //window.scrollTo(0, 0); 
      if (window.location.hash) {
        // look for an element with a matching ID first. Otherwise, look for an element with a matching "name" attribute.
        if ( $(window.location.hash).length) {
          var target = $(window.location.hash);
        } else {
          var name = window.location.hash.replace('#','');
          var target = $("a[name='" + name + "']");
        }
        if (target.length) {
          var targetPosition = parseInt( target.offset().top - 30 );
          $('html, body').animate({ scrollTop:targetPosition + 'px' }, 400);
        }
      }
    }, 100
  );
  
  $("a[href*=#]").click(function() {
    var href = $(this).attr('href');
    if ( $(href).length ) {
      var target = $(href);
    } else {
      var name = href.replace('#','');
      var target = $("a[name='" + name + "']");
    }
    if ( $(target).length ) {
      var targetPosition = parseInt( $(target).offset().top - 40 );
      $('html, body').animate({ scrollTop:targetPosition + 'px' }, 400);
      window.location.hash = hash;
    }
    return false;
  });
});