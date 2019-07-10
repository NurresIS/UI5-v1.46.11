// @copyright@
sap.ui.define(['sap/ui/base/EventProvider'],function(E){"use strict";var e="valueStored";var r=["value","noEdit","noStore","extendedValue","alwaysAskPlugin"];function U(a,c,p,C){this._aPlugins=[];this._oUserDefaultParametersNames=undefined;var t=this,s=new E();function g(P){var v=(typeof P.getComponentData==="function"&&P.getComponentData()&&P.getComponentData().config&&P.getComponentData().config["sap-priority"])||0;if(typeof v!=="number"||isNaN(v)){return 0;}return v;}this._insertPluginOrdered=function(P,o){var f=g(o),i,h;for(i=0;(i<P.length)&&o;++i){h=g(P[i]);if(o&&(f>h)){P.splice(i,0,o);o=undefined;}}if(o){P.push(o);}return P;};this.registerPlugin=function(P){this._aPlugins=this._insertPluginOrdered(this._aPlugins,P);};function b(i,P,f,v,D){if(i>=P.length){D.resolve(v);return;}if(typeof P[i].getUserDefault!=="function"){b(i+1,P,f,v,D);return;}P[i].getUserDefault(f,v).done(function(n){if(n){b(i+1,P,f,n,D);}else{b(i+1,P,f,v,D);}}).fail(function(){jQuery.sap.log.error("invocation of getUserDefault(\""+f+"\") for plugin "+t._getComponentNameOfPlugin(P[i])+" rejected.",null,"sap.ushell.services.UserDefaultParameters");b(i+1,P,f,v,D);});return;}function d(o){return jQuery.extend(true,{},o);}this._getStoreDate=function(){return new Date().toString();};this._storeValue=function(P,v,f){var h=new jQuery.Deferred();var D=new jQuery.Deferred();if(f&&v.extendedValue){sap.ushell.Container.getService("ClientSideTargetResolution").getUserDefaultParameterNames(true).done(function(o){var i=t._extractKeyArrays(o);var j=i.extended;D.resolve(j.indexOf(P)<0);}).fail(function(){D.resolve(false);});}else{D.resolve(false);}D.done(function(R){if(R){v.extendedValue=undefined;}if(f&&t._isInitial(v)){v=undefined;}else{v._shellData=jQuery.extend(true,{storeDate:t._getStoreDate()},v._shellData);}sap.ushell.Container.getService("UserDefaultParameterPersistence").saveParameterValue(P,v).always(function(){var S={parameterName:P,parameterValue:d(v)};s.fireEvent(e,S);h.resolve(P);});});return h.promise();};this._getCurrentValue=function(P){var D=new jQuery.Deferred();sap.ushell.Container.getService("UserDefaultParameterPersistence").loadParameterValue(P).done(function(v){D.resolve(v);}).fail(function(){D.resolve({value:undefined});});return D.promise();};this._isNeverSetValue=function(v){return!v||(!v._shellData&&!v.value&&!v.extendedValue);};this._isInitial=function(v){return!(v&&(v.value||v.extendedValue));};this._isStoreDistinct=function(v,V){return!r.every(function(m){return(v[m]===V[m]||jQuery.sap.equal(v[m],V[m]));});};this._getUserDefaultParameterNames=function(){if(!this._oUserDefaultParametersNames){this._oUserDefaultParametersNames=new jQuery.Deferred();sap.ushell.Container.getService("ClientSideTargetResolution").getUserDefaultParameterNames(true).done(function(P){var o=t._extractKeyArrays(P);var f=o.extended;var A=o.allParameters;var m=t._arrayToObject(A);if(m.length===0){t._oUserDefaultParametersNames.resolve({});}else{t._oUserDefaultParametersNames.resolve({aAllParameterNames:A,aExtendedParameterNames:f,oMetadataObject:m});}});}return this._oUserDefaultParametersNames.promise();};this._isRelevantParameter=function(P){var D=new jQuery.Deferred();this._getUserDefaultParameterNames().done(function(R){if(R.aAllParameterNames&&R.aAllParameterNames.indexOf(P)!==-1){D.resolve();}else{D.reject();}});return D.promise();};this.hasRelevantMaintainableParameters=function(){var t=this,R=new jQuery.Deferred(),h=false,G=[];t._getUserDefaultParameterNames().done(function(P){if(!jQuery.isEmptyObject(P)&&P.aAllParameterNames){P.aAllParameterNames.forEach(function(f){var o=t.getValue(f);G.push(o);o.done(function(v){if(v&&!v.hasOwnProperty("noEdit")){h=true;return;}});});jQuery.when.apply(undefined,G).done(function(){R.resolve(h);}).fail(function(){R.resolve();});}else{R.resolve();}});return R.promise();};this.getValue=function(P){var t=this,D=new jQuery.Deferred(),o=new jQuery.Deferred();this._isRelevantParameter(P).fail(function(){D.resolve({});}).done(function(){t._getCurrentValue(P).done(function(v){var O;if(!v){v={};}O=d(v);if((v._shellData||!t._isInitial(v))&&!v.noStore&&!v.alwaysAskPlugin){o.resolve(v);}else{sap.ushell.Container.getService("PluginManager").loadPlugins("UserDefaults").done(function(){b(0,t._aPlugins,P,v,o);}).fail(function(){jQuery.sap.log.error("Cannot get value for "+P+". One or more plugins could not be loaded.");o.reject("Initialization of plugins failed");});}o.done(function(n){if(t._isNeverSetValue(O)||t._isStoreDistinct(O,n)){t._storeValue(P,n);}D.resolve(n);}).fail(D.reject.bind(D));});});return D.promise();};this._addParameterValuesToParameters=function(P,f){var D=new jQuery.Deferred();var h=[];var t=this;f.forEach(function(i){var n=t.getValue(i);h.push(n);n.done(function(v){P[i].valueObject=v;});});jQuery.when.apply(jQuery,h).done(D.resolve.bind(D,P)).fail(D.reject.bind(D,P));return D.promise();};this._arrayToObject=function(P){var R={};P.forEach(function(f){R[f]={};});return R;};this._getComponentNameOfPlugin=function(P){if(typeof P!=="object"||typeof P.getMetadata!=="function"||!P.getMetadata()||typeof P.getMetadata().getComponentName!=="function"){return"'name of plugin could not be determined'";}return P.getMetadata().getComponentName()||"";};this._getEditorDataAndValue=function(D,A,f,m){var t=this;var P=[];var R=[];t._aPlugins.forEach(function(o,i){if(typeof o.getEditorMetadata==="function"){var n=new jQuery.Deferred();P.push(n);try{var h=P.length-1;o.getEditorMetadata(m).done(function(k){R[h]=k;}).always(function(){n.resolve();}).fail(function(){jQuery.sap.log.error("EditorMetadata for plugin "+t._getComponentNameOfPlugin(o)+"cannot be invoked.",null,"sap.ushell.services.UserDefaultParameters");n.resolve();});}catch(j){jQuery.sap.log.error("Error invoking getEditorMetaData on plugin: "+j+j.stack,null,"sap.ushell.services.UserDefaultParameters");n.resolve();}}});jQuery.when.apply(jQuery,P).done(function(){var h=[];var o=R.reverse().reduce(function(i,n){A.forEach(function(j){if(n[j]&&n[j].editorMetadata){i[j].editorMetadata=n[j].editorMetadata;}});return i;},m);A.forEach(function(i){if(!(o[i]&&o[i].editorMetadata)){h.push(i);}});t._addParameterValuesToParameters(o,A).done(function(i){var j=jQuery.extend(true,{},i),k;f.forEach(function(l){if(j[l]){j[l].editorMetadata=j[l].editorMetadata||{};j[l].editorMetadata.extendedUsage=true;}});k=Object.keys(j).splice(0);k.forEach(function(l){var n;if(j[l].valueObject&&j[l].valueObject.noEdit===true){delete j[l];n=h.indexOf(l);if(n>=0){h.splice(n,1);}}});if(h.length>0){jQuery.sap.log.error("The following parameter names have no editor metadata and thus likely no configured plugin:\n\""+h.join("\",\n\"")+"\".");}D.resolve(j);}).fail(D.reject.bind(D));});};this.editorGetParameters=function(){var D=new jQuery.Deferred();var t=this;this._getUserDefaultParameterNames().done(function(P){if(P.oMetadataObject.length===0){D.resolve({});}else{sap.ushell.Container.getService("PluginManager").loadPlugins("UserDefaults").done(function(){t._getEditorDataAndValue(D,P.aAllParameterNames,P.aExtendedParameterNames,P.oMetadataObject);}).fail(function(){jQuery.sap.log.error("One or more plugins could not be loaded");D.reject("Initialization of plugins failed");});}});return D.promise();};this._extractKeyArrays=function(P){var R={extended:[],simple:[],allParameters:[]};R.simple=(P&&P.simple&&Object.keys(P.simple).sort())||[];R.extended=(P&&P.extended&&Object.keys(P.extended).sort())||[];R.allParameters=R.simple.concat(R.extended.filter(function(S){return R.simple.indexOf(S)<0;})).sort();return R;};this.editorSetValue=function(P,v){return this._storeValue(P,v,true);};this.attachValueStored=function(f){s.attachEvent(e,f);};this.detachValueStored=function(f){s.detachEvent(e,f);};};U.hasNoAdapter=true;return U;},true);
