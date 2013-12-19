<?php

class OWBootstrapRte
{
	
	static public function getClass( $bootstrapClass, $bootstrapGroup ) {
		if ($bootstrapClass) {
			return $bootstrapClass;
		}

		$class = array();
		$bsini = eZINI::instance( 'owbootstrap.ini' );

		if ( $bsini->hasVariable( 'RteClassGroup', $bootstrapGroup ) ) {
			return $bsini->variable( 'RteClassGroup', $bootstrapGroup );
		}
		
		return '';
	}
	
}
?>
