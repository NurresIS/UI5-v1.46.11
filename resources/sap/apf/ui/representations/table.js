/* SAP APF Analysis Path Framework
* 
* (c) Copyright 2012-2014 SAP SE. All rights reserved
*/
jQuery.sap.declare("sap.apf.ui.representations.table");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require('sap.apf.ui.utils.formatter');jQuery.sap.require("sap.apf.ui.representations.utils.paginationHandler");jQuery.sap.require("sap.apf.ui.representations.BaseUI5ChartRepresentation");jQuery.sap.require("sap.ui.model.Sorter");jQuery.sap.require("sap.ui.table.Table");jQuery.sap.require("sap.ui.table.Column");jQuery.sap.require("sap.ui.core.CustomData");jQuery.sap.require("sap.ui.model.json.JSONModel");jQuery.sap.require("sap.ui.core.Icon");jQuery.sap.require("sap.ui.layout.VerticalLayout");jQuery.sap.require("sap.m.Text");jQuery.sap.require("sap.m.Label");jQuery.sap.require("sap.m.ScrollContainer");(function(){'use strict';var t,s=0;function _(S){S.forEach(function(i){t.addSelectionInterval(i,i);});}function a(v,F){var C=v.concat(F);C=C.filter(function(i,q,C){return C.lastIndexOf(i)===q;});return C;}function b(T){T.oApi.getActiveStep().getSelectedRepresentation().UI5ChartHelper.filterValues=[];T.UI5ChartHelper.filterValues=[];T.aValidatedFilter=[];T.aFiltersInTable=[];}function c(T){var F=T.oApi.getActiveStep().getSelectedRepresentation().UI5ChartHelper.filterValues;var i=F.map(function(q){return q[0];});return i;}function d(r,C,F){var i=[];var q=t.getContextByIndex(C[0]).getProperty(r);if((t.isIndexSelected(C[0]))&&(i.indexOf(q))===-1){i.push(q);}else{var u=F.indexOf(q);if(u!==-1){F.splice(u,1);}}return i;}function e(T,F){b(T);T.filter=T.UI5ChartHelper.getFilterFromSelection(F);T.oApi.getActiveStep().getSelectedRepresentation().UI5ChartHelper.filterValues=[];F.forEach(function(v){T.oApi.getActiveStep().getSelectedRepresentation().UI5ChartHelper.filterValues.push([v]);});T.aFiltersInTable=F;T.oApi.selectionChanged();}function f(A,r,F){var S=[];A.forEach(function(i,q){var u=i[r];if(F.indexOf(u)!==-1){S.push(q);}});return S;}function g(E){var r;var R=this.oParameter.requiredFilters;var i=E.getParameter("userInteraction");var C=E.getParameter("rowIndices");if(E.getSource().getFocusDomRef()&&E.getSource().getFocusDomRef().offsetTop!==0){s=jQuery(".sapUiTableVSb").prop("scrollTop");}if(!i||C.length===0){return;}r=R&&(R.length>0)?R[0]:undefined;var q=d(r,C,this.aFiltersInTable);e(this,this.aFiltersInTable.concat(q));}function h(T,P){var r=T.oParameter.requiredFilters;var R=r&&(r.length>0)?r[0]:undefined;var F=c(T);var A=P.getModel().getData().tableData;var S=[],i=[];A.forEach(function(v,w){if(F.indexOf(v[R])!==-1){S.push(w);}});var q=T.oTableRepresentation.getBinding().aIndices;S.forEach(function(v){i.push(q.indexOf(v));});S=i;var u=(r&&(r.length>0))?"MultiToggle":"None";P.setSelectionMode(u);P.onAfterRendering=function(){S.forEach(function(v){P.getRows()[v].$().addClass("sapTableSelectionForPrint");});};}function j(S,T){var i=[];i.push(new sap.ui.model.Sorter(S.property,S.descending));T.oTableRepresentation.getBinding("rows").sort(i);}function k(i,S,T){var F=new sap.apf.ui.utils.formatter({getEventCallback:T.oApi.getEventCallback.bind(T.oApi),getTextNotHtmlEncoded:T.oApi.getTextNotHtmlEncoded,getExits:T.oApi.getExits()},T.metadata,T.aDataResponse);var q=function(G){return function(H){if(T.metadata!==undefined){var I;if(i.value[G]&&H){I=F.getFormattedValue(i.value[G],H);if(I!==undefined){return I;}}}return H;};};var t=new sap.ui.table.Table({showNoData:false,title:S,enableSelectAll:false,visibleRowCount:15});var r=T.oParameter.requiredFilters;var u=(r&&(r.length>0))?"MultiToggle":"None";t.setSelectionMode(u);var v=[],C,w,x;for(var y=0;y<i.name.length;y++){C=new sap.m.Text().bindText(i.value[y],q(y),sap.ui.model.BindingMode.OneWay);w=new sap.ui.table.Column({label:new sap.m.Label({text:i.name[y]}),template:C,tooltip:i.name[y]});x=new sap.ui.core.CustomData({value:{text:i.name[y],key:i.value[y]}});w.addCustomData(x);v.push(w);}var z;z=v;z.forEach(function(G){t.addColumn(G);});if(v.length>10){t.getColumns().forEach(function(w){w.setWidth("125px");});}var M=new sap.ui.model.json.JSONModel();M.setSizeLimit(10000);var A=T.getData();M.setData({tableData:A});t.setModel(M);t.bindRows("/tableData");l(t);if(T.metadata!==undefined){for(var B=0;B<i.name.length;B++){var D=T.metadata.getPropertyMetadata(i.value[B]);if(D["aggregation-role"]==="measure"){var E=t.getColumns()[B];E.setHAlign(sap.ui.core.HorizontalAlign.End);}}}return t;}function l(t){var i=t.getModel().getData().tableData.length;var q;if(jQuery('.chartContainer').height()){q=jQuery('.chartContainer').height()-(jQuery(".chartContainer > div :first-child").height()+120);}var v=(q>0)?q/32:15;var r=Math.floor(v);if(i<15||v>i){r=i;}t.setVisibleRowCount(r);}function m(C){var i,q;jQuery(".scrollContainer > div:first-child").css({"display":"table","width":"inherit"});if(q===undefined){q=jQuery(".tableRepresentation").offset().top;}if(jQuery(".tableRepresentation").offset().top!==q){i=((window.innerHeight-jQuery('.tableRepresentation').offset().top))+"px";}else{i=((window.innerHeight-jQuery('.tableRepresentation').offset().top)-(jQuery(".applicationFooter").height()))+"px";}document.querySelector('.tableRepresentation').style.cssText+="height : "+i;sap.ui.Device.orientation.attachHandler(function(){C.rerender();});jQuery(".sapUiTableVSb").animate({scrollTop:s},0);s=0;}function n(T){var i=T.getData();if(T.oParameter.requiredFilters!==undefined){var q=i.map(function(r){return r[T.oParameter.requiredFilters[0]];});T.aFiltersInTable.forEach(function(r,u){if(q.indexOf(r)===-1&&T.aFiltersInTable.indexOf(r)!==-1){T.aFiltersInTable.splice(u,1);T.UI5ChartHelper.filterValues.splice(u,1);}});}}function o(T){var q=T.getData();var P=[];var C={name:[],value:[]};P=T.oParameter.dimensions.concat(T.oParameter.measures).length?T.oParameter.dimensions.concat(T.oParameter.measures):T.parameter.properties;if(q.length!==0){for(var i=0;i<P.length;i++){C.value[i]=P[i].fieldName;var r="";var u=T.metadata.getPropertyMetadata(P[i].fieldName).label||T.metadata.getPropertyMetadata(P[i].fieldName).name;var U="";if(T.metadata!==undefined&&T.metadata.getPropertyMetadata(P[i].fieldName).unit!==undefined){var v=T.metadata.getPropertyMetadata(P[i].fieldName).unit;U=T.getData()[0][v];r=P[i].fieldDesc===undefined||!T.oApi.getTextNotHtmlEncoded(P[i].fieldDesc).length?u+" ("+U+")":T.oApi.getTextNotHtmlEncoded(P[i].fieldDesc)+" ("+U+")";C.name[i]=r;}else{C.name[i]=P[i].fieldDesc===undefined||!T.oApi.getTextNotHtmlEncoded(P[i].fieldDesc).length?u:T.oApi.getTextNotHtmlEncoded(P[i].fieldDesc);}}}return C;}function p(v){var S;var i=v.getSelectedSortItem();v.getSortItems().forEach(function(q){if(q.getId()===i){S=q.getKey();}});return S;}sap.apf.ui.representations.table=function(A,P){this.oViewSettingDialog=undefined;this.aDataResponse=[];this.aValidatedFilter=[];this.aFiltersInTable=[];this.oParameter=P;this.orderby=P.orderby;sap.apf.ui.representations.BaseUI5ChartRepresentation.apply(this,[A,P]);this.alternateRepresentation=P.alternateRepresentationType;this.type=sap.apf.ui.utils.CONSTANTS.representationTypes.TABLE_REPRESENTATION;this.oPaginationHandler=new sap.apf.ui.representations.utils.PaginationHandler(this);};sap.apf.ui.representations.table.prototype=Object.create(sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype);sap.apf.ui.representations.table.prototype.constructor=sap.apf.ui.representations.table;sap.apf.ui.representations.table.prototype.setData=function(D,i,q,v){var r=this;if(v&&v.length>0){this.aValidatedFilter=[];var R=this.oParameter.requiredFilters[0];v.forEach(function(w){r.aValidatedFilter.push(w[R]);});}var u=this.oPaginationHandler.getPagingOption().skip;this.nDataResponseCount=q;if(u===undefined||u===0){this.aDataResponse=D;}else{D.map(function(w){r.aDataResponse.push(w);});}if(!i){this.oMessageObject=this.oApi.createMessageObject({code:"6004",aParameters:[this.oApi.getTextNotHtmlEncoded("step")]});this.oApi.putMessage(this.oMessageObject);}else{this.metadata=i;this.UI5ChartHelper.metadata=i;}n(this);};sap.apf.ui.representations.table.prototype.getSelectionFromChart=function(){var S=t.getSelectedIndices();return S;};sap.apf.ui.representations.table.prototype.getFilter=function(){this.filter=this.UI5ChartHelper.getFilterFromSelection(this.aFiltersInTable);return this.filter;};sap.apf.ui.representations.table.prototype.getSelections=function(){var S=[],i=this;var v=(this.aValidatedFilter&&this.aValidatedFilter.length>0)?this.aValidatedFilter:[];if(this.oApi.getActiveStep()!==undefined){this.oApi.getActiveStep().getSelectedRepresentation().UI5ChartHelper.filterValues.forEach(function(F){if(i.aFiltersInTable.indexOf(F[0])===-1){i.aFiltersInTable.push(F[0]);}});}var q=a(v,this.aFiltersInTable);q.forEach(function(r){S.push({id:r,text:r});});return S;};sap.apf.ui.representations.table.prototype.markSelectionInTable=function(i){var S=[];var q=this.aFiltersInTable;if(!i&&!this.oParameter.isAlternateRepresentation){q=this.aValidatedFilter?this.aValidatedFilter:[];}var r=f(this.aDataResponse,this.oParameter.requiredFilters,q);if(this.oParameter.isAlternateRepresentation){var u=this.oTableRepresentation.getBinding().aIndices;r.forEach(function(v){S.push(u.indexOf(v));});r=S;}if(q.length>0){this.oTableRepresentation.clearSelection();_(r);}};sap.apf.ui.representations.table.prototype.getRequestOptions=function(F){if(F){this.oPaginationHandler.resetPaginationOption();}var r={paging:this.oPaginationHandler.getPagingOption(this.oParameter.top),orderby:[]};if(this.orderby&&this.orderby.length){var i=this.orderby.map(function(O){return{property:O.property,descending:!O.ascending};});r.orderby=i;}if(this.oViewSettingDialog){var S={property:p(this.oViewSettingDialog),descending:this.oViewSettingDialog.getSortDescending()};r.orderby=[S];}return r;};sap.apf.ui.representations.table.prototype.resetPaginationForTable=function(){this.oPaginationHandler.resetPaginationOption();};sap.apf.ui.representations.table.prototype.getMainContent=function(S,i,w){var q=this;var T=this.getData();var r=this.oParameter.dimensions.concat(this.oParameter.measures).length?this.oParameter.dimensions.concat(this.oParameter.measures):this.oParameter.properties;var u=o(this);var M;if(!S){M=this.oApi.createMessageObject({code:"6002",aParameters:["title",this.oApi.getTextNotHtmlEncoded("step")]});this.oApi.putMessage(M);}if(r.length===0){M=this.oApi.createMessageObject({code:"6002",aParameters:["dimensions",S]});this.oApi.putMessage(M);}if(!T||T.length===0){M=this.oApi.createMessageObject({code:"6000",aParameters:[S]});this.oApi.putMessage(M);}var v=(w||1000)+"px";t=k(u,S,this);t.attachRowSelectionChange(g.bind(q));this.oTableRepresentation=t;var x=new sap.m.ScrollContainer({content:[t],width:v,horizontal:false}).addStyleClass("tableRepresentation");x.addStyleClass("sapUiSizeCompact");t.addEventDelegate({onAfterRendering:function(){if(q.oViewSettingDialog&&q.oParameter.isAlternateRepresentation){var y={property:p(q.oViewSettingDialog),descending:q.oViewSettingDialog.getSortDescending()};j(y,q);}q.markSelectionInTable(true);l(t);m(x);if(!q.oParameter.top&&!q.oParameter.isAlternateRepresentation&&q.nDataResponseCount>100){q.oPaginationHandler.attachPaginationOnTable(q);}}});return x;};sap.apf.ui.representations.table.prototype.getThumbnailContent=function(){var T;var i=this.getData();var I=this.oParameter.isAlternateRepresentation?"sap-icon://table-view":"sap-icon://table-chart";if(i!==undefined&&i.length!==0){var q=new sap.ui.core.Icon({src:I,size:"70px"}).addStyleClass('thumbnailTableImage');T=q;}else{var r=new sap.m.Text({text:this.oApi.getTextNotHtmlEncoded("noDataText")}).addStyleClass('noDataText');T=new sap.ui.layout.VerticalLayout({content:r});}return T;};sap.apf.ui.representations.table.prototype.removeAllSelection=function(){b(this);t.clearSelection();this.oApi.selectionChanged();};sap.apf.ui.representations.table.prototype.getPrintContent=function(S){var i=o(this),P,T,q;var r=k(i,S,this);r.setTitle(S);r.getColumns().forEach(function(u){u.setWidth("auto");});r.setVisibleRowCount(r.getModel().getData().tableData.length);T={oTableRepresentation:r};if(this.oViewSettingDialog){q={property:p(this.oViewSettingDialog),descending:this.oViewSettingDialog.getSortDescending()};j(q,T);}h(this,r);P={oRepresentation:r};return P;};sap.apf.ui.representations.table.prototype.createViewSettingDialog=function(){var S;if(this.oViewSettingDialog){S={oSortProperty:p(this.oViewSettingDialog),isDescending:this.oViewSettingDialog.getSortDescending()};this.oViewSettingDialog.destroy();}var v={oSelectedSortItem:S,oTableInstance:this};var V=new sap.ui.view({type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.apf.ui.reuse.view.viewSetting",viewData:v});this.oViewSettingDialog=V.getContent()[0];this.oViewSettingDialog.addStyleClass("sapUiSizeCompact");return this.oViewSettingDialog;};sap.apf.ui.representations.table.prototype.serialize=function(){return{oFilter:this.aFiltersInTable,bIsAlternateView:this.bIsAlternateView};};sap.apf.ui.representations.table.prototype.deserialize=function(S){this.aFiltersInTable=S.oFilter;this.bIsAlternateView=S.bIsAlternateView;};sap.apf.ui.representations.table.prototype.destroy=function(){if(this.UI5ChartHelper){this.UI5ChartHelper.filterValues=[];this.UI5ChartHelper.destroy();this.UI5ChartHelper=null;}if(this.orderby){this.orderby=null;}if(this.oParameter){this.oParameter=null;}if(this.oViewSettingDialog){this.oViewSettingDialog.destroy();}if(this.aDataResponse){this.aDataResponse=null;}if(this.aValidatedFilter){this.aValidatedFilter=[];}if(this.aFiltersInTable){this.aFiltersInTable=[];}};}());
