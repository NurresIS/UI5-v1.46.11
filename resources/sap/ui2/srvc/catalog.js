// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";sap.ui2=sap.ui2||{};sap.ui2.srvc=sap.ui2.srvc||{};var r=String;if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.catalog");r=function(){jQuery.sap.require.apply(this,arguments);};}sap.ui2.srvc.testPublishAt=sap.ui2.srvc.testPublishAt||function(){};sap.ui2.srvc.Catalog=function(f,c){var a,C,b=[],R,I=true,o,s,d,g=[],t=this;function h(){if(I){throw new sap.ui2.srvc.Error(t+": page is just a stub","sap.ui2.srvc.Page");}}function j(){if(!a){throw new sap.ui2.srvc.Error(t+": catalog is just an ID","sap.ui2.srvc.Catalog");}}sap.ui2.srvc.testPublishAt(t);function k(){var T=t.toString();if(C){C.exit();}a=undefined;c=undefined;b=[];I=true;R=undefined;d=undefined;g=[];Object.keys(t).forEach(function(F){if(!/getCatalogData|getId|isStub|toString/.test(F)){delete t[F];}});f.forgetCatalog(t);jQuery.sap.log.debug("Exited: "+T,null,"sap.ui2.srvc.Catalog");}sap.ui2.srvc.testPublishAt(t);function l(){return t.addSystemToServiceUrl(a.type==='H'?"/sap/hba/apps/kpi/s/odata/hana_chip_catalog.xsodata/":a.baseUrl);}sap.ui2.srvc.testPublishAt(t);function m(){return f.getRemoteCatalogService(a)||{readChips:function(B,e,i,S,F){jQuery.sap.log.error("Catalog '"+a.id+"', type '"+a.type+"' not supported",null,"sap.ui2.srvc.Catalog");sap.ui2.srvc.call(S.bind(null,{results:[]}),undefined,true);}};}function p(){var i,n,e;jQuery.sap.log.debug("Loaded: "+t,null,"sap.ui2.srvc.Catalog");if(a.Chips){e=a.Chips.results||a.Chips;delete a.Chips;b=[];for(i=0,n=e.length;i<n;i+=1){b[i]=f.createChip(e[i]);}I=false;jQuery.sap.log.debug("Initialized: "+t,null,"sap.ui2.srvc.Catalog");}delete a.CatalogPage;}sap.ui2.srvc.testPublishAt(t);function q(i,S,F){var D;function n(e){a=e;p();D.resolve();}function u(e){a.Chips=e;p();D.resolve();}function v(e){e.results.forEach(function(y){y.remoteCatalogId=s;});u(e);}function w(){p();o=arguments;D.reject.apply(this,arguments);}function x(y){var z;if(y.remoteId){a=y;try{z=l();}catch(e){w(e.toString());return;}m().readChips(z,a.remoteId,undefined,v,w);}else if(a&&i){u(y.Chips);}else{n(y);}}if(!R||R.state()!=='pending'){D=new jQuery.Deferred();R=D.promise();if(!a||(i&&!a.remoteId)){f.getPageBuildingService().readCatalog(s,x,D.reject.bind(D));}else{x(a);}}F=F||f.getPageBuildingService().getDefaultErrorHandler();R.done(sap.ui2.srvc.call.bind(null,S,F));R.fail(F);}this.addSystemToServiceUrl=function(S,e){if(S.indexOf('/')!==0||S.indexOf('//')===0){throw new sap.ui2.srvc.Error("addSystemToServiceUrl: Invalid URL: "+S,"sap.ui2.srvc.Catalog");}e=e||this.getSystemAlias();if(/^[^?]*(;o=([\/;?]|$))/.test(S)){S=S.replace(/;o=([\/;?]|$)/,(e?";o="+e:"")+"$1");}else if(!/^[^?]*;o=/.test(S)&&e){S=S.replace(/(\/[^?]*?)(\/$|$|(\/?\?.*))/,"$1;o="+e+"$2");}if(sap.ui){sap.ui.getCore().getEventBus().publish("sap.ushell.Container","addRemoteSystemForServiceUrl",S);}return S;};this.clone=function(n,N,S,F){var e,i=function(E,M){return F(E,undefined,M);};if(a&&a.type==="REMOTE"){e=this.getCatalogData();delete e.id;e.domainId=n;if(N!==undefined){e.title=N;}f.createNewCatalog(e,S,F);}else{f.getPageBuildingService().cloneCatalog(this.getId(),n,N,function(u){f.createCatalog(u.id,S,i);},i);}};this.getCatalogData=function(){var e;if(!a){return undefined;}e=JSON.parse(JSON.stringify(a));delete e.__metadata;return e;};this.getCatalogPage=function(){j();if(a.type!=="P"&&a.type!=="CATALOG_PAGE"){return undefined;}if(!C){C=f.createPage(s);}return C;};this.getChips=function(){if(I){throw new sap.ui2.srvc.Error(t+": catalog is just a stub","sap.ui2.srvc.Catalog");}return b.slice();};this.getDomainId=function(){return a&&a.domainId;};this.getId=function(){return s;};this.getSystemAlias=function(){return(a&&a.systemAlias)||undefined;};this.getTitle=function(){j();return a.title;};this.getType=function(){j();return a&&a.type;};this.isOutdated=function(){j();return(C&&!C.isStub()&&C.isOutdated())||a.outdated==="X";};this.isReadOnly=function(){h();return a.isReadOnly==="X";};this.isStub=function(){return I;};this.getCachedRemoteFailureArguments=function(){return o;};this.load=function(S,F){if(!I){throw new sap.ui2.srvc.Error("Catalog is not a stub anymore","sap.ui2.srvc.Catalog");}q(false,S,F);};this.readChips=function(e,S,F){function i(v){v.results.forEach(function(w){f.createChip(w);});sap.ui2.srvc.call(S,F);}function n(v){v.results.forEach(function(w){w.remoteCatalogId=s;});i(v);}function u(v){a=v;if(a.remoteId){m().readChips(l(),a.remoteId,e,n,F);}else{f.getPageBuildingService().readCatalogChips(s,e,i,F);}}if(!a){f.getPageBuildingService().readCatalog(s,u,F,true);}else{u(a);}};this.readRegisteredChips=function(S,F){function e(){var D=new jQuery.Deferred(),i=g;g=[];if(i.length){t.readChips(i,D.resolve.bind(D),D.reject.bind(D));}else{D.resolve();}return D.promise();}if(!d||d.state()!=="pending"){d=e();}F=F||f.getPageBuildingService().getDefaultErrorHandler();d.fail(F).done(sap.ui2.srvc.call.bind(null,S,F));};this.refresh=function(S,F){q(true,S,F);};this.registerChip=function(e){if(d&&d.state()==="pending"){throw new sap.ui2.srvc.Error("Invalid state: registerChip while readRegisteredChips pending","sap.ui2.srvc.Catalog");}g.push(e.getId());};this.remove=function(S,F){j();if(R&&R.state()==='pending'){throw new sap.ui2.srvc.Error("Catalog is being refreshed: "+this,"sap.ui2.srvc.Catalog");}jQuery.sap.log.debug("Removing: "+this,null,"sap.ui2.srvc.Catalog");f.getPageBuildingService().deleteCatalog(a,function(){k();S();},F);};this.toString=function(v){var e=['sap.ui2.srvc.Catalog({sId:"',s,'"',',bIsStub:',I];if(v){e.push(',oAlterEgo:',JSON.stringify(a),',oFactory:',f.toString(v),',aChips:',JSON.stringify(b));}e.push('})');return e.join('');};this.update=function(e,S,F){var n;j();if(Object.hasOwnProperty.call(e,"__metadata")){throw new sap.ui2.srvc.Error("Unsupported __metadata update","sap.ui2.srvc.Catalog");}n=JSON.parse(JSON.stringify(a));Object.keys(e).forEach(function(N){n[N]=e[N];});I=true;o=undefined;f.getPageBuildingService().updateCatalog(n,function(){a=n;q(true,S,F);},function(){I=false;F=F||f.getPageBuildingService().getDefaultErrorHandler();F.apply(null,arguments);});};if(!sap.ui2.srvc.Error){r("sap.ui2.srvc.error");}if(typeof c==="object"){s=c.id;if(c.remoteId){delete c.Chips;}a=c;p();}else if(typeof c==="string"){s=c;}if(!s){throw new sap.ui2.srvc.Error("Missing ID","sap.ui2.srvc.Catalog");}jQuery.sap.log.debug("Created: "+this,null,"sap.ui2.srvc.Catalog");};}());
