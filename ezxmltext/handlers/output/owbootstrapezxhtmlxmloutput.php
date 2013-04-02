<?php
/**
 * File containing the eZXHTMLXMLOutput class.
 *
 * @copyright Copyright (C) 1999-2012 eZ Systems AS. All rights reserved.
 * @license http://ez.no/Resources/Software/Licenses/eZ-Business-Use-License-Agreement-eZ-BUL-Version-2.1 eZ Business Use License Agreement eZ BUL Version 2.1
 * @version 4.7.0
 * @package kernel
 */

class OWBootstrapeZXHTMLXMLOutput extends eZXHTMLXMLOutput
{

    public $OutputTags = array(
	
	    'section'      => array( 'quickRender' => true,
	                             'initHandler' => 'initHandlerSection',
	                             'renderHandler' => 'renderChildrenOnly' ),
	
	    'embed'        => array( 'initHandler' => 'initHandlerEmbed',
	                             'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification',
	                                                           'xhtml:id' => 'id',
	                                                           'object_id' => false,
	                                                           'node_id' => false,
	                                                           'show_path' => false ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'embed-inline' => array( 'initHandler' => 'initHandlerEmbed',
	                             'renderHandler' => 'renderInline',
	                             'attrNamesTemplate' => array( 'class' => 'classification',
	                                                           'xhtml:id' => 'id',
	                                                           'object_id' => false,
	                                                           'node_id' => false,
	                                                           'show_path' => false ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'table'        => array( 'initHandler' => 'initHandlerTable',
	                             'leavingHandler' => 'leavingHandlerTable',
	                             'renderHandler' => 'renderAll',
	                             'contentVarName' => 'rows',
	                             'attrNamesTemplate' => array( 'class' => 'classification',
	                                                           'width' => 'width' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'tr'           => array( //'quickRender' => array( 'tr', "\n" ),
	                             'initHandler' => 'initHandlerTr',
	                             'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'td'           => array( 'initHandler' => 'initHandlerTd',
	                             'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'xhtml:width' => 'width',
	                                                           'xhtml:colspan' => 'colspan',
	                                                           'xhtml:rowspan' => 'rowspan',
	                                                           'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'th'           => array( 'initHandler' => 'initHandlerTd',
	                             'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'xhtml:width' => 'width',
	                                                           'xhtml:colspan' => 'colspan',
	                                                           'xhtml:rowspan' => 'rowspan',
	                                                           'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'ol'           => array( 'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'ul'           => array( 'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'li'           => array( 'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'header'       => array( 'initHandler' => 'initHandlerHeader',
	                             'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'paragraph'    => array( //'quickRender' => array( 'p', "\n" ),
	                             'renderHandler' => 'renderParagraph',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'line'         => array( //'quickRender' => array( '', "<br/>" ),
	                             'renderHandler' => 'renderLine' ),
	
	    'literal'      => array( 'renderHandler' => 'renderAll',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'strong'       => array( 'renderHandler' => 'renderInline',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'emphasize'    => array( 'renderHandler' => 'renderInline',
	                             'attrNamesTemplate' => array( 'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'link'         => array( 'initHandler' => 'initHandlerLink',
	                             'renderHandler' => 'renderInline',
	                             'attrNamesTemplate' => array( 'xhtml:id' => 'id',
	                                                           'xhtml:title' => 'title',
	                                                           'url_id' => false,
	                                                           'object_id' => false,
	                                                           'node_id' => false,
	                                                           'show_path' => false,
	                                                           'ezurl_id' => false,
	                                                           'anchor_name' => false,
	                                                           'class' => 'classification' ),
	                             'attrDesignKeys' => array( 'class' => 'classification' ) ),
	
	    'anchor'       => array( 'renderHandler' => 'renderInline' ),
	
	    'custom'       => array( 'initHandler' => 'initHandlerCustom',
	                             'renderHandler' => 'renderCustom',
	                             'attrNamesTemplate' => array( 'name' => false ) ),
	    		
	    'bootstrap'       => array( 'initHandler' => 'initHandlerBootstrap',
	    						 'attrNamesTemplate' => array( 'name' => false ) ),
	
	    '#text'        => array( 'quickRender' => true,
	                             'renderHandler' => 'renderText' )
    );

    
    function initHandlerBootstrap( $element, &$attributes, &$siblingParams, &$parentParams )
    {
    	$ret = array();
    	if ( $element->getAttribute( 'data-bsid' ) != null )
    	{
    		$ret = array( 
    				'tpl_vars' => array( 
    						'class' => eZOEInputParser::tagClassNamesCleanup( OWBootstrapRte::getClass( $element->getAttribute( 'data-bsgroup' ), $element->getAttribute( 'data-bsid' ) ) )
    				)
    		);
    	}
    
    	return $ret;
    }

}

?>
