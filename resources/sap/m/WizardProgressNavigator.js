/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ItemNavigation","sap/ui/Device","jquery.sap.global"],function(l,C,R,I,D,q){"use strict";var W=C.extend("sap.m.WizardProgressNavigator",{metadata:{properties:{stepCount:{type:"int",group:"Data",defaultValue:3},stepTitles:{type:"string[]",group:"Appearance",defaultValue:[]},stepIcons:{type:"sap.ui.core.URI[]",group:"Appearance",defaultValue:[]},varyingStepCount:{type:"boolean",group:"Appearance",defaultValue:false}},events:{stepChanged:{parameters:{previous:{type:"int"},current:{type:"int"}}},stepActivated:{parameters:{index:{type:"int"}}}}}});W.CONSTANTS={MINIMUM_STEPS:3,MAXIMUM_STEPS:8,MIN_STEP_WIDTH_NO_TITLE:64,MIN_STEP_WIDTH_WITH_TITLE:200};W.CLASSES={NAVIGATION:"sapMWizardProgressNav",LIST:"sapMWizardProgressNavList",LIST_VARYING:"sapMWizardProgressNavListVarying",LIST_NO_TITLES:"sapMWizardProgressNavListNoTitles",STEP:"sapMWizardProgressNavStep",ANCHOR:"sapMWizardProgressNavAnchor",ANCHOR_CIRCLE:"sapMWizardProgressNavAnchorCircle",ANCHOR_TITLE:"sapMWizardProgressNavAnchorTitle",ANCHOR_ICON:"sapMWizardProgressNavAnchorIcon"};W.ATTRIBUTES={STEP:"data-sap-ui-wpn-step",STEP_COUNT:"data-sap-ui-wpn-step-count",CURRENT_STEP:"data-sap-ui-wpn-step-current",ACTIVE_STEP:"data-sap-ui-wpn-step-active",OPEN_STEP:"data-sap-ui-wpn-step-open",OPEN_STEP_PREV:"data-sap-ui-wpn-step-open-prev",OPEN_STEP_NEXT:"data-sap-ui-wpn-step-open-next",ARIA_LABEL:"aria-label",ARIA_DISABLED:"aria-disabled"};W.TEXT={SELECTED:"WIZARD_PROG_NAV_SELECTED",PROCESSED:"WIZARD_PROG_NAV_PROCESSED",STEP:"WIZARD_PROG_NAV_STEP_TITLE"};W.prototype.init=function(){this._currentStep=1;this._activeStep=1;this._cachedSteps=[];this._resourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._actionSheet=new sap.m.ActionSheet();this._createAnchorNavigation();};W.prototype.onBeforeRendering=function(){if(this.getStepCount()!==this.getStepIcons().filter(String).length){this.setStepIcons([]);}if(this.getStepCount()!==this.getStepTitles().filter(String).length){this.setStepTitles([]);}};W.prototype.onAfterRendering=function(){var p,z=this._activeStep-1,a=this._currentStep-1;this._cacheDOMElements();this._updateStepZIndex();this._updateAnchorNavigation(z);this._updateStepActiveAttribute(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepCurrentAttribute(a);this._updateAnchorAriaLabelAttribute(a);this._updateOpenSteps();R.register(this.getDomRef(),this._updateOpenSteps.bind(this));if(D.os.name===D.os.OS.IOS){p=this.$().find(".sapMWizardProgressNavStep").css("display","block");q.sap.delayedCall(0,p,"css",["display",""]);}};W.prototype.getCurrentStep=function(){return this._currentStep;};W.prototype.previousStep=function(s){var c=this.getCurrentStep();if(c<2){return this;}return this._moveToStep(c-1,s);};W.prototype.nextStep=function(s){return this._moveToStep(this.getCurrentStep()+1,s);};W.prototype.incrementProgress=function(){return this._moveToStep(this.getProgress()+1);};W.prototype.getProgress=function(){return this._activeStep;};W.prototype.discardProgress=function(i,s){if(i<=0||i>this._activeStep){return this;}this._updateCurrentStep(i,this._currentStep,s);this._updateStepActiveAttribute(i-1,this._activeStep-1);this._addAnchorAriaDisabledAttribute(i-1);this._updateAnchorNavigation(i-1);this._currentStep=i;this._activeStep=i;};W.prototype._setOnEnter=function(c){this._onEnter=c;};W.prototype.ontap=function(e){if(this._isGroupAtStart(e.target)){return this._showActionSheet(e.target,true);}if(this._isGroupAtEnd(e.target)){return this._showActionSheet(e.target,false);}if(!this._isAnchor(e.target)||!this._isOpenStep(e.target)||!this._isActiveStep(this._getStepNumber(e.target))){return;}this._updateCurrentStep(this._getStepNumber(e.target));};W.prototype.onsapspace=function(e){if(this._onEnter){this._onEnter(e,this._anchorNavigation.getFocusedIndex());}this.ontap(e);};W.prototype.onsapenter=W.prototype.onsapspace;W.prototype.exit=function(){R.deregisterAllForControl(this.getId());this.removeDelegate(this._anchorNavigation);this._anchorNavigation.destroy();this._anchorNavigation=null;this._actionSheet.destroy();this._actionSheet=null;this._currentStep=null;this._activeStep=null;this._cachedSteps=null;};W.prototype._createAnchorNavigation=function(){var t=this;this._anchorNavigation=new I();this._anchorNavigation.setCycling(false);this._anchorNavigation.attachEvent("AfterFocus",function(p){var e=p.mParameters.event;if(!e||!e.relatedTarget||q(e.relatedTarget).hasClass(W.CLASSES.ANCHOR)){return;}t._anchorNavigation.focusItem(t._currentStep-1);});this.addDelegate(this._anchorNavigation);};W.prototype._cacheDOMElements=function(){var d=this.getDomRef();this._cachedSteps=d.querySelectorAll("."+W.CLASSES.STEP);};W.prototype._updateStepZIndex=function(){var z=this._currentStep-1,s=this._cachedSteps.length,a=W.CONSTANTS.MAXIMUM_STEPS;for(var i=0;i<s;i++){if(i<=z){this._cachedSteps[i].style.zIndex=0;}else{this._cachedSteps[i].style.zIndex=a;a-=1;}}};W.prototype._updateAnchorNavigation=function(a){var n=this.getDomRef(),f=[];for(var i=0;i<=a;i++){f.push(this._cachedSteps[i].children[0]);}this._anchorNavigation.setRootDomRef(n);this._anchorNavigation.setItemDomRefs(f);this._anchorNavigation.setPageSize(a);this._anchorNavigation.setFocusedIndex(a);};W.prototype._updateStepActiveAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.ACTIVE_STEP);}this._cachedSteps[n].setAttribute(W.ATTRIBUTES.ACTIVE_STEP,true);};W.prototype._updateStepCurrentAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].removeAttribute(W.ATTRIBUTES.CURRENT_STEP);}this._cachedSteps[n].setAttribute(W.ATTRIBUTES.CURRENT_STEP,true);};W.prototype._addAnchorAriaDisabledAttribute=function(a){var s=this._cachedSteps.length,b;for(var i=a+1;i<s;i++){b=this._cachedSteps[i].children[0];b.setAttribute(W.ATTRIBUTES.ARIA_DISABLED,true);b.removeAttribute(W.ATTRIBUTES.ARIA_LABEL);}};W.prototype._removeAnchorAriaDisabledAttribute=function(i){this._cachedSteps[i].children[0].removeAttribute(W.ATTRIBUTES.ARIA_DISABLED);};W.prototype._updateAnchorAriaLabelAttribute=function(n,o){if(o!==undefined){this._cachedSteps[o].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(W.TEXT.PROCESSED));}this._cachedSteps[n].children[0].setAttribute(W.ATTRIBUTES.ARIA_LABEL,this._resourceBundle.getText(W.TEXT.SELECTED));};W.prototype._moveToStep=function(n,s){var a=this.getStepCount(),o=this.getCurrentStep();if(n>a){return this;}if(n>this._activeStep){this._updateActiveStep(n);}return this._updateCurrentStep(n,o,s);};W.prototype._updateActiveStep=function(n,o){var z=n-1,a=(o||this._activeStep)-1;this._activeStep=n;this._updateAnchorNavigation(z);this._removeAnchorAriaDisabledAttribute(z);this._updateStepActiveAttribute(z,a);return this.fireStepActivated({index:n});};W.prototype._updateCurrentStep=function(n,o,s){var z=n-1,a=(o||this.getCurrentStep())-1;this._currentStep=n;this._updateStepZIndex();this._updateOpenSteps();this._updateStepCurrentAttribute(z,a);this._updateAnchorAriaLabelAttribute(z,a);if(!s){return this.fireStepChanged({previous:o,current:n});}return this;};W.prototype._updateOpenSteps=function(){var w=this.$().width(),c=this._currentStep-1,a=0,b=true,s=this.getStepTitles().length?Math.floor(w/W.CONSTANTS.MIN_STEP_WIDTH_WITH_TITLE):Math.floor(w/W.CONSTANTS.MIN_STEP_WIDTH_NO_TITLE);[].forEach.call(this._cachedSteps,function(d){d.setAttribute(W.ATTRIBUTES.OPEN_STEP,false);d.setAttribute(W.ATTRIBUTES.OPEN_STEP_PREV,false);d.setAttribute(W.ATTRIBUTES.OPEN_STEP_NEXT,false);});this._cachedSteps[c].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);for(var i=1;i<s;i++){if(b){a+=1;}if(b&&this._cachedSteps[c+a]){this._cachedSteps[c+a].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);b=!b;}else if(!b&&this._cachedSteps[c-a]){this._cachedSteps[c-a].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);b=!b;}else if(this._cachedSteps[c+a+1]){a+=1;this._cachedSteps[c+a].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);b=true;}else if(this._cachedSteps[c-a]){this._cachedSteps[c-a].setAttribute(W.ATTRIBUTES.OPEN_STEP,true);a+=1;b=false;}}for(i=0;i<this._cachedSteps.length;i++){if(this._cachedSteps[i].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="true"&&this._cachedSteps[i-1]&&this._cachedSteps[i-1].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="false"){this._cachedSteps[i-1].setAttribute(W.ATTRIBUTES.OPEN_STEP_PREV,true);}if(this._cachedSteps[i].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="false"&&this._cachedSteps[i-1]&&this._cachedSteps[i-1].getAttribute(W.ATTRIBUTES.OPEN_STEP)=="true"){this._cachedSteps[i].setAttribute(W.ATTRIBUTES.OPEN_STEP_NEXT,true);break;}}};W.prototype._isGroupAtStart=function(d){var s=q(d).closest("."+W.CLASSES.STEP);var a=this._getStepNumber(s);return s.attr(W.ATTRIBUTES.OPEN_STEP_PREV)==="true"&&a>1;};W.prototype._isGroupAtEnd=function(d){var s=q(d).closest("."+W.CLASSES.STEP);var a=this._getStepNumber(s);return s.attr(W.ATTRIBUTES.OPEN_STEP_NEXT)==="true"&&a<this._cachedSteps.length;};W.prototype._showActionSheet=function(d,a){var f=a?0:this._getStepNumber(d)-1;var t=a?this._getStepNumber(d):this._cachedSteps.length;var b,c;this._actionSheet.removeAllButtons();for(var i=f;i<t;i++){b=this.getStepIcons()[i];c=this._cachedSteps[i].childNodes[0].getAttribute("title");c=b?c:(i+1)+". "+c;this._actionSheet.addButton(new sap.m.Button({width:"200px",text:c,icon:b,enabled:this._activeStep>=(i+1),press:function(s){this._moveToStep(s);}.bind(this,i+1)}));}this._actionSheet.openBy(d);};W.prototype._isAnchor=function(d){return d.className.indexOf(W.CLASSES.ANCHOR)!==-1;};W.prototype._isOpenStep=function(d){var s=q(d).closest("."+W.CLASSES.STEP);return s.attr(W.ATTRIBUTES.OPEN_STEP)==="true"||(s.attr(W.ATTRIBUTES.OPEN_STEP)==="false"&&s.attr(W.ATTRIBUTES.OPEN_STEP_PREV)==="true")||(s.attr(W.ATTRIBUTES.OPEN_STEP)==="false"&&s.attr(W.ATTRIBUTES.OPEN_STEP_NEXT)==="true");};W.prototype._isActiveStep=function(s){return s<=this._activeStep;};W.prototype._getStepNumber=function(d){var s=q(d).closest("."+W.CLASSES.STEP).attr(W.ATTRIBUTES.STEP);return parseInt(s,10);};return W;});
