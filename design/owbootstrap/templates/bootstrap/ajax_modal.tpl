{*
	Params :
	-----------------------------------------------------------------------------------------------						
		$url	: URL to ajax load (required)
		$text	: text to display in link (required)
		$target : Selector of section of $url to load (ex: '#modal-form'). If empty, entire page will be loaded
		$class	: class for link
		$modal_id	: ID of modal window
		$hidden_fields : generate hidden fields for full/form.tpl view (ONLY string datatype is supported)
		$additional_fields : Additional fields to send as post variables
*}
{if not(is_set($modal_id))}
	{def $modal_id = first_set( $modal_id, concat('modal_', rand( 1000, 10000 )) )}
{/if}

<a id="link_{$modal_id}" class="{first_set($class, 'btn')}" href="{$url}" data-toggle="modal" data-target="#{$modal_id}">{$text}</a>
<div class="modal fade" id="{$modal_id}"></div>
	
<script>
	$(function(){ldelim}
		$('#link_{$modal_id}').click(function(event){ldelim}
		    $($(this).data('target')).load( $(this).attr('href'){if first_set($target)}+' {$target}'{/if}, 
				{ldelim} 
					'modal': 1,
					{if $hidden_fields|count}
						'hidden_fields[]': ["{foreach $hidden_fields as $id => $value}{$id}{delimiter}", "{/delimiter}{/foreach}"],
						{foreach $hidden_fields as $id => $value}
							'hidden_{$id}': '{$value}',
						{/foreach}
					{/if}
					{if $additional_fields|count}
						{foreach $additional_fields as $id => $value}
							'{$id}': '{$value}',
						{/foreach}
					{/if}
				{rdelim} );
		{rdelim});
	{rdelim});
</script>