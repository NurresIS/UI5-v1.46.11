sap.ui.define(["sap/m/DraftIndicatorState","sap/suite/ui/generic/template/lib/TemplateAssembler","sap/suite/ui/generic/template/lib/TemplateComponent","sap/suite/ui/generic/template/ObjectPage/controller/ControllerImplementation"],function(D,T,a,C){"use strict";function g(c,o){var v={};var h;return{oControllerSpecification:{getMethods:C.getMethods.bind(null,v),oControllerDefinition:{adaptNavigationParameterExtension:function(s,O){},onBeforeRebindTableExtension:function(e){}}},init:function(){var t=o.getTemplatePrivateModel();t.setProperty("/objectPage",{displayMode:0});},getTemplateSpecificParameters:function(){return{breadCrumb:o.getBreadCrumbInfo()};},getTitle:function(){if(!h){var m=c.getModel().getMetaModel();var M=m.getODataEntitySet(c.getEntitySet());var d=m.getODataEntityType(M.entityType);var H=d["com.sap.vocabularies.UI.v1.HeaderInfo"];h=(H&&H.TypeName&&H.TypeName.String)||"";if(h.substr(0,7)==="{@i18n>"){var s=h.substring(1,h.length-1);var S=s.split(">");h=c.getModel(S[0]).getResourceBundle().getText(S[1]);}}return h;},onActivate:function(b){var u=c.getModel("ui");var t=o.getTemplatePrivateModel();if(o.getEditableNDC()){u.setProperty("/editable",true);var d=o.isNonDraftCreate();u.setProperty("/createMode",d);t.setProperty("/objectPage/displayMode",d?4:2);}else if(!v.isDraftEnabled()){u.setProperty("/editable",false);u.setProperty("/createMode",false);t.setProperty("/objectPage/displayMode",1);}v.onComponentActivate(b);},refreshBinding:function(u,r){if(u){var e=c.getComponentContainer().getElementBinding();if(e){e.refresh(true);}}else{v.refreshFacets(r);}},presetDisplayMode:function(d,i){if(i){return;}var t=o.getTemplatePrivateModel();t.setProperty("/objectPage/displayMode",d);},updateBindingContext:function(){var b=c.getBindingContext();var t=o.getTemplatePrivateModel();var d=o.registerContext(b);t.setProperty("/generic/draftIndicatorState",D.Clear);v.refreshFacets(null,true);var A=b.getObject();var u=c.getModel("ui");var i;if(d.bIsDraft){i=true;u.setProperty("/enabled",true);t.setProperty("/objectPage/displayMode",d.bIsCreate?4:2);}else{i=o.getEditableNDC();t.setProperty("/objectPage/displayMode",i?2:1);var e=c.getAppComponent().getTransactionController().getDraftController();var f=e.getDraftContext();if(A.hasOwnProperty("HasDraftEntity")&&A.HasDraftEntity&&f.hasSiblingEntity(c.getEntitySet())){u.setProperty("/enabled",false);var m=c.getModel();var r=new Promise(function(R,j){m.read(b.getPath(),{urlParameters:{"$expand":"SiblingEntity,DraftAdministrativeData"},success:R,error:j});});var B=o.getBusyHelper();B.setBusy(r);r.then(function(R){var s=m.getContext("/"+m.getKey(R.SiblingEntity));if(s){v.draftResume(s,A,R.DraftAdministrativeData);}u.setProperty("/enabled",true);},function(E){});}else{u.setProperty("/enabled",true);}}u.setProperty("/createMode",d.bIsCreate);u.setProperty("/editable",i);}};}return T.getTemplateComponent(g,"sap.suite.ui.generic.template.ObjectPage",{metadata:{library:"sap.suite.ui.generic.template",properties:{"templateName":{"type":"string","defaultValue":"sap.suite.ui.generic.template.ObjectPage.view.Details"},"showRelatedApps":{"type":"boolean","defaultValue":"false"},"editableHeaderContent":{"type":"boolean","defaultValue":"false"},"gridTable":"boolean","sections":"object"},"manifest":"json"}});});
