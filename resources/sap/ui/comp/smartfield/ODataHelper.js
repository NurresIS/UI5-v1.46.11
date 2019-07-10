/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/comp/odata/MetadataAnalyser","sap/ui/comp/smartfield/AnnotationHelper"],function(q,M,A){"use strict";var O=function(m,u,o){if(m){this.oMeta=m.getMetaModel();}if(o){this.oMeta=o;}this._oModel=m;this._oUtil=u;this.oAnnotation=new A();};O.prototype.getAnalyzer=function(m){if(!this._oAnalyzer){this._oAnalyzer=new M(this._oModel||m);}return this._oAnalyzer;};O.prototype.checkNavigationProperty=function(m,c){var p,P,l,r;if(c&&m){p=this._oUtil.getNavigationProperties(c);l=p.paths.length;while(l--){P=p.paths.shift();P=this._oUtil.correctPath(P);if(P===""||P===m.entitySet.name){continue;}r=this.getNavigationProperty(m.entityType,P);if(r.entitySet){m.entitySet=r.entitySet;m.entityType=r.entityType;}}}};O.prototype.getNavigationProperty=function(e,p){var n,t,r={};n=this._getNamedProperty(p,"navigationProperty",e);if(n){t=this.oMeta.getODataAssociationSetEnd(e,n.name);r.entitySet=this.oMeta.getODataEntitySet(t.entitySet);r.entityType=this.oMeta.getODataEntityType(r.entitySet.entityType);}return r;};O.prototype.startWithNavigationProperty=function(p,m){var P=p.split("/"),o;if(P&&P.length>1){o=this._getNamedProperty(P.shift(),"navigationProperty",m.entityType);}if(o){return o.name;}return null;};O.prototype.getProperty=function(m){var n=[],l,p,P,s,a,r={entityType:m.entityType,entitySet:m.entitySet};if(m){p=m.path.split("/");l=p.length;if(l>1){while(r.entityType){s=p[0];r=this.getNavigationProperty(r.entityType,s);if(r.entityType){m.entityType=r.entityType;m.entitySet=r.entitySet;n.push(p.shift());l--;}}}m.navigationPath=n.join("/");if(l>1){P=this.oMeta.getODataProperty(m.entityType,p[0]);if(P){m.property=this._getComplex(P,p,l);}return;}if(m.navigationPath){a=m.path.replace(m.navigationPath+"/","");}else{a=m.path;}P=this.oMeta.getODataProperty(m.entityType,a);m.property={property:P,typePath:m.path};}};O.prototype._getComplex=function(p,P,l){var o=p,t,c=[];while(l--){if(o){if(l===0){t=o.name;o=this._getNamedProperty(P[0],"property",o);return{typePath:t+"/"+P[0],property:o,complex:true,parents:c};}o=this.oMeta.getODataComplexType(o.type);if(o){c.push(o);}}P.shift();}};O.prototype._getNamedProperty=function(n,a,p){var r;q.each(p[a]||[],function(i,e){if(e.name===n){r=e;return false;}});return r;};O.prototype.getTextProperty2=function(m){var a,o;a=this.oAnnotation.getText(m.property.property);if(a){o=this._preprocAnnotation(a,m);this.getProperty(o);this._postprocAnnotation(o,m);}return o;};O.prototype.getUnitOfMeasure2=function(m){var a,o;a=this.oAnnotation.getUnit(m.property.property);if(a){o=this._preprocAnnotation(a,m);this.getProperty(o);this._postprocAnnotation(o,m);}return o;};O.prototype._preprocAnnotation=function(a,m){var p,o;o=this.traverseNavigationProperties(a,m.entityType);if(!o.navigationPath){o.entitySet=m.entitySet;}if(m.navigationPath){o.path=m.path.replace(m.navigationPath+"/","");}else{o.path=m.path;}if(o.navigationPath){p=a.replace(o.navigationPath+"/","");}else{p=a;}o.path=o.path.replace(m.property.property.name,p);if(o.navigationPath){o.navigationPathHelp=o.navigationPath;}return o;};O.prototype._postprocAnnotation=function(m,o){var p;if(m.navigationPathHelp){m.navigationPath=m.navigationPathHelp;}if(m.navigationPath){p=m.navigationPath;}else{p="";}if(o.navigationPath){if(p){p=o.navigationPath+"/"+p;}else{p=o.navigationPath;}}m.navigationPath=p;if(m.navigationPath){m.path=m.navigationPath+"/"+m.path;}};O.prototype.traverseNavigationProperties=function(p,e){var r={},R={},P,s,l;P=p.split("/");l=P.length;r.entityType=e;R.entityType=e;while(l--){s=P.shift();if(s===""){continue;}R=this.getNavigationProperty(r.entityType,s);if(!R.entitySet){break;}r.entityType=R.entityType;r.entitySet=R.entitySet;if(r.navigationPath){r.navigationPath=r.navigationPath+"/"+s;}else{r.navigationPath=s;}}return r;};O.prototype.getValueListAnnotationPath=function(m){var p,l;if(m.property.complex){l=m.property.parents.length-1;p=m.property.parents[l].namespace;p=p+"."+m.property.typePath;}else{p=m.entitySet.entityType+"/"+m.property.property.name;}return p;};O.prototype.getUOMValueListAnnotationPath=function(m){var p;if(m.annotations.uom){p=this.getValueListAnnotationPath(m.annotations.uom);}if(p){m.annotations.valuelistuom=p;}};O.prototype.getUOMTextAnnotation=function(m){if(m&&m.annotations&&m.annotations.uom){m.annotations.textuom=this.getTextProperty2(m.annotations.uom);}};O.prototype.geValueListEntitySet=function(m){if(m&&m.annotations&&m.annotations.valuelist){if(m.annotations.valuelist.primaryValueListAnnotation&&m.annotations.valuelist.primaryValueListAnnotation.valueListEntitySetName){m.annotations.valuelistentityset=this.oMeta.getODataEntitySet(m.annotations.valuelist.primaryValueListAnnotation.valueListEntitySetName);}}};O.prototype._getMetadataProperty=function(m){var o=m.property;return(o&&o.property)||null;};O.prototype.getValueListData=function(m){var o=this._getMetadataProperty(m),a=m.annotations;if(M.isValueList(o)){a.valuelist=this.getValueListAnnotationPath(m);var v=M.getValueListMode(o);if(v){a.valuelistType=v;}else{a.valuelistType=this.getAnalyzer().getValueListSemantics(o["com.sap.vocabularies.Common.v1.ValueList"]);}}};O.prototype.getEdmDisplayPath=function(m){if(m.annotations.text){return m.annotations.text.path;}return m.path;};O.prototype.getUOMPath=function(m){if(m&&m.annotations&&m.annotations.uom){return m.annotations.uom.path;}return null;};O.prototype.getUOMTypePath=function(m){if(m.property.complex){return m.property.typePath.replace(m.property.property.name,m.annotations.uom.property.name);}return m.annotations.uom.property.name;};O.prototype.getUOMChangeHandler=function(c,u){return function(p){try{c.fireChange({value:p.mParameters.value,newValue:p.mParameters.value,unitChanged:u,validated:p.mParameters["validated"]});}catch(e){q.sap.log.warning(e);}};};O.prototype.getSelectionChangeHandler=function(c){return function(p){var k,i;try{i=p.getParameter("selectedItem");if(i&&i.getKey){k=i.getKey();}c.fireChange({value:k,newValue:k,selectionChange:true});}catch(e){q.sap.log.warning(e);}};};O.prototype.destroy=function(){if(this._oAnalyzer){this._oAnalyzer.destroy();}if(this.oAnnotation){this.oAnnotation.destroy();}this._oUtil=null;this.oMeta=null;this.oAnalyzer=null;this.oAnnotation=null;};return O;},true);
