/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.core.metadata");jQuery.sap.require("sap.apf.utils.utils");(function(){'use strict';sap.apf.core.Metadata=function(I,a){this.type="metadata";var t=this;var b=jQuery.Deferred();var A=[];var H=(I&&I.constructors&&I.constructors.Hashtable)||sap.apf.utils.Hashtable;var h=new H(I.instances.messageHandler);var o=new H(I.instances.messageHandler);var c=new H(I.instances.messageHandler);var d=new H(I.instances.messageHandler);var e=new H(I.instances.messageHandler);var f=new H(I.instances.messageHandler);var g=new H(I.instances.messageHandler);var j=new H(I.instances.messageHandler);var k=new H(I.instances.messageHandler);var l=new H(I.instances.messageHandler);var m=new H(I.instances.messageHandler);var O=I.constructors.ODataModel||sap.ui.model.odata.ODataModel;var D=false;if(I.deactivateFatalError){D=true;}var M;var n;var E;var s;function p(i){var L;function N(Q){if(!L.dataType){L.dataType={};}L.dataType[Q]=L[Q];}function P(Q,R){if(jQuery.isArray(L[R])===true){(L[R]).forEach(function(S){L[S.name]=S.value;});}else if(R!=="dataType"&&typeof(L[R])==="object"){if(Object.keys(L[R]).length===0){L[Q]="true";}if(R!==Q){jQuery.each(L[R],function(S,T){L[Q]=T;});}}else{L[Q]=L[R];}}if(i===null){return{};}L=jQuery.extend(true,{},i);jQuery.each(L,function(Q){switch(Q){case'type':N(Q);break;case'maxLength':N(Q);break;case'precision':N(Q);break;default:var R=Q.split(".").pop();if(R.search("ISO")===0){P(R,Q);}else{P(R.replace(/^./,R[0].toLowerCase()),Q);}break;}});return L;}function q(i,L){if(d.hasItem(i)!==true){var N;var P={};var R={allParameters:[],keyParameters:[]};if(y(i)){N=G(i);if(N.key&&N.key.propertyRef){N.key.propertyRef.forEach(function(Q){P[Q.name]=null;});}N.property.forEach(function(Q){var S=p(Q);S.isKey=P.hasOwnProperty(S.name);R.allParameters.push(S);if(S.isKey){R.keyParameters.push(S);}});}d.setItem(i,R);}if(!L){return d.getItem(i).allParameters;}return d.getItem(i).keyParameters;}function r(i){var P=[];var L;if(y(i)){i=F(i);}L=G(i);L.property.forEach(function(N){P.push(N.name);});return P;}function u(L){var i;if(c.hasItem(L)===true){return c.getItem(L);}var N;var P=[];var Q=[];var R=F(L);if(R&&z(R)){var S=G(R);S.property.forEach(function(U){P.push(U.name);});}var T=q(L,false);for(i=0;i<T.length;i++){Q.push(T[i].name);}N=P.concat(Q);c.setItem(L,N);return N;}function v(i){return f.getItem(i);}function w(i){var L;if(G(i)){L=i;}else{L=v(i);L=L||v(i+"Results");}return L;}function x(i){if(o.hasItem(i)===false){var R=[];var L=G(i);L.property.forEach(function(N){if(!(N["sap:filterable"]==="false"||N.filterable&&N.filterable==="true")){R.push(N.name);}});o.setItem(i,R);}return o.getItem(i);}function y(i){return B(i)==="parameters";}function z(i){return B(i)==="aggregate";}function B(i){if(!g.hasItem(i)){var L=G(i);var N=L&&L["sap:semantics"]||"undefined";g.setItem(i,N);}return g.getItem(i);}function C(i,P){if(h.hasItem(i+P)===false){var L=y(i);var N=G(i);var Q=M.getODataProperty(N,P);if(!Q&&L){var R=F(i);N=G(R);Q=M.getODataProperty(N,P);}h.setItem(i+P,p(Q));}return h.getItem(i+P);}function F(i){var R=k.getItem(i);if(R){return v(R.toAggregateEntitySet);}return i;}function G(i){if(!i){return undefined;}if(!m.hasItem(i)){var L=M.getODataEntityType(E+i);if(!L){return L;}m.setItem(i,L);}return m.getItem(i);}function J(){n=R();M=n.getMetaModel();var i;M.loaded().then(function(){if(!n.getServiceMetadata()){i="5018";if(D){i="11013";}I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:i,aParameters:[a],oCallingObject:t}));b.reject();return;}L();N();P(n);Q();b.resolve(this);}.bind(this));n.attachMetadataFailed(function(){i="5018";if(D){i="11013";}I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:i,aParameters:[a],oCallingObject:t}));b.reject();return;});function L(){var S={};var T=M.getODataEntityContainer()&&M.getODataEntityContainer().entitySet;if(!T){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5041",aParameters:[a],oCallingObject:t}));return;}T.forEach(function(T){var U=T.entityType.split(/[. ]+/).pop();f.setItem(T.name,U);if(!S.hasOwnProperty(U)){S[U]=true;A.push(U);}});}function N(){var S=M.getODataEntityContainer()&&M.getODataEntityContainer().entitySet;if(!S){return;}var T=S[0].entityType.split(".");T.pop();E=T.join(".")+".";}function P(S){var T=S&&S.getServiceAnnotations();if(T&&T.aliasDefinitions&&T.aliasDefinitions.Capabilities){s=T.aliasDefinitions.Capabilities+".";}}function Q(){var S=M.getODataEntityContainer();if(!S||!S.associationSet){return;}S.associationSet.forEach(function(T){var U=T.end[0].entitySet,V=T.end[1].entitySet,W,X;if(y(v(U))){W=U;}else if(z(v(U))){X=U;}if(y(v(V))){W=V;}else if(z(v(V))){X=V;}if(!W||!X){return;}var Y;var Z=G(v(W));var $;Z.navigationProperty.forEach(function(a1){if(!$&&a1.relationship===T.association){Y=a1.name;$=true;}});if(!Y){return;}var _={navigationProperty:Y,fromParameterEntitySet:W,toAggregateEntitySet:X,fromIsUnique:undefined,toIsUnique:undefined};if(j.hasItem(W)){_.fromIsUnique=false;j.getItem(W).fromIsUnique=false;}else{_.fromIsUnique=true;j.setItem(W,_);k.setItem(v(W),_);}if(l.hasItem(X)){l.getItem(X).toIsUnique=false;}else{_.toIsUnique=true;l.setItem(X,_);}});}function R(){var S=I.instances.annotationHandler.getAnnotationsForService(a);var T={loadMetadataAsync:true,annotationURI:S,json:true};return new O(a,T);}}this.getEntityTypes=function(){return A;};this.getPropertyMetadata=function(i,P){I.instances.messageHandler.check(i!==undefined&&typeof i==="string","sap.apf.core.Metadata:getPropertyMetadata incorrect EntityType name or type");I.instances.messageHandler.check(P!==undefined&&typeof P==="string","sap.apf.core.Metadata:getPropertyMetadata incorrect sPropertyName name or type");var L=w(i);if(!L){return{};}return C(L,P);};this.getUriComponents=function(i){if(!v(i)){if(v(i+"Results")){return{entitySet:i+"Results",navigationProperty:""};}return null;}var R;switch(B(v(i))){case"undefined":return{entitySet:i,navigationProperty:""};case"parameters":R=j.getItem(i);if(!R||R.fromIsUnique===false){return{entitySet:i,navigationProperty:undefined};}return{entitySet:i,navigationProperty:R.navigationProperty};case"aggregate":R=l.getItem(i);if(!R){return{entitySet:i,navigationProperty:""};}if(R.toIsUnique===false){return{entitySet:undefined,navigationProperty:undefined};}return{entitySet:R.fromParameterEntitySet,navigationProperty:R.navigationProperty};default:I.instances.messageHandler.check(false,"metadata : getUriComponents - not handled return value for sap semantics");}};this.getFilterableProperties=function(i){I.instances.messageHandler.check(i!==undefined&&typeof i==="string","sap.apf.core.Metadata:getFilterableProperties incorrect EntityType name or type");var L=w(i);if(!L){return[];}L=F(L);return x(L);};this.getAllPropertiesOfEntitySet=function(i){I.instances.messageHandler.check(i!==undefined&&typeof i==="string","sap.apf.core.Metadata:getAllPropertiesOfEntitySet incorrect EntitySet name or type");var L=w(i);if(!L){return[];}return r(L);};this.getAllProperties=function(){var i=[];var L;this.getEntityTypes().forEach(function(N){L=u(N);if(L.length===0){L=r(N);}i=i.concat(L);});i=sap.apf.utils.eliminateDuplicatesInArray(I.instances.messageHandler,i);return i;};this.getFilterablePropertiesAndParameters=function(){var i=[];var L;var N=this.getEntityTypes();N.forEach(function(P){var Q=G(P);Q.property.forEach(function(R){if(!(R["sap:filterable"]==="false")&&(R["sap:aggregation-role"]==="dimension")){i.push(R.name);}});L=q(P,false);L.forEach(function(R){i.push(R.name);});});return sap.apf.utils.eliminateDuplicatesInArray(I.instances.messageHandler,i);};this.getParameterEntitySetKeyPropertiesForService=function(){var i=[];this.getEntityTypes().forEach(function(L){q(L,true).forEach(function(N){i.push(N.name);});});i=sap.apf.utils.eliminateDuplicatesInArray(I.instances.messageHandler,i);return i;};this.getAllKeys=function(){var i=[];var L=[];this.getEntityTypes().forEach(function(N){var P=G(N);L=[];if(P.key&&P.key.propertyRef){P.key.propertyRef.forEach(function(Q){L.push(Q.name);});}i=i.concat(L);});i=sap.apf.utils.eliminateDuplicatesInArray(I.instances.messageHandler,i);return i;};this.getAttributes=function(P){var i=false;var L={};this.getEntityTypes().forEach(function(N){if(!i){L=C(N,P);if(L.name){i=true;}}});return L;};this.getParameterEntitySetKeyProperties=function(i){I.instances.messageHandler.check(i!==undefined&&typeof i==="string","sap.apf.core.Metadata:getParameterEntitySetKeyProperties incorrect EntityType name or type");var L=w(i);if(!L){return[];}return q(L,true);};this.getEntityTypeAnnotations=function(i){var L=w(i);I.instances.messageHandler.check(i!==undefined&&typeof i==="string","sap.apf.core.Metadata:getEntityTypeAnnotations incorrect EntityType name or type");if(e.hasItem(L)===true){return e.getItem(L);}var N={};Q(L,N);var P=F(L);if(P!==L){Q(P,N);}e.setItem(L,N);return e.getItem(L);function Q(L,R){var S;var T;var U;var V=G(L);for(S in V){if(V.hasOwnProperty(S)){if(S.indexOf(s)!==0){continue;}T=S.split(".").pop();T=T.replace(/^./,T[0].toLowerCase());for(U in V[S]){if(V[S].hasOwnProperty(U)){R[T]=V[S][U];}}}}}};this.getEntitySets=function(){var i={};var L=[];var N=M.getODataEntityContainer();if(!N){return[];}if(N.associationSet){N.associationSet.forEach(function(P){var Q,R,S;Q=w(P.end[0].entitySet);if(!y(Q)){return;}S=P.end[1].entitySet;R=w(S);if(!y(R)){i[S]=true;}});}if(N.entitySet){N.entitySet.forEach(function(P){if(!i[P.name]){L.push(P.name);}});}return L;};this.getHierarchyAnnotationsForProperty=function(i,L){var N={};var P=this.getAllPropertiesOfEntitySet(i);if(P.length===0){return I.instances.messageHandler.createMessageObject({code:5072,aParameters:[i,a]});}var Q=v(i);var R=F(Q);P.forEach(function(S){var T=C(R,S);if(T["hierarchy-node-for"]===L){N.hierarchyNodeFor=S;}});if(!N.hierarchyNodeFor){return I.instances.messageHandler.createMessageObject({code:5073,aParameters:[i,a,L]});}P.forEach(function(S){var T=C(R,S);if(T["hierarchy-level-for"]===N.hierarchyNodeFor){N.hierarchyLevelFor=S;}else if(T["hierarchy-parent-node-for"]===N.hierarchyNodeFor){N.hierarchyParentNodeFor=S;}else if(T["hierarchy-drill-state-for"]===N.hierarchyNodeFor){N.hierarchyDrillStateFor=S;}});return N;};this.getHierarchicalEntitySets=function(){var i=[];var L=this.getEntitySets();L.forEach(function(N){var P=K.call(this,N);if(P.entitySet){i.push(P.entitySet);}}.bind(this));return i;};this.getHierarchicalPropertiesOfEntitySet=function(i){return K.call(this,i).hierarchyProperties;};function K(i){var L={};L.hierarchyProperties=[];var N=v(i);if(!N){return L;}var P=F(N);var Q=this.getAllPropertiesOfEntitySet(i);Q.forEach(function(R){var S=C(P,R);var T=false;var U=false;var V=false;if(S["hierarchy-node-for"]!==undefined){var W=S["hierarchy-node-for"];var X=R;Q.forEach(function(R){var S=C(P,R);if(S["hierarchy-level-for"]===X){T=true;}else if(S["hierarchy-parent-node-for"]===X){U=true;}else if(S["hierarchy-drill-state-for"]===X){V=true;}});if(T&&U&&V){L.entitySet=i;L.hierarchyProperties.push(W);}}});return L;}this.getNonHierarchicalPropertiesOfEntitySet=function(i){var L=[];var N=v(i);if(!N){return L;}var P=F(N);var Q=this.getAllPropertiesOfEntitySet(i);var R=K.call(this,i).hierarchyProperties;Q.forEach(function(S){var T=C(P,S);if(T["hierarchy-node-for"]===undefined&&T["hierarchy-node-external-key-for"]===undefined&&T["hierarchy-parent-node-for"]===undefined&&T["hierarchy-level-for"]===undefined&&T["hierarchy-drill-state-for"]===undefined&&T["hierarchy-node-descendant-count-for"]===undefined&&R.indexOf(S)===-1){var U=T.name;L.push(U);}});return L;};this.getODataModel=function(){return n;};this.isInitialized=function(){return b.promise();};J.call(this);};}());
