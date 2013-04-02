tinyMCEPopup.requireLangPack();

var BootstrapDialog = {
        init : function() {
                var f = document.forms[0];

                // Get the selected contents as text and place it in the input
                /*f.someval.value = tinyMCEPopup.editor.selection.getContent({format : 'text'});
                f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');*/
                //f.somearg.value = tinyMCEPopup.getWindowArg('some_custom_arg');
                //alert(tinyMCEPopup.getWindowArg('val'));
        },

        insert : function() {
                // Insert the contents from the input into the document
                //tinyMCEPopup.editor.execCommand('mceInsertContent', false, document.forms[0].someval.value);
        		
        		/*var output = '<div type="bootstrap" class="rteBootstrap">' + 
        						'<div type="bootstrap" class="row-fluid">';
        		var bootstrapCols = document.forms[0].elements['grid[]'];
        		var bootstrapContent = document.forms[0].elements['grid-content[]'];
        		var width = 0;
        		for (var col = 0; col < bootstrapCols.length; col++) {
        			width = width + parseInt( bootstrapCols[col].value.split('span')[1] );
        			if (width > 12) {
        				width = 0;
        				output = output + '</div><div type="bootstrap" class="row-fluid">';
        			}
        			output = output + '<div type="bootstrap" ' +
						        			'data-bsid="'+bootstrapCols[col].value+'" ' +
						        			'data-bsgroup="'+bootstrapCols[col].value+'" ' +
        									'data-bsclass="'+bootstrapCols[col].value+'" ' +
        									'class="'+bootstrapCols[col].value+'" '+
        									
        							  '>' + 
        							  		bootstrapContent[col].value + 
        							  '</div>';
        			
        		}
        		
        		output = output + '</div></div><p></p>';*/
        	
	        	/*var bsItems = document.getElementsByClassName('bsItem');
	        	for (var i = 0; i < bsItems.length; i++) {
	        	    console.log(bsItems[i].getAttribute('data-bsid'));
	        	}*/
        	
        	// Suppression des classes inutiles
        	// Ajout des classes bootstrap
        	$('#rteBootstrap')
				.find('.bsItem').each(function(i,elt) {
					$(elt)
						.removeClass()
						.addClass($(elt).data('bsclass'))
						.attr('type', 'bootstrap')
				});

        		
    		var output = '<div type="bootstrap" class="rteBootstrap" data-bsgroup="' + $('#rteBootstrap').data('bsgroup') + '" data-bsid="' + $('#rteBootstrap').data('bsid') + '">' + $('#rteBootstrap').html() + '</div>';
        	//var output = $('#rteBootstrap').$('<div>').append($('#rteBootstrap').clone()).html(); + '<p></p>';
        	
    		tinyMCEPopup.editor.execCommand('mceInsertContent', false, output);
            tinyMCEPopup.close();
        }
};

tinyMCEPopup.onInit.add(BootstrapDialog.init, BootstrapDialog);
