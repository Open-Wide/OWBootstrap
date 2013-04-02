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
                /*init : function(ed, url) {
                        // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceBootstrap');
	                	ed.onPreInit.add(function() {
		                        // Allow video elements
		                        ed.schema.addValidElements('bootstrap[*]');
		
		                });
                	
                		ed.addCommand('mceBootstrap', function() {
                			console.dir(ed.selection.getNode());
                			var parent = ed.dom.getParent(ed.selection.getNode());
                			console.log(parent);
                			if (parent) {
	                		    tinyMCE.execCommand('mceRemoveNode', false, parent);
	                		}

	                		ed.selection.setNode(ed.dom.create('div', {title: 'bootstrap', 'type': "bootstrap", 'class': "ezoeBootstrap"}, ed.selection.getContent()));
	                		
                		});
	                	
	                	ed.addButton('bootstrap', {
	                	    title : 'bootstrap',
	                	    cmd : 'mceBootstrap',
	                	    image : '/extension/owbootstrap/design/admin2/javascript/plugins/bootstrap/img/bootstrap.gif'
	                	});
	                	
	                	ed.onPreProcess.add(function(ed, o) {
	                	    tinymce.each(ed.dom.select('div.mceBootstrap', o.node), function(n) {
	                	        ed.dom.replace(ed.dom.create('bootstrap', null, n.innerHTML), n);
	                	    });
	                	});
	                	
	                	ed.onSetContent.add(function(ed, o) {
	                	    tinymce.each(ed.getDoc().getElementsByTagName("bootstrap"), function(n) {
	                	        ed.dom.replace(ed.dom.create('div', {title: 'bootstrap', 'type': "bootstrap", 'class': "ezoeBootstrap"}, n.innerHTML), n);
	                	    });
	                	});

                },*/
        	init : function(ed, url) {
        		//this.editor = ed;
	                // Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceBootstrap');

	                // Register commands
	                /*ed.addCommand('mceBootstrap', function() {
	                    //ed.execCommand('mceCustom', false, 'bootstrap');
	                    ed.execCommand('generalXmlTagPopup', '_generic/popup/', 'bootstrap', 0, 0, false);

	                });*/

	        		ed.addCommand('mceBootstrap', function(ui, bsid) {
	        			//console.dir(ed.selection.getNode());
	        			function getRootParent(n) {
		        			while ( n && n.nodeName !== undefined && n.nodeName !== 'BODY' )
		                    {
		                        if ( n.getAttribute('data-bsgroup') === 'root' )
		                        {
		                            return n;
		                        }
		                        n = n.parentNode;
		                    }
		        			return n;
	        			}
	        			//console.dir(ed.selection.getNode());
	        			var root = getRootParent(ed.selection.getNode());
	        			
	        			if (root.getAttribute('data-bsgroup') === 'root') {
	        				tinyMCE.activeEditor.selection.select(root);
	        				var root_bs_id = root.getAttribute('data-bsid');
	        			} else {
	        				var root_bs_id = 'gridfluid';
	        			}
	        			
	        			ed.windowManager.open({
                            file : url + '/bootstrap_dialog.htm',
                            width : 580 + parseInt(ed.getLang('bootstrap.delta_width', 0)),
                            height : 380 + parseInt(ed.getLang('bootstrap.delta_height', 0)),
                            inline : 1
	                    }, {
	                            plugin_url : url, // Plugin absolute URL
	                            root_bsid: root_bs_id
	                            //some_custom_arg : 'custom arg' // Custom argument
	                            
	                    });
		            });
	                            
	                // Register buttons
	                // ed.addButton('bootstrap', {title : 'bootstrap', cmd : 'mceBootstrap', image : url + '/img/bootstrap.gif'});
	                
	                // Register bootstrap button
	                ed.addButton('bootstrap', {
	                        title : 'bootstrap',
	                        cmd : 'mceBootstrap',
	                        image : '/extension/owbootstrap/design/owbootstrap/javascript/plugins/bootstrap/img/bootstrap.gif'
	                });
	                /*ed.onNodeChange.add(function(ed, cm, n) {
	                    cm.setActive('bootstrap', n.nodeName === 'SPAN');
	                });*/
	                
	                ed.onNodeChange.add(function(ed, cm, n, co) {
	                	
	                	/*tinymce.each(t.stateControls, function(c) {
	                        cm.setActive(c, ed.queryCommandState(t.controls[c][1]));
	                    });*/
	                	cm.setActive('bootstrap', true);
	                        /*cm.setDisabled('bootstrap', co && n.nodeName != 'DIV');
	                        cm.setActive('bootstrap', n.nodeName == 'DIV' && !n.name);*/
	                	//cm.setDisabled('bootstrap', co && n.nodeName != 'DIV' && DOM.getAttrib(p, 'data-bsgroup') === 'root');
	                });
	
	                
	
	                // Add a node change handler, selects the button in the UI when a image is selected
	                /*ed.onNodeChange.add(function(ed, cm, n) {
	                        cm.setActive('bootstrap', n.nodeName == 'IMG');
	                });*/
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
