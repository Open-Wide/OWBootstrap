<!DOCTYPE html>
<!--[if lt IE 9 ]><html class="unsupported-ie ie" lang="{$site.http_equiv.Content-language|wash}"><![endif]-->
<!--[if IE 9 ]><html class="ie ie9" lang="{$site.http_equiv.Content-language|wash}"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html lang="{$site.http_equiv.Content-language|wash}"><!--<![endif]-->
<head>
{def $user_hash = concat( $current_user.role_id_list|implode( ',' ), ',', $current_user.limited_assignment_value_list|implode( ',' ) )
	 $cache_uri = $module_result.uri|explode('/(')[0]|explode('#')[0]
	 $cache_current_node_id = first_set( $module_result.node_id, ezini('NodeSettings', 'RootNode', 'content.ini') )}

{if is_set( $extra_cache_key )|not}
    {def $extra_cache_key = ''}
{/if}

{*
	PLEASE SEE design.ini.append.php for available variables
	All this variables are overridable in full views, with a simple ezpagedata_set call.
		Examples :
			{ezpagedata_set('left_col_tpl', false())}
				or
			{ezpagedata_set('left_col_tpl', 'cols/left_home.tpl')}
*}
{def $options = array()
	 $options_list = array(
	 	'top_path_tpl',
	 	'header_tpl',
	 	'top_menu_tpl',
	 	'left_col_tpl',
	 	'left_col_width',
	 	'center_col_tpl',
	 	'center_col_width',
	 	'right_col_tpl',
	 	'right_col_width',
	 	'footer_tpl'
	 )
}
{foreach $options_list as $key}
	{set $options = $options|merge( hash( $key, first_set( $pagedata.persistent_variable.$key, ezini('Pagelayout', $key, 'design.ini' ) ) ) )}
{/foreach}

{def $pagedata = ezpagedata( )
	 $pagestyle        = $pagedata.css_classes
     $locales          = fetch( 'content', 'translation_list' )
     $view_parameters = cond(is_set($module_result.view_parameters),$module_result.view_parameters,array())}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

	{include uri='design:page_head.tpl'}
	{include uri='design:page_head_style.tpl'}
	{include uri='design:page_head_script.tpl'}

</head>
<body>
<!-- Complete page area: START -->

<div id="page">
    {if and( is_set( $pagedata.persistent_variable.extra_template_list ),
             $pagedata.persistent_variable.extra_template_list|count() )}
    {foreach $pagedata.persistent_variable.extra_template_list as $extra_template}
        {include uri=concat('design:extra/', $extra_template)
        		 view_parameters=$view_parameters}
    {/foreach}
    {/if}
	
    {if first_set($options['header_tpl'])}
	<!-- Header area: START -->
    	{include uri=concat('design:',$options['header_tpl'])
    			 view_parameters=$view_parameters}
    <!-- Header area: END -->
    {/if}

    {if first_set($options['top_menu_tpl'])}
    	<!-- Top menu area: START -->
	        {include uri=concat('design:',$options['top_menu_tpl'])
	        		 view_parameters=$view_parameters}
	    <!-- Top menu area: END -->
    {/if}
	{cache-block keys=array($cache_uri)}
	    {if $options['top_path_tpl'])}
	    <!-- Path area: START -->
	        {include uri=concat('design:',$options['top_path_tpl'])
	        		 view_parameters=$view_parameters}
	    <!-- Path area: END -->
	    {/if}
    {/cache-block}

    {if and( $pagedata.website_toolbar, $pagedata.is_edit|not)}
    <!-- Toolbar area: START -->
        {*include uri='design:page_toolbar.tpl'*}
    <!-- Toolbar area: END -->
    {/if}

    <!-- Columns area: START -->
    <div class="row-fluid cols">
    
        {if first_set($options['left_col_tpl'])}
        <!-- Left area: START -->
	        {include uri=concat('design:',$options['left_col_tpl'])
	        		 view_parameters=$view_parameters
	        		 width=$options['left_col_width']}
        <!-- Left area: END -->
        {/if}
        
        {if first_set($options['center_col_tpl'])}
        <!-- Center area: START -->
	        {include uri=concat('design:',$options['center_col_tpl'])
	        		 view_parameters=$view_parameters
	        		 width=$options['center_col_width']}
        <!-- Center area: END -->
        {/if}

		
        {if first_set($options['right_col_tpl'])}
    	<!-- Right area: START -->
        	{include uri=concat('design:',$options['right_col_tpl'])
        			 view_parameters=$view_parameters
        			 width=$options['right_col_width']}
        <!-- Right area: END -->
        {/if}
            
    </div>
    <!-- Columns area: END -->
    
    {if first_set($options['footer_tpl'])}
	<!-- Footer area: START -->
    	{include uri=concat('design:',$options['footer_tpl'])
    			 view_parameters=$view_parameters}
    <!-- Footer area: END -->
    {/if}
    
{* This comment will be replaced with actual debug report (if debug is on). *}
<!--DEBUG_REPORT-->
</div>
<!-- Complete page area: END -->

<!-- Footer script area: START -->
{include uri='design:page_footer_script.tpl'}
<!-- Footer script area: END -->

</body>
</html>
