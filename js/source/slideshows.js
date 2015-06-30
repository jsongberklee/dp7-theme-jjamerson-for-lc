jQuery(document).ready(function($){
  $('.not-front .banner.slider').each(function(){
    var slideTimer = false;
    var currentSlide = 1;
    var slideButtons = $('.sbutton', this);
    var pauseButtonActive = false;
    var pauseButton = $('<div />').addClass('sbutton pause').attr('target-slide', -1).html("&#xf04c;");    
    if (slideButtons.length < 1 ) {
      slides = $('.slide', this);
      sliderNav = $('<div />').addClass('slider-nav widget_pager').appendTo( $(this) );
      //var sliderNavContainer = $('<div />').addClass('container').appendTo(sliderNav);
      var slideNumber = 0;
      slides.each(function(){
        slideNumber++;
        $(this).attr('number', slideNumber);
        var slideButton = $('<div />').addClass('sbutton').attr('target-slide', slideNumber).text(slideNumber).appendTo(sliderNav);
        if (slideNumber == 1) {
          $(this).addClass('active');
          slideButton.addClass('active');
        }
      });
    } else {
      sliderNav = $('.slider-nav .container', this);
    }
    pauseButton.appendTo(sliderNav);
    slideButtons = $('.sbutton', this);
    slideButtons.on('click', function() {
      if ( !$(this).hasClass('pause') ) {
        clearInterval(slideTimer);
        var targetSlide = parseInt( $(this).attr('target-slide') );
        $('.slide[number="' + currentSlide + '"]').removeClass('active');
        $('.slide[number="' + targetSlide + '"]').addClass('active');
        $('.sbutton[target-slide = "' + currentSlide + '"]').removeClass('active');
        $(this).addClass('active');
        currentSlide = parseInt(targetSlide);
        if (!pauseButtonActive) {
          clearInterval(slideTimer);
          slideTimer = setInterval(slide, 7000);
        }
      } else {
        if ( !$(this).hasClass('active') ) {
          clearInterval(slideTimer);
          $(this).addClass('active');
          pauseButtonActive = true;
        } else {
          clearInterval(slideTimer);
          slideTimer = setInterval(slide, 3000);
          $(this).removeClass('active');
          pauseButtonActive = false;
        }
      }
    });
    if ( $(this).hasClass('front') ) {
      pauseButton.click();
    }
    $('h2, p, a', this).mouseenter(function() {
      if (!pauseButtonActive) {
        pauseButton.addClass('active');
        clearInterval(slideTimer);  
      }
    }).mouseleave(function() {
      if (!pauseButtonActive) {
        pauseButton.removeClass('active');
        clearInterval(slideTimer);
        slideTimer = setInterval(slide, 3000);    
      }
    });
    var slideTimer = setInterval(slide, 7000);  
    function slide(){ 
      targetSlide = currentSlide + 1;
      if ($('.sbutton[target-slide="' + targetSlide + '"]').length == 0) {
        targetSlide = 1;
      } 
      $('.sbutton[target-slide="' + targetSlide + '"]').click();
    }
    
  });

  $('.sm').each(function() {
    var currentTabTarget = $('.smtab.active').attr('target-area');
    $('.smtab').click(function() {
      var newTabTarget = $(this).attr('target-area');
      $('.smarea.' + currentTabTarget).removeClass('active');
      $('.smtab[target-area="'+currentTabTarget+'"]').removeClass('active');

      $('.smarea.' + newTabTarget).addClass('active');
      $(this).addClass('active');
      currentTabTarget = newTabTarget;
    })
  });

  $('.berklee-slider').each(function() {
    var width = $(this).attr('width');
    var height = $(this).attr('height');
    var slides = $('.berklee-slide', this);
    var rightMargin = slides.css('marginRight');
    var sliderCount = slides.length;
    var currentSlider = 1;
    var slideDirection = 'horizontal';
    var rightButton = $('.berklee-slider-button.right-button', this);
    var leftButton  = $('.berklee-slider-button.left-button', this);
    var canvas = $('.berklee-slider-canvas', this);

    if ( $(this).hasClass('vertical') ) {
      slideDirection = 'vertical';
    }

    if ( $(this).hasClass('fade-transition') ) {
      slideDirection = 'fade';
    }

    if ( $(this).hasClass('random') ) {
      currentSlider = Math.random(4) + 1;
      if (currentSlider > 1) {
        $('.berklee-slider-button.left-button', this).removeClass('disabled');
      }
      if (currentSlider === sliderCount) {
        $('.berklee-slider-button.right-button', this).addClass('disabled');
      }
      canvas.animate({'marginLeft' : currentSlider * width});
    }
    var autoSlide = $(this).attr('autoslide');
    if (autoSlide) {
      if (autoSlide < 1000) {
        autoSlide = autoSlide * 1000;
      }
      var slideTimer = setInterval(function(){ 
        if (currentSlider < sliderCount) {
          rightButton.click();
        } else {
          currentSlider = 1;
          leftButton.addClass('disabled');
          rightButton.removeClass('disabled');
          canvas.animate({'marginLeft' : 0});
        }
      }, autoSlide);
    }

    $('.berklee-slider-button', this).click(function(){
      newWidth = parseInt( width.replace('px', '') ) + parseInt( rightMargin.replace('px', '') );
      if ( $(this).hasClass('disabled') ) {
        return;
      }
      if ( $(this).hasClass('right-button') ) {
        var operator = '-';
        currentSlider++;
        if (currentSlider === sliderCount) {
          $(this).addClass('disabled');
        }
        $(this).siblings('.berklee-slider-button.left-button').removeClass('disabled');
      } else {
        var operator = '+';
        currentSlider--;
        if (currentSlider === 1) {
          $(this).addClass('disabled');
        }
        $(this).siblings('.berklee-slider-button.right-button').removeClass('disabled');
      }
      if (slideDirection === 'horizontal' || slideDirection === 'vertical') {
        canvas.animate({
          'marginLeft' : operator + '=' + newWidth
        });
      }
      if (slideDirection === 'fade') {
        canvas.animate({ 'opacity' : 0 } );
        canvas.animate({ 'marginLeft' : operator + '=' + newWidth} );
        canvas.animate({ 'opacity' : 1 } );
      }
    });
  });
});