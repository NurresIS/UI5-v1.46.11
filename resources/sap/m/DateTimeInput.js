/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','./library','sap/ui/model/type/Date'],function(q,C,l,D){"use strict";var a=C.extend("sap.m.DateTimeInput",{metadata:{library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:sap.ui.core.ValueState.None},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},type:{type:"sap.m.DateTimeInputType",group:"Data",defaultValue:sap.m.DateTimeInputType.Date},displayFormat:{type:"string",group:"Appearance",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},dateValue:{type:"object",group:"Data",defaultValue:null}},aggregations:{_picker:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"string"},dateValue:{type:"object"},valid:{type:"boolean"}}}}}});!(function(p,$,d){var o=sap.m.getLocaleData();$.extend(p,{_types:{Date:{valueFormat:o.getDatePattern("short"),displayFormat:o.getDatePattern("medium")},Time:{valueFormat:o.getTimePattern("short"),displayFormat:o.getTimePattern("short")},DateTime:{valueFormat:o.getDateTimePattern("short"),displayFormat:o.getDateTimePattern("short")}}});["Time","Date"].forEach(function(t,n){["valueFormat","displayFormat"].forEach(function(f){var T=p._types;T.DateTime[f]=T.DateTime[f].replace("{"+n+"}",T[t][f]);});});}(a.prototype,q,sap.ui.Device));a.prototype.init=function(){this.setType(sap.m.DateTimeInputType.Date);};a.prototype.onBeforeRendering=function(){b.call(this);};a.prototype.getFocusDomRef=function(){var p=_.call(this);return p.getFocusDomRef();};a.prototype.getIdForLabel=function(){var p=_.call(this);return p.getIdForLabel();};a.prototype.setType=function(t){if(t==this.getType()&&_.call(this)){return this;}this.destroyAggregation("_picker");var p;switch(t){case sap.m.DateTimeInputType.DateTime:q.sap.require("sap.m.DateTimePicker");p=new sap.m.DateTimePicker(this.getId()+"-Picker");break;case sap.m.DateTimeInputType.Time:q.sap.require("sap.m.TimePicker");p=new sap.m.TimePicker(this.getId()+"-Picker",{localeId:sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()});break;default:q.sap.require("sap.m.DatePicker");p=new sap.m.DatePicker(this.getId()+"-Picker");break;}p.setDisplayFormat(this.getDisplayFormat()||this._types[t].displayFormat);p.setValueFormat(this.getValueFormat()||this._types[t].valueFormat);if(this.getDateValue()){p.setDateValue(this.getDateValue());}p.setEnabled(this.getEnabled());p.setEditable(this.getEditable());p.setValueState(this.getValueState());p.setValueStateText(this.getValueStateText());p.setShowValueStateMessage(this.getShowValueStateMessage());p.setName(this.getName());p.setPlaceholder(this.getPlaceholder());p.setTextAlign(this.getTextAlign());p.setTextDirection(this.getTextDirection());p.setWidth("100%");p.attachChange(c,this);var A=this.getAriaLabelledBy();for(var i=0;i<A.length;i++){p.addAriaLabelledBy(A[i]);}this.setAggregation("_picker",p);this.setProperty("type",t);return this;};a.prototype.setWidth=function(w){this.setProperty("width",w);if(this.getDomRef()){w=this.getWidth();this.$().css("width",w);}return this;};a.prototype.setValue=function(v){b.call(this);v=this.validateProperty("value",v);if(v.toLowerCase()=="now"){return this.setDateValue(new Date());}if(v===this.getValue()){return this;}this.setProperty("value",v,true);var p=_.call(this);p.setValue(v);var d=p.getDateValue();this.setProperty("dateValue",d,true);return this;};a.prototype.setDateValue=function(d){if(d&&!(d instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}b.call(this);this.setProperty("dateValue",d,true);var p=_.call(this);p.setDateValue(d);var v=p.getValue();this.setProperty("value",v,true);return this;};a.prototype.setDisplayFormat=function(d){this.setProperty("displayFormat",d,true);var p=_.call(this);p.setDisplayFormat(d||this._types[this.getType()].displayFormat);return this;};a.prototype.setValueFormat=function(v){this.setProperty("valueFormat",v,true);var p=_.call(this);p.setValueFormat(v||this._types[this.getType()].ValueFormat);return this;};a.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);var p=_.call(this);p.setEnabled(e);return this;};a.prototype.setEditable=function(e){this.setProperty("editable",e,true);var p=_.call(this);p.setEditable(e);return this;};a.prototype.setValueState=function(v){this.setProperty("valueState",v,true);var p=_.call(this);p.setValueState(v);return this;};a.prototype.setValueStateText=function(v){this.setProperty("valueStateText",v,true);var p=_.call(this);p.setValueStateText(v);return this;};a.prototype.setShowValueStateMessage=function(s){this.setProperty("showValueStateMessage",s,true);var p=_.call(this);p.setShowValueStateMessage(s);return this;};a.prototype.setName=function(n){this.setProperty("name",n,true);var p=_.call(this);p.setName(n);return this;};a.prototype.setPlaceholder=function(p){this.setProperty("placeholder",p,true);var P=_.call(this);P.setPlaceholder(p);return this;};a.prototype.setTextAlign=function(t){this.setProperty("textAlign",t,true);var p=_.call(this);p.setTextAlign(t);return this;};a.prototype.setTextDirection=function(t){this.setProperty("textDirection",t,true);var p=_.call(this);p.setTextDirection(t);return this;};a.prototype.addAriaLabelledBy=function(i){this.addAssociation("ariaLabelledBy",i,true);var p=_.call(this);p.addAriaLabelledBy(i);return this;};a.prototype.removeAriaLabelledBy=function(i){this.removeAssociation("ariaLabelledBy",i,true);var p=_.call(this);p.removeAriaLabelledBy(i);return this;};a.prototype.removeAllAriaLabelledBy=function(){this.removeAssociation("ariaLabelledBy",true);var p=_.call(this);p.removeAllAriaLabelledBy();return this;};a.prototype.getAccessibilityInfo=function(){var p=_.call(this);return p&&p.getAccessibilityInfo?p.getAccessibilityInfo():null;};function _(){return this.getAggregation("_picker");}function b(){var B=this.getBinding("value");if(B&&B.oType&&(B.oType instanceof D)){var p=B.oType.getOutputPattern();var P=_.call(this);if(P.getValueFormat()!=p){P.setValueFormat(p);}if(P.getDisplayFormat()!=p){P.setDisplayFormat(p);}}}function c(e){var v=e.getParameter("value");var d;var V=e.getParameter("valid");this.setProperty("value",v,true);if(V){d=e.oSource.getDateValue();this.setProperty("dateValue",d,true);}this.fireChange({value:v,newValue:v,valid:V,dateValue:d,newDateValue:d});}return a;},true);