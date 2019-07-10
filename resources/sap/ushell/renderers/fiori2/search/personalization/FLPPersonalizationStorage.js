(function(){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.personalization.FLPPersonalizationStorage');jQuery.sap.require('sap.ushell.renderers.fiori2.search.personalization.Personalizer');jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchHelper');var P=sap.ushell.renderers.fiori2.search.personalization.Personalizer;var S=sap.ushell.renderers.fiori2.search.SearchHelper;var m=sap.ushell.renderers.fiori2.search.personalization.FLPPersonalizationStorage=function(){this.init.apply(this,arguments);};var F=m;m.prototype={init:function(c){this.container=c;this.save=S.delayedExecution(this.save,2000);},save:function(){this.container.save();},getItem:function(k){k=this.limitLength(k);if(!this._isStorageSupported()){throw'not supported storage';}return this.container.getItemValue(k);},setItem:function(k,d){k=this.limitLength(k);if(!this._isStorageSupported()){throw'not supported storage';}this.container.setItemValue(k,d);this.save();},limitLength:function(k){return k.slice(-40);},getPersonalizer:function(k){return new P(k,this);},_isStorageSupported:function(){if(jQuery.sap.storage&&jQuery.sap.storage.isSupported()){return true;}else{return false;}}};m.getInstance=function(){var p=sap.ushell.Container.getService("Personalization");return p.getContainer("ushellSearchPersoServiceContainer").then(function(c){return new F(c);});};})();
