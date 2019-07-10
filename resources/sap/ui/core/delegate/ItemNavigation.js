/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var I=E.extend("sap.ui.core.delegate.ItemNavigation",{constructor:function(d,i,n){E.apply(this);this.oDomRef=null;if(d){this.setRootDomRef(d);}this.aItemDomRefs=[];if(i){this.setItemDomRefs(i);}this.iTabIndex=-1;this.iActiveTabIndex=!!n?-1:0;this.iFocusedIndex=-1;this.iSelectedIndex=-1;this.bCycling=true;this.bTableMode=false;this.iPageSize=-1;this._bMouseDownHappened=false;this.oDisabledModifiers={sapend:["alt","shift"],saphome:["alt","shift"]};}});I.Events={BeforeFocus:"BeforeFocus",AfterFocus:"AfterFocus",BorderReached:"BorderReached",FocusAgain:"FocusAgain",FocusLeave:"FocusLeave"};I.prototype.setDisabledModifiers=function(d){this.oDisabledModifiers=d;return this;};I.prototype.getDisabledModifiers=function(d){return this.oDisabledModifiers;};I.prototype.hasDisabledModifier=function(e){var d=this.oDisabledModifiers[e.type.replace("modifiers","")];if(Array.isArray(d)){for(var i=0;i<d.length;i++){if(e[d[i]+"Key"]){return true;}}}return false;};I.prototype.setRootDomRef=function(d){this.oDomRef=d;if(!q(this.oDomRef).data("sap.INItem")){if(this.iFocusedIndex>=0){q(this.oDomRef).attr("tabIndex",this.iTabIndex);}else{q(this.oDomRef).attr("tabIndex",this.iActiveTabIndex);}}q(this.oDomRef).data("sap.INRoot",this);return this;};I.prototype.getRootDomRef=function(){return this.oDomRef;};I.prototype.getItemDomRefs=function(){return this.aItemDomRefs;};I.prototype.setItemDomRefs=function(a){this.aItemDomRefs=a;if(this.iFocusedIndex>a.length-1){this.iFocusedIndex=a.length-1;}for(var i=0;i<this.aItemDomRefs.length;i++){if(this.aItemDomRefs[i]){var $=q(this.aItemDomRefs[i]);if(i==this.iFocusedIndex&&!$.data("sap.INRoot")){$.attr("tabIndex",this.iActiveTabIndex);}else if($.attr("tabindex")=="0"){$.attr("tabIndex",-1);}$.data("sap.INItem",true);$.data("sap.InNavArea",true);if($.data("sap.INRoot")&&i!=this.iFocusedIndex){$.data("sap.INRoot").setNestedItemsTabindex();}}}return this;};I.prototype.setItemsTabindex=function(){for(var i=0;i<this.aItemDomRefs.length;i++){if(this.aItemDomRefs[i]){var $=q(this.aItemDomRefs[i]);if($.is(":sapFocusable")){if(i==this.iFocusedIndex&&!$.data("sap.INRoot")){$.attr("tabIndex",this.iActiveTabIndex);}else{$.attr("tabIndex",-1);}}}}return this;};I.prototype.setNestedItemsTabindex=function(){if(q(this.oDomRef).data("sap.INItem")){for(var i=0;i<this.aItemDomRefs.length;i++){if(this.aItemDomRefs[i]&&q(this.aItemDomRefs[i]).attr("tabindex")=="0"){q(this.aItemDomRefs[i]).attr("tabIndex",-1);}}}return this;};I.prototype.destroy=function(){if(this.oDomRef){q(this.oDomRef).removeData("sap.INRoot");this.oDomRef=null;}if(this.aItemDomRefs){for(var i=0;i<this.aItemDomRefs.length;i++){if(this.aItemDomRefs[i]){q(this.aItemDomRefs[i]).removeData("sap.INItem");q(this.aItemDomRefs[i]).removeData("sap.InNavArea");}}this.aItemDomRefs=null;}this._bItemTabIndex=undefined;this.iFocusedIndex=-1;};I.prototype.setCycling=function(c){this.bCycling=c;return this;};I.prototype.setTableMode=function(t,T){this.bTableMode=t;if(this.oConfiguration===undefined){this.oConfiguration=sap.ui.getCore().getConfiguration();}this.bTableList=t?T:false;return this;};I.prototype.setPageSize=function(p){this.iPageSize=p;return this;};I.prototype.setSelectedIndex=function(i){this.iSelectedIndex=i;return this;};I.prototype.setColumns=function(c,n){this.iColumns=c;this.bNoColumnChange=n;return this;};I.prototype.setHomeEndColumnMode=function(s,c){this._bStayInRow=s;this._bCtrlEnabled=c;return this;};I.prototype.focusItem=function(i,e){q.sap.log.info("FocusItem: "+i+" iFocusedIndex: "+this.iFocusedIndex,"focusItem","ItemNavigation");if(i==this.iFocusedIndex&&this.aItemDomRefs[this.iFocusedIndex]==document.activeElement){this.fireEvent(I.Events.FocusAgain,{index:i,event:e});return;}if(!this.aItemDomRefs[i]||!q(this.aItemDomRefs[i]).is(":sapFocusable")){if(this.bTableMode){var c=i%this.iColumns;var o=i;if(e&&e.keyCode==q.sap.KeyCodes.ARROW_RIGHT){if(c<this.iColumns-1){i+=this.oConfiguration.getRTL()?-1:1;}}else if(e&&e.keyCode==q.sap.KeyCodes.ARROW_LEFT){if(c>1){i-=this.oConfiguration.getRTL()?-1:1;}}else{if(c>1){i-=1;}}if(i!=o){this.focusItem(i,e);}}return;}this.fireEvent(I.Events.BeforeFocus,{index:i,event:e});this.setFocusedIndex(i);this.bISetFocus=true;if(e&&q(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot")){var a=q(this.aItemDomRefs[this.iFocusedIndex]).data("sap.INRoot");a._sFocusEvent=e.type;}q.sap.log.info("Set Focus on ID: "+this.aItemDomRefs[this.iFocusedIndex].id,"focusItem","ItemNavigation");q.sap.focus(this.aItemDomRefs[this.iFocusedIndex]);this.fireEvent(I.Events.AfterFocus,{index:i,event:e});};I.prototype.setFocusedIndex=function(i){var $;if(this.aItemDomRefs.length<0){this.iFocusedIndex=-1;return this;}if(i<0){i=0;}if(i>this.aItemDomRefs.length-1){i=this.aItemDomRefs.length-1;}q(this.oDomRef).attr("tabIndex",this.iTabIndex);if(this.iFocusedIndex!==-1&&this.aItemDomRefs.length>this.iFocusedIndex){q(this.aItemDomRefs[this.iFocusedIndex]).attr("tabIndex",-1);$=q(this.aItemDomRefs[this.iFocusedIndex]);if($.data("sap.INRoot")&&i!=this.iFocusedIndex){q($.data("sap.INRoot").aItemDomRefs[$.data("sap.INRoot").iFocusedIndex]).attr("tabIndex",-1);}}this.iFocusedIndex=i;var f=this.aItemDomRefs[this.iFocusedIndex];$=q(this.aItemDomRefs[this.iFocusedIndex]);if(!$.data("sap.INRoot")){q(f).attr("tabIndex",this.iActiveTabIndex);}return this;};I.prototype.getFocusedDomRef=function(){return this.aItemDomRefs[this.iFocusedIndex];};I.prototype.getFocusedIndex=function(){return this.iFocusedIndex;};I.prototype.onfocusin=function(e){var s=e.target;var i=0;if(s==this.oDomRef){if(!this._bItemTabIndex){this.setItemsTabindex();this._bItemTabIndex=true;}if(this._bMouseDownHappened){return;}var a;if(q(this.oDomRef).data("sap.INItem")&&this._sFocusEvent&&!q(this.oDomRef).data("sap.InNavArea")){switch(this._sFocusEvent){case"sapnext":a=0;break;case"sapprevious":a=this.aItemDomRefs.length-1;break;default:if(this.iSelectedIndex!=-1){a=this.iSelectedIndex;}else if(this.iFocusedIndex!=-1){a=this.iFocusedIndex;}else{a=0;}break;}this._sFocusEvent=undefined;}else{if(this.iSelectedIndex!=-1){a=this.iSelectedIndex;}else if(this.iFocusedIndex!=-1){a=this.iFocusedIndex;}else{a=0;}}this.focusItem(a,e);if(this.iFocusedIndex==-1){for(i=a+1;i<this.aItemDomRefs.length;i++){this.focusItem(i,e);if(this.iFocusedIndex==i){break;}}if(this.iFocusedIndex==-1&&a>0){for(i=a-1;i>=0;i--){this.focusItem(i,e);if(this.iFocusedIndex==i){break;}}}}e.preventDefault();e.stopPropagation();}else if(!this.bISetFocus){if(this.aItemDomRefs&&e.target!=this.aItemDomRefs[this.iFocusedIndex]){for(i=0;i<this.aItemDomRefs.length;i++){if(e.target==this.aItemDomRefs[i]){this.focusItem(i,e);break;}}}else{this.fireEvent(I.Events.AfterFocus,{index:this.iFocusedIndex,event:e});}}this.bISetFocus=false;};I.prototype.onsapfocusleave=function(e){if(!e.relatedControlId||!q.sap.containsOrEquals(this.oDomRef,sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){var i;if(this.iSelectedIndex!=-1){i=this.iSelectedIndex;}else if(this.iFocusedIndex!=-1){i=this.iFocusedIndex;}else{i=0;}this.setFocusedIndex(i);var d;if(q(this.oDomRef).data("sap.INItem")){var p;d=q(this.oDomRef);while(!p){d=d.parent();if(d.data("sap.INRoot")){p=d.get(0);}}if(!e.relatedControlId||q.sap.containsOrEquals(p,sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef())){q(this.aItemDomRefs[this.iFocusedIndex]).attr("tabIndex",-1);}}d=q(this.oDomRef);if(d.data("sap.InNavArea")===false){d.data("sap.InNavArea",true);}this.fireEvent(I.Events.FocusLeave,{index:i,event:e});}};I.prototype.onmousedown=function(e){var s=e.target;var c=function(d,o){var f=false;var C=q(d);while(!C.is(":sapFocusable")&&C.get(0)!=o){C=C.parent();}if(C.get(0)!=o){f=true;}return f;};if(q.sap.containsOrEquals(this.oDomRef,s)){for(var i=0;i<this.aItemDomRefs.length;i++){var o=this.aItemDomRefs[i];if(q.sap.containsOrEquals(o,s)){if(!this.bTableMode){this.focusItem(i,e);}else{if(o===s||!c(s,o)){this.focusItem(i,e);}}return;}}if(s==this.oDomRef){this._bMouseDownHappened=true;var t=this;window.setTimeout(function(){t._bMouseDownHappened=false;},20);}}};I.prototype.onsapnext=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(q(this.oDomRef).data("sap.InNavArea")){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=this.iFocusedIndex,f=true,b=false;if(i>-1){if(this.bTableMode){var r=this.aItemDomRefs.length/this.iColumns,R=Math.floor(i/this.iColumns),c=i%this.iColumns;if(e.keyCode==q.sap.KeyCodes.ARROW_DOWN){if(R<r-1){i+=this.iColumns;}}else{if(c<this.iColumns-1){i+=1;}}}else{do{if(this.iColumns>1&&e.keyCode==q.sap.KeyCodes.ARROW_DOWN){if((i+this.iColumns)>=this.aItemDomRefs.length){if(!this.bNoColumnChange){if((i%this.iColumns)<(this.iColumns-1)){i=(i%this.iColumns)+1;}else if(this.bCycling){i=0;}}else{i=this.iFocusedIndex;b=true;}}else{i=i+this.iColumns;}}else{if(i==this.aItemDomRefs.length-1){if(q(this.oDomRef).data("sap.INItem")){return;}else if(this.bCycling){i=0;}else{i=this.iFocusedIndex;b=true;}}else{i++;}}if(i===this.iFocusedIndex){if(f){f=false;}else{throw new Error("ItemNavigation has no visible/existing items and is hence unable to select the next one");}}}while(!this.aItemDomRefs[i]||!q(this.aItemDomRefs[i]).is(":sapFocusable"));}this.focusItem(i,e);if(b){this.fireEvent(I.Events.BorderReached,{index:i,event:e});}e.preventDefault();e.stopPropagation();}};I.prototype.onsapnextmodifiers=function(e){if(this.hasDisabledModifier(e)){return;}this.onsapnext(e);};I.prototype.onsapprevious=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(q(this.oDomRef).data("sap.InNavArea")){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=this.iFocusedIndex,f=true,b=false;var c=0;if(i>-1){if(this.bTableMode){var r=Math.floor(i/this.iColumns);c=i%this.iColumns;if(e.keyCode==q.sap.KeyCodes.ARROW_UP){if(r>0){i-=this.iColumns;}}else{if(c>0){i-=1;}}}else{do{if(this.iColumns>1&&e.keyCode==q.sap.KeyCodes.ARROW_UP){if((i-this.iColumns)<0){if(!this.bNoColumnChange){c=0;if((i%this.iColumns)>0){c=(i%this.iColumns)-1;}else if(this.bCycling){c=Math.min(this.iColumns-1,this.aItemDomRefs.length-1);}if(i===0&&c===0){i=0;}else{var R=Math.ceil(this.aItemDomRefs.length/this.iColumns);i=c+((R-1)*this.iColumns);if(i>=this.aItemDomRefs.length){i=i-this.iColumns;}}}else{i=this.iFocusedIndex;b=true;}}else{i=i-this.iColumns;}}else{if(i==0){if(q(this.oDomRef).data("sap.INItem")){return;}else if(this.bCycling){i=this.aItemDomRefs.length-1;}else{i=this.iFocusedIndex;b=true;}}else{i--;}}if(i==this.iFocusedIndex){if(f){f=false;}else{throw new Error("ItemNavigation has no visible/existing items and is hence unable to select the previous one");}}}while(!this.aItemDomRefs[i]||!q(this.aItemDomRefs[i]).is(":sapFocusable"));}this.focusItem(i,e);if(b){this.fireEvent(I.Events.BorderReached,{index:i,event:e});}e.preventDefault();e.stopPropagation();}};I.prototype.onsappreviousmodifiers=function(e){if(this.hasDisabledModifier(e)){return;}this.onsapprevious(e);};I.prototype.onsappageup=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=0;var b=false;if(this.iPageSize>0){i=this.iFocusedIndex;if(i>-1){i=i-this.iPageSize;while(i>0&&!q(this.aItemDomRefs[i]).is(":sapFocusable")){i--;}if(i<0){if(!this.bNoColumnChange){i=0;}else{i=this.iFocusedIndex;b=true;}}this.focusItem(i,e);}}else if(this.bTableMode){i=this.iFocusedIndex%this.iColumns;this.focusItem(i,e);}if(b){this.fireEvent(I.Events.BorderReached,{index:i,event:e});}e.preventDefault();e.stopPropagation();};I.prototype.onsappagedown=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=0;var b=false;if(this.iPageSize>0){i=this.iFocusedIndex;if(i>-1){i=i+this.iPageSize;while(i<this.aItemDomRefs.length-1&&!q(this.aItemDomRefs[i]).is(":sapFocusable")){i++;}if(i>this.aItemDomRefs.length-1){if(!this.bNoColumnChange){i=this.aItemDomRefs.length-1;}else{i=this.iFocusedIndex;b=true;}}this.focusItem(i,e);}}else if(this.bTableMode){var r=this.aItemDomRefs.length/this.iColumns,c=this.iFocusedIndex%this.iColumns;i=(r-1)*this.iColumns+c;this.focusItem(i,e);}if(b){this.fireEvent(I.Events.BorderReached,{index:i,event:e});}e.preventDefault();e.stopPropagation();};I.prototype.onsaphome=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=0;var r=0;if(this.bTableMode){if(!this.bTableList&&!(e.metaKey||e.ctrlKey)){r=Math.floor(this.iFocusedIndex/this.iColumns);i=r*this.iColumns;}}else{if(!!(e.metaKey||e.ctrlKey)&&!this._bCtrlEnabled){return;}if(this._bStayInRow&&!(this._bCtrlEnabled&&(e.metaKey||e.ctrlKey))&&this.iColumns>0){r=Math.floor(this.iFocusedIndex/this.iColumns);i=r*this.iColumns;}else{while(!this.aItemDomRefs[i]||!q(this.aItemDomRefs[i]).is(":sapFocusable")){i++;if(i==this.aItemDomRefs.length){return;}}}}this.focusItem(i,e);e.preventDefault();e.stopPropagation();};I.prototype.onsaphomemodifiers=function(e){if(this.hasDisabledModifier(e)){return;}this.onsaphome(e);};I.prototype.onsapend=function(e){if(!q.sap.containsOrEquals(this.oDomRef,e.target)){return;}if(this.bTableMode&&this.aItemDomRefs.indexOf(e.target)===-1){return;}var i=this.aItemDomRefs.length-1;var r=0;if(this.bTableMode){if(!this.bTableList&&!(e.metaKey||e.ctrlKey)){r=Math.floor(this.iFocusedIndex/this.iColumns);i=r*this.iColumns+this.iColumns-1;}}else{if(!!(e.metaKey||e.ctrlKey)&&!this._bCtrlEnabled){return;}if(this._bStayInRow&&!(this._bCtrlEnabled&&(e.metaKey||e.ctrlKey))&&this.iColumns>0){r=Math.floor(this.iFocusedIndex/this.iColumns);i=(r+1)*this.iColumns-1;if(i>=this.aItemDomRefs.length){i=this.aItemDomRefs.length-1;}}else{while(!this.aItemDomRefs[i]||!q(this.aItemDomRefs[i]).is(":sapFocusable")){i--;if(i<0){return;}}}}this.focusItem(i,e);e.preventDefault();e.stopPropagation();};I.prototype.onsapendmodifiers=function(e){if(this.hasDisabledModifier(e)){return;}this.onsapend(e);};I.prototype.setTabIndex0=function(){this.iTabIndex=0;this.iActiveTabIndex=0;};I.prototype.onkeyup=function(e){if(e.keyCode==q.sap.KeyCodes.F2){var d=q(this.oDomRef);if(d.data("sap.InNavArea")){d.data("sap.InNavArea",false);}else if(d.data("sap.InNavArea")===false){d.data("sap.InNavArea",true);}e.preventDefault();e.stopPropagation();}};return I;});
