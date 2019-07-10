/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
(function(){'use strict';jQuery.sap.declare("sap.apf.core.resourcePathHandler");jQuery.sap.require("sap.apf.core.utils.filter");jQuery.sap.require("sap.apf.utils.hashtable");jQuery.sap.require("sap.apf.core.messageHandler");jQuery.sap.require("sap.apf.core.messageDefinition");jQuery.sap.require("sap.apf.core.odataProxy");jQuery.sap.require("sap.apf.core.layeredRepositoryProxy");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require("sap.apf.utils.startParameter");jQuery.sap.require("sap.apf.utils.utils");sap.apf.core.ResourcePathHandler=function(i){var t=this;var c=i.instances.coreApi;var m=i.instances.messageHandler;var h=new sap.apf.utils.Hashtable(m);var C;var p;var s=null;var d=jQuery.Deferred();var l=false;var P=sap.apf.core.OdataProxy;o();this.loadConfigFromFilePath=function(F){if(l){return;}l=true;var v=c.getStartParameterFacade().getAnalyticalConfigurationId();var U=F;c.ajax({url:U,dataType:"json",success:w,error:function(J,S,E){var M=m.createMessageObject({code:"5068",aParameters:[U,S,E]});r(M);},async:true});function w(D,S,J){var T=i.functions.checkForTimeout(J);var M;if(T){M=m.createMessageObject({code:"5054",aParameters:[F]});M.setPrevious(T);r(M);}if(!D||!D.applicationConfiguration){r(m.createMessageObject({code:"5055",aParameters:[F]}));}if(D.applicationConfiguration.textResourceLocations===undefined){r(m.createMessageObject({code:"5056",aParameters:[F]}));return;}q(D,v);f().done(function(){if(v){a(v);}else{e();}});}};function u(){return c.getStartParameterFacade().isLrepActive();}function a(v){var w=v.applicationId;var x=v.configurationId;if(u()&&!w){r(m.createMessageObject({code:"5024"}));}var y=new P({serviceRoot:p.path.service,entityTypes:{configuration:sap.apf.core.constants.entitySets.configuration,texts:sap.apf.core.constants.entitySets.texts}},{instances:{coreApi:c,messageHandler:m}});y.readEntity("configuration",function(z,A,B){if(B){r(m.createMessageObject({code:"5022",aParameters:[x]}));d.resolve();}else{var D=JSON.parse(z.SerializedAnalyticalConfiguration);c.loadAnalyticalConfiguration(JSON.parse(z.SerializedAnalyticalConfiguration));w=w||z.Application;b(w,y);if(D.applicationTitle){C.appName=D.applicationTitle.key;C.appTitle=D.applicationTitle.key;}}},[{name:"AnalyticalConfiguration",value:x}],undefined,w,{layer:'ALL'});}function b(v,w){var x=new sap.apf.core.utils.Filter(m,'Application','eq',v);var y=new sap.apf.core.utils.Filter(m,'Language','eq',sap.apf.core.constants.developmentLanguage);y.addAnd(x);var z=["TextElement","TextElementDescription"];w.readCollection('texts',function(A,B,D){if(D){r(m.createMessageObject({code:"5023",aParameters:[sap.apf.utils.uriParameter.getConfigurationId()]}));}else{c.loadTextElements(A);}d.resolve();},undefined,z,y,{layer:'ALL'});}function e(){var U=t.getResourceLocation(sap.apf.core.constants.resourceLocation.analyticalConfigurationLocation);var M;if(U!==""){c.ajax({url:U,dataType:"json",success:function(D,S,J){if(D){c.loadAnalyticalConfiguration(D);if(D.applicationTitle){C.appName=D.applicationTitle.key;C.appTitle=D.applicationTitle.key;}d.resolve();}else{M=m.createMessageObject({code:"5057",aParameters:[U]});r(M);}},error:function(J,S,E,v){M=m.createMessageObject({code:"5057",aParameters:[U]});if(v){M.setPrevious(v);}r(M);},async:false});}else{M=m.createMessageObject({code:"5060"});r(M);}}function f(){c.loadMessageConfiguration(sap.apf.core.messageDefinition,true);return g(sap.apf.core.constants.resourceLocation.applicationMessageDefinitionLocation,false);}function g(R,v){var w=jQuery.Deferred();var U=t.getResourceLocation(R);if(U!==""){c.ajax({url:U,dataType:"json",success:x,error:function(J,S,E,y){var M=m.createMessageObject({code:"5058",aParameters:[S,E,U]});if(y){M.setPrevious(y);}r(M);},async:true});}else{w.resolve();}return w.promise();function x(D,S,J){var M;var T=i.functions.checkForTimeout(J);if(!T){if(D.messageConfiguration){c.loadMessageConfiguration(D.messageConfiguration.definitions,v);}}else{M=m.createMessageObject({code:"5067"});M.setPrevious(T);r(M);}w.resolve();}}function j(v){var M;if(!v||!v.path){M=m.createMessageObject({code:"5066"});r(M);}if(!v.path.service){M=m.createMessageObject({code:"5067"});r(M);}if(v.analyticalConfiguration){if(!v.analyticalConfiguration.service){M=m.createMessageObject({code:sap.apf.core.constants.message.code.errorInAnalyticalConfig,rawText:"service or entity set are missing in analytical configuration in the application configuration"});r(M);}}}function k(v){var M;if(v.evaluations&&!v.evaluations.service){M=m.createMessageObject({code:"5063"});r(M);}if(v.evaluations&&(!v.evaluations.type||v.evaluations.type!=="smartBusinessRequest")){M=m.createMessageObject({code:"5062",rawText:"type in Smart Business configuration is not smartBusinessRequest"});r(M);}if(v.evaluations&&!v.evaluations.entityType){M=m.createMessageObject({code:"5061"});r(M);}}this.getResourceLocation=function(R){return h.getItem(R);};this.getPersistenceConfiguration=function(){var v=jQuery.Deferred();d.done(function(){v.resolve(p);});return v;};this.getConfigurationProperties=function(){var v=jQuery.Deferred();i.corePromise.done(function(){v.resolve(C);});return v;};function n(){var v=sap.apf.core.utils.uriGenerator;var w,x,y;var z=i.manifests.manifest;var A=i.manifests.baseManifest;var M;if(d.state()==='resolved'){return;}var B=v.getBaseURLOfComponent(sap.apf.utils.getComponentNameFromManifest(i.manifests.baseManifest));var D=v.getBaseURLOfComponent(sap.apf.utils.getComponentNameFromManifest(i.manifests.manifest));if(z["sap.app"].dataSources&&z["sap.app"].dataSources.PathPersistenceServiceRoot){y=z["sap.app"].dataSources.PathPersistenceServiceRoot.uri;}else{M=m.createMessageObject({code:"5064"});r(M);}var E=A["sap.app"].i18n;E=v.addRelativeToAbsoluteURL(B,E);var F=z["sap.app"].i18n;F=v.addRelativeToAbsoluteURL(D,F);var G=z["sap.app"].title;var H=sap.apf.utils.createPseudoGuid();c.registerTextWithKey(H,G);var I=c.getStartParameterFacade().getAnalyticalConfigurationId();var J="";if(z["sap.app"].dataSources&&z["sap.app"].dataSources.AnalyticalConfigurationLocation&&z["sap.app"].dataSources.AnalyticalConfigurationLocation.uri){J=z["sap.app"].dataSources.AnalyticalConfigurationLocation.uri;J=v.addRelativeToAbsoluteURL(D,J);}if(!I&&!J){M=m.createMessageObject({code:"5065"});r(M);}var K={"appName":H,"appTitle":H,"analyticalConfigurationLocation":J,"textResourceLocations":{"apfUiTextBundle":E,"applicationUiTextBundle":F},"persistence":{"path":{"service":y}}};if(z["sap.apf"]&&z["sap.apf"].appSpecificParameters){for(w in z["sap.apf"].appSpecificParameters){K[w]=z["sap.apf"].appSpecificParameters[w];}}if(u()){P=sap.apf.core.LayeredRepositoryProxy;}if(z["sap.app"].dataSources&&z["sap.app"].dataSources.SmartBusiness){x=z["sap.app"].dataSources.SmartBusiness.uri;K.smartBusiness={runtime:{service:x}};}if(z["sap.app"].dataSources&&z["sap.app"].dataSources.LogicalSystem){K.persistence.logicalSystem={service:z["sap.app"].dataSources.LogicalSystem.uri};}q({applicationConfiguration:K},I);f().done(function(){if(I){a(I);}else{e();}});}function o(){var A=c.getUriGenerator().getApfLocation();h.setItem(sap.apf.core.constants.resourceLocation.apfUiTextBundle,A+"resources/i18n/apfUi.properties");h.setItem(sap.apf.core.constants.resourceLocation.applicationMessageDefinitionLocation,"");h.setItem(sap.apf.core.constants.resourceLocation.applicationMessageTextBundle,"");h.setItem(sap.apf.core.constants.resourceLocation.applicationUiTextBundle,"");h.setItem(sap.apf.core.constants.resourceLocation.analyticalConfigurationLocation,"");}function q(v,w){function x(A){C=jQuery.extend(true,{},A);delete C.type;delete C.analyticalConfigurationLocation;delete C.applicationMessageDefinitionLocation;delete C.textResourceLocations;delete C.persistence;}var A=v.applicationConfiguration;x(A);var T=v.applicationConfiguration.textResourceLocations;p=v.applicationConfiguration.persistence;j(p);if(!p.path.entitySet){p.path.entitySet=sap.apf.core.constants.entitySets.analysisPath;}if(v.applicationConfiguration.smartBusiness){s=v.applicationConfiguration.smartBusiness;k(s);}var M;var U;var y;for(y in sap.apf.core.constants.resourceLocation){if(!sap.apf.core.constants.resourceLocation.hasOwnProperty(y)){continue;}if(y===sap.apf.core.constants.resourceLocation.analyticalConfigurationLocation&&w){continue;}if(A[y]!==undefined){U=A[y];}else if(T[y]!==undefined){U=T[y];}else{continue;}if(i.manifests){h.setItem(y,U);}else if(y===sap.apf.core.constants.resourceLocation.apfUiTextBundle||i.instances.fileExists.check(U)){h.setItem(y,U);}else if(!w){M=m.createMessageObject({code:"5059",aParameters:[U,y]});r(M);}}}function r(v){m.putMessage(v);}if(i.manifests&&i.manifests.manifest){n();}if(i.corePromise){jQuery.when(d).done(function(){i.corePromise.resolve();});}};}());
