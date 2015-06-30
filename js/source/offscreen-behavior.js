jQuery(document).ready(function($){
  $('.main-menu-button').click(function() {
    $('body').toggleClass('off-screen-visible');
    $('.region-header').toggleClass('open closed');
    $('.region-top-nav').toggleClass('offscreen-open');
    $('#off-screen').toggleClass('visible hidden');
    $("#page").toggleClass('open closed');
    if ( $('#video-play-pause-button i').hasClass('fa-pause') ) {
      $('#video-play-pause-button').click();  
    }
    $("#off-screen-sidebar").toggleClass('closed open');
    return false;
  });

  $('#off-screen').click(function(event) {
    if ( event.target == this ) {
      $('.main-menu-button').click();
    }
  });

  // Link the "Campus Tools" H3 tag to the campus tools page.
  // A temporary measure, until the Campus Tools menu can be updated or
  // another block is used.
  campusToolsH3 = $('#block-menu-menu-campus-tools h3');
  campusToolsLink = $('<a />').attr('href', '/campus-tools' ).text( campusToolsH3.text() );
  campusToolsH3.html(campusToolsLink);

});