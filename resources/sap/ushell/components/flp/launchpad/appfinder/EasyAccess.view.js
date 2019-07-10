// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
sap.ui.define(function(){"use strict";sap.ui.jsview("sap.ushell.components.flp.launchpad.appfinder.EasyAccess",{BUSY_INDICATOR_DELAY:1000,createContent:function(c){this.oResourceBundle=sap.ushell.resources.i18n;this.setModel(this.getViewData().easyAccessSystemsModel,"easyAccessSystemsModel");this.setModel(this.getViewData().subHeaderModel,"subHeaderModel");this.setModel(this.getViewData().parentComponent.getModel());this.hierarchyFolders=sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.flp.launchpad.appfinder.HierarchyFolders",height:"100%",viewData:{navigateHierarchy:this.oController.navigateHierarchy.bind(c),easyAccessSystemsModel:this.getModel("easyAccessSystemsModel"),subHeaderModel:this.getModel("subHeaderModel")}});this.hierarchyFolders.setBusyIndicatorDelay(this.BUSY_INDICATOR_DELAY);this.hierarchyFolders.addStyleClass("sapUshellHierarchyFolders");this.hierarchyFolders.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"role",value:"navigation",writeToDom:true}));this.hierarchyFolders.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"aria-label",value:this.oResourceBundle.getText("easyAccessListNavigationContainer"),writeToDom:true}));this.hierarchyApps=new sap.ui.view(this.getId()+"hierarchyApps",{type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.ushell.components.flp.launchpad.appfinder.HierarchyApps",height:"100%",viewData:{navigateHierarchy:this.oController.navigateHierarchy.bind(c)}});this.hierarchyApps.setBusyIndicatorDelay(this.BUSY_INDICATOR_DELAY);this.hierarchyApps.addStyleClass(" sapUshellAppsView sapMShellGlobalInnerBackground");this.hierarchyApps.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"role",value:"region",writeToDom:true}));this.hierarchyApps.addCustomData(new sap.ushell.ui.launchpad.AccessibilityCustomData({key:"aria-label",value:this.oResourceBundle.getText("easyAccessTileContainer"),writeToDom:true}));this.splitApp=new sap.m.SplitApp({masterPages:this.hierarchyFolders,detailPages:this.hierarchyApps});this.splitApp.setInitialMaster(this.hierarchyFolders);this.splitApp.setInitialDetail(this.hierarchyApps);return this.splitApp;},getControllerName:function(){return"sap.ushell.components.flp.launchpad.appfinder.EasyAccess";}});},false);
