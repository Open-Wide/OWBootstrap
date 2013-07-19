{*
	BOOTSTRAP CAROUSEL TEMPLATE
	
	Params :
	-----------------------------------------------------------------------------------------------
		$params= hash (
			'items'		: node_id array, OR nodes array, OR relation_list array			(required)
			'id'		: ID of carousel												(default: random)
			'view'		: Children view													(default: 'carousel')
			'controls'	: Display prev/next controls									(default: true)
			'pager'		: Display pager (before|after|false)							(default: 'before')
			'prev_label': Label to display for "prev" button							(default : '&lsaquo;')
			'next_label': Label to display for "next" button							(default : '&rsaquo;')
			+ all params of node view (image_class, caption_array...)
		)

		$cycle_options= hash (		*Containing all cycle options*
			'activePagerClass', 'activeSlide',
			'fx', 'fade',
			'after', 'null',
			'delay', 0,
			'speed', 1000
			
			.....
			
			See cycle plugin documentation for details ( http://jquery.malsup.com/cycle/options.html )
		)
	
	
	Example :
	-----------------------------------------------------------------------------------------------
	{include uri="design:bootstrap/carousel.tpl" 
		 	 params=hash( 'items', $node.data_map.images.content.relation_list,
			 			  'id', concat('carousel', $block.id),
			 			  'view', 'embed',
			 			  'image_class', 'owbootstrap_carousel_crop',
			 			  'controls', false(),
			 			  'pager', 'after'
			 			  )
			 cycle_options=hash(
			 			  'timeout', 3000,
			 			  'fx', "scrollHorz",
			 			  'speed', 500
			 )
	}
*}
{if and( first_set($params.items), $params.items|count )}
	{def $current_id = first_set( $params.id, concat( 'carousel', rand(1,10000) ) )
		 $current_cycle_options = first_set($cycle_options, array())}
	<!-- Carousel -->
		<div id="{$current_id}" class="cycle clearfix">

				<div class="carousel-content">
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
	    	{if and(first_set($params.controls,1), gt($params.items|count, 1))}
		    	<a id="{$current_id}_prev" class="left carousel-control" href="#{$current_id}">{first_set($params.prev_label, '&lsaquo;')}</a>
		    	<a id="{$current_id}_next" class="right carousel-control" href="#{$current_id}">{first_set($params.next_label, '&rsaquo;')}</a>
		    {/if}
		</div>
	<!-- End Carousel -->
	
	{if first_set($params.controls,1)}
		{set $current_cycle_options = $current_cycle_options|merge( hash(
										'prev', concat('#', $current_id, '_prev'),
										'next', concat('#', $current_id, '_next'),
									))}
	{/if}
	{if first_set($params.pager,1)}
		{set $current_cycle_options = $current_cycle_options|merge( hash(
										'pager', concat('#', $current_id, '_pager')
									))}
	{/if}
	<script>
	$(function(){ldelim}
		$('#{$current_id} .carousel-content')
			{if first_set($params.pager,1)}.{cond($params.pager|eq('after'), 'after', 'before')}('<div id="{$current_id}_pager" class="carousel-pager">'){/if}
			.cycle({ldelim}
			{if $current_cycle_options|count}
				{foreach $current_cycle_options as $option => $value}
					{$option}: {if $value|is_string}'{$value}'{else}{$value}{/if}{delimiter},
					{/delimiter}
				{/foreach}
			{/if}
		{rdelim});
	{rdelim});
	</script>
	{undef $current_id}
{/if}