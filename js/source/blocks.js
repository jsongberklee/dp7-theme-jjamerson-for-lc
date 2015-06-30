/* Collapsible Block Behavior: */
function rememberCollapsed(action, thing) {
  if (typeof(Storage) == undefined || localStorage == null) {
    return -1;
  }
  if (action === 'add') {
    localStorage.collapsedBlocks += thing;
  }
  if (action === 'remove') {
    localStorage.collapsedBlocks = localStorage.collapsedBlocks.split(thing).join('');
  }
  if (action === 'check') {
    if (!localStorage.collapsedBlocks) {
      localStorage.collapsedBlocks = '';
      return -1;
    } else {
      return localStorage.collapsedBlocks.indexOf(thing);
    }
  }
}

jQuery(document).ready(function($){
  if (typeof(Storage) != undefined && localStorage != null) {
    $('.block.collapsible').each(function() {
      if ( $(this).attr('id') ) {
        var isCollapsed = rememberCollapsed('check', $(this).attr('id') );
        if (isCollapsed > -1) {
          $(this).addClass('collapsed').removeClass('expanded');
        }
      }
    });
  }
  $('.block.collapsible.collapsed .content').hide().addClass('jquery-altered');
  $('.block.collapsible > h3').click(function(){
    var parent = $(this).parent('.block');
    if (!parent.hasClass('collapsed') && !parent.hasClass('expanded') ) {
      parent.addClass('expanded');
    }
    parent.toggleClass('collapsed expanded');
    $('.content', parent).slideToggle(142);

    if ( parent.hasClass('collapsed') ) {
      rememberCollapsed('add', '|' + parent.attr('id') );
    } else {
      rememberCollapsed('remove', '|' + parent.attr('id') );
    }
  });

  /* Collapsible Lists: */
  $('ul.collapsible').each(function() {
    $('li:nth-child(n+4)', this).hide();
    //$(this).height('80px'); 
    var expand = $('<div />').addClass('expand').html('See All').appendTo( $(this) );
    expand.click(function(){
      //alert('h');
      var parent = $(this).parent('ul.collapsible');
      $('li:nth-child(n+4)', parent).toggle(200);
      if ( $(this).html() === 'See All' ) {
        $(this).html('Collapse List').addClass('expanded');
      } else {
        $(this).html('See All').removeClass('expanded');
      }
    })
  });

  /* Gridblocks */
  $('.berklee-grid').each(function() {
    var height = $(this).attr('height');
    var minWidth = $(this).attr('data-min-width');
    $('.berklee-gridblock', this).each(function(){
      $(this).css('height', height).addClass('jquery-altered');
      if (minWidth) {
        $(this).css('minWidth', minWidth);
      }
    });
  });
});