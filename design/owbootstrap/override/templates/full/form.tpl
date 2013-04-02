{*?template charset=UTF-8*}
{*
	Post params :
	-----------------------------------------------------------------------------------------------						
		$_POST['modal'] : enable/disable modal mode ( hasvariable )
		$_POST['CancelURI'] : Redirect URI if cancel
		$_POST['hidden_fields'] : array of contentclassattributes to display as hidden fields with default value (ONLY string datatype is supported)
		$_POST['hidden_<attribute_identifier>']
*}
{set-block scope='global' variable='cache_ttl'}0{/set-block}

{def $modal = and( ezhttp_hasvariable('modal'), ezhttp('modal') )}

<form method="post" action={"content/action"|ezurl} enctype="multipart/form-data" class="form-horizontal"{if $modal} id="modal-form"{/if}> 
	{if $modal}

		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">{$node.name|wash}</h3>
		</div>
		<div class="modal-body">
	{else}
		<div>
			<h1>{$node.name|wash}</h1>
	{/if}

			{include name=Validation uri='design:content/collectedinfo_validation.tpl'
		                class='text-error'
		                validation=$validation
		                collection_attributes=$collection_attributes}
			
			{if not(is_set($hidden_attributes))}
				{if ezhttp_hasvariable('hidden_fields')}
					{def $hidden_attributes = ezhttp('hidden_fields')}
				{else}
					{def $hidden_attributes = array()}
				{/if}
			{/if}
			{foreach $node.data_map as $attribute}
		
				{if $attribute.is_information_collector}
					{if or( first_set($hidden_attributes[$attribute.contentclass_attribute_identifier]), $hidden_attributes|contains($attribute.contentclass_attribute_identifier) )}
						<input type="hidden" value="{cond( is_set( $#collection_attributes[$attribute.id] ), $#collection_attributes[$attribute.id].data_text, first_set(ezhttp(concat('hidden_',$attribute.contentclass_attribute_identifier))) )}" name="ContentObjectAttribute_ezstring_data_text_{$attribute.id}" />
						<input type="hidden" name="hidden_fields[]" value="{$attribute.contentclass_attribute_identifier}" />
					{else}
						<div class="control-group">
							<label class="control-label" for="ContentObjectAttribute_data_boolean_{$attribute.id}">{$attribute.contentclass_attribute.name} {$attribute.contentclass_attribute.is_required|choose('','*')}</label>
							
							<div class="controls">
					        	{attribute_view_gui attribute=$attribute}
					        </div>
				        </div>
			        {/if}
		        {/if}
		    {/foreach}
		</div>
	{if $modal}
		<div class="modal-footer">
			<div>
	{else}
		<div class="control-group">
			<div class="controls">
	{/if}
			   <input type="submit" class="btn" data-dismiss="modal" aria-hidden="true" name="CancelButton" value="{'Annuler'|i18n( 'openwide/forms' )}" />
			   <input type="submit" class="btn btn-primary" name="ActionCollectInformation" value="{'Envoyer'|i18n( 'openwide/forms' )}" />
		       <input type="hidden" name="ContentNodeID" value="{$node.main_node_id}" />
		       <input type="hidden" name="ContentObjectID" value="{$node.object.id}" />
		       <input type="hidden" name="ViewMode" value="full" />
		       {if ezhttp_hasvariable('CancelURI')}
		       	{def $cancel_uri = ezhttp('CancelURI')}
		       {/if}
		       {if first_set($cancel_uri)}
		       		<input type="hidden" name="CancelURI" value="{$cancel_uri}" />
		       {/if}
			</div>
		</div>
</form>