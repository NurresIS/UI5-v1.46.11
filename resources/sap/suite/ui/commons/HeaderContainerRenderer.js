/*!
 * 
 * 		SAP UI development toolkit for HTML5 (SAPUI5)
 * 		(c) Copyright 2009-2015 SAP SE. All rights reserved
 * 	
 */
jQuery.sap.declare("sap.suite.ui.commons.HeaderContainerRenderer");sap.suite.ui.commons.HeaderContainerRenderer={};
sap.suite.ui.commons.HeaderContainerRenderer.render=function(r,c){var t=c.getTooltip_AsString();r.write("<div");r.writeControlData(c);if(t&&(typeof t==="string")){r.writeAttributeEscaped("title",t);}r.addClass("sapSuiteHdrCntr");r.addClass(c.getView());if(c.getShowDividers()){r.addClass("sapSuiteHrdrCntrDvdrs");}r.writeClasses();if(c.getView()==="Vertical"){r.addStyle("height","100%");r.writeStyles();}var d="";var I=c.getItems();for(var i=0;I&&i<I.length;i++){d+=I[i].getId()+" ";}r.writeAttribute("aria-labelledby",d);r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-scroll-area");r.addClass("sapSuiteHdrCntrCntr");r.addClass(c.getView());r.addClass("sapSuiteHdrCntrBG"+c.getBackgroundDesign());r.writeClasses();r.write(">");r.renderControl(c._oScrollCntr);r.write("<div");r.writeAttribute("id",c.getId()+"-after");r.writeAttribute("tabindex","0");r.write("/>");r.write("</div>");if(c._oArrowPrev){r.write("<div");r.addClass("sapSuiteHdrCntrBtnCntr");r.addClass("sapSuiteHdrCntrLeft");r.addClass(c.getView());r.writeClasses();r.write(">");r.renderControl(c._oArrowPrev);r.write("</div>");}if(c._oArrowNext){r.write("<div");r.addClass("sapSuiteHdrCntrBtnCntr");r.addClass("sapSuiteHdrCntrRight");r.addClass(c.getView());r.writeClasses();r.write(">");r.renderControl(c._oArrowNext);r.write("</div>");}r.write("</div>");};
