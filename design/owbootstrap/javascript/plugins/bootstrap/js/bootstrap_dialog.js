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
            
            // Suppression des classes inutiles
            // Ajout des classes bootstrap
            $('#rteBootstrap')
                .find('.bsItem').each(function(i,elt) {
                    $(elt)
                        .removeClass()
                        .addClass($(elt).data('bsclass'))
                        .attr('type', 'bootstrap')
                });

                
            var output = '<div type="bootstrap" class="rteBootstrap" data-bsgroup="' + $('#rteBootstrap').data('bsgroup') + '" data-bsid="' + $('#rteBootstrap').data('bsid') + '" data-bsclass="' + $('#rteBootstrap').data('bsclass') + '">' + $('#rteBootstrap').html() + '</div>';

            tinyMCE.activeEditor.selection.getNode().remove();
            tinyMCEPopup.editor.execCommand('mceInsertContent', false, output);
            
            tinyMCEPopup.close();
        }
};

tinyMCEPopup.onInit.add(BootstrapDialog.init, BootstrapDialog);
