sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/suite/ui/generic/template/ListReport/extensionAPI/NonDraftTransactionController","sap/suite/ui/generic/template/extensionAPI/NavigationController"],function(q,B,N,a){"use strict";function g(t,c,s){var T;var n;return{getSelectedContexts:function(){return t.oCommonUtils.getSelectedContexts(s.oSmartTable);},getTransactionController:function(){if(t.oCommonUtils.isDraftEnabled()){throw new Error("Transaction support on ListReport for draft case not implemented yet");}T=T||new N(t,c,s);return T;},rebindTable:function(){s.oSmartTable.rebindTable();},refreshTable:function(){t.oCommonUtils.refreshSmartTable(s.oSmartTable);},attachToView:function(C){t.oCommonUtils.attachControlToView(C);},invokeActions:function(f,C,u){var b,p;if(!C){b=[];}else if(C instanceof sap.ui.model.Context){b=[C];}else{b=C;}if(u){p={urlParameters:u};}if(s.oSmartTable){s.oSmartTable.getTable().attachEventOnce("updateFinished",function(){t.oCommonUtils.setEnabledToolbarButtons(s.oSmartTable);t.oCommonUtils.setEnabledFooterButtons(s.oSmartTable,c);});}return t.oServices.oApplicationController.invokeActions(f,b,p);},getNavigationController:function(){if(!n){n=new a(t,c,s);}return n;},securedExecution:function(f,p){return t.oCommonUtils.securedExecution(f,p,s);}};}return B.extend("sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI",{constructor:function(t,c,s){q.extend(this,g(t,c,s));}});});
