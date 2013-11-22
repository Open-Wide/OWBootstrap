<?php

class OWBootstrapRte
{
	
	static public function getClass( $bootstrapGroup, $bootstrapId, $bootstrapClass ) {
		if ($bootstrapClass) {
			return $bootstrapClass;
		}

		$class = array();
		$bsini = eZINI::instance( 'owbootstrap.ini' );
		
		if ( $bsini->hasVariable( 'RteClass', $bootstrapId ) ) {
			$class[] = $bsini->variable( 'RteClass', $bootstrapId );
		}
		if ( $bsini->hasVariable( 'RteClassGroup', $bootstrapGroup ) ) {
			$class[] = $bsini->variable( 'RteClassGroup', $bootstrapGroup );
		}
		
		return implode(' ', $class);
	}
	
}
?>
