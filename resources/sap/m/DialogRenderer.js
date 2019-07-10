/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./BarRenderer'],function(q,B){"use strict";var D={};D.render=function(r,c){var a=c.getId(),t=c.getType(),h=c._getAnyHeader(),s=c.getSubHeader(),m=(t===sap.m.DialogType.Message),l=c.getBeginButton(),R=c.getEndButton(),H=c.getHorizontalScrolling(),v=c.getVerticalScrolling(),S=c.getState(),b=c.getStretch(),d=c.getStretchOnPhone()&&sap.ui.Device.system.phone,e=c.getResizable(),f=c.getDraggable(),V=c.getAggregation("_valueState");if(h){h.applyTagAndContextClassFor("header");}if(s){s.applyTagAndContextClassFor("subheader");}var g=c.getContentWidth()&&c.getContentWidth()!='auto'?' width: '+c.getContentWidth()+';':'';var j=c.getContentHeight()&&c.getContentHeight()!='auto'?' height: '+c.getContentHeight()+';':'';var k="style='"+g+j+"'";r.write('<div '+k);r.writeControlData(c);r.addClass("sapMDialog");r.addClass("sapMDialog-CTX");r.addClass("sapMPopup-CTX");if(c.isOpen()){r.addClass("sapMDialogOpen");}if(window.devicePixelRatio>1){r.addClass("sapMDialogHighPixelDensity");}if(c._bDisableRepositioning){r.addClass("sapMDialogTouched");}if(b||(d)){r.addClass("sapMDialogStretched");}r.addClass(sap.m.Dialog._mStateClasses[S]);var n=!c._oToolbar&&!l&&!R;var o=c._oToolbar&&c._isToolbarEmpty()&&!l&&!R;if(n||o){r.addClass("sapMDialog-NoFooter");}if(!h){r.addClass("sapMDialog-NoHeader");}if(S==="Error"||S==="Warning"){r.writeAccessibilityState(c,{role:"alertdialog"});}else{r.writeAccessibilityState(c,{role:"dialog"});}if(c._forceDisableScrolling){r.addClass("sapMDialogWithScrollCont");}if(s&&s.getVisible()){r.addClass("sapMDialogWithSubHeader");}if(m){r.addClass("sapMMessageDialog");}if(!v){r.addClass("sapMDialogVerScrollDisabled");}if(!H){r.addClass("sapMDialogHorScrollDisabled");}if(sap.ui.Device.system.phone){r.addClass("sapMDialogPhone");}if(f&&!b){r.addClass("sapMDialogDraggable");}if(sap.m._bSizeCompact){r.addClass("sapUiSizeCompact");}r.writeClasses();var T=c.getTooltip_AsString();if(T){r.writeAttributeEscaped("title",T);}r.writeAttribute("tabindex","-1");r.write(">");if(sap.ui.Device.system.desktop){if(e&&!b){r.writeIcon("sap-icon://resize-corner",["sapMDialogResizeHandler"],{"title":""});}r.write('<span id="'+c.getId()+'-firstfe" tabindex="0"/>');}if(h){r.renderControl(h);}if(s){s.addStyleClass("sapMDialogSubHeader");r.renderControl(s);}if(V){r.renderControl(V);}r.write('<section id="'+a+'-cont" class="sapMDialogSection">');r.write('<div id="'+a+'-scroll" class="sapMDialogScroll">');r.write('<div id="'+a+'-scrollCont" class="sapMDialogScrollCont');if(c.getStretch()||j){r.write(' sapMDialogStretchContent');}r.write('">');var C=c.getContent();for(var i=0;i<C.length;i++){r.renderControl(C[i]);}r.write("</div>");r.write("</div>");r.write("</section>");if(!(n||o)){r.renderControl(c._oToolbar);}if(sap.ui.Device.system.desktop){r.write('<span id="'+c.getId()+'-lastfe" tabindex="0"/>');}r.write("</div>");};return D;},true);
