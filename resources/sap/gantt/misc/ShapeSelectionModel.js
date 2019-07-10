/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/gantt/misc/Utility"],function(q,M,U){"use strict";var S=M.extend("sap.gantt.ShapeSelectionModel",{constructor:function(i,s){M.apply(this,arguments);this.aSelectedRelationships=[];this.mSelectedShapes={"uid":[],"shapes":[]};},metadata:{properties:{"selectionMode":{type:"sap.gantt.SelectionMode",defaultValue:sap.gantt.SelectionMode.MultiWithKeyboard}},associations:{"ganttChart":{type:"sap.gantt.GanttChart",multiple:false}}}});var D={Row:"Row",Shape:"Shape"};S.prototype.clearAllSelections=function(){var c=this.clearShapeSelection();var r=this.clearRelationshipSelection();return c&&r;};S.prototype.clearShapeSelection=function(){if(this.mSelectedShapes.uid.length===0){return false;}this.mSelectedShapes.uid=[];return true;};S.prototype.clearRelationshipSelection=function(){if(this.aSelectedRelationships.length===0){return false;}this.aSelectedRelationships=[];return true;};S.prototype.getSelectedShapeDatum=function(){var d=[];var l=this.mSelectedShapes.uid.length;for(var i=0;i<l;i++){var u=this.mSelectedShapes.uid[i];var o=this.getShapeDatumByShapeUid(u);if(o){d.push(o);}}return d;};S.prototype.getSelectedRelationships=function(){return this.aSelectedRelationships;};S.prototype.isShapeSelected=function(s){return q.inArray(s,this.mSelectedShapes.uid)===-1?false:true;};S.prototype.isRelationshipSelected=function(u){return this.aSelectedRelationships.some(function(s){return s.uid===u;});};S.prototype.isSelectedShapeVisible=function(s,c){var a=U.getIdByUid(s);var d=U.getShapeDatumById(a,c);return d.some(function(i){return i.uid===s;});};S.prototype.changeShapeSelection=function(s,r,c,d){var b,R;if(this.getSelectionMode()===sap.gantt.SelectionMode.None){return{shapeSelectionChange:false,relationshipSelectionChange:false};}var i=(U.getShapeDataNameByUid(s.uid)===sap.gantt.shape.ShapeCategory.Relationship);var m=(c&&this.getSelectionMode()===sap.gantt.SelectionMode.MultiWithKeyboard)||this.getSelectionMode()===sap.gantt.SelectionMode.Multiple;if(m){if(i){if(this.isRelationshipSelected(s.uid)){R=this.deselectRelationship(s.uid);}else{R=this.selectRelationship(s);}}else{if(this.isShapeSelected(s.uid)){b=this.deselectShape(s.uid);}else{b=this.selectByShapeData(s);}}}else{if(i){if(!this.isRelationshipSelected(s.uid)){R=this.clearRelationshipSelection();b=this.clearShapeSelection();R=this.selectRelationship(s)?true:R;}}else{if(!this.isShapeSelected(s.uid)){R=this.clearRelationshipSelection();b=this.clearShapeSelection();b=this.selectByShapeData(s)?true:b;}}}return{shapeSelectionChange:b,relationshipSelectionChange:R};};S.prototype.selectByShapeData=function(s){if(!s||this.isShapeSelected(s.uid)){return false;}this.mSelectedShapes.uid.push(s.uid);return true;};S.prototype.selectShapeByUid=function(u){var r;if(u&&u.length>0){for(var i=0;i<u.length;i++){r=r||this.selectByShapeData(this.getShapeDatumByShapeUid(u[i]));}}return r;};S.prototype.deselectShape=function(s){var i=q.inArray(s,this.mSelectedShapes.uid);if(i>=0){this.mSelectedShapes.uid.splice(i,1);}else{return false;}return true;};S.prototype.selectShapes=function(s,e){if(!s||s.length===0){return this.clearShapeSelection();}var u;if(e){u=this.clearShapeSelection();}var a=this._getShapeDatumForSelection(s);for(var j=0;j<a.length;j++){u=this.selectByShapeData(a[j])?true:u;}return u;};S.prototype.deselectShapes=function(I){if(!I||I.length===0){return this.clearShapeSelection();}var u;var s=this.getSelectedShapeDatum();for(var i=0;i<s.length;i++){var o=s[i];if(q.inArray(o.id,I)>=0){u=this.deselectShape(o.uid)?true:u;}}return u;};S.prototype.selectRelationship=function(r){if(this.isRelationshipSelected(r.uid)){return false;}this.aSelectedRelationships.push(r);return true;};S.prototype.deselectRelationship=function(r){var t=this;var u=q.each(this.aSelectedRelationships,function(i,a){if(a.uid===r){t.aSelectedRelationships.splice(i,1);return true;}});return u?true:false;};S.prototype.selectRelationships=function(r,e){if(!r||r.length===0){return this.clearRelationshipSelection();}var u;if(e){u=this.clearRelationshipSelection();}for(var i=0;i<r.length;i++){u=this.selectRelationship(r[i])?true:u;}return u;};S.prototype.deselectRelationships=function(i){if(!i||i.length===0){return this.clearRelationshipSelection();}else{var u;for(var j in this.aSelectedRelationships){var r=this.aSelectedRelationships[j];if(q.inArray(r.id,i)>=0){u=this.deselectRelationship(r.uid)?true:u;}}return u;}};S.prototype.selectUnderlyingTableRows=function(i,t,e){var T=t.getSelectedIndices();if(e&&T.length>0){t.clearSelection();}var r=this._getRowDatumForSelection(i,t);for(var I=0;I<r.length;I++){var R=r[I];var s=this.getSelectionMode();if(s===sap.gantt.SelectionMode.Multiple||s===sap.gantt.SelectionMode.MultiWithKeyboard){t.addSelectionInterval(R.rowIndex,R.rowIndex);}else{t.setSelectedIndex(R.rowIndex);}}};S.prototype.deselectUnderlyingTableRows=function(i,t){if(!i||i.length===0){t.clearSelection();return;}var r=this._getRowDatumForSelection(i,t);for(var I=0;I<r.length;I++){var R=r[I];t.removeSelectionInterval(R.rowIndex,R.rowIndex);}};S.prototype.getShapeDatumByShapeUid=function(s){return this._getDatumByUid(s,D.Shape);};S.prototype.getRowDatumByShapeUid=function(s){return this._getDatumByUid(s,D.Row);};S.prototype._getDatumByUid=function(s,d){var g=this._getGanttChart();var o;if(D.Shape===d){o=U.getShapeDatumByShapeUid(s,g.getId());}else{o=U.getRowDatumByShapeUid(s,g.getId());}if(o){return o;}var r,a;var b=U.getShapeDataNameByUid(s);var j=(g._oTT.getBinding("rows").getMetadata().getName()==="sap.ui.model.json.JSONTreeBinding");var R=U.getChartSchemeByShapeUid(s);var A=g.getAllRowData();q.each(A,function(k,v){var c=v;if(R===""||R===c.chartScheme){if(j&&c.data[b]){for(var i=0;i<c.data[b].length;i++){if(c.data[b][i].uid===s){r=c;a=c.data[b][i];return false;}}}else if(c.data.uid===s){r=c;a=c.data;return false;}}});if(d===D.Shape){return a;}return r;};S.prototype._getRowDatumForSelection=function(i,t){var r=i?i:[],R=U.getRowDatumRefById(r,t.getParent().getId()),m=R.length===r.length;if(!m){var I=this._lookupInvisibleDatum(r,R,D.Row);R=R.concat(I);}return R;};S.prototype._getShapeDatumForSelection=function(i){var g=this._getGanttChart();var s=i?i:[];var a=U.getShapeDatumById(s,g.getId()),m=a.length===s.length;if(!m){var I=this._lookupInvisibleDatum(s,a,D.Shape);a=a.concat(I);}return a;};S.prototype._lookupInvisibleDatum=function(I,f,d){var a=this._getInvisibleIds(I,f);var b=[];if(a.length>0){var g=this._getGanttChart(),A=g.getAllRowData(),s=g.getShapeDataNames();var l=function(r,c){var R=null;q.each(s,function(j,e){var h=r.data[e];if(h){q.each(h,function(k,o){if(o.id==c){R=o;return false;}});if(R){return false;}}});return R;};var L=function(c,t){var r=null;q.each(A,function(i,R){if(t===D.Shape){r=l(R,c);if(r){return false;}}else{if(R.id==c){r=R;return false;}}});return r;};b=a.map(function(i){return L(i,d);});}return b;};S.prototype._getInvisibleIds=function(i,f){var F=f.map(function(d){return d.id;});return i.filter(function(I){return q.inArray(I,F)===-1;});};S.prototype._getGanttChart=function(){return sap.ui.getCore().byId(this.getGanttChart());};return S;});
