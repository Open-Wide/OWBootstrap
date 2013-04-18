<div class="span{$width} left-col">
	{cache-block ignore_content_expiry keys=array( $cache_uri, $user_hash ) subtree_expiry=$cache_current_node_id expiry='86400'}
		<p>Col left</p>
	{/cache-block}
</div>