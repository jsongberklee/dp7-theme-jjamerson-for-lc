jQuery(document).ready(function($){
  var loginLogout = $('.region-top-nav .user-login-logout');
  var loginNav = $('nav', loginLogout);
  var firstLoginLink = $('a:first-child', loginNav);
  var interval = false;
  $('h3', loginLogout).hover(
    function() {
      firstLoginLink.addClass('highlight');
      firstLoginLink.click();
    },
    function() {
      firstLoginLink.removeClass('highlight');
    }
  );
  $('h3', loginLogout).click(function(e) {
    firstLoginLink[0].click();
  });
  $('a', loginNav).each(function() {
    var description = $(this).attr('title');
    descriptionSpan = $('<span />').addClass('description').text(description);
    descriptionSpan.appendTo( $(this) );
  });
  loginLogout.mouseover(function() {
    loginNav.addClass('visible');
    loginNav.css('opacity', '1');
    clearInterval(interval);
  });
  loginLogout.mouseout(function() {
    loginNav.css('opacity', '0');
    interval = setInterval( 
      function() { 
        loginNav.removeClass('visible');
      },
      400
    );
  });
});