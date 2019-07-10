jQuery.sap.declare("sap.rules.ui.parser.businessLanguage.lib.vocabularyUtils");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.constantsBase");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");sap.rules.ui.parser.businessLanguage.lib.vocabularyUtils=sap.rules.ui.parser.businessLanguage.lib.vocabularyUtils||{};sap.rules.ui.parser.businessLanguage.lib.vocabularyUtils.lib=(function(){var v=sap.rules.ui.parser.resources.vocabulary.lib.constantsBase.lib;var c=sap.rules.ui.parser.businessLanguage.lib.constants.lib;function a(){}var O='OneToMany';a.prototype.AssocInfo=function(n){this.name=n;this.isValid=false;this.object=null;this.isCollection=false;this.alt=[];};a.prototype.isCardinalityCollection=function(b){return b===O;};a.prototype.getTypedAttribute=function(b,d,o,e,f,t){var g=b.getAttribute(d,o,e);if(!g){return null;}if(t.length>0){var h=false;var i;for(i=0;i<t.length;i++){if(t[i].type===g.businessDataType&&t[i].hasOwnProperty("isCollection")&&t[i].isCollection===f){h=true;break;}}if(!h){return null;}}return g;};a.prototype.getAltTypedAttributes=function(b,d,o,e,f,t,m){var g=null;var h=[];var i,j,k,l;var n=m===c.DISPLAY_TEXT?v.TermModeRelated.TERM_MODE_BY_DESCRIPTION:v.TermModeRelated.TERM_MODE_BY_NAME;var p=b.getObjectAttributesNamesByTermMode(d,o,e,n);if(t.length===0){return p;}for(i=0;i<p.length;i++){k=false;for(j=0;j<t.length;j++){if((t[j].type===c.TYPE_BOOLEAN||t[j].type===c.TYPE_BOOLEAN_COLLECTION)&&m===c.DISPLAY_TEXT){continue;}if(t[j].hasOwnProperty("isCollection")&&t[j].isCollection===f){l=b.getAttribute(d,o,p[i].name);if(l&&l.businessDataType===t[j].type){p[i].type=l.businessDataType;g=l.description;k=true;break;}}}if(k){p[i].description=g;p[i].tokenType=c.tokenTypesEnum.vocabulary;h.push(p[i]);}}return h;};a.prototype.canObjectLeadToType=function(b,d,o,t,e,f){if(f.hasOwnProperty(o)){return f[o];}f[o]=false;var i,g;if(e){var h=false;for(i=0;i<t.length;i++){if(t[i].hasOwnProperty("isCollection")&&t[i].isCollection){h=true;break;}}if(!h){f[o]=false;return false;}}var j=b.getAttributes(d,o);for(i=0;i<t.length;i++){if(t[i].hasOwnProperty("isCollection")&&t[i].isCollection===e){for(g=0;g<j.length;g++){if(j[g].businessDataType===t[i].type){f[o]=true;return true;}}}}var k=b.getAssociations(d,o,false);var l;for(i=0;i<k.length;i++){l=e||this.isCardinalityCollection(k[i].cardinality);if(this.canObjectLeadToType(b,d,k[i].target,t,l,f)){f[o]=true;return true;}}return false;};a.prototype.isTypedObjectExists=function(b,d,o,t){var e=b.getObject(d,o);if(e===null){return null;}if(t.length===0){return e;}var f={};var g=this.canObjectLeadToType(b,d,o,t,false,f);if(g===false){return null;}return e;};a.prototype.isTypedAliasExists=function(b,d,o,t){var e=b.getAlias(d,o,null);if(e===null){return null;}if(t.length===0){return e;}var f=e.isCollection;var g=e.businessDT;var i;for(i=0;i<t.length;i++){if(t[i].type===g){if(t[i].isCollection===f){return e;}}}return null;};a.prototype.getAltTypedTerms=function(b,d,s,t,e,f,g,h,k,l,m,n){var o=b.getTerms(d,s,n);var p=o.terms;var q=[];var i,j;var r;var u;f=(!f?false:f);var w=false;var x=null;var y=null;var z=k?true:false;var A;if(n===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION){A=v.TermModeRelated.TERM_PROPERTY_FRIENDLY_TERM;}else{A=v.TermModeRelated.TERM_PROPERTY_DESCRIPTION;}if(e&&g){y=e.split(".");if(y.length>0){y=y.shift();}}for(i=0;i<p.length;i++){r=p[i];w=false;if(z&&r.isDeprecated===true){continue;}if((f||h)&&r.modifiers.hasOwnProperty("all")&&r.modifiers.all){continue;}if(r.modifiers.hasOwnProperty("current")&&r.modifiers.current&&((f)||((l!==undefined)&&(l===false))||((m!==undefined)&&(m===false)&&(h!==undefined)&&(h===false)))){continue;}if(t.length===0){q.push(r[A]);continue;}if((r.businessDataType!==c.TYPE_BOOLEAN||n!==v.TermModeRelated.TERM_MODE_BY_DESCRIPTION)&&!f&&!g&&e!==null&&r.context!==null&&r.expression.indexOf(e)===0&&r.isConditionalContext===false&&e!==r.contex&&r.businessDataType!==null&&(r.expression.split(".").length===(e.split(".").length+1))){continue;}if(e&&g){x=null;if(r.isCollection&&!r.isConditionalContext){x=r.expression.split(".");if(x.length>0){x=x.shift();w=(x===y?true:false);}}}if((e===null&&r.isConditionalContext===false&&!f)||(e!==null&&r.context!==null&&e.indexOf(r.context)===0&&e!==r.context&&!f)||(e!==null&&r.expression.indexOf(e)===0&&r.isConditionalContext===false&&f)||(e!==null&&r.expression.indexOf(e)===0&&((r.modifiers.hasOwnProperty("current")&&r.modifiers.current)||(r.businessDataType===c.TYPE_BOOLEAN&&n===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION)))||w){for(j=0;j<t.length;j++){u=t[j];if(w&&u.type===r.businessDataType&&r.isCollection&&u.isCollection){q.push(r[A]);break;}else if(!w&&u.type===r.businessDataType&&(u.isCollection===r.isCollection)){q.push(r[A]);break;}}}}return q;};a.prototype.buildExternalAltValueList=function(b,d,e){var f=[];var g=b.getValueList(d,e.attributeValueList);var m=g.metadata;m.businessDataType=g.businessDataType;var r={name:e.attributeValueList,tokenType:c.tokenTypesEnum.valueList,info:{id:e.attributeValueList,metadata:m}};f.push(r);return f;};a.prototype.buildInternalAltValueList=function(b,d,e,s){var f=[];var g=[];var i=0;g=b.getValueListDescriptions(d,e.attributeValueList,s);for(i=0;i<g.length;i++){f.push({name:g[i],"info":{key:e.attributeValueList},tokenType:c.tokenTypesEnum.valueList});}return f;};a.prototype.getAltValueList=function(b,d,e,s){var f=[];if(e){var g=b.getValueListType(d,e.attributeValueList);switch(g){case v.INTERNAL_VALUE_LIST:f=this.buildInternalAltValueList(b,d,e,s);break;case v.EXTERNAL_VALUE_LIST:f=this.buildExternalAltValueList(b,d,e);break;default:return[];}}return f;};a.prototype.getAltValueListForValueListAttr=function(b,d,e,s){return this.getAltValueList(d,b,e,s);};a.prototype.getAltTypedObjects=function(b,d,o,t){var e=b.getObjectsNames(d,o);if(t.length===0){return e;}var f=[];var i,g;for(i=0;i<e.length;i++){g={};if(this.canObjectLeadToType(b,d,e[i].name,t,false,g)){e[i].tokenType=c.tokenTypesEnum.vocabulary;f.push(e[i]);}}return f;};a.prototype.getAltTypedAliases=function(b,d,o,t){var e=b.getAliases(d,o);e=(e.hasOwnProperty("aliases"))?e.aliases:e;if(t.length===0){return e;}var i;var z;var f,g=false;var h;var j=[];for(i=0;i<e.length;i++){g=false;f=e[i].isCollection;h=(e[i].businessDT===null?c.SIMPLE_SELECTION_VALUE_TYPE.COLLECTION.string:e[i].businessDT);if(f){g=(e[i].type===v.ALIAS_CONTENT_DECISION_TABLE?true:false);}for(z=0;z<t.length;z++){if(t[z].hasOwnProperty("isCollection")&&t[z].isCollection===f&&g===t[z].isDTAlias){if(t[z].type===h){e[i].tokenType=c.tokenTypesEnum.alias;j.push(e[i]);break;}}}}return j;};a.prototype.getTypedAssociation=function(b,d,o,e,i,t){var f=b.getAssociation(d,o,e,false);if(!f){return null;}if(t.length===0){return f;}var g=i;if(this.isCardinalityCollection(f.cardinality)){g=true;}var h={};if(!this.canObjectLeadToType(b,d,f.target,t,g,h)){return null;}return f;};a.prototype.getAltTypedAssociations=function(b,d,o,e,f,t){var g=b.getObjectAssociationsNames(d,o,e);if(t.length===0){return g;}var h=[];var i,j,k,l;for(i=0;i<g.length;i++){j=b.getAssociation(d,o,g[i].name,false);k=f;if(!this.isICollection&&this.isCardinalityCollection(j.cardinality)){k=true;}l={};if(this.canObjectLeadToType(b,d,j.target,t,k,l)){g[i].tokenType=c.tokenTypesEnum.vocabulary;h.push(g[i]);}}return h;};a.prototype.isAttributeExists=function(b,d,e){if(e.isAttributeExists(d,b)){return true;}return false;};a.prototype.isTermPrefix=function(t,b,d,m){var e=null;if(!b){return false;}if(m===c.DISPLAY_TEXT){e=v.TermModeRelated.TERM_MODE_BY_DESCRIPTION;}else{e=v.TermModeRelated.TERM_MODE_BY_NAME;}var f=this.getAltTypedTerms(b,d,t,[],null,null,null,null,null,null,null,e);if(f.length>0){return true;}return false;};a.prototype.isTermsExists=function(b,d){return b.isTermsExist(d);};a.prototype.validateNavigationDetails=function(n,b,d,t,e,m){var r={navigation:n,term:n,root:{name:null,isValid:false,isAlias:false,isDTAlias:false,vocabulary:null,businessDataType:null,altDO:[],altAlias:[],altDTAlias:[],altValueList:[]},associations:{isValid:false,path:[]},attribute:{name:null,dataType:null,size:null,businessDataType:null,vocabulary:null,sourceType:null,isValid:false,valueListName:null,altAttr:[],altAssoc:[]},isValid:false,isCollection:false,modifiers:{},message:{"id":"invalid_root_error_message","params":[]}};var f;if(!n){r.root.altDO=this.getAltTypedObjects(b,d,'',t);r.root.altAlias=this.getAltTypedAliases(b,d,'',t);r.root.altValueList=this.getAltValueList(b,d,e,null);return r;}if(m===c.DISPLAY_TEXT){f=v.TermModeRelated.TERM_MODE_BY_DESCRIPTION;}else{f=v.TermModeRelated.TERM_MODE_BY_NAME;}var g=b.getTerm(d,n,f);if(g!==null){r.navigation=n=g.expression;r.modifiers=g.modifiers;r.isCollection=g.isCollection;}var p=n.split(".");if(p.length<1){r.root.altDO=this.getAltTypedObjects(b,d,'',t);r.root.altAlias=this.getAltTypedAliases(b,d,'',t);r.root.altValueList=this.getAltValueList(b,d,e,n);return r;}r.root.name=p.shift();var h=null;var o=this.isTypedObjectExists(b,d,r.root.name,t);if(o===null){h=this.isTypedAliasExists(b,d,r.root.name,t);}if(o===null&&h===null){if(p.length===0){r.root.altDO=this.getAltTypedObjects(b,d,r.root.name,t);r.root.altAlias=this.getAltTypedAliases(b,d,r.root.name,t);r.root.altValueList=this.getAltValueList(b,d,e,null);}return r;}if(o!==null){r.root.vocabulary=o.vocaName;}r.isValid=r.root.isValid=true;r.message.id=null;if(h!==null){r.root.vocabulary=h.vocaName;r.root.isAlias=true;r.root.businessDataType=h.businessDT;r.root.isDTAlias=(h.type===v.ALIAS_CONTENT_DECISION_TABLE?true:false);r.isCollection=h.isCollection;return r;}var i=r.root.name;var j;var k;var l;var q;while(p.length>0){j=p.shift();k=new this.AssocInfo(j);l=this.getTypedAssociation(b,d,i,j,r.isCollection,t);if(!l){if(p.length>0){r.associations.isValid=r.isValid=false;k.alt=this.getAltTypedAssociations(b,d,i,j,r.isCollection,t);r.associations.path.push(k);r.message.id="invalid_assoc_error_message";return r;}r.attribute.name=j;q=this.getTypedAttribute(b,d,i,j,r.isCollection,t);if(q){r.attribute.isValid=true;r.attribute.dataType=q.dataType;r.attribute.size=q.size;r.attribute.businessDataType=q.businessDataType;r.attribute.sourceType=q.sourceType;r.attribute.vocabulary=q.vocaName;r.attribute.valueListName=q.valueListName;}else{r.isValid=false;r.message.id="invalid_assoc_or_attr_error_message";r.attribute.altAttr=this.getAltTypedAttributes(b,d,i,j,r.isCollection,t,m);r.attribute.altAssoc=this.getAltTypedAssociations(b,d,i,j,r.isCollection,t);return r;}}else{k.isValid=true;k.vocabulary=l.vocaName;i=k.object=l.target;if(this.isCardinalityCollection(l.cardinality)&&!g){r.isCollection=k.isCollection=true;}r.associations.isValid=true;r.associations.path.push(k);}}return r;};a.prototype.getTypedParam=function(p,b){var d=p.getObjects();var i;for(i=0;i<d.length;i++){if(d[i].name===b){return d[i];}}return null;};a.prototype.getTypedNestedParam=function(p,b,n){var d=p.getAssociations(b);var e=null;for(e in d){if(d.hasOwnProperty(e)&&e===n){return d[e];}}return null;};a.prototype.getTypedParamAttribute=function(p,b,d){var e=p.getAttributes(b);var n=null;for(n in e){if(e.hasOwnProperty(n)&&n===d){return e[n];}}return null;};a.prototype.isCollection=function(p){return p.dataType===v.DATA_TYPE_COLLECTION;};a.prototype.isStruct=function(p){return p.dataType===v.DATA_TYPE_STRUCTURE;};a.prototype.isDataObject=function(p){return p.dataType===v.DATA_TYPE_DATAOBJECT;};a.prototype.isLeaf=function(p){return!this.isCollection(p)&&!this.isStruct(p)&&!this.isDataObject(p);};a.prototype.validateParamDetails=function(p,n,b,d,t){var r={navigation:n,root:{name:null,isValid:false},associations:{isValid:false,path:[]},attribute:{name:null,dataType:null,size:null,businessDataType:null,isValid:false},isValid:false,isCollection:false,isDataObject:false,message:{"id":null,"params":[]}};if(!n){return r;}var e=n.split(".");if(e.length<1){return r;}var f=e.shift();var g=(e.length===0);var h=this.getTypedParam(p,f,t);if(!h){if(g){r.attribute.name=f;r.message.id="invalid_assoc_or_attr_error_message";}else{r.message.id="invalid_root_error_message";r.root.name=f;}return r;}if(g){r.isValid=true;if(this.isLeaf(h)){r.attribute.name=f;r.attribute.isValid=true;r.attribute.dataType=h.dataType;r.attribute.size=h.size;r.attribute.businessDataType=h.businessDataType;}else{r.root.name=f;r.root.isValid=true;r.isCollection=this.isCollection(h);r.isDataObject=this.isDataObject(h);}return r;}r.root.name=f;if(this.isLeaf(h)){r.message.id="invalid_root_data_type_error_message";return r;}if(this.isDataObject(h)){var o=h.dataObject.name;var i;for(i=0;i<e.length;i++){o+='.';o+=e[i];}var j=this.validateNavigationDetails(o,b,d,t);j.root=r.root;j.isDataObject=true;return j;}r.isCollection=this.isCollection(h);r.root.isValid=true;var k=r.root.name;var l,m,q,s;while(e.length>0){l=e.shift();m=new this.AssocInfo(l);q=this.getTypedNestedParam(p,k,l,r.isCollection,t);if(!q){if(e.length>0){r.message.id="invalid_assoc_error_message";r.associations.isValid=r.isValid=false;r.associations.path.push(m);return r;}r.attribute.name=l;s=this.getTypedParamAttribute(p,k,l,r.isCollection,t);if(s){r.attribute.isValid=true;r.attribute.dataType=s.dataType;r.attribute.size=s.size;r.attribute.businessDataType=s.businessDataType;r.isValid=true;}else{r.isValid=false;r.message.id="invalid_assoc_or_attr_error_message";}return r;}m.isValid=true;k=m.object=q.name;if(this.isCollection(q)){r.isCollection=m.isCollection=true;}r.associations.isValid=true;r.associations.path.push(m);}r.message.id="invalid_path_attr_not_found_error_message";return r;};a.prototype.getNavigationCompletion=function(s,b,d,t,e,f,i,g,h,j,k,m){var r={altDO:[],altAlias:[],altValueList:[]};i=(!i?false:i);var l=null;if(m===c.DISPLAY_TEXT){l=v.TermModeRelated.TERM_MODE_BY_DESCRIPTION;}else{l=v.TermModeRelated.TERM_MODE_BY_NAME;}r.altDO=this.getAltTypedTerms(b,d,s,t,f,i,g,h,true,j,k,l);r.altValueList=this.getAltValueList(b,d,e,s);if(!i){r.altAlias=this.getAltTypedAliases(b,d,s,t);}return r;};a.prototype.getAttributeByDesc=function(b,d,o,e){return b.getAttributeByDesc(d,o,e);};return{vocabularyUtilsLib:a};}());
