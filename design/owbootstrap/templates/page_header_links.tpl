{cache-block ignore_content_expiry keys=array($user_hash, $current_user.contentobject_id)}
	<ul class="nav">
	    <li id="tagcloud"><a href={concat("/content/view/tagcloud/", $pagedata.root_node)|ezurl} title="{'Tag cloud'|i18n('design/ezdemo/pagelayout')}">{'Tag cloud'|i18n('design/ezdemo/pagelayout')}</a></li>
	    <li id="sitemap"><a href={concat("/content/view/sitemap/", $pagedata.root_node)|ezurl} title="{'Site map'|i18n('design/ezdemo/pagelayout')}">{'Site map'|i18n('design/ezdemo/pagelayout')}</a></li>
	    {if $basket_is_empty|not()}
	    <li id="shoppingbasket"><a href={"/shop/basket/"|ezurl} title="{'Shopping basket'|i18n('design/ezdemo/pagelayout')}">{'Shopping basket'|i18n('design/ezdemo/pagelayout')}</a></li>
	   {/if}
	{if $current_user.is_logged_in}
	    <li id="myprofile"><a href={"/user/edit/"|ezurl} title="{'My profile'|i18n('design/ezdemo/pagelayout')}">{'My profile'|i18n('design/ezdemo/pagelayout')}</a></li>
	    <li id="logout"><a href={"/user/logout"|ezurl} title="{'Logout'|i18n('design/ezdemo/pagelayout')}">{'Logout'|i18n('design/ezdemo/pagelayout')} ( {$current_user.contentobject.name|wash} )</a></li>
	{else}
	    {if ezmodule( 'user/register' )}
	    <li id="registeruser"><a href={"/user/register"|ezurl} title="{'Register'|i18n('design/ezdemo/pagelayout')}">{'Register'|i18n('design/ezdemo/pagelayout')}</a></li>
	    {/if}
	    <li id="login">
	        <a href="/user/login">{'Login'|i18n('design/ezdemo/pagelayout')}</a>
	    </li>
	{/if}
	</ul>
{/cache-block}