// @copyright@
sap.ui.define(['sap/ushell/resources'],function(r){"use strict";var T={};T.render=function(R,c){var t=null,m=c.getModel(),C,p=c.getPinButton();p=p.length?p[0]:undefined;try{t=c.getTileViews()[0];}catch(e){jQuery.sap.log.warning("Failed to load tile view: ",e.message);t=new sap.m.Text({text:"Failed to load. "});}var o=c.getParent(),a=o.getTiles?o.getTiles():[],v=a.filter(function(b){return b.getVisible();}),i=v.indexOf(c)>-1?v.indexOf(c)+1:"";R.write("<li");if(m&&m.getProperty("/enableHelp")){R.writeAttribute("data-help-id",c.getTileCatalogId());}R.writeControlData(c);R.addClass("sapUshellTile");if(t&&t.getContent&&sap.suite&&sap.suite.ui&&sap.suite.ui.commons&&sap.suite.ui.commons.FeedTile){C=t.getContent();C.forEach(function(I){if(I instanceof sap.suite.ui.commons.FeedTile){R.addClass("sapUshellFeedTileBG");}});}if(c.getLong()){R.addClass("sapUshellLong");}if(!c.getVisible()){R.addClass("sapUshellHidden");}if(c.getIsLocked()){R.addClass("sapUshellLockedTile");}R.writeClasses();R.writeAccessibilityState(c,{role:"option",posinset:i,setsize:v.length});R.writeAttribute("aria-describedby",c.getParent().getId()+"-titleText");if(c.getIeHtml5DnD()){R.writeAttribute("draggable","true");}R.writeAttributeEscaped("tabindex","-1");var l=c.data('layoutPosition');if(l){var s='-webkit-transform:'+l.translate3D+';-ms-transform:'+l.translate2D+';transform:'+l.translate3D;R.writeAttribute("style",s);}R.write(">");this.renderTileActionMode(R,c);R.addClass("sapUshellTileInner");if(c.getProperty('tileActionModeActive')){R.addClass("sapUshellTileActionBG");}if(this.renderTileView){this.renderTileView(R,t,p,c.getTarget());}if(c.getShowActionsIcon()){R.renderControl(c.actionIcon);}R.write("</li>");};T.renderTileView=function(R,t,p,s){if((s||"")!==""){R.write("<a");R.writeClasses();R.writeAttributeEscaped("href",s);R.write(">");R.renderControl(t);R.write("</a>");}else{R.write("<div");R.writeClasses();R.write(">");R.renderControl(t);R.write("</div>");if(p){R.write("<div");R.addClass("sapUshellTilePinButtonOverlay");R.writeClasses();R.write(">");R.renderControl(p);R.write("</div>");}}};T.renderTileActionMode=function(R,c){if(!c.getTileActionModeActive()){return;}R.write("<div");R.addClass("sapUshellTileActionLayerDiv");R.writeClasses();R.write(">");if(!c.getShowActionsIcon()){if(!c.getIsLocked()&&c.getTileActionModeActive()){R.write("<div");R.addClass("sapUshellTileDeleteClickArea");R.writeClasses();R.write(">");R.write("<div");R.addClass("sapUshellTileDeleteIconOuterClass");R.writeClasses();R.write(">");R.renderControl(c._initDeleteAction());R.write("</div>");R.write("</div>");}}R.write("<div class='sapUshellTileActionDivCenter'></div>");R.write("<div");R.addClass("sapUshellTileActionIconDivBottom");R.writeClasses();R.write(">");R.write("<div");R.addClass("sapUshellTileActionIconDivBottomInnerDiv");R.writeClasses();R.write(">");R.renderControl(c.getActionSheetIcon());R.write("</div>");R.write("</div>");R.write("</div>");};return T;},true);