// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
this.sap=this.sap||{};(function(){"use strict";if(!Function.prototype.bind){Function.prototype.bind=function(t){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice.call(arguments,1),b=this,N=function(){},B=function(){return b.apply(this instanceof N?this:t,a.concat(Array.prototype.slice.call(arguments)));};N.prototype=this.prototype;B.prototype=new N();return B;};}sap.ui2=sap.ui2||{};sap.ui2.srvc=sap.ui2.srvc||{};if(sap.ui2.srvc.log){return;}var c;if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.utils");}function q(){return typeof jQuery==="function"&&jQuery.sap&&jQuery.sap.log;}function f(m,d,C){return(m||"")+" - "+(d||"")+" "+(C||"");}sap.ui2.srvc.log={debug:function(m,d,C){if(q()){jQuery.sap.log.debug(m,d,C);return;}if(typeof console==="object"){if(typeof console.debug==="function"){console.debug(f(m,d,C));}else{console.log(f(m,d,C));}}},error:function(m,d,C){if(q()){jQuery.sap.log.error(m,d,C);return;}if(typeof console==="object"){console.error(f(m,d,C));}},info:function(m,d,C){if(q()){jQuery.sap.log.info(m,d,C);return;}if(typeof console==="object"){console.info(f(m,d,C));}},warning:function(m,d,C){if(q()){jQuery.sap.log.warning(m,d,C);return;}if(typeof console==="object"){console.warn(f(m,d,C));}}};sap.ui2.srvc.absoluteUrl=function(u,b){b=b||location.href;if(b.indexOf('://')<0&&b.charAt(0)!=='/'){throw new sap.ui2.srvc.Error("Illegal base URL: "+b,"sap.ui2.srvc");}if(!u||u.indexOf('://')>=0||u.charAt(0)==='/'){return this.addCacheBusterTokenUsingUshellConfig(u);}if(b.search(/^([^:]*:)?\/\/[^\/]+$/)<0){b=b.replace(/\/[^\/]*$/,'');}return this.addCacheBusterTokenUsingUshellConfig(b+'/'+u);};sap.ui2.srvc.call=function(s,F,a){var m;if(a){setTimeout(function(){sap.ui2.srvc.call(s,F,false);},0);return;}try{s();}catch(e){m=e.message||e.toString();sap.ui2.srvc.log.error("Call to success handler failed: "+m,e.stack,"sap.ui2.srvc");if(F){F(m);}}};sap.ui2.srvc.get=function(u,x,s,F,X,C){if(typeof s!=="function"){throw new sap.ui2.srvc.Error("Missing success handler","sap.ui2.srvc");}if(typeof F!=="function"){throw new sap.ui2.srvc.Error("Missing error handler","sap.ui2.srvc");}if(x&&C){throw new sap.ui2.srvc.Error("Caching of XML responses not supported","sap.ui2.srvc");}if(typeof sap.ui2.srvc.addCacheBusterTokenUsingUshellConfig==="function"){u=sap.ui2.srvc.addCacheBusterTokenUsingUshellConfig(u);}X=X||new XMLHttpRequest();X.onreadystatechange=function(){var r,o;if(this.readyState!==4){return;}sap.ui2.srvc.get.pending-=1;if(this.status!==200){sap.ui2.srvc.log.error("Error "+this.status+" in response for URL "+u,null,"sap.ui2.srvc");F(u+": "+this.status+" "+this.statusText,this.responseText);return;}sap.ui2.srvc.log.debug("Received response for URL "+u,null,"sap.ui2.srvc");if(x){o=this.responseXML;if(o===null||!o.documentElement){F(u+": no valid XML");return;}r=o;}else{r=this.responseText;if(C){c.put(u,r);}}sap.ui2.srvc.call(s.bind(null,r),F);};if(!x&&c.containsKey(u)){sap.ui2.srvc.log.debug("Return cached response for URL "+u,null,"sap.ui2.srvc");sap.ui2.srvc.call(s.bind(null,c.get(u)),F);}else{try{if(X.readyState<XMLHttpRequest.OPENED){X.open("GET",u,true);}else{sap.ui2.srvc.log.debug("XHR Request was already opened for "+u,null,"sap.ui2.srvc");}X.send();sap.ui2.srvc.get.pending+=1;sap.ui2.srvc.log.debug("Sent request to URL "+u,null,"sap.ui2.srvc");}catch(e){sap.ui2.srvc.log.error("Error '"+(e.message||e)+"' in request to URL "+u,null,"sap.ui2.srvc");throw e;}}};sap.ui2.srvc.addCacheBusterToken=function(u,p,r,t){if(p.test(u)){u=u.replace(p,r);u=u.replace(/\[CacheBusterToken\]/g,t);}return u;};sap.ui2.srvc.removeCBAndNormalizeUrl=function(u){var m,U,C,s;if(typeof u!=="string"||u===""||a(u)){return u;}function a(d){var o=new URI(d),p=o.path();if(o.is("absolute")){return false;}if(p&&p.charAt(0)==="/"){return false;}return true;}m=u.match(/(.*)(\/~[\w\-]+~[A-Z0-9]?)(.*)/);if(m){U=m[1];C=m[2];s=m[3];}function n(d){return new URI(d).normalizePathname().toString();}function b(p){var S=new URI(p).segment(),i,P=0;for(i=0;i<S.length&&P>=0;i+=1){if(S[i]===".."){P=P-1;}else{P=P+1;}}return P<0;}if(C){if(s&&b(s)){u=U+s;}}return n(u);};sap.ui2.srvc.addCacheBusterTokenUsingUshellConfig=function(u){var C=window["sap-ushell-config"]&&window["sap-ushell-config"].cacheBusting,p=C&&C.patterns,s=u,P=[],S,r=[];P=sap.ui2.srvc.getParameterMap();S=P["sap-ushell-nocb"]&&P["sap-ushell-nocb"][0];if((S==='true'||S==='X')&&typeof u==="string"){u=u.replace(/\/~[\w\-]+~[A-Z0-9]?/,"");return u;}if(!C||typeof u!=="string"||u===""||/[\/=]~[\w\-]+~[A-Z0-9]?[\/#\?\&]/.test(u)||/[\/=]~[\w\-]+~[A-Z0-9]?$/.test(u)){return u;}if(C&&C.urls){if(u.charAt(u.length-1)==="/"){u=u.substr(0,u.length-1);}if(C.urls.hasOwnProperty(u)){return u+"/"+C.urls[u].cacheBusterToken;}if(C.urls.hasOwnProperty(u+"/")){return u+"/"+C.urls[u+"/"].cacheBusterToken;}}if(!p){return u;}Object.keys(p).forEach(function(a){if(p.hasOwnProperty(a)){var R=p[a];R.pattern=new RegExp(a);r.push(R);}});r.sort(function(R,o){return R.order-o.order;});r.every(function(R){if(R.pattern.test(u)){if(!R.cacheBusterToken){R.cacheBusterToken=C.cacheBusterToken;}s=sap.ui2.srvc.addCacheBusterToken(u,R.pattern,R.replacement,R.cacheBusterToken);return false;}return true;});return s;};sap.ui2.srvc.get.clearCache=function(){c=new sap.ui2.srvc.Map();};sap.ui2.srvc.get.pending=0;sap.ui2.srvc.getFormFactor=function(){var s=sap.ui.Device.system;if(s.desktop){return s.SYSTEMTYPE.DESKTOP;}if(s.tablet){return s.SYSTEMTYPE.TABLET;}if(s.phone){return s.SYSTEMTYPE.PHONE;}};sap.ui2.srvc.getParameterMap=function(s){var i,n,r={},k,v,I,K,S=arguments.length>0?s:location.search;if(S&&S.charAt(0)!=="?"){throw new sap.ui2.srvc.Error("Illegal search string "+S,"sap.ui2.srvc");}if(!S||S==="?"){return{};}K=S.substring(1).replace(/\+/g,' ').split(/[&;]/);for(i=0,n=K.length;i<n;i+=1){k=K[i];v="";I=k.indexOf("=");if(I>=0){v=k.slice(I+1);v=decodeURIComponent(v);k=k.slice(0,I);}k=decodeURIComponent(k);if(!Object.prototype.hasOwnProperty.call(r,k)){r[k]=[];}r[k].push(v);}return r;};sap.ui2.srvc.getParameterValue=function(u,n){var p,Q;if(typeof n!=="string"){throw new sap.ui2.srvc.Error("Missing parameter name","sap.ui2.srvc");}u=u.split('#')[0];Q=u.indexOf("?");if(Q>=0){p=sap.ui2.srvc.getParameterMap(u.slice(Q));if(p[n]){return p[n][0];}}return"";};sap.ui2.srvc.isArray=function(o){return Object.prototype.toString.apply(o)==='[object Array]';};sap.ui2.srvc.parseXml=function(x){var X;if(!x||typeof x!=="string"){return null;}X=new DOMParser().parseFromString(x,"text/xml");if(X.getElementsByTagName("parsererror").length){throw new sap.ui2.srvc.Error("Invalid XML: "+x,"sap.ui2.srvc");}return X;};sap.ui2.srvc.testPublishAt=function(o){};if(sap.ui2.srvc.Error===undefined){sap.ui2.srvc.Error=function(m,C){var e=new Error(m);e.name="sap.ui2.srvc.Error";sap.ui2.srvc.log.error(m,null,C);return e;};}sap.ui2.srvc.Map=function(){this.entries={};};sap.ui2.srvc.Map.prototype.put=function(k,v){var o=this.get(k);this.entries[k]=v;return o;};sap.ui2.srvc.Map.prototype.containsKey=function(k){if(typeof k!=="string"){throw new sap.ui2.srvc.Error("Not a string key: "+k,"sap.ui2.srvc");}return Object.prototype.hasOwnProperty.call(this.entries,k);};sap.ui2.srvc.Map.prototype.get=function(k){if(this.containsKey(k)){return this.entries[k];}};sap.ui2.srvc.Map.prototype.keys=function(){return Object.keys(this.entries);};sap.ui2.srvc.Map.prototype.remove=function(k){delete this.entries[k];};sap.ui2.srvc.Map.prototype.toString=function(){var r=['sap.ui2.srvc.Map('];r.push(JSON.stringify(this.entries));r.push(')');return r.join('');};sap.ui2.srvc.get.clearCache();}());