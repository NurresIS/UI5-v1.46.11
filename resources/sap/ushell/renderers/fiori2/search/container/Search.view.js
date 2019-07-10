// Copyright (c) 2009-2014 SAP SE, All Rights Reserved
(function(g){"use strict";jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchLayout");jQuery.sap.require("sap.m.BusyDialog");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchResultListContainer");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchNoResultScreen");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchFacetFilter");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.DivContainer");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchTilesContainer");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchResultList");jQuery.sap.require("sap.ushell.renderers.fiori2.search.controls.SearchResultTable");jQuery.sap.require('sap.ushell.renderers.fiori2.search.SearchHelper');jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchFilterBar');jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchLabel');jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchLink');jQuery.sap.require("sap.ushell.services.Personalization");jQuery.sap.require("sap.m.TablePersoController");jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchResultListItem');jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.SearchResultMap');jQuery.sap.require('sap.ushell.renderers.fiori2.search.controls.CustomSearchResultListItem');jQuery.sap.require("sap.ui.vbm.AnalyticMap");jQuery.sap.require("sap.ui.vbm.Spot");var S=sap.ushell.renderers.fiori2.search.controls.SearchLayout;var a=sap.ushell.renderers.fiori2.search.controls.SearchResultListContainer;var b=sap.ushell.renderers.fiori2.search.controls.SearchResultList;var c=sap.ushell.renderers.fiori2.search.controls.SearchResultTable;var d=sap.ushell.renderers.fiori2.search.controls.SearchNoResultScreen;var s=sap.ushell.renderers.fiori2.search.SearchHelper;var f=sap.ushell.renderers.fiori2.search.controls.SearchLabel;var j=sap.ushell.renderers.fiori2.search.controls.SearchLink;var k=sap.ushell.renderers.fiori2.search.controls.SearchResultMap;var l=sap.ushell.renderers.fiori2.search.controls.SearchResultListItem;var C=sap.ushell.renderers.fiori2.search.controls.CustomSearchResultListItem;sap.ui.jsview("sap.ushell.renderers.fiori2.search.container.Search",{createContent:function(o){var t=this;t.centerArea=t.assembleCenterArea();var e=new sap.m.MessageStrip({text:sap.ushell.resources.i18n.getText('did_you_mean','{/queryFilter/searchTerms}'),showIcon:true,class:'sapUiMediumMarginBottom',visible:{parts:[{path:'/fuzzy'},{path:'/boCount'}],formatter:function(h,i){if(h===true&&i>0){return true;}else{return false;}}}});var r=new a({centerAreaHeader:null,centerArea:t.centerArea,didYouMeanBar:e,totalCountBar:t.assembleCountLabel(),noResultScreen:new d({searchBoxTerm:{parts:[{path:'/queryFilter/searchTerms'}],formatter:function(h){return h;}},visible:{parts:[{path:'/count'},{path:'/isBusy'}],formatter:function(h,i){return h===0&&!i;}}})});t.searchLayout=new S({resultListContainer:r,busyIndicator:new sap.m.BusyDialog(),isBusy:'{/isBusy}',showFacets:{parts:[{path:'/count'},{path:'/facetVisibility'},{path:'/uiFilter/defaultConditionGroup'}],formatter:function(h,i,m){if(!i){return false;}var n=m&&m.conditions&&m.conditions.length>0;if(h===0&&!n){return false;}return true;}},vertical:false,facets:new sap.ushell.renderers.fiori2.search.controls.SearchFacetFilter()});t.searchLayout.addStyleClass('sapUshellSearchLayout');t.searchContainer=new sap.ushell.renderers.fiori2.search.controls.DivContainer({content:[t.searchLayout],cssClass:'sapUshellSearchContainer'});t.oFocusHandler=new s.SearchFocusHandler(t);return t.searchContainer;},assembleFilterButton:function(){var t=this;var e=new sap.m.ToggleButton({icon:sap.ui.core.IconPool.getIconURI("filter"),tooltip:{parts:[{path:'/facetVisibility'}],formatter:function(h){return h?sap.ushell.resources.i18n.getText("hideFacetBtn_tooltip"):sap.ushell.resources.i18n.getText("showFacetBtn_tooltip");}},pressed:'{/facetVisibility}',press:function(){if(this.getPressed()){t.getModel().setFacetVisibility(true);}else{t.getModel().setFacetVisibility(false);}},visible:{parts:[{path:'/businessObjSearchEnabled'},{path:'/count'}],formatter:function(h,i){if(i===0){return false;}return!sap.ui.Device.system.phone&&h;}}});e.addStyleClass('searchBarFilterButton');return e;},searchToolbarEntryVisibility:{parts:[{path:'/count'}],formatter:function(e){return e!==0&&!sap.ui.Device.system.phone;}},assembleCountLabel:function(){var e=new sap.m.Label({visible:{parts:[{path:'/count'}],formatter:function(h){return h!==0;}},text:{parts:[{path:'/count'}],formatter:function(h){if(typeof h!=='number'){return"";}var i=s.formatInteger(h);return sap.ushell.resources.i18n.getText("results")+' ('+i+')';}}});e.addStyleClass('sapUshellSearchTotalCountSelenium');return e;},assembleSearchToolbar:function(w){var t=this;var e=t.assembleDisplaySwitchTapStrips();var h=new sap.m.Button({icon:"sap-icon://sort",tooltip:"{i18n>sortTable}",type:sap.m.ButtonType.Transparent,enabled:{parts:[{path:'/displaySwitchVisibility'},{path:'/count'},{path:'/tableSortableColumns'}],formatter:function(n,o,p){return n&&o!==0&&p.length>1;}},press:function(n){t.tableSortDialog.open();},visible:jQuery.extend({},this.searchToolbarEntryVisibility)});var i=new sap.m.Button("tablePersonalizeButton",{icon:"sap-icon://action-settings",tooltip:"{i18n>personalizeTable}",type:sap.m.ButtonType.Transparent,enabled:{parts:[{path:'/resultToDisplay'}],formatter:function(r){return r==="searchResultTable";}},press:function(n){t.oTablePersoController.openDialog();},visible:jQuery.extend({},this.searchToolbarEntryVisibility)});if(!w){var m=this.assembleShareButton();return[e,h,i,m];}else{return[e,h,i];}},assembleShareButton:function(){var t=this;var B=new sap.ushell.ui.footerbar.AddBookmarkButton({beforePressHandler:function(){var h={url:document.URL,title:t.getModel().getDocumentTitle(),icon:sap.ui.core.IconPool.getIconURI("search")};B.setAppData(h);}});B.setWidth('auto');var e=new sap.m.Button();e.setIcon("sap-icon://email");e.setText(sap.ushell.resources.i18n.getText("eMailFld"));e.attachPress(function(){sap.m.URLHelper.triggerEmail(null,t.getModel().getDocumentTitle(),document.URL);});e.setWidth('auto');var A=new sap.m.ActionSheet({placement:'Bottom',buttons:[B,e]});var o=new sap.m.Button({icon:'sap-icon://action',tooltip:sap.ushell.resources.i18n.getText('shareBtn'),press:function(){A.openBy(o);}});return o;},assembleDataSourceTapStrips:function(){var t=this;var e=new sap.m.OverflowToolbar({design:sap.m.ToolbarDesign.Transparent,visible:{parts:[{path:'/facetVisibility'},{path:'/count'},{path:'/businessObjSearchEnabled'}],formatter:function(i,m,n){return!i&&m>0&&n;}}});e.data("sap-ui-fastnavgroup","false",true);e.addStyleClass('searchTabStrips');t.tabBar=e;var h=new sap.ui.core.InvisibleText({text:"Data Sources"}).toStatic();e.addDependent(h);e.addAriaLabelledBy(h);e.bindAggregation('content','/tabStrips/strips',function(I,o){var m=new sap.m.ToggleButton({text:'{labelPlural}',type:{parts:[{path:'/tabStrips/selected'}],formatter:function(i){var p=this.getBindingContext().getObject();if(p.equals(i)===true){return sap.m.ButtonType.Transparent;}else{return sap.m.ButtonType.Transparent;}}},pressed:{parts:[{path:'/tabStrips/selected'}],formatter:function(i){var p=this.getBindingContext().getObject();return p.equals(i);}},press:function(p){this.setType(sap.m.ButtonType.Transparent);if(this.getBindingContext().getObject().equals(t.getModel().getProperty('/tabStrips/selected'))){this.setPressed(true);return;}var B=t.tabBar.getContent();for(var i=0;i<B.length;i++){if(B[i].getId()!==this.getId()){B[i].setType(sap.m.ButtonType.Transparent);if(B[i].getPressed()===true){B[i].setPressed(false);}}}t.getModel().setDataSource(this.getBindingContext().getObject());}});var n=new sap.ui.core.InvisibleText({text:o.getProperty("labelPlural")+", "+sap.ushell.resources.i18n.getText("dataSource")}).toStatic();m.addAriaLabelledBy(n);m.addDependent(n);return m;});e._setupItemNavigation=function(){if(!this.theItemNavigation){this.theItemNavigation=new sap.ui.core.delegate.ItemNavigation();this.addDelegate(this.theItemNavigation);}this.theItemNavigation.setCycling(false);this.theItemNavigation.setRootDomRef(this.getDomRef());var m=[];var n=this.getContent();for(var i=0;i<n.length;i++){if(!$(n[i].getDomRef()).attr("tabindex")){var o="-1";if(n[i].getPressed&&n[i].getPressed()){o="0";}$(n[i].getDomRef()).attr("tabindex",o);}m.push(n[i].getDomRef());}var p=this.getAggregation("_overflowButton");if(p&&p.getDomRef){var _=p.getDomRef();m.push(_);$(_).attr("tabindex","-1");}this.theItemNavigation.setItemDomRefs(m);};e.addEventDelegate({onAfterRendering:function(E){var t=this;t.getAggregation("_overflowButton").addEventDelegate({onAfterRendering:function(E){t._setupItemNavigation();}},t.getAggregation("_overflowButton"));t._setupItemNavigation();}},e);return e;},reorgTabBarSequence:function(){if(!this.tabBar){return;}var h=new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.High});var n=new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.NeverOverflow});var B=this.tabBar.getContent();for(var i=0;i<B.length;i++){if(this.getModel().getProperty('/tabStrips/selected').equals(B[i].getBindingContext().getObject())){B[i].setLayoutData(n);}else{B[i].setLayoutData(h);}}},assembleDisplaySwitchTapStrips:function(){var t=this;var o=new sap.m.SegmentedButton('ResultViewType',{selectedKey:{parts:[{path:'/resultToDisplay'}],formatter:function(r){var e="list";if(r==="searchResultTable"){e="table";}else if(r==="searchResultList"){e="list";}else if(r==="searchResultMap"){e="map";}return e;}},items:[new sap.m.SegmentedButtonItem({icon:"sap-icon://list",tooltip:sap.ushell.resources.i18n.getText("displayList"),key:"list"}),new sap.m.SegmentedButtonItem({icon:"sap-icon://table-view",tooltip:sap.ushell.resources.i18n.getText("displayTable"),key:"table"}),(t.getModel()&&t.getModel().config.maps?new sap.m.SegmentedButtonItem({icon:"sap-icon://map",tooltip:sap.ushell.resources.i18n.getText("displayMap"),key:"map"}):undefined)],enabled:{parts:[{path:'/displaySwitchVisibility'},{path:'/count'}],formatter:function(e,h){return e&&h!==0;}},select:function(e){var h=e.mParameters.key;var m=t.getModel();switch(h){case"list":m.setProperty('/resultToDisplay',"searchResultList");t.showMoreFooter.setVisible(t.isShowMoreFooterVisible());t.searchResultMap.setVisible(false);break;case"table":m.setProperty('/resultToDisplay',"searchResultTable");t.showMoreFooter.setVisible(t.isShowMoreFooterVisible());t.searchResultMap.setVisible(false);break;case"map":m.setProperty('/resultToDisplay',"searchResultMap");t.searchResultMap.setVisible(t.isShowMoreFooterVisible());t.showMoreFooter.setVisible(false);break;default:m.setProperty('/resultToDisplay',"searchResultList");t.showMoreFooter.setVisible(t.isShowMoreFooterVisible());}m.enableOrDisableMultiSelection();}.bind(this),visible:jQuery.extend({},this.searchToolbarEntryVisibility)});return o;},isShowMoreFooterVisible:function(){var m=this.getModel();return m.getProperty("/boCount")>m.getProperty("/boResults").length;},assembleCenterArea:function(){var t=this;t.tableSortDialog=t.assembleSearchResultSortDialog();var e=t.assembleSearchResultList();t.searchResultTable=t.assembleSearchResultTable();t.searchResultTable.addDelegate({onBeforeRendering:function(){t.updateTableLayout();}});t.searchResultMap=t.assembleSearchResultMap();t.searchResultMap.setVisible(false);t.appSearchResult=t.assembleAppSearch();t.showMoreFooter=t.assembleShowMoreFooter();return[t.tableSortDialog,e,t.searchResultTable,t.searchResultMap,t.appSearchResult,t.showMoreFooter];},assembleSearchResultSortDialog:function(){var t=this;var e=new sap.m.ViewSettingsDialog({sortDescending:{parts:[{path:"/orderBy"}],formatter:function(o){return jQuery.isEmptyObject(o)||o.sortOrder==="DESC";}},confirm:function(h){var p=[];p=h.getParameters();if(p.sortItem){var o=t.getModel();if(p.sortItem.getKey()==="ushellSearchDefaultSortItem"){o.resetOrderBy();e.setSortDescending(true);}else{o.setOrderBy({orderBy:p.sortItem.getBindingContext().getObject().originalKey,sortOrder:p.sortDescending===true?"DESC":"ASC"});}}},cancel:function(h){var i=t.getModel().getOrderBy().orderBy===undefined?"ushellSearchDefaultSortItem":t.getModel().getOrderBy().orderBy;this.setSelectedSortItem(i);}});e.bindAggregation("sortItems","/tableSortableColumns",function(p,D){return new sap.m.ViewSettingsItem({key:"{key}",originalKey:"{originalKey}",text:"{name}",selected:"{selected}"});});return e;},assembleSearchResultTable:function(){var t=this;var r=new c("ushell-search-result-table",{mode:{parts:[{path:'/multiSelectionEnabled'}],formatter:function(m){return m===true?sap.m.ListMode.MultiSelect:sap.m.ListMode.None;}},noDataText:'{i18n>noCloumnsSelected}',visible:{parts:[{path:'/resultToDisplay'},{path:'/count'}],formatter:function(e,h){return e==="searchResultTable"&&h!==0;}},rememberSelections:false});r.bindAggregation("columns","/tableColumns",function(p,D){var e=D.getObject();var h=new sap.m.Column(e.key,{header:new sap.m.Label({text:"{name}",tooltip:"{name}"}),visible:{parts:[{path:'index'}],formatter:function(i){return i<5;}}});return h;});r.bindAggregation("items","/tableResults",function(p,D){return t.assembleTableItems(D);});r.addEventDelegate({onAfterRendering:function(){t.updatePersoServiceAndController();}});return r;},assembleTableItems:function(D){var t=this;var o=D.getObject();if(o.type==='footer'){return new sap.m.CustomListItem({visible:false});}else{return t.assembleTableMainItems(o,D.getPath());}},assembleTableMainItems:function(D,p){var t=this;t.oCrossAppNav=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("CrossApplicationNavigation");var e=p+"/itemattributes";var h=new sap.m.ColumnListItem({selected:"{selected}"});h.bindAggregation("cells",e,function(e,m){if(m.getObject().isTitle){var n="";var o;var q=m.getObject().titleNavigation;if(q){n=q.getHref();o=q.getTarget();}var r=(n&&n.length>0)?true:false;var u=new j({text:"{value}",enabled:r,href:n,press:function(){var n="";var q=m.getObject().titleNavigation;if(q){n=q.getHref();}var A=sap.ushell.renderers.fiori2.search.getModelSingleton();A.eventLogger.logEvent({type:A.eventLogger.ITEM_NAVIGATE,targetUrl:n});}});u.addStyleClass("sapUshellSearchResultListItem-MightOverflow");if(o){u.setTarget(o);}return u;}else if((m.getObject().isNavigationObjects)){var v=m.getObject().navigationObjects;var w=[];var x={};var y=function(A,z){z.performNavigation();};for(var i=0;i<v.length;i++){var z=v[i];x=new sap.m.Button({text:z.getText(),tooltip:z.getText()});x.attachPress(z,y);w.push(x);}return new sap.m.Button({icon:"sap-icon://action",press:function(){var A=new sap.m.ActionSheet({buttons:w});A.openBy(this);}});}else{return new f({text:"{value}"}).addStyleClass("sapUshellSearchResultListItem-MightOverflow");}});return h;},onRegionClick:function(e){},onRegionContextMenu:function(e){},assembleSearchResultMap:function(){var o=new k();o.addEventDelegate({onAfterRendering:function(){var h=$(".sapUshellSearchResultMap").parent().parent().css("height");h=parseInt(h,10);h=0.8*h;h=""+h+"px";$(".sapUshellSearchResultMap").css("height",h);$(".sapUshellSearchResultMap").css("vertical-align","middle");}});return o;},assembleShowMoreFooter:function(){var t=this;var e=new sap.m.Button({text:"{i18n>showMore}",type:sap.m.ButtonType.Transparent,press:function(){var o=t.getModel();o.setProperty('/focusIndex',o.getTop());var n=o.getTop()+o.pageSize;o.setTop(n);}});e.addStyleClass('sapUshellResultListMoreFooter');var h=new sap.m.FlexBox({visible:{parts:[{path:'/boCount'},{path:'/boResults'}],formatter:function(i,m){return m.length<i;}},justifyContent:sap.m.FlexJustifyContent.Center});h.addStyleClass('sapUshellResultListMoreFooterContainer');h.addItem(e);return h;},assembleSearchResultList:function(){var t=this;t.resultList=new b({mode:sap.m.ListMode.None,width:"auto",showNoData:false,visible:{parts:[{path:'/resultToDisplay'},{path:'/count'}],formatter:function(r,e){return r==="searchResultList"&&e!==0;}}});t.resultList.bindAggregation("items","/results",function(p,o){return t.assembleListItem(o);});return t.resultList;},assembleAppSearch:function(){var t=this;var e=new sap.ushell.renderers.fiori2.search.controls.SearchTilesContainer({addAccInformation:true,maxRows:99999,totalLength:'{/appCount}',visible:{parts:[{path:'/resultToDisplay'},{path:'/count'}],formatter:function(r,h){return r==="appSearchResult"&&h!==0;}},highlightTerms:'{/uiFilter/searchTerms}',showMore:function(){var m=t.getModel();m.setProperty('/focusIndex',e.getNumberDisplayedTiles()-1);var n=m.getTop()+m.pageSize*e.getTilesPerRow();m.setTop(n);}});e.bindAggregation('tiles','/appResults',function(i,o){return t.getTileView(o.getObject().tile);});e.addStyleClass('sapUshellSearchTileResultList');sap.ui.getCore().getEventBus().subscribe('searchLayoutChanged',function(){e.delayedRerender();},this);return e;},assembleTitleItem:function(D){var i=new sap.m.CustomListItem();var t=new sap.m.Label({text:"{title}"});t.addStyleClass('bucketTitle');i.addStyleClass('bucketTitleContainer');i.addContent(new sap.m.HBox({items:[t]}));return i;},assembleAppContainerResultListItem:function(D,p){var t=this;var e=new sap.ushell.renderers.fiori2.search.controls.SearchTilesContainer({maxRows:sap.ui.Device.system.phone?2:1,totalLength:'{/appCount}',highlightTerms:'{/uiFilter/searchTerms}',enableKeyHandler:false,resultList:t.resultList,showMore:function(){var m=t.getModel();m.setDataSource(m.appDataSource);}});e.bindAggregation('tiles','tiles',function(i,o){return t.getTileView(o.getObject().tile);});var h=new sap.m.CustomListItem({content:e});h.addStyleClass('sapUshellSearchResultListItem');h.addStyleClass('sapUshellSearchResultListItemApps');h.addEventDelegate({onAfterRendering:function(E){var i=$(h.getDomRef());i.removeAttr("tabindex");i.removeAttr("role");i.attr("aria-hidden","true");}},h);sap.ui.getCore().getEventBus().subscribe('searchLayoutChanged',function(){e.delayedRerender();},this);return h;},assembleResultListItem:function(D,p){var e=this.getModel().config.getDataSourceConfig(D.dataSource);var h={title:"{$$Name$$}",titleUrl:"{uri}",titleNavigation:"{titleNavigation}",type:"{dataSourceName}",imageUrl:"{imageUrl}",attributes:"{itemattributes}",navigationObjects:"{navigationObjects}",selected:"{selected}",expanded:"{expanded}"};var i;if(e.searchResultListItemControl){i=new e.searchResultListItemControl(h);}else if(e.searchResultListItemContentControl){h.content=new e.searchResultListItemContentControl();i=new C(h);}else{i=new l(h);}var m=new sap.m.CustomListItem({content:i});m.addStyleClass('sapUshellSearchResultListItem');if(i.setParentListItem){i.setParentListItem(m);}return m;},assembleListItem:function(o){var t=this;var D=o.getObject();if(D.type==='title'){return t.assembleTitleItem(D);}else if(D.type==='footer'){return new sap.m.CustomListItem();}else if(D.type==='appcontainer'){return t.assembleAppContainerResultListItem(D,o.getPath());}else{return t.assembleResultListItem(D,o.getPath());}},getTileView:function(t){try{var h=t.getContract('types');h.setType('tile');}catch(e){}var v=sap.ushell.Container.getService('LaunchPage').getCatalogTileView(t);var i=sap.ushell.Container.getService('LaunchPage').getCatalogTileTargetURL(t);var m='app';if(t.getTitle){m=t.getTitle();}v.eventLoggingData={targetUrl:i,title:m};return v;},onAllSearchStarted:function(){},onAllSearchFinished:function(){var t=this;t.reorgTabBarSequence();t.oFocusHandler.setFocus();var v=sap.ui.getCore().byId('viewPortContainer');if(v&&v.switchState){v.switchState('Center');}},updatePersoServiceAndController:function(){var t=this;var m=t.getModel();var e=m.getDataSource().key;if(!t.oTablePersoController){var p=m.getPersonalizationStorageInstance();t.oTablePersoController=new sap.m.TablePersoController({table:sap.ui.getCore().byId("ushell-search-result-table"),persoService:p.getPersonalizer('search-result-table-state-'+e)}).activate();t.oTablePersoController.refresh();}if(t.oTablePersoController&&t.oTablePersoController.getPersoService().getKey()!=='search-result-table-state-'+e){t.oTablePersoController.setPersoService(m.getPersonalizationStorageInstance().getPersonalizer('search-result-table-state-'+e));t.oTablePersoController.refresh();}},updateTableLayout:function(){var t=this;if(t.searchResultTable){var e=t.searchResultTable.getColumns();var v=0;for(var i=0;i<e.length;i++){if(e[i].getVisible()){v++;}}if(v<=3){t.searchResultTable.setFixedLayout(false);}else{t.searchResultTable.setFixedLayout(true);}}},setAppView:function(A){var t=this;t.oAppView=A;if(t.oTilesContainer){t.oTilesContainer.setAppView(A);}},getControllerName:function(){return"sap.ushell.renderers.fiori2.search.container.Search";}});}(window));