{cache-block ignore_content_expiry expiry='86400'}
	<div id="lang-selector">
		{def $lang_selector = array()
		     $avail_translation = array()}
			{if and( is_set( $DesignKeys:used.url_alias ), $DesignKeys:used.url_alias|count|ge( 1 ) )}
			    {set $avail_translation = language_switcher( $DesignKeys:used.url_alias )}
			{else}
			    {set $avail_translation = language_switcher( $site.uri.original_uri )}
			{/if}
			
			{if $avail_translation|count|gt( 1 )}
			    {foreach $avail_translation as $siteaccess => $lang}
			        {append-block variable=$lang_selector}
			        {if $siteaccess|eq( $access_type.name )}
			            <li class="current"><a href="#"><img src="{$lang.locale|flag_icon()}" /> {$lang.text|wash}</a></li>
			        {else}
			            <li><a href={$lang.url|ezurl}><img src="{$lang.locale|flag_icon()}" /> {$lang.text|wash}</a></li>
			        {/if}
			        {/append-block}
			        {if $siteaccess|eq( $access_type.name )}
			            <a href="#lang-selector" class="current-lang"><img src="{$lang.locale|flag_icon()}" /> {$lang.text|wash()}&nbsp;↴</a>
			        {/if}
			    {/foreach}
			
			    <ul class="lang-select nav pull-right">
			    	{$lang_selector|implode( '' )}
			    </ul>
			{/if}
		{undef $lang_selector}
	</div>
{/cache-block}