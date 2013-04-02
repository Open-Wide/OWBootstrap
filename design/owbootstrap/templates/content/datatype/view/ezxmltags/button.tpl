{switch match=$link|explode(':')[0]}
    {case match='eznode'}
        {def $url = fetch('content', 'node', hash( 'node_id', $link|explode('eznode://')[1] )).url_alias}
    {/case}
    {case}
        {def $url = $link}
    {/case}
{/switch}
<a href="{$url|ezurl('no', 'full')}" class="btn {if first_set($class)|ne('default')} {$class}{/if}{if first_set($size)|ne('default')} {$size}{/if}{if first_set($block)|ne('default')} {$block}{/if}">{$content|strip_tags|trim|wash}</a>