// @copyright@
sap.ui.define([],function(){"use strict";var U=function(c){this._oComponent=c;};U.onBeforeApplicationInstanceCreated=function(){sap.ui.require(["sap/ushell/Fiori20AdapterTest"],function(){});};U.prototype.getInstance=function(){return this._oComponent;};U.prototype.getMetadata=function(){return this._oComponent.getMetadata();};return U;});
