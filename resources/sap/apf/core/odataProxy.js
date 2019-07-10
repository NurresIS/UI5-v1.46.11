/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.apf.core.odataProxy");jQuery.sap.require("sap.ui.thirdparty.datajs");jQuery.sap.require('sap.apf.utils.utils');jQuery.sap.require('sap.apf.core.constants');(function(){'use strict';sap.apf.core.OdataProxy=function(s,a){var c=a.instances.coreApi;var m=a.instances.messageHandler;var b=s.serviceRoot;function g(b,i){return c.getEntityTypeMetadata(b,i);}function d(j){var i,q,t;if(!j){return"";}q=j.length;if(q===1){return"('"+j[0].value+"')";}t="(";for(i=0;i<q;i++){if(i>0){t=t+",";}t=t+j[i].name+"='"+j[i].value+"'";}return t+")";}function e(E){var i;if(E.messageObject&&E.messageObject.getCode){i=E.messageObject;}else if(E.response&&E.response.statusCode&&E.response.statusCode>=400){i=m.createMessageObject({code:'11005',aParameters:[E.response.statusCode.toString(),E.response.statusText]});}else{i=m.createMessageObject({code:'5201'});}m.putMessage(i);return i;}function f(E,i){var j=e(E);i(undefined,undefined,j);}function h(D,b,i,j){var q;var t;if(D&&D.results){q=D.results;}else if(D){q=D;}else{t=m.createMessageObject({code:'5201'});}g(b,i).done(function(u){j(q,u,t);});}function k(i){var j=JSON.parse(i.SerializedAnalyticalConfiguration);delete i.SerializedAnalyticalConfiguration;j.configHeader=i;i.SerializedAnalyticalConfiguration=JSON.stringify(j);return i;}this.readEntity=function(i,j,q,t,u){var v=sap.apf.core.constants.entitySets[i];var x=c.getXsrfToken(b);var w=b+'/'+v;w=w+d(q);if(t&&t.length>0){w=w+"?$select="+t.join();}var y={requestUri:w,async:true,method:"GET",headers:{"x-csrf-token":x}};c.odataRequest(y,function(D){h(D,b,v,j);},function(E){f(E,j);});};function l(P,v,i){var j="'";if(i&&i.dataType){return sap.apf.utils.formatValue(v,i.dataType.type);}if(typeof v==='number'){return v;}return j+sap.apf.utils.escapeOdata(v)+j;}function n(j){var q=jQuery.Deferred();var x=c.getXsrfToken(b);var t=[];var i,u=j.length;var v;var w=0;for(i=0;i<u;i++){v=sap.apf.core.constants.entitySets[j[w].entitySetName];g(b,v).done(function(y){var z,A,B;var S=false;z=sap.apf.core.constants.entitySets[j[w].entitySetName];z=z+d(j[w].inputParameters);if(j[w].selectList&&j[w].selectList.length>0){z=z+"?$select="+j[w].selectList.join();S=true;}if(j[w].filter){if(S){z=z+'&';}else{z=z+'?';}z=z+'$filter='+j[w].filter.toUrlParam({formatValue:function(P,C){return l(P,C,y);}});}A=j[w].method||'GET';B={requestUri:z,method:A,headers:{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage(),"x-csrf-token":x}};if(A!=="GET"){B.data=j[w].data;}t.push(B);w++;if(w===u){q.resolve(t);}});}return q;}function o(i,j,q,t){var u=jQuery.Deferred();var Q='';var v=i+d(j);if(q&&q.length>0){Q="$select="+q.join();}g(b,i).done(function(w){if(t){if(Q){Q=Q+'&';}Q=Q+'$filter='+t.toUrlParam({formatValue:function(P,x){return l(P,x,w);}});}if(i===sap.apf.core.constants.entitySets.application){if(Q){Q=Q+'&';}Q=Q+'$orderby=ApplicationName';}if(Q){v=v+'?'+Q;}u.resolve(v);});return u;}function p(i,j){var q="unknown error";var t="unknown error";var u="";if(i.message!==undefined){q=i.message;}var v="unknown";if(i.response&&i.response.statusCode){v=i.response.statusCode;t=i.response.statusText||"";u=i.response.requestUri;}if(i.messageObject&&i.messageObject.type==="messageObject"){j([],i.messageObject);}else{j([],m.createMessageObject({code:"5001",aParameters:[v,q,t,u]}));}}this.doChangeOperationsInBatch=function(q,t){var x=c.getXsrfToken(b);n(q).done(function(u){var v={requestUri:b+'/'+'$batch',method:"POST",headers:{"x-csrf-token":x},data:{__batchRequests:[{__changeRequests:u}]}};var S=function(w,y){var z;var A;var B,C,D;var F="";var i,j;if(w&&w.__batchResponses){for(i=0;i<w.__batchResponses.length;i++){if(w.__batchResponses[i].message){B=w.__batchResponses[i].message;C="";F=y.requestUri;z=m.createMessageObject({code:"5001",aParameters:[C,B,"",F]});break;}for(j=0;j<w.__batchResponses[i].__changeResponses.length;j++){A=w.__batchResponses[i].__changeResponses[j];if(A.message){B=A.message;D=A.data;C=A.statusCode;F=y.requestUri;z=m.createMessageObject({code:"5001",aParameters:[C,B,D,F]});break;}}}t(z);}};var E=function(i){p(i,t);};c.odataRequest(v,S,E,OData.batchHandler);});};this.readCollectionsInBatch=function(j,q){var x=c.getXsrfToken(b);n(j).done(function(t){var u={requestUri:b+'/'+'$batch',async:true,method:"POST",headers:{"x-csrf-token":x},data:{__batchRequests:t}};var S=function(v){var w=[];var y,z,A,B,C;var i;if(v&&v.__batchResponses){for(i=0;i<v.__batchResponses.length;i++){if(v.__batchResponses[i].data&&v.__batchResponses[i].data.results){w.push(v.__batchResponses[i].data.results);}else if(v.__batchResponses[i].message){z=v.__batchResponses[i].message;A=v.__batchResponses[i].response.body;B=v.__batchResponses[i].response.statusCode;C=w.requestUri;y=m.createMessageObject({code:"5001",aParameters:[B,z,A,C]});break;}else{C=w.requestUri;y=m.createMessageObject({code:"5001",aParameters:["unknown","unknown error","unknown error",C]});break;}}q(w,y);}};var E=function(i){p(i,q);};c.odataRequest(u,S,E,OData.batchHandler);});};this.readCollection=function(i,j,q,t,u){r(i,j,q,t,u);};function r(i,j,q,t,u){var v=sap.apf.core.constants.entitySets[i];var w=function(y,z){var A;var B;var C="";if(y&&y.__batchResponses){if(y.__batchResponses[0].data&&y.__batchResponses[0].data.results){A=y.__batchResponses[0].data.results;}else if(y.__batchResponses[0].message){var D=y.__batchResponses[0].message;var E=y.__batchResponses[0].response.body;var F=y.__batchResponses[0].response.statusCode;C=z.requestUri;B=m.createMessageObject({code:"5001",aParameters:[F,D,E,C]});}else{C=z.requestUri;B=m.createMessageObject({code:"5001",aParameters:["unknown","unknown error","unknown error",C]});}g(b,v).done(function(G){j(A,G,B);});}};var x=c.getXsrfToken(b);o(v,q,t,u).done(function(y){var z={requestUri:b+'/'+'$batch',async:true,method:"POST",headers:{"x-csrf-token":x},data:{__batchRequests:[{requestUri:y,method:"GET",headers:{"x-csrf-token":x,"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage()}}]}};c.odataRequest(z,w,function(E){f(E,j);},OData.batchHandler);});}this.create=function(i,j,q){if(i==="configuration"){j=k(j);}var t=sap.apf.core.constants.entitySets[i];var x=c.getXsrfToken(b);var u=b+'/'+t;var v={requestUri:u,async:true,method:"POST",headers:{"x-csrf-token":x},data:j};function w(D,R){var z;var A;if(D&&R.statusText==="Created"){z=D;}else{A=m.createMessageObject({code:'5201'});}g(b,t).done(function(B){q(z,B,A);});}function y(E){var z=e(E);q(undefined,undefined,z);}c.odataRequest(v,w,y);};this.update=function(i,j,q,t){if(i==="configuration"){j=k(j);}var u=sap.apf.core.constants.entitySets[i];var x=c.getXsrfToken(b);var v=b+'/'+u+d(t);var w={requestUri:v,method:"PUT",headers:{"x-csrf-token":x},data:j};function y(D,R){var A;if(R.statusCode!==204){A=m.createMessageObject({code:'5201'});}g(b,u).done(function(B){q(B,A);});}function z(E){var A=e(E);q(undefined,A);}c.odataRequest(w,y,z);};this.remove=function(i,j,q,t){var u=sap.apf.core.constants.entitySets[i];var x=c.getXsrfToken(b);var v=b+'/'+u+d(j);g(b,u).done(function(z){if(t){v=v+'$filter='+t.toUrlParam({formatValue:function(P,B){return l(P,B,z);}});}var A={requestUri:v,method:"DELETE",headers:{"x-csrf-token":x}};c.odataRequest(A,w,y);});function w(D,R){if(R.statusText==="No Content"){g(b,u).done(function(A){q(A,undefined);});}else{var z=m.createMessageObject({code:'5201'});q(undefined,z);}}function y(E){var z=e(E);q(undefined,z);}};};}());
