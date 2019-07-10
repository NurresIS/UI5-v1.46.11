/*!
 * ${copyright}
 */
sap.ui.define(['sap/ushell/library','sap/ushell/resources','sap/ushell/ui/launchpad/ActionItem'],function(l,r,A){"use strict";var L=A.extend("sap.ushell.ui.footerbar.LogoutButton",{metadata:{library:"sap.ushell"}});L.prototype.init=function(){if(A.prototype.init){A.prototype.init.apply(this,arguments);}this.setIcon('sap-icon://log');this.setTooltip(r.i18n.getText("signoutBtn_tooltip"));this.setText(r.i18n.getText("signoutBtn_title"));this.attachPress(this.logout);this.setEnabled();};L.prototype.logout=function(){sap.ui.require(['sap/m/MessageBox'],function(M){var s=true,i=false,o,a=new sap.ushell.ui.launchpad.LoadingDialog({text:""});sap.ushell.Container.getGlobalDirty().done(function(d){s=false;if(i===true){a.exit();a=new sap.ushell.ui.launchpad.LoadingDialog({text:""});}var _=function(d){var o={},R=r.i18n;if(d===sap.ushell.Container.DirtyState.DIRTY){o.message=R.getText('unsaved_data_warning_popup_message');o.icon=sap.m.MessageBox.Icon.WARNING;o.messageTitle=R.getText("unsaved_data_warning_popup_title");}else{o.message=R.getText('signoutConfirmationMsg');o.icon=sap.m.MessageBox.Icon.QUESTION;o.messageTitle=R.getText("signoutMsgTitle");}return o;};o=_(d);sap.m.MessageBox.show(o.message,o.icon,o.messageTitle,[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],function(b){if(b===sap.m.MessageBox.Action.OK){a.openLoadingScreen();a.showAppInfo(r.i18n.getText('beforeLogoutMsg'),null);sap.ushell.Container.logout();}},sap.ui.core.ElementMetadata.uid("confirm"));});if(s===true){a.openLoadingScreen();i=true;}}.bind(this));};L.prototype.setEnabled=function(e){if(!sap.ushell.Container){if(this.getEnabled()){jQuery.sap.log.warning("Disabling 'Logout' button: unified shell container not initialized",null,"sap.ushell.ui.footerbar.LogoutButton");}e=false;}A.prototype.setEnabled.call(this,e);};return L;});
