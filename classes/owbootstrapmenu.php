<?php


class OWBootstrapMenu
{
	
	/**
	 * 
	 */
	public function buildMenu ( $ini_section, $ini_file='content.ini' ) {
		
		if ( $ini_section ) {
			$classes = $this->get_ini_classes( $ini_section, $ini_file );
		}
		return '';
	}
	
	public function recursiveMenu ( $root, $current, $depth, $classes, $view='link', $ul_classes=array() ) {
	
		// TODO
	}
	
	/**
	 * Get class ids from $ini_section and $ini_file.
	 * Parse $ini_file and get classes from ClassGroups[] and Classes[] settings in $ini_section
	 * 
	 * @param string $ini_section
	 * @param string $ini_file
	 * @return array
	 */
	public function get_ini_classes( $ini_section, $ini_file='content.ini' ) {
		if ( $ini_section ) {
			$classes = array();
			$ini = eZINI::instance( $ini_file );
			if ( $ini->hasVariable( $ini_section, 'ClassGroups' ) ) {
				$classes = eZContentClassClassGroup::fetchClassListByGroups( 0, $ini->variable( $ini_section, 'ClassGroups' ), false );
			}
			if ( $ini->hasVariable( $ini_section, 'Classes' ) ) {
				$classes = array_merge( (array)$classes, (array)$ini->variable( $ini_section, 'Classes' ) );
			}
			return $classes;
		}
		return $array;
	}
	
}
?>
