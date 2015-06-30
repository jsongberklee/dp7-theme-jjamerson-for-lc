jQuery(document).ready(function($){
  var berkleeOverlay = $('<div />').addClass('berklee-overlay');
  $('body').append(berkleeOverlay);
  var berkleeOverlayBg = $('<div />').addClass('berklee-overlay-background');
  berkleeOverlay.append(berkleeOverlayBg);
  var berkleeOverlayClose = $('<a />')
    .addClass('icon-remove')
    .addClass('berklee-overlay-close')
    .attr('href','#')
    .click(function(){
      $('.berklee-overlay').hide();
      $('.berklee-overlay .berklee-overlay-container').remove();
      return false;
    });

  $('.berklee-overlay-thumbnail a, .berklee-filters-thumbnail-field-title a').click(function(){
    if ($(window).width() < 490) {
      return true;
    } else {
      var id = $(this).attr('rel');
      $(this).parents('.berklee-overlay-group').children('.berklee-overlay-container').each(function(){
        var image = $(this).find('img');
        image.attr('src', image.attr('url'));
        $(this).clone(true).appendTo(berkleeOverlay);
      });
      $('.berklee-overlay').find('#'+id).parent().show();
      berkleeOverlay.show();
      return false;
    }
  });

  $('.berklee-overlay-group').each(function(){
    var berkleeOverlayItems = $(this).find('.berklee-overlay-item');
    berkleeOverlayClose.clone(true).appendTo(berkleeOverlayItems);

    $('<a />')
      .addClass('icon-chevron-right')
      .attr('href','#')
      .click(function(){
        var item = $(this).parents('.berklee-overlay-container');
        item.hide();
        item.next().show();
        return false;
      })
      .appendTo(berkleeOverlayItems);

    $('<a />')
      .addClass('icon-chevron-left')
      .attr('href','#')
      .click(function(){
        var item = $(this).parents('.berklee-overlay-container');
        item.hide();
        item.prev().show();
        return false;
      })
      .prependTo(berkleeOverlayItems);

    berkleeOverlayItems.first().children('.icon-chevron-left').remove();
    berkleeOverlayItems.last().children('.icon-chevron-right').remove();
  });

  $('.berklee-filters-view-more a').click(function(){
    if ($(this).attr('donttouchme') === 'true') {
      return true;
    }
    if ($(window).width() < 490) {
      return true;
    } else {
      var index = $(this).attr('rel');
      $(this).parents('.berklee-overlay-group').children('.berklee-overlay-container').each(function(){
        var image = $(this).find('img');
        image.attr('src', image.attr('url'));
        $(this).clone(true).appendTo(berkleeOverlay);
      });
      $('.berklee-overlay').children().eq(index).show();
      berkleeOverlay.show();
      return false;
    }
  });

  $('a.berklee-overlay[href$=".jpg"]').click(function(){
    if ($(window).width() < 490) {
      return true;
    } else {
      var berkleeOverlayContainer = $('<div />').addClass('berklee-overlay-container');
      var berkleeOverlayItem = $('<div />')
        .addClass('berklee-overlay-item')
        .css('display', 'inline-block');
      var berkleeOverlayImage = $('<img />').attr('src',$(this).attr('href'));

      berkleeOverlayItem.append(berkleeOverlayImage)
        .append(berkleeOverlayClose.clone(true));
      berkleeOverlayContainer.append(berkleeOverlayItem);
      berkleeOverlay.append(berkleeOverlayContainer);
      berkleeOverlayContainer.show();
      berkleeOverlay.show();
      return false;
    }
  });
});