<?php
//
// Created on: <06-Nov-2002 15:10:02 wy>
// Forked on: <20-Des-2007 13:02:06 ar> from eZDHTMLInput class
//
// ## BEGIN COPYRIGHT, LICENSE AND WARRANTY NOTICE ##
// SOFTWARE NAME: eZ Online Editor extension for eZ Publish
// SOFTWARE RELEASE: 4.7.0
// COPYRIGHT NOTICE: Copyright (C) 1999-2012 eZ Systems AS
// SOFTWARE LICENSE: eZ Business Use License Agreement eZ BUL Version 2.1
// NOTICE: >
//   This source file is part of the eZ Publish CMS and is
//   licensed under the terms and conditions of the eZ Business Use
//   License v2.1 (eZ BUL).
// 
//   A copy of the eZ BUL was included with the software. If the
//   license is missing, request a copy of the license via email
//   at license@ez.no or via postal mail at
//  	Attn: Licensing Dept. eZ Systems AS, Klostergata 30, N-3732 Skien, Norway
// 
//   IMPORTANT: THE SOFTWARE IS LICENSED, NOT SOLD. ADDITIONALLY, THE
//   SOFTWARE IS LICENSED "AS IS," WITHOUT ANY WARRANTIES WHATSOEVER.
//   READ THE eZ BUL BEFORE USING, INSTALLING OR MODIFYING THE SOFTWARE.

// ## END COPYRIGHT, LICENSE AND WARRANTY NOTICE ##
//


/*! \file ezoexmlinput.php
*/

/*!
  \class eZOEXMLInput
  \brief The class eZOEXMLInput does

*/
class OWBootstrapeZOEXMLInput extends eZOEXMLInput
{

	/**
	 * validateInput
	 * Validates and parses input using {@link eZOEInputParser::process}
	 * and saves data if valid.
	 *
	 * @param eZHTTPTool $http
	 * @param string $base
	 * @param eZContentObjectAttribute $contentObjectAttribute
	 * @return int signals if status is valid or not
	 */
	function validateInput( $http, $base, $contentObjectAttribute )
	{
		if ( !$this->isEditorEnabled() )
		{
			$aliasedHandler = $this->attribute( 'aliased_handler' );
			return $aliasedHandler->validateInput( $http, $base, $contentObjectAttribute );
		}
		if ( $http->hasPostVariable( $base . '_data_text_' . $contentObjectAttribute->attribute( 'id' ) ) )
		{
			$text = $http->postVariable( $base . '_data_text_' . $contentObjectAttribute->attribute( 'id' ) );
	
			if ( self::browserSupportsDHTMLType() === 'Trident' ) // IE
			{
				$text = str_replace( "\t", '', $text);
			}
	
			eZDebugSetting::writeDebug( 'kernel-datatype-ezxmltext-ezoe',
					$text,
					__METHOD__ . ' html from client' );
			
			
			/*****************************************************************
			 * MODIFIED BY OW
			 */
			$parser = new OWBootstrapeZOEInputParser();
			/*****************************************************************
			 * // MODIFIED BY OW
			*/
			
			
			
			$document = $parser->process( $text );
	
			// Remove last empty paragraph (added in the output part)
			$parent = $document->documentElement;
			$lastChild = $parent->lastChild;
			while( $lastChild && $lastChild->nodeName !== 'paragraph' )
			{
				$parent = $lastChild;
				$lastChild = $parent->lastChild;
			}
	
			if ( $lastChild && $lastChild->nodeName === 'paragraph' )
			{
				$textChild = $lastChild->lastChild;
				// $textChild->textContent == " " : string(2) whitespace in Opera
				if ( !$textChild ||
						( $lastChild->childNodes->length == 1 &&
								$textChild->nodeType == XML_TEXT_NODE &&
								( $textChild->textContent == " " || $textChild->textContent == ' ' || $textChild->textContent == '' || $textChild->textContent == '&nbsp;' ) ) )
				{
					$parent->removeChild( $lastChild );
				}
			}
	
			$oeini = eZINI::instance( 'ezoe.ini' );
			$validationParameters = $contentObjectAttribute->validationParameters();
			if ( !( isset( $validationParameters['skip-isRequired'] ) && $validationParameters['skip-isRequired'] === true )
					&& $parser->getDeletedEmbedIDArray( $oeini->variable('EditorSettings', 'ValidateEmbedObjects' ) === 'enabled' ) )
			{
				self::$showEmbedValidationErrors = true;
				$contentObjectAttribute->setValidationError( ezpI18n::tr( 'design/standard/ezoe/handler',
						'Some objects used in embed(-inline) tags have been deleted and are no longer available.' ) );
				return eZInputValidator::STATE_INVALID;
			}
	
			if ( $contentObjectAttribute->validateIsRequired() )
			{
				$root = $document->documentElement;
				if ( $root->childNodes->length == 0 )
				{
					$contentObjectAttribute->setValidationError( ezpI18n::tr( 'kernel/classes/datatypes',
							'Content required' ) );
					return eZInputValidator::STATE_INVALID;
				}
			}
	
			// Update URL-object links
			$urlIDArray = $parser->getUrlIDArray();
			if ( !empty( $urlIDArray ) )
			{
				self::updateUrlObjectLinks( $contentObjectAttribute, $urlIDArray );
			}
	
			$contentObject = $contentObjectAttribute->attribute( 'object' );
			$contentObject->appendInputRelationList( $parser->getEmbeddedObjectIDArray(),
					eZContentObject::RELATION_EMBED );
			$contentObject->appendInputRelationList( $parser->getLinkedObjectIDArray(),
					eZContentObject::RELATION_LINK );
	
			$xmlString = eZXMLTextType::domString( $document );
	
			eZDebugSetting::writeDebug( 'kernel-datatype-ezxmltext-ezoe',
					$xmlString,
					__METHOD__ . ' generated xml' );
	
			$contentObjectAttribute->setAttribute( 'data_text', $xmlString );
			$contentObjectAttribute->setValidationLog( $parser->Messages );
	
			return eZInputValidator::STATE_ACCEPTED;
		}
		else
		{
			return eZInputValidator::STATE_ACCEPTED;
		}
	}
	
	

