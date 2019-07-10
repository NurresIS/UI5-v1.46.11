sap.ui.define(["sap/m/SegmentedButtonItem","sap/m/Button","sap/m/ButtonType","sap/m/Text","sap/m/Dialog","sap/m/SegmentedButton","sap/suite/ui/generic/template/AnalyticalListPage/controller/VisualFilterDialogController","sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil"],function(S,B,a,T,D,b,V,C,F){"use strict";var c="visual",d="compact";var f=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.FilterBarController",{init:function(s){this.compactFilterData={};var m=this;var e=s.oController.getOwnerComponent().getDefaultFilterMode();m.oState=s;m.oState.oSmartFilterbar.attachSwitchToVisualFilter(function(){var o=m.oState.oSmartFilterbar.getFilterData();m.compactFilterData=jQuery.extend(true,{},o);m.oState.alr_visualFilterBar.mergeCompactFilters(o);m.oState.visualFilterDialogContainer.launchDialog();});if(e===c&&m.oState.hideVisualFilter){jQuery.sap.log.error("Visual filter is hidden defaulting to compact");e=d;}var g=m.oState.oController.getOwnerComponent().getShowGoButtonOnFilterBar()?true:false;s.oSmartFilterbar.setShowGoOnFB(g);s.oSmartFilterbar.setLiveMode(!g);s.oSmartFilterbar.setShowMessages(g);s.oSmartTable.setEnableAutoBinding(!g);s.oSmartFilterbar.attachFilterChange(function(E){var i=E.getSource();var j=this.oState.oController.getOwnerComponent().getModel("_filter");j.setData(i.getFilterData());if(this.oState.alr_visualFilterBar){var o=this.oState.oSmartFilterbar.getFilterData();this.oState.alr_visualFilterBar.mergeCompactFilters(o);}}.bind(this));s.oSmartFilterbar.attachSearch(function(E){this.oState.oSmartChart.getToolbar().setEnabled(true);this.oState.oSmartTable.getCustomToolbar().setEnabled(true);},this);m.oState.oSmartFilterbar._oFiltersButton.setVisible(false);s.oHeader=s.oPage.getHeader();s.oTitle=s.oPage.getTitle();var h=function(){if(!this.oState.oPage.getHeaderExpanded())this.oState.alr_visualFilterToolbar.addContent(this.filterSwitch);else this.oState.alr_visualFilterToolbar.removeContent(this.filterSwitch);s.oTitle.detachEvent("_titlePress",h);};s.oTitle.attachEvent("_titlePress",h,this);if(s.oSmartFilterbar){s.oSmartFilterbar.addStyleClass("alrFilterbar");}if(s.oKpiTagContainer){s.alr_filterContainer.removeContent(s.oKpiTagContainer);s.oKpiTagContainer.addStyleClass("alrKpiTagContainer");}if(s.alr_visualFilterBar){s.alr_visualFilterBar.setSmartFilterContext(this.oState.oSmartFilterbar);s.alr_visualFilterBar.attachFilterChange(this._onVisualFilterChange.bind(this));}s.oSmartFilterbar.attachAfterVariantLoad(this._afterVariantLoad.bind(this));},_afterVariantLoad:function(e){if(this.oState.alr_visualFilterBar){var o=this.oState.oSmartFilterbar.getFilterData();this.oState.alr_visualFilterBar.mergeCompactFilters(o,true);}if(this.oState.oSmartFilterbar.isLiveMode()&&e.mParameters.context!="INIT"){this.oState.oSmartFilterbar.search();}},_onVisualFilterChange:function(e){var g,p,s,h,P,o=this,i=o.oState.oSmartFilterbar.getFilterData(true),r=e.getParameter('bRestoreCompactFilter');if(e.getParameter('filterItemList')){h=e.getParameter('filterItemList');h.forEach(function(k){g=k.getDimensionFilter();p=k.getParentProperty();s=k.getFilterRestriction();if(i){P=i[p]?i[p]:(i[p]!==undefined);}if(P){P=o._modifyCompactFilterData(g,s,p,P);i[p]=P;}});}else{g=e.getParameter('filterList');p=e.getParameter('property');s=e.getParameter('filterRestriction');if(i){P=i[p]?i[p]:(i[p]!==undefined);}if(P){P=this._modifyCompactFilterData(g,s,p,P);i[p]=P;}}if(r){this.oState.oSmartFilterbar.setFilterData(this.compactFilterData,true);if(this.compactFilterData['_CUSTOM']&&Object.keys(this.compactFilterData).length===1){var i=this.oState.oSmartFilterbar.getFilterData(),j=this.oState.oController.getOwnerComponent().getModel("_filter");this.oState.alr_visualFilterBar.mergeCompactFilters(i);j.setData(i);}}else{this.oState.oSmartFilterbar.setFilterData(i);}if(this.oState.oSmartFilterbar.isLiveMode())this.oState.oSmartFilterbar.search();},_modifyCompactFilterData:function(e,s,p,P){if(s==="multiple"){if(P){P.items=[];P.ranges=[];P.value=null;if(e&&e.length>0){e.forEach(function(g,i,h){if(g.tokenText){P.ranges.push({keyField:g.keyField,operation:g.operation,tokenText:g.tokenText,value1:g.value1,value2:g.value2});}else if(g.bIsUserTypedIn){P.value=g.dimValue;}else{P.items.push({key:g.dimValue,text:F.createTitle(g.dimValueDisplay,g.dimValue)});}});}}}else{P=null;if(e.length>0){P=e[0].dimValue;}}return P;},onGoFilter:function(){this.oState.oSmartFilterbar.search();},setDefaultFilter:function(m){var t=this.oState.oController.getOwnerComponent().getModel("_templPriv");t.setProperty('/alp/filterMode',m);this.handleFilterSwitch(m);},createFilterSwitch:function(){var m=this,e=[new S({icon:"sap-icon://filter-fields",width:"inherit",key:d,tooltip:"{i18n>FILTER_COMPACT}"}),new S({icon:"sap-icon://filter-analytics",width:"inherit",key:c,tooltip:"{i18n>FILTER_VISUAL}"})];var g=new b({width:"inherit",selectedKey:"{_templPriv>/alp/filterMode}",items:e,layoutData:new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.NeverOverflow})});g.attachSelect(function(h){m.handleFilterSwitch(h.getParameter("key"),h.oSource._bApplyingVariant);m.oState.oController._templateEventHandlers.onSegmentButtonPressed();});return g;},handleFilterSwitch:function(m,A){var e=this,t=this.oState.oController.getOwnerComponent().getModel("_templPriv");if(!e.oState.filterSwitch&&!e.oState.hideVisualFilter){e.oState.filterSwitch=e.createFilterSwitch();e.oState.alr_visualFilterToolbar.addContent(e.oState.filterSwitch);}if(!e.oState.alr_visualFilterBar){t.setProperty('/alp/filterMode',d);}if(t.getProperty('/alp/filterMode')==c){e.oState.alr_compactFilterContainer.addStyleClass("sapUiHidden");e.oState.alr_visualFilterContainer.removeStyleClass("sapUiHidden");}else if(t.getProperty('/alp/filterMode')==d){if(e.oState.oSmartFilterbar._oToolbar)e.oState.oSmartFilterbar._oToolbar.addStyleClass("sapUiHidden");if(!e.oState.hideVisualFilter){e.oState.alr_visualFilterContainer.addStyleClass("sapUiHidden");}e.oState.alr_compactFilterContainer.removeStyleClass("sapUiHidden");}e.oState.oSmartFilterbar.setMode(m);},showDialog:function(){var m=this,t=m.oState.oController.getOwnerComponent().getModel("_templPriv");if(t.getProperty('/alp/filterMode')===d){m.oState.oSmartFilterbar.showFilterDialog();}else if(t.getProperty('/alp/filterMode')===c){this.compactFilterData=jQuery.extend(true,{},this.oState.oSmartFilterbar.getFilterData());m.oState.visualFilterDialogContainer.launchDialog.call(m.oState.visualFilterDialogContainer);}},clearFilters:function(){var m=this,t=m.oState.oController.getOwnerComponent().getModel("_templPriv");if(t.getProperty('/alp/filterMode')===d){var o=m.oState.oSmartFilterbar.getFilterData();for(var p in o){if(o.hasOwnProperty(p)){delete o[p];}}m.oState.oSmartFilterbar.setFilterData(o,true);}else if(t.getProperty('/alp/filterMode')===c){m.oState.alr_visualFilterBar.clearFilters();}this.oState.chartController.updateTable();}});return f;});
