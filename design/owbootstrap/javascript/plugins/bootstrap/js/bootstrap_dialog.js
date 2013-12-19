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

            $('#grid').find('.noContent').remove();

            // Suppression des classes inutiles
            var classes = $('#grid').attr('class');
            var reg = new RegExp('([ "\'])ui-[^ "\']*', "g");
            if ( classes.match(reg) ) {
                $('#grid').attr('class', classes.replace(reg, "$1"));
            }
            $('#grid, #grid div[class*=span]').attr('type', 'bootstrap');
            $('[type=bootstrap]').each(function(i,elt){
                $(elt).attr('data-bsclass', $(elt).attr('class'));
            });
            
            var output = '<div type="bootstrap" data-bsgroup="root" class="' + $('#rteBootstrap').attr('class') + '" data-bsclass="' + $('#rteBootstrap').attr('class') + '">' + $('#grid').removeAttr('id')[0].outerHTML + '</div>';

            tinyMCE.activeEditor.selection.getNode().remove();
            tinyMCEPopup.editor.execCommand('mceInsertContent', false, output);
            
            tinyMCEPopup.close();
        }
};

tinyMCEPopup.onInit.add(BootstrapDialog.init, BootstrapDialog);
