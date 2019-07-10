/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../Plugin','../Support'],function(q,P,S){"use strict";var M=P.extend("sap.ui.core.support.plugins.MessageTest",{constructor:function(s){P.apply(this,["sapUiSupportMessageTest","Support Tool Communication Test",s]);this._aEventIds=[this.getId()+"Msg",S.EventType.SETUP,S.EventType.TEAR_DOWN];this._bFirstTime=true;}});M.prototype.onsapUiSupportMessageTestMsg=function(e){this.$("Panel").removeClass("sapUiSupportHidden");r(this,this.getId()+"Msg",e.getParameter("message"),true);};M.prototype.init=function(s){P.prototype.init.apply(this,arguments);var t=this;if(this._bFirstTime){this._bFirstTime=false;this.$("Panel").addClass("sapUiSupportHidden");}var a=sap.ui.getCore().createRenderManager();a.write("<div class='sapUiSupportToolbar'>");a.write("<input type='text' id='"+this.getId()+"-input' class='sapUiSupportTxtFld'/>");a.write("<button id='"+this.getId()+"-send' class='sapUiSupportBtn'>Send</button>");a.write("</div><div class='sapUiSupportMessageCntnt'></div>");a.flush(this.$().get(0));a.destroy();this._fSendHandler=function(){var v=t.$("input").val();s.sendEvent(t.getId()+"Msg",{"message":v});r(t,t.getId()+"Msg",v,false);};this.$("send").bind("click",this._fSendHandler);r(this,S.EventType.SETUP,"",true);};M.prototype.exit=function(s){r(this,S.EventType.TEAR_DOWN,"",true);if(this._fSendHandler){this.$("send").unbind("click",this._fSendHandler);this._fSendHandler=null;}P.prototype.exit.apply(this,arguments);};function r(p,m,s,R){q(".sapUiSupportMessageCntnt",p.$()).append("<b style=\"color:"+(R?"green":"blue")+";\">Message '"+m+"' "+(R?"received":"send")+(s?":</b> "+q.sap.escapeHTML(s):"</b>")+"<br>");}return M;});
