jQuery.sap.declare("sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils");jQuery.sap.require("sap.rules.ui.parser.resources.vocabulary.lib.constants");sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects=sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects||{};sap.rules.ui.parser.resources.vocabulary.lib.vocaObjects.lib=(function(){var u=sap.rules.ui.parser.resources.vocabulary.lib.runtimeServicesUtils.lib;u=new u.runtimeServicesUtilsLib();var v=sap.rules.ui.parser.resources.vocabulary.lib.constants.lib;function V(i,o,s,p,q,r,t,w,x,y){this.id=i;this.name=o;this.suffix=s;this.isWritable=u.getIsWritable(q);this.objects=null;this.actions=null;this.outputs=null;this.aliases=null;this.valueLists=null;this.terms=null;this.advancedFunctions=null;this.scope=u.getScope(p,r,o);this.isPrivate=u.getIsPrivate(p,r);this.isValueListConverted=u.getIsValueListConverted(t);this.vocaPackage=w;this.vocaShortName=x;this.versionId=y;}function O(i,o,s,p,q,r,t,w,x,y,z){this.vocaId=i;this.vocaName=o;this.source=s;this.id=p;this.name=q;this.runtimeName=r;this.schema=t;this.associations=null;this.attributes=null;this.origSource=r;this.description=y;this.runtimeType=z;this.scope=u.getScope(w,x,o);this.isPrivate=u.getIsPrivate(w,x);}function A(i,o,p,q,r,s,t,w,x,y){this.vocaId=i;this.vocaName=o;this.id=p;this.name=q;this.libPath=r;this.libName=s;this.staticParams=null;this.requiredParams=null;this.description=y;this.scope=u.getScope(t,w,o);this.isPrivate=u.getIsPrivate(t,w);this.isValueListConverted=u.getIsValueListConverted(x);}function a(i,o,p,q,s,r,t,w){this.vocaId=i;this.vocaName=o;this.id=p;this.name=q;this.staticParams=null;this.requiredParams=null;this.description=w;this.scope=u.getScope(s,r,o);this.isPrivate=u.getIsPrivate(s,r);this.isValueListConverted=u.getIsValueListConverted(t);}function b(i,o,p,q,r,s,t,w,x,y,z,B,C,D){this.vocaId=i;this.vocaName=o;this.id=p;this.name=q;this.businessDT=s;this.isCollection=u.getFromDigitToBoolean(t);this.content=u.getContent(r,y);this.scope=u.getScope(w,x,o);this.isPrivate=u.getIsPrivate(w,x);this.type=u.getAliasType(y);this.description=z;this.externalMetadata=JSON.parse(B);this.renderingData=JSON.parse(C);this.isValueListConverted=u.getIsValueListConverted(D);}function c(i,o,p,q,s,r){this.vocaId=i;this.vocaName=o;this.name=p;this.businessDataType=q;this.scope=u.getScope(s,r,o);this.isPrivate=u.getIsPrivate(s,r);}function I(i,o,p,q,s,r,t,w,x,y,z,B,C,D){c.call(this,i,o,q,w,B,C);this.id=p;this.schema=s;this.runtimeName=r;this.dataType=t;this.size=x;this.valueColumn=y;this.descriptionColumn=z;this.runtimeType=D;}I.prototype=Object.create(c.prototype);I.prototype.constructor=I;function E(i,o,p,q,s,r,t){c.call(this,i,o,p,q,s,r);this.metadata=t;}E.prototype=Object.create(c.prototype);E.prototype.constructor=E;function T(i,o,t,p,q,r,s,w,x,y,z,B){this.vocaName=o;this.vocaId=i;this.termId=t;this.description=p;this.expression=q;this.businessDataType=r;this.context=x;this.scope=u.getScope(y,z,o);this.isCollection=u.getFromDigitToBoolean(s);this.isConditionalContext=u.getFromDigitToBoolean(w);this.isPrivate=u.getIsPrivate(y,z);this.isDeprecated=u.getIsDeprecatedFromDigit(B);}function d(t,i,o){this.termId=t;this.modifier=i;this.id=o;}function e(o,i,p,r,q,s,t,w,x,y,z,B,C,D,F){this.objId=o;this.name=i;this.objectName=p;this.runtimeName=r;this.description=q;this.dataType=s;this.businessDataType=t;this.size=w;this.sourceType=x;this.objectRuntimeName=y;this.origSource=r;this.vocaName=z;this.scope=u.getScope(B,C,i);this.isPrivate=u.getIsPrivate(B,C);this.valueListName=D;this.id=F;}function f(o,i,p,t,q,r,s){this.objId=o;this.id=i;this.name=p;if(s){this.description=s;}this.target=t;this.cardinality=q;this.vocaName=r;this.attrs=null;}function g(i,s,t,o,p){this.assocId=i;this.source=s;this.target=t;this.objId=o;this.id=p;}function P(o,p,s,q,r,t,w,x,y,z,B,C,D){function F(J,K,L){var G={};G.parameterName=J;G.targetAttribute=K;G.parameterType=L;return G;}var i;if(!x||((!x.hasOwnProperty(v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_FILTERS)||x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_FILTERS].length===0)&&(!x.hasOwnProperty(v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_INPUT)||x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_INPUT].length===0))){return;}var G;var H;this.targetDataObject=r;if(x.hasOwnProperty(v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_FILTERS)===true){for(i=0;i<x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_FILTERS].length;i++){H=x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_FILTERS][i];if(!this.attributes){this.attributes=[];}G=F(H.parameterName,H.column,v.parameterType.FILTER);this.attributes.push(G);}}if(x.hasOwnProperty(v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_INPUT)===true){for(i=0;i<x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_INPUT].length;i++){H=x[v.PROPERTY_NAME_OM_MAPPING_INFO_PARAMETERS_INPUT][i];if(!this.attributes){this.attributes=[];}G=F(H.parameterName,H.viewParameterName,v.parameterType.INPUT);this.attributes.push(G);}}}function h(i,o,p,q,s,r){this.id=i;this.name=o;this.vocaId=p;this.vocaName=q;this.scope=u.getScope(s,r,q);this.isPrivate=u.getIsPrivate(s,r);}function j(i,o,p,q){this.id=q;this.actionId=i;this.name=o;this.mapping=p;}function k(i,o,p,s,q,r){this.id=r;this.actionId=i;this.name=o;this.dataType=p;this.size=s;this.businessDataType=q;}function l(o,i,p,q){this.id=q;this.outputId=o;this.name=i;this.mapping=p;}function m(o,i,p,s,q,r,t){this.id=t;this.outputId=o;this.name=i;this.dataType=p;this.size=s;this.businessDataType=q;this.isCollection=u.getFromNullOrDigitToBoolean(r);}function n(o,i,p,s,q,r,t,w){var x=new m(o,i,p,s,q,r,t);x.description=w;return x;}return{VocaInfo:V,ObjectInfo:O,ActionInfo:A,OutputInfo:a,AliasInfo:b,InternalValueListInfo:I,ExternalValueListInfo:E,TermInfo:T,TermModifierInfo:d,AttrInfo:e,AssocInfo:f,AssocAttrInfo:g,AdvancedFunctionInfo:h,ActionStaticParams:j,ActionRequiredParams:k,OutputStaticParams:l,OutputRequiredParams:m,ParameterInfo:P,getOutputParamsObj:n};}());
