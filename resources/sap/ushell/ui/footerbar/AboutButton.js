/*!
 * ${copyright}
 */
sap.ui.define(['sap/m/Button','sap/m/Dialog','sap/m/ObjectHeader','sap/m/VBox','sap/ui/layout/form/SimpleForm','sap/ushell/library','sap/ushell/resources','sap/ushell/ui/launchpad/ActionItem','sap/ushell/services/AppConfiguration','sap/m/Label','sap/m/Text'],function(B,D,O,V,S,l,r,A,a,L,T){"use strict";var b=A.extend("sap.ushell.ui.footerbar.AboutButton",{metadata:{library:"sap.ushell"}});b.prototype.init=function(){if(A.prototype.init){A.prototype.init.apply(this,arguments);}this.setIcon('sap-icon://hint');this.setText(r.i18n.getText("about"));this.setTooltip(r.i18n.getText("about"));this.attachPress(this.showAboutDialog);};b.prototype.showAboutDialog=function(){var t=r.i18n,m=a.getMetadata(),s=new S({id:'aboutDialogFormID',editable:false,content:[new L({text:t.getText("technicalName")}),new T({text:m.libraryName||''}),new L({text:t.getText("fioriVersionFld")}),new T({text:m.version||''}),new L({text:t.getText("sapui5Fld")}),new T({text:(sap.ui.version||"")+(' ('+(sap.ui.buildinfo.buildtime||"")+')')||''}),new L({text:t.getText("userAgentFld")}),new T({text:navigator.userAgent||''}),new L({text:''})]}),h=new O({title:m.title,icon:m.icon}).addStyleClass('sapUshellAboutDialogHeader'),d,v,o=new B({text:t.getText("okBtn"),press:function(){d.close();}});if(jQuery.isEmptyObject(m)||!m.icon){v=new V({items:[s]});}else{v=new V({items:[h,s]});}d=new D({id:"aboutContainerDialogID",title:t.getText("about"),contentWidth:"25rem",horizontalScrolling:false,leftButton:o,afterClose:function(){d.destroy();}});d.addContent(v);d.open();};return b;},true);