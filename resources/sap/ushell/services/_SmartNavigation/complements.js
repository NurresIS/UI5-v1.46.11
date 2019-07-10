// @copyright@
(function(s){"use strict";var i=null;var c={STATISTIC_COLLECTION_WINDOW_DAYS:90,PERS_CONTAINER_KEY_PREFIX:"ushell.smartnav.",ONE_DAY_IN_MILLISECOND:24*60*60*1000};var h=Object.create(null,{"":{value:0|0}});s.ui.define([],function(){if(!i){i=Object.create(null,{getHashCode:{value:g,configurable:true},getBaseHashPart:{value:a,configurable:true},getHashFromOArgs:{value:b,configurable:true},getPersContainerKey:{value:d,configurable:true},getNavigationOccurrences:{value:e,configurable:true},prepareLinksForSorting:{value:p,configurable:true},mapClickCountsIntoLinkItems:{value:m,configurable:true},recordNavigationOccurrences:{value:r,configurable:true},updateHistoryEntryWithCurrentUsage:{value:u,configurable:true}});Object.keys(c).forEach(function(n){Object.defineProperty(i,n,{value:c[n]});});}return i;});function g(v){var f=v+"";return h[f]||(function(j){var H=0|0;while(j--){H=(H<<5)-H+(f.charCodeAt(j)|0);H|=0;}h[f]=H;return H;})(f.length);}function a(U,I){var t=U.parseShellHash(I);if(t&&t.semanticObject&&t.action){return t.semanticObject+"-"+t.action;}throw"Invalid intent `"+I+"`";}function b(o,U){if(!o){return null;}if(o.shellHash&&U.parseShellHash(o.shellHash)){return a(U,o.shellHash);}if(o.semanticObject&&o.action){return o.semanticObject+"-"+o.action;}return null;}function d(f){return c.PERS_CONTAINER_KEY_PREFIX+g(f);}function e(f,P,C,U){var j=d(f);return P.getContainer(j,{keyCategory:P.constants.keyCategory.FIXED_KEY,writeFrequency:P.constants.writeFrequency.HIGH,clientStorageAllowed:true},C).then(function(o){return o.getItemKeys().map(function(k){var l=o.getItemValue(k);return Object.keys(l.actions).map(function(n){var q=l.actions[n];return{intent:k+"-"+n,clickCount:q.dailyFrequency.reduce(function(t,v){return t+v;},0)};});}).reduce(function(E,k){Array.prototype.push.apply(E,k);return E;},[]);});}function p(l,n,U){return m(l,n,U);}function m(l,n,U){var N=Object.create(null);n.forEach(function(o){N[o.intent]=o;});l.forEach(function(L){var B=a(U,L.intent);var o=N[B];L.clickCount=o?o.clickCount:0;});return l;}function r(f,t,P,C,U){var T=U.parseShellHash(t);var j=d(f);var k=T.semanticObject;var o;return P.getContainer(j,{keyCategory:P.constants.keyCategory.FIXED_KEY,writeFrequency:P.constants.writeFrequency.HIGH,clientStorageAllowed:true},C).then(function(l){o=l;return o.getItemValue(k);}).then(function(l){var n;var q=T.action;if(!l){l=new S();}n=l.actions[q];if(!n){n=new A();l.actions[q]=n;}u(l);u(n);return l;}).then(function(l){o.setItemValue(k,l);return o.save();});}function u(H){var n;var t;var D;n=Date.now();t=n-H.latestVisit;D=Math.floor(t/c.ONE_DAY_IN_MILLISECOND);while(D--){H.dailyFrequency.unshift(0);if(H.dailyFrequency.length>c.STATISTIC_COLLECTION_WINDOW_DAYS){H.dailyFrequency.pop();}}++H.dailyFrequency[0];H.latestVisit=n;return H;}function S(){return{actions:{},latestVisit:Date.now(),dailyFrequency:[0]};}function A(){return{latestVisit:Date.now(),dailyFrequency:[0]};}})(sap);
