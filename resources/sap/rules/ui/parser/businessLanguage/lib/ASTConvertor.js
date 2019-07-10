jQuery.sap.declare("sap.rules.ui.parser.businessLanguage.lib.ASTConvertor");jQuery.sap.require("sap.rules.ui.parser.businessLanguage.lib.constants");jQuery.sap.require("sap.rules.ui.parser.AST.lib.bundleAst");sap.rules.ui.parser.businessLanguage.lib.ASTConvertor=sap.rules.ui.parser.businessLanguage.lib.ASTConvertor||{};sap.rules.ui.parser.businessLanguage.lib.ASTConvertor.lib=(function(){var p=sap.rules.ui.parser.businessLanguage.lib.constants.lib;var b=RulesAPI_Ast;var a=b.astNodes;var A="all";var E="exists in";var N="not exists in";var B="between";var c="not between";d.operatorsMap={'+':a.BinaryExprNode.operator.plus,'-':a.BinaryExprNode.operator.minus,'*':a.BinaryExprNode.operator.mult,'/':a.BinaryExprNode.operator.div,'and':a.LogicalExprNode.operator.and,'or':a.LogicalExprNode.operator.or,'=':a.RelationalExprNode.operator.isEqual,'is equal to':a.RelationalExprNode.operator.isEqual,'!=':a.RelationalExprNode.operator.isNotEqual,'is not equal to':a.RelationalExprNode.operator.isNotEqual,'>':a.RelationalExprNode.operator.isGreater,'is greater than':a.RelationalExprNode.operator.isGreater,'>=':a.RelationalExprNode.operator.isGreaterEqual,'is greater equal than':a.RelationalExprNode.operator.isGreaterEqual,'<':a.RelationalExprNode.operator.isLess,'is less than':a.RelationalExprNode.operator.isLess,'<=':a.RelationalExprNode.operator.isLessEqual,'is less equal than':a.RelationalExprNode.operator.isLessEqual,'average':a.AggFunctionNode.aggFunction.avg,'count':a.AggFunctionNode.aggFunction.count,'count distinct':a.AggFunctionNode.aggFunction.countDistinct,'max':a.AggFunctionNode.aggFunction.max,'min':a.AggFunctionNode.aggFunction.min,'sum':a.AggFunctionNode.aggFunction.sum,'contains':a.FunctionNode.functionName.contains,'not contains':a.FunctionNode.functionName.notContains,'ends':a.FunctionNode.functionName.endsWith,'not ends':a.FunctionNode.functionName.notEndsWith,'exists in':a.FunctionNode.functionName.existsIn,'not exists in':a.FunctionNode.functionName.notExistsIn,'between':a.FunctionNode.functionName.isBetween,'not between':a.FunctionNode.functionName.isNotBetween,'is in the last':a.FunctionNode.functionName.isInTheLast,'is not in the last':a.FunctionNode.functionName.isNotInTheLast,'is in the next':a.FunctionNode.functionName.isInTheNext,'is not in the next':a.FunctionNode.functionName.isNotInTheNext,'is like':a.FunctionNode.functionName.isLike,'is not like':a.FunctionNode.functionName.isNotLike,'starts':a.FunctionNode.functionName.startsWith,'not starts':a.FunctionNode.functionName.notStartsWith,'concatenate':a.FunctionNode.functionName.concatenate};function d(o){var h;var e;var f;var g;var j;var k;var l;var m;this.newAST={};this.lastAggrNode=null;function n(i,K,L){if(L){return new a.UOMLiteralNode(L.value,i,L.constant);}return new a.LiteralNode(K,i);}function q(i){var K=null;if(i.hasOwnProperty("getCompoundValue")){K=i.getCompoundValue();}return K;}function r(i){var K=i.getValue();var L=i.getValueType();var M=q(i);return n.call(this,L,K,M);}function s(i){var K={};K.businessType=i.getAttributeType();K.isCollection=i.getIsCollection();K.rootObject=i.getRootObject();K.attribute=i.getAttribute();K.associations=i.getAssociationsArray();K.modifiers=i.getModifiers();return K;}function t(i){var K=null;var L=s(i);K=new a.IdentifierNode(L);return K;}function u(K,L){var i;var M=[];var O;var P=null;M.push(L);for(i=0;i<K.valuesArray.length;i++){O=K.valuesArray[i];P=g.call(this,O);M.push(P);}return M;}function v(i,K,L){var M=null;if(L&&L.value){switch(L.value){case N:case E:case B:case c:M=u.call(this,i,K);break;}}return M;}function w(i,K,L){var M=null;var O=i.getType();if(O===p.objectNamesEnum.setOfValues){M=v.call(this,i,K,L);}return M;}function x(i){var K;var L=false;K=i.getType();if(K===p.objectNamesEnum.setOfValues){L=true;}return L;}function y(i){var K=null;if(i.hasOwnProperty("getQuantity")===true&&i.getQuantity()!==null){K=r.call(this,i.getQuantity());}return K;}function z(K){var i;var L=null;var M=[];if(K.hasOwnProperty("getGroupByArray")&&K.getGroupByArray()!==null){L=new a.GroupClauseNode();M=K.getGroupByArray();for(i=0;i<M.length;i++){L.addChild(t.call(this,M[i]));}}return L;}function C(i){var K=null;var L=null;if(i.hasOwnProperty("getOrderBy")===true&&i.getOrderBy()!==null){L=t.call(this,i.getOrderBy());}if(L){if(i.hasOwnProperty("getOperator")&&i.getOperator()!==null){K=new a.OrderClauseNode(i.getOperator().getOriginalValue());}else{K=new a.OrderClauseNode(null);}K.addChild(L);}return K;}function D(i,K){var L=null;var M=null;var O=null;var P=null;var Q=null;L=t.call(this,i.getNavigationPredicateDetails());this.lastAggrNode.addChild(L);if(i.hasOwnProperty("getFilterClause")){M=new a.FilterClauseNode();M.addChild(e.call(this,i.getFilterClause()));L.addChild(M);}if(K!==null){O=z.call(this,K);if(O){this.lastAggrNode.addChild(O);}Q=C.call(this,K);if(Q){L.addChild(Q);}P=y.call(this,K);if(P){L.addChild(P);}}return this.lastAggrNode;}function F(i){var K;var L=null;if(i!==null){K=i.getType();if(i.hasOwnProperty("getOriginalValue")){L=i.getOriginalValue().toLowerCase();}else{if(K===p.objectNamesEnum.collectionOperatorOption){L="collect";}else if(i.getAggregationOperator().getValue()!==A){L=i.getAggregationOperator().getValue().toLowerCase();}}}return L;}k=function(i){var K=null;var L=null;var M=null;var O=null;var P=null;var Q=null;var R=null;var S;if(i.hasOwnProperty("getAggregationOption")){R=i.getAggregationOption();Q=F(R);if(Q!==null){O=new a.AggFunctionNode(d.operatorsMap[Q]);this.lastAggrNode=O;}}if((Q===null||Q==="collect")&&(i.hasOwnProperty("getSelection")&&i.getSelection()!==null)){S=i.getSelection();}else{if(i.hasOwnProperty("getCompoundSelection")&&i.getCompoundSelection()!==null){K=k.call(this,i.getCompoundSelection());if(O&&!(K instanceof a.AggFunctionNode)){O.addChild(K);return O;}return K;}S=i.getSelection();}if(S.hasOwnProperty("getFilterClause")||(R!==null&&R.hasOwnProperty("getGroupByArray")&&R.getGroupByArray()!==null)){return D.call(this,S,R);}P=t.call(this,S.getNavigationPredicateDetails());if(O){O.addChild(P);}if(R!==null&&P){M=C.call(this,R);L=y.call(this,R);if(M){P.addChild(M);}if(L){P.addChild(L);}}if(O){return O;}return P;};j=function(i){var K=i.getType();var L=null;switch(K){case p.objectNamesEnum.simpleSelection:L=r.call(this,i);break;case p.objectNamesEnum.compoundSelection:L=k.call(this,i,null);break;}return L;};g=function(K){var L=0;var M=null;var O;var P;var i=0;var Q;if(Array.isArray(K.selectionsArray)){L=K.selectionsArray.length;Q=K.selectionsArray[i].getType();if(Q===p.objectNamesEnum.selectionClause){O=g.call(this,K.selectionsArray[i]);i++;}else{O=j.call(this,K.selectionsArray[i]);i++;}while(i<L){M={};M.value=K.selectionsArray[i].getValue().trim();M.type=K.selectionsArray[i].getType();i++;Q=K.selectionsArray[i].getType();if(Q===p.objectNamesEnum.selectionClause){P=g.call(this,K.selectionsArray[i]);i++;}else{P=j.call(this,K.selectionsArray[i]);i++;}O=l.call(this,O,P,M);}return O;}return null;};var G=function G(i){return(i==='>'||i==='<'||i==='='||i==='!='||i==='>='||i==='<=');};l=function l(K,L,M){var O;var i;if(M&&M.type&&M.value){if(M.type===p.objectNamesEnum.arithmeticOperator){if(K!==null&&L!==null){O=new a.BinaryExprNode(d.operatorsMap[M.value]);}else{if(K===null&&L!==null){O=new a.UnaryExprNode(d.operatorsMap[M.value]);}}}else if(M.type===p.objectNamesEnum.operatorOption){if(G(M.value)){O=new a.RelationalExprNode(d.operatorsMap[M.value]);}else{O=new a.FunctionNode(d.operatorsMap[M.value]);}}else{O=new a.LogicalExprNode(d.operatorsMap[M.value]);}}if(K!==null){if(O){if(Array.isArray(K)){for(i=0;i<K.length;i++){O.addChild(K[i]);}}else{O.addChild(K);}}else{return K;}}if(L!==null){if(O){if(Array.isArray(L)){for(i=0;i<L.length;i++){O.addChild(L[i]);}}else{O.addChild(L);}}else{return L;}}return O;};f=function f(i){var K=null,L=null;var M=null,O=null;var P=null;if(i.hasOwnProperty("getSelectionOperator")){P={};P.value=i.getSelectionOperator().getValue().trim();P.type=i.getSelectionOperator().getType();}L=i.getLeftSelectionClause();O=g.call(this,L);if(i.hasOwnProperty("getRightSelectionClause")){K=i.getRightSelectionClause();if(K.getType()===p.objectNamesEnum.complexStatement){M=new a.BracketsExprNode();M.addChild(e.call(this,K.getModel()));}else if(x(K)){O=w.call(this,K,O,P);}else{M=g.call(this,K);}}return l.call(this,O,M,P);};h=function h(i){var K=i.getType();var L=null;var M=null;var O=null;switch(K){case p.objectNamesEnum.simpleStatement:L=f.call(this,i);break;case p.objectNamesEnum.complexStatement:M=m.call(this,i.getModel().statementsArray,O);L=new a.BracketsExprNode();L.addChild(M);break;}return L;};var H=function handleLogicalStatements(K,L){var i;var M=[];var O=null;var P=null;var Q=null;var R=[];for(i=1;i<L.length;i=i+2){P=O?O.value:null;O={};O.value=L[i].getValue().trim();O.type=L[i].getType();Q=h.call(this,L[i+1]);if(O.value===p.STATEMENT_OPERATOR.OR.string){M.push(K);K=Q;}else if(O.value===p.STATEMENT_OPERATOR.AND.string){if(P===null||O.value!==P){R=[];R.push(K);R.push(Q);K=R;}else{K.push(Q);}}}if(M.length===0&&Array.isArray(K)&&K.length>0){M.push(K);}return M;};var I=function I(i){var K=new a.LogicalExprNode(d.operatorsMap[p.STATEMENT_OPERATOR.AND.string]);var L;for(L=0;L<i.length;L++){K.addChild(i[L]);}return K;};var J=function J(i){var K;var L;var M=i.length;var O=null;if(M>1){O=new a.LogicalExprNode(d.operatorsMap[p.STATEMENT_OPERATOR.OR.string]);for(K=0;K<M;K++){if(Array.isArray(i[K])){L=I.call(this,i[K]);O.addChild(L);}else{O.addChild(i[K]);}}}else{if(Array.isArray(i[0])){L=I.call(this,i[0]);O=L;}}return O;};m=function m(i,K){var L=0;var M=null;var O=[];if(Array.isArray(i)){L=i.length;M=h.call(this,i[0]);if(L>1){O=H.call(this,M,i);M=J.call(this,O);}}return M;};e=function e(i){return m.call(this,i.statementsArray,null);};this.newAST=o?e.call(this,o):null;}d.prototype.getSerializeAST=function getSerializeAST(){var s;s=this.newAST?this.newAST.serialize():"";return s;};d.prototype.getAST=function getAST(){return this.newAST;};return{ASTConvertor:d};}());