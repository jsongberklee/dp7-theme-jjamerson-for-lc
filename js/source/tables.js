jQuery(document).ready(function($){
  var tables = $('.region-content table');
  tables.each(function() {
    var firstRow = $('tr', this).filter(':first');
    var cellCount = $('td', firstRow).size();
    $('td').each(function(){
      
    });

    // Resize the table if it's too narrow:
    var tableWidth = $(this).width() + ( parseInt($(this).css('padding').replace('px','')) * 2) + ( parseInt($(this).css('border-width').replace('px','')) * 2);
    if ( tableWidth > $('.region-content').width() ) {
      // Add a class to change the style
      $(this).addClass('oversized');
      // If the table has header cells, add the header to each data cell (inside a parenthesis at the end of the line)
      var headers = $('th', this);
      for (var i=1;i<headers.length+1;i++) {
        var headerText = headers.eq(i-1).text().trim();
        $('tr', this).each(function() {
          $('td:nth-child('+i+')', this).each(function() {
            if (headerText > '') {
              var thisText = $(this).remove('label').text();
              if ( thisText > '') {
                var separator = ': ';
              } else {
                var separator = '';
              }
              var newText = ' <span class="table-header-text">' + headerText + separator + ' </span><span class="original-content">' + $(this).html() + '</span>';
              $(this).html(newText);
            }
          });
        });
      }
    }
  });

  $('.datatable').each(function() {
    page_length = parseInt($(this).attr('data-page-length') || 10);
    order_column = $(this).attr('data-order-column') || null;
    order_direction = $(this).attr('data-order-direction') || null;
    if(order_column || order_direction) {
      order = [order_column,order_direction||'asc'];
    } else {
      order = [];
    }

    $(this).dataTable({
      "lengthMenu":[[page_length,-1],[page_length,"All"]],
      "order": order,
      "pageLength": page_length
    });
  });

});