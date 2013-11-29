
var generateDropdown = function( className, min, max, value ) {
	var dropdown = '<select data-param="'+className+'">';
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

var createOptions = function(item) {
	
	var bsclass = item.attr('data-bsclass' );
	if (bsclass && bsclass != 'undefined') {
		var spanreg = new RegExp("(.*)span([0-9]{1,2})(.*)", "g");
		if(bsclass.match(spanreg)) {
			var width = bsclass.replace(spanreg, "$2");
			var offset = 0;
			var offsetreg = new RegExp("(.*)offset([0-9]{1,2})(.*)", "g");
			if(bsclass.match(offsetreg)) {
				offset = bsclass.replace(offsetreg, "$2")
			}

			var widthDropdown = generateDropdown('span', 1, 12, width);
			var offsetDropdown = generateDropdown('offset', 0, 12, offset);
			var toolbox = $('<div class="toolbox noContent">Largeur : '+widthDropdown+' ; Offset : '+offsetDropdown+'</div>');
			item.prepend(toolbox);
			
			$(toolbox).find('select').each(function() {
				$(this).change(function() {
					var param = $(this).attr('data-param');
					var parent = $(this).closest('.bsItem');
					var bsclass  = parent.attr('data-bsclass');
					var classes = parent.attr('class');
					$(this).find("option:selected").each(function() {
			        	var new_value = $(this).attr('value');
			        	var reg = new RegExp("(.*)("+param+"[0-9]{1,2})(.*)", "g");
						if(bsclass.match(reg)) {
							parent.attr('data-bsclass', bsclass.replace(reg, "$1"+new_value+"$3"));
						} else {
							parent.attr('data-bsclass', bsclass+" "+new_value);
						}
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

$(window).bind("load", function() {

	$.ajax({
			url: "/ezjscore/call/ezJsOWBootstrap::createRteGridOptions"
		}).done(function( data ) {
			$('#grid-options').html($("<div/>").html(data).text());
		});

	if(tinyMCEPopup && tinyMCEPopup.getWindowArg('root_bsid')) {
		var root_bsid = tinyMCEPopup.getWindowArg('root_bsid');
		var root_bs_class = tinyMCEPopup.getWindowArg('root_bsclass');
	} else {
		var root_bsid = 'gridfluid';
		var root_bs_class = '';
	}
	 // Init edit box
	 initRoot( root_bsid, root_bs_class );
	 
	 // Import existing elements
	 if(tinyMCE) {
		 var selection = tinyMCE.activeEditor.selection.getNode().outerHTML;
		 $(selection).find('[type="bootstrap"]').each(function(i, elt) {
			 insertBootstrapItem( $(elt).data('bsgroup'), $(elt).data('bsid'), $(elt).html() );
		 });
	 }
	 

	 $('[data-toggle="tooltip"]').tooltip({html: true});
	
});

// Define bootstrap elements
var bootstrapItems = {
	gridcontainer: {
		
		container: {
			democontent: '<div class="container text-left bsItem" data-bsid="container" data-bsclass="container" data-bsgroup="gridcontainer">'+
							'<div id="grid" class="row bsItem" data-bsid="row" data-bsclass="row" data-bsgroup="gridcontainer">'+
							'</div>'+
						 '</div>'
		},
		
		'row-fluid': {
			democontent: '<div id="grid" class="row-fluid bsItem" data-bsid="row-fluid" data-bsclass="row-fluid" data-bsgroup="gridcontainer"></div>'
		}
	},
	grid: {
		span1: {},
		span2: {},
		span3: {},
		span4: {},
		span5: {},
		span6: {},
		span7: {},
		span8: {},
		span9: {},
		span10: {},
		span11: {},
		span12: {}
	}
}

// Define head elements
bootstrapItems['root']= {
	grid: {
		democontent: bootstrapItems['gridcontainer']['container']['democontent'],
		subcontainer: '#grid',
		subitems: '[data-bsgroup="grid"]',
		init: initGridInterface
	},
	gridfluid: {
		democontent: bootstrapItems['gridcontainer']['row-fluid']['democontent'],
		subcontainer: '#grid',
		subitems: '[data-bsgroup="grid"]',
		init: initGridInterface
	}
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function insertBootstrapItem( bsgroup, bsid, content ) {

	var item = bootstrapItems[bsgroup][bsid];
	var container = $('#'+bsgroup);
	if (container && item) {
		if (! content) {
			var content = item.democontent;
		}
		if ( item.bsclass ) {
			var bsclass = item.bsclass;
		} else {
			var bsclass = bsid;
		}
		var itemEntity = $( "<div></div>" )
			.attr('data-bsid', bsid )
			.attr('data-bsgroup', bsgroup )
			.attr('data-bsclass', bsclass )
			.addClass( bsclass )
			.addClass( 'bsItem' )
			.html(  content )
			.appendTo( container );

		createOptions(itemEntity);
	}
}

// Init edit box, preserving 'subgroup' elements if existing
function initRoot ( bsid, bsclass ) {

	var root = $('#rteBootstrap');
	root.attr('data-bsid', bsid);
	root.attr('data-bsclass', bsclass);
	root.attr('data-bsgroup', 'root');
	
	$('[data-rootbsid]').removeClass('active');
	$('[data-rootbsid="'+bsid+'"]').addClass('active');
	
	if ( bootstrapItems['root'][bsid].subitems ) {
		$('body').append(
				$('<div id="tmp" style="display:none;"></div>').append( $('#rteBootstrap '+bootstrapItems['root'][bsid].subitems) )
		);
	}
	
	if( bootstrapItems['root'][bsid].democontent ) {
		$('#rteBootstrap').html(
				bootstrapItems['root'][bsid].democontent
		);
	}
	
	if( bootstrapItems['root'][bsid].subcontainer ) {
		$(bootstrapItems['root'][bsid].subcontainer).html($('#tmp').html());
		$('#tmp').remove();
	}
	
	if( bootstrapItems['root'][bsid].init ) {
		bootstrapItems['root'][bsid].init();
	}

	/*$('#rteBootstrap [data-bsclass*="span"]').each(function(){
	 	createOptions($(this));
	 });*/
	
}

function initGridInterface (){

	$( "#blockList > div" ).draggable({
		 appendTo: "body",
		 helper: "clone",
		 cursor: "move",
		 drag: function( event, ui ) {
			 ui.helper.removeClass('btn').addClass(ui.helper.data('bsid'));
		 }		 
			 
	 });
	 $( "#grid" ).droppable({
		 activeClass: "ui-state-default",
		 hoverClass: "ui-state-hover",
		 cursor: "move",
		 accept: ":not(.ui-sortable-helper)",
		 drop: function( event, ui ) {
			 $( this ).find( ".placeholder" ).remove();
			 insertBootstrapItem ( 'grid', ui.draggable.data('bsid') );
		 }
	 }).sortable({
			 items: "div[class*=bsItem]",
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
