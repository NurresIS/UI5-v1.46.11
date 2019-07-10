/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/drawer/Drawer","sap/gantt/misc/Utility","sap/ui/thirdparty/d3"],function(D,U){"use strict";var S=D.extend("sap.gantt.drawer.ShapeCrossRow");S.prototype.drawSvg=function(s,o,a,A){this._oAxisTime=a;this._oAxisOrdinal=A;var b=s.select("."+o.getId()+"-top");if(b.empty()){b=s.append("g").classed(o.getId()+"-top",true);}var r=[];for(var i in o.dataSet){r.push(o.dataSet[i].shapeData[0]);}var c=b.selectAll("."+o.getId()).data(r);this._drawPath(c,o);this._drawInsertTitle(c,o);};S.prototype._drawPath=function(s,o){var f=this._findObjectInfo;var t=this;s.enter().append("path").classed(o.getId(),true);s.classed("hasTitle",function(d){return o.getTitle(d,f(this,o,t))?true:false;}).classed("enableSelected",function(d){return o.getEnableSelection(d,f(this,o,t))?true:false;}).attr("d",function(d){return o.getD(d,f(this,o,t));}).attr("fill",function(d){if(o.getIsClosed(d,f(this,o,t))){return o.getFill(d,f(this,o,t));}}).attr("stroke",function(d){return o.getStroke(d,f(this,o,t));}).attr("stroke-width",function(d){return o.getStrokeWidth(d,f(this,o,t));}).attr("stroke-dasharray",function(d){return o.getStrokeDasharray(d,f(this,o,t));}).attr("fill-opacity",function(d){if(o.getIsClosed(d,f(this,o,t))){return o.getFillOpacity(d,f(this,o,t));}}).attr("stroke-opacity",function(d){if(o.getIsClosed(d,f(this,o,t))){return o.getStrokeOpacity(d,f(this,o,t));}});this.addDataAttributes(s);s.exit().remove();};S.prototype._drawInsertTitle=function(s,o){var f=this._findObjectInfo;var t=this;s.select("title").remove();s.insert("title",":first-child").each(function(d){var a=d3.select(this);a.selectAll("tspan").remove();if(sap.ui.Device.browser.msie){var l=o.getTitle(d,f(this,o)).split("\n");for(var i=0;i<l.length;i++){a.append("tspan").classed("sapGanttTooltipLine",true).text(l[i]);}}else{a.text(o.getTitle(d,f(this,o)));}});};S.prototype._findObjectInfo=function(n,s,t,i){var r=n.__data__;var R=r;if(i){R=r.data.rawData;}var a={from:{objectInfo:R.fromObject.objectInfoRef?R.fromObject.objectInfoRef:R.fromObject,shapeRawData:R.fromShapeRawData},to:{objectInfo:R.toObject.objectInfoRef?R.toObject.objectInfoRef:R.toObject,shapeRawData:R.toShapeRawData}};return a;};S.prototype.destroySvg=function(s,o){};S.prototype.generateRelationshipDataSet=function(s,o,n,a,r,A,b){var R=r;var c=[];if(R!==undefined&&R.length>0){var d;var e;for(e in o){if(o[e].getCategory(null,A,b)===sap.gantt.shape.ShapeCategory.Relationship){d=o[e];break;}}if(d){var f={};for(e in o){if(o[e].dataSet&&o[e].dataSet!=""&&o[e].mShapeConfig.getShapeDataName()!=sap.gantt.shape.ShapeCategory.Relationship){U.generateObjectPathToObjectMap(o[e].dataSet,f,null);}}U.generateObjectPathToObjectMap(n,f,null);var g;var h;for(var i=0;i<R.length;i++){g=R[i];h=g;var j=d.getFromObjectPath(h,null);var k=f[j];if(!k){continue;}var t=d.getToObjectPath(h,null);var l=f[t];if(!l){continue;}var m=d.getFromShapeId(h,null);var p=d.getFromDataId(h,null);var F=o[m].mShapeConfig.getShapeDataName();var q=this._findShapeDataFromRowObjectByShapeDataName(k,p,F);if(!q){continue;}var u=d.getToShapeId(h,null);var v=d.getToDataId(h,null);var T=o[u].mShapeConfig.getShapeDataName();var w=this._findShapeDataFromRowObjectByShapeDataName(l,v,T);if(!w){continue;}h.fromObject=k;h.toObject=l;h.fromShapeRawData=q;h.toShapeRawData=w;var x={"shapeData":[g]};c.push(x);}}}return c;};S.prototype._findShapeDataFromRowObjectByShapeDataName=function(r,s,a){var o,b;if(r.shapeData){b=r.shapeData;}else if(r.data&&r.data[a]){b=r.data[a];}else if(r.data){return r.data;}else{b=r;}for(var i=0;i<b.length;i++){if(b[i].id!==undefined&&b[i].id==s){o=b[i];break;}}if(o==undefined&&b.length>0){o=b[0];}return o;};S.prototype.addDataAttributes=function(s){s.attr("data-sap-gantt-shape-id",function(d){return d.id;});};return S;},true);
