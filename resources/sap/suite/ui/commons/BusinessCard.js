/*!
 * 
 * 		SAP UI development toolkit for HTML5 (SAPUI5)
 * 		(c) Copyright 2009-2015 SAP SE. All rights reserved
 * 	
 */
jQuery.sap.declare("sap.suite.ui.commons.BusinessCard");jQuery.sap.require("sap.suite.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.suite.ui.commons.BusinessCard",{metadata:{deprecated:true,library:"sap.suite.ui.commons",properties:{"type":{type:"string",group:"Misc",defaultValue:null},"iconPath":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"secondTitle":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"imageTooltip":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"content":{type:"sap.ui.core.Control",multiple:false},"firstTitle":{type:"sap.ui.core.Control",multiple:false}}}});
