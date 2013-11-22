/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */


(function() {
        // Load plugin specific language pack
        tinymce.PluginManager.requireLangPack('bootstrap');

        tinymce.create('tinymce.plugins.BootstrapPlugin', {
                /**
                 * Initializes the plugin, this will be executed after the plugin has been created.
                 * This call is done before the editor instance has finished it's initialization so use the onInit event
                 * of the editor instance to intercept that event.
                 *
                 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
                 * @param {string} url Absolute URL to where the plugin is located.
                 */
                
        	init : function(ed, url) {

        			/***********************************************************************
        			* Récupère le noeud parent selon le tag "tag", la classe "className"
        			* et le type "type"
        			***********************************************************************/
        			var getParentByTag = function( n, tag, className, type, checkElement ) {
			            if ( className ) className = ' ' + className + ' ';
			            tag = ',' + tag.toUpperCase() + ',';
			            while ( n && n.nodeName !== undefined && n.nodeName !== 'BODY' )
			            {
			                if ( checkElement && tag.indexOf( ',' + n.nodeName + ',' ) !== -1
			                && ( !className || (' ' + n.className + ' ').indexOf( className ) !== -1 )
			                && ( !type || n.getAttribute('type') === type ) )
			                {
			                    return n;
			                }
			                n = n.parentNode;
			                checkElement = true;
			            }
			            return false;
			        }

			        /***********************************************************************
        			* Action Bootstrap au clic sur le bouton
        			***********************************************************************/
	        		ed.addCommand('mceBootstrap', function(ui, bsid) {

	        			// On récupère la racine bootstrap
	        			var root = getParentByTag( ed.selection.getNode(), 'DIV', 'rteBootstrap', false, true );
	        			
	        			// Sélection de tout le bloc bootstrap + récupération des paramètres (grid fixe/fluide)
	        			if (root && root.nodeName !== undefined && root.getAttribute('data-bsgroup') === 'root') {
	        				tinyMCE.activeEditor.selection.select(root);
	        				var root_bsid = root.getAttribute('data-bsid');
	        				var root_bsclass = root.getAttribute('data-bsclass');
	        			} else {
	        				var root_bsid = 'gridfluid';
	        				var root_bsclass = '';
	        			}
	        			
	        			// Ouverture de la popin en conservant les paramètres (grid fixe/fluide)
	        			ed.windowManager.open({
                            file : url + '/bootstrap_dialog.htm',
                            width : 780 + parseInt(ed.getLang('bootstrap.delta_width', 0)),
                            height : 430 + parseInt(ed.getLang('bootstrap.delta_height', 0)),
                            inline : 1
	                    }, {
	                        plugin_url : url, // Plugin absolute URL
	                        root_bsid: root_bsid,
	                        root_bsclass: root_bsclass
	                        //some_custom_arg : 'custom arg' // Custom argument
	                    });

		            });

	                // Register bootstrap button
	                ed.addButton('bootstrap', {
	                        title : 'bootstrap',
	                        cmd : 'mceBootstrap',
	                        image : '/extension/owbootstrap/design/owbootstrap/javascript/plugins/bootstrap/img/bootstrap.gif'
	                });

	                
	                /***********************************************************************
        			* Autorisation / Interdiction selon l'appui sur les touches clavier
        			* 	- Empêcher la suppression d'un bloc
        			***********************************************************************/
	                var bootstrapControl = function(ed, e) { 

	                	// Récupération de l'entrée clavier
	                	e = e || window.event;
	                	var Event = tinymce.dom.Event
	                	var DOM = tinymce.DOM;
            			var k = e.which || e.keyCode;

            			// Don't block arrow keys, page up/down, and F1-F12
			            if ((k > 32 && k < 41) || (k > 111 && k < 124))
			                return true;

            			var node = ed.selection.getNode();
            			
            			// Vérifie si le noeud sélectionné est de type bootstrap (<div type="bootstrap">)
            			var isBootstrap = false;
            			if ( node !== undefined && node.nodeName === 'DIV' && DOM.getAttrib(node, 'type') === 'bootstrap') {
            				isBootstrap = true;
            			}

            			// Vérifie si le noeud sélectionné est un container bootstrap (root ou grid)
            			var isContainer = false;
            			if ( node !== undefined && node.nodeName === 'DIV' && 
            					new RegExp("^(root|.*container.*)$","g").test(DOM.getAttrib(node, 'data-bsgroup')) ) {
            				isContainer = true;
            			}
            			
            			// Vérifie si le noeud sélectionné est inclus dans un container bootstrap
			            var isInBootstrap = false;
			            var container = getParentByTag( node, 'DIV', false, 'bootstrap', true );
			    		if ( container !== undefined && container.nodeName === 'DIV' && DOM.getAttrib(container, 'type') === 'bootstrap') {
			    			isInBootstrap = true;
			    		}

			    		// Récupère la racine bootstrap
			            var root = getParentByTag( node, 'DIV', 'rteBootstrap', false, true );

			            // Si le noeud est concerné par bootstrap
			    		if ( isBootstrap || isInBootstrap ) {
				    		if ( k === 8 || k === 46 ) { // User clicks del or backspace

				    			// Correction d'un bug WebKit
				    			if (tinymce.isWebKit && node.nodeName == 'SPAN') {
				    				node = node.parentNode;
				    			}

				    			if (isContainer) {
				    				if( !confirm("Remove bootstrap block ?") ) {
				    					return Event.cancel(e);
				    				} else {
				    					return true;
				    				}
				    			}
				    			// On annule la suppression dans le cas d'un div bootstrap dans un container
				            	if (isBootstrap && !isContainer) {
					    			return Event.cancel(e);
					    		}

					    		// On annule la suppression si elle risque de supprimer le container
				            	if ( isInBootstrap && !isContainer ) {

				            		if (container.firstChild == node) {
				            			var range = ed.selection.getRng();
				            			if (range.startOffset == 0) {
				            				return Event.cancel(e);
				            			}
				            		}
				            		return true;
				                }
				            } else if ( k === 13 ) {

				            	// user clicks enter, create paragraph after bootstrap container
				            	if (isBootstrap) {
				            		var newNode;
				                    newNode = ed.dom.create('p', false, tinymce.isIE ? '&nbsp;' : '<br />' );
				                    newNode = ed.dom.insertAfter( newNode, root );
				                    ed.nodeChanged();
				                    ed.selection.select( newNode, true );
				                }
				            }

				            // On empêche d'écrire directement dans un container
				    		if (isBootstrap && !isContainer) {
				    			return Event.cancel(e);
				    		}
			    		}
            			
	                }

	                /***********************************************************************
        			* Déclenchement de bootstrapControl() à l'appui d'un touche
        			***********************************************************************/
	                /*ed.onKeyDown.addToTop( BIND( t.__block, t ) );
	                ed.onKeyPress.addToTop( BIND( t.__block, t ) );
	                ed.onKeyUp.addToTop( BIND( t.__block, t ) );
	                ed.onPaste.addToTop( BIND( t.__block, t ) );*/
	                ed.onKeyDown.add(function(ed, e) {
				        return bootstrapControl(ed, e);
				    });


	                /***********************************************************************
        			* Lorsque le curseur se déplace
        			***********************************************************************/
	                ed.onNodeChange.add(function(ed, cm, n, co) {
	                	
	                	// Dans le cas d'un container bootstrap
		                if( ed.dom.getAttrib(n, 'type') === 'bootstrap' ) {
		                	var Event = tinymce.dom.Event, de = 0;

		                	// On désactive tous les boutons de la barre d'outils
		                	tinymce.each(ed.controlManager.controls, function(c) {
				                c.setDisabled( true );
				            });

				            // On active le bouton bootstrap
		                	cm.setDisabled('bootstrap', false);
		                	cm.setActive('bootstrap', true);
		                	
		                	var root = getParentByTag( n, 'DIV', 'rteBootstrap', false, true );

		                	// Création du fil d'ariane dans la barre du bas
	                        pi = tinymce.DOM.create('a', {'href' : "javascript:;", role: 'button', onmousedown : "return false;", title : 'class: rteBootstrap', 'class' : 'mcePath_' + (de++), 'onclick' : 'return false;'}, 'bootstrap');
	                        Event.add( pi, 'click', function(e){
	                            ed.execCommand( 'mceBootstrap', true, tinymce.DOM.getAttrib(root, 'data-bsid') );
	                        });
		                    p = tinymce.DOM.get(ed.id + '_path') || tinymce.DOM.add(ed.id + '_path_row', 'span', {id : ed.id + '_path'});
		                    while (p.firstChild) {
							  p.removeChild(p.firstChild);
							}
							p.appendChild(pi);

							// Sélection de tout le bloc bootstrap
		        			if (root.getAttribute('data-bsgroup') === 'root') {
		        				tinymce.activeEditor.selection.select(root);
		        			}

							// On supprime l'appel à la méthode onNodeChange par défaut
		                    return false;

		                } else {
		                	// Si nous sommes à l'intérieur un container bootstrap
		                	var container = getParentByTag( n, 'DIV', false, 'bootstrap', true );
				    		if ( container !== undefined && container.nodeName === 'DIV' && tinymce.DOM.getAttrib(container, 'type') === 'bootstrap') {
				    			
								// On active le bouton bootstrap
				    			cm.setActive('bootstrap', true);

				    			// Si le container est vide, on crée un paragraphe à l'intérieur
				    			if (container.innerHTML == '<br>' || container.innerHTML.length < 1 ) {
				    				var newNode;
				                    newNode = ed.dom.create('p', false, tinymce.isIE ? '&nbsp;' : '<br />' );

				                    while (container.firstChild) {
									  container.removeChild(container.firstChild);
									}
									container.appendChild(newNode);
				                    ed.selection.select( container.firstChild, true );
				                    ed.nodeChanged();
				    			}
				    		} else {
				    			// Sinon on désactive la surbrillance du bouton bootstrap
				    			cm.setActive('bootstrap', false);
				    		}
		                }
		            });

	        },

                /**
                 * Creates control instances based in the incomming name. This method is normally not
                 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
                 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
                 * method can be used to create those.
                 *
                 * @param {String} n Name of the control to create.
                 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
                 * @return {tinymce.ui.Control} New control instance or null if no control was created.
                 */
                createControl : function(n, cm) {
                        return null;
                },

                /**
                 * Returns information about the plugin as a name/value array.
                 * The current keys are longname, author, authorurl, infourl and version.
                 *
                 * @return {Object} Name/value array containing information about the plugin.
                 */
                getInfo : function() {
                        return {
                                longname : 'Bootstrap plugin',
                                author : 'Some author',
                                authorurl : 'http://tinymce.moxiecode.com',
                                infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/bootstrap',
                                version : "1.0"
                        };
                }
        });

        // Register plugin
        tinymce.PluginManager.add('bootstrap', tinymce.plugins.BootstrapPlugin);

})();
