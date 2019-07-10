/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Button","sap/m/TextArea","sap/m/Text","sap/m/MessageBox","sap/ui/layout/HorizontalLayout","sap/rules/ui/Utils","sap/ui/core/Popup","jquery.sap.global","sap/rules/ui/ExpressionBase","sap/ui/comp/odata/MetadataAnalyser","sap/rules/ui/providers/ValueHelpProvider","sap/rules/ui/codemirror/lib/codemirror","sap/rules/ui/codemirror/addon/hint/show-hint","sap/rules/ui/codemirror/mode/hdf/hdf","sap/rules/ui/codemirror/addon/display/placeholder","sap/rules/ui/codemirror/addon/mh/mark-selection","sap/rules/ui/codemirror/addon/hint/hdf-hint","sap/rules/ui/codemirror/addon/closeBrackets/closebrackets","sap/rules/ui/codemirror/addon/search/search"],function(C,B,a,b,M,H,U,P,q,E,c,V){"use strict";var d=E.extend("sap.rules.ui.ExpressionAdvanced",{metadata:{properties:{type:{type:"sap.rules.ui.ExpressionType",defaultValue:sap.rules.ui.ExpressionType.All,bindable:"bindable"},collection:{type:"boolean",defaultValue:false},placeholder:{type:"string",defaultValue:null},focusOnLoad:{type:"boolean",defaultValue:false}},aggregations:{_expressionArea:{type:"sap.m.TextArea",multiple:false,visibility:"hidden"}},events:{"change":{},"liveChange":{},"valueHelpRequest":{parameters:{fromSuggestions:{type:"boolean"}}}},publicMethosds:["validate"]}});d.prototype.init=function(){E.prototype.init.apply(this,arguments);var e=jQuery.sap.getModulePath("sap.rules.ui.codemirror.lib")+"/codemirror.css";var s=jQuery.sap.getModulePath("sap.rules.ui.codemirror.addon.hint")+"/show-hint.css";jQuery.sap.includeStyleSheet(e);jQuery.sap.includeStyleSheet(s);this.pop=new P(q('<span></span>')[0],false,false,false);this.errorWidgets=[];this.expressionTokens=[];this._liveValue="";this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this.dataModel=this.initControlDataModel();this.oTextArea=new a({width:"100%"});this.validationCompleteEvent=document.createEvent("Event");this.validationCompleteEvent.initEvent("validationCompleteEvent",true,false);this.setAggregation("_expressionArea",this.oTextArea,true);};d.prototype._processValidationResult=function(r){if(r.status===sap.rules.ui.ValidationStatus.Error){var m=U.parseUTFToString(r.errorDetails);m=m.replace(/\r\n/g," ").replace(/\r/g," ").replace(/\n/g," ");this.errorCursorPosition=r.cursorPosition;this.setValueStateText(m);this._showPopUp();}else{this.oTextArea.setValueState("None");this.oTextArea.setValueStateText("");this.setValueStateText("");jQuery(this.codeMirror.getWrapperElement()).removeClass('sapMInputBaseStateInner sapMInputBaseErrorInner');}};d.prototype.validateExpression=function(I){for(var i=0;i<this.errorWidgets.length;i++){this.codeMirror.removeLineWidget(this.errorWidgets[i]);}this.errorWidgets=[];var e=this.codeMirror?this.codeMirror.getValue():this.getValue();var r={};var f={};var o=sap.ui.getCore().byId(this.getExpressionLanguage());if(o){f=o.validateExpression(I||e,this.getProperty("type"),this.getCollection(),false);if(f&&this.isActive()){r=f;this._processValidationResult(r);if(r.deferredResult){r.deferredResult.done(function(r){this._processValidationResult(r);document.dispatchEvent(this.validationCompleteEvent);}.bind(this));}}}return f;};d.prototype._showPopUp=function(){var e="Error";var f=this.getProperty("valueStateText");var t=this.getId()+'-message';var p=this.pop;if(!this.pop){return;}p.attachClosed(function(){q.sap.byId(t).remove();});var g=P.Dock;var h='sapMInputBaseMessage'+e+' sapMFocus';var T='sapMValueStateMessageError sapMText';var r=sap.ui.getCore().getLibraryResourceBundle('sap.m');if(e===sap.ui.core.ValueState.Success){h='sapUiInvisibleText';f='';}var o=q('<div>',{'id':t,'class':h,'role':'tooltip','aria-live':'assertive'}).append(q('<span>',{'aria-hidden':true,'class':'sapUiHidden','text':r.getText('INPUTBASE_VALUE_STATE_'+e.toUpperCase())})).append(q('<span>',{'id':t+'-text','class':T,'text':f}));p.setContent(o[0]);p.close(0);p.open(0,g.BeginTop,g.BeginBottom,jQuery(this.codeMirror.getWrapperElement()),null,"none flip",true);var s=this.pop.oContent.clientWidth;var i=document.getElementById(this.getAggregation("_expressionArea"));if(!i){return;}var j=i.sId.clientWidth;if(s>j){jQuery(".sapMText").css('width',j);jQuery(".sapMText").css('padding-left','12px');jQuery(".sapMText").css('padding-right','12px');jQuery(".sapMText").css('padding-top','8px');jQuery(".sapMText").css('padding-bottom','8px');}};d.prototype._closePopUp=function(){if(this.pop){this.pop.close(0);}};d.prototype._showErrorMessage=function(){if(this.getValueStateText()){this._setExpressionErrorStyle();}};d.prototype.initControlDataModel=function(){var D=new sap.ui.model.json.JSONModel();var e={};D.setData(e);return D;};d.prototype.setExpressionTokens=function(t){var m=0,n=false;this.expressionTokens=[];if(t instanceof Array){for(var i=0;i<t.length;i++){var e=t[i];var f=/\n/;if(f.test(e.token)){m=e.start+e.token.lastIndexOf('\n')+1;n=true;continue;}if(n){e.start=e.start-m;e.end=e.end-m+1;}else{e.end=e.end+1;}this.expressionTokens.push(e);}}};d.prototype.getExpressionTokens=function(){return this.expressionTokens;};d.prototype.getValue=function(){if(this.codeMirror!==undefined){return this.codeMirror.getValue();}return this.getProperty("value");};d.prototype.setValue=function(v){if(v===undefined||v===null){v="";}this._liveValue=v;this.oTextArea.setValue(v);if(this.getProperty("value")===v){return;}this.setProperty("value",v,true);if(this.codeMirror!==undefined){this.codeMirror.setValue(v);}};d.prototype.setPlaceholder=function(v){this.setProperty("placeholder",v);var m=(this.getEditable())?v:"";this.dataModel.setProperty("/placeholder",m);};d.prototype.getPlaceholder=function(){return this.dataModel.getProperty("/placeholder");};d.prototype.setValueStateText=function(m){this.setProperty("valueStateText",m,true);this._showErrorMessage(m);};d.prototype.setEditable=function(v){this.setProperty("editable",v);if(this.codeMirror){jQuery(this.codeMirror.getWrapperElement()).addClass('CodeMirror-rules-Not-Editable');}var _=(v)?this.getProperty("placeholder"):"";this.dataModel.setProperty("/placeholder",_);this.invalidate();};d.prototype.setType=function(t){this.setProperty("type",t);if(this.codeMirror){this.codeMirror.options.returnType=t;}};d.prototype.setCollection=function(i){this.setProperty("collection",i,true);if(this.codeMirror){this.codeMirror.options.collection=i;}};d.prototype.validate=function(){return this.validateExpression();};d.prototype.setFocusOnLoad=function(v){this.dataModel.setProperty("/focus",v);this.setProperty("focusOnLoad",v,true);};d.prototype.focus=function(){if(this.codeMirror){var l=this.codeMirror.getLine(this.codeMirror.lastLine());var e=l.length;this.codeMirror.setCursor({line:this.codeMirror.lastLine(),ch:e});this.codeMirror.focus();}};d.prototype.onAliasLinkPress=function(e){var f=sap.ui.getCore().byId(this.getExpressionLanguage());if(f){f.onAliasLinkPress(e);f.attachEvent("aliasDialogClosed",this.aliasClickCancel,this);}};d.prototype.onCreateAliasLinkForText=function(t){var e=sap.ui.getCore().byId(this.getExpressionLanguage());if(e){e.attachEvent("aliasDialogClosed",this.replaceTextWithAlias,this);e.onCreateAliasLinkForText(t);}};d.prototype.replaceTextWithAlias=function(e){if(e.getParameter("isSave")){this.codeMirror.replaceSelection(e.getParameter("savedAliasName"));}};d.prototype.aliasClickCancel=function(e){this.codeMirror.focus();this.codeMirror.execCommand("goLineEnd");this.fireDialog({dialogStatus:sap.rules.ui.ValueListDialogMode.Close});};d.prototype.onAfterRendering=function(){this.timer=null;this.needAutoComplete=false;this.endCompletion=false;this._setCodeMirror();this._setEditorStyle();this._handleMousedown();this._handleChange();this._handleFocusLeave();this._handleEndCodeCompletion();this._handleKeyPress();this._handleEditableProperty();this._handleOnLoadValidation();this._refreshOnNavigationEnd();this._handleFocus();this._handleValueListSelect();document.getElementById(this.getId()).addEventListener("change",function(e){this.bFlagForChangeBeforeBlur=true;this.codeMirror.focus();}.bind(this),true);document.getElementById(this.getId()).addEventListener("blur",function(e){if(this.bFlagForChangeBeforeBlur){this.bFlagForChangeBeforeBlur=false;e.stopPropagation();this.codeMirror.focus();}}.bind(this),true);};d.prototype._raiseError=function(e){jQuery.sap.log.error(e);var o=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this.setValueStateText(o.getText("valueHelpTechnicalError"));this._showPopUp();};d.prototype._handleValueListSelect=function(){this.codeMirror.on('onValueListSelect',function(){var v=[this.codeMirror.currentHintData.data.listCompletion[0].info];var e=sap.ui.getCore().byId(this.getExpressionLanguage());var f=e.getValueHelpCallback();this.oTextArea.setValueState("None");this.oTextArea.setValueStateText("");this.setValueStateText("");jQuery(this.codeMirror.getWrapperElement()).removeClass('sapMInputBaseStateInner sapMInputBaseErrorInner');if((typeof f)!=="function"){this._raiseError("value help callback is not set or is not a function");}else{f.call(this,v);var m=v[0].model;if(!(m instanceof sap.ui.model.odata.v2.ODataModel)){this._raiseError("value help model is not an oData V2 model");}else if(m.isMetadataLoadingFailed()){this._raiseError("model metadata loading has failed in the past");}else if(!(m.getMetaModel().oModel)){m.attachMetadataLoaded(function(){this._createValueHelpProvider(v[0]);}.bind(this));m.attachMetadataFailed(function(){this._raiseError("attached model metadata failed");}.bind(this));}else{this._createValueHelpProvider(v[0]);}}}.bind(this));};d.prototype._createValueHelpProvider=function(v,r){var m=v.model;this.oMetadataAnalyzer=new sap.ui.comp.odata.MetadataAnalyser(m);var A=v.metadata.propertyPath;var o=this.oMetadataAnalyzer.getValueListAnnotation(A);if(!o.primaryValueListAnnotation){this._raiseError("proprety path is wrong");return;}var t=this.getExpressionTokens();var e=false;if(t.length>0){e=(t[t.length-1].tokenType!=="whitespace");}if(this.oValueHelpDialogProvider){this.oValueHelpDialogProvider.destroy();}this.oValueHelpDialogProvider=new V({annotation:o.primaryValueListAnnotation,additionalAnnotations:o.additionalAnnotations,control:this,model:m,preventInitialDataFetchInValueHelpDialog:false,supportMultiSelect:false,supportRanges:false,takeOverInputValue:false,fieldName:o.primaryValueListAnnotation.valueListTitle,title:o.primaryValueListAnnotation.valueListTitle,cursorPosition:this.codeMirror.getCursor(),bReplaceWord:r,businessDataType:v.metadata.businessDataType,bAddSpace:e});this.fireValueHelpRequest({fromSuggestions:false});};d.prototype.onValueHelpLinkPress=function(v,e){var f=sap.ui.getCore().byId(this.getExpressionLanguage());var g=f.getValueHelpCallback();var t=this.getExpressionTokens();var i;var h;for(i=0;i<t.length;i++){if(t[i].tokenType==='valueList'&&t[i].info&&t[i].info.id===e){h=[t[i].info];break;}}g.call(this,h);var m=h[0].model;if(!m.getMetaModel().oModel){m.attachMetadataLoaded(function(){this._createValueHelpProvider(h[0],true);}.bind(this));}else{this._createValueHelpProvider(h[0],true);}};d.prototype._createSearchCursor=function(v){var e=this.codeMirror;e.getCursor().ch=e.getCursor().ch+v.length;var f=e.getSearchCursor(v,e.getCursor(),typeof v=="string"&&v==v.toLowerCase());return f;};d.prototype.setTextOnCursor=function(v,e,r,f,A){function g(u,w){var x=u+1;for(var j=x;j<w.length;j++){if(w[j].length===0){x++;}else{break;}}return x;}var T="String",h="Date",k="Timestamp",l="Time";var m;var F=((f===T)||(f===h)||(f===k)||(f===l))?"'"+v+"'":v;var t=this.getExpressionTokens();var n=this.getValue().split("\n");var o=-1;var p={start:{line:e.line,ch:e.ch},end:{line:e.line,ch:e.ch}};for(var i=0;i<t.length;i++){o=(t[i].start===0)?g(o,n):o;if(o==e.line&&(t[i].end>e.ch)){p.start.ch=t[i].start;p.end.ch=t[i].end;r=true;break;}}if(r){this.codeMirror.replaceRange(F,p.start,p.end);m=this.codeMirror.findPosH(p.start,F.length,"char",true);this.codeMirror.setCursor(m);}else{F=A?" "+F:F;this.codeMirror.replaceRange(F,e);m=this.codeMirror.findPosH(e,F.length,"char",true);this.codeMirror.setCursor(m);}var s=sap.ui.getCore().byId(this.getExpressionLanguage());this.getFormattingTokens(s);this.ValueHelpRequested=false;};d.prototype._setCodeMirror=function(){var e=this.getEditable();function f(n,p,r){var A=n.options.expressionEditor;if((A.getEditable()!==false)&&sap.ui.getCore().byId(A.getExpressionLanguage())){window.clearTimeout(A.timer);A.timer=window.setTimeout(function(){n.execCommand(p);},r);return window.CodeMirror.Pass;}return null;}function o(n){var A=n.options.expressionEditor;if(A.getEditable()!==false){window.clearTimeout(A.timer);A.needAutoComplete=true;A.timer=window.setTimeout(function(){if(A.needAutoComplete&&sap.ui.getCore().byId(A.getExpressionLanguage())){n.execCommand("autocomplete");}},500);return window.CodeMirror.Pass;}return null;}function g(n){return f(n,"enterAutocomplete",500);}function h(n){return f(n,"colonAutocomplete",500);}function i(n){f(n,"autocomplete",0);}function s(n){return f(n,"autocomplete",500);}this.keyMap={"Tab":false,"Shift-Tab":false,"Ctrl-Space":i,"Backspace":o,"Enter":g,"':'":h,"'+'":o,"'-'":o,"'*'":o,"'/'":o,"'_'":o,"'o'":o,"'q'":o,"'w'":o,"'e'":o,"'r'":o,"'t'":o,"'y'":o,"'u'":o,"'i'":o,"'p'":o,"'.'":o,"'a'":o,"'s'":o,"'d'":o,"'f'":o,"'g'":o,"'h'":o,"'j'":o,"'k'":o,"'l'":o,"'z'":o,"'x'":o,"'c'":o,"'v'":o,"'b'":o,"'n'":o,"'m'":o,"'O'":o,"'Q'":o,"'W'":o,"'E'":o,"'R'":o,"'T'":o,"'Y'":o,"'U'":o,"'I'":o,"'P'":o,"'A'":o,"'S'":o,"'D'":o,"'F'":o,"'G'":o,"'H'":o,"'J'":o,"'K'":o,"'L'":o,"'Z'":o,"'X'":o,"'C'":o,"'V'":o,"'B'":o,"'N'":o,"'M'":o,"'0'":false,"'1'":false,"'2'":false,"'3'":false,"'4'":false,"'5'":false,"'6'":false,"'7'":false,"'8'":false,"'9'":false,"' '":s};function k(A){return A.keyMap;}if(this.expressionTokens.length===0){var j=sap.ui.getCore().byId(this.getExpressionLanguage());if(j){this.getFormattingTokens(j);}}var l=k(this);var t=this.oTextArea.getId()+'-inner';var m=(U.msieversion()>=0);if(m){jQuery('#'+t).attr('placeholder',this.getProperty('placeholder'));}this.codeMirror=window.CodeMirror.fromTextArea(document.getElementById(t),{mode:"text/hdf",lineNumbers:false,lineWrapping:true,matchBrackets:e===true?true:false,highlightSelectionMatches:e===true?{showToken:/\w/}:{},relDelegate:sap.ui.getCore().byId(this.getExpressionLanguage()),returnType:this.getProperty("type"),collection:this.getProperty("collection"),expressionEditor:this,stillNeedShowHint:true,shouldValidate:true,styleSelectedText:true,smartIndent:true,autoCloseBrackets:true,indentUnit:6});this.codeMirror.addKeyMap(l,true);};d.prototype.getFormattingTokens=function(e){var t=[];var f=e.getExpressionMetadata(this._liveValue);if(f){t=f.tokens;}this.setExpressionTokens(t);};d.prototype._setEditorStyle=function(){if(this.getValueStateText()){jQuery(this.codeMirror.getWrapperElement()).addClass('CodeMirror-error');jQuery(this.codeMirror.getWrapperElement()).addClass('sapMInputBaseStateInner sapMInputBaseErrorInner');jQuery('#'+this.oTextArea.getId()).addClass('sapMInputBaseError');}jQuery('#'+this.oTextArea.getId()).removeClass().addClass('sapMInput');jQuery(this.codeMirror.getWrapperElement()).addClass('sapMInputBaseInner CodeMirror-rules');if(!this.getEditable()){jQuery(this.codeMirror.getWrapperElement()).addClass('CodeMirror-rules-Not-Editable');}if(this.codeMirror){this.codeMirror.refresh();}};d.prototype._handleOnLoadValidation=function(){if(this.getValidateOnLoad()){this.validateExpression();this.setValidateOnLoad(false);}};d.prototype._handleEditableProperty=function(){if(this.getEditable()===false){this.codeMirror.setOption("readOnly","true");this.codeMirror.setOption("theme","read-only");}};d.prototype._handleFocus=function(){var o=this.codeMirror;if(this.getFocusOnLoad()){this.focus();}this.codeMirror.on("focus",function(e,f){var g=e.options.expressionEditor.getProperty("valueStateText");if((g)){e.options.expressionEditor._showPopUp();}e.options.stillNeedShowHint=true;jQuery('#'+e.options.expressionEditor.oTextArea.getId()).addClass('sapMInputFocused');jQuery(e.getWrapperElement()).removeClass('CodeMirror-errorBackground');});if(this.dataModel.getProperty("/focus")===true){window.setTimeout(function(){var l=o.getLine(o.lastLine());var e=l.length;o.setCursor({line:o.lastLine(),ch:e});},10);}};d.prototype._refreshOnNavigationEnd=function(){jQuery(".sapMNav").on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd',jQuery.proxy(_,this));function _(){if(this.codeMirror){this.codeMirror.refresh();}}};d.prototype._handleKeyPress=function(){this.codeMirror.on("keyHandled",function(e,k,f){if(f.keyCode===27&&this&&this.endCompletion===true){f.stopPropagation();this.endCompletion=false;}if(f.ctrlKey===true&&k==="Ctrl-A"){f.stopPropagation();}});};d.prototype._handleEndCodeCompletion=function(){this.codeMirror.on("endCompletion",function(e){e.options.expressionEditor.needAutoComplete=false;e.options.expressionEditor.endCompletion=!e.options.expressionEditor.endCompletion;});};d.prototype._handleMousedown=function(){this.codeMirror.on("mousedown",function(e,f){f.stopPropagation();var t=f.target||f.srcElement;if(t&&f.button===0){var g=t.className.split(/\s+/);for(var i=0;i<g.length;i++){if(g[i]==='cm-valuehelp'){var v=g[++i].split('-valuehelpid-')[1];e.options.expressionEditor.onValueHelpLinkPress(t.textContent,v);}}}});};d.prototype._handleChange=function(){this.codeMirror.on("change",function(e,f){var A=e.options.expressionEditor;if(A.codeMirror.state.completionActive&&A.keyMap["'"+f.text[0]+"'"]===false){A.codeMirror.state.completionActive.close();}jQuery(A.codeMirror.getWrapperElement()).removeClass('CodeMirror-error');jQuery(A.codeMirror.getWrapperElement()).removeClass('sapMInputBaseStateInner sapMInputBaseErrorInner');A._liveValue=e.getValue();var o=sap.ui.getCore().byId(A.getExpressionLanguage());if(o){A.getFormattingTokens(o);}A.codeMirror.options.shouldValidate=true;A.fireLiveChange({newValue:e.getValue()});if(f.origin!=="+delete"){e.operation(function(){for(var l=0,g=e.lineCount();l<g;++l){e.indentLine(l,"smart");}});}});};d.prototype._handleFocusLeave=function(){this.codeMirror.on("blur",function(e){var A=e.options.expressionEditor;A._closePopUp();A.codeMirror.options.stillNeedShowHint=false;if(A.codeMirror.options.shouldValidate&&!A.bFlagForPreventBlurWhenPopOverOpen){A.setValue(A.codeMirror.getValue());if(!(A instanceof sap.rules.ui.DecisionTableCellExpressionAdvanced)){A.validate();}A._closePopUp();A.fireChange({newValue:e.getValue()});A.codeMirror.options.shouldValidate=false;}jQuery('#'+A.oTextArea.getId()).removeClass('sapMInputFocused');A.dataModel.setProperty("/focus",false);});};d.prototype._setExpressionErrorStyle=function(){var e=this.getProperty("valueStateText");if(e!==""&&e!==undefined&&this.codeMirror){jQuery(this.codeMirror.getWrapperElement()).addClass('CodeMirror-error');jQuery(this.codeMirror.getWrapperElement()).addClass('sapMInputBaseStateInner sapMInputBaseErrorInner');jQuery('#'+this.oTextArea.getId()).addClass('sapMInputBaseError');var f;if(this.errorCursorPosition<0){var l=this.codeMirror.getLine(this.codeMirror.lastLine());f=l.length;jQuery(this.codeMirror.getWrapperElement()).addClass('CodeMirror-errorBackground');}else{var i=e.lastIndexOf("'");if(i>0){var o=e.substring(0,i);i=o.lastIndexOf("'");if(i>0){o=o.substring(i+1);}var g=false;for(var h=this.codeMirror.lastLine();!g&&h>=0;h--){var j=this.codeMirror.getLine(h);f=j.lastIndexOf(o);if(f>=0){g=true;this.codeMirror.setSelection({line:h,ch:f},{line:h,ch:f+o.length});}}}}}};d.prototype.getSelectedText=function(){return this.codeMirror.getSelection();};return d;},true);
