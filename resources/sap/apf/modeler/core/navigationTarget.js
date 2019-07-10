/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2015 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.modeler.core.navigationTarget");(function(){'use strict';sap.apf.modeler.core.NavigationTarget=function(n,i,d){var s,a,b=false,r,t;if(d){s=d.semObject;a=d.actn;b=d.isStepSpecific;r=d.requestForFilterMapping;t=d.targetPropertiesForFilterMapping;}else{r={};t=new i.constructors.ElementContainer("TargetPropertyForFilterMapping",undefined,i);}this.getId=function(){return n;};this.setSemanticObject=function(c){s=c;};this.getSemanticObject=function(){return s;};this.setAction=function(c){a=c;};this.getAction=function(){return a;};this.isGlobal=function(){return!b;};this.isStepSpecific=function(){return b;};this.setGlobal=function(){b=false;};this.setStepSpecific=function(){b=true;};this.setFilterMappingService=function(c){r.service=c;};this.getFilterMappingService=function(){return r.service;};this.setFilterMappingEntitySet=function(e){r.entitySet=e;};this.getFilterMappingEntitySet=function(){return r.entitySet;};this.addFilterMappingTargetProperty=function(p){t.createElementWithProposedId(undefined,p);};this.getFilterMappingTargetProperties=function(){var p=[];var c=t.getElements();c.forEach(function(e){p.push(e.getId());});return p;};this.removeFilterMappingTargetProperty=function(p){t.removeElement(p);};this.copy=function(c){var e={semObject:s,actn:a,isStepSpecific:b,requestForFilterMapping:r,targetPropertiesForFilterMapping:t};var d=sap.apf.modeler.core.ConfigurationObjects.deepDataCopy(e);return new sap.apf.modeler.core.NavigationTarget((c||this.getId()),i,d);};};}());
