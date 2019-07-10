sap.ui.define([],function(){"use strict";jQuery.sap.require("sap.ovp.ui.UIActions");var R=function(s){this.init(s);};R.prototype.init=function(s){s.beforeDragCallback=this._beforeDragHandler.bind(this);s.dragStartCallback=this._dragStartHandler.bind(this);s.dragMoveCallback=this._dragMoveHandler.bind(this);s.dragEndCallback=this._dragEndHandler.bind(this);s.resizeStartCallback=this._resizeStartHandler.bind(this);s.resizeMoveCallback=this._resizeMoveHandler.bind(this);s.resizeEndCallback=this._resizeEndHandler.bind(this);s.endCallback=this._endHandler.bind(this);this.placeHolderClass=s.placeHolderClass;this.layout=s.layout;this.settings=s;this.destroy();this.uiActions=new sap.ovp.ui.UIActions(this.settings).enable();this.aCardsOrder=null;this.aCards=s.aCards;this.layoutUtil=s.layoutUtil;this.verticalMargin=null;this.horizontalMargin=null;this.top=null;this.left=null;this.width=null;this.layoutOffset=null;this.jqLayout=null;this.jqLayoutInner=null;this.isRTLEnabled=null;this.lastCollidedEl=null;this.rowHeight=s.rowHeight;this.dropZoneItem=null;this.floaterData=null;this.resizeData={};this.delta={top:0,left:0};this.dragAndDropObject={};switch(true){case sap.ui.Device.browser.webkit:this.cssVendorTransition="-webkit-transition";this.cssVendorTransform="-webkit-transform";break;case sap.ui.Device.browser.msie:this.cssVendorTransition="-ms-transition";this.cssVendorTransform="-ms-transform";break;case sap.ui.Device.browser.mozilla:this.cssVendorTransition="-moz-transition";this.cssVendorTransform="-moz-transform";break;default:this.cssVendorTransition="transition";this.cssVendorTransform="transform";}};R.prototype.destroy=function(){if(this.uiActions){this.uiActions.disable();this.uiActions=null;}};R.prototype._resizeStartHandler=function(e,c){var C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(c.id));if(C.template==="sap.ovp.cards.stack"){return;}if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}this.initCardsSettings();};R.prototype._resizeEndHandler=function(e,c){if(jQuery(".displaceItem")[0]){jQuery(".displaceItem").css(this.getCSSTransition(0,0));jQuery(".sapUshellEasyScanLayoutInner").children().removeClass("displaceItem");}if(c){if(sap.ui.Device.system.desktop){jQuery("body").removeClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}jQuery(this.settings.wrapper).removeClass("dragAndDropMode");jQuery("#ovpResizeRubberBand").remove();if(this.resizeData.colSpan&&this.resizeData.rowSpan){this.layoutUtil.resizeCard(c.getAttribute("id"),this.resizeData);}this.resizeData={};this.layoutUtil.getDashboardLayoutModel()._updateCurrentLayoutVariant();this.layoutUtil.oLayoutCtrl.fireAfterDragEnds();if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}}};R.prototype._resizeMoveHandler=function(a){if(a.element){a.element.classList.remove("sapOvpMinHeightContainer");jQuery("#ovpResizeRubberBand").remove();var c,b,o,g,C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(a.element.id)),e=jQuery(a.element).parent();if(C.template==="sap.ovp.cards.stack"){return;}c=this._calculateMinimumCardHeight(a,C);this.resizeData.rowSpan=Math.round(c.ghostHeightCursor/this.layoutUtil.getRowHeightPx());this.resizeData.colSpan=Math.round(c.ghostWidthCursor/this.layoutUtil.getColWidthPx());this.resizeData.colSpan=this.resizeData.colSpan<1?1:this.resizeData.colSpan;if(this.resizeData.rowSpan<=c.iLeastRowSpan){this.resizeData.rowSpan=c.iLeastRowSpan;a.element.classList.add("sapOvpMinHeightContainer");}else if(this.resizeData.rowSpan>c.iLeastRowSpan&&this.resizeData.rowSpan<=c.iMinRowSpan){this.resizeData.rowSpan=c.iMinRowSpan;}if(c.ghostWidthCursor<=this.layoutUtil.getColWidthPx()){g=this.layoutUtil.getColWidthPx();}else{g=c.ghostWidthCursor;}e.append("<div id='ovpResizeRubberBand' class='ovpResizeRubberBand' style='top: "+(c.fElementPosTop+this.layoutUtil.CARD_BORDER_PX)+"px; left: "+(c.fElementPosLeft+this.layoutUtil.CARD_BORDER_PX)+"px; width: "+(g-2*this.layoutUtil.CARD_BORDER_PX)+"px; height: "+(this.resizeData.rowSpan*this.layoutUtil.getRowHeightPx()-2*this.layoutUtil.CARD_BORDER_PX)+"px; cursor:"+c.cursor+"'></div>");b=this.layoutUtil.getImmediateAffectedCards(C,this.resizeData);o=this.layoutUtil.convertRemToPx("4rem");if(jQuery(".displaceItem")[0]){jQuery(".displaceItem").css(this.getCSSTransition(0,0));jQuery(".sapUshellEasyScanLayoutInner").children().removeClass("displaceItem");}b.cardIds.forEach(function(s){jQuery("#"+s).addClass("displaceItem");});jQuery(".displaceItem").css(this.getCSSTransition(0,o));}};R.prototype._beforeDragHandler=function(e,c){if(e.type==="mousedown"){e.preventDefault();}if(sap.ui.Device.system.desktop){jQuery("body").addClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}if(sap.ui.Device.browser.mobile){this.selectableElemets=jQuery(c).find(".sapUiSelectable");this.selectableElemets.removeClass("sapUiSelectable");}jQuery(this.settings.wrapper).addClass("dragAndDropMode");};R.prototype._dragStartHandler=function(e,c){jQuery.sap.log.info(c);if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}this.initCardsSettings();var C=c.children[0].getBoundingClientRect();this.floaterData={width:C.width,height:C.height,startLeft:C.left-this.layoutOffset.left,startTop:C.top-this.layoutOffset.top-parseInt(jQuery("."+this.placeHolderClass).css("border-top-width"),10)};};R.prototype._dragMoveHandler=function(a){jQuery(a.element).css('opacity',0);this.floaterData.id=a.element.id;this.floaterData.left=a.moveX-this.uiActions.startX+this.floaterData.startLeft;this.floaterData.top=a.moveY-this.uiActions.startY+this.floaterData.startTop+this.jqLayout.scrollTop();this.dragAndDropObject=this.layoutUtil.getDropSimData(this.floaterData);this.showGhostWhileDragMove();if(jQuery(".displaceItem")[0]){jQuery(".displaceItem").css(this.getCSSTransition(0,0));jQuery(".sapUshellEasyScanLayoutInner").children().removeClass("displaceItem");}if(this.dragAndDropObject.coveredCardIds.length>0){var o=this.layoutUtil.convertRemToPx("4rem");this.dragAndDropObject.coveredCardIds.forEach(function(c){jQuery("#"+c).addClass("displaceItem");});jQuery(".displaceItem").css(this.getCSSTransition(0,o));}};R.prototype._dragEndHandler=function(e,c){this.lastCollidedEl=null;jQuery("#ovpDashboardLayoutMarker").remove();jQuery(".displaceItem").css(this.getCSSTransition(0,0));jQuery(".displaceItem").removeClass("displaceItem");var C=this.layoutUtil.dashboardLayoutModel.getCardById(this.layoutUtil.getCardId(this.floaterData.id));var n={row:Math.round(this.floaterData.top/this.layoutUtil.getRowHeightPx())+1,column:Math.round(this.floaterData.left/this.layoutUtil.getColWidthPx())+1};n.row=n.row<=0?1:n.row;n.column=n.column<=1?1:n.column;if(n.column+C.dashboardLayout.colSpan>this.columnCount){n.column=(this.columnCount-C.dashboardLayout.colSpan)+1;}jQuery.when(this.layoutUtil.dashboardLayoutModel._arrangeCards(C,n,'drag')).done(function(){this.layoutUtil._positionCards(this.aCards);}.bind(this));jQuery(c).css('opacity',1);this.layoutUtil.getDashboardLayoutModel()._updateCurrentLayoutVariant();this.layoutUtil.oLayoutCtrl.fireAfterDragEnds();if(sap.ui.Device.system.desktop){jQuery("body").removeClass("sapOVPDisableUserSelect sapOVPDisableImageDrag");}jQuery(this.settings.wrapper).removeClass("dragAndDropMode");if(jQuery(window).getSelection){var s=jQuery(window).getSelection();s.removeAllRanges();}var i=this.layoutUtil.calculateContainerHeight();jQuery(".sapUshellEasyScanLayoutInner").css({"height":i+"px","z-index":"1"});if(C.template==="sap.ovp.cards.charts.analytical"){this.layoutUtil.refreshOnDrag(C);}};R.prototype._endHandler=function(e,c){jQuery.sap.log.info(c);if(sap.ui.Device.browser.mobile&&this.selectableElemets){this.selectableElemets.addClass("sapUiSelectable");}};R.prototype.initCardsSettings=function(){this.jqLayout=this.layout.$();this.jqLayoutInner=this.jqLayout.children().first();var l=this.jqLayout.scrollTop();var a=this.jqLayoutInner.height();this.isRTLEnabled=sap.ui.getCore().getConfiguration().getRTL()?1:-1;this.aCardsOrder=[];this.layoutOffset=this.jqLayout.offset();this.corrY=this.jqLayout.get(0).getBoundingClientRect().top+this.jqLayout.scrollTop();this.corrX=this.layoutOffset.left;this.columnCount=this.layoutUtil.oLayoutData.colCount;var v=this.layout.getVisibleLayoutItems();if(!v){return;}this.aCardsOrder=v.map(function(i){var e=i.$().parent()[0];e.posDnD={width:e.offsetWidth,height:e.offsetHeight};return e;});var j=this.jqLayoutInner.children().first();var m=(this.isRTLEnabled===1)?"margin-left":"margin-right";this.verticalMargin=parseInt(j.css(m),10);var f=this.aCardsOrder[0];this.horizontalMargin=parseInt(jQuery(f).css("margin-bottom"),10);this.verticalMargin=this.horizontalMargin;this.top=f.getBoundingClientRect().top-this.jqLayoutInner[0].getBoundingClientRect().top;this.left=f.getBoundingClientRect().left-this.jqLayoutInner[0].getBoundingClientRect().left;this.width=f.offsetWidth;jQuery(this.aCardsOrder).css("position","absolute");this.drawLayout(this.aCardsOrder);this.jqLayoutInner.height(a);this.jqLayout.scrollTop(l);};R.prototype.drawLayout=function(c){var C=[];for(var i=0;i<this.columnCount;i++){C[i]=0;}for(var n=0;n<c.length;n++){var d=c[n];var $=jQuery(c[n]);d.posDnD.top=$.position().top;d.posDnD.bottom=$.position().top+d.posDnD.height;d.posDnD.left=$.position().left;d.posDnD.right=$.position().left+d.posDnD.width;this.updateElementCSS(c[n]);}};R.prototype.showGhostWhileDragMove=function(){var p=this.layoutUtil._mapGridToPositionPx(this.layoutUtil.mapPositionToGrid(this.dragAndDropObject.cellPos));var $=jQuery("#ovpDashboardLayoutMarker");if($.length===0){jQuery(".sapUshellEasyScanLayoutInner").append("<div id='ovpDashboardLayoutMarker' style= 'top: "+p.top+";"+"; left: "+p.left+";"+"; width: "+this.floaterData.width+"px;"+" height: "+this.floaterData.height+"px;'>"+"</div>");}else{$.css({top:p.top,left:p.left});}};R.prototype.updateElementCSS=function(e){jQuery(e).css({top:e.posDnD.top,left:e.posDnD.left});};R.prototype.getCSSTransition=function(o,a){var c={};c[this.cssVendorTransition]="all 0.25s ease";c[this.cssVendorTransform]="translate3d("+o+"px, "+a+"px, 0px)";return c;};R.prototype._calculateMinimumCardHeight=function(a,c){var $=jQuery(a.element),e=$.position().left,E=$.position().top,l=1,m=1,g,b,d;if(this.uiActions.isResizeX&&!this.uiActions.isResizeY){g=a.moveX-e-this.layoutOffset.left;b=$.outerHeight();d="ew-resize";}else if(!this.uiActions.isResizeX&&this.uiActions.isResizeY){g=$.outerWidth();b=a.moveY-E-this.layoutOffset.top+this.jqLayout.scrollTop();d="ns-resize";}else{g=a.moveX-e-this.layoutOffset.left;b=a.moveY-E-this.layoutOffset.top+this.jqLayout.scrollTop();d="nwse-resize";}var f=this.layoutUtil.calculateCardProperties(c.id);if(f){l=Math.ceil((f.leastHeight)/this.layoutUtil.ROW_HEIGHT_PX);m=Math.ceil((f.minCardHeight+16)/this.layoutUtil.ROW_HEIGHT_PX);}return{ghostWidthCursor:g,ghostHeightCursor:b,cursor:d,fElementPosTop:E,fElementPosLeft:e,iLeastRowSpan:l,iMinRowSpan:m};};return R;});