/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/m/Dialog","sap/ui/core/HTML"],function(q,D,H){"use strict";var F={toggleFullScreen:function(c,e,f){var $;if(e){$=c.$();if($){if(!c._oHTML){c._oHTML=new H({preferDOM:false,afterRendering:function(){if(c&&c._oHTML){var a=c._oHTML.$(),C;if(a){C=a.children();C.remove();a.css("height","100%");a.append(c.getDomRef());}}}});}if(!c._oFullScreenDialog){c._oFullScreenDialog=new D({showHeader:false,stretch:true,escapeHandler:function(p){p.reject();},content:[c._oHTML]});if(f){c._oFullScreenDialog.attachAfterOpen(function(){f.focus();});c._oFullScreenDialog.attachAfterClose(function(){f.focus();});}c._oFullScreenDialog.addStyleClass($.closest(".sapUiSizeCompact").length?"sapUiSizeCompact":"");c._oFullScreenDialog.addStyleClass("sapUiCompSmartFullScreenDialog");if(c._oFullScreenDialog.oPopup){c._oFullScreenDialog.oPopup.onsapescape=null;}}c._$placeHolder=q(document.createElement("div"));$.before(c._$placeHolder);c._oHTML.setContent("<div/>");}c._oFullScreenDialog.open();}else if(c._$placeHolder&&c._oHTML){$=c._oHTML.$();c._$placeHolder.replaceWith($.children());if(c._oFullScreenDialog){c._oFullScreenDialog.close();}c._$placeHolder=null;$=null;}},cleanUpFullScreen:function(c){if(c._oFullScreenDialog){c._oFullScreenDialog.destroy();c._oFullScreenDialog=null;}c._$placeHolder=null;c._oHTML=null;}};return F;},true);
