/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.collaboration.components.socialtimeline.datahandlers.SMIntegrationDataHandler");jQuery.sap.require("sap.collaboration.components.utils.OdataUtil");sap.ui.base.Object.extend("sap.collaboration.components.socialtimeline.datahandlers.SMIntegrationDataHandler",{constructor:function(s){this._oLogger=jQuery.sap.log.getLogger("sap.collaboration.components.socialtimeline.datahandlers.SMIntegrationDataHandler");this._oSMIntegrationModel=s;this._oOdataUtil=new sap.collaboration.components.utils.OdataUtil();this.oJamConfigurationStatusMap={configurationOk:0,configuartionError:1};},mapInternalBOToExternalBO:function(i){var p=this.getExternalObjectMapping(i).promise.then(function(d){this._oLogger.info("External business object mapping was found.");return d.MapInternalBOToExternalBO;}.bind(this));return p.promise();},getJamConfigurationStatus:function(c,C){var o="/GetJamConfigurationStatus";var t=this;var p={async:false,success:function(d,r){if(d.GetJamConfigurationStatus.StatusCode===t.oJamConfigurationStatusMap.configurationOk){c(true);}else{c(false);}},error:function(e){t._oLogger.error(JSON.stringify(e));C();}};this._oSMIntegrationModel.read(o,p);},getExternalObjectMapping:function(i){var t=this;var e="/MapInternalBOToExternalBO";var p=jQuery.Deferred();var u={};u["ApplicationContext"]="'"+i.appContext+"'";u["ODataCollection"]="'"+i.collection+"'";u["ODataKeyPredicate"]="'"+i.key+"'";u["ODataServicePath"]="'"+i.odataServicePath+"'";var s=function(d,r){t._oLogger.info("External object mapping found");p.resolve(d,r);};var E=function(o){t._oLogger.error(o.response.statusText);p.reject(o);};var P={context:null,urlParameters:u,async:true,filters:[],sorters:[],success:s,error:E};return{request:this._oSMIntegrationModel.read(e,P),promise:p.promise()};}});
