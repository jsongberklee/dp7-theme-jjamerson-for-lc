jQuery(document).ready(function($){
  $('.expandable').each(function() {
    var expandableElement = $(this);
    var expandableContent = $('.expandable-content', this);
    $('> h4', this).click(function() {
      expandableElement.toggleClass('expanded');
    });
  });
  $('.expandable-children').each(function() {
  	var expandableElements = $('.field, h3', this);
  	expandableElements.each(function(){
  		$(this).addClass('expandable');
  		var expandableContent = $('.field-items', this);
  		expandableContent.addClass('expandable-content');
  		$('.field-label', this).addClass('expandable-title');
  		$('> h4, .field-label', this).click(function() {
  			$(this).parents('.field').toggleClass('expanded');
  		});
  	});
  });
});