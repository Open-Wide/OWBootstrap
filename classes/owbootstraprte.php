<?php

class OWBootstrapRte
{
	
	static public function getClass( $bootstrapGroup, $bootstrapId ) {
		
		$bsini = eZINI::instance( 'owbootstrap.ini' );
		$class='';
		
		if ( $bsini->hasVariable( 'RteClass', $bootstrapId ) ) {
			$class .= $bsini->variable( 'RteClass', $bootstrapId );
		}
		
		if ( $bsini->hasVariable( 'RteClassGroup', $bootstrapGroup ) ) {
			$class .= ' '.$bsini->variable( 'RteClassGroup', $bootstrapGroup );
		}
		
		return trim($class)?trim($class):$bootstrapId;
	}
	
}
?>
