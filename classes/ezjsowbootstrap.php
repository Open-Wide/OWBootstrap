<?php

class ezJsOWBootstrap
{

	public static function createRteGridOptions( $args )
    {

        $tpl = eZTemplate::factory();
        $body = $tpl->fetch( 'design:ajax/rte_grid_options.tpl' );

        return $body;
    }

}
?>
