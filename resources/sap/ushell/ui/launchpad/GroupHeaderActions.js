/*!
 * ${copyright}
 */
sap.ui.define(['sap/ui/core/Control','sap/ushell/library'],function(C,l){"use strict";var G=C.extend("sap.ushell.ui.launchpad.GroupHeaderActions",{metadata:{library:"sap.ushell",properties:{isOverflow:{type:"boolean",group:"Misc",defaultValue:false},tileActionModeActive:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},overflowCtrl:{type:"sap.ui.core.Control",multiple:true,singularName:"overflowCtrl"}},events:{afterRendering:{}}}});G.prototype.onAfterRendering=function(){this.fireAfterRendering();};G.prototype._getActionOverflowControll=function(){var t=this;return[new sap.m.Button({icon:'sap-icon://overflow',type:'Transparent',press:function(e){var a=new sap.m.ActionSheet({placement:sap.m.PlacementType.Auto});t.getContent().forEach(function(b){var c=b.clone();c.setModel(b.getModel());c.setBindingContext(b.getBindingContext());a.addButton(c);});a.openBy(e.getSource());}}).addStyleClass('sapUshellHeaderActionButton')];};return G;});
