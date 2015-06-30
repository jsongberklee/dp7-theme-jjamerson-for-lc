jQuery(document).ready(function($){
  if ( $('body').hasClass('emergency') ){
    var classes = $('body').attr('class').split(' ');
    for (i = 0; i < classes.length; i++) {
      if (classes[i].indexOf('emergency-id') > -1) {
        var emergencyId = classes[i];
      }
    }
  }
  //rememberCollapsed('remove', emergencyId);
  $('.region-emergency-bar').each(function() {
    var emergencyBar = $(this);
    var emergencyExpand = $('span.expand-button', this);
    $(this).css('marginTop', '0px');
    $('.container', this).click(function() {
      emergencyBar.css('marginTop', '-300px');
      emergencyExpand.css('marginTop', '300px');
      emergencyExpand.css('opacity', 0.9);
      rememberCollapsed('add', '|' + emergencyId);
    });
    emergencyExpand.click(function() {
      $(this).css('opacity', 0);
      emergencyBar.css('marginTop', '0');
      rememberCollapsed('remove', emergencyId);
    });
    if (typeof(Storage) != undefined && localStorage != null && emergencyId != undefined) {
      var isCollapsed = rememberCollapsed('check', emergencyId );
      if (isCollapsed > -1) {
        emergencyBar.css('marginTop', '-300px');
        emergencyExpand.css('marginTop', '300px');
        emergencyExpand.css('opacity', 0.9);
      }
    }
  });
});