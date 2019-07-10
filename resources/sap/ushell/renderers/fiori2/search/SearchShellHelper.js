(function(){"use strict";jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchFieldGroup');var S=sap.ushell.renderers.fiori2.search.controls.SearchFieldGroup;jQuery.sap.require("sap.ushell.renderers.fiori2.search.SearchModel");jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchShellHelper');var m=sap.ushell.renderers.fiori2.search.SearchShellHelper={};jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchHelper');var s=sap.ushell.renderers.fiori2.search.SearchHelper;jQuery.extend(m,{init:function(){var t=this;sap.ushell.Container.getService("Search")._getCatalogTiles();t.oModel=sap.ushell.renderers.fiori2.search.getModelSingleton();t.oShellHeader=sap.ui.getCore().byId('shell-header');t.oSearchFieldGroup=new S("searchFieldInShell");t.oSearchFieldGroup.setModel(t.oModel);t.oShellHeader.setSearch(t.oSearchFieldGroup);t.setSearchState('COL');this.setSearchState=s.delayedExecution(this.setSearchState,300);t.oSearchInput=t.oSearchFieldGroup.input;t.oSearchInput.setValue(t.oModel.getSearchBoxTerm());t.oSearchSelect=t.oSearchFieldGroup.select;var l=new sap.ui.core.InvisibleText("selectLabel",{text:sap.ushell.resources.i18n.getText("searchIn")});if(l){t.oSearchSelect.addAriaLabelledBy("selectLabel");}t.oSearchSelect.setTooltip(sap.ushell.resources.i18n.getText("searchInTooltip"));t.oSearchSelect.addEventDelegate({onAfterRendering:function(e){jQuery('#searchFieldInShell-select-icon').attr('title',sap.ushell.resources.i18n.getText("searchIn"));}},t.oSearchSelect);t.oSearchSelect.setTooltip(sap.ushell.resources.i18n.getText("searchIn"));t.oSearchSelect.attachChange(function(){t.focusInputField();});t.oSearchButton=t.oSearchFieldGroup.button;t.oSearchButton.bindProperty("type",{parts:[{path:'/searchButtonStatus'}],formatter:function(a){if(a==='search'){return sap.m.ButtonType.Emphasized;}else{return sap.m.ButtonType.Default;}}});t.oSearchButton.attachPress(function(){t.handleClickSearchButton();});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var a=jQuery("div.sapUshellShellSearchHidden").length===0;var b=t.oModel.getProperty("/searchButtonStatus")==="close";var $=jQuery(t.oSearchButton.getDomRef());if(a){if(b){$.attr("aria-pressed",true);}else{$.removeAttr("aria-pressed");}}else{$.attr("aria-pressed",false);}}});t.oSearchCancelButton=t.oSearchFieldGroup.cancelButton;t.oSearchCancelButton.attachPress(function(){t.setSearchState('COL');window.setTimeout(function(){sap.ui.getCore().byId('sf').focus();},1000);});this.oSearchFieldGroup.setCancelButtonActive(false);t.registerFocusHandler();jQuery(document).on('keydown',function(e){if(e.keyCode===27){e.preventDefault();if(s.isSearchAppActive()){return;}if(t.oSearchInput){if(t.oSearchInput.getValue()===""){t.setSearchState('COL');}else if(t.oSearchInput.getValue()===" "){t.oSearchInput.setValue("");}}}});sap.ui.getCore().getEventBus().subscribe("allSearchFinished",t.onAllSearchFinished,t);sap.ui.getCore().byId('viewPortContainer').attachAfterNavigate(t.onAfterNavigate,t);sap.ui.getCore().getEventBus().subscribe("sap.ushell","appComponentLoaded",function(){var o=sap.ui.getCore().byId('searchContainerResultsView');if(o&&o.oFocusHandler){o.oFocusHandler.setFocus();}});t.oShellHeader.attachSearchSizeChanged(this.sizeSearchFieldChanged.bind(this));},sizeSearchFieldChanged:function(e){var a=e.mParameters.remSize;var l=20;if(a<=l){this.oSearchSelect.setDisplayMode('icon');}else{this.oSearchSelect.setDisplayMode('default');}l=9;if(a<l){this.oSearchButton.setVisible(false);}else{this.oSearchButton.setVisible(true);}if(e.getParameter('isFullWidth')){this.oSearchFieldGroup.setCancelButtonActive(true);this.oSearchFieldGroup.addStyleClass('sapUshellSearchInputFullWidth');}else{this.oSearchFieldGroup.setCancelButtonActive(false);this.oSearchFieldGroup.removeStyleClass('sapUshellSearchInputFullWidth');}},sizeChanged:function(p){switch(p.name){case"Phone":this.oSearchFieldGroup.setCancelButtonActive(true);break;case"Tablet":this.oSearchFieldGroup.setCancelButtonActive(false);break;case"Desktop":this.oSearchFieldGroup.setCancelButtonActive(false);break;default:break;}},makeDelayed:function(f){return s.delayedExecution(f,0);},registerFocusHandler:function(){var r=true;if(!r){return;}var t=this;var a=t.oSearchInput.getModel();t.oSearchInput.addEventDelegate({onAfterRendering:function(){var i=jQuery(t.oSearchInput.getDomRef()).find('input')[0];var $=jQuery(i);$.on('focus',function(e){t.log('raw_in',document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState('EXP');});$.on('blur',t.makeDelayed(function(e){t.log('raw_out',document.activeElement);if(!t.isFocusHandlerActive){return;}if(t.isInSearchBox(document.activeElement)){return;}if(!s.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&a.getDataSource().equals(a.getDefaultDataSource())){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}}));}});t.oSearchSelect.addEventDelegate({onAfterRendering:function(){var d=t.oSearchSelect.getDomRef();d.addEventListener('focus',function(e){t.log('raw_in_select',document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState.abort();});d.addEventListener('blur',t.makeDelayed(function(e){t.log('raw_out_select',document.activeElement);if(!t.isFocusHandlerActive){return;}if(t.isInSearchBox(document.activeElement)){return;}if(t.oSearchInput.getValue().length===0&&a.getDataSource().equals(a.getDefaultDataSource())){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}}));}});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var d=t.oSearchButton.getDomRef();d.addEventListener('focus',function(e){t.log('raw_in_button',document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState.abort();});d.addEventListener('blur',t.makeDelayed(function(e){t.log('raw_out_button',document.activeElement);if(!t.isFocusHandlerActive){return;}if(t.isInSearchBox(document.activeElement)){return;}if(t.oSearchInput.getValue().length===0&&a.getDataSource().equals(a.getDefaultDataSource())){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}}));}});this.enableFocusHandler(true);},isInSearchBox:function(e){if(!e){return false;}var a=['searchFieldInShell'];var c=['sapMPopoverCont'];while(e){if(e.getAttribute){var b=e.getAttribute('id');if(b){for(var j=0;j<a.length;++j){var d=a[j];if(b.indexOf(d)>=0){return true;}}}for(var i=0;i<c.length;++i){var f=c[i];if(e.classList.contains(f)){return true;}}}e=e.parentNode;}return false;},enableFocusHandler:function(a){this.isFocusHandlerActive=a;if(!a&&this.setSearchState.abort){this.setSearchState.abort();}},setSearchState:function(a,b){if(sap.ui.getCore().byId('searchFieldInShell')===undefined){return;}if(this.oShellHeader.getSearchState()===a){return;}if(a==='COL'){this.enableFocusHandler(false);}else{this.enableFocusHandler(true);}this.log('set search state',a,document.activeElement);switch(a){case'COL':this.oModel.abortSuggestions();this.oShellHeader.setSearchState(a,35);this.oSearchCancelButton.setVisible(false);sap.ui.getCore().byId('sf').setVisible(true);break;case'EXP_S':this.oModel.abortSuggestions();this.oShellHeader.setSearchState(a,35);this.oSearchCancelButton.setVisible(true);sap.ui.getCore().byId('sf').setVisible(false);break;case'EXP':var w=!s.isSearchAppActive()||this.oModel.getProperty("/boCount")>0||this.oModel.getProperty("/appCount")>0;this.oShellHeader.setSearchState(a,35,w);this.oSearchCancelButton.setVisible(true);sap.ui.getCore().byId('sf').setVisible(false);if(!b){this.focusInputField();}break;default:break;}},onShellSearchButtonPressed:function(e){if(sap.ui.getCore().byId('searchFieldInShell')===undefined){this.init();}else if(!s.isSearchAppActive()){this.resetModel();}this.setSearchState('EXP');},handleClickSearchButton:function(){if(this.oSearchInput.getValue()===""&&this.oModel.getDataSource().equals(this.oModel.getDefaultDataSource())){this.setSearchState('COL');window.setTimeout(function(){sap.ui.getCore().byId('sf').focus();},1000);}},focusInputField:function(){var t=this;if(t.focusInputFieldTimeout){window.clearTimeout(t.focusInputFieldTimeout);t.focusInputFieldTimeout=null;}var d=function(r){if(sap.ushell.renderers.fiori2.search.SearchHelper.isSearchAppActive()||!t.oSearchInput){return;}t.focusInputFieldTimeout=null;var a=t.oSearchInput.getDomRef();if(a&&jQuery(a).is(':visible')&&!sap.ui.getCore().getUIDirty()){if(t.oSearchInput.getEnabled()){t.oSearchInput.focus();return;}else if(t.oSearchButton.getEnabled()){var b=t.oSearchButton.getDomRef();if(b&&jQuery(b).is(':visible')){t.oSearchButton.focus();return;}}}if(r>0){t.focusInputFieldTimeout=window.setTimeout(function(){d(--r);},100);}};d(5);},getDefaultOpen:function(){return this.defaultOpen;},setDefaultOpen:function(d){this.defaultOpen=d;},getSearchInput:function(){return this.oSearchFieldGroup.input;},onAfterNavigate:function(e){if(e.getParameter('toId')!=='shellPage-Action-search'&&e.getParameter('toId')!=='applicationShellPage-Action-search'){return;}var o=sap.ui.getCore().byId('searchContainerResultsView');if(o&&o.oFocusHandler){o.oFocusHandler.setFocus();}sap.ui.getCore().getEventBus().publish("searchLayoutChanged");},onAllSearchFinished:function(){this.oSearchInput.setValue(this.oModel.getSearchBoxTerm());this.log('search finished');this.setSearchState('EXP_S');},resetModel:function(){this.oSearchInput.setValue('');this.oModel.resetQuery();},logSwitch:false,log:function(){if(!this.logSwitch){return;}var l=function(e){var c=e.getAttribute('id');if(c){return c;}else{return'unknown_id';}};var a=function(e){var r=[];for(var i=0;i<e.classList.length;++i){r.push(e.classList.item(i));}return r.join(',');};var p=['--'];for(var i=0;i<arguments.length;++i){var b=arguments[i];if(b&&b.getAttribute){p.push(l(b)+','+a(b));continue;}if(b){p.push(b);continue;}p.push('undef');}}});})();
