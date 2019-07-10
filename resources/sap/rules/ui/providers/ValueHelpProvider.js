/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

 (c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/m/List','sap/m/PlacementType','sap/m/ResponsivePopover','sap/m/StandardListItem','sap/ui/comp/providers/ValueHelpProvider','sap/ui/model/json/JSONModel'],function(q,L,P,R,S,V,J){"use strict";var b=V.extend("sap.rules.ui.providers.ValueHelpProvider",{constructor:function(p){if(p){this._cursorPosition=p.cursorPosition;this._bReplaceWord=p.bReplaceWord;this._businessDataType=p.businessDataType;this._bAddSpace=p.bAddSpace;}V.apply(this,arguments);this._onInitialise();}});b.prototype._onOK=function(c){var t=c.getParameter("tokens"),r,k,i=0,a=[],o=null;this._onCancel();if(this.oControl instanceof sap.m.MultiInput){this.oControl.setValue("");this.oControl.setTokens(t);i=t.length;while(i--){o=t[i].data("row");if(o){a.push(o);}}}else{if(t[0]){if(this.bIsSingleIntervalRange){r=t[0].data("range");if(r){if(r.operation==="BT"){k=r.value1+"-"+r.value2;}else{k=r.value1;}}}else{k=t[0].getKey();}o=t[0].data("row");if(o){a.push(o);}}this.oControl.setTextOnCursor(k,this._cursorPosition,this._bReplaceWord,this._businessDataType,this._bAddSpace);this.oControl.fireChange({value:k,validated:true});}this._calculateAndSetFilterOutputData(a);};b.prototype._onInitialise=function(c){V.prototype._onInitialise.apply(this,[c]);var e=this.oControl;if(e instanceof sap.rules.ui.DecisionTableCellExpressionAdvanced){var p=e.getParent();e.setBusy(true);p.setModal(true);}};b.prototype._onCancel=function(c){V.prototype._onCancel.apply(this,[c]);var e=this.oControl;if(e instanceof sap.rules.ui.DecisionTableCellExpressionAdvanced){var p=e.getParent();p.setModal(false);e.setBusy(false);}};b.prototype._createAdditionalValueHelpControls=function(){V.prototype._createAdditionalValueHelpControls.call(this);this.oSmartFilterBar.setExpandAdvancedArea(false);};b.prototype._onValueHelpDialogRequired=function(a){V.prototype._onValueHelpDialogRequired.call(this,a);this.oValueHelpDialog.setDescriptionKey(null);var t=this.oValueHelpDialog.getTable();var c=t.getColumns();for(var i=0;i<c.length;i++){c[i].setWidth("auto");}};return b;},true);
