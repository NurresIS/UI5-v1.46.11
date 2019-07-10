sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/f/FlexibleColumnLayoutSemanticHelper","sap/f/LayoutType"],function(q,B,F,L){"use strict";function o(O){sap.ui.require(["sap/suite/ui/generic/template/lib/routingHelper"],O);}var r=Promise.resolve();var d=2;var c=["begin","mid","end"];var m=["messagePageBeginColumn","messagePageMidColumn","messagePageEndColumn"];function t(v){return c[v]?v:d;}function a(v){return t(v)===v;}function g(v){return c[t(v)]+"ColumnPages";}function A(R,T,p){R.showBeginColumn=R.viewLevel<3;R.showMidColumn=R.viewLevel===1||R.viewLevel===2;R.showEndColumn=R.viewLevel>1;R.target=R.showMidColumn?p.concat([T]):T;return g(R.viewLevel);}function b(C){for(var i=0;i<c.length;i++){C(m[i],g(i));}}function e(v){return m[t(v)];}function f(v){return c[t(v)];}function h(j,n){var M=n.oTemplateContract.oAppComponent.getManifestEntry("sap.ui.generic.app");var k=M.settings&&M.settings.flexibleColumnLayout;var l=F.getInstanceFor(j,k);var D=l.getDefaultLayouts();var R;var p;var u;var C;var s;var v=-1;var E;var T=n.oTemplateContract,w=n.oRouter;function x(i){return i===D.defaultLayoutType||i===D.defaultTwoColumnLayoutType||i===D.defaultThreeColumnLayoutType;}function y(i,k1,l1){var m1=T.mRouteToTemplateComponentPromise[l1];if(m1){return m1.then(function(n1){return n.activateOneComponent(k1,i,n1);});}return r;}function z(i){var k1=i.substring(i.length-5,i.length);if(k1==="query"){return i.substring(0,i.length-5);}return i;}function G(i){return Promise.all(i).then(n.afterActivation);}function H(i,k1){var l1=x(i);if(p.name.lastIndexOf("query")===p.name.length-"query".length){p.arguments.query=p.arguments["?query"];if(l1){delete p.arguments.query.FCLLayout;if(q.isEmptyObject(p.arguments.query)){delete p.arguments.query;p.name=z(p.name);}}else{p.arguments.query.FCLLayout=i;}}else if(!l1){p.name=p.name+"query";p.arguments.query={FCLLayout:i};}var m1=w.getURL(p.name,p.arguments);m1=m1.replace("/?","?");n.navigate(m1,k1);}function I(i,k1){return new Promise(function(l1){o(function(m1){l1(m1.determinePath(i,k1,T.routeViewLevel1.pattern));});});}function J(){var i=function(k1){var l1={};var m1=p.event.getParameter("config").viewLevel;if(m1<3){l1.begin={route:"root",path:"",isVisible:u.columnsVisibility.beginColumn};if(m1===0){k1(l1);return;}}var n1=z(p.name);if(m1>0){var o1=f(m1);l1[o1]={route:n1,path:p.path,isVisible:m1>2||(m1===1&&u.columnsVisibility.midColumn)||(m1===2&&u.columnsVisibility.endColumn)};}if(m1===2){I(p.routeConfig,p.event).then(function(p1){l1.mid={route:T.routeViewLevel1.name,path:p1,isVisible:u.columnsVisibility.midColumn};k1(l1);});}else{k1(l1);}};return new Promise(i);}function K(i){var k1=J();k1.then(function(l1){var m1=[];var n1=[l1.begin,l1.mid,l1.end];var o1=n.performPseudoHashChange(n1);for(var p1 in i){if(i[p1]){var q1=l1[p1];if(q1){m1.push(y(o1,q1.path,q1.route));}}}G(m1);});}function N(i){var k1=l.getCurrentUIState();var l1={};l1.end=u&&(u.columnsVisibility.endColumn!==k1.columnsVisibility.endColumn);l1.mid=u&&(u.columnsVisibility.midColumn!==k1.columnsVisibility.midColumn);l1.begin=u&&(u.columnsVisibility.beginColumn!==k1.columnsVisibility.beginColumn);u=k1;T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/midActionButtons",{fullScreen:u.actionButtonsInfo.midColumn.fullScreen!==null,exitFullScreen:u.actionButtonsInfo.midColumn.exitFullScreen!==null,closeColumn:u.actionButtonsInfo.midColumn.closeColumn!==null});T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/endActionButtons",{fullScreen:u.actionButtonsInfo.endColumn.fullScreen!==null,exitFullScreen:u.actionButtonsInfo.endColumn.exitFullScreen!==null,closeColumn:u.actionButtonsInfo.endColumn.closeColumn!==null});T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/isLogicallyFullScreen",u.isLogicallyFullScreen);var m1;if(u.columnsVisibility.endColumn){m1=m1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");}else if(u.columnsVisibility.midColumn){m1=1;}else{m1=0;}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/highestViewLevel",m1);var n1;if(u.columnsVisibility.midColumn){n1=1;}else{n1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL/lowestDetailViewLevel",n1);if(p&&C!==u.layout){H(u.layout,true);}else if((l1.begin||l1.mid||l1.end)&&!i){K(l1);}}function O(i,k1,l1,m1){return new Promise(function(n1){N(true);var o1=J();o1.then(function(p1){E=p1;var q1=[];for(var r1 in p1){var s1=p1[r1];if(s1.isVisible){q1.push(y(m1,s1.path,s1.route));}}G(q1).then(n1);});});}function P(i){var k1=i.getParameter("config").viewLevel;var l1=i.getParameter("arguments")["?query"];if(a(k1)){C=(l1&&l1.FCLLayout);if(!C){switch(k1){case 0:C=D.defaultLayoutType;break;case 1:C=D.defaultTwoColumnLayoutType;break;case 2:C=D.defaultThreeColumnLayoutType;}}}else{C=L.EndColumnFullScreen;}j.setLayout(C);}function Q(i,k1,l1,m1){v=-1;var n1=T.oTemplatePrivateGlobalModel.getProperty("/generic/routeLevel");R=n1===2?i:null;p={name:i.getParameter("name"),arguments:i.getParameter("arguments"),path:l1,event:i,routeConfig:k1};return O(i,k1,l1,m1);}function S(i){return x(i)?{}:{FCLLayout:[i]};}function U(i){return i===L.EndColumnFullScreen||i===L.MidColumnFullScreen;}function V(i,k1){if(!a(i)){return n.getParStringPromise(k1,false);}var l1=s||l.getNextUIState(i).layout;q.extend(k1,S(l1));s=null;if(U(l1)){return n.getParStringPromise(k1,false);}var m1=(i===2)?n.addUrlParameterInfoForRoute(T.routeViewLevel1.name,k1):r;return new Promise(function(n1){m1.then(function(){n.getParStringPromise(k1,true).then(n1);});});}function W(){n.navigateToRoot(true);}function X(){s=u.actionButtonsInfo.endColumn.closeColumn;var i=R.getParameter("config");I(i,R).then(function(k1){n.navigateToContext(k1,null,true,0);});}function Y(i,k1){var l1=n.oHashChanger.getHash()||"";l1=l1.split("?")[0];var m1=n.getParStringPromise(i,k1);n.navigateToParStringPromise(l1,m1,false);}function Z(){var k1=u.actionButtonsInfo.midColumn.fullScreen;var l1;if(k1===null){k1=u.actionButtonsInfo.endColumn.fullScreen;var m1=n.getActiveComponents();for(var i=0;i<m1.length;i++){var n1=T.componentRegistry[m1[i]];if(n1.viewLevel===2){l1=n1.route;break;}}}else{l1=T.routeViewLevel1.name;}var o1=S(k1);n.addUrlParameterInfoForRoute(l1,o1).then(function(){Y(o1,false);});}function $(){var i=u.actionButtonsInfo.midColumn.exitFullScreen;var k1;var l1;if(i===null){i=u.actionButtonsInfo.endColumn.exitFullScreen;}var m1=S(i);if(i===u.actionButtonsInfo.endColumn.exitFullScreen){var n1=n.getActiveComponents();var o1=n1[0];var p1=T.componentRegistry[o1];if(p1){k1=n.addUrlParameterInfoForRoute(p1.route,m1);l1=I(p.routeConfig,p.event);}}(k1||r).then(function(){(l1||r).then(function(q1){var r1=n.addUrlParameterInfoForRoute(T.routeViewLevel1.name,m1,q1);r1.then(function(){Y(m1,true);});});});}function _(i){return a(i)&&{onCloseColumnPressed:i===1?W:X,onFullscreenColumnPressed:Z,onExitFullscreenColumnPressed:$};}function a1(i){return T.oApplicationProxy.getDraftSiblingPromise(i);}function b1(i){if(T.oTemplatePrivateGlobalModel.getProperty("/generic/FCL/highestViewLevel")===2){var k1=R.getParameter("config");var l1=T.mRouteToTemplateComponentPromise[z(k1.name)];l1.then(function(m1){var n1=m1.getBindingContext();var o1=a1(n1,true);o1.then(function(p1){o(function(q1){var r1=k1.navigationProperty;var s1=i.getPath()+"/"+q1.determineNavigationPath(p1,r1).path;s=u.layout;n.navigateToContext(s1,null,true,2);});});});}else{n.navigateToContext(i,null,true,2);}}function c1(i){if(T.oTemplatePrivateGlobalModel.getProperty("/generic/FCL/highestViewLevel")!==2){return Promise.resolve(i);}return new Promise(function(k1){var l1=R.getParameter("config");var m1=T.mRouteToTemplateComponentPromise[z(l1.name)];m1.then(function(n1){var o1=n1.getBindingContext();var p1=a1(o1,true);p1.then(function(q1){if(!q1){k1(i);return;}o(function(r1){var s1=l1.navigationProperty;var t1=i.getPath()+"/"+r1.determineNavigationPath(q1,s1).path;k1(t1);});});});});}function d1(i,k1){var l1=E.mid&&i.indexOf(E.mid.path)>=0;var m1=E.end&&i.indexOf(E.end.path)>=0;if(l1){n.navigateToRoot(true);}else if(m1){n.navigateToContext(E.mid.path,null,true);}}T.oTemplatePrivateGlobalModel.setProperty("/generic/FCL",{});function e1(i){var k1=n.getTargetLevel(i);switch(k1){case 1:return!u.columnsVisibility.midColumn;case 2:return!u.columnsVisibility.endColumn;default:return true;}}function f1(i){C=l.getNextUIState(i).layout;j.setLayout(C);}function g1(i,k1){k1(u.isLogicallyFullScreen&&i);}function h1(k1){v=t(k1.viewLevel);f1(k1.viewLevel);var l1=n.oRouter.getTargets();var m1=e(k1.viewLevel);l1.display(m1);var n1;if(k1.viewLevel===v){n1=[];for(var i=0;i<k1.viewLevel;i++){n1.push(true);}}return n1;}function i1(i){if(i<v||v<0){return u.columnsVisibility[f(i)+"Column"];}return false;}function j1(i,k1){if(!a(k1)){return i;}var l1=l.getNextUIState(k1).layout;if(x(l1)){return i;}return i+"?FCLLayout="+l1;}j.attachStateChange(N.bind(null,false));return{adaptRoutingInfo:A,createMessagePageTargets:b,displayMessagePage:h1,isLevelActive:i1,handleBeforeRouteMatched:P,handleRouteMatched:Q,getAppStateParStringForNavigation:V,getActionButtonHandlers:_,navigateToDraft:b1,getTargetAfterCancelPromise:c1,adaptAfterDeletion:d1,isNewHistoryEntryRequired:e1,setTitleForActiveComponent:g1,adaptBreadCrumbUrl:j1};}return B.extend("sap.suite.ui.generic.template.lib.FlexibleColumnLayoutHandler",{constructor:function(i,n){q.extend(this,h(i,n));}});});
