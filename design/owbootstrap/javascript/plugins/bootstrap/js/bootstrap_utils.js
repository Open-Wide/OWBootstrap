$(window).bind("load", function() {
	
	if(tinyMCEPopup && tinyMCEPopup.getWindowArg('root_bsid')) {
		var root_bsid = tinyMCEPopup.getWindowArg('root_bsid');
	} else {
		var root_bsid = 'gridfluid';
	}
	 // Init edit box
	 initRoot( root_bsid );
	 
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
		
		span1: {
			democontent: "<h4>1</h4><p>S a e t</p>"
		},
		span2: {
			democontent: "<h4>2</h4><p>Lorem ipsum dolor sit amet.</p>"
		},
		span3: {
			democontent: "<h4>3</h4><p>Lorem ipsum dolor sit amet, consectetur adipis.</p>"
		},
		span4: {
			democontent: "<h4>4</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus.</p>"
		},
		span5: {
			democontent: "<h4>5</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus.</p>"
		},
		span6: {
			democontent: "<h4>6</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra.</p>"
		},
		span7: {
			democontent: "<h4>7</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat.</p>"
		},
		span8: {
			democontent: "<h4>8</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat et eros. Proin sodales.</p>"
		},
		span9: {
			democontent: "<h4>9</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat et eros. Proin sodales placerat condimentum.</p>"
		},
		span10: {
			democontent: "<h4>10</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat et eros. Proin sodales placerat condimentum. Morbi ut felis vitae quam faucibus viverra.</p>"
		},
		span11: {
			democontent: "<h4>11</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat et eros. Proin sodales placerat condimentum. Morbi ut felis vitae quam faucibus viverra. In elit lectus, rutrum vitae suscipit nec.</p>"
		},
		span12: {
			democontent: "<h4>11</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis luctus lorem sit amet dapibus. Duis dui libero, dignissim pharetra placerat a, consequat et eros. Proin sodales placerat condimentum. Morbi ut felis vitae quam faucibus viverra.</p>"
		}
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

function insertBootstrapItem( bsgroup, bsid, content=false ) {

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
		$( "<div></div>" )
			.attr('data-bsid', bsid )
			.attr('data-bsgroup', bsgroup )
			.attr('data-bsclass', bsclass )
			.addClass( bsclass )
			.addClass( 'bsItem' )
			.html(  content )
			.appendTo( container );
	}
}

// Init edit box, preserving 'subgroup' elements if existing
function initRoot ( bsid ) {
	//console.log('init');
	var root = $('#rteBootstrap');
	root.attr('data-bsid', bsid);
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
	
}

/*
function initRoot ( bsid ) {
	//console.log('init');
	var root = $('#rteBootstrap');
	root.attr('data-bsid', bsid);
	root.attr('data-bsgroup', 'root');
	
	if ( bootstrapItems['root'][bsid].subitems ) {
		console.log(bootstrapItems['root'][bsid].subitems);
		$('body').append(
				$('<div id="tmp"></div>').append( $('#rteBootstrap [data-bsgroup="'+bootstrapItems['root'][bsid].subitems+'"]') )
		);
	}

	if( bootstrapItems['root'][bsid].subgroup && bootstrapItems['root'][bsid].subid ) {
		root.html('');
		insertBootstrapItem( bootstrapItems['root'][bsid].subgroup, bootstrapItems['root'][bsid].subid, false, root );
	}
	
	if( bootstrapItems['root'][bsid].subitems ) {
		$('#'+bootstrapItems['root'][bsid].subitems).html($('#tmp').html());
		$('#tmp').remove();
	}
	
	if( bootstrapItems['root'][bsid].init ) {
		bootstrapItems['root'][bsid].init();
	}
	
}
*/

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
			 items: "div:not(.placeholder)",
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
