$(window).bind("load", function() {

	var root = $('#rteBootstrap');
	if(tinyMCE) {
		 var selection = tinyMCE.activeEditor.selection.getNode().outerHTML;

		 if ($(selection).find('[type="bootstrap"]').length > 0) {
		 	root.html(tinyMCE.activeEditor.selection.getNode().innerHTML);
		 	root.attr('class', $(selection).attr('class'));
		 	root.find('.row, .row-fluid').first().attr('id', 'grid');
		 	root.find('[data-bsclass]').removeAttr('data-bsclass');
		 	root.find('[data-bsgroup]').removeAttr('data-bsgroup');
		 }

		if ($('#grid').hasClass('row')) {
			$('#btn-fix').click();
		} else {
			$('#btn-fluid').click();
		}

	}
	//initGridInterface();

	$.ajax({
		url: "/ezjscore/call/ezJsOWBootstrap::createRteGridOptions"
	}).done(function( data ) {
		$('#rteBootstrap').prepend($("<div/>").html(data).text());
	});

	root.find('div[class*=span]').each(function(){
		createToolbox($(this));
	});
	
});


function initGridInterface () {

	$( "#blockList > div" ).draggable({
		 appendTo: "body",
		 helper: "clone",
		 cursor: "move",
		 drag: function( event, ui ) {
			 ui.helper.removeClass('btn').addClass(ui.helper.data('bsclass'));
		 }		 
			 
	 });
	 $( "#grid" ).droppable({
		 activeClass: "ui-state-default",
		 hoverClass: "ui-state-hover",
		 cursor: "move",
		 accept: ":not(.ui-sortable-helper)",
		 drop: function( event, ui ) {
			 $( this ).find( ".placeholder" ).remove();
			 var newElt = $('<div class="' + ui.draggable.data('bsclass') + '"></div>');
			 createToolbox(newElt);
			 $("#grid").append( newElt );
			 
		 }
	 }).sortable({
			 items: "div[class*=span]",
			 placeholder: "highlight",
			 cursor: "move",
			 sort: function() {
				 $( this ).removeClass( "ui-state-default" );
			 },
			 start: function( event, ui ) { 
					ui.placeholder.addClass( ui.item.attr('class') );
					ui.placeholder.html( ui.item.html() );
			},
			 receive: function(event, ui) {
			 	sortableIn = 1;
			 	ui.item.removeClass('toRemove');
			 },
			 over: function(e, ui) { 
				 sortableIn = 1;
				 ui.item.removeClass('toRemove');
			 },
			 out: function(e, ui) { 
				 sortableIn = 0;
				 ui.item.addClass('toRemove');
			 },
			 beforeStop: function(e, ui) {
				 if (sortableIn == 0) {
				 	ui.item.remove();
				 } else {
					 ui.item.removeClass('toRemove');
				 }
			 },
			 stop: function(e, ui) {
				 ui.item.removeClass('toRemove');
			 }
	 });
}

var generateDropdown = function( className, min, max, value ) {
	var dropdown = '<select name="'+className+'">';
	for(var i=min;i<=max;i++) {
		dropdown = dropdown+'<option value="'+className+i+'"';
		if (i==value) {
			dropdown = dropdown+' selected="selected"'
		}
		dropdown = dropdown+'>'+i+'</option>'
	}
	dropdown = dropdown+'</select>';
	return dropdown;
}

var createOptions = function( item ) {

	var classes = item.attr('class' );
	if (classes && classes != 'undefined') {

		// matche les [class=*span]
		var spanreg = new RegExp("(.*)span([0-9]{1,2})(.*)", "g");
		if(classes.match(spanreg)) {
			var width = classes.replace(spanreg, "$2");
			var offset = 0;
			var offsetreg = new RegExp("(.*)offset([0-9]{1,2})(.*)", "g");
			if(classes.match(offsetreg)) {
				offset = classes.replace(offsetreg, "$2")
			}

			var widthDropdown = generateDropdown('span', 1, 12, width);
			var offsetDropdown = generateDropdown('offset', 0, 12, offset);
			var toolbox = $('<div class="toolbox noContent">' + widthDropdown + '<br>' + offsetDropdown + '</div>');

			item.prepend(toolbox);
			
			$(toolbox).find('select').each(function() {
				$(this).change(function() {
					var param = $(this).attr('name');
					var parent = $(this).closest('[class*=span]');
					var classes = parent.attr('class');
					$(this).find("option:selected").each(function() {
			        	var new_value = $(this).attr('value');
			        	var reg = new RegExp("(.*)(" + param + "[0-9]{1,2})(.*)", "g");
						if(classes.match(reg)) {
							parent.attr('class', classes.replace(reg, "$1"+new_value+"$3"));
						} else {
							parent.attr('class', classes+" "+new_value);
						}
			        });
			    });
			});

		}
	}
}

var createToolbox = function(item) {
	var toolbox = $('<div class="toolbox noContent">Tools</div>');
	
	item.prepend(toolbox);
	toolbox.click(function(){
		
		createOptions(item);
	});
}
/*
var displayToolbox = function() {
	$('[data-toggle="popover"]').popover({
			placement: function (tip, element) {
		        var offset = $(element).offset();
		        height = (window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight||0)-$(tip).height(),
		        width = (window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0)-$(tip).width(),
		        vert = 0.5 * height - offset.top;
		        vertPlacement = vert > 0 ? 'bottom' : 'top';
		        horiz = 0.5 * width - offset.left;
		        horizPlacement = horiz > 0 ? 'right' : 'left';
		        placement = Math.abs(horiz) > Math.abs(vert) ?  horizPlacement : vertPlacement;
		        return placement;
			},
			trigger: 'manual',
			cursor: 'pointer',
			content: function (){ return $(this).find('.collapse').html() },
			delay: { show: 0, hide: 500 },
			html: true
	}).click(function(e){ 
		e.preventDefault();
		if ($(this).parent().find('.popover').length) {
			$('.popover').remove();
		} else {
			$('.popover').remove();
			$(this).popover('show');
		}
	});
}
*/