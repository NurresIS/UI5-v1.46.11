sap.ui.define(["sap/ui/core/Component","sap/ui/model/resource/ResourceModel","sap/m/MessageBox","sap/ui/core/BusyIndicator"],function(C,R,M,B){"use strict";var c="sap.ushell.plugins.rta";var a=sap.ui.core.Component.extend("sap.ushell.plugins.rta.Component",{metadata:{manifest:"json"},_getRenderer:function(){var t=this,d=new jQuery.Deferred(),r;t._oShellContainer=jQuery.sap.getObject("sap.ushell.Container");if(!t._oShellContainer){d.reject("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");}else{r=t._oShellContainer.getRenderer();if(r){d.resolve(r);}else{t._onRendererCreated=function(e){r=e.getParameter("renderer");if(r){d.resolve(r);}else{d.reject("Illegal state: shell renderer not available after recieving 'rendererCreated' event.");}};t._oShellContainer.attachRendererCreatedEvent(t._onRendererCreated);}}return d.promise();},init:function(){var t=this;this.i18n=this.getModel("i18n").getResourceBundle();this._getRenderer().fail(function(e){jQuery.sap.log.error(e,undefined,c);}).done(function(r){var A=sap.ushell.Container.getService("AppLifeCycle");A.attachAppLoaded(function(e){var u=t._checkUI5App();if(u&&!e.mParameters.homePage){t._checkRestartRTA();}});var _=function(e){var s=((sap.ui.Device.browser.msie&&sap.ui.Device.browser.version>10)||sap.ui.Device.browser.webkit||sap.ui.Device.browser.firefox||sap.ui.Device.browser.edge);if(!s){M.error(t.i18n.getText("MSG_UNSUPPORTED_BROWSER"),{title:t.i18n.getText("ERROR_TITLE"),onClose:null});}else{window.setTimeout(function(){t._switchToAdaptionMode();},0);}};r.addActionButton("sap.ushell.ui.launchpad.ActionItem",{id:"RTA_Plugin_ActionButton",text:t.i18n.getText("RTA_BUTTON_TEXT"),icon:"sap-icon://wrench",press:_},true,false,[r.LaunchpadState.App]);});},exit:function(){if(this._oShellContainer&&this._onRendererCreated){this._oShellContainer.detachRendererCreatedEvent(this._onRendererCreated);}},_checkUI5App:function(){var o=this._getCurrentRunningApplication();var u=o&&o.applicationType==="UI5";return u;},_checkRestartRTA:function(){var r=!!window.localStorage.getItem("sap.ui.rta.restart");if(r){window.localStorage.removeItem("sap.ui.rta.restart");this._switchToAdaptionMode();}},_getCurrentRunningApplication:function(){var A=sap.ushell.Container.getService("AppLifeCycle");var o=A.getCurrentApplication();return o;},_switchToDefaultMode:function(){if(this._oRTA){this._oRTA.destroy();this._oRTA=null;}},_switchToAdaptionMode:function(){var u=this._checkUI5App();if(!u){M.error(this.i18n.getText("MSG_UNSUPPORTED_APP"),{title:this.i18n.getText("ERROR_TITLE"),onClose:null});return;}var o=this._getCurrentRunningApplication();var r=o.componentInstance.getAggregation("rootControl");if(!this._oRTA){B.show(0);sap.ui.getCore().loadLibraries(["sap.ui.dt","sap.ui.rta"],{async:true}).then(function(){sap.ui.require(["sap/ui/rta/RuntimeAuthoring"],function(b){try{this._oRTA=new b({rootControl:r});this._oRTA.attachEvent('start',function(){B.hide();},this);this._oRTA.attachEvent('failed',function(){B.hide();this._switchToDefaultMode();M.error(this.i18n.getText("MSG_ADAPTUI_FAILED"),{title:this.i18n.getText("ERROR_TITLE"),onClose:null});},this);this._oRTA.start();this._oRTA.attachEvent('stop',this._switchToDefaultMode,this);}catch(e){B.hide();jQuery.sap.log.error("exception occured while starting sap.ui.rta",e.stack);this._switchToDefaultMode();M.error(this.i18n.getText("MSG_ADAPTUI_FAILED"),{title:this.i18n.getText("ERROR_TITLE"),onClose:null});}}.bind(this));}.bind(this));}}});return a;},true);
