/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate','sap/ui/unified/library'],function(q,C,I,D,a,U,l){"use strict";var Y=C.extend("sap.ui.unified.calendar.YearPicker",{metadata:{library:"sap.ui.unified",properties:{year:{type:"int",group:"Data",defaultValue:2000},years:{type:"int",group:"Appearance",defaultValue:20},columns:{type:"int",group:"Appearance",defaultValue:4},date:{type:"object",group:"Data"},primaryCalendarType:{type:"sap.ui.core.CalendarType",group:"Appearance"}},events:{select:{},pageChange:{}}}});Y.prototype.init=function(){var s=sap.ui.getCore().getConfiguration().getCalendarType();this.setProperty("primaryCalendarType",s);this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y",calendarType:s});this._oFormatYyyymmdd=sap.ui.core.format.DateFormat.getInstance({pattern:"yyyyMMdd",calendarType:sap.ui.core.CalendarType.Gregorian});this._oMinDate=this._newUniversalDate(new Date(Date.UTC(1,0,1)));this._oMinDate.getJSDate().setUTCFullYear(1);this._oMaxDate=this._newUniversalDate(new Date(Date.UTC(9999,11,31)));};Y.prototype.onAfterRendering=function(){_.call(this);};Y.prototype.setYear=function(y){this.setProperty("year",y,true);y=this.getProperty("year");var o=this._newUniversalDate(new Date());o.setDate(1);o.setMonth(0);o.setFullYear(y);this.setDate(o.getJSDate());return this;};Y.prototype.setDate=function(o){if(o&&!(o instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var y=o.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var u=a._createUniversalUTCDate(o,this.getPrimaryCalendarType());u.setUTCMonth(0,1);this.setProperty("date",o,true);this.setProperty("year",u.getUTCFullYear(),true);this._oUTCDate=u;if(this.getDomRef()){var i=this.getYears();var F=this._newUniversalDate(this._oUTCDate);F.setUTCFullYear(F.getUTCFullYear()-Math.floor(i/2));h.call(this,F,Math.floor(i/2));}return this;};Y.prototype._getDate=function(){if(!this._oUTCDate){var y=this.getYear();this._oUTCDate=this._newUniversalDate(new Date(Date.UTC(y,0,1)));if(y<100){this._oUTCDate.setUTCFullYear(y);}}return this._oUTCDate;};Y.prototype.setPrimaryCalendarType=function(s){this.setProperty("primaryCalendarType",s);this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y",calendarType:s});if(this._oUTCDate){this._oUTCDate=U.getInstance(this._oUTCDate.getJSDate(),s);this._oUTCDate.setUTCMonth(0,1);}this._oMinDate=U.getInstance(this._oMinDate.getJSDate(),s);this._oMaxDate=U.getInstance(this._oMaxDate.getJSDate(),s);return this;};Y.prototype._newUniversalDate=function(o){var j;if((o instanceof U)){j=new Date(o.getJSDate().getTime());}else{j=new Date(o.getTime());}return U.getInstance(j,this.getPrimaryCalendarType());};Y.prototype.nextPage=function(){g.call(this,true,this._oItemNavigation.getFocusedIndex());return this;};Y.prototype.previousPage=function(){g.call(this,false,this._oItemNavigation.getFocusedIndex());return this;};Y.prototype.onsapspace=function(E){E.preventDefault();};Y.prototype.onsapselect=function(E){var i=this._oItemNavigation.getFocusedIndex();var s=f.call(this,i);if(s){this.fireSelect();}};Y.prototype.onmouseup=function(E){if(this._bMousedownChange){this._bMousedownChange=false;this.fireSelect();}};Y.prototype.getFirstRenderedDate=function(){var F;if(this.getDomRef()){var i=this._oItemNavigation.getItemDomRefs();F=this._oFormatYyyymmdd.parse(q(i[0]).attr("data-sap-year-start"),true);}return F;};Y.prototype._checkFirstDate=function(o){var y=this.getYears();var m=this._newUniversalDate(this._oMaxDate);m.setUTCFullYear(m.getUTCFullYear()-y+1);if(o.getTime()>m.getTime()&&o.getFullYear()!=m.getUTCFullYear()){o=this._newUniversalDate(m);o.setUTCMonth(0,1);}else if(o.getTime()<this._oMinDate.getTime()&&o.getFullYear()!=this._oMinDate.getUTCFullYear()){o=this._newUniversalDate(this._oMinDate);o.setUTCMonth(0,1);}return o;};Y.prototype._checkDateEnabled=function(o){var E=true;if((o.getTime()>this._oMaxDate.getTime()&&o.getFullYear()!=this._oMaxDate.getUTCFullYear())||(o.getTime()<this._oMinDate.getTime()&&o.getFullYear()!=this._oMinDate.getUTCFullYear())){E=false;}return E;};function _(){var y=this.getYears();var i=this._getDate().getUTCFullYear();var m=this._oMinDate.getUTCFullYear();var M=this._oMaxDate.getUTCFullYear();var r=this.getDomRef();var j=this.$().find(".sapUiCalItem");var k=Math.floor(y/2);if(i>M-Math.floor(y/2)){k=k+i-M+Math.floor(y/2);}else if(i<=m+Math.floor(y/2)){k=i-m;}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,b,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,c,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,e,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setHomeEndColumnMode(true,true);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});}this._oItemNavigation.setRootDomRef(r);this._oItemNavigation.setItemDomRefs(j);this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(this.getColumns(),true);this._oItemNavigation.setFocusedIndex(k);this._oItemNavigation.setPageSize(j.length);}function b(o){var i=o.getParameter("index");var E=o.getParameter("event");if(!E){return;}if(E.type=="mousedown"){d.call(this,E,i);}}function c(o){var i=o.getParameter("index");var E=o.getParameter("event");if(!E){return;}if(E.type=="mousedown"){d.call(this,E,i);}}function d(E,i){if(E.button){return;}var s=f.call(this,i);if(s){this._bMousedownChange=true;}E.preventDefault();E.setMark("cancelAutoClose");}function e(o){var E=o.getParameter("event");if(E.type){var y=this.getYears();var i=this.getColumns();if(i==0){i=y;}switch(E.type){case"sapnext":case"sapnextmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_DOWN&&i<y){g.call(this,true,this._oItemNavigation.getFocusedIndex()-y+i,true);}else{g.call(this,true,0,true);}break;case"sapprevious":case"sappreviousmodifiers":if(E.keyCode==q.sap.KeyCodes.ARROW_UP&&i<y){g.call(this,false,y-i+this._oItemNavigation.getFocusedIndex(),true);}else{g.call(this,false,y-1,true);}break;case"sappagedown":g.call(this,true,this._oItemNavigation.getFocusedIndex(),true);break;case"sappageup":g.call(this,false,this._oItemNavigation.getFocusedIndex(),true);break;default:break;}}}function f(j){var k=this._oItemNavigation.getItemDomRefs();var $=q(k[j]);if($.hasClass("sapUiCalItemDsbl")){return false;}var y=$.attr("data-sap-year-start");var o=this._newUniversalDate(this._oFormatYyyymmdd.parse(y,true));var s=this.getId()+"-y"+y;for(var i=0;i<k.length;i++){$=q(k[i]);if($.attr("id")==s){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}else{$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}}var L=a._createLocalDate(o);this.setProperty("date",L,true);this.setProperty("year",o.getUTCFullYear(),true);return true;}function g(F,s,i){var j=this._oItemNavigation.getItemDomRefs();var o=this._newUniversalDate(this._oFormatYyyymmdd.parse(q(j[0]).attr("data-sap-year-start"),true));var y=this.getYears();if(F){var m=this._newUniversalDate(this._oMaxDate);m.setUTCFullYear(m.getUTCFullYear()-y+1);if(o.getTime()<m.getTime()){o.setUTCFullYear(o.getUTCFullYear()+y);if(o.getTime()>m.getTime()){s=s+(o.getUTCFullYear()-m.getUTCFullYear());if(s>y-1){s=y-1;}o=this._oMaxDate;o.setUTCMonth(0,1);}}else{return;}}else{if(o.getTime()>this._oMinDate.getTime()){o.setUTCFullYear(o.getUTCFullYear()-y);if(o.getTime()<this._oMinDate.getTime()){s=s-(this._oMinDate.getUTCFullYear()-o.getUTCFullYear());if(s<0){s=0;}o=this._newUniversalDate(this._oMinDate);}}else{return;}}h.call(this,o,s);if(i){this.firePageChange();}}function h(F,s){var j=this._oFormatYyyymmdd.format(this._getDate().getJSDate(),true);var E=false;var o=this._checkFirstDate(F);var S;if(o.getTime()!=F.getTime()){S=this._newUniversalDate(F);S.setUTCFullYear(S.getUTCFullYear()+s);F=o;E=true;}var k=this._oItemNavigation.getItemDomRefs();var m=this._newUniversalDate(F);for(var i=0;i<k.length;i++){var y=this._oFormatYyyymmdd.format(m.getJSDate(),true);var $=q(k[i]);$.attr("id",this.getId()+"-y"+y);$.text(this._oYearFormat.format(m,true));$.attr("data-sap-year-start",y);if($.hasClass("sapUiCalItemSel")&&y!=j){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else if(!$.hasClass("sapUiCalItemSel")&&y==j){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}var n=true;if(E){n=this._checkDateEnabled(m);if(m.getTime()==S.getTime()){s=i;}}if(n){$.removeClass("sapUiCalItemDsbl");$.removeAttr("aria-disabled");}else{$.addClass("sapUiCalItemDsbl");$.attr("aria-disabled",true);}m.setUTCFullYear(m.getUTCFullYear()+1);}this._oItemNavigation.focusItem(s);}return Y;},true);
