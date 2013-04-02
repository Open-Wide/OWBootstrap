{*
	BOOTSTRAP CAROUSEL TEMPLATE
	
	Params :
	-----------------------------------------------------------------------------------------------
		$params= hash (
			'items'		: node_id array, OR nodes array, OR relation_list array			(required)
			'id'		: ID of carousel
			'interval'	: interval of auto-slide (ms). If false, no autoslide.
			'view'		: Children view													(default: carousel)
			'prev_label': Label to display for "prev" button							(default : &lsaquo;)
			'next_label': Label to display for "next" button							(default : &rsaquo;)
			+ all params of node view (image_class, caption_array...)
		)
	
	
	Example :
	-----------------------------------------------------------------------------------------------
	{include uri="design:bootstrap/carousel.tpl" 
			 params=hash( 'items', $node.data_map.images.content.relation_list,
			 			  'image_class', 'owbootstrap_carousel_crop',
			 			  'no_caption', true() )
	}
*}
{if and( first_set($params.items), $params.items|count )}
	{def $current_id = first_set( $params.id, currentdate() )}
	<!-- Carousel -->
		<div id="myCarousel{$current_id}" class="carousel slide">
			{*<ol class="carousel-indicators">
				{foreach $params.items as $i => $item}
					<li data-target="#myCarousel{$current_id}" data-slide-to="{$i}"{if $i|eq(0)} class="active"{/if}></li>
	    		{/foreach}
			</ol>*}

	    	<div class="carousel-inner">
	    		{foreach $params.items as $i => $item}
	    			{if is_integer( $item )}
	    				{set $item = fetch('content', 'node', hash('node_id', $item))}
	    			{elseif and( not($item|is_class( 'ezcontentobjecttreenode' ) ), $item.node_id )}
	    				{set $item = fetch('content', 'node', hash('node_id', $item.node_id))}
	    			{/if}
	    			{if and($item, $item|is_class( 'ezcontentobjecttreenode' ))}
	    				<div class="item{if $i|eq(0)} active{/if}">
	    					{node_view_gui content_node=$item
	    							   view=first_set($params.view, 'carousel')
	    							   active=$i|eq(0) 
	    							   params=$params}
	    				</div>
	    			{/if}
	    		{/foreach}
	    	</div>
		    <a class="left carousel-control" href="#myCarousel{$current_id}" data-slide="prev">{first_set($params.prev_label, '&lsaquo;')}</a>
		    <a class="right carousel-control" href="#myCarousel{$current_id}" data-slide="next">{first_set($params.next_label, '&rsaquo;')}</a>
		</div>
	<!-- End Carousel -->
	{undef $current_id}
{/if}