<?php

/*! \file ezoeinputparser.php
*/

/*!
  \class eZOEInputParser
  \brief The class eZOEInputParser does

*/
class OWBootstrapeZOEInputParser extends eZOEInputParser
{

    /**
     * Maps output tags (ezxml) to varius handlers at different stages
     * decide what kind of ezxml tag to use.
     *
     * @var array $OutputTags
     */
    public $OutputTags = array(
        'section'   => array(),

        'embed'     => array( 'initHandler'    => 'transformStyles',
                              'structHandler'  => 'appendLineParagraph',
                              'publishHandler' => 'publishHandlerEmbed',
                              'attributes'     => array( 'alt' => 'size',
                                                         'html_id' => 'xhtml:id' ) ),

        'embed-inline' => array( 'initHandler'    => 'transformStyles',
                                 'structHandler'  => 'appendLineParagraph',
                                 'publishHandler' => 'publishHandlerEmbed',
                                 'attributes'     => array( 'alt' => 'size',
                                                            'html_id' => 'xhtml:id' ) ),

        'table'     => array( 'initHandler'   => 'transformStyles',
                              'structHandler' => 'appendParagraph',
                              'attributes'    => array( 'border' => false,
                                                        'ezborder' => 'border' ) ),

        'tr'        => array(),

        'td'        => array( 'initHandler' => 'transformStyles',
                              'attributes'  => array( 'width' => 'xhtml:width',
                                                      'colspan' => 'xhtml:colspan',
                                                      'rowspan' => 'xhtml:rowspan' ) ),

        'th'        => array( 'initHandler' => 'transformStyles',
                              'attributes'  => array( 'width' => 'xhtml:width',
                                                      'colspan' => 'xhtml:colspan',
                                                      'rowspan' => 'xhtml:rowspan' ) ),

        'ol'        => array( 'structHandler' => 'structHandlerLists' ),

        'ul'        => array( 'structHandler' => 'structHandlerLists' ),

        'li'        => array( 'autoCloseOn' => array( 'li' ) ),

        'header'    => array( 'initHandler'   => 'initHandlerHeader',
                              'autoCloseOn'   => array( 'paragraph' ),
                              'structHandler' => 'structHandlerHeader' ),

        'paragraph' => array( 'parsingHandler' => 'parsingHandlerParagraph',
                              'autoCloseOn'    => array( 'paragraph' ),
                              'initHandler'    => 'transformStyles',
                              'structHandler'  => 'structHandlerParagraph' ),

        'line'      => array(),

        'br'        => array( 'parsingHandler' => 'breakInlineFlow',
                              'structHandler'  => 'structHandlerBr',
                              'attributes'     => false ),

        'literal'   => array( 'parsingHandler' => 'parsingHandlerLiteral',
                              'structHandler'  => 'appendParagraph',
                              'attributes'     => array( 'class' => 'class' ) ),

        'strong'    => array( 'structHandler' => 'appendLineParagraph' ),

        'emphasize' => array( 'structHandler' => 'appendLineParagraph' ),

        'link'      => array( 'structHandler'  => 'appendLineParagraph',
                              'publishHandler' => 'publishHandlerLink',
                              'attributes'     => array( 'title' => 'xhtml:title',
                                                         'id' => 'xhtml:id' ) ),

        'anchor'    => array( 'structHandler' => 'appendLineParagraph' ),

        'custom'    => array( 'initHandler'   => 'initHandlerCustom',
                              'structHandler' => 'structHandlerCustom' ),
        
        '#text'     => array( 'structHandler' => 'structHandlerText' ),
        
        // MODIFIED BY OW
        'bootstrap' => array()
    );

    
     /**
     * tagNameDivnImg (tag mapping handler)
     * Handles div|img tags and maps them to embed|embed-inline|custom tag
     *
     * @param string $tagName name of input (xhtml) tag
     * @param array $attributes byref value of tag attributes
     * @return string name of ezxml tag or blank (then tag is removed, but not it's content)
     */
    function tagNameDivnImg( $tagName, &$attributes )
    {

        $name = '';
        if ( isset( $attributes['id'] ) )
        {
            if ( strpos( $attributes['id'], 'eZObject_' ) !== false
              || strpos( $attributes['id'], 'eZNode_' ) !== false )
            {
                // decide if inline or block embed tag
                if ( isset( $attributes['inline'] ) && $attributes['inline'] === 'true' )
                    $name = 'embed-inline';
                else
                    $name = 'embed';

                unset( $attributes['inline'] );// unset internal stuff to make sure custom attr with same name works

                if ( isset( $attributes['class'] ) )
                {
                    $attributes['class'] = self::tagClassNamesCleanup( $attributes['class'] );
                }
            }
        }

        if ( $name === '' && isset( $attributes['type'] ) && $attributes['type'] === 'custom' )
        {
            $name = 'custom';
            unset( $attributes['type'] );// unset internal stuff to make sure custom attr with same name works
            if ( $tagName === 'div' )
                $attributes['children_required'] = 'true';
            $classes_array = explode( ' ', self::tagClassNamesCleanup( $attributes['class'] ) );
            $attributes['name'] = $classes_array[0];
            //eZDebug::writeError('TAG NAME : '.$attributes['name']);
            unset( $attributes['class'] );// unset internal stuff to make sure custom attr with same name works
        }
        
        
        /*****************************************************************
         * MODIFIED BY OW
        */
        if ( $name === '' && isset( $attributes['type'] ) && $attributes['type'] === 'bootstrap' )
        {
        	$name = 'bootstrap';
        	unset( $attributes['type'] );// unset internal stuff to make sure custom attr with same name works
        	if ( $tagName === 'div' )
        		$attributes['children_required'] = 'true';
        	unset( $attributes['class'] );
        	$attributes['name'] = $name;
        }
        
        /*****************************************************************
         * //MODIFIED BY OW
        */

        return $name;
    }

}

?>
