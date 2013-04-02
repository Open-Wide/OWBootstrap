{set scope=global persistent_variable=hash('title', 'New %tag_name tag'|i18n('design/standard/ezoe', '', hash( '%tag_name', concat('&lt;', $tag_name_alias, '&gt;') )),
                                           'scripts', array('ezoe/ez_core.js',
                                                            'ezoe/ez_core_animation.js',
                                                            'ezoe/ez_core_accordion.js',
                                                            'ezoe/popup_utils.js'),
                                           'css', array()
                                           )}

                                           
<script type="text/javascript">

    tinyMCEPopup.onInit.add( 
    	function(ed){ldelim}
	    	var slides = ez.$$('div.panel'), navigation = ez.$$('#tabs li.tab');
			slides.accordion( navigation, {ldelim}duration: 100, transition: ez.fx.sinoidal, accordionAutoFocusTag: 'input[type=text]'{rdelim}, {ldelim}opacity: 0, display: 'none'{rdelim} );
		{rdelim}
	);
	
	tinyMCEPopup.onInit.add( 	
		eZOEPopupUtils.BIND( eZOEPopupUtils.init, window, {ldelim}
		    tagName: '{$tag_name}',
		    form: 'EditForm',
		    cssClass: 'ezoeItemBootstrapParent ezoeItemTriggered',
		    
		    {literal}
		    tagCreator: function( ed, tag, customTag, selectedHtml )
		    {
		    
		    	var arr = eZOEPopupUtils.getCustomAttributeArgs( tag + '_attributes').customattributes.split('attribute_separation'), values = {}, t;
		        for(var i = 0, l = arr.length; i < l; i++)
		        {
		            t = arr[i].split('|');
		            values[t[0]] = t[1];
		        }

		        var hasSelection = true;
		        if ( !selectedHtml )
		        {
		            selectedHtml = customTag;
		            hasSelection = false;
		        }
				{/literal}
		        /*return eZOEPopupUtils.insertHTMLCleanly( ed, {*
		        	*}'<div type="bootstrap">{*
			        	*}<div type="bootstrap" id="__mce_tmp" class="row">{*
			        		*}<div type="bootstrap" class="row ezoeItemTriggered ezoeItemPersistent">{*
			        			*}<div type="bootstrap" class="span4 ezoeItemTriggered ezoeItemPersistent ezoeItemEditable"> ' + values['col1'] + '<\/div>{*
			        			*}<div type="bootstrap" class="span4 ezoeItemTriggered ezoeItemPersistent ezoeItemEditable">values['col2']<\/div>{*
			        			*}<div type="bootstrap" class="span4 ezoeItemTriggered ezoeItemPersistent ezoeItemEditable">values['col3']<\/div>{*
			        		*}<\/div>{*
			        	*}<\/div>{*
		        	*}<\/div>{*
		        *}', '__mce_tmp' );*/
		        
				return eZOEPopupUtils.insertHTMLCleanly( ed, {*
		        	*}'<div type="bootstrap" id="__mce_tmp">{*
			        	*}<div type="bootstrap" class="container">{*
			        		*}<div type="bootstrap" class="row">{*
			        			*}<div type="bootstrap" class="span4">' + values['col1'] + ' <\/div>{*
			        			*}<div type="bootstrap" class="span4">' + values['col2'] + ' <\/div>{*
			        			*}<div type="bootstrap" class="span4">' + values['col3'] + ' <\/div>{*
			        		*}<\/div>{*
			        	*}<\/div>{*
		        	*}<\/div>{*
		        *}', '__mce_tmp' );

		        {literal}

		    },
		   
    		{/literal}

		    customAttributeStyleMap: {$custom_attribute_style_map},

		    cancelButton: 'CancelButton',
		    tagEditTitleText: "{'Edit %tag_name tag'|i18n('design/standard/ezoe', '', hash( '%tag_name', concat('&lt;', $tag_name_alias, '&gt;') ))|wash('javascript')}"
		{rdelim} )
	);

</script>


<form action="JavaScript:void(0)" method="post" name="EditForm" id="EditForm" enctype="multipart/form-data">
	<p>Here is a bootstrap dialog.</p>
	
	<div id="tabs" class="tabs">
		<ul>
			<li class="tab"><span><a href="JavaScript:void(0);">test1</a></span></li>
			<li class="tab"><span><a href="JavaScript:void(0);">test2</a></span></li>
		</ul>
	</div>
	<div class="panel_wrapper">
			<div class="panel">
				<p>Test1</p>
				
				{*include uri="design:ezoe/generalattributes.tpl" tag_name=$tag_name attributes=hash('class', $class_list )*}
				{include uri="design:ezoe/generalattributes.tpl"
						 tag_name=$tag_name 
						 attributes=hash(
						 		'Nombre de colonnes', array(1,2,3,4,6)
						 )}
				{*include uri="design:ezoe/generalattributes.tpl"
						 tag_name=$tag_name 
						 attributes=hash(
						 	'type', array('tot1', 'toto2'),
						 	'Nom', 'htmlsize'
						 )*}
        		{include uri="design:ezoe/customattributes.tpl" tag_name=$tag_name}
        
			</div>
			
			<div class="panel">
				<p>Test2</p>
			</div>
	</div>

	<div class="block"> 
        <div class="left">
            <input id="SaveButton" name="SaveButton" type="submit" value="{'OK'|i18n('design/standard/ezoe')}" />
            <input id="CancelButton" name="CancelButton" type="reset" value="{'Cancel'|i18n('design/standard/ezoe')}" />
        </div> 
    </div>
    
    {if is_set( $attribute_panel_output )}
		{foreach $attribute_panel_output as $attribute_panel_output_item}
		    {$attribute_panel_output_item}
		{/foreach}
	{/if}
</form>
