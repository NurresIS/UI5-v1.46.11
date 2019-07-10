/*!
 * ${copyright}
 */
sap.ui.define(['sap/m/Button','sap/m/Dialog','sap/m/Bar','sap/m/Text','sap/m/List','sap/ushell/library','sap/ushell/resources','sap/ushell/services/Container','sap/ushell/ui/launchpad/AccessibilityCustomData','sap/ushell/ui/launchpad/ActionItem','sap/m/DisplayListItem','sap/ui/layout/VerticalLayout','sap/m/ObjectIdentifier'],function(B,D,a,T,L,l,r,C,A,b,c,V,O){"use strict";var U=b.extend("sap.ushell.ui.footerbar.UserPreferencesButton",{metadata:{library:"sap.ushell"}});U.prototype.init=function(){if(b.prototype.init){b.prototype.init.apply(this,arguments);}this.setIcon('sap-icon://person-placeholder');this.translationBundle=r.i18n;this.setText(this.translationBundle.getText("userSettings"));this.setTooltip(this.translationBundle.getText("settings_tooltip"));this.attachPress(this.showUserPreferencesDialog);};U.prototype.createDialog=function(){var s,d,t=this;s=this._createSaveButton();d=this._createCancelButton();this.oDialog=new D({id:"userPreferencesDialog",title:"{/userPreferences/dialogTitle}",contentWidth:"29.6rem",content:null,contentHeight:"17rem",buttons:[s,d],afterClose:function(){this._destroyDialog();this.oUser.resetChangedProperties();}.bind(t),stretch:sap.ui.Device.system.phone}).addStyleClass("sapUshellUserPreferencesDialog");this._addDialogBackButton();this.oDialog.setModel(this.getModel());this.oDialog.addCustomData(new A({key:"aria-label",value:t.translationBundle.getText("Settings_Dialog_Main_label"),writeToDom:true}));this.oDialog.addContent(this._getOriginalDialogContent());};U.prototype._getOriginalDialogContent=function(){if(!this.oInitialContent){var u,e;u=this._getUserDetailsControl();e=this._getEntryListControl();this.oInitialContent=new V('userPreferencesLayout',{content:[u,e],width:"100%"});}return this.oInitialContent;};U.prototype._getEntryListControl=function(){var e=this._getUserPrefEntriesTemplate(),x=this.getModel()&&this.getModel().getProperty('/enableHelp'),t=this,i,u=this.oUser.getFullName(),o,d=new L('userPrefEnteryList',{items:{path:"/userPreferences/entries",template:e}});d.addCustomData(new A({key:"aria-label",value:t.translationBundle.getText("Settings_EntryList_label")+u,writeToDom:true}));o=d.onAfterRendering;d.onAfterRendering=function(){var E=this.getItems(),f;o.apply(this,arguments);for(i=0;i<E.length;i++){f=E[i].getBindingContext().getPath();if(!t.getModel().getProperty(f+"/valueResult")){t._setEntryValueResult(f);}if(x){t._addXRayHelpId(f,E[i]);}}};return d;};U.prototype._addXRayHelpId=function(e,o){var h=this.getModel().getProperty(e+"/entryHelpID");if(h){o.addStyleClass("help-id-"+h);}};U.prototype._setEntryValueResult=function(e){var t=this;var i=this.getModel().getProperty(e+"/editable");var v=this.getModel().getProperty(e+"/valueArgument");if(typeof v==="function"){this.getModel().setProperty(e+"/valueResult",this.translationBundle.getText("genericLoading"));this.getModel().setProperty(e+"/editable",false);var o=v();o.done(function(d){t.getModel().setProperty(e+"/editable",i);t.getModel().setProperty(e+"/visible",typeof(d)==='object'?!!d.value:true);t.getModel().setProperty(e+"/valueResult",typeof(d)==='object'?d.displayText:d);});o.fail(function(){t.getModel().setProperty(e+"/valueResult",t.translationBundle.getText("loadingErrorMessage"));});}else if(!!v){this.getModel().setProperty(e+"/valueResult",v);this.getModel().setProperty(e+"/editable",i);}else{this.getModel().setProperty(e+"/valueResult",this.translationBundle.getText("loadingErrorMessage"));}};U.prototype._getUserPrefEntriesTemplate=function(){var t=this,i,p=function(e){var E={};E=jQuery.extend(true,{},{},e);sap.ui.require(['sap/m/FlexBox','sap/m/FlexAlignItems','sap/m/FlexJustifyContent','sap/m/BusyIndicator'],function(F,d,f,g){var h=true,o,j=E.getSource().getLabel(),k=E.getSource().getBindingContext().getPath();t.getModel().setProperty("/userPreferences/activeEntryPath",k);t._setDetailedEntryModeMode(true,k,j,k);t.oDialog.removeAllContent();o=t.getModel().getProperty(k+"/contentResult");if(o){t.oDialog.addContent(o);}else{var m=null,n,s=true,I=false,q=t.getModel().getProperty(k+"/contentFunc");if(typeof q==="function"){t.getModel().setProperty(k+"/isDirty",true);n=q();n.done(function(u){s=false;if(I===true){t.oDialog.removeAllContent();m.destroy();}if(u instanceof sap.ui.core.Control){t.getModel().setProperty(k+"/contentResult",u);t.oDialog.addContent(u);}else{h=false;}});n.fail(function(){s=false;if(I===true){t.oDialog.removeAllContent();m.destroy();}h=false;});n.always(function(){if(h===false){var u=new F("userPrefErrorFlexBox",{height:"5rem",alignItems:d.Center,justifyContent:f.Center,items:[new T("userPrefErrorText",{text:t.translationBundle.getText("loadingErrorMessage")})]});t.getModel().setProperty(k+"/contentResult",u);t.oDialog.addContent(u);}});if(s===true){m=new g('userPrefLoadingBusyIndicator',{size:"2rem"});t.oDialog.addContent(m);I=true;}}}});};i=new c({label:"{title}",value:"{valueResult}",tooltip:{path:"valueResult",formatter:function(v){return typeof(v)==='string'?v:"";}},type:{path:"editable",formatter:function(e){return(e===true)?"Navigation":"Inactive";}},visible:{path:"visible",formatter:function(v){return(v!==undefined)?v:true;}},press:p,customData:new A({key:"aria-label",value:{parts:[{path:'title'},{path:'valueResult'}],formatter:function(s,v){v=v?v:"";return s+" "+v;}},writeToDom:true})});return i;};U.prototype._getUserDetailsControl=function(){return new O({title:this.oUser.getFullName(),text:this.oUser.getEmail()}).addStyleClass("sapUshellUserPrefUserIdentifier");};U.prototype._createCancelButton=function(){var t=this;return new B({id:"cancelButton",text:{parts:['/userPreferences/entries'],formatter:function(e){var E=e.some(function(o){return o.editable;});return E>0?t.translationBundle.getText("cancelBtn"):t.translationBundle.getText("close");}},press:t._dialogCancelButtonHandler.bind(t),visible:true});};U.prototype._createSaveButton=function(){var t=this;return new B({id:"saveButton",text:this.translationBundle.getText("saveBtn"),press:t._dialogSaveButtonHandler.bind(t),visible:{parts:['/userPreferences/entries'],formatter:function(e){return e.some(function(E){return E.editable;});}}});};U.prototype._setDetailedEntryModeMode=function(i,e,d,f){this.getModel().setProperty("/userPreferences/isDetailedEntryMode",!!i);this.getModel().setProperty("/userPreferences/dialogTitle",d);};U.prototype.showUserPreferencesDialog=function(){this.oUser=sap.ushell.Container.getUser();this.createDialog();this.oDialog.open();};U.prototype._dialogBackButtonHandler=function(e){sap.ui.require(['sap/ui/layout/VerticalLayout'],function(V){this.getModel().setProperty("/userPreferences/isDetailedEntryMode",false);this.getModel().setProperty("/userPreferences/dialogTitle",this.translationBundle.getText("userSettings"));this.oDialog.removeAllContent();this.oDialog.addContent(this._getOriginalDialogContent());this._setEntryValueResult(this.getModel().getProperty("/userPreferences/activeEntryPath"));this.getModel().setProperty("/userPreferences/activeEntryPath",null);});};U.prototype._destroyDialog=function(){this.oHeadBar.destroy();this.oInitialContent.destroy();this.oInitialContent=null;this._modelCleanUpToInitial();this._entriesCleanUp();this.oDialog.destroy();};U.prototype._entriesCleanUp=function(){var i,e=this.getModel().getProperty("/userPreferences/entries");for(i=0;i<e.length;i++){if(e[i].contentResult){e[i].contentResult.destroy();e[i].contentResult=null;}e[i].isDirty=false;e[i].valueResult=null;}this.getModel().setProperty("/userPreferences/entries",e);};U.prototype._modelCleanUpToInitial=function(){this.getModel().setProperty("/userPreferences/isDetailedEntryMode",false);this.getModel().setProperty("/userPreferences/dialogTitle",this.translationBundle.getText("userSettings"));};U.prototype._dialogSaveButtonHandler=function(){var t=this,i,s=this._saveUserPrefEntries();i=this.getModel().getProperty("/userPreferences/isDetailedEntryMode");if(i){this.getModel().setProperty("/userPreferences/activeEntryPath",null);}s.done(function(){t._showSaveMessageToast();});s.fail(function(f){sap.ui.require(['sap/m/MessageBox'],function(M){var e,d="";if(f.length===1){e=t.translationBundle.getText("savingEntryError")+" ";}else{e=t.translationBundle.getText("savingEntriesError")+"\n";}f.forEach(function(g){e+=g.entry+"\n";d+="Entry: "+g.entry+" - Error message: "+g.message+"\n";});M.show(e,{icon:M.Icon.ERROR,title:t.translationBundle.getText("Error"),actions:[M.Action.OK]});jQuery.sap.log.error("Failed to save the following entries",d,"sap.ushell.ui.footerbar.UserPreferencesButton");});});this.oDialog.close();this._destroyDialog();};U.prototype._dialogCancelButtonHandler=function(){var i,e=this.getModel().getProperty("/userPreferences/entries");for(i=0;i<e.length;i++){if(e[i]&&e[i].onCancel){e[i].onCancel();}}this.oDialog.close();this._destroyDialog();};U.prototype._saveUserPrefEntries=function(){var e=this.getModel().getProperty("/userPreferences/entries");var d=jQuery.Deferred();var w;var f;var t=0;var g=0;var s=0;var p=[];var h=[];var j;var k=function(){s++;d.notify();};var m=function(n){h.push({entry:j,message:n});g++;d.notify();};for(var i=0;i<e.length;i++){if(e[i]&&e[i].isDirty===true){f=e[i].onSave();f.done(k);j=e[i].title;f.fail(m);p.push(f);t++;}}w=jQuery.when.apply(null,p);w.done(function(){d.resolve();});d.progress(function(){if(g>0&&(g+s===t)){d.reject(h);}});return d.promise();};U.prototype._addDialogBackButton=function(){var t=this;var o=new B('userPrefBackBtn',{visible:"{/userPreferences/isDetailedEntryMode}",icon:sap.ui.core.IconPool.getIconURI("nav-back"),press:t._dialogBackButtonHandler.bind(t),tooltip:this.translationBundle.getText("feedbackGoBackBtn_tooltip")});var d=new T("userPrefTitle",{text:"{/userPreferences/dialogTitle}"});this.oHeadBar=new a({contentLeft:[o],contentMiddle:[d]});this.oDialog.setCustomHeader(this.oHeadBar);};U.prototype._showSaveMessageToast=function(){sap.ui.require(['sap/m/MessageToast'],function(M){var m=this.translationBundle.getText("savedChanges");M.show(m,{duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:window,offset:"0 -50",collision:"fit fit"});});};return U;},true);
