jQuery.sap.declare('sap.zen.dsh.library-all');if(!jQuery.sap.isDeclared('sap.zen.dsh.DshRenderer')){jQuery.sap.declare("sap.zen.dsh.DshRenderer");sap.zen.dsh.DshRenderer={};sap.zen.dsh.DshRenderer.render=function(r,c){r.write("<div");r.writeControlData(c);r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.addClass("sapZenDshDsh");r.writeStyles();r.writeClasses();r.write(">");r.write("<div id=\""+c.getId()+"sapbi_snippet_ROOT\" ");r.write("style=\"");r.write("width:100%;");r.write("height:100%;");r.write("\">");r.write("</div>");r.write("</div>");};};if(!jQuery.sap.isDeclared('sap.zen.dsh.fioriwrapper.Component')){jQuery.sap.require('sap.ui.core.UIComponent');jQuery.sap.declare("sap.zen.dsh.fioriwrapper.Component");sap.ui.core.UIComponent.extend("sap.zen.dsh.fioriwrapper.Component",{metadata:{"manifest":"json"}});sap.zen.dsh.fioriwrapper.Component.prototype.createContent=function(){jQuery.sap.require("sap.zen.dsh.Dsh");jQuery.sap.require("sap.ui.generic.app.navigation.service.NavigationHandler");sap.zen.dsh.scriptLoaded=true;var a="";var c=this.getMetadata().getConfig();var m={};var r;var n={};var t;function b(M,v,V){if(Array.isArray(M)){for(var e in M){v[M[e]]=V;}}else{v[M]=V;}}if(c){if(c.semanticObjectMappings){m=c.semanticObjectMappings;r={};for(var k in m){if(m.hasOwnProperty(k)){b(m[k],r,k);}}}if(c.appName){a=c.appName;}if(c.systemAlias){t=c.systemAlias;}}if(this.getComponentData().startupParameters){if(this.getComponentData().startupParameters.appName)a=this.getComponentData().startupParameters.appName;if(this.getComponentData().startupParameters["sap-system"]){t=this.getComponentData().startupParameters["sap-system"];}}var d=new sap.zen.dsh.Dsh({height:"100%",width:"100%",deployment:"bw",dshAppName:a,repoPath:c.repoPath||"",semanticMappings:m,appComponent:this,systemAlias:t,deferCreation:true});if(this.getComponentData().startupParameters){var p=null;for(param in this.getComponentData().startupParameters){if(this.getComponentData().startupParameters.hasOwnProperty(param)&&param!=="newBW"){p=this.getComponentData().startupParameters[param][0];d.addParameter(param,p);if(m&&m.hasOwnProperty(param)){b(m[param],n,p);}else{n[param]=p;}}}}var N=new sap.ui.generic.app.navigation.service.NavigationHandler(this);var P=N.parseNavigation();P.always(function(s,u,e){d.initializeAppStateData.call(d,s,n);if(c.navigationSourceObjects){d.addParameter("NAV_SOURCES",JSON.stringify(c.navigationSourceObjects));}if(r){d.addParameter("NAV_SEMANTIC_MAPPINGS",JSON.stringify(r));}d.createPage();});return d;}};if(!jQuery.sap.isDeclared('sap.zen.dsh.library')){
/*!
 * (c) Copyright 2010-2017 SAP SE or an SAP affiliate company.
 */
jQuery.sap.declare("sap.zen.dsh.library");jQuery.sap.require('sap.ui.core.Core');jQuery.sap.require('sap.ui.core.library');jQuery.sap.require('sap.ui.table.library');jQuery.sap.require('sap.ui.layout.library');jQuery.sap.require('sap.m.library');jQuery.sap.require('sap.zen.commons.library');jQuery.sap.require('sap.zen.crosstab.library');sap.ui.getCore().initLibrary({name:"sap.zen.dsh",dependencies:["sap.ui.core","sap.ui.table","sap.ui.layout","sap.m","sap.zen.commons","sap.zen.crosstab"],types:[],interfaces:[],controls:["sap.zen.dsh.AnalyticGrid","sap.zen.dsh.Dsh"],elements:[],version:"1.46.3"});};if(!jQuery.sap.isDeclared('sap.zen.dsh.AnalyticGrid')){jQuery.sap.declare("sap.zen.dsh.AnalyticGrid");jQuery.sap.require('sap.ui.core.Control');sap.ui.core.Control.extend("sap.zen.dsh.AnalyticGrid",{metadata:{library:"sap.zen.dsh",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"selectionVariant":{type:"object",group:"Data",defaultValue:null},"queryName":{type:"string",group:"Data",defaultValue:null},"systemAlias":{type:"string",group:"Data",defaultValue:null}}}});var DSH_deployment=true;var sapbi_dshControl;var sapbi_ajaxHandler=sapbi_ajaxHandler||{};window.sapbi_page=window.sapbi_page||{};sapbi_page.getParameter=sapbi_page.getParameter||function(){return"";};var sapbi_MIMES_PIXEL=sapbi_MIMES_PIXEL||"";sapbi_page.staticMimeUrlPrefix=sap.ui.resource("sap.zen.dsh","rt/");if(!window.sap){window.sap={};}if(!sap.zen){sap.zen={};}sap.zen.doReplaceDots=true;sap.zen.dsh.AnalyticGrid.prototype.init=function(){this.initial=true;this.parameters={};this.dshBaseUrl=sap.ui.resource("sap.zen.dsh","rt/");if(sapbi_dshControl){sapbi_dshControl.logoff();}sapbi_dshControl=this;};sap.zen.dsh.AnalyticGrid.prototype.doInit=function(){this.repositoryUrl=sap.ui.resource("sap.zen.dsh","applications/");this.addParameter("XQUERY",this.getQueryName());if(this.initial==false){return;}this.initial=false;jQuery.sap.require("sap.zen.dsh.rt.all");if(jQuery.sap.debug()=="true"){jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.jszip");jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.xlsx");}this.initializeSelectionVariant(this.getSelectionVariant());var t=this;setTimeout(function(){t.doIt();},0);};sap.zen.dsh.AnalyticGrid.prototype.doIt=function(){this.doInit();sap.zen.dsh.scriptLoaded=true;var t=this;var c=sap.ui.getCore().getConfiguration();language=c.getLocale().getSAPLogonLanguage();if(!language||language==""){language=window.navigator.userLanguage||window.navigator.language;}var a="";if(document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(document.cookie);if(m&&m[1]){a=m[1];}}var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var d=new sap.zen.DesignStudio();d.setHost(document.location.hostname);d.setPort(document.location.port);d.setProtocol(document.location.protocol.split(":")[0]);d.setClient(a);d.setLanguage(language);if(this.repositoryUrl){d.setRepositoryUrl(this.repositoryUrl);}d.setApplicationPath(this.repositoryUrl+"0ANALYTIC_GRID");d.setApplicationName("0ANALYTIC_GRID");d.setUrlParameter(u);d.setSdkLoaderPath("");d.setHanaMode(true);d.setDshControlId(t.getId());d.setStaticMimesRootPath(this.dshBaseUrl);d.setSystemAlias(this.getSystemAlias());d.setNewBW(true);var p=d.createPage();window[t.getId()+"Buddha"]=p;var s=s||{};s.staticMimeUrlPrefix=this.dshBaseUrl;s.getParameter=function(){return"";};sapbi_MIMES_PIXEL="";window.sapbi_page=s;var z=document.createElement('link');z.setAttribute("type","text/css");z.setAttribute("rel","stylesheet");z.setAttribute("href",URI(s.staticMimeUrlPrefix+"zen_rt_framework/resources/css/zen.css").normalize().toString());document.getElementsByTagName("head")[0].appendChild(z);};sap.zen.dsh.AnalyticGrid.prototype.onAfterRendering=function(){this.doInit();};sap.zen.dsh.AnalyticGrid.prototype.logoff=function(){if(window[this.getId()+"Buddha"]){if(!this.loggedOff){this.loggedOff=true;window.buddhaHasSendLock++;window[this.getId()+"Buddha"].exec("APPLICATION.logoff();");}}};sap.zen.dsh.AnalyticGrid.prototype.exit=function(){this.logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}if(sapbi_dshControl&&sapbi_dshControl===this){sapbi_dshControl=undefined;}};sap.zen.dsh.AnalyticGrid.prototype.addParameter=function(n,v){this.parameters[n]=v;};sap.zen.dsh.AnalyticGrid.prototype.executeScript=function(s){this.page.exec(s);};sap.zen.dsh.AnalyticGrid.prototype.initializeSelectionVariant=function(s){function a(O,v,V){if(!v.hasOwnProperty(O)){v[O]=V;}}oNavParams={};if(s){var p=s.Parameters;var S=s.SelectOptions;if(p){for(var b=0;b<p.length;b++){var P=p[b];oNavParams[P.PropertyName]=P.PropertyValue;}}if(S){for(var i=0;i<S.length;++i){var o=S[i];var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var c;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){c=R.Low;}else{c={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(c);}if(f.length>0){a(o.PropertyName,oNavParams,f);}}}}if(!jQuery.isEmptyObject(oNavParams)){this.addParameter("NAV_PARAMS",JSON.stringify(oNavParams));}}};if(!jQuery.sap.isDeclared('sap.zen.dsh.AnalyticGridRenderer')){jQuery.sap.declare("sap.zen.dsh.AnalyticGridRenderer");sap.zen.dsh.AnalyticGridRenderer=sap.zen.dsh.DshRenderer;};if(!jQuery.sap.isDeclared('sap.zen.dsh.Dsh')){jQuery.sap.declare("sap.zen.dsh.Dsh");jQuery.sap.require('sap.ui.core.Control');sap.ui.core.Control.extend("sap.zen.dsh.Dsh",{metadata:{publicMethods:["addParameter","executeScript","getDataSource","getComponent","getPage","createPage","initializeAppStateData","initializeAppState"],library:"sap.zen.dsh",properties:{"dshAppName":{type:"string",group:"Misc",defaultValue:'0ANALYSIS'},"repoPath":{type:"string",group:"Misc",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"height":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"deployment":{type:"string",group:"Misc",defaultValue:'bw'},"protocol":{type:"string",group:"Misc",defaultValue:null},"client":{type:"string",group:"Misc",defaultValue:null},"language":{type:"string",group:"Misc",defaultValue:null},"semanticMappings":{type:"object",group:"Misc",defaultValue:null},"appComponent":{type:"object",group:"Misc",defaultValue:null},"deferCreation":{type:"boolean",group:"Misc",defaultValue:false},"systemAlias":{type:"string",group:"Misc",defaultValue:null}}}});sap.ui.getCore().loadLibrary("sap.viz");new sap.viz.ui5.VizContainer();(function(g,$,u){"use strict";function w(f){if(!f){return;}var o=f.format;f.format=function(v,t){return t?o.call(this,v,t):v;};}if(g.require){w(g.require("sap/viz/format/FormatManager"));}})(window,jQuery);var DSH_deployment=true;var sapbi_dshControl;var sapbi_ajaxHandler=sapbi_ajaxHandler||{};window.sapbi_page=window.sapbi_page||{};sapbi_page.getParameter=sapbi_page.getParameter||function(){return"";};var sapbi_MIMES_PIXEL=sapbi_MIMES_PIXEL||"";sapbi_page.staticMimeUrlPrefix=sap.ui.resource("sap.zen.dsh","rt/");if(!window.sap){window.sap={};}if(!sap.zen){sap.zen={};}sap.zen.doReplaceDots=true;sap.zen.dsh.Dsh.prototype.init=function(){this.initial=true;this.parameters={};this.dshBaseUrl=sap.ui.resource("sap.zen.dsh","rt/");this.dshBaseAppUrlBW="/sap/bw/Mime";if(sapbi_dshControl){sapbi_dshControl.logoff();}sapbi_dshControl=this;};sap.zen.dsh.Dsh.prototype.doInit=function(){if(this.getDshAppName()==="0ANALYSIS"||this.getDshAppName()==="0ANALYTIC_GRID"){this.setRepoPath(sap.ui.resource("sap.zen.dsh","applications/"));}else{sap.ui.getCore().loadLibrary("sap.ui.commons");}if(this.getRepoPath()!==""){this.repositoryUrl=this.getRepoPath();}if(this.initial==false){return;}this.initial=false;jQuery.sap.require("sap.zen.dsh.rt.all");if(jQuery.sap.debug()=="true"){jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.jszip");jQuery.sap.require("sap.zen.dsh.rt.zen_rt_firefly.js.xlsx");}var t=this;if(!this.getDeferCreation()){setTimeout(function(){t.doIt();},0);}};sap.zen.dsh.Dsh.prototype.createPage=function(){this.doIt();};sap.zen.dsh.Dsh.prototype.doIt=function(){this.doInit();sap.zen.dsh.scriptLoaded=true;var t=this;{var l=t.getLanguage();if(l==""){var c=sap.ui.getCore().getConfiguration();l=c.getLocale().getSAPLogonLanguage();if(!l||l==""){l=window.navigator.userLanguage||window.navigator.language;}}var a=t.getClient();if(a==""&&document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(document.cookie);if(m&&m[1]){a=m[1];}}var p=t.getProtocol();if(p==""){if(window.location.protocol.indexOf("https")!=-1){p="https";}else{p="http";}}var d=t.getDeployment();if((d==null)||(d.length==0)){d="bw";}var b=t.getDshAppName();var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var e=new sap.zen.DesignStudio();e.setHost(document.location.hostname);e.setPort(document.location.port);e.setProtocol(document.location.protocol.split(":")[0]);e.setClient(a);e.setLanguage(l);if(this.repositoryUrl){e.setRepositoryUrl(this.repositoryUrl);}e.setApplicationPath(this.dshBaseAppUrlBW);e.setApplicationName(b);e.setUrlParameter(u);e.setSdkLoaderPath("");e.setHanaMode(true);e.setDshControlId(t.getId());e.setStaticMimesRootPath(this.dshBaseUrl);e.setSystemAlias(this.getSystemAlias());if(d==="bw2"||d==="bw"){e.setNewBW(true);}var f=e.createPage();window[t.getId()+"Buddha"]=f;var s=s||{};s.staticMimeUrlPrefix=this.dshBaseUrl;s.getParameter=function(){return"";};sapbi_MIMES_PIXEL="";if(this.getAppComponent()){s.appComponent=this.getAppComponent();}window.sapbi_page=s;var z=document.createElement('link');z.setAttribute("type","text/css");z.setAttribute("rel","stylesheet");z.setAttribute("href",URI(s.staticMimeUrlPrefix+"zen_rt_framework/resources/css/zen.css").normalize().toString());document.getElementsByTagName("head")[0].appendChild(z);var g=f.getApplicationPropertiesComponent().getCustomCSSName();if(g){var h=document.createElement('link');h.setAttribute("type","text/css");h.setAttribute("rel","stylesheet");h.setAttribute("href",URI(f.getRelativePathToApp()+g).normalize().toString());document.getElementsByTagName("head")[0].appendChild(h);}};};sap.zen.dsh.Dsh.prototype.onAfterRendering=function(){this.doInit();};sap.zen.dsh.Dsh.prototype.logoff=function(){if(window[this.getId()+"Buddha"]){if(!this.loggedOff){this.loggedOff=true;window.buddhaHasSendLock++;window[this.getId()+"Buddha"].exec("APPLICATION.logoff();");}}};sap.zen.dsh.Dsh.prototype.exit=function(){this.logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}if(sapbi_dshControl&&sapbi_dshControl===this){sapbi_dshControl=undefined;}};sap.zen.dsh.Dsh.prototype.addParameter=function(n,v){this.parameters[n]=v;};sap.zen.dsh.Dsh.prototype.executeScript=function(s){this.page.exec(s);};sap.zen.dsh.Dsh.prototype.getDataSource=function(n){return this.page.getDataSource(n);};sap.zen.dsh.Dsh.prototype.getComponent=function(n){return this.page.getComponent(n);};sap.zen.dsh.Dsh.prototype.getPage=function(){return this.page;};sap.zen.dsh.Dsh.prototype.getMapping=function(n){if(this.getSemanticMappings()&&this.getSemanticMappings()[n]){return this.getSemanticMappings()[n];}return n;};sap.zen.dsh.Dsh.prototype.initializeAppStateData=function(s,n){function a(m,v,V){if(Array.isArray(m)){for(var e in m){if(!v.hasOwnProperty(m[e])){v[m[e]]=V;}}}else{if(!v.hasOwnProperty(m)){v[m]=V;}}}n=n||{};if(s&&s.customData&&s.customData.bookmarkedAppState){this.addParameter("NAV_INITIAL_STATE",s.customData.bookmarkedAppState);}if(s&&s.selectionVariant){var S=s.selectionVariant;if(typeof S!=="object"){if((typeof s.oSelectionVariant==="object")&&s.oSelectionVariant.toJSONObject){S=s.oSelectionVariant.toJSONObject();}}var p=S.Parameters;var b=S.SelectOptions;if(p){for(var c=0;c<p.length;c++){var P=p[c];n[P.PropertyName]=P.PropertyValue;}}if(b){for(var i=0;i<b.length;++i){var o=b[i];var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var d;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){d=R.Low;}else{d={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(d);}if(f.length>0){a(this.getMapping(o.PropertyName),n,f);}}}}if(!jQuery.isEmptyObject(n)){this.addParameter("NAV_PARAMS",JSON.stringify(n));}};sap.zen.dsh.Dsh.prototype.initializeAppState=function(s,n){if(s){var S={};if(s.getData&&typeof s.getData==="function"){S=s.getData();}this.initializeAppStateData(S,n);}};};