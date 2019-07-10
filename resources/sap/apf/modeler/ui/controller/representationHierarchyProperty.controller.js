/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.require("sap.apf.modeler.ui.utils.textManipulator");sap.ui.define(["sap/apf/modeler/ui/controller/propertyType"],function(B){"use strict";var t=new sap.apf.modeler.ui.utils.TextManipulator();return B.extend("sap.apf.modeler.ui.controller.representationHierarchyProperty",{onBeforeRendering:function(){var c=this;if(c.byId("idLabelDisplayOptionType")){c.byId("idLabelDisplayOptionType").destroy();}c.byId("idPropertyTypeLayout").setSpan("L4 M4 S4");c.byId("idPropertyType").setEnabled(false);},getAllPropertiesAsPromise:function(){var c=this,s,p,h=[];var S=c.oStepPropertyMetadataHandler.oStep;var d=jQuery.Deferred();S.getConsumablePropertiesForRepresentation(c.oRepresentation.getId()).done(function(r){r.available.forEach(function(P){if(P===c.oStepPropertyMetadataHandler.getHierarchicalProperty()){h.push(P);}});s=c.getSelectedProperty();if(s!==undefined){p=h.indexOf(s)!==-1?h:h.concat(s);if(r.available.indexOf(s)!==-1){h=p;s=s;}else{h=h.concat(t.addPrefixText([s],sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));s=t.addPrefixText([s],sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE)[0];}}d.resolve({aAllProperties:h,sSelectedKey:s});});return d.promise();},getPropertyTextLabelKey:function(){var c=this;return c.oRepresentation.getHierarchyPropertyTextLabelKey();},setPropertyTextLabelKey:function(p,l){var c=this;c.oRepresentation.setHierarchyPropertyTextLabelKey(l);},setNextPropertyInParentObject:function(){return;},removeAddedProperty:function(){return;},addRemovedProperty:function(){return;},removePropertyFromParentObject:function(){return;},setFocusOnRemoveIcons:function(){return;}});});