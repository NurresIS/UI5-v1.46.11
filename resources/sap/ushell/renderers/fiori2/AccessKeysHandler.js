// @copyright@
sap.ui.define(function(){"use strict";var a=function(){};a.prototype={keyCodes:jQuery.sap.KeyCodes,bFocusOnShell:true,bFocusPassedToExternalHandlerFirstTime:true,isFocusHandledByAnotherHandler:false,fnExternalKeysHandler:null,sLastExternalKeysHandlerUrl:null,fnExternalShortcuts:null,isleftAltPressed:false,bForwardNavigation:true,appOpenedHandler:function(){var c=hasher.getHash();if(c!==this.sLastExternalKeysHandlerUrl){this.fnExternalKeysHandler=null;}this.sLastExternalKeysHandlerUrl=c;},handleSearchKey:function(){var s=sap.ui.getCore().byId('sf');if(s&&$('#sf:visible').length===0){return;}jQuery(s).click();},setFocusOnSearchButton:function(e){e.preventDefault();var s=sap.ui.getCore().byId('sf');if(s){jQuery(s).focus();}},handleSearchAppFinderKey:function(e){var b=sap.ui.getCore().byId('appFinderSearch');if(!b||jQuery('#appFinderSearch:visible').length===0){return;}else if(jQuery('.sapUshellViewPortCenter').hasClass('centerClass')){jQuery(b).focus();e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}},handleNavToMeArea:function(){var m=sap.ui.getCore().byId("meAreaHeaderButton"),M=sap.ui.getCore().byId("mainShell"),s;if(M){s=M.getController().getModelConfiguration().appState;}if(m&&!m.getSelected()&&s!="headerless"){var S=sap.ui.getCore().byId("mainShell").oController;S.loadMeAreaView();m.firePress();}setTimeout(function(){jQuery(".sapUshellActionItem:first").focus();},300);},handleSettingsButton:function(){var m=sap.ui.getCore().byId("meAreaHeaderButton");if(m&&!m.getSelected()){var s=sap.ui.getCore().byId("mainShell").oController;s.loadMeAreaView();m.firePress();}setTimeout(function(){jQuery("#userSettingsBtn").focus();},300);},handleNavToNotifications:function(){var n=sap.ui.getCore().byId("NotificationsCountButton"),m=sap.ui.getCore().byId("mainShell"),s;if(m){s=m.getController().getModelConfiguration().appState;}if(n&&s!="headerless"){n.firePress();setTimeout(function(){jQuery("#notificationsView .sapUshellNotificationsListItem:visible:first").focus();},2000);}},handleSettings:function(){var s,u=sap.ui.getCore().byId('userSettingsBtn');if(!u){s=sap.ui.getCore().byId("mainShell").oController;s.loadMeAreaView();u=sap.ui.getCore().byId('userSettingsBtn');}u.firePress();},handleAccessOverviewKey:function(){var t=sap.ushell.resources.i18n,i=this.oModel.getProperty("/searchAvailable"),m=sap.ui.getCore().byId("mainShell"),c=[],s,d,b,o;if(m){b=m.getController().getModelConfiguration().appState;}this.aShortcutsDescriptions.forEach(function(v){c.push(new sap.m.Label({text:v.text}));c.push(new sap.m.Text({text:v.description}));});if(i){c.push(new sap.m.Label({text:"Alt+F"}));c.push(new sap.m.Text({text:t.getText("hotkeyFocusOnSearchButton")}));}if(b!="headerless"){c.push(new sap.m.Label({text:"Alt+M"}));c.push(new sap.m.Text({text:t.getText("hotkeyFocusOnMeArea")}));c.push(new sap.m.Label({text:"Alt+N"}));c.push(new sap.m.Text({text:t.getText("hotkeyFocusOnNotifications")}));}c.push(new sap.m.Label({text:"Alt+S"}));c.push(new sap.m.Text({text:t.getText("hotkeyFocusOnSettingsButton")}));c.push(new sap.m.Label({text:"Ctrl+Comma"}));c.push(new sap.m.Text({text:t.getText("hotkeyOpenSettings")}));if(i){c.push(new sap.m.Label({text:"Ctrl+Shift+F"}));c.push(new sap.m.Text({text:t.getText("hotkeyFocusOnSearchField")}));}s=new sap.ui.layout.form.SimpleForm({editable:false,content:c});o=new sap.m.Button({text:t.getText("okBtn"),press:function(){d.close();}});d=new sap.m.Dialog({id:"hotKeysGlossary",title:t.getText("hotKeysGlossary"),contentWidth:"29.6rem",leftButton:o,afterClose:function(){d.destroy();}});d.addContent(s);d.open();},handleShortcuts:function(e){if(e.altKey&&!e.shiftKey&&!e.ctrlKey){switch(String.fromCharCode(e.keyCode)){case'M':this.handleNavToMeArea();break;case'N':this.handleNavToNotifications();break;case'S':this.handleSettingsButton();break;case'F':this.setFocusOnSearchButton(e);break;}}if(e.ctrlKey){if(e.shiftKey){if(e.keyCode===70){this.handleSearchKey();}}else{if(e.keyCode===188){this.handleSettings();}else if(e.keyCode===112){this.handleAccessOverviewKey();}else if(e.keyCode===83){this.handleSearchAppFinderKey(e);}}}},registerAppKeysHandler:function(h){this.fnExternalKeysHandler=h;this.sLastExternalKeysHandlerUrl=hasher.getHash();},resetAppKeysHandler:function(){this.fnExternalKeysHandler=null;},getAppKeysHandler:function(){return this.fnExternalKeysHandler;},registerAppShortcuts:function(h,s){this.fnExternalShortcuts=h;this.aShortcutsDescriptions=s;},_handleFocusBackToMe:function(e,i){this.bFocusOnShell=true;if(i){jQuery("#"+i).focus();}else if(!e){jQuery("#meAreaHeaderButton").focus();}else if(e.shiftKey){this.bForwardNavigation=false;if(e.keyCode===jQuery.sap.KeyCodes.TAB){jQuery("#sapUshellHeaderAccessibilityHelper").focus();}else if(e.keyCode===jQuery.sap.KeyCodes.F6){e.preventDefault();jQuery("#meAreaHeaderButton").focus();}}else{this.bForwardNavigation=true;e.preventDefault();if(!jQuery("#meAreaHeaderButton").length){jQuery("#sapUshellHeaderAccessibilityHelper").focus();}else{jQuery("#meAreaHeaderButton").focus();}}this.bFocusPassedToExternalHandlerFirstTime=true;},setIsFocusHandledByAnotherHandler:function(h){this.isFocusHandledByAnotherHandler=h;},sendFocusBackToShell:function(p){var e=undefined,i=undefined;var P=typeof p;if(P==="string"){i=p;}else if(P==="object"){e=p;}this._handleFocusBackToMe(e,i);},init:function(m){this.oModel=m;document.addEventListener("keydown",function(e){if(e.keyCode==jQuery.sap.KeyCodes.ARROW_UP||e.keyCode==jQuery.sap.KeyCodes.ARROW_DOWN){if(!e.ctrlKey||e.doNotInterrupt){return true;}try{var n=new Event(e.type);}catch(b){var n=document.createEvent("Event");n.initEvent("keydown",true,true);}jQuery.extend(n,e);e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();n.doNotInterrupt=true;document.dispatchEvent(n);}return true;},true);jQuery(document).on('keydown',function(e){if(e.keyCode===16){return;}if(e.shiftKey){this.bForwardNavigation=false;}else{this.bForwardNavigation=true;}if(!this.bFocusOnShell&&!this.isFocusHandledByAnotherHandler){if(this.fnExternalKeysHandler&&jQuery.isFunction(this.fnExternalKeysHandler)){this.fnExternalKeysHandler(e,this.bFocusPassedToExternalHandlerFirstTime);this.bFocusPassedToExternalHandlerFirstTime=false;}}if(e.keyCode===18){if(e.originalEvent.location===window.KeyboardEvent.DOM_KEY_LOCATION_LEFT){this.isleftAltPressed=true;}else{this.isleftAltPressed=false;}}if(this.isleftAltPressed||!e.altKey){this.handleShortcuts(e);if(this.fnExternalShortcuts){this.fnExternalShortcuts(e);}}this.setIsFocusHandledByAnotherHandler(false);}.bind(this));}};var A=new a();sap.ui.getCore().getEventBus().subscribe("sap.ushell.renderers.fiori2.Renderer","appOpened",a.prototype.appOpenedHandler.bind(A));return A;},true);
