/*!
 * ${copyright}
 */
sap.ui.define(['sap/ui/core/Control','sap/ushell/library'],function(C,l){"use strict";var F=C.extend("sap.ushell.ui.launchpad.Fiori2LoadingDialog",{metadata:{library:"sap.ushell",properties:{text:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null}}}});F.prototype.init=function(){var b=document.getElementsByTagName("body")[0],e=document.createElement("DIV"),a=document.createElement("DIV"),c=document.createElement("DIV"),d=document.createElement("DIV"),f=document.createElement("DIV"),g=document.createElement("DIV"),h=document.createElement("DIV");this._oBusyIndicator=new sap.m.BusyIndicator("fiori2LoadingDialogBusyIndicator");this._oBusyIndicator.setBusyIndicatorDelay(100);this._firstLoading=true;this._start=0;this._end=0;h.setAttribute("id","sapUshellFiori2LoadingArea");h.setAttribute("class","sapUshellFiori2LoadingDialogArea");h.setAttribute("style","height: 0px; width: 0px; overflow: hidden; float: left;");b.insertBefore(h,b.firstChild);d.setAttribute("id","sapUshellLoadingAccessibilityHelper");d.setAttribute("class","sapUshellLoadingAccessibilityHelper");f.setAttribute("id","sapUshellLoadingAccessibilityHelper-appInfo");f.setAttribute("aria-atomic","true");d.appendChild(f);g.setAttribute("id","sapUshellLoadingAccessibilityHelper-loadingComplete");g.setAttribute("aria-atomic","true");g.setAttribute("aria-live","polite");d.appendChild(g);h.appendChild(d);c.setAttribute("id","sapUshellFiori2LoadingDialog");c.setAttribute("style","z-index: 8;visibility: visible;");c.setAttribute("class","sapUshellShellHidden");e.setAttribute("id","sapUshellFiori2LoadingOverlay");e.setAttribute("class","sapUshellFiori2LoadingDialogOverlayStyle");c.appendChild(e);a.setAttribute("id","sapUshellFiori2LoadingBusyIndicator");c.appendChild(a);b.insertBefore(c,h);this._oBusyIndicator.placeAt("sapUshellFiori2LoadingBusyIndicator");};F.prototype.openLoadingScreen=function(a){this.start=new Date().getTime();var j=jQuery("#sapUshellFiori2LoadingOverlay");a=a||"full";jQuery("#sapUshellFiori2LoadingDialog").toggleClass("sapUshellShellHidden",false);if(this._firstLoading){this._firstLoading=false;if(a==='minimal'){j.toggleClass("sapUshellInitialLoadingDialogOverlayNoAnimation",true);}else{j.toggleClass("sapUshellInitialLoadingDialogOverlayAnimation",true);}}else{if(a==='minimal'){j.toggleClass("sapUshellLoadingDialogOverlayNoAnimation",true);}else{j.toggleClass("sapUshellLoadingDialogOverlayAnimation",true);}}if(a!=='minimal'){jQuery("#fiori2LoadingDialogBusyIndicator").toggleClass("sapUshellLoadingDialogBusyIndicatorAnimation",true);}};F.prototype.isOpen=function(){return!jQuery("#sapUshellFiori2LoadingDialog").hasClass("sapUshellShellHidden");};F.prototype.closeLoadingScreen=function(){var j=jQuery("#sapUshellFiori2LoadingOverlay");j.toggleClass("sapUshellAnimationPaused",true);var r=function(){jQuery("#sapUshellFiori2LoadingDialog").toggleClass("sapUshellShellHidden",true);j.toggleClass("sapUshellLoadingDialogOverlayNoAnimation",false);j.toggleClass("sapUshellLoadingDialogOverlayAnimation",false);j.toggleClass("sapUshellInitialLoadingDialogOverlayAnimation",false);jQuery("#fiori2LoadingDialogBusyIndicator").toggleClass("sapUshellLoadingDialogBusyIndicatorAnimation",false);};if(j[0]&&j[0].getBoundingClientRect().width<100){r();j.toggleClass("sapUshellAnimationPaused",false);}else{j.toggleClass("sapUshellAnimationPaused",false);setTimeout(function(){r();},500);}};F.prototype.exit=function(){this._oBusyIndicator.destroy();};return F;});
