/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/odata/ODataModel','sap/ui/model/odata/ODataAnnotations'],function(q,O,a){"use strict";var f={"com.sap.vocabularies.Common.v1.FilterExpressionType/SingleInterval":"interval","com.sap.vocabularies.Common.v1.FilterExpressionType/MultiValue":"multi-value","com.sap.vocabularies.Common.v1.FilterExpressionType/SingleValue":"single-value"};var M=function(r){if(typeof r==="object"){this.oModel=r;}else{this._sResourceRootUri=r;}this._oMetadata=null;if(!this.oModel&&this._sResourceRootUri){this.oModel=new O(this._sResourceRootUri);}if(this.oModel){this._oMetaModel=this.oModel.getMetaModel();}if(this._oMetaModel){this._oMetadata=this._oMetaModel.getProperty("/");}if(this._oMetadata&&this._oMetadata.dataServices){this._oSchemaDefinition=this._oMetadata.dataServices.schema[0];}};M.prototype.getNamespace=function(){if(this._oSchemaDefinition){return this._oSchemaDefinition.namespace;}};M.prototype.getSchemaDefinition=function(){return this._oSchemaDefinition;};M.prototype.getEntityContainerAttribute=function(A){var s=null,e;if(this._oMetaModel&&A){if(A.indexOf("sap:")<0){A="sap:"+A;}e=this._oMetaModel.getODataEntityContainer();s=e[A]||null;}return s;};M.prototype.getEntityLabelByEntityTypeName=function(e){var E=this._getEntityDefinition(e),r,R="";if(E){r=E["com.sap.vocabularies.Common.v1.Label"];if(r&&r.String){R=r.String;}}return R;};M.prototype._getEntityDefinition=function(e){var E=null;if(e){E=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(e));}return E;};M.prototype._getComplexTypeDefinition=function(c){var C=null;if(c){C=this._oMetaModel.getODataComplexType(this._getFullyQualifiedNameForEntity(c));}return C;};M.prototype._getNameOfPropertyUsingComplexType=function(e,c){var C=this.getNamespace();if(e&&c&&C){var t=C+"."+c;var m=this._getEntityDefinition(e);if(m){var p=m.property;if(p&&p.length){var i=0;for(i=0;i<p.length;i++){var P=p[i];if(P&&P.type===t){return P.name;}}}}}return null;};M.prototype.removeNamespace=function(s){var i,r=s;if(s){i=s.lastIndexOf(".")+1;}if(i>0){r=s.substring(i);}return r;};M.prototype.getEntityTypeNameFromEntitySetName=function(e){var E=null,s=null;if(this._oMetaModel){E=this._oMetaModel.getODataEntitySet(e);if(E){s=E.entityType;}}return s;};M.prototype.getEntitySetNameFromEntityTypeName=function(e){var Q,E,b,i,l,o;if(this._oMetaModel&&e){Q=this._getFullyQualifiedNameForEntity(e);E=this._oMetaModel.getODataEntityContainer();if(E&&Q){b=E.entitySet;l=b.length;for(i=0;i<l;i++){o=b[i];if(o.entityType===Q){break;}o=null;}if(o){return o.name;}}}return null;};M.prototype.getKeysByEntitySetName=function(e){var k=null,E=null;if(!this._oMetaModel){return undefined;}E=this.getEntityTypeNameFromEntitySetName(e);if(E){k=this.getKeysByEntityTypeName(E);}return k;};M.prototype.getKeysByEntityTypeName=function(e){var k=null,p=null,i,l=0,E=null;if(!this._oMetaModel){return undefined;}E=this._getEntityDefinition(e);if(E){if(E.key){p=E.key.propertyRef;if(p){l=p.length;k=[];for(i=0;i<l;i++){k.push(p[i].name);}}}}return k;};M.prototype.getFieldsByEntitySetName=function(e){var F=null,E,s=null;if(!this._oMetaModel){return undefined;}E=this._oMetaModel.getODataEntitySet(e);if(E){s=E.entityType;}if(s){F=this.getFieldsByEntityTypeName(s);this._enrichEntitySetMetadata(F,E);}return F;};M.prototype._enrichEntitySetMetadata=function(F,e){var l,o,n,N,r,m;n=this._getNonSortableFields(e);N=this._getNonFilterableFields(e);r=this._getRequiredFilterFields(e);m=this._getFilterExpressionRestriction(e);l=F.length;while(l--){o=F[l];o.sortable=!(n.indexOf(o.name)>-1);o.filterable=!(N.indexOf(o.name)>-1);o.requiredFilterField=(r.indexOf(o.name)>-1);o.filterRestriction=m[o.name];}};M.prototype._extractPropertyPathsFromAnnotation=function(A,s){var p=[],b,l,P;if(A&&s){b=A[s];}if(b){l=b.length;while(l--){P=b[l].PropertyPath;if(P){p.push(P);}}}return p;};M.prototype._getNonSortableFields=function(e){var s;if(e){s=e["Org.OData.Capabilities.V1.SortRestrictions"];}return this._extractPropertyPathsFromAnnotation(s,"NonSortableProperties");};M.prototype._getNonFilterableFields=function(e){var F;if(e){F=e["Org.OData.Capabilities.V1.FilterRestrictions"];}return this._extractPropertyPathsFromAnnotation(F,"NonFilterableProperties");};M.prototype._getRequiredFilterFields=function(e){var F;if(e){F=e["Org.OData.Capabilities.V1.FilterRestrictions"];}return this._extractPropertyPathsFromAnnotation(F,"RequiredProperties");};M.prototype._getFilterExpressionRestriction=function(e){var F={},b,l,o,p,A;if(e){b=e["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"];if(b){l=b.length;while(l--){o=b[l];if(o){p=o.Property;A=o.AllowedExpressions;if(p&&A&&p.PropertyPath&&A.EnumMember){F[p.PropertyPath]=f[A.EnumMember];}}}}}return F;};M.prototype._isFilterable=function(p,e){var n,F=!(p["sap:filterable"]==="false");if(F&&e){n=this._getNonFilterableFields(e);F=!(n.indexOf(p.name)>-1);}return F;};M.prototype._isHiddenFilter=function(p){var h=false,r=p["com.sap.vocabularies.UI.v1.HiddenFilter"];if(r){h=true;}return h;};M.prototype.getFieldsByEntityTypeName=function(e){var E;if(!this._oMetaModel){return undefined;}E=this._getEntityDefinition(e);return this._getFieldsByEntityDefinition(E);};M.prototype.getFieldsByComplexTypeName=function(c,p){var C;if(!this._oMetaModel){return undefined;}C=this._getComplexTypeDefinition(c);return this._getFieldsByEntityDefinition(C,p);};M.prototype.getAllEntityTypeNames=function(){if(!this._oMetaModel){return undefined;}var s=this._oSchemaDefinition;if(s.entityType&&s.entityType.length>0){var i=0;var r=[];for(i=0;i<s.entityType.length;i++){r.push(s.entityType[i].name);}return r;}return null;};M.prototype.getFieldSemanticObjectMap=function(e){var o=this.getFieldsByEntitySetName(e);if(!o){return null;}var m={},i,l=o.length;for(i=0;i<l;i++){var F=o[i];var A=this.getSemanticObjectAnnotation(F.fullName);if(A&&A.semanticObject){m[F.name]=A.semanticObject;}}return m;};M.prototype._getFieldsByEntityDefinition=function(e,p){var F=null,P=null,i=0,l=0,o,b;if(e){P=e.property;}if(P){F=[];l=P.length;for(i=0;i<l;i++){o=P[i];if(o){b=this._parseProperty(o,e,p);F.push(b);}}}return F;};M.getDisplayFormat=function(p){var d=p["sap:display-format"];if(d){return d;}var D=p["com.sap.vocabularies.Common.v1.IsUpperCase"];if(M.isAnnotationTrue(D)){return"UpperCase";}if(M.isDigitSequence(p)){return"NonNegative";}};M.getLinkDisplayFormat=function(p){if(M.isEmailAddress(p)){return"EmailAddress";}if(M.isPhoneNumber(p)){return"PhoneNumber";}if(M.isUrl(p)){return"Url";}return"";};M.getValueListMode=function(p){var v=p["sap:value-list"];if(v){return v;}if(M.isValueListWithFixedValues(p)){return"fixed-values";}return"";};M.isAnnotationTrue=function(A){return!!A&&(A.Bool==="true");};M.isPropertyStringType=function(p){return!!p&&(p.type==="Edm.String");};M.isStringTypePropertyAnnotated=function(p,t){return M.isPropertyStringType(p)&&M.isAnnotationTrue(p[t]);};M.isDigitSequence=function(p){var t="com.sap.vocabularies.Common.v1.IsDigitSequence";return M.isStringTypePropertyAnnotated(p,t);};M.isEmailAddress=function(p){var t="com.sap.vocabularies.Communication.v1.IsEmailAddress";return M.isStringTypePropertyAnnotated(p,t);};M.isPhoneNumber=function(p){var t="com.sap.vocabularies.Communication.v1.IsPhoneNumber";return M.isStringTypePropertyAnnotated(p,t);};M.isUrl=function(p){var t="Org.OData.Core.V1.IsUrl";return M.isStringTypePropertyAnnotated(p,t);};M.isValueList=function(p){var t="com.sap.vocabularies.Common.v1.ValueList";return!!(p&&(p["sap:value-list"]||p[t]));};M.isValueListWithFixedValues=function(p){var t="com.sap.vocabularies.Common.v1.ValueListWithFixedValues";return M.isAnnotationTrue(p[t]);};M.prototype._parseProperty=function(p,e,P){var F=q.extend({},p),r;r=p["com.sap.vocabularies.Common.v1.Label"];if(r){F.fieldLabel=r.String;}r=p["com.sap.vocabularies.Common.v1.QuickInfo"];if(r){F.quickInfo=r.String;}F.displayFormat=M.getDisplayFormat(p);F.aggregationRole=p["sap:aggregation-role"];r=p["Org.OData.Measures.V1.ISOCurrency"];if(r){F.isCurrencyField=true;F.isMeasureField=true;F.unit=r.Path;}r=p["Org.OData.Measures.V1.Unit"];if(r){F.isMeasureField=true;F.unit=r.Path;}r=p["com.sap.vocabularies.Common.v1.Text"];if(r){F.description=r.Path;F.displayBehaviour=this.getTextArrangementValue(r);}r=p["sap:filterable"];F.filterable=r!=="false";F.filterRestriction=p["sap:filter-restriction"];r=p["sap:required-in-filter"];F.requiredFilterField=r==="true";r=p["sap:sortable"];F.sortable=r!=="false";r=p["com.sap.vocabularies.UI.v1.IsImageURL"]||p["com.sap.vocabularies.UI.v1.IsImageUrl"];if(r){F.isImageURL=r.Bool?r.Bool!=="false":true;}r=p["com.sap.vocabularies.Common.v1.FieldControl"];F.visible=!(r&&r.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden");F.entityName=e.name;F.parentPropertyName=P;F.fullName=this._getFullyQualifiedNameForField(p.name,e);F.hiddenFilter=this._isHiddenFilter(p);return F;};M.prototype.extractNavigationPropertyField=function(p,e){var E,m,o,P,s,n,b,F=null;if(e&&p){E="/"+e+"/";P=p.split("/");s=P.pop();n=P.join("/");if(n&&s){m=this._oMetaModel.getMetaContext(E+n);if(m){b=this._oMetaModel.getProperty(m.getPath());}}if(b){o=this._oMetaModel.getODataProperty(b,s);}if(o){F=this._parseProperty(o,b,n);}}return F;};M.prototype.getAllFilterableFieldNamesByEntityTypeName=function(e){var g,i,b,j,c,r,G;r=[];g=this.getAllFilterableFieldsByEntityTypeName(e);if(g&&g.length){b=g.length;for(i=0;i<b;i++){G=g[i];if(G.fields&&G.fields.length){c=G.fields.length;for(j=0;j<c;j++){r.push(G.fields[j].name);}}}}return r;};M.prototype._getAllFilterableFieldsByEntity=function(e,i){var F=[],E,o,A,n,r,s,S,b;if(!this._oMetaModel||!e){return undefined;}if(i){o=this._oMetaModel.getODataEntitySet(e);if(o){E=this._getEntityDefinition(o.entityType);}}else{E=this._getEntityDefinition(e);}if(E){F.push(this._getFilterableFieldsFromEntityDefinition(E,undefined,o));A=this._getFilterableAssociations(E,o);for(n in A){b=A[n];if(i){r=this._oMetaModel.getODataAssociationSetEnd(E,n);if(r.entitySet){S=this._oMetaModel.getODataEntitySet(r.entitySet);}}s=this._getEntityDefinition(b);if(s){F.push(this._getFilterableFieldsFromEntityDefinition(s,n,S));}}}return F;};M.prototype.getAllFilterableFieldsByEntitySetName=function(e){if(!this._oMetaModel){return undefined;}return this._getAllFilterableFieldsByEntity(e,true);};M.prototype.getAllFilterableFieldsByEntityTypeName=function(e){if(!this._oMetaModel){return undefined;}return this._getAllFilterableFieldsByEntity(e);};M.prototype._getFilterableFieldsFromEntityDefinition=function(e,p,E){var F={},b=[],P=null,o,i,l,c=null;if(!this._oMetaModel||!e){return undefined;}o=e["com.sap.vocabularies.Common.v1.Label"];if(o){F.groupLabel=o.String;}F.groupEntityName=e.name;F.groupName=p;P=this._getFieldsByEntityDefinition(e,p);if(E){this._enrichEntitySetMetadata(P,E);}l=P.length;for(i=0;i<l;i++){c=P[i];if(c.visible&&c.filterable){b.push(c);}}F.fields=b;return F;};M.prototype._getFullyQualifiedNameForField=function(F,e){var n,E,r=F;if(e){n=e.namespace;E=e.name;}if(n&&E){r=n+"."+E+"/"+F;}return r;};M.prototype.getFieldNameByFullyQualifiedFieldName=function(F){var r,n;r=this.removeNamespace(F);n=r.indexOf("/");r=r.substring(n+1);return r;};M.prototype._getFilterableAssociations=function(e,E){var F={},n=null,N=null,i,l=0,o=null;if(!this._oMetaModel||!e){return undefined;}n=e.navigationProperty;if(n&&n.length){l=n.length;for(i=0;i<l;i++){N=n[i];if(!this._isFilterable(N,E)||this._isHiddenFilter(N)){continue;}o=this._oMetaModel.getODataAssociationEnd(e,N.name);if(!o||o.type===(e.namespace+"."+e.name)){continue;}if(o.multiplicity==="1"||o.multiplicity==="0..1"){if(F[N.name]===undefined){F[N.name]=o.type;}}}}return F;};M.prototype.getValueListAnnotationLazy=function(p){var P,A={additionalAnnotations:[]},r,s,b,t,c,o,Q;P=new Promise(function(R,d){if(p&&this._oMetaModel){b=p.split("/");t=this._oMetaModel.getODataEntityType(b[0])||this._oMetaModel.getODataComplexType(b[0]);s=b[1];c=this._oMetaModel.getODataProperty(t,s,true);if(c){o=this._oMetaModel.createBindingContext(c);this._oMetaModel.getODataValueLists(o).then(function(v){for(Q in v){r={annotation:v[Q]};if(r.annotation&&!r.annotation["PresentationVariantQualifier"]){this._enrichValueHelpAnnotation(r,s);if(!Q){A.primaryValueListAnnotation=r;}else{r.qualifier=Q;A.additionalAnnotations.push(r);}}}R(A);}.bind(this),d);return;}}d();}.bind(this));return P;};M.prototype.getValueListAnnotationForFunctionImport=function(v,p){var A={additionalAnnotations:[]},r,Q;for(Q in v){r={annotation:v[Q]};if(r.annotation){this._enrichValueHelpAnnotation(r,p);if(!Q){A.primaryValueListAnnotation=r;}else{r.qualifier=Q;A.additionalAnnotations.push(r);}}}return A;};M.prototype.getValueListAnnotation=function(p){var A={additionalAnnotations:[]},r,P,b,t,o,Q;if(p&&this._oMetaModel){b=p.split("/");t=this._oMetaModel.getODataEntityType(b[0])||this._oMetaModel.getODataComplexType(b[0]);o=this._oMetaModel.getODataProperty(t,b[1]);if(o){P=o.name;for(var s in o){if(s.indexOf("com.sap.vocabularies.Common.v1.ValueList")>-1){Q=null;r={annotation:o[s]};b=s.split("#");if(b.length===2){Q=b[1];}if(r.annotation){this._enrichValueHelpAnnotation(r,P);if(!Q){A.primaryValueListAnnotation=r;}else{r.qualifier=Q;A.additionalAnnotations.push(r);}}}}}}return A;};M.prototype._enrichValueHelpAnnotation=function(A,p){var r,R,e,k=[],K,I={},o={},b,c,F=[],v=[],d,P,V,l,g,L=0,i=0,h=0;if(A&&A.annotation){r=A.annotation;if(r){R=r["SearchSupported"];A.isSearchSupported=R?R.Bool==="true":false;R=r["CollectionPath"];if(R){A.valueListEntitySetName=R.String;if(this._oMetaModel){e=this._oMetaModel.getODataEntitySet(A.valueListEntitySetName);}if(e){A.valueListEntityName=e.entityType;A.semantics=e["sap:semantics"];k=this.getKeysByEntityTypeName(A.valueListEntityName);F=this.getFieldsByEntityTypeName(A.valueListEntityName);}}R=r["Label"];if(R){A.valueListTitle=R.String;}d=r["Parameters"];if(F&&d){L=d.length;}for(i=0;i<L;i++){g=d[i];V=undefined;l=undefined;P=g["ValueListProperty"];if(P){V=P.String;}P=g["LocalDataProperty"];if(P){l=P.PropertyPath;}b=false;if(g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){b=true;}c=false;if(g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){c=true;}if(b){I[l]=V;}if(c){o[l]=V;}if(c||g.RecordType==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){h=F.length;while(h--){if(F[h].name===V){v.push(F[h]);break;}}}if(!K&&c&&l===p){K=V;}}}A.inParams=I;A.outParams=o;A.fields=F;A.valueListFields=v;A.keys=k;A.keyField=K;A.descriptionField=this.getDescriptionFieldName(A.keyField,A.valueListEntitySetName);}};M.prototype.getDescriptionFieldName=function(k,e){var F,i=0,l,o,d;if(typeof k==="object"){o=k;}else{F=this.getFieldsByEntitySetName(e);if(F){l=F.length;for(i=0;i<l;i++){o=F[i];if(o.name===k){break;}o=null;}}}if(o&&o["com.sap.vocabularies.Common.v1.Text"]){d=o["com.sap.vocabularies.Common.v1.Text"].Path;}return d;};M.prototype.getIsSearchSupported=function(A){var i=false,p;if(A){p=A.SearchSupported;if(p&&p.Bool==="true"){i=true;}}return i;};M.prototype.getValueListSemantics=function(A){var e,E,s;if(A){e=A["CollectionPath"]?A["CollectionPath"].String:undefined;}if(e){E=this._oMetaModel.getODataEntitySet(e);if(E){s=E["sap:semantics"];}}return s;};M.prototype.getLineItemAnnotation=function(p,Q){var e,t,A,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.LineItem";if(Q){t+="#"+Q;}A=e[t];if(A){r={annotation:A};this._enrichAnnotationWithUIDataField(r,A);}}}return r;};M.prototype.isSemanticAggregation=function(p){var e;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){return e["sap:semantics"]==="aggregate";}}return false;};M.prototype.getPresentationVariantAnnotation=function(p,Q){var e,t,A,l,i,r,L,c,I;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.PresentationVariant";if(Q){t+="#"+Q;}A=e[t];if(A){r={annotation:A,requestAtLeastFields:[],sortOrderFields:[],groupByFields:[]};if(A.Visualizations){l=A.Visualizations.length;for(i=0;i<l;i++){I=A.Visualizations[i].AnnotationPath;if(!L&&I.indexOf("com.sap.vocabularies.UI.v1.LineItem")>-1){L=e[I.substring(1)];r.lineItemAnnotation={annotation:L};this._enrichAnnotationWithUIDataField(r.lineItemAnnotation,L);}else if(!c&&I.indexOf("com.sap.vocabularies.UI.v1.Chart")>-1){c=e[I.substring(1)];r.chartAnnotation={annotation:c,semantics:e["sap:semantics"]};this._enrichChartAnnotation(r.chartAnnotation,c);}if(L&&c){break;}}}if(A.RequestAtLeast){l=A.RequestAtLeast.length;for(i=0;i<l;i++){r.requestAtLeastFields.push(A.RequestAtLeast[i].PropertyPath);}}if(A.SortOrder){l=A.SortOrder.length;for(i=0;i<l;i++){r.sortOrderFields.push({name:A.SortOrder[i].Property.PropertyPath,descending:A.SortOrder[i].Descending?A.SortOrder[i].Descending.Bool==="true":false});}}if(A.GroupBy){l=A.GroupBy.length;for(i=0;i<l;i++){r.groupByFields.push(A.GroupBy[i].PropertyPath);}}}}}return r;};M.prototype._enrichChartAnnotation=function(A,o){var i,l,b;if(A&&o){A.measureFields=[];A.dimensionFields=[];A.measureAttributes={};A.dimensionAttributes={};if(o.ChartType&&o.ChartType.EnumMember){A.chartType=o.ChartType.EnumMember;}if(o.Measures){l=o.Measures.length;for(i=0;i<l;i++){A.measureFields.push(o.Measures[i].PropertyPath);}}if(o.MeasureAttributes){l=o.MeasureAttributes.length;for(i=0;i<l;i++){b=o.MeasureAttributes[i];A.measureAttributes[b.Measure.PropertyPath]=b.Role.EnumMember;}}if(o.Dimensions){l=o.Dimensions.length;for(i=0;i<l;i++){A.dimensionFields.push(o.Dimensions[i].PropertyPath);}}if(o.DimensionAttributes){l=o.DimensionAttributes.length;for(i=0;i<l;i++){b=o.DimensionAttributes[i];A.dimensionAttributes[b.Dimension.PropertyPath]=b.Role.EnumMember;}}}};M.prototype.getChartAnnotation=function(p,Q){var e,A,r,t;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){t="com.sap.vocabularies.UI.v1.Chart";if(Q){t+="#"+Q;}A=e[t];if(A){r={annotation:A,semantics:e["sap:semantics"]};this._enrichChartAnnotation(r,A);}}}return r;};M.prototype.getDataPointAnnotation=function(p){var e,P,Q,b,d,r={};if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){for(P in e){if(P.indexOf("com.sap.vocabularies.UI.v1.DataPoint")>-1){Q=null;d=e[P];b=P.split("#");if(b.length===2){Q=b[1];}if(d){if(Q){if(!r.additionalAnnotations){r.additionalAnnotations={};}r.additionalAnnotations[Q]=d;}else{r.primaryAnnotation=d;}}}}}}return r;};M.prototype.getFieldGroupAnnotation=function(p){var e,Q,P,r,A,R,b=[];if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){for(var s in e){if(s.indexOf("com.sap.vocabularies.UI.v1.FieldGroup")>-1){Q=null;A=e[s];P=s.split("#");if(P.length===2){Q=P[1];}if(A){R={annotation:A};if(Q){R.groupName=Q;}r=A["Label"];if(r){R.groupLabel=r.String;}r=A["Data"];if(r){this._enrichAnnotationWithUIDataField(R,r);}b.push(R);}}}}}return b;};M.prototype._enrichAnnotationWithUIDataField=function(A,r){var F=[],u={},l={},I={},c={},p,s,P,L=0,i=0;if(A&&r){L=r.length;F=[];l={};for(i=0;i<L;i++){P=r[i];if(P&&(P.RecordType==="com.sap.vocabularies.UI.v1.DataField"||P.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl")){s=null;p=P["Value"];if(p){s=p.Path;}if(s){F.push(s);p=P["Url"];if(p){u[s]=this._extractURLInfo(p);}p=P["Label"];if(p&&p.String){l[s]=p.String;}I[s]=this._getImportanceAnnotation(P);p=P["Criticality"];if(p){c[s]=this._extractCriticalityInfo(p,P);}}}}A.fields=F;A.urlInfo=u;A.labels=l;A.importance=I;A.criticality=c;}};M.prototype._extractCriticalityInfo=function(c,r){var R,C;if(c.Path||c.EnumMember){R={};R["path"]=c.Path;R["criticalityType"]=c.EnumMember;C=r["CriticalityRepresentation"];if(C&&C.EnumMember){R["criticalityRepresentationType"]=C.EnumMember;}}return R;};M.prototype._extractURLInfo=function(p){var r,P,l,o;if(p){if(p.Apply&&p.Apply.Name==="odata.fillUriTemplate"){r={urlTarget:undefined,parameters:[]};if(!this._oDummyAnnotationHelperContext){this._oDummyAnnotationHelperContext=this._oMetaModel.createBindingContext("/");q.sap.require("sap.ui.model.odata.AnnotationHelper");}if(this._oDummyAnnotationHelperContext){r.urlTarget=sap.ui.model.odata.AnnotationHelper.format(this._oDummyAnnotationHelperContext,p);}P=p.Apply.Parameters;l=P&&P.length?P.length:0;while(l--){o=P[l];if(o&&o.Type==="LabeledElement"&&o.Value&&o.Value.Path){r.parameters.push(o.Value.Path);}}}else if(p.Path){r={urlPath:p.Path};}}return r;};M.prototype.getSelectionFieldsAnnotation=function(p){var e,A,l,i,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(this._getFullyQualifiedNameForEntity(p));if(e){A=e["com.sap.vocabularies.UI.v1.SelectionFields"];if(A){r={annotation:A,selectionFields:[]};l=A.length;for(i=0;i<l;i++){r.selectionFields.push(A[i].PropertyPath);}}}}return r;};M.prototype.getSemanticKeyAnnotation=function(p){var e,A,l,i,r;if(p&&this._oMetaModel){e=this._oMetaModel.getODataEntityType(p);if(e){A=e["com.sap.vocabularies.Common.v1.SemanticKey"];if(A){r={annotation:A,semanticKeyFields:[]};l=A.length;for(i=0;i<l;i++){r.semanticKeyFields.push(A[i].PropertyPath);}}}}return r;};M.prototype._getImportanceAnnotation=function(p){var i=null,r;r=p["com.sap.vocabularies.UI.v1.Importance"];if(r){i=r.EnumMember;}switch(i){case"com.sap.vocabularies.UI.v1.ImportanceType/Medium":return"Medium";case"com.sap.vocabularies.UI.v1.ImportanceType/Low":return"Low";default:return"High";}};M.prototype.getTextArrangementValue=function(p){var P,t,o,A,d;if(p&&this._oMetaModel){if(typeof(p)==="string"){p=this._getFullyQualifiedNameForEntity(p);P=p.split("/");if(P.length>1){t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);o=this._oMetaModel.getODataProperty(t,P[1]);}else{o=this._oMetaModel.getODataEntityType(p)||this._oMetaModel.getODataComplexType(p);}}else{o=p;}if(o){A=o["com.sap.vocabularies.UI.v1.TextArrangement"];}if(A){switch(A.EnumMember){case"com.sap.vocabularies.UI.v1.TextArrangementType/TextFirst":d="descriptionAndId";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextLast":d="idAndDescription";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextSeparate":d="idOnly";break;case"com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly":d="descriptionOnly";break;default:d=undefined;break;}}}return d;};M.prototype.getSemanticObjectAnnotation=function(p){var P,t,o,A;if(p&&this._oMetaModel){P=p.split("/");t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);o=this._oMetaModel.getODataProperty(t,P[1]);if(o){A=o["com.sap.vocabularies.Common.v1.SemanticObject"];}return this._prepareSemanticObjectAnnotationFromProperty(A);}return null;};M.prototype.getSemanticObjectsFromAnnotation=function(p){if(!p||!this._oMetaModel){return null;}var P=p.split("/");var t=this._oMetaModel.getODataEntityType(P[0])||this._oMetaModel.getODataComplexType(P[0]);return M.getSemanticObjectsFromProperty(this._oMetaModel.getODataProperty(t,P[1]));};M.getSemanticObjectsFromProperty=function(p){var s={defaultSemanticObject:undefined,additionalSemanticObjects:[]};for(var A in p){if(q.sap.startsWith(A,"com.sap.vocabularies.Common.v1.SemanticObject")){if(q.sap.endsWith(A,"com.sap.vocabularies.Common.v1.SemanticObject")){s.defaultSemanticObject=p[A]["String"];}else{s.additionalSemanticObjects.push(p[A]["String"]);}}}return(s.defaultSemanticObject||s.additionalSemanticObjects.length>0)?s:undefined;};M.prototype.getSemanticObjectAnnotationFromProperty=function(p){var A;if(p){A=p["com.sap.vocabularies.Common.v1.SemanticObject"];return this._prepareSemanticObjectAnnotationFromProperty(A);}return null;};M.prototype._prepareSemanticObjectAnnotationFromProperty=function(A){var r,R;if(A){r=A["String"];if(r){R={annotation:A};R.semanticObject=r;}}return R;};M.prototype._getFullyQualifiedNameForEntity=function(e){var n,r;if(!e){return undefined;}if(e.indexOf(".")>-1){return e;}n=this.getNamespace();if(n&&!(e.indexOf(n)>-1)){r=n+"."+e;}else{r=e;}return r;};M.prototype.destroy=function(){this.oModel=null;this._oMetaModel=null;this._oMetadata=null;this._oSchemaDefinition=null;this._sResourceRootUri=null;this.bIsDestroyed=true;this._oDummyAnnotationHelperContext=null;};return M;},true);
