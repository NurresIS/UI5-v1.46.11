/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/command/FlexCommand'],function(F){"use strict";var C=F.extend("sap.ui.rta.command.Combine",{metadata:{library:"sap.ui.rta",properties:{source:{type:"any"},combineFields:{type:"any[]"}},associations:{},events:{}}});C.prototype._getChangeSpecificData=function(){var f=[];this.getCombineFields().forEach(function(o){f.push(o.getId());});var s={changeType:this.getChangeType(),sourceControlId:this.getSource().getId(),combineFieldIds:f};return s;};return C;},true);