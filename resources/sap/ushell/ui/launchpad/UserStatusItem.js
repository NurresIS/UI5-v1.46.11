/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global','sap/ushell/library','sap/ushell/resources','sap/ushell/ui/launchpad/AccessibilityCustomData'],function(q,M,r,A){"use strict";var t=r.i18n,U;U=sap.m.ListItemBase.extend("sap.ushell.ui.launchpad.UserStatusItem",{metadata:{properties:{status:{type:"object",group:"Appearance"},visible:{type:"boolean",group:"Appearance",defaultValue:true},isOpener:{type:"boolean",group:"Appearance",defaultValue:true},ariaLabel:{type:"string",group:"Appearance",defaultValue:null},enabled:{type:"boolean",group:"Appearance",defaultValue:true},image:{type:"object",group:"Appearance",defaultValue:null}},aggregations:{contentList:{type:"sap.ui.core.Control",multiple:false}},events:{press:{}}},renderer:{renderLIContent:function(a,c){var b=c.getStatus()||U.prototype.STATUS_ENUM.AVAILABLE;a.write("<div");if(!c.getVisible()){a.addClass("sapUshellShellHidden");}if(!c.getIsOpener()){c.addCustomData(new A({key:"tabindex",value:"0",writeToDom:true}));}a.addClass("sapUserStatusContent");a.writeClasses();a.write(">");a.write("<div ");a.addClass(b.styleClass);a.writeClasses();a.write(">");a.write("</div>");a.write("<div");if(b.status==="signOut"){a.addClass("sapUserStatusSignOutText");}a.addClass("sapUserStatusText");a.writeClasses();a.write(">");a.writeEscaped(b.text);a.write("</div>");if(c.getIsOpener()){a.write("<div class='sapUshellUserStatusExp sapUshellUserStatusDropDownArrow'></div>");}a.write("</div>");}}});U.prototype.onclick=function(e){this.firePress();e.preventDefault();};U.prototype.onsapspace=U.prototype.onclick;U.prototype.STATUS_ENUM={AVAILABLE:{text:t.getText("userStatus_available"),id:0,styleClass:"sapUshellUserStatusAvailableIndicator",status:"AVAILABLE"},AWAY:{text:t.getText("userStatus_away"),id:1,styleClass:"sapUshellUserStatusAwayIndicator",status:"AWAY"},BUSY:{text:t.getText("userStatus_busy"),id:2,styleClass:"sapUshellUserStatusBusyIndicator",status:"BUSY"},APPEAR_OFFLINE:{text:t.getText("userStatus_appearOffline"),id:3,styleClass:"sapUshellUserStatusAppearOfflineIndicator",status:"APPEAR_OFFLINE"},SIGNOUT:{text:t.getText("userStatus_signOut"),id:4,styleClass:"sapUshellUserSignOutExp sapUserStatusText",status:"SIGNOUT"}};U.prototype.setEnabled=function(e){this.setProperty('enabled',e,true);this.toggleStyleClass('sapUshellUserStatusDisable',!e);return this;};U.prototype.setVisible=function(v){this.setProperty('visible',v,true);if(v){this.$().removeClass('sapUshellShellHidden');}else{this.$().addClass('sapUshellShellHidden');}this.invalidate();return this;};U.prototype.setStatus=function(s){this.setProperty('status',s,true);this.invalidate();return this;};U.prototype.setImage=function(i){};U.prototype.setAriaLabel=function(a){this.setProperty('ariaLabel',a);return this;};U.prototype.setIsOpener=function(i){this.setProperty('isOpener',i);return this;};return U;},true);
