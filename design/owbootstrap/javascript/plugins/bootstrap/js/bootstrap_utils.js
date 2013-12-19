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
	initGridInterface();

	$.ajax({
		url: "/ezjscore/call/ezJsOWBootstrap::createRteGridOptions"
	}).done(function( data ) {
		root.prepend($("<div/>").html(data).text());
		createToolbox(root);
		addCloseButton(root.find('.toolbox').first());
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
			var toolbox = $('<div class="toolbox noContent"><h4>Options</h4><p>Largeur : ' + widthDropdown + '<br>Décalage : ' + offsetDropdown + '</p></div>');

			item.prepend(toolbox);
			addCloseButton(toolbox);
			
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
/****************************************
* Crée la boîte à outils
****************************************/
var createToolbox = function(item) {
	var toolbox = $('<div class="toolbox-display noContent"><i class="icon-cog"></i></div>');
	
	item.prepend(toolbox);
	toolbox.click(function(){
		
		displayToolbox(item);
	});
}

var displayToolbox = function(item) {
	var toolbox = item.find('.toolbox').first();
	if (toolbox.length > 0) {
		toolbox.toggle();
	} else {
		createOptions(item);
	}
}

var addCloseButton = function(item) {
	item.prepend('<i class="icon-remove toolbox-display"></i>');
	item.find('.icon-remove').click(function(){
		item.toggle();
	});
}