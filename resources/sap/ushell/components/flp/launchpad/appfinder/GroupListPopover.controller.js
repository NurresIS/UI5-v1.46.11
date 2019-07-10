// @copyright@
sap.ui.define(function(){"use strict";sap.ui.controller("sap.ushell.components.flp.launchpad.appfinder.GroupListPopover",{onInit:function(){var v=this.getView();var g=v.getViewData().groupData;this.oPopoverModel=new sap.ui.model.json.JSONModel({userGroupList:g});v.oPopover.setModel(this.oPopoverModel);},okButtonHandler:function(e){e.preventDefault();e._bIsStopHandlers=true;var v=this.getView();var u=this.oPopoverModel.getProperty("/userGroupList");var r={addToGroups:[],removeFromGroups:[],newGroups:[],allGroups:u};u.forEach(function(g){if(g.selected===g.initiallySelected){return;}if(g.selected){r.addToGroups.push(g.oGroup);}else{r.removeFromGroups.push(g.oGroup);}});if(v.newGroupInput&&v.newGroupInput.getValue().length){r.newGroups.push(v.newGroupInput.getValue());}v.oPopover.close();v.deferred.resolve(r);},_cancelButtonHandler:function(e){e.preventDefault();e._bIsStopHandlers=true;var v=this.getView();v.oPopover.close();v.deferred.reject();},_navigateToCreateNewGroupPane:function(){var v=this.getView();if(!v.headBarForNewGroup){v.headBarForNewGroup=v._createHeadBarForNewGroup();}if(!v.newGroupInput){v.newGroupInput=v._createNewGroupInput();}v.oPopover.removeAllContent();v.oPopover.addContent(v.newGroupInput);v.oPopover.setCustomHeader(v.headBarForNewGroup);v.oPopover.setContentHeight("");if(v.getViewData().singleGroupSelection){this._setFooterVisibility(true);}setTimeout(function(){v.newGroupInput.focus();},0);},_afterCloseHandler:function(){var v=this.getView();v.oGroupsContainer.destroy();if(v.headBarForNewGroup){v.headBarForNewGroup.destroy();}if(v.newGroupInput){v.newGroupInput.destroy();}v.oPopover.destroy();v.destroy();},_backButtonHandler:function(){var v=this.getView();v.oPopover.removeAllContent();if(v.getViewData().singleGroupSelection){this._setFooterVisibility(false);}if(!sap.ui.Device.system.phone){v.oPopover.setContentHeight(v.iPopoverDataSectionHeight+"px");}else{v.oPopover.setContentHeight("100%");}v.oPopover.setVerticalScrolling(true);v.oPopover.setHorizontalScrolling(false);v.oPopover.addContent(v.oGroupsContainer);v.oPopover.setTitle(sap.ushell.resources.i18n.getText("addTileToGroups_popoverTitle"));v.oPopover.setCustomHeader();v.newGroupInput.setValue('');},_setFooterVisibility:function(v){var f=sap.ui.getCore().byId("groupsPopover-footer");if(f){f.setVisible(v);}}});},false);
