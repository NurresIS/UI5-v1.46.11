/*!
*  @copyright 2012-2014 SAP SE. All rights reserved@
*/
jQuery.sap.require("sap.ui.commons.layout.ResponsiveFlowLayout");jQuery.sap.require("sap.ui.commons.layout.ResponsiveFlowLayoutData");jQuery.sap.declare("sap.landvisz.LandscapeViewerRenderer");jQuery.sap.require("sap.landvisz.internal.Connection");jQuery.sap.require("sap.landvisz.libs.lvsvg");sap.landvisz.LandscapeViewerRenderer={};
sap.landvisz.LandscapeViewerRenderer.render=function(r,c){if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div");r.writeControlData(c);r.addClass("sapLandviszViewMainContainer");r.writeClasses();r.addStyle("width","100%");r.addStyle("height","100%");r.writeStyles();r.write(">");if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.BOTH){c.networkViewVisible=true;c.boxViewVisible=true;}else if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.NETWORK){c.networkViewVisible=true;c.boxViewVisible=false;}else if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.BOX){c.networkViewVisible=false;c.boxViewVisible=true;}this._renderTitle(r,c);if(c.getViewType()==sap.landvisz.ViewType.SOLUTION_VIEW){this._renderSolutionView(r,c);}else{r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-viewLables");r.addClass("sapLandviszViews");r.writeClasses();r.write(">");if(c.networkViewVisible==true)this._renderNetworkViewHeader(r,c);if(c.boxViewVisible==true)this._renderBoxViewHeader(r,c);r.write("</div>");if(c.getShowDependencyNavigator()==true)this._renderNavigationPath(r,c);if(c.getShowClose()==true)this._renderCloseButton(r,c);if(c.getViewType()==sap.landvisz.ViewType.SELECTION_VIEW)this._renderSelectionView(r,c);else if(c.getViewType()==sap.landvisz.ViewType.DEPENDENCY_VIEW){this._renderDependencyView(r,c);}if(c.getViewType()==sap.landvisz.ViewType.DEPENDENCY_VIEW)this._renderNavigationPanel(r,c);}r.write("</div>");}if(c.currentView==sap.landvisz.DependencyType.BOX_VIEW){var b=c.oHLayoutConnectionEntity.getContent();for(var i=0;i<b.length;i++){c.addAggregation("connectionEntities",b[i],false);}}var o=c.oHLayoutOptions.getContent();if(o.length>0){for(var i=0;i<o.length;i++)if(o[i]instanceof sap.landvisz.OptionEntity)c.getSolutionOptions()[0].addOptionEntity(o[i]);}c.firstTime=false;};
sap.landvisz.LandscapeViewerRenderer._renderSolutionView=function(r,c){if(c.getShowDependencyNavigator()==true)this._renderNavigationPath(r,c);if(c.getShowClose()==true)this._renderCloseButton(r,c);r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-solutionViewLables");r.addClass("sapLandviszViews");r.writeClasses();r.write(">");this._renderComponentViewHeader(r,c);this._renderDeploymentViewHeader(r,c);r.write("</div>");if(c.getSolutionType()==sap.landvisz.SolutionType.DEPLOYMENT_VIEW)this._renderOptions(r,c);var s=c.getSystems();for(var i=0;i<s.length;i++)s[i].setShowEntityActions(false);this._renderSolutionViewer(r,c);};
sap.landvisz.LandscapeViewerRenderer._renderComponentViewHeader=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-compViewLabel");r.addClass("sapLandviszView");r.writeClasses();r.write(">");c.compViewBtn.setText(c.getComponentViewLabel());c.compViewBtn.setLite(true);c.compViewBtn.addStyleClass("sapLandviszSolution_view_text");c.compViewBtn.setTooltip(c.getComponentViewTooltip());c.compViewBtn.setIcon("sap-icon://tree");var _=this;if(c.firstTime==true){c.compViewBtn.attachPress(function(e){c.currentSolutionView=sap.landvisz.SolutionType.COMPONENT_VIEW;c.compViewBtn.addStyleClass("selectedView");c.depViewBtn.removeStyleClass("selectedView");c.fireLoadSolutionView();});}r.renderControl(c.compViewBtn);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderDeploymentViewHeader=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-deploymentViewLable");r.addClass("sapLandviszView");r.writeClasses();r.write(">");c.depViewBtn.setText(c.getDeploymentViewLabel());c.depViewBtn.setLite(true);c.depViewBtn.addStyleClass("sapLandviszSolution_view_text");c.depViewBtn.setTooltip(c.getDeploymentViewTooltip());c.depViewBtn.setIcon("sap-icon://dimension");var _=this;if(c.firstTime==true){c.depViewBtn.attachPress(function(e){c.currentSolutionView=sap.landvisz.SolutionType.DEPLOYMENT_VIEW;c.depViewBtn.addStyleClass("selectedView");c.compViewBtn.removeStyleClass("selectedView");c.fireLoadSolutionView();});}r.renderControl(c.depViewBtn);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderSolutionViewer=function(r,c){if(null!=c.getPlugContent())this._renderPlugContent(r,c);r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-solutionViewContainer");r.addClass("sapLandviszSolutionViewContainer");r.writeClasses();var w=c.windowWidth-2;r.addStyle("width",w+"px");var a;if(c.getSolutionType()==sap.landvisz.SolutionType.DEPLOYMENT_VIEW){a=c.getPlugContentHeight()+90;r.addStyle("position","absolute");}else{a=c.getPlugContentHeight()+35;}r.addStyle("height","calc(100% - "+a+"px)");r.addStyle("height","-webkit-calc(100% - "+a+"px)");r.addStyle("height","-moz-calc(100% - "+a+"px)");r.addStyle("height","-o-calc(100% - "+a+"px)");r.addStyle("top",a+"px");r.writeStyles();r.write(">");this._renderSolutionContainer(r,c);this._renderSolution(r,c);if(c.getShowDeploymentTypeSection()==true)this._renderSolutionDeploymentType(r,c);if(c.getSolutionType()==sap.landvisz.SolutionType.COMPONENT_VIEW)this._renderOptions(r,c);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderPlugContent=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-solutionPlugContent");r.addStyle("top","32px");r.addStyle("width","100%");r.addStyle("position","absolute");r.writeStyles();r.write(">");r.renderControl(c.getPlugContent());r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderSolutionContainer=function(r,c){var a=c.getConnectors();c.connection.init();var o=c.getSolutionOptions();var b;if(o.length>0&&o[0].getType()==sap.landvisz.OptionType.VIEW)b=c.getViewConnectedLayout();else b=c.connection.getBoxViewConnectedNodesLayout(a);var m=5;var d=Number((c.entityWidth*b.maxColumnCount)+((b.maxColumnCount+1)*m));var e=Number(c.boxModeHeight+c.entityHeight+(m*3));if(c.getSolutionOptions().length>0&&c.getSolutionType()==sap.landvisz.SolutionType.COMPONENT_VIEW)e=e+50;if(c.getShowDeploymentTypeSection()==true)e=e+40;r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-solutionInnerContainer");r.addClass("sapLandviszBoxViewBorderContainer");r.writeClasses();r.addStyle("width",d+"px");r.addStyle("height",e+"px");r.writeStyles();r.write(">");r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderSolution=function(r,c){c.connection.init();var o=c.getSolutionOptions();var a;if(o.length>0&&o[0].getType()==sap.landvisz.OptionType.VIEW)a=c.getViewConnectedLayout();else{a=c.getEntityConnectedLayout()}var b;var d;var m=5;if(a){var f=c.getId()+"-solutionInnerContainer";var g=jQuery.sap.byId(f);setTimeout(function(){g.css("display","block");},1200);c.visibleEntities=[];var s=c.getSystems();for(var i=0;i<s.length;i++){b=s[i].getSystemId();var l=0;l=30+m;var h=30;if(a[b]){var j=0;if(a.thirdLevelEntitiesCount>0)j=30;var t=0;j+=Number((a[b].col*(c.entityWidth))+((a[b].col+1)*m));t+=Number(((a[b].row-1)*(c.entityHeight))+((a[b].row+1)*m)+c.boxModeHeight);s[i].left=j;s[i].top=t;s[i].viewType=sap.landvisz.ViewType.SOLUTION_VIEW;c.visibleEntities.push(s[i]);r.renderControl(s[i]);}else{s[i].viewType=sap.landvisz.ViewType.SOLUTION_VIEW;s[i].addStyleClass("sapLandviszDisplayNone");r.renderControl(s[i]);}}var k=c.getConnectionEntities();var n=0;for(var i=0;i<k.length;i++){n=0;d=k[i].getConnectionId();if(a[d]){j=Number(a[d].col*(c.entityWidth+10))+m;t=Number(a[d].row*(c.entityHeight+10))+m;n=Number(((a[d].colspan)*c.entityWidth)+((a[d].colspan-1)*m));}k[i].viewType=sap.landvisz.ViewType.SOLUTION_VIEW;k[i].left=j;k[i].top=t;k[i].width=n;k[i].height=90;k[i].innerLeft=0;k[i].innerTop=0;k[i].innerWidth=n;k[i].innerHeight=90;r.renderControl(k[i]);k[i].addStyleClass("connectionBox");}}var p=jQuery.sap.byId(c.getId()+"-navigation");var q=jQuery.sap.byId(c.getId()+"-navigation_navigator");p.animate({height:'0px'},900,"swing",function(e){p.hide();});};
sap.landvisz.LandscapeViewerRenderer._renderSolutionDeploymentType=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-deploymentTypeContainer");r.addClass("sapLandviszDeploymentTypeContainer");r.writeClasses();r.write(">");var o=c.getSolutionOptions();var a;var b;var d;var e;var f;var n;var g=0;var s;var h;var i;var l;b=c.oHLayoutOptions.getContent();for(var j=1;j<b.length;j++){l=new Array();d=b[j].getOptionSources();s=b[j].getSelected();for(var k=0;k<d.length;k++){e=d[k].getSource();f=this._getDesiredSystem(c,d[k].getSource());if(null!=f&&f.getComponentType()==sap.landvisz.ComponentType.notDefined)continue;else if(k+1<d.length){n=this._getDesiredSystem(c,d[k+1].getSource());if(f.getComponentType()==n.getComponentType()){g++;}else{i=this._getDesiredSystem(c,d[k-g].getSource());h=this._renderDeploymentType(r,c,g,i.left,f.getComponentType(),f.getComponentTypeTooltip(),s,i.getSystemId());l.push(h);g=0}}else{i=this._getDesiredSystem(c,d[k-g].getSource());h=this._renderDeploymentType(r,c,g,i.left,f.getComponentType(),f.getComponentTypeTooltip(),s,i.getSystemId());l.push(h);g=0}}c.depTypeOptions[b[j].getId()]=l;}r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._getDesiredSystem=function(c,a){var s=c.getSystems();for(var i=0;i<s.length;i++){if(s[i].getSystemId()==a)return s[i];}return null;};
sap.landvisz.LandscapeViewerRenderer._renderDeploymentType=function(r,c,a,l,t,b,s,d){var D=new sap.landvisz.internal.DeploymentType();D.left=l;D.count=a;D.type=t;D.srcEntityId=d;D.setTooltip(b);D.standardWidth=c.entityWidth;if(s==true)D.addStyleClass("sapLandviszDisplayBlock");else D.addStyleClass("sapLandviszDisplayNone");r.renderControl(D);return D;};
sap.landvisz.LandscapeViewerRenderer._renderOptions=function(r,c){var o=c.getSolutionOptions();if(o.length<=0)return;r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-optionContainer");if(c.getSolutionOptionType()==sap.landvisz.OptionType.VIEW)r.addClass("sapLandviszOptionContainer");else if(c.getSolutionOptionType()==sap.landvisz.OptionType.ENTITY)r.addClass("sapLandviszEntityOptionContainer");r.writeClasses();if(c.getSolutionOptionType()==sap.landvisz.OptionType.VIEW){var w=c.windowWidth-2;r.addStyle("width",w+"px");r.writeStyles();}r.write(">");this._createOptions(r,c);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._createOptions=function(r,c){if(c.getSolutionOptionType()==sap.landvisz.OptionType.VIEW){this._renderViewOptions(r,c,c.getSolutionOptionType());}else if(c.getSolutionOptionType()==sap.landvisz.OptionType.ENTITY){this._createEntityOptions(r,c);}};
sap.landvisz.LandscapeViewerRenderer._createEntityOptions=function(r,c){var o=c.getSolutionOptions();var a;var s=c.getSystems();var b;var d;var t=this;for(var i=0;i<o.length;i++){a=o[i].getOptionEntities();if(""==c.srcEntity)c.srcEntity=o[i].getCurrentEntity();for(var j=0;j<a.length;j++){for(var l=0;l<s.length;l++){if(c.srcEntity==s[l].getSystemId()){b=s[l].left;d=s[l].top;break;}}b=b+c.entityWidth/2-50+50*j;a[j].left=b;a[j].optionOn=o[i].getType();a[j].optionSrcEntityId=c.srcEntity;a[j].attachEvent("optionSelected",function(e){var f=e.getSource();var g=f.getOptionSources();var h;for(var i=0;i<g.length;i++){h=g[i].getSource();}if(c.srcEntity==h)return;c.selectedOptionEntity=f;for(var i=0;i<o.length;i++){a=o[i].getOptionEntities();for(var j=0;j<a.length;j++){if(c.srcEntity==a[j].optionSrcEntityId&&f.getId()==a[j].getId()){jQuery.sap.byId(a[j].getId()).css({"background-color":"#008fd3","color":"#ffffff"});}else{jQuery.sap.byId(a[j].getId()).css({"background-color":"transparent","color":"#00669c"});a[j].setSelected(false);}}}t._makeOptionVisible(r,c,e);});r.renderControl(a[j]);}}};
sap.landvisz.LandscapeViewerRenderer._renderViewOptions=function(r,c,o){var a=c.getSolutionOptions();var b=a[0].getOptionEntities();if(b.length>0){var t=c.getDeploymentOptionsLabel();c.deploymentOptionLabel.setText(t);c.deploymentOptionLabel.setTooltip(c.getDeploymentOptionsTooltip());c.deploymentOptionLabel.addStyleClass("sapLandviszOptionLabel");c.oHLayoutOptions.addContent(c.deploymentOptionLabel);}var d=this;for(var i=0;i<b.length;i++){b[i].optionOn=o;if(b[i].getSelected()==true){c.currentViewOptionId=b[i].getId();c.selectedOptionEntity=b[i];}b[i].attachEvent("optionSelected",function(e){var f=e.getSource();if(c.currentViewOptionId==f.getId())return;c.selectedOptionEntity=f;var g;b=c.oHLayoutOptions.getContent();b=c.getSolutionOptions()[0].getOptionEntities();for(var j=0;j<b.length;j++){g=jQuery.sap.byId(b[j].getId());g.css({"background-color":"transparent","color":"#00669c"});if(f.getId()==b[j].getId()){b[j].setSelected(true);}else{b[j].removeStyleClass("optionSelected");b[j].setSelected(false);}}d._makeOptionVisible(r,c,e);});c.oHLayoutOptions.addContent(b[i]);}r.renderControl(c.oHLayoutOptions);};
sap.landvisz.LandscapeViewerRenderer._makeOptionVisible=function(r,c,e){var o=e.getSource();if(o.optionOn==sap.landvisz.OptionType.VIEW){this._makeViewOptionVisible(r,c,o);}else if(o.optionOn==sap.landvisz.OptionType.ENTITY){this._makeEntityOptionVisible(r,c,o);}};
sap.landvisz.LandscapeViewerRenderer._makeViewOptionVisible=function(r,c,o){if(c.currentViewOptionId==o.getId())return;c.currentViewOptionId=o.getId();var s=c.getSystems();var a;for(var i=0;i<s.length;i++){s[i].removeStyleClass("sapLandviszDisplayNone");a=jQuery.sap.byId(s[i].getId());a.hide("600");}var d=c.getId()+"-deploymentTypeContainer";var b=jQuery.sap.byId(d);var e=c.depTypeOptions[c.selectedOptionEntity.getId()];var f=b.children();var g;for(var x=0;x<f.length;x++){g=jQuery.sap.byId(f[x].id);g.css({"display":"none"});}var h=o.getOptionSources();var j;var k=c.getConnectors();var l=k[0].getSource();var m=[];var n;for(var i=0;i<h.length;i++){n=new sap.landvisz.Connector();j=h[i].getSource();n.setSource(l);n.setTarget(j);m.push(n);}var p;var q;var t=5;var a;var u;c.connection.init();var v=c.connection.getBoxViewConnectedNodesLayout(m);if(v){var w=Number((c.entityWidth*v.maxColumnCount)+((v.maxColumnCount+1)*t));var y=Number(c.boxModeHeight+c.entityHeight+(t*3));var d=c.getId()+"-deploymentTypeContainer";if(e&&e.length>0){y=y+40;jQuery.sap.byId(d).css({"display":"block",});}else{jQuery.sap.byId(d).css({"display":"none",});}var z=c.getId()+"-solutionInnerContainer";var A=jQuery.sap.byId(z);A.animate({width:w,height:y},400);setTimeout(function(){var z=c.getId()+"-solutionInnerContainer";var A=jQuery.sap.byId(z);var B=A[0].offsetLeft;var C=A[0].offsetTop;var D=0;var E=c.getConnectionEntities();for(var i=0;i<E.length;i++){q=E[i].getConnectionId();if(v[q]){L=Number(v[q].col*(c.entityWidth+10));M=Number(v[q].row*(c.entityHeight+10));L=Number(v[q].col*(c.entityWidth+10))+t;M=Number(v[q].row*(c.entityHeight+10))+t;E[i].left=L+B;D=E[i].top;E[i].top=L+C;u=Number(((v[q].colspan)*c.entityWidth)+((v[q].colspan-1)*t));var F=jQuery.sap.byId(E[i].getId());F.animate({left:E[i].left,top:E[i].top,width:u,height:90,},600,'swing');var G=jQuery.sap.byId(E[i].getId()+"connectionRow");G.animate({width:u,height:90,},600,'swing');var H=jQuery.sap.byId(E[i].getId()+"-connectionLabel");var I=u-68;H.css({"max-width":I,});}}c.visibleEntities=[];for(var i=0;i<s.length;i++){p=s[i].getSystemId();var J=0;J=30+t;var K=30;if(v[p]){var L=0;var M=0;L+=Number((v[p].col*(c.entityWidth))+((v[p].col+1)*t));M+=Number(((v[p].row-1)*(c.entityHeight))+((v[p].row+1)*t)+c.boxModeHeight);s[i].left=L+B;s[i].top=M+C;a=jQuery.sap.byId(s[i].getId());a.css({left:L+B,top:M+C});a.show("700");c.visibleEntities.push(s[i]);}}var d=c.getId()+"-deploymentTypeContainer";var b=jQuery.sap.byId(d);b.css({left:B,width:w,});var N;var O;if(e&&e.length>0){for(var x=0;x<e.length;x++){g=e[x];for(var i=0;i<s.length;i++){if(s[i].getSystemId()==g.srcEntityId){O=s[i];break;}}N=O.left-B;jQuery.sap.byId(g.getId()).css({"display":"block","left":N});}}},405);}};
sap.landvisz.LandscapeViewerRenderer._makeEntityOptionVisible=function(r,c,o){var s=c.getSystems();var a=o.getOptionSources();o.setSelected(true);var e;for(var i=0;i<a.length;i++){e=a[i].getSource();}if(c.srcEntity==e)return;var b;var d;var f;var g=false;for(var k=0;k<s.length;k++){if(c.srcEntity==s[k].getSystemId()){b=jQuery.sap.byId(s[k].getId());d=s[k].left;f=s[k].top;b.hide("800");break;}}setTimeout(function(){for(var l=0;l<s.length;l++){if(e==s[l].getSystemId()){b=jQuery.sap.byId(s[l].getId());b.css({left:d,top:f});s[l].left=d;s[l].top=f;s[l].removeStyleClass("sapLandviszDisplayNone");c.srcEntity=s[l].getSystemId();b.show("800");break;}}},810);};
sap.landvisz.LandscapeViewerRenderer._renderNavigationPath=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigationPath");r.addClass("sapLandviszDependencyPath");r.writeClasses();r.write(">");c.navigationPathLabel.setText(c.getNavigationPath());c.navigationPathLabel.setTooltip(c.getNavigationPath());c.navigationPathLabel.addStyleClass("sapLandviszDependencyPathLabel");r.renderControl(c.navigationPathLabel);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderSelectionView=function(r,c){var s=c.getSystems();var a=s[0].getActionBar();for(var j=0;j<a.length;j++){a[j].attachEvent("changeView",function(d){c.resetView(s[0],d.oSource);},this);}var l=0;var t=0;var e=0;var b=0;var o=c.windowHeight-28-2;r.write("<div");r.addStyle("width","100%");r.addStyle("height",o+"px");r.addStyle("overflow","auto");r.addStyle("box-sizing","border-box");r.addStyle("top","28px");r.addStyle("position","absolute");r.writeStyles();r.writeAttributeEscaped("id",c.getId()+"-outerContainer");r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-container");r.writeClasses();r.addStyle("position","absolute");r.addStyle("box-sizing","border-box");if(s[0].entityMaximized==true){e=c.windowWidth-40;b=c.windowHeight-66;l=20;t=20;s[0].sViewWidth=e;s[0].sViewHeight=b;}else if(s[0].expVisible==true){e=c.windowWidth-12;b=c.windowHeight;l=10;r.addStyle("position","relative");s[0].sViewWidth=e-c.entityWidth;s[0].sViewHeight=b;}else{s[0].sViewWidth=0;s[0].sViewHeight=0;}r.addStyle("left",l+"px");r.addStyle("top",t+"px");if(e!=0)r.addStyle("width",e+"px");else r.addStyle("width",c.entityWidth+"px");if(b!=0)r.addStyle("height",b+"px");else r.addStyle("height",c.entityHeight+"px");r.writeStyles();r.write(">");s[0].viewType=sap.landvisz.ViewType.SELECTION_VIEW;s[0].display="block";r.renderControl(s[0]);r.write("</div>");r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderDependencyView=function(r,c){var s=c.getSystems();for(var i=0;i<s.length;i++)s[i].setShowEntityActions(false);r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-viewContainer");r.writeClasses();var w=c.windowWidth-2;var h=c.windowHeight-26;r.addStyle("width",w+"px");r.addStyle("height",h+"px");r.addStyle("position","absolute");r.addStyle("overflow","hidden");r.addStyle("top",26+"px");r.writeStyles();r.write(">");this._renderBoxContainer(r,c);if(c.currentView!=""&&c.currentView==sap.landvisz.DependencyType.NETWORK_VIEW)this._renderNetworkView(r,c);else if(c.currentView!=""&&c.currentView==sap.landvisz.DependencyType.BOX_VIEW)this._renderBoxView(r,c);else if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.BOTH){if(c.getDefaultDependencyView()==sap.landvisz.DependencyType.NETWORK_VIEW)this._renderNetworkView(r,c);if(c.getDefaultDependencyView()==sap.landvisz.DependencyType.BOX_VIEW)this._renderBoxView(r,c);}else if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.NETWORK)this._renderNetworkView(r,c);else if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.BOX)this._renderBoxView(r,c);this._renderBoxViewLabels(r,c);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderCloseButton=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-closeBtn");r.addClass("sapLandviszCloseButton");r.writeClasses();r.write(">");c.closeImg.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/framework/"+"16x16"+"/close_enable_dark.png"));c.closeImg.setTooltip(c.getCloseButtonTooltip());if(c.firstTime==true)c.closeImg.attachPress(function(e){c.fireClose();});r.renderControl(c.closeImg);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderNetworkViewHeader=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-netwrokViewLable");r.addClass("sapLandviszView");r.writeClasses();r.write(">");c.networkViewBtn.setText(c.getNetworkDependencyLabel());c.networkViewBtn.setLite(true);c.networkViewBtn.addStyleClass("sapLandviszView_text");c.networkViewBtn.setTooltip(c.getNetworkDependencyLabel());var t=c.getViewType();c.networkViewBtn.setIcon("sap-icon://overview-chart");if(t==sap.landvisz.ViewType.SELECTION_VIEW){c.networkViewBtn.setEnabled(false);}else if(t==sap.landvisz.ViewType.DEPENDENCY_VIEW){c.networkViewBtn.setEnabled(true);}var _=this;if(c.firstTime==true){c.networkViewBtn.attachPress(function(e){c.networkViewBtn.addStyleClass("selectedView");c.boxViewBtn.removeStyleClass("selectedView");_.renderAllEntities(r,c,false);});}r.renderControl(c.networkViewBtn);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderBoxViewHeader=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-boxViewLable");r.addClass("sapLandviszView");r.writeClasses();r.write(">");c.boxViewBtn.setText(c.getBoxDependencyLabel());c.boxViewBtn.setLite(true);c.boxViewBtn.addStyleClass("sapLandviszView_text");c.boxViewBtn.setTooltip(c.getBoxDependencyLabel());var t=c.getViewType();c.boxViewBtn.setIcon("sap-icon://table-view");if(t==sap.landvisz.ViewType.SELECTION_VIEW){c.boxViewBtn.setEnabled(false);}else if(t==sap.landvisz.ViewType.DEPENDENCY_VIEW){c.boxViewBtn.setEnabled(true);}var _=this;if(c.firstTime==true){c.boxViewBtn.attachPress(function(e){c.boxViewBtn.addStyleClass("selectedView");c.networkViewBtn.removeStyleClass("selectedView");_.renderAllBoxViewEntities(r,c,false);});}r.renderControl(c.boxViewBtn);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderTitle=function(r,c){var a;a=c.getTitle();r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-viewHeaderContainer");r.addClass("sapLandviszViewer_container_header");r.writeClasses();r.writeAttributeEscaped("title",a);r.write(">");r.write(a);r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderNetworkView=function(r,c){this.renderAllEntities(r,c,true);};
sap.landvisz.LandscapeViewerRenderer.renderAllEntities=function(r,c,a){var b=c.getConnectors();c.currentView=sap.landvisz.DependencyType.NETWORK_VIEW;var d=c.getId()+"-boxViewContainer";var f=jQuery.sap.byId(d);if(f)f.css("display","none");var g=c.getBoxDependencyLevels();if(g){for(var i=0;i<g.length;i++){var h=c.getId()+"-boxViewLabel"+i;var j=jQuery.sap.byId(h);if(j)j.css("display","none");}}c.connection.init();var k;if(c.getConnectionLine()==sap.landvisz.ConnectionLine.Line)k=c.connection.getConnectedNodesLayout(b);else k=c.connection.getConnectedNodesLayoutTrack(b);var s=c.getSystems();var l=c.getConnectionEntities();var m=50;if(l.length>0)m=0;var n;var o;for(var i=0;i<s.length;i++){n=s[i].getSystemId();if(k[n]){var p=0;var t=0;p=Number(k[n].col*(c.entityWidth+10+m));t=Number(k[n].row*(c.entityHeight+10+m));}s[i].left=p;s[i].top=t;s[i].viewType=sap.landvisz.ViewType.DEPENDENCY_VIEW;if(a==true)r.renderControl(s[i]);else this._moveEntityToPosition(p,t,s[i].getId());}for(var i=0;i<l.length;i++){o=l[i].getConnectionId();if(c.firstTime==true){l[i].attachEvent("connectionMouseover",function(e){c.onmouseenter(e);},this);l[i].attachEvent("connectionMouseout",function(e){c.onmouseleave(e);},this);}if(k[o]){p=Number(k[o].col*(c.entityWidth+10));t=Number(k[o].row*(c.entityHeight+10));}l[i].left=p;l[i].top=t;l[i].width=c.entityWidth;l[i].height=c.entityHeight;l[i].innerLeft=(c.entityWidth-50)/2;l[i].innerTop=(c.entityHeight-50)/2;l[i].innerWidth=50;l[i].innerHeight=50;l[i].viewType=c.currentView;if(a==true){l[i].addStyleClass("sapLandviszConnection_entity_container");r.renderControl(l[i]);}else{l[i].addStyleClass("sapLandviszConnection_entity_container");l[i].removeStyleClass("sapLandviszConnectionBox");this._animateConnectionEntityContainer(c.entityWidth,c.entityHeight,l[i]);}}if(c.connection.svgForConnections)c.connection.svgForConnections.style("display","block");else if(a==false){var q=jQuery.sap.byId(c.getId()+"-navigation");var u=jQuery.sap.byId(c.getId()+"-navigation_navigator");q.animate({height:'0px'},1000,"swing",function(e){q.hide();});setTimeout(function(){if(c.svgForConnections){c.connection.svgForConnections=c.svgForConnections;c.connection.svgForConnections.style("display","block");}else{var v=jQuery.sap.byId(c.getId()+"-viewContainer");var e=v[0].scrollWidth-10;var w=v[0].scrollHeight-10;c.svgForConnections=sap.landvisz.libs.lvsvg.getSVG(e,w,c.getId()+"-viewContainer");c.connection=sap.landvisz.internal.Connection;c.connection.svgForConnections=c.svgForConnections;c.connection.renderConnections(c.getSystems(),c.getConnectionEntities(),this.getConnectionLine());}var x=jQuery.sap.byId(c.getId()+"-viewContainer");var y=Number(x[0].scrollHeight);var z=Number(x[0].scrollWidth);var A=Number(x.height());var B=Number(x.width());if((z>B)||(y>A))c.getVisibleRegion();},1500);}};
sap.landvisz.LandscapeViewerRenderer._renderBoxContainer=function(r,c){var a=c.getConnectors();c.connection.init();var b=c.connection.getBoxViewConnectedNodesLayout(a);var m=5;var d=Number((c.entityWidth*b.maxColumnCount)+((b.maxColumnCount+1)*m));if(b.thirdLevelEntitiesCount>0){d+=30+m;}var e=Number(c.boxModeHeight+c.entityHeight+(m*3));if(b.thirdLevelEntitiesCount>0){e+=Number(c.entityHeight+m);}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-boxViewContainer");r.addClass("sapLandviszBoxViewBorderContainer");r.writeClasses();r.addStyle("width",d+"px");r.addStyle("height",e+"px");r.addStyle("top",10+"px");r.writeStyles();r.write(">");r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderBoxViewLabels=function(r,c){var l=30;var a=c.entityHeight;var m=5;var b=c.boxLeftMargine+m;var d=c.boxModeHeight+(m*2)+c.boxTopMargine;var e=c.getBoxDependencyLevels();var p;if(e){for(var i=0;i<e.length;i++){d+=((c.entityHeight+m)*i);p=c.getId()+"-boxViewLabel"+i;r.write("<div");r.writeAttributeEscaped("id",p);r.writeAttributeEscaped("title",e[i]);r.addClass("sapLandviszBoxContainerLevelHeader");r.writeClasses();r.addStyle("left",b+"px");r.addStyle("top",d+"px");r.addStyle("height",a+"px");r.addStyle("width",l+"px");r.addStyle("display","none");r.writeStyles();r.write(">");r.write("<div");r.addClass("sapLandviszLevelLabel");r.writeClasses();r.writeAttributeEscaped("id",p+"Level");r.writeAttributeEscaped("title",e[i]);r.addStyle("height","100%");r.addStyle("width","100%");r.addStyle("left","3px");r.writeStyles();r.write(">");r.write(e[i]);r.write("</div>");r.write("</div>");}}};
sap.landvisz.LandscapeViewerRenderer._renderNavigationPanel=function(r,c){r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigation");r.addClass("sapLandviszClv_container_frame_navigation");r.writeAttributeEscaped("draggable","true");r.addClass("no-draggable");r.addClass("no-resizable");r.addClass("ui-draggable");r.writeClasses();r.addStyle("bottom","0px");r.addStyle("right","0px");r.addStyle("height","28%");r.addStyle("background-size","100%");r.addStyle("display","block");r.writeStyles();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigation_header");r.addClass("navigationHeader");r.writeClasses();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigation_header_arrowup");r.addClass("navigationBarButton");r.addClass("arrowUp");r.writeClasses();r.writeAttributeEscaped("title",c.SHOW_NAV_TEXT);r.write(">");r.write("</div>");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigation_header_arrowdown");r.addClass("navigationBarButton");r.addClass("arrowDown");r.writeClasses();r.writeAttributeEscaped("title",c.HIDE_NAV_TEXT);r.write(">");r.write("</div>");r.write("</div>");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-navigation_navigator");r.writeAttributeEscaped("draggable","true");r.addClass("navigationNavigator");r.addClass("ui-draggable");r.writeClasses();r.write(">");r.write("</div>");r.write("</div>");};
sap.landvisz.LandscapeViewerRenderer._renderBoxView=function(r,c){this.renderAllBoxViewEntities(r,c,true);};
sap.landvisz.LandscapeViewerRenderer.renderAllBoxViewEntities=function(r,c,a){c.currentView=sap.landvisz.DependencyType.BOX_VIEW;if(c.connection.svgForConnections!=null)c.connection.svgForConnections.style("display","none");var s=c.getSystems();var b=c.getConnectionEntities();var d=c.getConnectors();c.connection.init();var f=c.connection.getBoxViewConnectedNodesLayout(d);var g;var h;var m=5;if(f){var j=c.getId()+"-boxViewContainer";var k=jQuery.sap.byId(j);setTimeout(function(){k.css("display","block");},1200);for(var i=0;i<s.length;i++){g=s[i].getSystemId();var l=0;l=30+m;var n=30;if(f[g]){var o=0;if(f.thirdLevelEntitiesCount>0)o=30;var t=0;o+=Number((f[g].col*(c.entityWidth))+((f[g].col+1)*m));t+=Number(((f[g].row-1)*(c.entityHeight))+((f[g].row+1)*m)+c.boxModeHeight);s[i].left=o;s[i].top=t;s[i].viewType=sap.landvisz.ViewType.DEPENDENCY_VIEW;if(a==true){s[i].left=o;s[i].top=t;r.renderControl(s[i]);}else{s[i].left=o+c.boxLeftMargine;s[i].top=t+c.boxTopMargine;this._moveEntityToPosition(s[i].left,s[i].top,s[i].getId());}}}var p=0;for(var i=0;i<b.length;i++){if(c.firstTime==true){b[i].attachEvent("connectionMouseover",function(e){c.onmouseenter(e);},this);b[i].attachEvent("connectionMouseout",function(e){c.onmouseleave(e);},this);}p=0;h=b[i].getConnectionId();if(f[h]){if(c.currentView==sap.landvisz.DependencyType.BOX_VIEW){o=Number(f[h].col*(c.entityWidth+10))+m;t=Number(f[h].row*(c.entityHeight+10))+m;p=Number(((f[h].colspan)*c.entityWidth)+((f[h].colspan-1)*m));}}b[i].viewType=c.currentView;b[i].left=o;if(f.thirdLevelEntitiesCount>0)b[i].left=o+30;b[i].top=t;b[i].width=p;b[i].height=90;b[i].innerLeft=0;b[i].innerTop=0;b[i].innerWidth=p;b[i].innerHeight=90;if(c.getVisibleDependency()==sap.landvisz.DependencyVisibility.BOTH&&c.getDefaultDependencyView()==sap.landvisz.DependencyType.NETWORK_VIEW){if(b[i].toolPopup.isOpen())b[i].toolPopup.close();}if(a==true){r.renderControl(b[i]);b[i].left=o;if(f.thirdLevelEntitiesCount>0)b[i].left=o+30;b[i].top=t;b[i].viewType=c.currentView;b[i].width=p;b[i].height=0;b[i].addStyleClass("sapLandviszConnectionBox");}else{b[i].left=o+c.boxLeftMargine;if(f.thirdLevelEntitiesCount>0)b[i].left=o+c.boxLeftMargine+30;b[i].top=t+c.boxTopMargine;b[i].addStyleClass("sapLandviszConnectionBox");b[i].removeStyleClass("sapLandviszConnection_entity_container");this._animateConnectionEntityContainer(p,90,b[i]);}}}if(f.thirdLevelEntitiesCount>0){c.hasBoxThirdLevel=true;var q=30;var u=c.entityHeight;var v=c.boxLeftMargine+m;var w=c.boxModeHeight+(m*2)+c.boxTopMargine;var x=c.getBoxDependencyLevels();var y="Systems";var z="Systems";if(a==false){setTimeout(function(){if(x){for(var i=0;i<x.length;i++){var e=c.getId()+"-boxViewLabel"+i;var C=jQuery.sap.byId(e);w+=((c.entityHeight+m)*i);C.css("display","block");C.css({left:v,top:w,width:q,height:u,});var D=jQuery.sap.byId(e+"Level");D.css({width:u,height:u,});}}},1000);}}if(a==false){var A=jQuery.sap.byId(c.getId()+"-navigation");var B=jQuery.sap.byId(c.getId()+"-navigation_navigator");A.animate({height:'0px'},900,"swing",function(e){A.hide();});setTimeout(function(){var e=jQuery.sap.byId(c.getId()+"-viewContainer");var C=Number(e[0].scrollHeight);var D=Number(e[0].scrollWidth);var E=Number(e.height());var F=Number(e.width());if((D>F)||(C>E))c.getVisibleRegion();},1000);}};
sap.landvisz.LandscapeViewerRenderer._moveEntityToPosition=function(l,t,e){var a=jQuery.sap.byId(e);a.animate({left:l,top:t,},1000);};
sap.landvisz.LandscapeViewerRenderer._animateConnectionEntityContainer=function(e,a,c){var b=jQuery.sap.byId(c.getId());b.animate({left:c.left,top:c.top,width:e,height:a,},1000,'swing');var d=c.getId()+"connectionRow";var f=jQuery.sap.byId(d);f.animate({left:c.innerLeft,top:c.innerTop,width:c.innerWidth,height:c.innerHeight,},1000,'swing');};
