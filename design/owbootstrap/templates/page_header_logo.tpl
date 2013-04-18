{cache-block ignore_content_expiry expiry='86400'}
{if is_unset($root)}
	{def $root = get_root()}
{/if}
<div class="span4">
	<a href="{'/'|ezurl( 'no' )}" title="{ezini('SiteSettings','SiteName')|wash}" class="logo">
		{attribute_view_gui attribute=$root.data_map.logo image_class='medium' css_class=''}
	</a>
</div>
{/cache-block}