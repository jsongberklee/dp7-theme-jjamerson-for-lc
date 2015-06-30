function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      var value = pair[1];
      if (value === undefined) { 
        value = true;
      }
      if(pair[0] == variable){
        return value;
      }
    }
  return(false);
}

jQuery(document).ready(function($){
  // Remove inline styles from content region. Do this first thing so that we don't remove style
  // declarations made via JS:
  $("body .node:not(.preserve-styles) .content *[style]").not('img').not('.jquery-altered').not('.webform-component').removeAttr("style");

  //$('messages.error').focus();
  var history = window.history.state;
  var history_altered = false;

  // When AJAX completes, some event bindings need to be re-done:
  $(document).ajaxComplete(function(event, xhr, settings) {
    // Re-bind the pager click function:
    pagerMod();
  });

  var remember_theme = getQueryVariable('remember');
  var timestamp = getQueryVariable('timestamp');
  if (remember_theme && !timestamp) {
    var timestamp = Date.now();
    window.location.href = window.location.href + '&timestamp=' + timestamp;
  } else {
    $('body').css('opacity', 1);
  }


  
  // Add a history state for pager clicks:
  function pagerMod() {
    $('ul.pager li a').click(function() {
      var targetUrl = $(this).attr('href');
      var newHash = $(this).attr('href').split('?')[1];
      window.history.pushState(history, 'Events', targetUrl);
      history_altered = true;
    });
  };
  pagerMod();

  $('#skip-link a').click(function() {
    var target = $(this).attr('href');
    $(target).attr('tabindex', -1).focus();
  });

  // Reload the window when the user presses the back/forward browser button & there's a history stack established:
  window.onpopstate = function(event) {
    if (history_altered) {
      window.location.href = window.location.href; // slightly faster than location.reload()
    }
  };

  // The .match-auto-height class is used to match the height of all elements that share the same parent. 
  // First, cycle through each element with the class and add the highest value to the parent element:
  $('.match-auto-height').each(function() {
    var parent = $(this).parent();
    var parentAutoHeight = parseInt( parent.attr('auto-height') );
    var paddingTop = parseInt( $(this).css('paddingTop').replace('px', '') );
    var paddingBottom = parseInt( $(this).css('paddingBottom').replace('px', '') );
    var height = $(this).height() + paddingTop + paddingBottom;
    if ( height > parentAutoHeight || isNaN(parentAutoHeight) ) {
      parent.attr('auto-height', height + paddingTop + paddingBottom);
      parent.addClass('auto-height-matched');
    }
  });

    // Any element with the 'flex' class will have either its height or width auto-adjusted based on
    // the aspect multiplier value:
    function updateFlexr() {
    $('.flexr').each(function() {
      
      var multiplier = false;
      if ( ($(this).attr('data-aspect-multiplier') > 0) ) {
        multiplier = $(this).attr('data-aspect-multiplier');
      } else if ( $(this).hasClass('flexr-2-1') ) {
        multiplier = 0.5;
      } else if ( $(this).hasClass('flexr-16-9') ) {
        multiplier = 0.5625;
      } else if ( $(this).hasClass('flexr-3-2') ) {
        multiplier = 0.66;
      } else if ( $(this).hasClass('flexr-3-4') ) {
        multiplier = 0.75;
      } else {
        multiplier = 1;
      } 

      var dimension = false;
      if  ( $(this).attr('data-dimension') > '') {
        dimension = $(this).attr('data-dimension');
      } else if ( $(this).hasClass('flexr-height') ) {
        dimension = 'height';
      } else {
        dimension = 'width';
      }

      if ( dimension === 'width' && multiplier ) {
        $(this).height( $(this).width() * multiplier );
      } else {
        $(this).width( $(this).height() * multiplier );
      }
      if ( !$(this).hasClass('flexrd') ) {
        $(this).addClass('flexrd');
      }
    });  
  }
  updateFlexr();
  $(window).resize(function() {
    updateFlexr();
  });


  $('.image-background .card, .image-covered, .cover-image').each(function() {
    if ( $(this).hasClass('covered-image') ) {
      var container = $(this).parent('div');
      var image = $(this);
    } else {
      var container = $(this);
      var image = $('img', this);
    }
    var containerRatio = container.width() / container.height();
    
    var imageWidth, imageHeight;
    // create a new image element that effectively clones the original, so that we can
    // accurately get the image's real width and height. 
    // Ref: http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome
    var imageClone = $('<img />')
      .attr('src', image.attr('src') )
      .load( function() {
        imageWidth = this.width;
        imageHeight = this.height;
        var imageRatio = imageWidth / imageHeight;
        if ( ( container.width() / imageRatio ) < container.height() ) {
          var newImageWidth = container.height() * imageRatio;
          image.width(newImageWidth);
        } else {
          image.width( container.width() );
        }
        image.height('auto');
        image.css('opacity', 1);
      });
  });


  // Then make the height adjustments on the elements, one parent element at a time:
  $('.auto-height-matched').each(function() {
    $('.match-auto-height', this).css('minHeight', $(this).attr('auto-height') + 'px' );
  });

  // Open external URLs in the content area in a new tab:
  $('.region a').each(function() {
    if ( $(this).attr('href') > '' && $(this).attr('href').indexOf('berklee.edu') == -1 && $(this).attr('href').indexOf('http') > -1 ) {
      $(this).attr('target', '_blank');
    }
  });

  // Add the current URL to the destination of any login links in the content region of a page:
  $('.region-content a').each(function() {
    if ( $(this).attr('href') > '' && $(this).attr('href').indexOf('/user/login') > -1 && $(this).attr('href').indexOf('http') == -1 && $(this).attr('href').indexOf('?') == -1 ) {
      var newHref = $(this).attr('href') + '?destination=' + document.URL;
      $(this).attr('href', newHref);
    }
  });

  // Check for iEverywhere user agent & add class accordingly
  var userAgent = navigator.userAgent;
  if (userAgent) {
    var userAgentSplit = userAgent.split('/');
    var lastUAItem = userAgentSplit[userAgentSplit.length - 1];
    if ( lastUAItem.toLowerCase().indexOf('ieverywhere') > -1 ) {
      $('body').addClass('content-only-display');
    }
  }

  // QTip
  $('a[rel=tooltip-ajax]').each(function() {
    $(this).qtip({
      content: {
        text: function(event, api) {
          var full_link = $(this).attr('href'),
              source = full_link,
              max_text_length = 150;
          if (source.indexOf('?') > -1) {
            source += '&';
          } else {
            source += '?';
          }
          source += 'content-only';
          $.get(source, function(ajaxContent) {
            // We have to walk through each element in order to return the untrimmed pieces
            var trimmed_content = $(ajaxContent).each(function() {
              // Now find down the pieces we DO want to trim
              $(this).find('.field-item').each(function() {
                var item_content = $(this).text();
                if(item_content.length > max_text_length) {
                  $(this).text(item_content.substring(0,max_text_length)+'...');
                }
              });
              // Add a read more link to the inner-most "content"
              $(this).find('.content').last().append(
                '<div class="button"><a href="'+full_link+'">See Full Listing</div></a>'
              );
            });

            api.set('content.text',trimmed_content);
          });
          return 'Loading...';
        }
      },
      position: {
        viewport: $(window)
      },
      style: 'qtip-wiki',
      hide: {
        fixed: true,
        delay: 500
      }
    });
  });
  $('a[rel=tooltip-link]').each(function() {
    $(this).qtip({
      content: {
        text: function(event, api) {
          var link = $(this).attr('href');
          if ( !$(this).attr('title') ) {
            if ( link.indexOf('/courses') > -1 ) {
              var linkText = 'View all courses that fulfill this requirement.';
            } else {
              var linkText = 'Read more.';
            }
          } else {
            var linkText = $(this).attr('title');  
          }
          return '<a href="'+link+'">'+linkText+'</a>';
        }
      },
      position: {
        viewport: $(window)
      },
      style: 'qtip-wiki',
      hide: {
        fixed: true,
        delay: 500
      }
    });
  });
  $('a[rel=tooltip]').each(function() {
    $(this).qtip({
      content: {
        text: $(this).attr('title')
      },
      position: {
        viewport: $(window)
      },
      style: 'qtip-light',
      show: {
        delay: 1000,
      },
      /*hide: {
        fixed: true,
        delay: 500
      }, */
    });
  });

  $('a[rel=subtitle]').each(function() {
    var subtitle = $('<span />')
      .addClass('subtitle')
      .text( $(this).attr('title') )
      .appendTo( $(this) );
  });

  $('.front .view-hero-images .views_slideshow_slide').each(function(position,slider) {
    var img = $('img',slider).first(), // first, just so we get one
      link = $('a',slider).last(); // last, just so we get one and skip the slider teaser text
    if(img && link) {
      $(link).click(function() {
        real_position = position+1; // Because people don't get computers starting at zero
        // separate vars for logging & testing
        position_label = 'Slider '+real_position;
        slider_href = $(this).attr('href');
        position_url_label = real_position+':'+slider_href;
        img_name = $(img).attr('src').split('/'); // Split the slider image source URL by slashes
        img_name = (img_name[img_name.length-1])+':'+slider_href; // Get the last thing in the URL which should be the image name
        // As of Apr 1, 2014, these events can be found in Analytics under Behavior > Events
        if(typeof(_gaq) != "undefined") { // Analytics isn't defined for some roles
          _gaq.push(['_trackEvent', 'Homepage Slider Positions', 'Click', position_label]);
          _gaq.push(['_trackEvent', 'Homepage Slider Content', 'Click', position_url_label]);
          _gaq.push(['_trackEvent', 'Homepage Slider Imagery', 'Click', img_name]);
        }
      });
    }
  });

  // Append a div for credits
  $('iframe.soundcloud-creditable').each(function(index,element) {
    // create a new div to hold credits for this player
    var credits = document.createElement('div');
    // add the credits after the player
    $(element).after(credits);
    // SC provided by third-party/soundcloud-api.js
    var widget = SC.Widget(element);
    // bind widget, wait until ready
    widget.bind(SC.Widget.Events.READY, function() {
      // Now bind the play event
      widget.bind(SC.Widget.Events.PLAY, function() {
        // when we can get the current sound, update our credits
        widget.getCurrentSound(function(current_sound) {
          // sligtly modified regex from 
          // http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
          var url_regex = /(https?:\/\/(([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/gi;
          var description = current_sound.description.replace(
            url_regex,
            function(match,p1,offet,string){
              return '<a href="'+p1+'" target="_blank">'+p1+'</a>';
            }
          );
          credits.innerHTML = '<p><strong>Current Song:</strong> '+current_sound.title+'</p>'+
            '<p><strong>Current Artist:</strong> '+current_sound.user.username+'</p>'+
            '<p><strong>Description/Credits</strong><br />'+description.replace(/(?:\r\n|\r|\n)/g, '<br />')+'</p>';
        });
      });
    });
  });

  // temporary measure to alter HTML code for highlights stripe view output:
  $('.highlights-stripe .views-row').each(function() {
    var container = $('<div />').addClass('highlight-box-teaser-container');
    container.insertAfter( $('img', this) );
    $('h2, p, a', this).appendTo(container);
  });

});