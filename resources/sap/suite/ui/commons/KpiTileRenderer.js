/*!
 * 
 * 		SAP UI development toolkit for HTML5 (SAPUI5)
 * 		(c) Copyright 2009-2015 SAP SE. All rights reserved
 * 	
 */
jQuery.sap.declare("sap.suite.ui.commons.KpiTileRenderer");sap.suite.ui.commons.KpiTileRenderer={};
sap.suite.ui.commons.KpiTileRenderer.render=function(r,c){var t=c.getTooltip_AsString();r.write("<div");r.writeControlData(c);if(t){r.writeAttributeEscaped("title",t);}r.addClass("sapSuiteKTile");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteKTileBorder");r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-value");r.addClass("sapSuiteKTileValue");r.addClass("sapSuiteKTileStatus"+c.getValueStatus());if(c.getDoubleFontSize()){r.addClass("sapSuiteKTileValueLargeText");}else{r.addClass("sapSuiteKTileValueSmallText");}r.writeClasses();if(!t){r.writeAttributeEscaped("title",c.getValueScale()?c.getValue()+", "+c.getValueScale():c.getValue());}r.write(">");r.writeEscaped(c.getValue());if(c.getValueScale()){r.write("<span");r.writeAttribute("id",c.getId()+"-value-scale");r.addClass("sapSuiteKTileScale");r.writeClasses();r.write(">");r.writeEscaped(c.getValueScale());r.write("</span>");}r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-desc");r.addClass("sapSuiteKTileDesc");r.writeClasses();var b="";if(c.getValueUnit()){b+=c.getValueUnit()+", ";}b+=c.getDescription();if(!t){r.writeAttributeEscaped("title",b);}r.write(">");r.writeEscaped(b);r.write("</div>");r.write("</div>");};
