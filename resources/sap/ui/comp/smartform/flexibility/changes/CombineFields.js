/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/fl/Utils","sap/ui/fl/changeHandler/Base"],function(q,F,B){"use strict";var C={};C._evaluteElementForIndex=function(m,g){var M=-1;var s=[];var b=g.some(function(G){s=m.getAggregation(G,"fields");return s.some(function(S){M++;return m.getProperty(S,"mandatory");});});if(b){return M;}return-1;};C.applyChange=function(c,o,p){var a=c.getDefinition();var M=p.modifier;var A=p.appComponent;var v=F.getViewForControl(o);var s=M.bySelector(a.content.sourceSelector,A);var l;var L;var P;var t;var b;var S=[];var g=a.content.combineFieldSelectors.map(function(f){return M.bySelector(f,A);});var d=this._evaluteElementForIndex(M,g);if(d>0){M.setProperty(s,"elementForLabel",d);}for(var i=0;i<g.length;i++){L="fieldLabel"+i;t=a.texts[L];if(t&&t.value!==P&&t.value.length>0){l=(l)?l+"/"+t.value:t.value;P=t.value;}S=M.getAggregation(g[i],"fields");if(g[i]!==s){for(var k=0,m=S.length;k<m;k++){M.removeAggregation(g[i],"elements",S[k]);M.insertAggregation(s,"elements",S[k],i+k,v,true);}b=M.getParent(g[i]);M.removeAggregation(b,"groupElements",g[i]);M.insertAggregation(b,"dependents",g[i],0,v,true);}}if(l){var e=M.getAggregation(s,"elements")[M.getProperty(s,"elementForLabel")];M.setProperty(e,"textLabel",l);M.setProperty(M.getProperty(s,"label"),"text",l);}return true;};C.completeChangeContent=function(c,s,p){var m=p.modifier;var a=p.appComponent;var o=c.getDefinition();var b=s.combineFieldIds;if(b&&b.length>=2){o.content.combineFieldSelectors=b.map(function(d){return m.getSelector(d,a);});}else{throw new Error("oSpecificChangeInfo.combineFieldIds attribute required");}if(s.sourceControlId){o.content.sourceSelector=m.getSelector(s.sourceControlId,a);}else{throw new Error("oSpecificChangeInfo.sourceControlId attribute required");}var t;var f;var g;var l;for(var i=0;i<b.length;i++){g=m.byId(b[i]);l=g.getLabel();if(l){f="fieldLabel"+i;t=l.getText();B.setTextInChange(o,f,t,"XFLD");}}};return C;},true);
