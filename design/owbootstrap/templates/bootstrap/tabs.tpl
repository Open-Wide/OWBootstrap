{*
	BOOTSTRAP TABS TEMPLATE
	
	Display an array of attributes on a tab block
	
	Params :
	-----------------------------------------------------------------------------------------------
		$tabs				: Tab titles and content			(required)
									hash( 									
										'Example of tab1 title' => '<p>Example of content</p>',
										'Example of tab2 title' => $node.data_map.my_attribute
									)											
		$ul_class			: ul additional css class			(default : 'nav-tabs')
		$container_class	: container additional css class	(default : '')
		
	
	Example :
	-----------------------------------------------------------------------------------------------
	{include uri="design:bootstrap/tabs.tpl"
		 	 tabs=hash( 
		 	 	   'Cars'|i18n( 'cars' ), 	'My car is awesome',
		 	 	   'Colors', $node.data_map.colors,
		 	 	   'Features', $node.data_map.features
		 	 	  )
		 	 ul_class='nav-pills'
	}

*}

{if and( first_set($tabs), $tabs|count )}

	<section{if first_set($container_class)} class="{$container_class}"{/if}>
	
		<nav>
			<ul class="nav {first_set($ul_class, 'nav-tabs')}">
				{def $tab_count = 0}
					{foreach $tabs as $title => $content}
						{if $content|is_class('ezcontentobjectattribute')}
							{if $content.has_content|not}
								{set $content = ''}
							{/if}
						{/if}
						{if $content}
							<li{if $tab_count|eq(0)} class="active"{/if}><a href="#{$title|strtoid}" data-toggle="tab">{$title}</a></li>
							{set $tab_count = $tab_count|inc}
						{/if}
					{/foreach}
				{undef $tab_count}
			</ul>
		</nav>
		
		<div class="tab-content">
			{def $tab_count = 0}
				{foreach $tabs as $title => $content}
					{if $content|is_class('ezcontentobjectattribute')}
						{if $content.has_content}
							{set-block variable=$content}{attribute_view_gui attribute=$content}{/set-block}
						{else}
							{set $content = ''}
						{/if}
					{/if}
					{if $content|trim}
						<div class="tab-pane fade{if $tab_count|eq(0)} in active{/if}" id="{$title|strtoid}">
							{$content}
						</div>
						{set $tab_count = $tab_count|inc}
					{/if}
	            {/foreach}
	        {undef $tab_count}
        </div>
        
    </section>
{undef}
{/if}