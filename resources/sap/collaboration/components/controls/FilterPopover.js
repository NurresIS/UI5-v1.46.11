/*
* ! @copyright@
*/
sap.ui.define(['jquery.sap.global','sap/ui/core/Control'],function(q,C){"use strict";var F=C.extend("sap.collaboration.components.controls.FilterPopover",{metadata:{interfaces:[],library:"sap.collaboration.components.controls.FilterPopover",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},},events:{selectionChange:{parameters:{listItem:{type:"sap.m.ListItemBase"},}},},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",bindable:"bindable"},}}});F.prototype.init=function(){this._oList=new sap.m.List(this.getId()+"-list",{mode:sap.m.ListMode.SingleSelectMaster,includeItemInSelection:true,selectionChange:[this._selectionChange,this]});this._oResponsivePop=new sap.m.ResponsivePopover(this.getId()+"-popover",{placement:sap.m.PlacementType.Auto,contentWidth:"15rem",content:[this._oList]});};F.prototype.exit=function(){this._oList=null;if(this._oResponsivePop){this._oResponsivePop.destroy();this._oResponsivePop=null;}};F.prototype.openBy=function(c){this._oResponsivePop.openBy(c);return this;};F.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oResponsivePop.setTitle(t);return this;};F.prototype.setNoDataText=function(n){this.setProperty("noDataText",n,true);this._oList.setNoDataText(n);return this;};F.prototype.setSelectedItem=function(l){this._oList.setSelectedItem(l);return this;};F.prototype.getSelectedItem=function(){return this._oList.getSelectedItem();};F.prototype._setModel=F.prototype.setModel;F.prototype.setModel=function(m,M){var a=Array.prototype.slice.call(arguments);this._oResponsivePop.setModel(m,M);F.prototype._setModel.apply(this,a);return this;};F.prototype.bindAggregation=function(){var a=Array.prototype.slice.call(arguments);this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(a));return this;};F.prototype.validateAggregation=function(a,o,m){return this._callMethodInManagedObject("validateAggregation",a,o,m);};F.prototype.setAggregation=function(a,o,s){this._callMethodInManagedObject("setAggregation",a,o,s);return this;};F.prototype.getAggregation=function(a,d){return this._callMethodInManagedObject("getAggregation",a,d);};F.prototype.indexOfAggregation=function(a,o){return this._callMethodInManagedObject("indexOfAggregation",a,o);};F.prototype.insertAggregation=function(a,o,i,s){this._callMethodInManagedObject("insertAggregation",a,o,i,s);return this;};F.prototype.addAggregation=function(a,o,s){this._callMethodInManagedObject("addAggregation",a,o,s);return this;};F.prototype.removeAggregation=function(a,o,s){this._callMethodInManagedObject("removeAggregation",a,o,s);return this;};F.prototype.removeAllAggregation=function(a,s){return this._callMethodInManagedObject("removeAllAggregation",a,s);};F.prototype.destroyAggregation=function(a,s){this._callMethodInManagedObject("destroyAggregation",a,s);return this;};F.prototype._callMethodInManagedObject=function(f,a){var A=Array.prototype.slice.call(arguments);if(a==="items"){return this._oList[f].apply(this._oList,A.slice(1));}else{return sap.ui.base.ManagedObject.prototype[f].apply(this,A.slice(1));}};F.prototype._selectionChange=function(c){this._oResponsivePop.close();var s=c.getParameter("listItem");this.fireSelectionChange({listItem:s});};return F;},true);