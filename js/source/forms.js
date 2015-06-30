jQuery(document).ready( function($) {
  $('.form-item').each(function() {
    var label = $('> label', this);
    if (label.length) {
      var span = $('span', label).clone();
      $('span', label).remove();
      var newLabel = label.html().trim();
      label.html(newLabel);
      if (span.length) {
        span.appendTo(label);
      }
    }
  });

  $('select').each(function() {
    if ( $(this).attr('size') ) {
      $(this).height('auto');
    }
  });
});