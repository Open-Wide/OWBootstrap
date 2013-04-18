{cache-block ignore_content_expiry expiry='86400'}
	<form class="form-search navbar-search pull-right" method="get" action="{'/content/search'|ezurl( 'no' )}" id="site-wide-search">
		<div class="input-append">
	        <span class="hidden">{'Search'|i18n('design/ezdemo/pagelayout')}</span>
	        {if $pagedata.is_edit}
	            <input class="search-query" type="search" name="SearchText" placeholder="{'Search text'|i18n('design/ezdemo/pagelayout')}" disabled="disabled" />
	        {else}
	            <input class="search-query" maxlength="10" size="15" length="10" type="search" name="SearchText" placeholder="{'Search text'|i18n('design/ezdemo/pagelayout')}" />
	            {if eq( $ui_context, 'browse' )}
	             <input name="Mode" type="hidden" value="browse" />
	            {/if}
	        {/if}
	
		    <button class="btn" type="submit">Go!</button>
	    </div>
	</form>
{/cache-block}