    /*!
     \private
     \return the user input format for the given section
    */
    function &inputSectionXML( &$section, $currentSectionLevel, $tdSectionLevel = null )
    {
        $output = '';
        eZDebug::writeError('OWBOOTSTRAP BEGIN PARSING');
        foreach ( $section->childNodes as $sectionNode )
        {
            if ( $tdSectionLevel == null )
            {
                $sectionLevel = $currentSectionLevel;
            }
            else
            {
                $sectionLevel = $tdSectionLevel;
            }

            $tagName = $sectionNode instanceof DOMNode ? $sectionNode->nodeName : '';

            switch ( $tagName )
            {
                case 'header' :
                {
                    $headerClassName = $sectionNode->getAttribute( 'class' );
                    $headerAlign = $sectionNode->getAttribute( 'align' );
                    $customAttributePart = self::getCustomAttrPart( $sectionNode, $styleString );

                    if ( $headerClassName )
                    {
                        $customAttributePart .= ' class="' . $headerClassName . '"';
                    }

                    if ( $headerAlign )
                    {
                        $customAttributePart .= ' align="' . $headerAlign . '"';
                    }

                    $tagContent = '';
                    // render children tags
                    $tagChildren = $sectionNode->childNodes;
                    foreach ( $tagChildren as $childTag )
                    {
                        $tagContent .= $this->inputTagXML( $childTag, $currentSectionLevel, $tdSectionLevel );
                        eZDebugSetting::writeDebug( 'kernel-datatype-ezxmltext',
                                                    $tagContent,
                                                    __METHOD__ . ' tag content of <header>' );
                    }

                    switch ( $sectionLevel )
                    {
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                        case '6':
                        {
                            $level = $sectionLevel;
                        }break;
                        default:
                        {
                            $level = 1;
                        }break;
                    }
                    $archorName = $sectionNode->getAttribute( 'anchor_name' );
                    if ( $archorName != null )
                    {
                        $output .= "<h$level$customAttributePart$styleString><a name=\"$archorName\"" .
                                   ' class="mceItemAnchor"></a>' . $sectionNode->textContent. "</h$level>";
                    }
                    else
                    {
                        $output .= "<h$level$customAttributePart$styleString>" . $tagContent . "</h$level>";
                    }

                }break;

                case 'paragraph' :
                {
                    if ( $tdSectionLevel == null )
                    {
                        $output .= $this->inputParagraphXML( $sectionNode, $currentSectionLevel );
                    }
                    else
                    {
                        $output .= $this->inputParagraphXML( $sectionNode,
                                                             $currentSectionLevel,
                                                             $tdSectionLevel );
                    }
                }break;

                case 'section' :
                {
                    $sectionLevel += 1;
                    if ( $tdSectionLevel == null )
                    {
                        $output .= $this->inputSectionXML( $sectionNode, $sectionLevel );
                    }
                    else
                    {
                        $output .= $this->inputSectionXML( $sectionNode,
                                                           $currentSectionLevel,
                                                           $sectionLevel );
                    }
                }break;

                case '#text' :
                {
                    //ignore whitespace
                }break;
				
                
                /*****************************************************************
                 * MODIFIED BY OW
                */
                case 'bootstrap' :
                	{

                		$tagContent = $this->inputSectionXML( $sectionNode, $currentSectionLevel, $sectionLevel );

                		$className = OWBootstrapRte::getClass( $sectionNode->getAttribute( 'data-bsgroup' ), $sectionNode->getAttribute( 'data-bsid' ) );
                		
                		$output .= '<div class="'.$className.'" '.
		                				'type="bootstrap" '.
		                				'data-bsid="' . 	$sectionNode->getAttribute( 'data-bsid' ) . '" '.
		                				'data-bsgroup="' . 	$sectionNode->getAttribute( 'data-bsgroup' ) . '" >' . 
		                					$tagContent . 
                					'</div>';

                }break;
                /*****************************************************************
                 * //MODIFIED BY OW
                */
                
                	
                default :
                {
                    eZDebug::writeError( "Unsupported tag at this level: $tagName", __METHOD__ );
                }break;
            }
        }
        return $output;
    }

}

?>
