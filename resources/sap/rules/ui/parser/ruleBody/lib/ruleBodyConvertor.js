jQuery.sap.declare("sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.constants");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");jQuery.sap.require("sap.rules.ui.parser.infrastructure.util.utilsBase");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.valueHelpValidator");sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor=sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor||{};sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor.lib=(function(){var r=sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator.lib;var c=sap.rules.ui.parser.ruleBody.lib.constants.lib;var p=sap.rules.ui.parser.businessLanguage.lib.constants.lib;var u=new sap.rules.ui.parser.infrastructure.util.utilsBase.lib.utilsBaseLib();var v=sap.rules.ui.parser.businessLanguage.lib.valueHelpValidator.lib;function R(d){jQuery.sap.log.debug("CTOR - Rule Convertor");this.oDataRule=d;r.RuleBodyValidator.call(this);this.convertedRuleBody=null;this.decisionTableData=d?JSON.parse(JSON.stringify(d)):null;this.ruleValueHelpInfoArray=[];}R.prototype=Object.create(r.RuleBodyValidator.prototype);R.prototype.constructor=R;R.prototype.getConvertedData=function getConvertedData(b,d,e){b[e]=d;return b;};R.prototype.addParserResults=function addParserResults(b,d,s){var e={};e.status=s;if(d){e.converted=d;}u.setJsonValueAccordingPath(this.decisionTableData,b,c.decisionTableDataOutputPropEnum.parserResults,e);};R.prototype.hasParserConvertedExpression=function hasParserConvertedExpression(){if(this.currentParserResult.status===p.statusEnum.SUCCESS){if(!this.currentParserResult.hasOwnProperty(c.parserResultEnum.convertedExpression)){if(!this.flags[c.outputFlagsEnum.ASTOutput]){this.status=c.RULE_ERROR;}}else{return true;}}return false;};R.prototype.getParserConvertedExpression=function getParserConvertedExpression(){return this.currentParserResult[c.parserResultEnum.convertedExpression];};function m(b,d){var i=0;var j=0;var e=false;for(i=0;i<b.length;++i){e=false;for(j=0;j<d.length;++j){if(b[i]===d[j]){e=true;break;}}if(e===false){d.push(b[i]);}}}function a(e,b){var i=0;var d=-1;for(i=0;i<e.length;++i){d=v.getValueHelpIndexInInfoArray(e[i][p.propertiesEnum.id],b);if(d===-1){b.push(e[i]);}else{m(e[i][p.propertiesEnum.values],b[d][p.propertiesEnum.values]);}}}R.prototype.handleTextCondition=function handleTextCondition(b,d,e){r.RuleBodyValidator.prototype.handleTextCondition.call(this,b,d,e);if(this.status===c.RULE_SUCCESS&&this.hasParserConvertedExpression()){this.convertedRuleBody.content.condition=this.getParserConvertedExpression();}};R.prototype.handleTextOutputParameter=function handleTextOutputParameter(b,d,e){r.RuleBodyValidator.prototype.handleTextOutputParameter.call(this,b,d,e);if(this.status===c.RULE_SUCCESS&&this.hasParserConvertedExpression()){b.content=this.getParserConvertedExpression();}};R.prototype.handleTextActionParameter=function handleTextActionParameter(b,d,i,e){r.RuleBodyValidator.prototype.handleTextActionParameter.call(this,b,d,i,e);if(this.status===c.RULE_SUCCESS&&this.hasParserConvertedExpression()){b.content=this.getParserConvertedExpression();}};R.prototype.handleDecisionTableCondition=function handleDecisionTableCondition(h,b,d,e){var f,g;var i={};e=r.RuleBodyValidator.prototype.handleDecisionTableCondition.call(this,h,b,d,e);if(this.hasParserConvertedExpression()&&this.invalidHeaders[h.colID]!==true){f=this.getParserConvertedExpression();var o=h.hasOwnProperty(c.afterConversionParts.fixedOperator)?h.fixedOperator.operator:null;g=this.splitDecisionTableCondition(h.convertedExpression,f,o);if(this.flags[c.outputFlagsEnum.oDataOutput]){i=this.getConvertedData(i,g,c.decisionTableExpressionParts.content);this.addParserResults(b.row[d].inputModelPath,i,this.currentParserResult.status);}else if(this.status===c.RULE_SUCCESS){h.expression=h.convertedExpression;b.row[d].content=g;}}else if(this.flags[c.outputFlagsEnum.oDataOutput]){this.addParserResults(b.row[d].inputModelPath,null,p.statusEnum.ERROR);}if(this.flags[c.outputFlagsEnum.ASTOutput]&&this.currentParserResult.status===p.statusEnum.SUCCESS){i=this.getConvertedData(i,this.currentParserResult.model,c.decisionTableExpressionParts.astOutput);this.addParserResults(b.row[d].inputModelPath,i,this.currentParserResult.status);}if(this.flags[p.propertiesEnum.valueHelp]&&this.flags[p.propertiesEnum.valueHelp].hasOwnProperty(p.propertiesEnum.collectInfo)&&(this.flags[p.propertiesEnum.valueHelp][p.propertiesEnum.collectInfo]===true)&&(this.currentParserResult.status===p.statusEnum.SUCCESS)&&this.currentParserResult[p.propertiesEnum.valueHelp]){a(this.currentParserResult[p.propertiesEnum.valueHelp][p.propertiesEnum.info],this.ruleValueHelpInfoArray);}return e;};R.prototype.handleDecisionTableActionParameter=function handleDecisionTableActionParameter(h,b,d,e){e=r.RuleBodyValidator.prototype.handleDecisionTableActionParameter.call(this,h,b,d,e);if(this.status===c.RULE_SUCCESS&&this.hasParserConvertedExpression()){b.row[d].content=this.getParserConvertedExpression();}return e;};R.prototype.handleDecisionTableOutputParameter=function handleDecisionTableOutputParameter(h,b,d,e){var f={};var g;e=r.RuleBodyValidator.prototype.handleDecisionTableOutputParameter.call(this,h,b,d,e);if(this.hasParserConvertedExpression()&&this.invalidHeaders[h.colID]!==true){g=this.getParserConvertedExpression();if(this.flags[c.outputFlagsEnum.oDataOutput]){f=this.getConvertedData(f,g,c.decisionTableExpressionParts.content);this.addParserResults(b.row[d].inputModelPath,f,this.currentParserResult.status);}else if(this.status===c.RULE_SUCCESS){b.row[d].content=g;}}else if(this.flags[c.outputFlagsEnum.oDataOutput]){this.addParserResults(b.row[d].inputModelPath,null,p.statusEnum.ERROR);}if(this.flags[c.outputFlagsEnum.ASTOutput]&&this.currentParserResult.status===p.statusEnum.SUCCESS){f=this.getConvertedData(f,this.currentParserResult.model,c.decisionTableExpressionParts.astOutput);this.addParserResults(b.row[d].inputModelPath,f,this.currentParserResult.status);}return e;};R.prototype.handleConditionHeader=function handleConditionHeader(h){var b={};var d;r.RuleBodyValidator.prototype.handleConditionHeader.call(this,h);if(this.hasParserConvertedExpression()){d=this.getParserConvertedExpression();if(this.flags[c.outputFlagsEnum.oDataOutput]){b=this.getConvertedData(b,d,c.decisionTableExpressionParts.expression);this.addParserResults(h.inputModelPath,b,this.currentParserResult.status);h.convertedExpression=d;}else if(this.status===c.RULE_SUCCESS){h.convertedExpression=d;}}else if(this.flags[c.outputFlagsEnum.oDataOutput]){this.addParserResults(h.inputModelPath,null,this.currentParserResult.status);}if(this.flags[c.outputFlagsEnum.ASTOutput]&&this.currentParserResult.status===p.statusEnum.SUCCESS){b=this.getConvertedData(b,this.currentParserResult.model,c.decisionTableExpressionParts.astOutput);this.addParserResults(h.inputModelPath,b,this.currentParserResult.status);}if(this.flags[p.propertiesEnum.valueHelp]&&this.flags[p.propertiesEnum.valueHelp].hasOwnProperty(p.propertiesEnum.collectInfo)&&(this.flags[p.propertiesEnum.valueHelp][p.propertiesEnum.collectInfo]===true)&&(this.currentParserResult.status===p.statusEnum.SUCCESS)&&this.currentParserResult[p.propertiesEnum.valueHelp]){a(this.currentParserResult[p.propertiesEnum.valueHelp][p.propertiesEnum.info],this.ruleValueHelpInfoArray);}};R.prototype.finalizeResult=function finalizeResult(b){var i;if(!this.flags[c.outputFlagsEnum.oDataOutput]){for(i=0;i<b.content.headers.length;i++){if(b.content.headers[i].hasOwnProperty(c.parserResultEnum.convertedExpression)){delete b.content.headers[i].convertedExpression;}}}};R.prototype.initFlags=function initFlags(f){r.RuleBodyValidator.prototype.initFlags.call(this,f);if(f!==null&&f!==undefined){if(f.hasOwnProperty(c.outputFlagsEnum.conversionOutput)){this.flags[c.outputFlagsEnum.conversionOutput]=f[c.outputFlagsEnum.conversionOutput];}else if(f.hasOwnProperty(c.outputFlagsEnum.locale)&&f[c.outputFlagsEnum.locale].hasOwnProperty(c.localeEnum.convert)&&f[c.outputFlagsEnum.locale][c.localeEnum.convert]){this.flags[c.outputFlagsEnum.locale]=f[c.outputFlagsEnum.locale];}if(f.hasOwnProperty(p.propertiesEnum.termMode)&&f[p.propertiesEnum.termMode].hasOwnProperty(p.propertiesEnum.convert)&&f[p.propertiesEnum.termMode][p.propertiesEnum.convert]){this.flags[p.propertiesEnum.termMode]=f[p.propertiesEnum.termMode];}if(this.oDataRule){this.flags[c.outputFlagsEnum.oDataOutput]=true;}else{this.flags[c.outputFlagsEnum.oDataOutput]=false;}this.flags[c.outputFlagsEnum.ASTOutput]=f.hasOwnProperty(c.outputFlagsEnum.ASTOutput)?f[c.outputFlagsEnum.ASTOutput]:false;if(f&&f.hasOwnProperty(p.propertiesEnum.valueHelp)){this.flags[p.propertiesEnum.valueHelp]={};this.flags[p.propertiesEnum.valueHelp]=f[p.propertiesEnum.valueHelp];}}};R.prototype.convert=function convert(b,d,e,f,o,g,t){this.convertedRuleBody=JSON.parse(JSON.stringify(b));var h=this.validateBusinessRule(this.convertedRuleBody,d,e,f,o,g,t);if(this.ruleValueHelpInfoArray.length>0){h[p.propertiesEnum.valueHelp]={};h[p.propertiesEnum.valueHelp][p.propertiesEnum.info]=this.ruleValueHelpInfoArray;}if(this.flags[c.outputFlagsEnum.oDataOutput]){h.decisionTableData=this.decisionTableData;}else{if(this.status===c.RULE_SUCCESS){h.convertedRuleBody=this.convertedRuleBody;}else{h.convertedRuleBody=null;}}return h;};return{RuleBodyConvertor:R};}());
