// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell_abap.adapters.abap.SearchAdapter");jQuery.sap.require("sap.ushell.renderers.fiori2.search.esh.api.release.sina");jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchConfiguration');var S=sap.ushell.renderers.fiori2.search.SearchConfiguration;sap.ushell_abap.adapters.abap.SearchAdapter=function(s){if(!this.isSearchRegistered){var c=new S.getInstance();this.sina=c.getSina();this.isSearchRegistered=true;}this.getSina=function(){return this.sina;};};}());
