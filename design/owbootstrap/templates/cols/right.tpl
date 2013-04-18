<div class="span{$width} right-col">
	{cache-block ignore_content_expiry keys=array( $cache_uri, $user_hash ) subtree_expiry=$cache_current_node_id expiry='86400'}
		<p>Col right</p>
		{def $current_node = fetch( 'content', 'node', hash( 'node_id', ezpagedata().node_id) )
			 $show_in_mainmenu_state = fetch('owfetch' , 'object_state', hash( 'group_identifier' , 'show_in_mainmenu',
		                                                                           'state_identifier' , 'yes'))}
			{if not($current_node)}
				{set $current_node=$root}
			{/if}
			{include    uri='design:menu/recursive_menu.tpl' 
						current_node=$current_node
						root_node=$current_node
						depth=2
						classes=array('Menu')|classes_by_group()
						attribute_filter=array(array('state' , '=' , $show_in_mainmenu_state.id))
						only_active=false()
						ul_classes=array('nav')
						active_li_class="active"
			}
		{undef $current_node $show_in_mainmenu_state}
	{/cache-block}
</div>