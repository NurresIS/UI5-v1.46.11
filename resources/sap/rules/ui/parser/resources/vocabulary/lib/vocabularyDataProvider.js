jQuery.sap.declare("sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProvider");jQuery.sap.require("sap.rules.ui.parser.resources.rule.lib.constantsBase");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.constants");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.vocaConversionUtils");sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProvider=sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProvider||{};sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProvider.lib=(function(){var r=sap.rules.ui.parser.resources.rule.lib.constantsBase.lib;var v=sap.rules.ui.parser.resources.vocabulary.lib.constants.lib;var a=sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects.lib;var u=sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils.lib;u=new u.runtimeServicesUtilsLib();var c=sap.rules.ui.parser.resources.vocabulary.lib.vocaConversionUtils;function b(d){this.globalObjects=null;this.globalRuleAttributes=null;this.globalStaticRuleTemplateAttributes=null;this.globalDynamicRuleTemplateAttributes=null;this.globalStaticVocabularyAttributes=null;this.allVocaObjects={"allAssocAttr":null,"allAssoc":null,"allObjects":null,"allActions":null,"allOutputs":null,"allAliases":null,"allTerms":null,"allTermsModifiers":null,"allValueLists":null,"allAttr":null,"allActionsStaticParams":null,"allOutputsStaticParams":null,"allActionsRequiredParams":null,"allOutputsRequiredParams":null,"allAdvancedFunctions":null,"allVocabularies":null,"allParameterInfos":null};this.rtContext=d;}b.prototype.getTermModes=function(){var t=this.rtContext.termModes;if(!t){t=["byName"];}return t;};b.prototype.refresh=function(){this.clearAll();};b.prototype.partialRefresh=function(w){if(w.hasOwnProperty(v.PARTIAL_REFRESH.ALIASES)){this.allVocaObjects.allAliases=null;var p;for(p in this.allVocaObjects.allVocabularies){if(this.allVocaObjects.allVocabularies.hasOwnProperty(p)){this.allVocaObjects.allVocabularies[p].aliases=null;}}}else{this.clearAll();}};b.prototype.getAllVocaObjects=function(){return this.allVocaObjects;};b.prototype.getParameters=function(){var f=null;if(this.allVocaObjects){f=this.allVocaObjects.allParameterInfos;}return f;};b.prototype.readValueListValues=function(d){if(d[v.VALUE_LIST_VALUES]){return d[v.VALUE_LIST_VALUES];}return this.rtContext.readValueListValues(d);};b.prototype.getValueListType=function(d,e){var f=null;var g=this.loadVoca(d,false,false,false,false,true,false,false);if(g){if(g.valueLists.hasOwnProperty(e)){f=g.valueLists[e];if(f.hasOwnProperty(v.PROPERTY_VALUE_LIST_METADATA)){return v.EXTERNAL_VALUE_LIST;}}}return v.INTERNAL_VALUE_LIST;};b.prototype.getValueListDescriptions=function(d,e,s){var f=[];var l;if(arguments.length>2&&s){l=s;}else{l=null;}var t;var g=this.loadVoca(d,false,false,false,false,true,false,false);if(g){if(g.valueLists.hasOwnProperty(e)){if(this.getValueListType(d,e)===v.INTERNAL_VALUE_LIST){g.valueLists[e].values=this.readValueListValues(g.valueLists[e]);var p=null;for(p in g.valueLists[e].values){if(g.valueLists[e].values.hasOwnProperty(p)){if(l===null||p.toLowerCase().indexOf(l.toLowerCase())===0){t=p.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t').replace(/\f/g,'\\f');f.push(t);}}}}}}return f;};b.prototype.GetValueFromValueListDescription=function(d,e,f){var g=null;var h=this.loadVoca(d,false,false,false,false,true,false,false);if(h){if(h.valueLists.hasOwnProperty(e)){if(this.getValueListType(d,e)===v.INTERNAL_VALUE_LIST){h.valueLists[e].values=this.readValueListValues(h.valueLists[e]);if(h.valueLists[e].values.hasOwnProperty(f)){g=h.valueLists[e].values[f];}}}}return g;};b.prototype.GetDescriptionFromValueListValue=function(d,e,f){var g,h;var i=this.loadVoca(d,false,false,false,false,true,false,false);if(i){if(i.valueLists.hasOwnProperty(e)){if(this.getValueListType(d,e)===v.INTERNAL_VALUE_LIST){g=this.readValueListValues(i.valueLists[e]);for(h in g){if(g.hasOwnProperty(h)&&((("'"+g[h]+"'")===f)||(g[h]===f))){return h;}}}}}return null;};b.prototype.IsValueListDescriptionExist=function(d,e){var f=false;var g=this.loadVoca(d,false,false,false,false,true,false,false);if(g){if(g.valueLists.hasOwnProperty(e)){if(this.getValueListType(d,e)===v.INTERNAL_VALUE_LIST){if(g.valueLists[e].descriptionColumn){f=true;}}}}return f;};b.prototype.getValueList=function(d,e){var f=null;var g=this.loadVoca(d,false,false,false,false,true,false,false);if(g){if(g.valueLists.hasOwnProperty(e)){f=g.valueLists[e];}}return f;};b.prototype.getObjects=function(d,s){var o=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var e=this.loadVoca(d,true,false,false,false,false,false,false);if(e){var p=null;for(p in e.objects){if(e.objects.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){o.push(this.getObject(d,p));}}}return{objects:o};};b.prototype.getAllActionNames=function(s,e){var i;var d={};this.loadAllActions(this.allVocaObjects);for(i=0;i<this.allVocaObjects.allActions.length;i++){if(this.allVocaObjects.allActions[i].isPrivate===true){continue;}if(this.allVocaObjects.allActions[i].vocaName===e){continue;}if(s===v.GLOBAL||(s===this.allVocaObjects.allActions[i].scope||this.allVocaObjects.allActions[i].scope===v.GLOBAL)){d[this.allVocaObjects.allActions[i].name]=this.allVocaObjects.allActions[i].vocaName;}}return d;};b.prototype.getAllOutputNames=function(s,e){var i;var d={};this.loadAllOutputs(this.allVocaObjects);for(i=0;i<this.allVocaObjects.allOutputs.length;i++){if(this.allVocaObjects.allOutputs[i].isPrivate===true){continue;}if(this.allVocaObjects.allOutputs[i].vocaName===e){continue;}if(s===v.GLOBAL||(s===this.allVocaObjects.allOutputs[i].scope||this.allVocaObjects.allOutputs[i].scope===v.GLOBAL)){d[this.allVocaObjects.allOutputs[i].name]=this.allVocaObjects.allOutputs[i].vocaName;}}return d;};b.prototype.getAllPersistedAliasNames=function(s,e,d){var i;var f={};this.loadAllAliases(this.allVocaObjects);for(i=0;i<this.allVocaObjects.allAliases.length;i++){if(this.allVocaObjects.allAliases[i].isPrivate===true&&(!d||this.allVocaObjects.allAliases[i].vocaName!==d)){continue;}if(e&&this.allVocaObjects.allAliases[i].vocaName===e){continue;}if(s===v.GLOBAL||(s===this.allVocaObjects.allAliases[i].scope||this.allVocaObjects.allAliases[i].scope===v.GLOBAL)){f[this.allVocaObjects.allAliases[i].name]=this.allVocaObjects.allAliases[i];}}return f;};b.prototype.getAllPersistedValueListsNames=function(s,e,d){var f={};var g=null;var i;this.loadAllValueLists();for(i=0;i<this.allVocaObjects.allValueLists.length;i++){g=this.allVocaObjects.allValueLists[i];if(g.isPrivate===true&&(!d||g.vocaName!==d)){continue;}if(e&&g.vocaName===e){continue;}if(s===v.GLOBAL||(s===g.scope||g.scope===v.GLOBAL)){f[this.allVocaObjects.allValueLists[i].name]=g;}}return f;};b.prototype.isVocabularyExist=function(d,s){var e=v.ALL;if(s){e=s;}var f=this.getVocabulariesNames(e,true);var i;for(i=0;i<f.length;i++){if(f[i].name===d){return true;}}return false;};b.prototype.isTermsExist=function(d){var e=this.loadVoca(d,false,false,false,false,false,true,false);if(!e){return null;}var t='';for(t in e.terms){if(e.terms.hasOwnProperty(t)){return true;}}return false;};b.prototype.getAllObjectModelNames=function(s,e,d){var i;var f={};this.loadAllObjects(this.allVocaObjects);for(i=0;i<this.allVocaObjects.allObjects.length;i++){if(this.allVocaObjects.allObjects[i].isPrivate===true&&(!d||this.allVocaObjects.allObjects[i].vocaName!==d)){continue;}if(e&&this.allVocaObjects.allObjects[i].vocaName===e){continue;}if(s===v.GLOBAL||(s===this.allVocaObjects.allObjects[i].scope||this.allVocaObjects.allObjects[i].scope===v.GLOBAL)){f[this.allVocaObjects.allObjects[i].name]=this.allVocaObjects.allObjects[i].vocaName;}}this.loadAllGlobalObjects();var p=null;for(p in this.globalObjects){if(this.globalObjects.hasOwnProperty(p)){f[p]=this.globalObjects[p].vocaName;}}return f;};b.prototype.getAllAttributesNames=function(s,e,d){var i;var f={};var g=null;this.loadRuleAttributes();for(g in this.globalRuleAttributes){if(this.globalRuleAttributes.hasOwnProperty(g)){f[g]=this.globalRuleAttributes[g];}}this.addStaticRuleTemplateAttributes();this.addDynamicRuleTemplateAttributes();this.addStaticVocabularyAttributes();for(g in this.globalStaticRuleTemplateAttributes){if(this.globalStaticRuleTemplateAttributes.hasOwnProperty(g)){f[g]=this.globalStaticRuleTemplateAttributes[g];}}for(g in this.globalDynamicRuleTemplateAttributes){if(this.globalDynamicRuleTemplateAttributes.hasOwnProperty(g)){f[g]=this.globalDynamicRuleTemplateAttributes[g];}}for(g in this.globalStaticVocabularyAttributes){if(this.globalStaticVocabularyAttributes.hasOwnProperty(g)){f[g]=this.globalStaticVocabularyAttributes[g];}}this.loadAllAttributes(this.allVocaObjects);for(i=0;i<this.allVocaObjects.allAttr.length;i++){if(this.allVocaObjects.allAttr[i].isPrivate===true&&(!d||this.allVocaObjects.allAttr[i].vocaName!==d)){continue;}if(e&&this.allVocaObjects.allAttr[i].vocaName===e){continue;}if(s===v.GLOBAL||(this.allVocaObjects.allAttr[i].scope===s||this.allVocaObjects.allAttr[i].scope===v.GLOBAL)){f[this.allVocaObjects.allAttr[i].name]=this.allVocaObjects.allAttr[i];}}return f;};b.prototype.isAttributeExists=function(d,e){var s=this.getVocabularyScope(d);var f=this.getAllAttributesNames(s);if(f.hasOwnProperty(e)){return true;}return false;};b.prototype.getVocabulary=function(d,i,e){var f=this.loadVoca(d,true,true,true,true,true,false,true,i);if(!f){return null;}var g=null;var h=c.getVocaConversionUtils().isValueListConversionDefined(e);if(h){g=JSON.parse(JSON.stringify(f));}else{g=f;}var o=null;for(o in g.objects){if(g.objects.hasOwnProperty(o)){g.objects[o]=this.getObject(d,o);}}var j=null;for(j in g.actions){if(g.actions.hasOwnProperty(j)){g.actions[j]=this.getAction(d,j,e);}}var k=null;for(k in g.outputs){if(g.outputs.hasOwnProperty(k)){g.outputs[k]=this.getOutput(d,k,e);}}if(h){var l=null;for(l in g.aliases){if(g.aliases.hasOwnProperty(l)){g.aliases[l]=this.getAlias(d,l,e);}}}return g;};b.prototype.getVocabularyScope=function(d){this.loadAllVocabularies();if(this.allVocaObjects.allVocabularies.hasOwnProperty(d)){return this.allVocaObjects.allVocabularies[d].scope;}return null;};b.prototype.getVocabulariesInScope=function(d){var s=this.getVocabularyScope(d);return this.getVocabulariesNames(s,true);};b.prototype.getIsIncludeGlobal=function(i){if(i===null||i===undefined){return true;}if(i==="false"){return false;}return true;};b.prototype.getVocabulariesNames=function(s,i){var d=v.ALL;var e=this.getIsIncludeGlobal(i);if(s){d=s;}this.loadAllVocabularies();var f=[];var p=null;for(p in this.allVocaObjects.allVocabularies){if(this.allVocaObjects.allVocabularies.hasOwnProperty(p)){if(e===false&&this.allVocaObjects.allVocabularies[p].scope===v.GLOBAL){continue;}if(d===v.ALL){f.push({name:p});}else if(s===v.PUBLIC&&this.allVocaObjects.allVocabularies[p].isPrivate===false){f.push({name:p});}else if(s===v.PRIVATE&&this.allVocaObjects.allVocabularies[p].isPrivate===true){f.push({name:p});}else if(s===this.allVocaObjects.allVocabularies[p].scope||this.allVocaObjects.allVocabularies[p].scope===v.GLOBAL){f.push({name:p});}}}return f;};b.prototype.getDefaultWritableForAppByVocabulary=function(d){var s=this.getVocabularyScope(d);return this.getDefaultWritableForAppByScope(s);};b.prototype.getDefaultWritableForAppByScope=function(s){this.loadAllVocabularies();var d=null;var e={"vocabularies":[]};for(d in this.allVocaObjects.allVocabularies){if(this.allVocaObjects.allVocabularies.hasOwnProperty(d)){if(this.allVocaObjects.allVocabularies[d].scope===s&&this.allVocaObjects.allVocabularies[d].isWritable===true){e.vocabularies.push(d);e.scope=s;break;}}}return e;};b.prototype.isObjectExist=function(d,o){if(this.isGlobalObject(o)){return true;}var e=this.loadVoca(d,true,false,false,false,false,false,false);if(!e){return false;}return e.objects.hasOwnProperty(o);};b.prototype.isGlobalObject=function(o){this.loadAllGlobalObjects();return this.globalObjects.hasOwnProperty(o);};b.prototype.getObject=function(d,o){return this.loadObject(d,o,true,true);};b.prototype.getObjectIgnoreCase=function(d,o){return this.loadObjectIgnoreCase(d,o,true,true);};b.prototype.getObjectRuntimeInfo=function(d,o){var e=this.loadObject(d,o,false,false);if(!e){return null;}return{schema:e.schema,runtime_name:e.runtimeName};};b.prototype.getObjectRuntimeName=function(d,o){var e=this.loadObject(d,o,false,false);if(!e){return null;}return e.runtimeName;};b.prototype.getObjectRuntimeSchemaName=function(d,o){var e=this.loadObject(d,o,false,false);if(!e){return null;}return e.schema;};b.prototype.getActionsNames=function(d,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadVoca(d,false,true,false,false,false,false,false);if(f){var p=null;for(p in f.actions){if(f.actions.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){e.push({name:p});}}}return e;};b.prototype.getTerms=function(d,s,t){var e=[];var f=null;var g=null;var h=null;var l=null;var i=null;if(s){l=s.toLowerCase();}if(t===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION){h=v.TermModeRelated.TERM_PROPERTY_FRIENDLY_TERM;}else{h=v.TermModeRelated.TERM_PROPERTY_DESCRIPTION;}i=this.loadVoca(d,false,false,false,false,false,true,false);if(i){for(g in i.terms){if(i.terms.hasOwnProperty(g)){f=i.terms[g];if(l===null||f[h].toLowerCase().indexOf(l)===0){e.push(f);}}}}return{terms:e};};b.prototype.getActions=function(d,s,e){var f=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var g=this.loadVoca(d,false,true,false,false,false,false,false);if(g){var p=null;for(p in g.actions){if(g.actions.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){f.push(this.getAction(d,p,e));}}}return{actions:f};};b.prototype.getAction=function(d,e,f){var g=this.loadVoca(d,false,true,false,false,false,false,false);if(!g){return null;}if(!g.actions[e]){return null;}var h=g.actions[e];if(h){if(!h.staticParams){this.loadAllActionsStaticParams();h.staticParams=[];var i;for(i=0;i<this.allVocaObjects.allActionsStaticParams.length;i++){if(h.id===this.allVocaObjects.allActionsStaticParams[i].actionId){h.staticParams.push(this.allVocaObjects.allActionsStaticParams[i]);}}}if(!h.requiredParams){this.loadAllActionsRequiredParams();h.requiredParams=[];var j;for(j=0;j<this.allVocaObjects.allActionsRequiredParams.length;j++){if(h.id===this.allVocaObjects.allActionsRequiredParams[j].actionId){h.requiredParams.push(this.allVocaObjects.allActionsRequiredParams[j]);}}}}var k=c.getVocaConversionUtils().convertAction(this.rtContext.getConnection(),d,h,f);return k;};b.prototype.getTerm=function(d,t,e){var f=null;var g=null;var h=null;var i=null;var j=this.loadVoca(d,false,false,false,false,false,true,false);if(!j){return null;}if(e===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION){i=v.TermModeRelated.TERM_PROPERTY_FRIENDLY_TERM;}else{i=v.TermModeRelated.TERM_PROPERTY_DESCRIPTION;}for(f in j.terms){if(j.terms.hasOwnProperty(f)){g=j.terms[f];if(g[i]===t){h=g;break;}}}return h;};b.prototype.isTermModifierEmpty=function(d){var e=this.loadVoca(d,false,false,false,false,false,true,false);if(!e){return null;}if(!e.terms){return null;}var i=true;var t;if(Object.keys(e.terms).length!==0){for(t in e.terms){if(e.terms.hasOwnProperty(t)){if(Object.keys(e.terms[t].modifiers).length!==0){i=false;break;}}}}return i;};b.prototype.isCurrentTermModifierEmpty=function(d){var e=this.loadVoca(d,false,false,false,false,false,true,false);if(!e){return null;}if(!e.terms){return null;}var i=true;var t;if(Object.keys(e.terms).length!==0){for(t in e.terms){if(e.terms.hasOwnProperty(t)){if(e.terms[t].modifiers&&e.terms[t].modifiers[v.TERM_MODIFIER_CURRENT]){i=false;break;}}}}return i;};b.prototype.getAlias=function(d,e,f){var t=this.rtContext.getTransientVocabulary();var g=null;if(t){g=t.getAlias(e);}if(g){return g;}var h=this.loadVoca(d,false,false,false,true,false,false,false);if(!h){return null;}g=h.aliases[e];if(!g){return null;}var i=g;if(f){i=c.getVocaConversionUtils().convertAlias(this.rtContext.getConnection(),this,d,g,f);}return i;};b.prototype.isAliasExist=function(d,e){var f=this.loadVoca(d,false,false,false,true,false,false,false);if(!f){return false;}if(!f.aliases[e]){var t=this.rtContext.getTransientVocabulary();if(t&&t.getAlias(e)){return true;}return false;}return true;};b.prototype.isActionExist=function(d,e){var f=this.loadVoca(d,false,true,false,false,false,false,false);if(!f){return false;}if(!f.actions[e]){return false;}return true;};b.prototype.getAliasesNames=function(d,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadVoca(d,false,false,false,true,false,false,false);if(f){var p=null;for(p in f.aliases){if(f.aliases.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){e.push({name:p});}}}return e;};b.prototype.getOutputsNames=function(d,s){var o=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var e=this.loadVoca(d,false,false,true,false,false,false,false);if(e){var p=null;for(p in e.outputs){if(e.outputs.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){o.push({name:p});}}}return o;};b.prototype.getOutputs=function(d,s,e){var o=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadVoca(d,false,false,true,false,false,false,false);if(f){var p=null;for(p in f.outputs){if(f.outputs.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){o.push(this.getOutput(d,p,e));}}}return{outputs:o};};b.prototype.getAliases=function(d,s,e){var f=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var t=this.rtContext.getTransientVocabulary();var g=null;if(t){g=t.getAliasesMap();var p=null;for(p in g){if(g.hasOwnProperty(p)&&(l===null||p.toLowerCase().indexOf(l.toLowerCase())===0)){f.push(g[p]);}}}var h=this.loadVoca(d,false,false,false,true,false,false,false);if(h){var i=null;for(i in h.aliases){if(h.aliases.hasOwnProperty(i)&&(l===null||i.toLowerCase().indexOf(l.toLowerCase())===0)){if(!g||!g[i]){f.push(this.getAlias(d,i,e));}}}}return{aliases:f};};b.prototype.getOutput=function(d,o,e){var f=this.loadVoca(d,false,false,true,false,false,false,false);if(!f){return null;}if(!f.outputs[o]){return null;}var g=f.outputs[o];if(g){if(!g.staticParams){this.loadAllOutputsStaticParams();g.staticParams=[];var i;for(i=0;i<this.allVocaObjects.allOutputsStaticParams.length;i++){if(g.id===this.allVocaObjects.allOutputsStaticParams[i].outputId){g.staticParams.push(this.allVocaObjects.allOutputsStaticParams[i]);}}}if(!g.requiredParams){this.loadAllOutputsRequiredParams();g.requiredParams=[];var j;for(j=0;j<this.allVocaObjects.allOutputsRequiredParams.length;j++){if(g.id===this.allVocaObjects.allOutputsRequiredParams[j].outputId){g.requiredParams.push(this.allVocaObjects.allOutputsRequiredParams[j]);}}}}var h=c.getVocaConversionUtils().convertOutput(this.rtContext.getConnection(),d,g,e);return h;};b.prototype.isOutputExist=function(d,o){var e=this.loadVoca(d,false,false,true,false,false,false,false);if(!e){return false;}if(!e.outputs[o]){return false;}return true;};b.prototype.getObjectsNames=function(d,s){var o=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var e=this.loadVoca(d,true,false,false,false,false,false,false);if(e){var p=null;for(p in e.objects){if(e.objects.hasOwnProperty(p)&&(l===null||p.toLowerCase().indexOf(l.toLowerCase())===0)){o.push({name:p});}}}return o;};b.prototype.getObjectAssociationsNames=function(d,o,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadObject(d,o,false,true);if(f){var p=null;for(p in f.associations){if(f.associations.hasOwnProperty(p)&&(l===null||p.toLowerCase().indexOf(l.toLowerCase())===0)){e.push({name:p});}}}return e;};b.prototype.getObjectAttributesNames=function(d,o,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadObject(d,o,true,false);if(f){var p=null;for(p in f.attributes){if(f.attributes.hasOwnProperty(p)){if(l===null||p.toLowerCase().indexOf(l.toLowerCase())===0){e.push({name:p});}}}}return e;};b.prototype.getObjectAttributesDescriptions=function(d,o,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadObject(d,o,true,false);if(f){var p=null;var g=null;for(p in f.attributes){if(f.attributes.hasOwnProperty(p)){g=f.attributes[p].description;if(l===null||g.toLowerCase().indexOf(l.toLowerCase())===0){e.push({name:p});}}}}return e;};b.prototype.getObjectAttributesNamesByTermMode=function(d,o,s,t){if(t===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION){return this.getObjectAttributesDescriptions(d,o,s);}return this.getObjectAttributesNames(d,o,s);};b.prototype.getAttribute=function(d,o,e){var f=this.loadObject(d,o,true,false);if(!f){return null;}if(!f.attributes[e]){return null;}return f.attributes[e];};b.prototype.getAttributeByDesc=function(d,o,e){var f=0;var g=this.loadObject(d,o,true,false);if(!g){return null;}for(f in g.attributes){if(g.attributes.hasOwnProperty(f)){if(g.attributes[f].description===e){return g.attributes[f];}}}};b.prototype.getAttributeIgnoreCase=function(d,o,e){var f=this.loadObjectIgnoreCase(d,o,true,false);if(!f){return null;}if(!f.attributes[e]){return null;}return f.attributes[e];};b.prototype.getAttributeByTermMode=function(d,o,e,t){if(t===v.TermModeRelated.TERM_MODE_BY_DESCRIPTION){return this.getAttributeByDesc(d,o,e);}return this.getAttribute(d,o,e);};b.prototype.getAttributeDataType=function(d,o,e){var f=this.loadObject(d,o,true,false);if(!f){return null;}if(!f.attributes[e]){return null;}return f.attributes[e].dataType;};b.prototype.getAttributeBusinessDataType=function(d,o,e){var f=this.loadObject(d,o,true,false);if(!f){return null;}if(!f.attributes[e]){return null;}return f.attributes[e].businessDataType;};b.prototype.getAttributeRuntimeName=function(d,o,e){var f=this.loadObject(d,o,true,false);if(!f){return null;}if(!f.attributes[e]){return null;}return f.attributes[e].runtimeName;};b.prototype.getAttributes=function(d,o){var e=[];var f=this.loadObject(d,o,true,false);if(f){var p=null;for(p in f.attributes){if(f.attributes.hasOwnProperty(p)){e.push(f.attributes[p]);}}}return e;};b.prototype.getAssociations=function(d,o,w){var e=[];var f;var g=this.loadObject(d,o,false,true);if(g){var p=null;for(p in g.associations){if(g.associations.hasOwnProperty(p)){f=g.associations[p];e.push(f);if(w){this.loadAssocAttr(f);}}}}return e;};b.prototype.getAssociation=function(d,o,e,w){var f=this.loadObject(d,o,false,true);if(!f){return null;}if(!f.associations[e]){return null;}var g=f.associations[e];if(g&&w){this.loadAssocAttr(g);}return g;};b.prototype.getAssociationIgnoreCase=function(d,o,e,w){var f=this.loadObjectIgnoreCase(d,o,false,true);if(!f){return null;}if(!f.associations[e]){return null;}var g=f.associations[e];if(g&&w){this.loadAssocAttr(g);}return g;};b.prototype.getAdvancedFunctions=function(d,s){var e=[];var l;if(arguments.length>1&&s){l=s;}else{l=null;}var f=this.loadVoca(d,false,false,false,false,false,false,true);if(f){var p=null;for(p in f.advancedFunctions){if(f.advancedFunctions.hasOwnProperty(p)&&(l===null||p.indexOf(l)===0)){e.push(this.getAdvancedFunction(d,p));}}}return{advancedFunctions:e};};b.prototype.getAdvancedFunction=function(d,p){var e=this.loadVoca(d,false,false,false,false,false,false,true);if(!e){return null;}if(!e.advancedFunctions[p]){return null;}var f=e.advancedFunctions[p];return f;};b.prototype.clearAll=function(){this.globalObjects=null;this.globalRuleAttributes=null;this.globalStaticRuleTemplateAttributes=null;this.globalDynamicRuleTemplateAttributes=null;this.globalStaticVocabularyAttributes=null;this.globalAttr=null;this.allVocaObjects.allAssocAttr=null;this.allVocaObjects.allAssoc=null;this.allVocaObjects.allObjects=null;this.allVocaObjects.allAttr=null;this.allVocaObjects.allActions=null;this.allVocaObjects.allOutputs=null;this.allVocaObjects.allAliases=null;this.allVocaObjects.allValueLists=null;this.allVocaObjects.allTerms=null;this.allVocaObjects.allTermsModifiers=null;this.allVocaObjects.allActionsStaticParams=null;this.allVocaObjects.allOutputsStaticParams=null;this.allVocaObjects.allActionsRequiredParams=null;this.allVocaObjects.allOutputsRequiredParams=null;this.allVocaObjects.allAdvancedFunctions=null;this.allVocaObjects.allVocabularies=null;};b.prototype.loadAllVocabularies=function(){if(this.allVocaObjects.allVocabularies){return;}this.rtContext.loadAllVocabularies(this.allVocaObjects);};b.prototype.loadVoca=function(d,l,e,f,g,h,i,j,k){this.loadAllVocabularies();if(!this.isVocabularyExist(d)){return null;}var m=this.allVocaObjects.allVocabularies[d];if(l&&m.objects===null){this.loadVocaObjects(m,k);}if(e&&m.actions===null){this.loadVocaActions(m);}if(f&&m.outputs===null){this.loadVocaOutputs(m);}if(g&&m.aliases===null){this.loadVocaAliases(m);}if(h&&m.valueLists===null){this.loadVocaValueLists(m);}if(i&&m.terms===null){this.loadVocaTerms(m);}if(j&&m.advancedFunctions===null){this.loadVocaAdvancedFunctions(m);}return m;};b.prototype.loadAllObjects=function(){if(this.allVocaObjects.allObjects){return;}this.rtContext.loadAllObjects(this.allVocaObjects);};b.prototype.addStaticRuleAssocs=function(d){var e=new a.AssocInfo('','',v.DO_RULE_TEMPLATE,v.DO_RULE_TEMPLATE,v.CARDINALITY_MANY_TO_ONE,null);e.attrs=[];e.attrs.push(new a.AssocAttrInfo('',v.ATT_RULE__TEMPLATE_ID,v.ATT_ID));d.associations[e.name]=e;var f=new a.AssocInfo('','',v.ASSOC_VOCABULARY,v.DO_VOCABULARY,v.CARDINALITY_MANY_TO_ONE,null);f.attrs=[];f.attrs.push(new a.AssocAttrInfo('',v.ATT_VOCABULARY,v.ATT_VOCA_FULL_NAME));d.associations[f.name]=f;};b.prototype.addStaticVocabularyAttributes=function(){if(this.globalStaticVocabularyAttributes){return;}this.globalStaticVocabularyAttributes={};this.globalStaticVocabularyAttributes[v.ATT_VOCA_SCOPE]=new a.AttrInfo('',v.ATT_VOCA_SCOPE,v.DO_VOCABULARY,v.VOCABULARY_COL_SCOPE,'','NVARCHAR','String',512,'Data',v.VOCABULARY_COL_SCOPE,null,null,null,null);this.globalStaticVocabularyAttributes[v.ATT_VOCA_FULL_NAME]=new a.AttrInfo('',v.ATT_VOCA_FULL_NAME,v.DO_VOCABULARY,v.VOCABULARY_COL_PATH_FULL_NAME,'','NVARCHAR','String',512,'Data',v.VOCABULARY_COL_PATH_FULL_NAME,null,null,null,null);};b.prototype.addStaticRuleTemplateAttributes=function(){if(this.globalStaticRuleTemplateAttributes){return;}this.globalStaticRuleTemplateAttributes={};this.globalStaticRuleTemplateAttributes[v.ATT_ID]=new a.AttrInfo('',v.ATT_ID,v.DO_RULE_TEMPLATE,r.COL_ID,'','CHAR','String',32,'Data',r.TABLE_RULE_TEMPLATE,null,null,null,null);this.globalStaticRuleTemplateAttributes[v.ATT_PACKAGE]=new a.AttrInfo('',v.ATT_PACKAGE,v.DO_RULE_TEMPLATE,r.COL_PACKAGE,'','NVARCHAR','String',256,'Data',r.TABLE_RULE_TEMPLATE,null,null,null,null);this.globalStaticRuleTemplateAttributes[v.ATT_NAME]=new a.AttrInfo('',v.ATT_NAME,v.DO_RULE_TEMPLATE,r.COL_NAME,'','NVARCHAR','String',256,'Data',r.TABLE_RULE_TEMPLATE,null,null,null,null);this.globalStaticRuleTemplateAttributes[v.ATT_DESC]=new a.AttrInfo('',v.ATT_DESC,v.DO_RULE_TEMPLATE,r.COL_DESCRIPTION,'','NVARCHAR','String',256,'Data',r.TABLE_RULE_TEMPLATE,null,null,null,null);this.globalStaticRuleTemplateAttributes[v.ATT_VOCABULARY]=new a.AttrInfo('',v.ATT_VOCABULARY,v.DO_RULE_TEMPLATE,r.COL_DEFAULT_VOCABULARY,'','NVARCHAR','String',256,'Data',r.TABLE_RULE_TEMPLATE,null,null,null,null);this.globalStaticRuleTemplateAttributes[v.ATT_OUTPUT]=new a.AttrInfo('',v.ATT_OUTPUT,v.DO_RULE_TEMPLATE,r.COL_OUTPUT,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null);};b.prototype.addDynamicRuleTemplateAttributes=function(){if(this.globalDynamicRuleTemplateAttributes){return;}this.globalDynamicRuleTemplateAttributes=this.rtContext.getDynamicRuleTemplateAttributes();};b.prototype.addStaticRuleAttributes=function(){this.globalRuleAttributes[v.ATT_ID]=new a.AttrInfo('',v.ATT_ID,v.DO_RULE,r.COL_ID,'','CHAR','String',32,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_PACKAGE]=new a.AttrInfo('',v.ATT_PACKAGE,v.DO_RULE,r.COL_PACKAGE,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_NAME]=new a.AttrInfo('',v.ATT_NAME,v.DO_RULE,r.COL_NAME,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_RULE__TEMPLATE_ID]=new a.AttrInfo('',v.ATT_RULE__TEMPLATE_ID,v.DO_RULE,r.COL_RULE_TEMPLATE_ID,'','CHAR','String',32,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_DESC]=new a.AttrInfo('',v.ATT_DESC,v.DO_RULE,r.COL_DESCRIPTION,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_RULE__STATUS]=new a.AttrInfo('',v.ATT_RULE__STATUS,v.DO_RULE,r.COL_STATUS,'','NVARCHAR','String',32,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_OUTPUT]=new a.AttrInfo('',v.ATT_OUTPUT,v.DO_RULE,r.COL_OUTPUT,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_SINGLE_CONSUMPTION]=new a.AttrInfo('',v.ATT_SINGLE_CONSUMPTION,v.DO_RULE,r.COL_SINGLE_CONSUMPTION,'','TINYINT','Boolean','Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_VOCABULARY]=new a.AttrInfo('',v.ATT_VOCABULARY,v.DO_RULE,r.COL_VOCABULARY,'','NVARCHAR','String',256,'Data',r.TABLE_RULE,null,null,null,null);this.globalRuleAttributes[v.ATT_MANUAL_ASSIGNMENT]=new a.AttrInfo('',v.ATT_MANUAL_ASSIGNMENT,v.DO_RULE,r.COL_MANUAL_ASSIGNMENT,'','TINYINT','Boolean',1,'Data',r.TABLE_RULE,null,null,null,null);};b.prototype.loadRuleAttributes=function(){if(this.globalRuleAttributes){return;}this.globalRuleAttributes={};this.addStaticRuleAttributes();};b.prototype.loadAllGlobalObjects=function(){if(this.globalObjects){return;}var g={};var d=new a.ObjectInfo(null,null,v.HRF_MODEL,'',v.DO_VOCABULARY,v.TABLE_VOCABULARY,this.rtContext.getHRFSchema());g[d.name]=d;d.associations={};var e=new a.ObjectInfo(null,null,v.HRF_MODEL,'',v.DO_RULE_TEMPLATE,r.TABLE_RULE_TEMPLATE,this.rtContext.getHRFSchema());g[e.name]=e;e.associations={};var f=new a.AssocInfo('','',v.DO_RULE,v.DO_RULE,v.CARDINALITY_ONE_TO_MANY,null);f.attrs=[];f.attrs.push(new a.AssocAttrInfo('',v.ATT_ID,v.ATT_RULE__TEMPLATE_ID));e.associations[f.name]=f;var h=new a.ObjectInfo(null,null,v.HRF_MODEL,'',v.DO_RULE,r.TABLE_RULE,this.rtContext.getHRFSchema());g[h.name]=h;h.associations={};this.addStaticRuleAssocs(h);var t=this.rtContext.getDefinedTemplates();var i,p,n,o;for(i=0;i<t.length;i++){p=t[i].pack;n=t[i].name;o=new a.ObjectInfo(null,null,v.RULE_TEMPLATE,'',n,u.makeGlobalObjectRTName(p,n),this.rtContext.getHRFSchema());g[o.name]=o;f=new a.AssocInfo('','',n,n,v.CARDINALITY_ONE_TO_ONE,null);f.attrs=[];f.attrs.push(new a.AssocAttrInfo('',v.ATT_ID,v.ATT_ID));h.associations[f.name]=f;}this.globalObjects=g;};b.prototype.loadAllActions=function(){if(this.allVocaObjects.allActions){return;}this.rtContext.loadAllActions(this.allVocaObjects);};b.prototype.loadAllAliases=function(){if(this.allVocaObjects.allAliases){return;}this.rtContext.loadAllAliases(this.allVocaObjects);};b.prototype.loadAllValueLists=function(){if(this.allVocaObjects.allValueLists){return;}this.rtContext.loadAllValueLists(this.allVocaObjects);};b.prototype.loadAllTerms=function(){if(this.allVocaObjects.allTerms){return;}this.rtContext.loadAllTerms(this.allVocaObjects);};b.prototype.loadAllTermModifiers=function(){if(this.allVocaObjects.allTermsModifiers){return;}this.rtContext.loadAllTermModifiers(this.allVocaObjects);};b.prototype.loadAllOutputs=function(){if(this.allVocaObjects.allOutputs){return;}this.rtContext.loadAllOutputs(this.allVocaObjects);};b.prototype.loadAllActionsStaticParams=function(){if(this.allVocaObjects.allActionsStaticParams){return;}this.rtContext.loadAllActionsStaticParams(this.allVocaObjects);};b.prototype.loadAllActionsRequiredParams=function(){if(this.allVocaObjects.allActionsRequiredParams){return;}this.rtContext.loadAllActionsRequiredParams(this.allVocaObjects);};b.prototype.loadAllOutputsRequiredParams=function(){if(this.allVocaObjects.allOutputsRequiredParams){return;}this.rtContext.loadAllOutputsRequiredParams(this.allVocaObjects);};b.prototype.loadAllOutputsStaticParams=function(){if(this.allVocaObjects.allOutputsStaticParams){return;}this.rtContext.loadAllOutputsStaticParams(this.allVocaObjects);};b.prototype.loadAllAdvancedFunctions=function(){if(this.allVocaObjects.allAdvancedFunctions){return;}this.rtContext.loadAllAdvancedFunctions(this.allVocaObjects);};b.prototype.loadVocaObjects=function(d,e){if(d.objects){return;}this.loadAllObjects();d.objects={};var f=d.scope!==v.GLOBAL;var i;for(i=0;i<this.allVocaObjects.allObjects.length;i++){if(d.id===this.allVocaObjects.allObjects[i].vocaId||(f&&(this.allVocaObjects.allObjects[i].scope===v.GLOBAL||this.allVocaObjects.allObjects[i].scope===d.scope))){d.objects[this.allVocaObjects.allObjects[i].name]=this.allVocaObjects.allObjects[i];}}this.loadAllGlobalObjects();if(!e){var p=null;for(p in this.globalObjects){if(this.globalObjects.hasOwnProperty(p)){d.objects[p]=this.globalObjects[p];}}}};b.prototype.loadVocaActions=function(d){if(d.actions){return;}this.loadAllActions();d.actions={};var e=d.scope!==v.GLOBAL;var i;for(i=0;i<this.allVocaObjects.allActions.length;i++){if(d.id===this.allVocaObjects.allActions[i].vocaId||(e&&(this.allVocaObjects.allActions[i].scope===v.GLOBAL||(this.allVocaObjects.allActions[i].scope===d.scope&&this.allVocaObjects.allActions[i].isPrivate===false)))){d.actions[this.allVocaObjects.allActions[i].name]=this.allVocaObjects.allActions[i];}}};b.prototype.loadVocaAliases=function(d){if(d.aliases){return;}this.loadAllAliases();u.loadAllAliases(d,this.allVocaObjects.allAliases,this.rtContext);};b.prototype.loadVocaTerms=function(d){if(d.terms){return;}this.loadAllTerms();this.loadAllTermModifiers();d.terms={};var e=d.scope!==v.GLOBAL;var m;var i,j;for(i=0;i<this.allVocaObjects.allTerms.length;i++){if(d.id===this.allVocaObjects.allTerms[i].vocaId||(e&&(this.allVocaObjects.allTerms[i].scope===v.GLOBAL||(this.allVocaObjects.allTerms[i].scope===d.scope&&this.allVocaObjects.allTerms[i].isPrivate===false)))){d.terms[this.allVocaObjects.allTerms[i].description]=this.allVocaObjects.allTerms[i];m={};for(j=0;j<this.allVocaObjects.allTermsModifiers.length;j++){if(this.allVocaObjects.allTermsModifiers[j].termId===this.allVocaObjects.allTerms[i].termId){m[this.allVocaObjects.allTermsModifiers[j].modifier]=true;}}d.terms[this.allVocaObjects.allTerms[i].description].modifiers=m;}}};b.prototype.loadVocaValueLists=function(d){if(d.valueLists){return;}this.loadAllValueLists();d.valueLists={};var e=d.scope!==v.GLOBAL;var i;for(i=0;i<this.allVocaObjects.allValueLists.length;i++){if(d.id===this.allVocaObjects.allValueLists[i].vocaId){d.valueLists[this.allVocaObjects.allValueLists[i].name]=this.allVocaObjects.allValueLists[i];}else if((e&&(this.allVocaObjects.allValueLists[i].scope===v.GLOBAL||(this.allVocaObjects.allValueLists[i].scope===d.scope)))){if(!d.valueLists[this.allVocaObjects.allValueLists[i].name]){d.valueLists[this.allVocaObjects.allValueLists[i].name]=this.allVocaObjects.allValueLists[i];}}}};b.prototype.loadVocaOutputs=function(d){if(d.outputs){return;}this.loadAllOutputs();d.outputs={};var e=d.scope!==v.GLOBAL;var i;for(i=0;i<this.allVocaObjects.allOutputs.length;i++){if(d.id===this.allVocaObjects.allOutputs[i].vocaId||(e&&(this.allVocaObjects.allOutputs[i].scope===v.GLOBAL||(this.allVocaObjects.allOutputs[i].scope===d.scope&&this.allVocaObjects.allOutputs[i].isPrivate===false)))){d.outputs[this.allVocaObjects.allOutputs[i].name]=this.allVocaObjects.allOutputs[i];}}};b.prototype.loadVocaAdvancedFunctions=function(d){if(d.advancedFunctions){return;}this.loadAllAdvancedFunctions();d.advancedFunctions={};var e=d.scope!==v.GLOBAL;var i;for(i=0;i<this.allVocaObjects.allAdvancedFunctions.length;i++){if(d.id===this.allVocaObjects.allAdvancedFunctions[i].vocaId||(e&&(this.allVocaObjects.allAdvancedFunctions[i].scope===v.GLOBAL||(this.allVocaObjects.allAdvancedFunctions[i].scope===d.scope&&this.allVocaObjects.allAdvancedFunctions[i].isPrivate===false)))){d.advancedFunctions[this.allVocaObjects.allAdvancedFunctions[i].name]=this.allVocaObjects.allAdvancedFunctions[i];}}};b.prototype.loadObject=function(d,o,l,e){var f;var g=this.loadVoca(d,true,false,false,false,false,false,false);if(!g){return null;}f=g.objects[o];if(!f){return null;}if(l){this.loadObjectAttributes(g,f);}if(e){this.loadObjectAssociations(f);}return f;};b.prototype.loadObjectIgnoreCase=function(d,o,l,e){var f=null;var g=this.loadVoca(d,true,false,false,false,false,false,false);if(!g){return null;}var h=null;for(h in g.objects){if(g.objects.hasOwnProperty(h)){if(h.toLowerCase()===o.toLowerCase()){f=g.objects[h];break;}}}if(!f){return null;}if(l){this.loadObjectAttributes(g,f);}if(e){this.loadObjectAssociations(f);}return f;};b.prototype.loadAssocAttr=function(d){if(d.attrs){return;}this.loadAllAssocAttr();d.attrs=[];var i;for(i=0;i<this.allVocaObjects.allAssocAttr.length;i++){if(d.id===this.allVocaObjects.allAssocAttr[i].assocId){d.attrs.push(this.allVocaObjects.allAssocAttr[i]);}}};b.prototype.loadAllAssocAttr=function(){if(this.allVocaObjects.allAssocAttr){return;}this.rtContext.loadAllAssocAttr(this.allVocaObjects);};b.prototype.loadObjectAssociations=function(o){if(o.associations){return;}o.associations={};if(o.vocaId){this.loadAllAssociations();var i;for(i=0;i<this.allVocaObjects.allAssoc.length;i++){if(o.id===this.allVocaObjects.allAssoc[i].objId){o.associations[this.allVocaObjects.allAssoc[i].name]=this.allVocaObjects.allAssoc[i];}}}else{this.addStaticRuleAssocs(o);}};b.prototype.loadObjectAttributes=function(d,o){if(o.attributes){return;}o.attributes={};var i;if(!o.vocaId){var e=null;var f;if(o.name===v.DO_VOCABULARY){this.addStaticVocabularyAttributes();for(e in this.globalStaticVocabularyAttributes){if(this.globalStaticVocabularyAttributes.hasOwnProperty(e)){f=this.globalStaticVocabularyAttributes[e];o.attributes[e]=f;}}}else if(o.name===v.DO_RULE){this.loadRuleAttributes();for(e in this.globalRuleAttributes){if(this.globalRuleAttributes.hasOwnProperty(e)){f=this.globalRuleAttributes[e];o.attributes[e]=f;}}}else if(o.name===v.DO_RULE_TEMPLATE){this.addStaticRuleTemplateAttributes();for(e in this.globalStaticRuleTemplateAttributes){if(this.globalStaticRuleTemplateAttributes.hasOwnProperty(e)){f=this.globalStaticRuleTemplateAttributes[e];o.attributes[e]=f;}}}else{this.addDynamicRuleTemplateAttributes();for(i=0;i<this.globalDynamicRuleTemplateAttributes.length;i++){f=this.globalDynamicRuleTemplateAttributes[i];if(o.name===f.objectName){o.attributes[f.name]=f;}}}}else{this.loadAllAttributes(d.name);for(i=0;i<this.allVocaObjects.allAttr.length;i++){if(o.id===this.allVocaObjects.allAttr[i].objId){o.attributes[this.allVocaObjects.allAttr[i].name]=this.allVocaObjects.allAttr[i];}}}};b.prototype.loadAllAssociations=function(){if(this.allVocaObjects.allAssoc){return;}this.rtContext.loadAllAssociations(this.allVocaObjects);};b.prototype.loadAllAttributes=function(){if(this.allVocaObjects.allAttr){return;}this.rtContext.loadAllAttributes(this.allVocaObjects);};return{vocabularyDataProvider:b};}());
