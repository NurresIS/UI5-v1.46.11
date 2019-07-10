sap.ui.define(["sap/ui/base/Object","sap/ui/model/Context","sap/suite/ui/generic/template/AnalyticalListPage/util/OperationCode"],function(B,C,O){"use strict";var F=B.extend("sap.suite.ui.generic.template.AnalyticalListPage.util.FilterUtil");F.createTitle=function(d,D){var t;if(!d){return D;}if(d.indexOf(':')!==-1){d=d.substring(0,d.indexOf(':'));}if(d.indexOf(D)===-1){t=d+" ("+D+")";}else{t=d;}return t;};F.readProperty=function(o,n){var a=o,i=0;var p=typeof n==='string'?n.split("."):[];while(i<p.length){if(!a){return undefined;}a=a[p[i++]];}return a;};F.executeFunction=function(o,f,a){var b=o,i=0,p;var P=typeof f==='string'?f.split("."):[];while(i<P.length){if(!b){return undefined;}p=b;b=b[P[i++]];}return typeof b==='function'?b.apply(p,a):undefined;};F.createTitleFromCode=function(f){var v=F.readProperty(f,"value1");var V=F.readProperty(f,"value2");var o=F.readProperty(f,"operation");if(!v||!o||!O[o]){return undefined;}var r;if(V){r=v+O[o].code+V;}else if(O[o].position==="last"){r=v+O[o].code;}else if(O[o].position==="mid"){r=O[o].code+v+O[o].code;}else{r=O[o].code+v;}if(f.exclude){r="!("+r+")";}return r;};F.formatFiltersLink=function(c){var i=this.getModel("i18n"),r=i.getResourceBundle();if(c){var l=Object.keys(c).length;if(c["_CUSTOM"]){l--;}if(l){return r.getText("VISUAL_FILTER_FILTERS_WITH_COUNT",[l]);}}return r.getText("VISUAL_FILTER_FILTERS");};F.getBooleanValue=function(v,d){if(v&&v.Bool){if(v.Bool.toLowerCase()==="true"){return true;}else if(v.Bool.toLowerCase()==="false"){return false;}}return d;};F.getPrimitiveValue=function(v){var a;if(v){if(v.String){a=v.String;}else if(v.Bool){a=F.getBooleanValue(v);}else if(v.EnumMember){a=v.EnumMember.split("/")[1];}else{a=F.getNumberValue(v);}}return a;};F.getNumberValue=function(v){var a;if(v){if(v.String){a=Number(v.String);}else if(v.Int){a=Number(v.Int);}else if(v.Decimal){a=Number(v.Decimal);}else if(v.Double){a=Number(v.Double);}else if(v.Single){a=Number(v.Single);}}return a;};F.getPathOrPrimitiveValue=function(i){if(i){if(i.Path){return"{path:'"+i.Path+"'}";}else{return F.getPrimitiveValue(i);}}else{return"";}};return F;},true);
