/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element',"sap/ui/core/Core"],function(q,E,C){"use strict";var A=E.extend("sap.gantt.eventHandler.AutoScrollHandler",{metadata:{properties:{horizontalThreshold:{type:"int",defaultValue:50},verticalThreshold:{type:"int",defaultValue:50},horizontalScrollStep:{type:"int",defaultValue:50},verticalScrollStep:{type:"int",defaultValue:50},delayInMillis:{type:"int",defaultValue:200}}}});A.prototype.autoScroll=function(g,e){this.stop();var $=q(g.getDomSelectorById("svg-ctn"));var a=g._oTT.$(sap.ui.table.SharedDomRef.HorizontalScrollBar);var b=g._oTT.$(sap.ui.table.SharedDomRef.VerticalScrollBar);var s=$.offset().left;var S=s+$.width();var i=$.offset().top;var c=$.offset().top+$.height();var h=this.getHorizontalThreshold();var v=this.getVerticalThreshold();var H=this.getHorizontalScrollStep();var V=this.getVerticalScrollStep();var d=this.getDelayInMillis();if(e.pageX-s>0&&e.pageX-s<h){g._destroyCursorLine();this._iAutoScrollTimeout=q.sap.intervalCall(d,this,function(){if(C.getConfiguration().getRTL()){a.scrollLeftRTL(a.scrollLeftRTL()-H);}else{a.scrollLeft(a.scrollLeft()-H);}});}else if(S-e.pageX>0&&S-e.pageX<h){g._destroyCursorLine();this._iAutoScrollTimeout=q.sap.intervalCall(d,this,function(){if(C.getConfiguration().getRTL()){a.scrollLeftRTL(a.scrollLeftRTL()+H);}else{a.scrollLeft(a.scrollLeft()+H);}});}else if(e.pageY-i>0&&e.pageY-i<(v-4)){this._iAutoScrollTimeout=q.sap.intervalCall(d,this,function(){b.scrollTop(b.scrollTop()-V);});}else if(c-e.pageY>0&&c-e.pageY<(v+4)){this._iAutoScrollTimeout=q.sap.intervalCall(d,this,function(){b.scrollTop(b.scrollTop()+V);});}};A.prototype.stop=function(){q.sap.clearIntervalCall(this._iAutoScrollTimeout);};return A;},true);
