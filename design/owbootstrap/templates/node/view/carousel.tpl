{*
	GENERIC CAROUSEL VIEW
	
	$params = hash (
		'image_class'	: image format to display							(default : owbootstrap_carousel)
		'no_image'		: disable image display 							(default : false)
		'no_caption'	: disable caption display							(default : false)
		'no_name'		: disable node name display							(default : false)
		'caption_array'	: array of node attributes to display in caption	(default : array('description'))
	)
*}

{if and( $node.data_map.image.has_content, not( first_set( $params.no_image ) ) )}
	{attribute_view_gui attribute=$node.data_map.image image_class=first_set($params.image_class, 'owbootstrap_carousel') css_class='text-center'}
{/if}

{if not( first_set( $params.no_caption ) )}
	<div class="carousel-caption">
		{if and( $node.name, not( first_set( $params.no_name ) ) )}
			<h4>{$node.name|wash}</h4>
		{/if}
		
		{if is_unset( $params.caption_array )}
			{def $caption_array = array( 'description' )}
		{else}
			{def $caption_array = $params.caption_array}
		{/if}
		
		{if $caption_array|count}
			{foreach $caption_hash as $caption_attribute}
				{if and( first_set($node.$caption_attribute), $node.$caption_attribute.has_content)}
					{attribute_view_gui attribute=$node.data_map.$caption_attribute}
				{/if}
			{/foreach}
		{/if}
	</div>
{/if}