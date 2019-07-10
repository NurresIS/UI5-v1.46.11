/*!
* SAP APF Analysis Path Framework
* 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
*/
(function(){"use strict";var c,u,a,I=false,b=false;function _(){var i=a.getSelectedRepresentation();if(f()){i=a.getSelectedRepresentation().toggleInstance;}return i;}function d(){var R=a.getSelectedRepresentation();if(R.type===sap.apf.ui.utils.CONSTANTS.representationTypes.TABLE_REPRESENTATION){return true;}return false;}function e(){var R=a.getSelectedRepresentation();if(R.type===sap.apf.ui.utils.CONSTANTS.representationTypes.TREE_TABLE_REPRESENTATION){return true;}return false;}function f(){if(a.getSelectedRepresentation().bIsAlternateView===undefined||a.getSelectedRepresentation().bIsAlternateView===false){return false;}return true;}function g(){var R=_();var i=R.getParameter().requiredFilters;if(i===undefined||i.length===0){return undefined;}return i[0];}function h(i){if(!i){return undefined;}var R=_();var M=R.getMetaData();if(!M){return null;}var P=M.getPropertyMetadata(i);if(!P){return null;}var F=P.label;return F!==undefined?F:null;}function k(C,i){var j=C.byId("idChartContainer");var A="0";var B=jQuery(window).width();var D=j.getId();if(jQuery("#"+D).length!==0){A=jQuery("#"+D+" > div:first-child > div:nth-child(2)").offset().top;B=jQuery("#"+D+" > div:first-child > div:nth-child(2)").width();}var E=(jQuery(window).height()-A)-jQuery(".applicationFooter").height();var F=B;i.setHeight(E+"px");i.setWidth(F+"px");}function l(C){var i=C.byId("idChartContainer");var R=_();var T=a.longTitle&&!c.isInitialTextKey(a.longTitle.key)?a.longTitle:a.title;var S=c.getTextNotHtmlEncoded(T);var j=R.getMainContent(S,b);b=false;var A={onBeforeRendering:function(){k(C,j);}};j.addEventDelegate(A);i.removeAllContent();var B=new sap.suite.ui.commons.ChartContainerContent({content:j});i.addContent(B);}function m(C,i){var S=C.byId("idSelectedText");var j=x();var A=g()!==undefined?h(g()):null;var B=A+" ("+j+") ";var D=C.byId("idSelPropertyAndCount");if(!D){D=new sap.m.Link({id:C.createId("idSelPropertyAndCount"),press:C.handlePressSelectedPropertyCountLink.bind(C)});D.addAriaLabelledBy(S.getId());}D.setVisible(true);D.setText(B);i.addContent(D);i.onAfterRendering=function(){var E=this;if(E.getContent().length>=5){E.getContent()[4].focus();}};}function n(C){var i=C.byId("idChartContainer");i.removeAllCustomIcons();o(C);p(C);q(C);}function o(C){if(e()){return;}var j=C.byId("idChartContainer");var A=a.getSelectedRepresentationInfo();var B;if(A.parameter&&A.parameter.orderby){new sap.apf.ui.utils.Helper(c).getRepresentationSortInfo(A).done(function(F){var S=[];for(var i=0;i<F.length;i++){F[i].done(function(G){S.push(G);});}B=S.join(", ");var D=c.getTextNotHtmlEncoded(A.label)+"\n"+((B!==undefined)?c.getTextNotHtmlEncoded("sortBy")+": "+B:"");var E=new sap.ui.core.Icon({src:A.picture,tooltip:D,press:function(G){C.handlePressChartIcon(G);}});j.addCustomIcon(E);});}else{var D=c.getTextNotHtmlEncoded(A.label)+"\n"+((B!==undefined)?c.getTextNotHtmlEncoded("sortBy")+": "+B:"");var E=new sap.ui.core.Icon({src:A.picture,tooltip:D,press:function(i){C.handlePressChartIcon(i);}});j.addCustomIcon(E);}}function p(C){if(d()||e()){return;}var i=C.byId("idChartContainer");var j=c.getTextNotHtmlEncoded("listView");var A=new sap.ui.core.Icon({src:"sap-icon://table-view",tooltip:j,press:C.handlePressAlternateRepIcon.bind(C)});i.addCustomIcon(A);}function q(C){if((_().topN!==undefined)||(!f()&&!d())||(e())){return;}var i=C.byId("idChartContainer");var j=c.getTextNotHtmlEncoded("view-Settings-Button");var V=_().createViewSettingDialog();var A=new sap.ui.core.Icon({src:"sap-icon://drop-down-list",tooltip:j,press:function(){V.open();}});i.addCustomIcon(A);}function r(C,i){var S=C.byId("idSelectedText");if(!S){S=new sap.m.Label({id:C.createId("idSelectedText"),text:c.getTextNotHtmlEncoded("selectedValue")});}S.setVisible(true);i.addContent(S);}function s(C,i){var R=C.byId("idReset");if(!R){R=new sap.m.Button({text:c.getTextNotHtmlEncoded("reset"),id:C.createId("idReset"),type:"Transparent",press:C.handlePressResetButton.bind(C)});}R.setVisible(true);i.addContent(R);}function t(C,i){var j=x();if(j>0&&g()!==undefined){r(C,i);m(C,i);s(C,i);}}function v(C){var i=C.byId("idChartContainer");var j=i.getToolbar();if(j){j.removeAllContent();}else{j=new sap.m.OverflowToolbar();}var A=new sap.m.Label({text:c.getTextNotHtmlEncoded("currentStep")});j.addContent(A);var S=new sap.m.ToolbarSpacer();j.addContent(S);t(C,j);j.addContent(new sap.suite.ui.commons.ChartContainerToolbarPlaceholder());i.setToolbar(j);}function w(C){if(a===undefined){return;}l(C);n(C);v(C);}function x(){var i=_();var j=i.getSelections().length;return j;}function y(C,A){var B=new sap.m.List({mode:sap.m.ListMode.SingleSelectMaster,showSeparators:sap.m.ListSeparators.None,includeItemInSelection:true,selectionChange:C.handleSelectionChartSwitchIcon.bind(C)});var D;var R;for(var j=0;j<a.representationtypes.length;j++){R=a.representationtypes[j];D=undefined;if(R.parameter&&R.parameter.orderby){new sap.apf.ui.utils.Helper(c).getRepresentationSortInfo(R).done(function(G){var H=[];for(var i=0;i<G.length;i++){G[i].done(function(J){H.push(J);});}D=H.join(", ");var E=D!==undefined?c.getTextNotHtmlEncoded("sortBy")+": "+D:"";var F=new sap.m.StandardListItem({description:E,icon:R.picture,title:c.getTextNotHtmlEncoded(R.label),customData:[new sap.ui.core.CustomData({key:'data',value:{oRepresentationType:R,icon:R.picture}})]});B.addItem(F);});}else{var E=D!==undefined?c.getTextNotHtmlEncoded("sortBy")+": "+D:"";var F=new sap.m.StandardListItem({description:E,icon:R.picture,title:c.getTextNotHtmlEncoded(R.label),customData:[new sap.ui.core.CustomData({key:'data',value:{oRepresentationType:R,icon:R.picture}})]});B.addItem(F);}}if(!C.byId("idAllChartPopover")){var S=new sap.m.Popover({id:C.createId("idAllChartPopover"),placement:sap.m.PlacementType.Bottom,showHeader:false,content:[B],afterClose:function(){S.destroy();}});}C.byId("idAllChartPopover").openBy(A);}function z(C,i){C.byId("idReset").setVisible(i);C.byId("idSelPropertyAndCount").setVisible(i);C.byId("idSelectedText").setVisible(i);}sap.ui.controller("sap.apf.ui.reuse.controller.stepContainer",{onInit:function(){var C=this;c=C.getView().getViewData().oCoreApi;u=C.getView().getViewData().uiApi;a=c.getActiveStep();},onAfterRendering:function(){var C=this;jQuery(window).resize(function(){var i=90;c.getSmartFilterBarConfigurationAsPromise().done(function(j){if(j){i=165;}var A=jQuery(window).height()-i;jQuery('.layoutView').css({"height":A});if(a){b=e()?true:false;}C.drawStepContent();});});},handlePressSelectedPropertyCountLink:function(){var C=this;C.oCoreApi=c;var i=new sap.ui.jsfragment("idSelectionDisplayFragment","sap.apf.ui.reuse.fragment.selectionDisplay",C);i.open();},handlePressResetButton:function(){var C=this;if(f()){_().removeAllSelection();}_().removeAllSelection();z(C,false);},createToggleRepresentationInstance:function(){a=c.getActiveStep();var R=a.getSelectedRepresentation();var j={};function A(E){var F=E.dimensions;var D=R.getMetaData();if(D===undefined){return E;}var i,G;for(i=0;i<F.length;i++){var S=D.getPropertyMetadata(F[i].fieldName).hasOwnProperty('text');if(S&&F[i].labelDisplayOption===sap.apf.core.constants.representationMetadata.labelDisplayOptions.KEY_AND_TEXT){G={};G.fieldName=D.getPropertyMetadata(F[i].fieldName).text;E.dimensions.splice(i+1,0,G);}else if(S&&F[i].labelDisplayOption===sap.apf.core.constants.representationMetadata.labelDisplayOptions.TEXT){G={};G.fieldName=D.getPropertyMetadata(F[i].fieldName).text;E.dimensions.splice(i,1,G);}}E.isAlternateRepresentation=true;return E;}var B=jQuery.extend(true,{},R.getParameter());delete B.alternateRepresentationTypeId;delete B.alternateRepresentationType;B=A(B);j=c.createRepresentation(R.getParameter().alternateRepresentationType.constructor,B);var C=R.getData(),D=R.getMetaData();if(C!==undefined&&D!==undefined){j.setData(C,D);}return j;},handlePressAlternateRepIcon:function(){var C=this;var i=a.getSelectedRepresentation();var j=c.getSteps().indexOf(a);i.bIsAlternateView=true;if(f()){i.toggleInstance=C.createToggleRepresentationInstance();}i.toggleInstance.adoptSelection(i);I=false;C.drawStepContent();u.getAnalysisPath().getCarousel().getStepView(j).getController().drawThumbnailContent(true);},handlePressChartIcon:function(E){var C=this;var i=a.getSelectedRepresentation();var j=c.getSteps().indexOf(a);a.representationtypes=a.getRepresentationInfo();if(a.representationtypes.length>1){var A=E.getParameter("controlReference");y(C,A);}else{i.bIsAlternateView=false;u.getAnalysisPath().getCarousel().getStepView(j).getController().drawThumbnailContent(true);C.drawStepContent();}},handleSelectionChartSwitchIcon:function(E){var C=this;C.byId("idAllChartPopover").close();var S=E.getParameter("listItem").getCustomData()[0].getValue();var i=c.getSteps().indexOf(a);var j=a.getSelectedRepresentationInfo().representationId;var A=S.oRepresentationType.representationId;if(j===A&&a.getSelectedRepresentation().bIsAlternateView===false){return;}I=false;a.getSelectedRepresentation().bIsAlternateView=false;a.setSelectedRepresentation(S.oRepresentationType.representationId);u.getAnalysisPath().getController().refresh(S.nActiveStepIndex);c.updatePath(u.getAnalysisPath().getController().callBackForUpdatePath.bind(u.getAnalysisPath().getController()));u.getAnalysisPath().getCarousel().getStepView(i).getController().drawThumbnailContent(true);},handleZoomInPress:function(){I=true;},handleZoomOutPress:function(){I=true;},drawStepContent:function(){var C=this,i=false;var P=a;a=c.getActiveStep();if(P!==a){i=true;}var j=c.getSteps().indexOf(a);var S=u.getAnalysisPath().getCarousel().getStepView(j);if(S===undefined){return;}var T=S.oThumbnailChartLayout.isBusy();if(T){C.byId("idStepLayout").setBusy(true);}if(!I||i){w(C);}else{v(C);}C.byId("idStepLayout").setBusy(false);}});}());
