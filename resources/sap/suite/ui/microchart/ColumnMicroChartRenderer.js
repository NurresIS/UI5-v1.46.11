/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global'],function(){"use strict";var C={};C.render=function(r,c){if(!c._bThemeApplied){return;}function w(f,I,g,e){r.write("<div");r.writeAttributeEscaped("id",c.getId()+I);r.addClass("sapSuiteClMCLbl");r.addClass(jQuery.sap.encodeHTML(g));r.addClass(jQuery.sap.encodeHTML("sapSuiteClMCSemanticColor"+f.getColor()));if(e){r.addClass("sapSuiteClMCWideBtmLbl");}r.writeClasses();r.write(">");r.writeEscaped(f.getLabel());r.write("</div>");}r.write("<div");r.writeControlData(c);r.addClass("sapSuiteClMC");var s="sapSuiteClMCSize"+c.getSize();if(c.getIsResponsive()){s="sapSuiteClMCResponsive";}r.addClass(s);var a=c.getAltText();if(c.hasListeners("press")){r.addClass("sapSuiteUiMicroChartPointer");r.writeAttribute("tabindex","0");}r.writeAttribute("role","presentation");r.writeAttributeEscaped("aria-label",a);r.writeClasses();r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.writeStyles();r.write(">");var l=c.getLeftTopLabel()&&c.getLeftTopLabel().getLabel()!="";var R=c.getRightTopLabel()&&c.getRightTopLabel().getLabel()!="";var L=c.getLeftBottomLabel()&&c.getLeftBottomLabel().getLabel()!="";var b=c.getRightBottomLabel()&&c.getRightBottomLabel().getLabel()!="";if(l||R){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-top-lbls");r.addClass("sapSuiteClMCLbls");r.addClass("sapSuiteClMCPositionTop");r.writeClasses();r.write(">");var W=l^R;if(l){w(c.getLeftTopLabel(),"-left-top-lbl","sapSuiteClMCPositionLeft",W);}if(R){w(c.getRightTopLabel(),"-right-top-lbl","sapSuiteClMCPositionRight",W);}r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-content");r.addClass("sapSuiteClMCCnt");if(l||R){r.addClass("sapSuiteClMCPositionTop");}if(L||b){r.addClass("sapSuiteClMCPositionBtm");}r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-bars");r.addClass("sapSuiteClMCBars");r.writeClasses();r.write(">");var d=c.getColumns().length;for(var i=0;i<d;i++){var o=c.getColumns()[i];r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-bar-"+i);r.writeAttribute("data-bar-index",i);r.addClass("sapSuiteClMCBar");r.addClass(jQuery.sap.encodeHTML("sapSuiteClMCSemanticColor"+o.getColor()));if(o.hasListeners("press")){r.writeAttribute("tabindex","0");r.writeAttribute("role","presentation");var B=c._getBarAltText(i);r.writeAttributeEscaped("title",B);r.writeAttributeEscaped("aria-label",B);r.addClass("sapSuiteUiMicroChartPointer");}r.writeClasses();r.write(">");r.write("</div>");}r.write("</div>");r.write("</div>");if(L||b){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-btm-lbls");r.addClass("sapSuiteClMCLbls");r.addClass("sapSuiteClMCPositionBtm");r.writeClasses();r.write(">");var e=L^b;if(L){w(c.getLeftBottomLabel(),"-left-btm-lbl","sapSuiteClMCPositionLeft",e);}if(b){w(c.getRightBottomLabel(),"-right-btm-lbl","sapSuiteClMCPositionRight",e);}r.write("</div>");}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-hidden");r.writeAttribute("aria-hidden","true");r.writeAttribute("tabindex","0");r.writeStyles();r.write(">");r.write("</div>");r.write("</div>");};return C;},true);
