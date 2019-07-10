// @copyright@
(function(){"use strict";var p="sap.ushell.components.container.",c=p+"ApplicationContainer",d="sap.ushell.Container.dirtyState.",l,r;jQuery.sap.declare("sap.ushell.components.container.ApplicationContainer");jQuery.sap.require("sap.ushell.utils");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.ui.core.UIComponent");function a(T){var e=sap.ushell.Container.getService("CrossApplicationNavigation");e.isUrlSupported(T.url).done(function(){T.promise.resolve({"allowed":true,"id":T.id});}).fail(function(){T.promise.resolve({"allowed":false,"id":T.id});});}function i(){jQuery.sap.require("sap.m.MessagePopover");var M={"asyncURLHandler":sap.ushell.components.container.ApplicationContainer.prototype._adaptIsUrlSupportedResultForMessagePopover};if(sap.m.MessagePopover&&sap.m.MessagePopover.setDefaultHandlers){sap.m.MessagePopover.setDefaultHandlers(M);}}sap.ui.getCore().getEventBus().subscribe("sap.ushell","coreResourcesFullyLoaded",i);l=new sap.ushell.utils.Map();sap.ushell.components.container.ApplicationType={URL:"URL",WDA:"WDA",NWBC:"NWBC",TR:"TR"};function g(e){return l.get(e.getId());}function b(U){var P=jQuery.sap.getUriParameters(U).mParams,e=P["sap-xapp-state"],R;delete P["sap-xapp-state"];R={startupParameters:P};if(e){R["sap-xapp-state"]=e;}return R;}function f(K,e){if(!r){r=jQuery.sap.resources({url:jQuery.sap.getModulePath(p)+"/resources/resources.properties",language:sap.ui.getCore().getConfiguration().getLanguage()});}return r.getText(K,e);}function h(){return new sap.ui.core.Icon({size:"2rem",src:"sap-icon://error",tooltip:sap.ushell.components.container.ApplicationContainer.prototype._getTranslatedText("an_error_has_occured")});}function j(e){var D=e.getAggregation("child"),E;if(D instanceof sap.ui.core.ComponentContainer){E=D.getComponentInstance().getMetadata().getName().replace(/\.Component$/,"");jQuery.sap.log.debug("unloading component "+E,null,c);}e.destroyAggregation("child");}function k(e,U,D){var E,F,I,L,M,G,N,V={},H,J;I=U.indexOf("?");if(I>=0){G=sap.ushell.components.container.ApplicationContainer.prototype._getParameterMap(U);V=G.startupParameters;U=U.slice(0,I);}if(U.slice(-1)!=='/'){U+='/';}if(/\.view\.(\w+)$/i.test(D)){M=/^SAPUI5=(?:([^\/]+)\/)?([^\/]+)\.view\.(\w+)$/i.exec(D);if(!M){jQuery.sap.log.error("Invalid SAPUI5 URL",D,c);return sap.ushell.components.container.ApplicationContainer.prototype._createErrorControl();}N=M[1];H=M[2];J=M[3].toUpperCase();if(N){H=N+"."+H;}else{L=H.lastIndexOf(".");if(L<1){jQuery.sap.log.error("Missing namespace",D,c);return sap.ushell.components.container.ApplicationContainer.prototype._createErrorControl();}N=H.slice(0,L);}}else{N=D.replace(/^SAPUI5=/,"");}jQuery.sap.registerModulePath(N,U+N.replace(/\./g,'/'));sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);if(H){if(e.getApplicationConfiguration()){V.config=e.getApplicationConfiguration();}F=sap.ui.view({id:e.getId()+"-content",type:J,viewData:V||{},viewName:H});e.fireEvent("applicationConfiguration");}else{jQuery.sap.log.debug("loading component "+N,null,c);var K=G?{startupParameters:G.startupParameters}:{startupParameters:{}};if(G&&G["sap-xapp-state"]){K["sap-xapp-state"]=G["sap-xapp-state"];}if(e.getApplicationConfiguration()){K.config=e.getApplicationConfiguration();}E=sap.ui.component({id:e.getId()+"-component",componentData:K,name:N});e.fireEvent("applicationConfiguration",{"configuration":E.getMetadata().getConfig()});F=new sap.ui.core.ComponentContainer({id:e.getId()+"-content",component:E});}F.setWidth(e.getWidth());F.setHeight(e.getHeight());F.addStyleClass("sapUShellApplicationContainer");e.setAggregation("child",F,true);return F;}function m(e,D){setTimeout(function(){sap.ui.getCore().getEventBus().publish("sap.ushell.components.container.ApplicationContainer",e,D);},0);}function n(e,U,D){var I,E,F,G,H={startupParameters:{}},J,K=e.getComponentHandle(),P=sap.ushell.Container.getService("PluginManager"),L,M;sap.ushell.utils.addTime("createUi5Component");I=U.indexOf("?");if(I>=0){G=sap.ushell.components.container.ApplicationContainer.prototype._getParameterMap(U);H={startupParameters:G.startupParameters};if(G["sap-xapp-state"]){H["sap-xapp-state"]=G["sap-xapp-state"];}U=U.slice(0,I);}if(e.getApplicationConfiguration()){H.config=e.getApplicationConfiguration();}if(U.slice(-1)!=='/'){U+='/';}jQuery.sap.registerModulePath(D,U);sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);J={id:e.getId()+"-component",name:D,componentData:H};jQuery.sap.log.debug("Creating component instance for "+D,JSON.stringify(J),c);sap.ui.getCore().getEventBus().publish("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",{name:D});if(K){E=K.getInstance(J);}else{jQuery.sap.log.error("No component handle available for '"+D+"'; fallback to component.load()",null,c);E=sap.ui.component({id:e.getId()+"-component",name:D,componentData:H});}e.fireEvent("applicationConfiguration",{"configuration":E.getMetadata().getConfig()});F=new sap.ui.core.ComponentContainer({id:e.getId()+"-content",component:E});F.setHeight(e.getHeight());F.setWidth(e.getWidth());F.addStyleClass("sapUShellApplicationContainer");e._disableRouterEventHandler=sap.ushell.components.container.ApplicationContainer.prototype._disableRouter.bind(this,E);sap.ui.getCore().getEventBus().subscribe("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",e._disableRouterEventHandler);e.setAggregation("child",F,true);if(P){L=P.getPluginLoadingPromise("RendererExtensions");M=L&&L.state();if(M==="pending"){L.done(function(){sap.ushell.components.container.ApplicationContainer.prototype._publishExternalEvent("componentCreated",{component:E});}).fail(function(){sap.ushell.components.container.ApplicationContainer.prototype._publishExternalEvent("componentCreated",{component:E});});}if(M==="resolved"||M==="rejected"){sap.ushell.components.container.ApplicationContainer.prototype._publishExternalEvent("componentCreated",{component:E});}}sap.ushell.components.container.ApplicationContainer.prototype._publishExternalEvent("componentCreated",{component:E});return F;}function o(e){var D;if((e instanceof sap.ui.core.Component)&&(typeof e.getRouter==="function")){D=e.getRouter();if(D&&(typeof D.stop==="function")){jQuery.sap.log.info("router stopped for instance "+e.getId());D.stop();}}}function q(U){var e=document.createElement("a"),D=jQuery.sap.getUriParameters(U).get("sap-client"),E;e.href=U;E=e.protocol+"//"+e.host;return new sap.ushell.System({alias:D?E+"?sap-client="+D:E,baseUrl:E,client:D||undefined,platform:"abap"});}function s(e,M){var T=false,D=e.getDomRef(),E=e.getApplicationType(),U,O;if(D){if(sap.ushell.utils.isApplicationTypeNWBCRelated(E)){U=URI(D.src);O=U.protocol()+"://"+U.host();T=(M.source===D.contentWindow)||(M.origin===O);}else if(E===sap.ushell.components.container.ApplicationType.URL){U=URI();O=U.protocol()+"://"+U.host();T=(M.origin===O);}}return T;}function t(S,e,O){var R=JSON.stringify({type:"request",service:e,request_id:jQuery.sap.uid(),body:{}});jQuery.sap.log.debug("Sending post message request to origin ' "+O+"': "+R,null,"sap.ushell.components.container.ApplicationContainer");S.postMessage(R,O);}function u(e,M,D){var P=jQuery.sap.getObject("sap-ushell-config.services.PostMessage.config",0),S=D&&D.service,E;jQuery.sap.log.debug("Received post message request from origin '"+M.origin+"': "+JSON.stringify(D),null,"sap.ushell.components.container.ApplicationContainer");if(D.type!=="request"||!S||(S.indexOf("sap.ushell.services.CrossApplicationNavigation")!==0&&S.indexOf("sap.ushell.CrossApplicationNavigation")!==0&&S.indexOf("sap.ushell.ui5service.ShellUIService")!==0)){return;}E=S.split(".")[3];if(P&&P.enabled===false){jQuery.sap.log.warning("Received message for "+E+", but this "+"feature is disabled. It can be enabled via launchpad configuration "+"property 'services.PostMessage.config.enabled: true'",undefined,"sap.ushell.components.container.ApplicationContainer");return;}if(!sap.ushell.components.container.ApplicationContainer.prototype._isTrustedPostMessageSource(e,M)){jQuery.sap.log.warning("Received message from untrusted origin '"+M.origin+"': "+JSON.stringify(M.data),null,"sap.ushell.components.container.ApplicationContainer");return;}function F(J,K){var R=JSON.stringify({type:"response",service:D.service,request_id:D.request_id,status:J,body:K});jQuery.sap.log.debug("Sending post message response to origin ' "+M.origin+"': "+R,null,"sap.ushell.components.container.ApplicationContainer");M.source.postMessage(R,M.origin);}function G(M,D){var J=new jQuery.Deferred(),K;if(D.body&&D.body.callbackMessage&&D.body.callbackMessage.service){K=sap.ushell.components.container.ApplicationContainer.prototype._backButtonPressedCallback.bind(null,M.source,D.body.callbackMessage.service,M.origin);}J.resolve(e.getShellUIService().setBackNavigation(K));return J.promise();}function H(E){switch(E){case"sap.ushell.services.CrossApplicationNavigation.hrefForExternal":return new jQuery.Deferred().resolve(sap.ushell.Container.getService("CrossApplicationNavigation").hrefForExternal(D.body.oArgs)).promise();case"sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks":return sap.ushell.Container.getService("CrossApplicationNavigation").getSemanticObjectLinks(D.body.sSemanticObject,D.body.mParameters,D.body.bIgnoreFormFactors,undefined,undefined,D.body.bCompactIntents);case"sap.ushell.services.CrossApplicationNavigation.isIntentSupported":return sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported(D.body.aIntents);case"sap.ushell.services.CrossApplicationNavigation.isNavigationSupported":return sap.ushell.Container.getService("CrossApplicationNavigation").isNavigationSupported(D.body.aIntents);case"sap.ushell.services.CrossApplicationNavigation.toExternal":return new jQuery.Deferred().resolve(sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(D.body.oArgs)).promise();case"sap.ushell.CrossApplicationNavigation.backToPreviousApp":sap.ushell.Container.getService("CrossApplicationNavigation").backToPreviousApp();return new jQuery.Deferred().resolve().promise();case"sap.ushell.services.CrossApplicationNavigation.backToPreviousApp":sap.ushell.Container.getService("CrossApplicationNavigation").backToPreviousApp();return new jQuery.Deferred().resolve().promise();case"sap.ushell.services.CrossApplicationNavigation.getAppStateData":return sap.ushell.Container.getService("CrossApplicationNavigation").getAppStateData(D.body.sAppStateKey);case"sap.ushell.ui5service.ShellUIService.setTitle":return new jQuery.Deferred().resolve(e.getShellUIService().setTitle(D.body.sTitle)).promise();case"sap.ushell.ui5service.ShellUIService.setBackNavigation":return G(M,D);default:return undefined;}}try{H(D.service).done(function(R){F("success",{result:R});}).fail(function(J){F("error",{message:J});});}catch(I){F("error",{message:I.message});}}function v(D,M){var E=M.data;if(typeof E==="string"){try{E=JSON.parse(M.data);}catch(e){jQuery.sap.log.debug("Message received from origin '"+M.origin+"' cannot be parsed: "+e,E,"sap.ushell.components.container.ApplicationContainer");return;}}if(E.action==="pro54_setGlobalDirty"&&localStorage.getItem(D.globalDirtyStorageKey)===sap.ushell.Container.DirtyState.PENDING){if(!sap.ushell.components.container.ApplicationContainer.prototype._isTrustedPostMessageSource(D,M)){jQuery.sap.log.warning("Received message from untrusted origin: "+M.origin,E,"sap.ushell.components.container.ApplicationContainer");return;}jQuery.sap.log.debug("getGlobalDirty() pro54_setGlobalDirty SetItem key:"+D.globalDirtyStorageKey+" value: "+E.parameters.globalDirty,null,"sap.ushell.components.container.ApplicationContainer");sap.ushell.utils.localStorageSetItem(D.globalDirtyStorageKey,E.parameters.globalDirty,true);}else{sap.ushell.components.container.ApplicationContainer.prototype._handleServiceMessageEvent(D,M,E);}}function w(e,E){var I=e.getDomRef(),D=e.getApplicationType();if(sap.ushell.utils.isApplicationTypeNWBCRelated(e.getApplicationType(D))&&I&&I.tagName==="IFRAME"){I.contentWindow.postMessage(JSON.stringify({action:"pro54_disableDirtyHandler"}),'*');E.preventDefault();}}function x(R,e,D){R.write("<div").writeControlData(e).writeAccessibilityState(e).addClass("sapUShellApplicationContainer").writeClasses(e).addStyle("height",e.getHeight()).addStyle("width",e.getWidth()).writeStyles().write(">").renderControl(D);R.write("</div>");}function y(U,D){var E=D==="TR"?"":"-NWBC";var V,F=function(){var V,M;try{V=sap.ui.getVersionInfo().version;}catch(e){jQuery.sap.log.error("sap ui version could not be determined, using sap.ui.version (core version) as fallback "+e);V=window.sap&&sap.ui&&sap.ui.version;}M=/\d+\.\d+\.\d+/.exec(V);if(M&&M[0]){V=M[0];}else{V=undefined;}return V;};V=F();if(V){U+=U.indexOf("?")>=0?"&":"?";U+="sap-shell="+encodeURIComponent("FLP"+V+E);}return U;}function z(U,e){var T,D=function(){var F=sap.ushell.utils.getParameterValueBoolean("sap-accessibility");if(F!==undefined){return F;}return sap.ushell.Container.getUser().getAccessibilityMode();},E=function(){var F=false,R=jQuery.sap.getUriParameters(U)||{mParams:{}};F=sap.ui.getCore().getConfiguration().getStatistics()&&!R.mParams.hasOwnProperty("sap-statistics");return F;};U+=U.indexOf("?")>=0?"&":"?";U+="sap-ie=edge";T=sap.ushell.Container.getUser().getTheme(sap.ushell.User.prototype.constants.themeFormat.NWBC);if(T){U+=U.indexOf("?")>=0?"&":"?";U+="sap-theme="+encodeURIComponent(T);}if(D()){U+=U.indexOf("?")>=0?"&":"?";U+="sap-accessibility=X";}if(E()){U+=U.indexOf("?")>=0?"&":"?";U+="sap-statistics=true";}return y(U,e);}function A(R,e,U,D){var E=e.getAggregation("child");if(!E||e._bRecreateChild){E=sap.ushell.components.container.ApplicationContainer.prototype._createUi5Component(e,U,D);e._bRecreateChild=false;}sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv(R,e,E);}function B(e,K,V){var O=e.getProperty(K);if(jQuery.sap.equal(O,V)){return;}e.setProperty(K,V);e._bRecreateChild=true;}function C(R,e,D,U,E){var L;localStorage.removeItem(e.globalDirtyStorageKey);if(E&&E.indexOf("SAPUI5.Component=")===0&&D===sap.ushell.components.container.ApplicationType.URL){A(R,e,U,E.replace(/^SAPUI5\.Component=/,""));return;}if(E&&E.indexOf("SAPUI5=")===0&&D===sap.ushell.components.container.ApplicationType.URL){sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv(R,e,sap.ushell.components.container.ApplicationContainer.prototype._createUi5View(e,U,E));return;}jQuery.sap.log.debug("Not resolved as \"SAPUI5.Component=\" or \"SAPUI5=\" , "+"will attempt to load into iframe "+E);try{U=e.getFrameSource(D,U,E);}catch(F){jQuery.sap.log.error(F.message||F,null,c);e.fireEvent("applicationConfiguration");R.renderControl(sap.ushell.components.container.ApplicationContainer.prototype._createErrorControl());return;}if(sap.ushell.Container){L=sap.ushell.components.container.ApplicationContainer.prototype._getLogoutHandler(e);if(!L){if(sap.ushell.utils.isApplicationTypeNWBCRelated(D)){L=sap.ushell.components.container.ApplicationContainer.prototype._logout.bind(null,e);l.put(e.getId(),L);sap.ushell.Container.attachLogoutEvent(L);sap.ushell.Container.addRemoteSystem(sap.ushell.components.container.ApplicationContainer.prototype._createSystemForUrl(U));}}else{if(!sap.ushell.utils.isApplicationTypeNWBCRelated(D)){sap.ushell.Container.detachLogoutEvent(L);l.remove(e.getId());}}}if(sap.ushell.utils.isApplicationTypeNWBCRelated(D)){U=sap.ushell.components.container.ApplicationContainer.prototype._adjustNwbcUrl(U,D);sap.ushell.utils.localStorageSetItem(e.globalDirtyStorageKey,sap.ushell.Container.DirtyState.INITIAL);}e.fireEvent("applicationConfiguration");R.write("<iframe").writeControlData(e).writeAccessibilityState(e).writeAttributeEscaped("src",U).addClass("sapUShellApplicationContainer").writeClasses(e).addStyle("height",e.getHeight()).addStyle("width",e.getWidth()).writeStyles().write("></iframe>");}sap.ui.core.Control.extend(c,{metadata:{properties:{additionalInformation:{defaultValue:"",type:"string"},application:{type:"object"},applicationConfiguration:{type:"object"},applicationType:{defaultValue:"URL",type:p+"ApplicationType"},height:{defaultValue:"100%",type:"sap.ui.core.CSSSize"},navigationMode:{defaultValue:"",type:"string"},text:{defaultValue:"",type:"string"},url:{defaultValue:"",type:"string"},visible:{defaultValue:true,type:"boolean"},"sap-system":{defaultValue:undefined,type:"string"},applicationDependencies:{type:"object"},componentHandle:{type:"object"},ui5ComponentName:{type:"string"},width:{defaultValue:"100%",type:"sap.ui.core.CSSSize"},shellUIService:{type:"object"}},events:{"applicationConfiguration":{}},aggregations:{child:{multiple:false,type:"sap.ui.core.Control",visibility:"hidden"}},library:"sap.ushell"},exit:function(){var L,e=this;if(sap.ushell.Container){L=sap.ushell.components.container.ApplicationContainer.prototype._getLogoutHandler(e);if(L){sap.ushell.Container.detachLogoutEvent(L);l.remove(e.getId());}}localStorage.removeItem(e.globalDirtyStorageKey);if(e._unloadEventListener){removeEventListener("unload",e._unloadEventListener);}if(e._disableRouterEventHandler){sap.ui.getCore().getEventBus().unsubscribe("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",e._disableRouterEventHandler);}if(e._storageEventListener){removeEventListener("storage",e._storageEventListener);}if(e._messageEventListener){removeEventListener("message",e._messageEventListener);}sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);if(sap.ui.core.Control.exit){sap.ui.core.Control.exit.apply(e);}},init:function(){var e=this;e.globalDirtyStorageKey=d+jQuery.sap.uid();e._unloadEventListener=e.exit.bind(e);addEventListener("unload",e._unloadEventListener);e._storageEventListener=function(S){var D=e.getApplicationType();if(S.key===e.globalDirtyStorageKey&&S.newValue===sap.ushell.Container.DirtyState.PENDING&&sap.ushell.utils.isApplicationTypeNWBCRelated(D)){var I=e.getDomRef();if(I&&I.tagName==="IFRAME"){jQuery.sap.log.debug("getGlobalDirty() send pro54_getGlobalDirty ",null,"sap.ushell.components.container.ApplicationContainer");I.contentWindow.postMessage(JSON.stringify({action:"pro54_getGlobalDirty"}),'*');}}};addEventListener('storage',e._storageEventListener);e._messageEventListener=sap.ushell.components.container.ApplicationContainer.prototype._handleMessageEvent.bind(null,e);addEventListener('message',e._messageEventListener);},renderer:function(R,e){var D=e.getApplication(),L=e.launchpadData,E;if(!e.getVisible()){sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv(R,e);return;}if(e.error){delete e.error;sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv(R,e,sap.ushell.components.container.ApplicationContainer.prototype._createErrorControl());}else if(!D){sap.ushell.components.container.ApplicationContainer.prototype._render(R,e,e.getApplicationType(),e.getUrl(),e.getAdditionalInformation());}else if(!D.isResolvable()){sap.ushell.components.container.ApplicationContainer.prototype._render(R,e,D.getType(),D.getUrl(),"");}else if(L){sap.ushell.components.container.ApplicationContainer.prototype._render(R,e,L.applicationType,L.Absolute.url.replace(/\?$/,""),L.applicationData);}else{jQuery.sap.log.debug("Resolving "+D.getUrl(),null,c);D.resolve(function(F){jQuery.sap.log.debug("Resolved "+D.getUrl(),JSON.stringify(F),c);e.launchpadData=F;sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);},function(F){var G=D.getMenu().getDefaultErrorHandler();if(G){G(F);}sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);e.error=F;});E=new sap.m.Text({text:sap.ushell.components.container.ApplicationContainer.prototype._getTranslatedText("loading",[D.getText()])});sap.ushell.components.container.ApplicationContainer.prototype._destroyChild(e);e.setAggregation("child",E);sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv(R,e,E);}}});sap.ushell.components.container.ApplicationContainer.prototype.getFrameSource=function(e,U,D){if(!Object.prototype.hasOwnProperty.call(sap.ushell.components.container.ApplicationType,e)){throw new Error("Illegal application type: "+e);}return U;};sap.ushell.components.container.ApplicationContainer.prototype.setUrl=function(V){B(this,"url",V);};sap.ushell.components.container.ApplicationContainer.prototype.setAdditionalInformation=function(V){B(this,"additionalInformation",V);};sap.ushell.components.container.ApplicationContainer.prototype.setApplicationType=function(V){B(this,"applicationType",V);};sap.ushell.components.container.ApplicationContainer.prototype._adaptIsUrlSupportedResultForMessagePopover=a;sap.ushell.components.container.ApplicationContainer.prototype._getLogoutHandler=g;sap.ushell.components.container.ApplicationContainer.prototype._getParameterMap=b;sap.ushell.components.container.ApplicationContainer.prototype._getTranslatedText=f;sap.ushell.components.container.ApplicationContainer.prototype._createErrorControl=h;sap.ushell.components.container.ApplicationContainer.prototype._destroyChild=j;sap.ushell.components.container.ApplicationContainer.prototype._createUi5View=k;sap.ushell.components.container.ApplicationContainer.prototype._publishExternalEvent=m;sap.ushell.components.container.ApplicationContainer.prototype._createUi5Component=n;sap.ushell.components.container.ApplicationContainer.prototype._disableRouter=o;sap.ushell.components.container.ApplicationContainer.prototype._createSystemForUrl=q;sap.ushell.components.container.ApplicationContainer.prototype._isTrustedPostMessageSource=s;sap.ushell.components.container.ApplicationContainer.prototype._handleServiceMessageEvent=u;sap.ushell.components.container.ApplicationContainer.prototype._handleMessageEvent=v;sap.ushell.components.container.ApplicationContainer.prototype._logout=w;sap.ushell.components.container.ApplicationContainer.prototype._renderControlInDiv=x;sap.ushell.components.container.ApplicationContainer.prototype._adjustNwbcUrl=z;sap.ushell.components.container.ApplicationContainer.prototype._render=C;sap.ushell.components.container.ApplicationContainer.prototype._backButtonPressedCallback=t;}());
