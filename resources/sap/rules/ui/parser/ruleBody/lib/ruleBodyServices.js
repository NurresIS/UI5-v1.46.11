jQuery.sap.declare("sap.rules.ui.parser.ruleBody.lib.ruleBodyServices");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.constants");sap.rules.ui.parser.ruleBody.lib.ruleBodyServices=sap.rules.ui.parser.ruleBody.lib.ruleBodyServices||{};sap.rules.ui.parser.ruleBody.lib.ruleBodyServices.lib=(function(){var r=sap.rules.ui.parser.ruleBody.lib.ruleBodyValidator.lib;var a=sap.rules.ui.parser.ruleBody.lib.ruleBodyConvertor.lib;var b=sap.rules.ui.parser.ruleBody.lib.constants.lib;function R(){}R.prototype.convert=function convert(c,v,d,f,o,p){var e=new a.RuleBodyConvertor();return e.convert(c,v,d,f,o,p,null);};R.prototype.validate=function validate(c,v,d,f,o,p){var e=new r.RuleBodyValidator();return e.validateBusinessRule(c,v,d,f,o,p,null);};R.prototype.process=function process(c,v,d,f,o,p,D){var e=null;function i(f){if(f&&(f.hasOwnProperty(b.outputFlagsEnum.ASTOutput)||f.hasOwnProperty(b.outputFlagsEnum.conversionOutput)||(f.hasOwnProperty(b.outputFlagsEnum.locale)&&f[b.outputFlagsEnum.locale].hasOwnProperty(b.localeEnum.convert)&&f[b.outputFlagsEnum.locale][b.localeEnum.convert]))){return true;}return false;}if(i(f)){var g=new a.RuleBodyConvertor(D);e=g.convert(c,v,d,f,o,p,null);}else{var h=new r.RuleBodyValidator();e=h.validateBusinessRule(c,v,d,f,o,p,null);}return e;};R.prototype.parseRootObjectContext=function parseRootObjectContext(c,d,o,v,e){var f={};f[b.ODATA_FORMAT_PAYLOAD]={};f[b.ODATA_FORMAT_PAYLOAD][b.RULE_ID]=c;f[b.outputFlagsEnum.validationOutput]=false;f[b.outputFlagsEnum.rootObjectContextOutput]=true;return this.process(d,v,e,f,o,null);};return{RuleBodyServicesLib:R};}());