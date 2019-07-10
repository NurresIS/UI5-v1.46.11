/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/model/odata/AnnotationHelper","sap/ui/base/BindingParser"],function(A,B){"use strict";var a=function(){};a.prototype.correctPath=function(p){var r,m,e;r=/\((.+)\)/;m=r.exec(p);if(m){e=p.replace(m[0],"");}else{e=p;}return e.replace("/","");};a.prototype.getNavigationProperties=function(c){var o,b,r={};b=c.getBindingContext();if(b&&b.sPath){r.paths=b.sPath.split("/");}o=c.getObjectBinding();if(o&&o.sPath){r.objectBinding=o.sPath;if(r.paths){r.paths.push(o.sPath);}else{r.paths=[o.sPath];}}if(!r.paths){r.paths=[];}return r;};a.prototype.getBindingParts=function(b,p,I){var l=0,i,P,o;if(b&&b.parts){l=b.parts.length;}for(i=0;i<l;i++){o="";P=b.parts[i];if(P.model){o=o+P.model+">";}o=o+P.path;p.push(o);I.length++;}};a.prototype.toBinding=function(I){var o={},n,p,i,l,N={model:true,formatter:true,mode:true,path:true};if(I){if(I.parts&&I.parts.length){l=I.parts.length;o.parts=[];}for(i=0;i<l;i++){p=I.parts[i];o.parts.push(p);}for(n in N){if(I[n]){o[n]=I[n];}}return o;}return null;};a.prototype.toBindingPath=function(I){var o,O="",p,i,l;o=this.toBinding(I);if(o){if(o.model){O=o.model+">";}if(o.path){O=O+o.path;}else if(o.parts&&o.parts.length>0){l=o.parts.length;for(i=0;i<l;i++){p=o.parts[i];if(p.model){O=O+p.model+">";}O=O+p.path;}}}return O;};a.prototype.fromFormatter=function(m,f,p){var i,l,P,b={model:m,formatter:f.formatter};P=f.path();l=P.length;if(l>0){b.parts=P;if(p){for(i=0;i<l;i++){p.push(P[i]);}}}else{b.path="";}return b;};a.prototype.executeODataBindingExpression=function(b,o){var i,v,V,p,h,H="";if(b&&o){h=A.format(o,b);H=h;p=B.complexParser(h,o);V=[];if(p){if(p.formatter){for(i=0;i<p.parts.length;i++){v=o.getProperty(p.parts[i].path,"value");V.push(v);}H=p.formatter.apply(null,V);}else{H=o.getProperty(p.path,"value");}}}return H;};a.prototype.destroy=function(){};return a;},true);
