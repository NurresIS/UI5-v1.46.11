/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/base/Object','sap/ui/core/MessageType','./ChartWrapper','./SelectionWrapper','./ColumnWrapper','sap/ui/comp/library'],function(B,M,C,S,c,d){"use strict";var U={splitDimeasures:function(D,i,a,m){D.forEach(function(o){var I=this.getArrayElementByKey("columnKey",o.columnKey,i);if(I.aggregationRole===sap.ui.comp.personalization.AggregationRole.Dimension){a.push(o);}else if(I.aggregationRole===sap.ui.comp.personalization.AggregationRole.Measure){m.push(o);}},this);},createChartWrapper:function(o,a){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var b=[],e,p;o.getDimensions().forEach(function(D){p=D.data("p13nData");e=new c({label:D.getLabel(),tooltip:D.getTooltip(),selected:o.getVisibleDimensions().indexOf(D.getName())>-1,aggregationRole:sap.ui.comp.personalization.AggregationRole.Dimension,role:D.getRole()?D.getRole():r.getText('COLUMNSPANEL_CHARTROLE_CATEGORY')});e.data("p13nData",p);b.push(e);});o.getMeasures().forEach(function(m){p=m.data("p13nData");e=new c({label:m.getLabel(),tooltip:m.getTooltip(),selected:o.getVisibleMeasures().indexOf(m.getName())>-1,aggregationRole:sap.ui.comp.personalization.AggregationRole.Measure,role:m.getRole()?m.getRole():r.getText('COLUMNSPANEL_CHARTROLE_AXIS1')});e.data("p13nData",p);b.push(e);});if(a){a.forEach(function(p){e=new c({label:p.label,tooltip:p.tooltip,selected:false,aggregationRole:sap.ui.comp.personalization.AggregationRole.NotDimeasure});e.data("p13nData",p);b.push(e);});}return new C({chart:o,columns:b});},createSelectionWrapper:function(m,f){var a=m.map(function(o){var b=new c({label:o.text,selected:o.visible,href:f?undefined:o.href,target:o.target,press:o.press});b.data("p13nData",{columnKey:o.key});return b;},this);return new S({columns:a});},sortItemsByText:function(i,k){var l;try{var l=sap.ui.getCore().getConfiguration().getLocale().toString();if(typeof window.Intl!=='undefined'){var o=window.Intl.Collator(l,{numeric:true});i.sort(function(a,b){return o.compare(a[k],b[k]);});}else{i.sort(function(a,b){return a[k].localeCompare(b[k],l,{numeric:true});});}}catch(e){}},recoverPersonalisationDateData:function(p,a){if(a.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(a.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=new Date(f.value1);}if(f.value2&&typeof(f.value2)==="string"){f.value2=new Date(f.value2);}}});}},recoverPersonalisationTimeData:function(p,a){if(a.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(a.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=new Date(f.value1);}if(f.value2&&typeof(f.value2)==="string"){f.value2=new Date(f.value2);}}});}},recoverPersonalisationBooleanData:function(p,a){if(a.length&&p&&p.filter){p.filter.filterItems.forEach(function(f){if(a.indexOf(f.columnKey)>-1){if(f.value1&&typeof(f.value1)==="string"){f.value1=f.value1==="true";}if(f.value2&&typeof(f.value2)==="string"){f.value2=f.value2==="true";}}});}},getUnionOfAttribute:function(s,a){var u=[];var A=function(b){if(u.indexOf(b)<0){u.push(b);}};for(var n in s){var N=s[n];if(!N[a]){continue;}N[a].forEach(A);}return u;},getUnionOfColumnKeys:function(o){var u=[];var f=function(a){var b=u.concat(a);u=b.filter(function(i,p){return b.indexOf(i)===p;});};for(var n in o){f(o[n]);}return u;},copy:function(o){if(o instanceof Array){return jQuery.extend(true,[],o);}return jQuery.extend(true,{},o);},sort:function(k,A){var r=this.copy(A);r.sort(function(a,b){var t=a[k].toLocaleLowerCase();var T=b[k].toLocaleLowerCase();if(t<T){return-1;}if(t>T){return 1;}return 0;});return r;},removeEmptyProperty:function(o){for(var t in o){if(o[t]===null||o[t]===undefined){delete o[t];}}return o;},semanticEqual:function(i,I){if(!i||!I){return false;}for(var p in i){if(i[p]!==I[p]){return false;}}return true;},hasChangedType:function(o){for(var t in o){if(o[t]===sap.ui.comp.personalization.ChangeType.ModelChanged||o[t]===sap.ui.comp.personalization.ChangeType.TableChanged){return true;}}return false;},isNamespaceChanged:function(o,n){if(o[n]){return o[n]===sap.ui.comp.personalization.ChangeType.ModelChanged||o[n]===sap.ui.comp.personalization.ChangeType.TableChanged;}return false;},createArrayFromString:function(e){if(!e){return[];}var E=[];var r=e.split(",");r.forEach(function(f){if(f!==""){E.push(f.trim());}});return E;},getIndexByKey:function(m,s){var I=-1;m.some(function(o,i){if(o.columnKey===s){I=i;return true;}});return I;},getColumnKey:function(o){return this._getCustomProperty(o,"columnKey")||o.getId();},getColumnType:function(o){return this._getCustomProperty(o,"type");},isGroupable:function(o){if(o instanceof sap.ui.table.AnalyticalColumn){var t=o.getParent();var b=t&&t.getBinding("rows");var r=b&&b.getAnalyticalQueryResult();if(t&&r&&r.findDimensionByPropertyName(o.getLeadingProperty())&&jQuery.inArray(o.getLeadingProperty(),b.getSortablePropertyNames())>-1&&jQuery.inArray(o.getLeadingProperty(),b.getFilterablePropertyNames())>-1){return true;}}if(o instanceof sap.m.Column){return this.isSortable(o);}return false;},isSortable:function(o){if(o.getSortProperty){return!!o.getSortProperty();}if(this._getCustomProperty(o,"sortProperty")){return true;}return false;},isFilterable:function(o){if(o.getFilterProperty){return!!o.getFilterProperty();}if(this._getCustomProperty(o,"filterProperty")){return true;}return false;},isConsistent:function(a){if(!a||!a.length){return true;}var o={};var b=true;var h=!!this._getCustomProperty(a[0],"columnKey");a.some(function(e){var s=this._getCustomProperty(e,"columnKey");var H=!!s;if(H!==h){b=false;return true;}if(h){if(o[s]){b=false;return true;}o[s]={};}},this);return b;},getArrayElementByKey:function(k,K,a){if(!a||!a.length){return null;}var e=null;a.some(function(E){if(E[k]!==undefined&&E[k]===K){e=E;return true;}});return e;},isColumnIgnored:function(o,i){if(!i){return false;}return i.indexOf(this.getColumnKey(o))>-1;},createSort2Json:function(t,D,i){if(t){if(t instanceof sap.ui.table.Table){t.getColumns().forEach(function(o){var s=this.getColumnKey(o);if(this.isColumnIgnored(o,i)){return;}if(o.getSorted()){D.push({columnKey:s,operation:o.getSortOrder()});}},this);}}},_getCustomProperty:function(o,p){var a=this._getCustomData(o);if(!a||!p){return null;}return a[p];},_getCustomData:function(o){if(!o){return null;}var a=o.data("p13nData");if(typeof a==="string"){try{a=JSON.parse(a);o.data("p13nData",a);}catch(e){}}return a;}};return U;},true);
