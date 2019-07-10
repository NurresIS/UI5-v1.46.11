/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
jQuery.sap.require("sap.uiext.inbox.InboxUtils");jQuery.sap.declare("sap.uiext.inbox.composite.InboxCommentRenderer");sap.uiext.inbox.composite.InboxCommentRenderer={};
sap.uiext.inbox.composite.InboxCommentRenderer.render=function(r,c){var a=r;var C=c;var m=C.getId();a.write('<ARTICLE');a.writeControlData(C);a.addClass('sapuiextInboxCommentChunk');a.addClass('sapuiextInboxComment');a.writeClasses();a.write('>');a.write('<img id='+m+'-thumb');var t=sap.uiext.inbox.InboxUtils.getUserMediaResourceURL(sap.uiext.inbox.composite.InboxComment.bpmSvcUrl,C.getSapOrigin(),C.getCreatedBy());if(!t){t=jQuery.sap.getModulePath("sap.uiext.inbox",'/')+"themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/comments/person_placeholder_grey_512.png";}a.writeAttributeEscaped('src',t);a.writeClasses();a.write('>');a.write('<DIV class= "sapuiextInboxCommentText" >');a.write('<SPAN id='+m+'-sender class= "sapuiextInboxCommentSenderText"');a.write('>');a.writeEscaped(C.getSender());a.write('</SPAN> ');this.renderText(a,C);a.write('</DIV>');a.write('<SPAN class= "sapuiextInboxCommentChunkByline" >');a.writeEscaped(C.getTimestamp());a.write('</SPAN>');a.write('</ARTICLE>');};
sap.uiext.inbox.composite.InboxCommentRenderer.renderText=function(r,c){var t=c.getText();var i=0;do{var p=t.search(/\s/);var s="",w="";if(p<0){w=t;}else{w=t.slice(0,p);s=t.slice(p,p+1);t=t.slice(p+1);}if(/^@/.test(w)){r.write('<a id='+c.getId()+'-Ref'+i);r.writeAttribute('href','javascript:void(0);');r.write('>');r.writeEscaped(w,true);r.write('</a>',s);i++;}else if(/^(https?|ftp):\/\//i.test(w)&&jQuery.sap.validateUrl(w)){r.write('<a');r.writeAttribute('href',jQuery.sap.encodeHTML(w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else if(/^(www\.)/i.test(w)&&jQuery.sap.validateUrl("http://"+w)){r.write('<a');r.writeAttribute('href',jQuery.sap.encodeHTML("http://"+w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else if(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,5}$/.test(w)){r.write('<a');r.writeAttribute('href',"mailto:"+jQuery.sap.encodeHTML(w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else{r.writeEscaped(w+s,true);}}while(p>=0);};
