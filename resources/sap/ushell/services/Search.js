// @copyright@
sap.ui.define([],function(){"use strict";jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchHelper');var s=sap.ushell.renderers.fiori2.search.SearchHelper;function S(a,c){this.init.apply(this,arguments);};S.prototype={init:function(a,c,p,o){this.oAdapter=a;this.oContainerInterface=c;this.oLpdService=sap.ushell.Container.getService("LaunchPage");this.optimizedAppSearch=false;if(o&&o.config&&o.config.optimizedAppSearch!==undefined){this.optimizedAppSearch=o.config.optimizedAppSearch;}},isSearchAvailable:function(){return this.oAdapter.isSearchAvailable();},getSina:function(){return this.oAdapter.getSina();},isValid:function(t){if(this.oLpdService.isTileIntentSupported){return this.oLpdService.isTileIntentSupported(t);}else{return true;}},_getCatalogTiles:function(){var t=this;if(t.allTilesDeferred){return t.allTilesDeferred;}var c=[];t.allTilesDeferred=t.oLpdService.getCatalogs().then(function(d){var D=[];for(var i=0;i<d.length;i++){D.push(t.oLpdService.getCatalogTiles(d[i]));}var o=t._getPersonalizedGroupTiles(new jQuery.Deferred());D.push(o);return jQuery.when.apply(jQuery,D).then(function(){var T=arguments;for(var i=0;i<T.length;i++){var f=T[i];for(var j=0;j<f.length;j++){try{var g,h,k,l,m,n,I;g=f[j];if(!t.optimizedAppSearch){h=t.oLpdService.getCatalogTileView(g);}k=t.oLpdService.getCatalogTileKeywords(g);l=t.oLpdService.getCatalogTileTargetURL(g);m=t.oLpdService.getCatalogTilePreviewTitle(g)||t.oLpdService.getCatalogTileTitle(g);n=t.oLpdService.getCatalogTileSize(g);I=t.oLpdService.getCatalogTilePreviewIcon(g)||"sap-icon://business-objects-experience";if(t.isValid(g)){c.push({tile:g,keywords:k,url:l,title:m||'',icon:I,size:n});}if(!t.optimizedAppSearch){h.destroy();}if(g.getContract){var p=g.getContract("preview");if(p){p.setEnabled(false);}}}catch(e){jQuery.sap.log.error(e);}}}c=t._removeDuplicateTiles(c);c.sort(function(a,b){if(a.title.toUpperCase()<b.title.toUpperCase()){return-1;}if(a.title.toUpperCase()>b.title.toUpperCase()){return 1;}return 0;});return c;});});return t.allTilesDeferred;},_getPersonalizedGroupTiles:function(d){var t=this;t.oLpdService.getGroups().then(function(g){var D=[];var G;for(var j=0;j<g.length;j++){G=t.oLpdService.getGroupTiles(g[j])||[];D=D.concat(G);}d.resolve(D);});return d.promise();},_removeDuplicateTiles:function(t){var I={},k,u=[];for(var i=0;i<t.length;++i){var T=t[i];if(!T.url){continue;}var f=new RegExp('DisplayFactSheet','i');if(f.test(T.url)){continue;}k=T.title+T.url+T.icon;if(I[k]===undefined){I[k]=T;u.push(T);}}return u;},_searchTiles:function(p){var a=p.searchTerm;var c=p.aCatalogTiles;var t=p.top||10;var i=p.skip||0;var m=0;var b=p.searchInKeywords||false;var f=[],T;var d=function(T,h){m+=1;if(m<=i){return;}if(m>(i+t)){return;}var r=jQuery.extend({},T);r.tooltip=r.title;if(h.length>0){r.label=h;}else{r.label=T.title;}f.push(r);};var o;if(p.bSuggestion===true){o=new s.Tester(a);}else{o=new s.Tester(a,'',true);}var e;for(var j=0;j<c.length;j++){T=c[j];e=o.test(T.title);if(e.bMatch===true){d(T,e.sHighlightedText);continue;}if(b&&T.keywords&&Array.isArray(T.keywords)){e=o.test(T.keywords.join(' '));if(e.bMatch===true){d(T,"");}}}return{totalResults:m,searchTerm:a,getElements:function(){return f;}};},queryApplications:function(p){var t=this;return this._getCatalogTiles().then(function(c){p.aCatalogTiles=c;return t._searchTiles(p);});},queryApplicationsByTarget:function(a,r){this._getCatalogTiles().done(function(c){var R=[];for(var j=0,l=a&&a.length||0;j<l;j++){var o=a[j],u=sap.ushell.Container.getService("URLParsing");for(var i=0;i<c.length;i++){var t=u.parseShellHash(c[i].url);if(t&&(t.semanticObject===o.semanticObject)&&(t.action===o.action)){R.push(c[i]);break;}}}r(R);});}};S.hasNoAdapter=false;return S;},true);
