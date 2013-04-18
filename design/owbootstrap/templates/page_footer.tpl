{cache-block ignore_content_expiry expiry='86400'}
{if is_unset($root)}
	{def $root = get_root()}
{/if}
<!-- Footer area: START -->
<footer>
	<div class="text-center">
        Powered by <a href="http://ez.no/ezpublish" title="eZ Publish&#8482; CMS Open Source Web Content Management">eZ Publish&#8482; CMS Open Source Web Content Management</a>.
	</div>
</footer>
<!-- Footer area: END -->
{/cache-block}