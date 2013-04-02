<?php

// Operator autoloading

$eZTemplateOperatorArray = array();

$eZTemplateOperatorArray[] =
  	array( 
  		'script' => 'extension/owbootstrap/autoloads/owbootstrapoperators.php',
        'class' => 'OWBootStrapOperators',
        'operator_names' => array( 
        	'server_variable',
        	'strtoid'
		),
	);


?>