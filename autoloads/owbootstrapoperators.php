<?php

class OWBootStrapOperators
{
    /*!
     Constructor
    */
    function OWBootStrapOperators()
    {
        $this->Operators = array( 
        							'classByGroups',
        							'get_ini_classes',
        							'strtoid',
        							'server_variable'
        );
    }

    /*!
     Returns the operators in this class.
    */
    function &operatorList()
    {
        return $this->Operators;
    }

    /*!
     \return true to tell the template engine that the parameter list
    exists per operator type, this is needed for operator classes
    that have multiple operators.
    */
    function namedParameterPerOperator()
    {
        return true;
    }

    /*!
     Both operators have one parameter.
     See eZTemplateOperator::namedParameterList()
    */
    function namedParameterList()
    {

		return array ( 		
		                'server_variable' => array( ),
						'strtoid' => array( ),
				  		);
    }

    /*!
     \Executes the needed operator(s).
     \Checks operator names, and calls the appropriate functions.
    */
    function modify( &$tpl, &$operatorName, &$operatorParameters, &$rootNamespace,
                     &$currentNamespace, &$operatorValue, &$namedParameters )
    {
        switch ( $operatorName )
        {
			case 'server_variable':
				$operatorValue = $_SERVER[$operatorValue];
			break;
			
			case 'strtoid':
				$operatorValue = eZURLAliasML::convertToAliasCompat( str_replace( '/', '_', $operatorValue ) );
			break;
    	}
    }

    /// \privatesection
    var $Operators;
}

?>