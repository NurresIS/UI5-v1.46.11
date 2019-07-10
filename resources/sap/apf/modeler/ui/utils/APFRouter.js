/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare('sap.apf.modeler.ui.utils.APFRouter');(function(){"use strict";sap.apf.modeler.ui.utils.APFRouter={patternMatch:function(c){this.params={};var s=this;sap.ui.core.UIComponent.getRouterFor(c).attachRoutePatternMatched(function(e){s.params={name:e.getParameter("name"),arguments:e.getParameter("arguments")};if(s.params.name!=="applicationList"){var C=c.oCoreApi;c.appId=s.params.arguments.appId;c.configId=s.params.arguments.configId;C.getApplicationHandler(function(a){c.applicationHandler=a;c.appName=a.getApplication(c.appId).ApplicationName;var t=c.byId("idConfigTitleMaster").getText();if(t===""||s.params.name==="configurationList"){c.setConfigListMasterTitle(c.appName);c.oTreeInstance.setApplicationId(s.params.arguments.appId);}C.getConfigurationHandler(c.appId,function(b){c.configurationHandler=b;c.oTextPool=c.configurationHandler.getTextPool();if(c.configurationHandler.getList().length>c.getView().getModel().getData().aConfigDetails.length){c.createConfigList();if(s.params.name==="configurationList"){c.updateConfigListView();}}if(c.configurationHandler.getList().length===0&&(c.configId===undefined)){c.oTreeInstance.addNodeInTree(sap.apf.modeler.ui.utils.CONSTANTS.configurationObjectTypes.CONFIGURATION);var d=c.oTreeInstance.getNodes();var n=d[d.length-1];c.oTreeInstance.setSelectedNode(n);}if(c.configId!==undefined){var E=b.getConfiguration(c.configId);if(E){b.loadConfiguration(c.configId,function(f){c.configEditor=f;var p=c.getSPathForConfig(c.configId);if(c.oModel.getData().aConfigDetails[p.split('/')[2]].bIsLoaded===false){c.updateTree();if(s.params.name!=="navigationTarget"){s.setCurrentSelectionState(s.params,c);}}else{s.setCurrentSelectionState(s.params,c);}});}else{s.setCurrentSelectionState(s.params,c);}}});});}});},setCurrentSelectionState:function(p,c){var v=c.getSPathFromURL(p);if(p.name!=="configurationList"){if(v&&v.objectType){if(p.name==="step"){var s=c.getStepConfigDataBysPath(v.sPath);p.bIsHierarchicalStep=s&&s.bIsHierarchicalStep?true:false;}c.updateSubView(p);if(v.sPath){c.setSelectionOnTree(v);}c.updateTitleAndBreadCrumb();}else{c.showNoConfigSelectedText();c.removeSelectionOnTree();}}}};}());
