/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/Device","sap/gantt/GanttChartBase","sap/ui/table/Column","sap/ui/table/TreeTable","sap/ui/core/ScrollBar","sap/ui/layout/Splitter","sap/ui/layout/SplitterLayoutData","sap/gantt/GanttChart","sap/gantt/control/Cell","sap/gantt/control/Toolbar","sap/gantt/control/AssociateContainer","sap/gantt/drawer/SelectionPanel","sap/gantt/misc/Utility","sap/gantt/misc/AxisOrdinal","sap/gantt/eventHandler/MouseWheelHandler","sap/ui/thirdparty/d3"],function(C,D,G,a,T,S,b,c,d,e,f,A,g,U,h,M){"use strict";var j=G.extend("sap.gantt.GanttChartWithTable",{metadata:{properties:{cellCallback:{type:"object"},fixedColumnCount:{type:"int"}},aggregations:{customToolbarItems:{type:"sap.ui.core.Control",multiple:true,visibility:"public",singularName:"customToolbarItem",bindable:"bindable"},columns:{type:"sap.ui.table.Column",multiple:true,visibility:"public",singularName:"column"},_selectionPanel:{type:"sap.ui.table.TreeTable",multiple:false,visibility:"hidden"},_chart:{type:"sap.gantt.GanttChart",multiple:false,visibility:"hidden"}}}});j.prototype.init=function(){G.prototype.init.apply(this,arguments);jQuery.sap.measure.start("GanttChartWithTable Init","GanttPerf:GanttChartWithTable Init function");this._oGanttChart=new d();this.setAggregation("_chart",this._oGanttChart);this._oGanttChartCnt=new A({enableRootDiv:true,content:this._oGanttChart});this._oTC=this._oGanttChart._oTT;var t=this;this._oTT=new T({visibleRowCountMode:"Auto",minAutoRowCount:1,fixedColumnCount:this.getFixedColumnCount(),selectionBehavior:sap.ui.table.SelectionBehavior.Row,selectionMode:sap.ui.table.SelectionMode.Multi});this._oTT._bVariableRowHeightEnabled=true;this._oTT._collectRowHeights=function(H){var k=T.prototype._collectRowHeights.apply(this,arguments);if(H){return k;}t._aHeights=k;var B=t._aHeights[0];var F=this.getFirstVisibleRow();var r=t._aHeights.length;var m=B;var s=t._oGanttChart._getDrawingData([F,F+r-1]);if(s&&s.length>0){m=s[0].rowSpan*B;}for(var i=0;i<r;i++){var o=this.getContextByIndex(F+i);if(o){var l=o.getObject();var u=l?l.uid:undefined;if(u&&t._oGanttChart._oRowStatusMap[u]){t._aHeights[i]=t._oGanttChart._oRowStatusMap[u].visibleRowSpan*B;}else{t._aHeights[i]=m;}}else{t._aHeights[i]=B;}}if(B>0){t._oGanttChart._setInferedBaseRowHeight(B);}return t._aHeights;};this._oTT._updateTableContent=function(){sap.ui.table.TreeTable.prototype._updateTableContent.apply(this,arguments);var r=this.getRows(),R=t._getRowHeights();if(!R){return;}var i=this.$().find(".sapUiTableCtrlFixed > tbody > tr.sapUiTableTr");var k=this.$().find(".sapUiTableRowHdr");for(var I=0;I<r.length;I++){var l=r[I].$(),m=i.filter(":eq("+I+")"),n=k.filter(":eq("+I+")"),H=R[I]||0;var B=t._oGanttChart.getBaseRowHeight();var o=H/B>1;l.toggleClass('sapGanttExpandedRow',o);m.toggleClass('sapGanttExpandedRow',o);n.toggleClass('sapGanttExpandedRow',o);}};this._oTT.addEventDelegate({onAfterRendering:this._bindVerticalScrollForTT},this);this._oTT.attachToggleOpenState(function(E){t.fireTreeTableToggleEvent({rowIndex:E.getParameter("rowIndex"),rowContext:E.getParameter("rowContext"),expanded:E.getParameter("expanded")});});this._oTT.attachEvent("_rowsUpdated",this._onTTRowUpdate.bind(this));this.setAggregation("_selectionPanel",this._oTT);this._oToolbar=new f({type:sap.gantt.control.ToolbarType.Local,sourceId:sap.gantt.config.DEFAULT_HIERARCHY_KEY});this._oToolbar.data("holder",this);this._oToolbar.attachSourceChange(this._onToolbarSourceChange,this);this._oToolbar.attachExpandTreeChange(this._onToolbarExpandTreeChange,this);this._oToolbar.attachModeChange(this._onToolbarModeChange,this);this._oTT.addExtension(this._oToolbar);this._oSelectionPanelCnt=new A({enableRootDiv:true,content:this._oTT,layoutData:new c({size:"30%"})});this._oSplitter=new b({width:"100%",height:"100%",orientation:sap.ui.core.Orientation.Horizontal,contentAreas:[this._oSelectionPanelCnt,this._oGanttChartCnt]}).addStyleClass("sapGanttViewSplitterH");this._oSplitter.attachResize(this._onSplitterResize,this);this._oGanttChart.attachHorizontalScroll(this._onChartHSbScroll,this);this._oGanttChart.attachVerticalScroll(this._onChartVSbScroll,this);this._oGanttChart.attachRowSelectionChange(this._onRowSelectionChange,this);this._oGanttChart.attachShapeSelectionChange(this._onShapeSelectionChange,this);this._oGanttChart.attachChartMouseOver(this._onChartMouseOver,this);this._oGanttChart.attachRelationshipSelectionChange(this._onRelationshipSelectionChange,this);this._oGanttChart.attachChartClick(this._onClick,this);this._oGanttChart.attachChartDoubleClick(this._onDoubleClick,this);this._oGanttChart.attachChartRightClick(this._onRightClick,this);this._oGanttChart.attachEvent("_zoomInfoUpdated",this._onZoomInfoUpdated,this);this._oGanttChart.attachEvent("_shapesUpdated",this._onShapesUpdated,this);this._oGanttChart.attachChartDragEnter(this._onChartDragEnter,this);this._oGanttChart.attachChartDragLeave(this._onChartDragLeave,this);this._oGanttChart.attachShapeDragEnd(this._onShapeDragEnd,this);this._oGanttChart.attachEvent("_mouseWheelZoom",this._onChartMouseWheelZoom,this);this._oModesConfigMap={};this._oModesConfigMap[sap.gantt.config.DEFAULT_MODE_KEY]=sap.gantt.config.DEFAULT_MODE;this._oToolbarSchemeConfigMap={};this._oToolbarSchemeConfigMap[sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME_KEY]=sap.gantt.config.DEFAULT_GANTTCHART_TOOLBAR_SCHEME;this._oToolbarSchemeConfigMap[sap.gantt.config.EMPTY_TOOLBAR_SCHEME_KEY]=sap.gantt.config.EMPTY_TOOLBAR_SCHEME;this._oHierarchyConfigMap={};this._oHierarchyConfigMap[sap.gantt.config.DEFAULT_HIERARCHY_KEY]=sap.gantt.config.DEFAULT_HIERARCHY;this._oSelectionPanelDrawer=new g();this._bCanApplyTableTransform=true;this._iFirstVisiableRowIndex=undefined;this._oGanttChartSchemesConfigMap={};this._oGanttChartSchemesConfigMap[sap.gantt.config.DEFAULT_CHART_SCHEME_KEY]=sap.gantt.config.DEFAULT_CHART_SCHEME;this._oObjectTypesConfigMap={};this._oObjectTypesConfigMap[sap.gantt.config.DEFAULT_OBJECT_TYPE_KEY]=sap.gantt.config.DEFAULT_OBJECT_TYPE;this._oShapesConfigMap={};this._oMouseWheelHandler=new M(this);jQuery.sap.measure.end("GanttChartWithTable Init");};j.prototype.setFixedColumnCount=function(F){this.setProperty("fixedColumnCount",F);this._oTT.setFixedColumnCount(F);return this;};j.prototype.setTimeAxis=function(t){this.setProperty("timeAxis",t,true);this._oGanttChart.setTimeAxis(t);return this;};j.prototype.setMode=function(m){this.setProperty("mode",m);this._oGanttChart.setMode(m);this._oToolbar.setMode(m);return this;};j.prototype.setModes=function(m){this.setProperty("modes",m);this._oToolbar.setModes(m);this._oGanttChart.setModes(m);this._oModesConfigMap={};if(m){for(var i=0;i<m.length;i++){this._oModesConfigMap[m[i].getKey()]=m[i];}}return this;};j.prototype.setSelectionMode=function(s){this.setProperty("selectionMode",s);if(this._oTT){if(s==sap.gantt.SelectionMode.None){this._oTT.setSelectionMode(sap.ui.table.SelectionMode.None);this._oTT.setSelectionBehavior(sap.ui.table.SelectionBehavior.RowOnly);}else if(s==sap.gantt.SelectionMode.MultiWithKeyboard){this._oTT.setSelectionMode(sap.ui.table.SelectionMode.Multi);this._oTT.setSelectionBehavior(sap.ui.table.SelectionBehavior.Row);}else{if(s==sap.gantt.SelectionMode.Single){this._oTT.setSelectionMode(sap.ui.table.SelectionMode.Single);}else{this._oTT.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);}this._oTT.setSelectionBehavior(sap.ui.table.SelectionBehavior.Row);}}if(this._oGanttChart){this._oGanttChart.setSelectionMode(s);}return this;};j.prototype.setToolbarSchemes=function(t){this.setProperty("toolbarSchemes",t);this._oToolbar.setToolbarSchemes(t);this._oToolbarSchemeConfigMap={};if(t){for(var i=0;i<t.length;i++){this._oToolbarSchemeConfigMap[t[i].getKey()]=t[i];}}return this;};j.prototype.setHierarchyKey=function(H){this.setProperty("hierarchyKey",H);this._oGanttChart.setProperty("hierarchyKey",H);this._oToolbar.setSourceId(H);this._hierarchyChange();return this;};j.prototype.setHierarchies=function(H){this.setProperty("hierarchies",H);this._oToolbar.setHierarchies(H);this._oGanttChart.setHierarchies(H);this._oHierarchyConfigMap={};if(H){for(var i=0;i<H.length;i++){this._oHierarchyConfigMap[H[i].getKey()]=H[i];}}this._hierarchyChange();return this;};j.prototype.setCalendarDef=function(o){this.setAggregation("calendarDef",o);var p=o.getBindingInfo("defs");if(p){p.templateShareable=true;}this._oGanttChart.setCalendarDef(o.clone());return this;};j.prototype.setAdhocLineLayer=function(l){this.setProperty("adhocLineLayer",l);this._oGanttChart.setAdhocLineLayer(l);return this;};j.prototype.addAdhocLine=function(o){this._oGanttChart.addAdhocLine(o);return this;};j.prototype.insertAdhocLine=function(o,i){this._oGanttChart.insertAdhocLine(o,i);return this;};j.prototype.removeAdhocLine=function(o){return this._oGanttChart.removeAdhocLine(o);};j.prototype.getAdhocLines=function(){return this._oGanttChart.getAdhocLines();};j.prototype.removeAllAdhocLines=function(){return this._oGanttChart.removeAllAdhocLines();};j.prototype._hierarchyChange=function(o){var H=this.getHierarchyKey();if(H&&this._oHierarchyConfigMap[H]){if(this._oHierarchyConfigMap[H].getColumns()&&this._oHierarchyConfigMap[H].getColumns().length>0){this._buildColumnFromCellCallback();}var m=this.getMode();if(m===sap.gantt.config.DEFAULT_MODE_KEY&&this._oHierarchyConfigMap[this.getHierarchyKey()]){m=this._oHierarchyConfigMap[this.getHierarchyKey()].getActiveModeKey();}this.setMode(m);}};j.prototype._buildColumnFromCellCallback=function(){this._oTT.removeAllColumns();var H,k;H=this._oHierarchyConfigMap[this.getHierarchyKey()];if(H){k=H.getColumns();}if(k){for(var i=0;i<k.length;i++){var o=new a({label:k[i].getTitle(),sortProperty:k[i].getSortAttribute(),filterProperty:k[i].getFilterAttribute(),width:k[i].getWidth(),template:new e({cellCallback:this.getCellCallback(),columnConfig:k[i]})});this._oTT.addColumn(o);}}};j.prototype.setObjectTypes=function(o){this.setProperty("objectTypes",o,true);this._oGanttChart.setObjectTypes(o);this._oObjectTypesConfigMap={};if(o){for(var i=0;i<o.length;i++){this._oObjectTypesConfigMap[o[i].getKey()]=o[i];}}return this;};j.prototype.setChartSchemes=function(k){this.setProperty("chartSchemes",k,true);this._oGanttChart.setChartSchemes(k);this._oGanttChartSchemesConfigMap={};if(k){for(var i=0;i<k.length;i++){this._oGanttChartSchemesConfigMap[k[i].getKey()]=k[i];}}return this;};j.prototype.setShapeDataNames=function(s){this.setProperty("shapeDataNames",s);this._oGanttChart.setShapeDataNames(s);return this;};j.prototype.setLocale=function(l){this.setProperty("locale",l,true);this._oGanttChart.setLocale(l);return this;};j.prototype.setShapes=function(s){this.setProperty("shapes",s,true);this._oGanttChart.setShapes(s);this._oShapesConfigMap={};if(s){for(var i=0;i<s.length;i++){this._oShapesConfigMap[s[i].getKey()]=s[i];}}return this;};j.prototype.setSvgDefs=function(s){this.setProperty("svgDefs",s);this._oGanttChart.setSvgDefs(s);return this;};j.prototype.setEnableCursorLine=function(E){this.setProperty("enableCursorLine",E);this._oGanttChart.setEnableCursorLine(E);this._oToolbar.setEnableCursorLine(E);return this;};j.prototype.setEnableNowLine=function(E){this.setProperty("enableNowLine",E);this._oGanttChart.setEnableNowLine(E);this._oToolbar.setEnableNowLine(E);return this;};j.prototype.setEnableVerticalLine=function(E){this.setProperty("enableVerticalLine",E);this._oGanttChart.setEnableVerticalLine(E);this._oToolbar.setEnableVerticalLine(E);return this;};j.prototype.setEnableAdhocLine=function(E){this.setProperty("enableAdhocLine",E);this._oGanttChart.setEnableAdhocLine(E);this._oToolbar.setEnableAdhocLine(E);return this;};j.prototype.setTimeZoomRate=function(t){this.setProperty("timeZoomRate",t,true);this._oGanttChart.setTimeZoomRate(t);return this;};j.prototype.setAxisTimeStrategy=function(o){this._oGanttChart.setAxisTimeStrategy(o);return this;};j.prototype.getAxisTimeStrategy=function(){return this._oGanttChart.getAxisTimeStrategy();};j.prototype.addRelationship=function(r){this._oGanttChart.addRelationship(r);};j.prototype.insertRelationship=function(i,r){this._oGanttChart.insertRelationship(i,r);};j.prototype.removeRelationship=function(r){this._oGanttChart.removeRelationship(r);};j.prototype.getRelationships=function(){this._oGanttChart.getRelationships();};j.prototype.destroyRelationships=function(){this._oGanttChart.destroyRelationships();};j.prototype.indexOfRelationship=function(r){this._oGanttChart.indexOfRelationship(r);};j.prototype.removeAllRelationships=function(){this._oGanttChart.removeAllRelationships();};j.prototype.updateRelationships=function(r){this._oGanttChart.updateRelationships(r);};j.prototype.setSelectionPanelSize=function(s,i){this.setProperty("selectionPanelSize",s,i);this._oSelectionPanelCnt.setLayoutData(new c({size:s}));return this;};j.prototype.addCustomToolbarItem=function(o){this._oToolbar.addCustomToolbarItem(o);};j.prototype.insertCustomToolbarItem=function(o,i){this._oToolbar.insertCustomToolbarItem(o,i);};j.prototype.removeCustomToolbarItem=function(o){this._oToolbar.removeCustomToolbarItem(o);};j.prototype.removeAllCustomToolbarItems=function(){this._oToolbar.removeAllCustomToolbarItems();};j.prototype.addColumn=function(o){this._oTT.addColumn(o);};j.prototype.insertColumn=function(o,i){this._oTT.insertColumn(o,i);};j.prototype.removeColumn=function(o){this._oTT.removeColumn(o);};j.prototype.removeAllColumns=function(){this._oTT.removeAllColumns();};j.prototype.getColumns=function(){return this._oTT.getColumns();};j.prototype._bindAggregation=function(n,B){var m,o;if(n=="rows"&&B){m=this.getModel(B.model);o=this.getBindingContext(B.model);if(o&&m){B.path=m.resolve(B.path,o);}this._oTT.bindRows(B);this._oGanttChart.bindRows(B);this._oTC.updateRows=this._updateRows.bind(this);}else if(n=="relationships"&&B){m=this.getModel(B.model);o=this.getBindingContext(B.model);if(o&&m){B.path=m.resolve(B.path,o);}this._oGanttChart.bindRelationships(B);}else if(n=="columns"&&B){m=this.getModel(B.model);o=this.getBindingContext(B.model);if(o&&m){B.path=m.resolve(B.path,o);}this._oTT.bindColumns(B);}else{return sap.ui.core.Control.prototype._bindAggregation.apply(this,arguments);}};j.prototype._updateRows=function(r){if(this._oTC.getFirstVisibleRow()===this._oTT.getFirstVisibleRow()||r===sap.ui.model.ChangeReason.Filter||r===sap.ui.model.ChangeReason.Sort){sap.ui.table.Table.prototype.updateRows.apply(this._oTT,arguments);}sap.ui.table.Table.prototype.updateRows.apply(this._oTC,arguments);};j.prototype._detachToolbarEvents=function(){this._oToolbar.detachSourceChange(this._onToolbarSourceChange,this);this._oToolbar.detachExpandTreeChange(this._onToolbarExpandTreeChange,this);};j.prototype.onAfterRendering=function(){this._attachEvents();};j.prototype._adjustChartHeaderHeight=function(){var i=this._oTT.$().find(".sapUiTableExt");var k=this._oTT.$().find(".sapUiTableColHdrCnt");var l;if(i.height()===null){l=i.outerHeight()+k.height();}else{l=i.outerHeight()+k.height()+1;}var m=this._oGanttChart.$().find(".sapGanttChartHeader");m.height(l);m.css("min-height",l);var n=this._oGanttChart.$().find(".sapGanttChartHeaderSvg");n.height(l);n.css("min-height",l);};j.prototype.onBeforeRendering=function(){if(this._oToolbar.getAllToolbarItems().length===0){this._oTT.removeExtension(this._oToolbar);}else if(this._oTT.getExtension().length==0){this._oTT.addExtension(this._oToolbar);}};j.prototype._attachEvents=function(){var o={onAfterRendering:this._syncGanttTablesDomEvents};this._oTT.removeEventDelegate(o);this._oTT.addEventDelegate(o,this);this._oTC.removeEventDelegate(o);this._oTC.addEventDelegate(o,this);this._appendMaskSvg();var i=this.$().find(this.getDomSelectorById("spm-svg-table"));if(D.browser.firefox){i.unbind("MozMousePixelScroll.sapUiTableMouseWheel",this._onMouseWheel.bind(this));i.bind("MozMousePixelScroll.sapUiTableMouseWheel",this._onMouseWheel.bind(this));}else{i.unbind("wheel.sapUiTableMouseWheel",this._onMouseWheel.bind(this));i.bind("wheel.sapUiTableMouseWheel",this._onMouseWheel.bind(this));}};j.prototype._onMouseWheel=function(E){this._oMouseWheelHandler.handleEvent(E);};j.prototype._onRowSelectionChange=function(E){this.fireRowSelectionChange({originEvent:E.getParameter("originEvent")});this._oTT._oSelection.fireSelectionChanged();};j.prototype._onChartMouseOver=function(E){var p=E.getParameters();this.fireChartMouseOver({objectInfo:p.objectInfo,leadingRowInfo:p.leadingRowInfo,timestamp:p.timestamp,svgId:p.svgId,svgCoordinate:p.svgCoordinate,effectingMode:p.effectingMode,originEvent:p.originEvent});};j.prototype._onShapeSelectionChange=function(E){this.fireShapeSelectionChange({originEvent:E.getParameter("originEvent")});};j.prototype._onRelationshipSelectionChange=function(E){this.fireRelationshipSelectionChange({originEvent:E.getParameter("originEvent")});};j.prototype._onClick=function(E){var p=E.getParameters();this.fireChartClick({objectInfo:p.objectInfo,leadingRowInfo:p.leadingRowInfo,timestamp:p.timestamp,svgId:p.svgId,svgCoordinate:p.svgCoordinate,effectingMode:p.effectingMode,originEvent:p.originEvent});};j.prototype._onDoubleClick=function(E){var p=E.getParameters();this.fireChartDoubleClick({objectInfo:p.objectInfo,leadingRowInfo:p.leadingRowInfo,timestamp:p.timestamp,svgId:p.svgId,svgCoordinate:p.svgCoordinate,effectingMode:p.effectingMode,originEvent:p.originEvent});};j.prototype._onRightClick=function(E){var p=E.getParameters();this.fireChartRightClick({objectInfo:p.objectInfo,leadingRowInfo:p.leadingRowInfo,timestamp:p.timestamp,svgId:p.svgId,svgCoordinate:p.svgCoordinate,effectingMode:p.effectingMode,originEvent:p.originEvent});};j.prototype._onChartDragEnter=function(E){this.fireChartDragEnter({originEvent:E.getParameter("originEvent")});};j.prototype._onChartDragLeave=function(E){this.fireChartDragLeave({originEvent:E.getParameter("originEvent"),draggingSource:E.getParameter("draggingSource")});};j.prototype._onShapeDragEnd=function(E){var p=E.getParameters();this.fireShapeDragEnd({originEvent:p.originEvent,sourceShapeData:p.sourceShapeData,targetData:p.targetData,sourceSvgId:p.sourceSvgId,targetSvgId:p.targetSvgId});};j.prototype._onChartMouseWheelZoom=function(E){this.fireEvent("_mouseWheelZoom",E.getParameters());};j.prototype.syncMouseWheelZoom=function(E){this._oGanttChart.syncMouseWheelZoom(E);};j.prototype._onChartHSbScroll=function(E){this.fireHorizontalScroll(E.getParameters());};j.prototype.syncVisibleHorizon=function(t){this._oGanttChart.syncVisibleHorizon(t);};j.prototype._onChartVSbScroll=function(E){var i=jQuery(this.getTTVsbDom());var k=jQuery(this.getTCVsbDom());if(this.sScrollSource===null||this.sScrollSource!=="GanttChartWithTable"){this.sScrollSource="GanttChart";i.scrollTop(k.scrollTop());}else{this.sScrollSource=null;}this.fireVerticalScroll({scrollSteps:this._oTC.getFirstVisibleRow(),scrollPosition:jQuery(this.getTCVsbDom()).scrollTop()});};j.prototype._drawSvg=function(){this._appendMaskSvg();this._updateMaskSvg();this._updateTableRowHeights();this._drawSelectionPanel();};j.prototype._onZoomInfoUpdated=function(E){this.fireEvent("_zoomInfoUpdated",E.getParameters());};j.prototype._onShapesUpdated=function(E){this.fireEvent("_shapesUpdated",{aSvg:E.getParameter("aSvg")});};j.prototype._bindVerticalScrollForTT=function(){var i=jQuery(this.getTTVsbDom());i.unbind("scroll.sapUiTableVScrollForGanttChartWithTable",this._onSelectionPanelVSbScroll);i.bind("scroll.sapUiTableVScrollForGanttChartWithTable",jQuery.proxy(this._onSelectionPanelVSbScroll,this));};j.prototype._onSelectionPanelVSbScroll=function(){var i=jQuery(this.getTTVsbDom());var k=jQuery(this.getTCVsbDom());if(this.sScrollSource===null||this.sScrollSource!=="GanttChart"){this.sScrollSource="GanttChartWithTable";k.scrollTop(i.scrollTop());}else{this.sScrollSource=null;}this._applyTransform();};j.prototype._applyTransform=function(){this.$().find(this.getDomSelectorById("spm-svg-table")).css("transform","translateY("+(-this._oTT.$().find(".sapUiTableCCnt").scrollTop())+"px)");};j.prototype._onSplitterResize=function(E){var p=E.getParameters();this._oGanttChart._draw();this.fireSplitterResize(p);};j.prototype._onToolbarSourceChange=function(E){var o=this.getHierarchyKey();var i=this.getMode();this.setHierarchyKey(E.getParameter("id"));this.notifySourceChange();this.fireGanttChartSwitchRequested({hierarchyKey:E.getParameter("id"),oldHierarchyKey:o,oldMode:i});};j.prototype._onToolbarExpandTreeChange=function(E){var s=E.getParameter("action");if(s){var k=this._oTT.getSelectedIndices();for(var i=k.length-1;i>-1;i--){this._oTT[s](k[i]);k=this._oTT.getSelectedIndices();}}};j.prototype._onToolbarModeChange=function(E){var B=this.getBinding("mode");if(B){B.setValue(E.getParameter("mode"));}this.setMode(E.getParameter("mode"));};j.prototype.handleExpandChartChange=function(E,i,s){s=s?s:this._oTT.getSelectedIndices();this._oGanttChart.handleExpandChartChange(E,i,s);};j.prototype.invertRowExpandStatus=function(s,i){if(s&&s.length>0&&i){this._oGanttChart.invertRowExpandStatus(s,i);}};j.prototype._updateTableRowHeights=function(){var t=this._oTT;var H=this._getRowHeights();if(!H){return;}t._updateRowHeights(H,false);};j.prototype._getRowHeights=function(){return this._aHeights;};j.prototype.setBaseRowHeight=function(n){this.setProperty("baseRowHeight",n);this._oTT.setRowHeight(n);return this._oGanttChart.setBaseRowHeight(n);};j.prototype.getBaseRowHeight=function(){return this._oGanttChart.getBaseRowHeight();};j.prototype._onTTRowUpdate=function(){var i=this.$().find(this.getDomSelectorById("spm-svg-table-ctn"));if(this._oGanttChart.isRowExpanded()){var k=this._oTT.$();i.height(k.find(".sapUiTableCCnt").height());i.show();var l=i.find(".sapGanttSPMaskSvg");l.height(k.find(".sapUiTableCtrlCnt").height());this._drawSvg();}else{i.hide();}this._adjustGanttInferredRowHeight();this._oTT._updateTableContent();this._adjustChartHeaderHeight();};j.prototype._adjustGanttInferredRowHeight=function(){var H=this._getRowHeights();var F=this.getFirstVisibleRow();var s=this._oGanttChart._getDrawingData([F,F]);if(H&&H.length>0&&s&&s.length>0){var B=H[0]/s[0].visibleRowSpan;var p=this._oGanttChart._iInferedBaseRowHeight;if(B!==p){this._oGanttChart._setInferedBaseRowHeight(B);if(p===undefined){this._oTC.updateRows();}}}};j.prototype._syncGanttTablesDomEvents=function(E){var s=E.srcControl,t=s.getId()===this._oTT.getId()?this._oTC:this._oTT;s.$().find(".sapUiTableRowHdr, .sapUiTableTr").hover(function(E){var i=jQuery(E.currentTarget).data("sapUiRowindex");t.$().find(".sapUiTableCtrlFixed > tbody > tr.sapUiTableTr").filter(":eq("+i+")").addClass("sapUiTableRowHvr");t.$().find(".sapUiTableCtrlScroll > tbody > tr.sapUiTableTr").filter(":eq("+i+")").addClass("sapUiTableRowHvr");t.$().find(".sapUiTableRowHdr").filter(":eq("+i+")").addClass("sapUiTableRowHvr");},function(E){t.$().find(".sapUiTableCtrlFixed > tbody > tr.sapUiTableTr").removeClass("sapUiTableRowHvr");t.$().find(".sapUiTableCtrlScroll > tbody > tr.sapUiTableTr").removeClass("sapUiTableRowHvr");t.$().find(".sapUiTableRowHdr").removeClass("sapUiTableRowHvr");});};j.prototype._setLargeDataScrolling=function(l){if(this._oTT._setLargeDataScrolling){this._oTT._setLargeDataScrolling(!!l);}if(this._oTC._setLargeDataScrolling){this._oTC._setLargeDataScrolling(!!l);}};j.prototype.getToolbarSchemeKey=function(){return this._oToolbar.getToolbarSchemeKey();};j.prototype.jumpToPosition=function(o){this._oGanttChart.jumpToPosition(o);};j.prototype.selectShapes=function(i,k){return this._oGanttChart.selectShapes(i,k);};j.prototype.deselectShapes=function(i){return this._oGanttChart.deselectShapes(i);};j.prototype.selectRelationships=function(i,k){return this._oGanttChart.selectRelationships(i,k);};j.prototype.deselectRelationships=function(i){return this._oGanttChart.deselectRelationships(i);};j.prototype.selectRows=function(i,k){return this._oGanttChart.selectRows(i,k);};j.prototype.deselectRows=function(i){return this._oGanttChart.deselectRows(i);};j.prototype.selectRowsAndShapes=function(i,I){return this._oGanttChart.selectRowsAndShapes(i,I);};j.prototype.getAllSelections=function(){return this._oGanttChart.getAllSelections();};j.prototype.getSelectedShapes=function(){var s=this._oGanttChart.getSelectedShapes();return s;};j.prototype.getSelectedRows=function(){var s=this._oGanttChart.getSelectedRows();return s;};j.prototype.getSelectedRelationships=function(){var s=this._oGanttChart.getSelectedRelationships();return s;};j.prototype.setDraggingData=function(o){this._oGanttChart.setDraggingData(o);};j.prototype.getRowByShapeUid=function(s){return this._oGanttChart.getRowByShapeUid(s);};j.prototype._drawSelectionPanel=function(){var t=this._oTT.$().find(".sapUiTableRowHdrScr").width();var v=this._getVisibleRowData();if(v!==undefined){this._oSelectionPanelDrawer.drawSvg(d3.select(this.getDomSelectorById("spm-svg-table")),v,t,this);this.$().find(this.getDomSelectorById("spm-svg-table")).css("transform","translateY("+(-this._oTT.$().find(".sapUiTableCCnt").scrollTop())+"px)");this._iFirstVisiableRowIndex=this._oTT.getFirstVisibleRow();this._bCanApplyTableTransform=true;}};j.prototype._getVisibleRowData=function(){var F=this._oTT.getFirstVisibleRow();var v=this.getVisibleRowCount()+1;var V=this._oGanttChart._getDrawingData([F,F+v-1]);var B=this._oGanttChart.getBaseRowHeight();var p=0;for(var i=0;i<V.length;i++){var s=V[i];s.rowHeight=s.rowSpan*B;s.y=p;p+=s.rowHeight;}return V;};j.prototype._appendMaskSvg=function(){var i=this.$().find(this.getDomSelectorById("spm-svg-table-ctn"));var k=this._oTT.$();if(i.length==0){i=$("<div id='"+this.getId()+"-spm-svg-table-ctn' class='sapGanttChartSPMSvgCtn' >"+"<svg id='"+this.getId()+"-spm-svg-table' class='sapGanttSPMaskSvg'>"+"</svg>"+"</div>");k.parent().append(i);}};j.prototype._updateMaskSvg=function(){var i=this.$().find(this.getDomSelectorById("spm-svg-table-ctn"));var k=this._oTT.$();i.height(k.find(".sapUiTableCCnt").height());i.width($(document).width());i.css("top",this._oGanttChart.$().find(".sapGanttChartHeader").height()+1);i.css("min-width",k.find("table").css("min-width"));var l=i.find(".sapGanttSPMaskSvg");l.width(i.width());l.height(k.find(".sapUiTableCtrlCnt").height());};j.prototype.getAxisOrdinal=function(){return this._oGanttChart.getAxisOrdinal();};j.prototype.getAxisTime=function(){return this._oGanttChart.getAxisTime();};j.prototype.expandToLevel=function(l){this._oTT.expandToLevel(l);return this;};j.prototype.expand=function(r){this._oTT.expand(r);return this;};j.prototype.collapse=function(r){this._oTT.collapse(r);return this;};j.prototype.setSelectedIndex=function(r){this._oTT.setSelectedIndex(r);return this;};j.prototype.getSelectedIndex=function(){return this._oTT.getSelectedIndex();};j.prototype.getFirstVisibleRow=function(){return this._oTT.getFirstVisibleRow();};j.prototype.setFirstVisibleRow=function(r){this._oTT.setFirstVisibleRow(r);return this;};j.prototype.getVisibleRowCount=function(){return this._oTT.getVisibleRowCount();};j.prototype.getRows=function(){return this._oTT.getRows();};j.prototype.exit=function(){this._detachToolbarEvents();this._oSplitter.destroy();};j.prototype.notifySourceChange=function(){this._oTT.setFirstVisibleRow(0);this._oGanttChart.notifySourceChange();};j.prototype.autoResizeColumn=function(k){if(k>=0&&jQuery.isNumeric(k)){this._oTT.autoResizeColumn(k);}else{for(var i=this._oTT.getColumns().length;i>=0;i--){this._oTT.autoResizeColumn(i);}}};j.prototype._autoResizeColumn=function(){if(this._oHierarchyConfigMap[this.getHierarchyKey()].getAutoResizeColumn()){this.autoResizeColumn();}};j.prototype.redraw=function(H){this._oGanttChart.redraw(H);};j.prototype.selectByUid=function(u){this._oGanttChart.selectByUid(u);};j.prototype.getTTHsbDom=function(){return this._oTT.getDomRef(sap.ui.table.SharedDomRef.HorizontalScrollBar);};j.prototype.getTTVsbDom=function(){return this._oTT.getDomRef(sap.ui.table.SharedDomRef.VerticalScrollBar);};j.prototype.getTCVsbDom=function(){return this._oGanttChart.getTTVsbDom();};return j;},true);
