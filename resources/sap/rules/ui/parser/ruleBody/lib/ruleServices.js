jQuery.sap.declare("sap.rules.ui.parser.ruleBody.lib.ruleServices");jQuery.sap.require("sap.rules.ui.parser.infrastructure.messageHandling.lib.responseCollector");jQuery.sap.require("sap.rules.ui.parser.resources.common.lib.resourcesConvertor");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderInitiator");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.constants");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.ruleBodyServices");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.decisionTableCell");jQuery.sap.require("sap.rules.ui.parser.ruleBody.lib.constants");jQuery.sap.require("sap.rules.ui.parser.resources.common.lib.oDataHandler");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");sap.rules.ui.parser.ruleBody.lib.ruleServices=sap.rules.ui.parser.ruleBody.lib.ruleServices||{};sap.rules.ui.parser.ruleBody.lib.ruleServices.lib=(function(){var R=sap.rules.ui.parser.infrastructure.messageHandling.lib.responseCollector.lib.ResponseCollector;var r=R.getInstance();var a=sap.rules.ui.parser.resources.common.lib.resourcesConvertor.lib;var v=sap.rules.ui.parser.resources.vocabulary.lib.constants.lib;var b=sap.rules.ui.parser.resources.vocabulary.lib.vocabularyDataProviderInitiator.lib;var c=new b.vocaDataProviderInitiatorLib();var d=sap.rules.ui.parser.ruleBody.lib.ruleBodyServices.lib;var e=new d.RuleBodyServicesLib();var f=sap.rules.ui.parser.ruleBody.lib.constants.lib;var g=sap.rules.ui.parser.ruleBody.lib.decisionTableCell.lib;var D=sap.rules.ui.parser.resources.common.lib.oDataHandler.lib;var p=sap.rules.ui.parser.businessLanguage.lib.constants.lib;var O="rule";var h="rules";var k="id";var l="content";var m="name";var n="parameters";var o="usage";var q="RESULT";var s="flags";var t=function(i,j){var J=D.getOdataPropName(i,j);var K=null;if(J){K=i[J];}return K;};var u=function(i,j){var J=null;var K=null;J={"connection":null,"resourceID":i,"vocaLoadingType":v.vocaContextTypeEnum.JSON,"resourceContent":j,"termModes":["byName"]};K=c.init(J);return K;};var w=function(i){var j=null;var J=i;if((J=t(J,f.EXECUTION_CONTEXT))&&(J=t(J,f.RESULT_DATA_OBJECT_ID))){j=J;}return j;};var x=function(j){var i=0;var J=null;var K=null;var L=null;var M=w(j);var N=j;if((N=t(N,f.VOCABULARY))&&(N=t(N,f.RULE_CONTENT))&&(N=t(N,f.DATA_OBJECTS))){var P=N;for(i=0;i<P.length;i++){J=P[i];if((N=t(J,f.ID))===M&&(N=t(J,o))===q){return true;}}}N=t(j,f.ID);L={"type":f.additionalInfoTypeEnum.executionContext};K=[M,N];r.addMessage("result_data_object_of_the_rule_services_is_not_valid",K,null,L);return false;};var y=function(j,J){var i=0;var K=null;var L=null;var M=null;var N=null;var P=null;var Q=null;var S=null;var T=t(j,f.ID);var U=w(j);var V=t(j,f.RULES);if(U&&V){L=V;for(i=0;i<L.length;i++){K=L[i];if((V=t(K,f.RULE_CONTENT))&&(V=t(V,f.RESULT_DATA_OBJECT_ID))){P=V;if(P===U){continue;}if((Q=t(K,k))&&(V=t(K,f.RULE_CONTENT))&&(S=t(V,m))){J[Q]=S;}N={"ruleID":K[k],"type":f.additionalInfoTypeEnum.ruleResult};M=[P,Q,U,T];r.addMessage("result_data_object_of_the_rule_is_not_valid",M,null,N);}}}};var z=function(J,K){var i=0;var j=0;var L=true;var M=null;var N=[];var P=[];var Q=null;var S=null;var T=K.getParameters()||[];var U=t(J,f.EXECUTION_CONTEXT);var V=t(U,n)||[];var W=t(J,f.ID);U=t(J,f.VOCABULARY);var X=t(U,f.ID);for(i=0;i<T.length;i++){M=T[i][f.ATTRIBUTES]||[];for(j=0;j<M.length;j++){N.push(M[j][f.PARAMETER_NAME]);}}for(i=0;i<V.length;i++){P.push(t(V[i],m));}for(i=0;i<N.length;i++){if(P.indexOf(N[i])===-1){L=false;S={"type":f.additionalInfoTypeEnum.executionContext};Q=[N[i],X,W];r.addMessage("execution_context_parameter_of_the_rule_services_is_not_valid",Q,null,S);break;}}return L;};var A=function(i,j,J){var K={};var L=false;var M=false;J=J||{};K[f.RULE_STATUS]=f.RULE_ERROR;L=x(i);if(L){M=z(i,j);if(M){y(i,J);if(Object.keys(J).length===0){K[f.RULE_STATUS]=f.RULE_SUCCESS;}}}return K;};var B=function(i,j){if(!j){j={};}j[f.ODATA_FORMAT_PAYLOAD]={};j[f.ODATA_FORMAT_PAYLOAD][f.RULE_ID]=i;j[f.outputFlagsEnum.validationOutput]=false;j[f.outputFlagsEnum.rootObjectContextOutput]=true;};var C=function C(i,j,J,K,L,M,N,P){var Q=new g.DecisionTableCell(i,j,J,K,L,M);var S=Q.validateAndConvert(P,N);return S;};var E=function(i,j,J,K){var L=null;var M=null;var N=null;K=K||{};L=a.convertRuleODataToInternalModel(i,null);M=L[f.EXPLICIT_OUTPUT];B(t(i,k),K);N=e.process(L.ruleBody,j,J,K,M,null,i);return N;};var F=function(j,J,K){var i=0;var L=t(j,h);var M=null;var N=null;var P={};var Q={};var S=null;P=A(j,K,Q);if(!(P[f.RULE_STATUS]===f.RULE_ERROR&&Object.keys(Q).length===0)){for(i=0;i<L.length;i++){M=L[i];S=t(M,k);if(!Q[S]){N=E(t(M,l),J,K,null);if(N[f.RULE_STATUS]===f.RULE_ERROR){P=N;}}}}return P;};var G=function(i){var j=null;var J={};var K=null;var L=null;var M=null;var N=t(i,O);var P=t(N,l);var Q=t(i,f.VOCABULARY);if(!Q){r.addMessage("voca_is_missing_in_the_payload",[],null,null);J[f.RULE_STATUS]=f.RULE_ERROR;}else{L=t(Q,l);j=t(L,k);M=t(i,s);K=u(j,L);J=E(P,j,K,M);}return J;};var H=function(i){var j=null;var J=null;var K={};var L=null;var M=t(i,f.VOCABULARY);if(!M){r.addMessage("voca_is_missing_in_the_payload",[],null,null);K[f.RULE_STATUS]=f.RULE_ERROR;}else{J=t(M,l);j=t(J,k);L=u(j,J);K=F(i,j,L);}return K;};var I=function(){return p.PARSER_EXPR_LANG_VERSION;};return{executeRuleValidation:G,executeRuleServiceValidation:H,validateRuleService:F,validateDecisionTableExpression:C,validateRule:E,validateExecutionContext:A,getParserExprLangVersion:I};}());
