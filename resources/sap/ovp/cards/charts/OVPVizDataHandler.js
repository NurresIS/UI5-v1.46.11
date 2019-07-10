sap.ui.define(["sap/ui/core/Control"],function(C){"use strict";return C.extend("sap.ovp.cards.charts.OVPVizDataHandler",{metadata:{aggregations:{data:{type:"sap.ui.core.Element"},aggregateData:{type:"sap.ui.core.Element"},content:{multiple:false}},properties:{chartType:{defaultValue:false},dependentDataReceived:{defaultValue:false},scale:{defaultValue:""},entitySet:{}}},renderer:function(r,c){r.write("<div");r.writeElementData(c);r.write(">");if(c.getContent()){r.renderControl(c.getContent());}r.write("</div>");},mergeDatasets:function(b,d,c){var t=this;var m=this.getModel();var p=b.mParameters;var D=jQuery.extend(true,{},this.dataSet);var s=p.select.split(",");var e=b.getPath().substring(1);var a=-1;if(e){a=e.indexOf('Parameters');}if(a>=0){e=e.substr(0,e.indexOf('Parameters'));}var f=m.getMetaModel();var g=this.getEntitySet();var h=f.getODataEntitySet(g);var k=f.getODataEntityType(h.entityType);var l=[];var n=[];for(var i=0;i<k.property.length;i++){if(k.property[i]["com.sap.vocabularies.Analytics.v1.Measure"]||(k.property[i].hasOwnProperty("sap:aggregation-role")&&k.property[i]["sap:aggregation-role"]==="measure")){if(s.indexOf(k.property[i].name)!==-1){l.push(k.property[i].name);}}else{if(s.indexOf(k.property[i].name)!==-1){n.push(k.property[i].name);}}}for(var i=0;i<D.results.length-1;i++){for(var j=0;j<l.length;j++){D.results[0][l[j]]=Number(D.results[0][l[j]])+Number(D.results[i+1][l[j]]);}}var o=D.__count-D.results.length;var q={};q.results=[];q.results[0]=D.results[0];var r;var u=jQuery.extend(true,{},this.aggregateSet);if(u&&u.results&&D.results.length<D.__count){jQuery.each(l,function(i){u.results[0][l[i]]=String(Number(t.aggregateSet.results[0][l[i]])-Number(q.results[0][l[i]]));});jQuery.each(n,function(i){u.results[0][n[i]]=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OTHERS_DONUT",[o]);});u.results[0].$isOthers=true;r=u.results[0];}if(r){d.results.push(r);}var M=new sap.ui.model.json.JSONModel();M.setData(d.results);c.setModel(M,"analyticalmodel");},updateBindingContext:function(){var b=this.getBinding("data");var a=this.getBinding("aggregateData");var t=this;if(this.bindingC==b){return;}else{this.bindingC=b;if(b){var t=this;b.attachEvent("dataReceived",function(e){t.dataSet=e&&e.getParameter("data");t.oDataClone=jQuery.extend(true,{},t.dataSet);if(t.getChartType()=="donut"){if(t.getDependentDataReceived()){t.mergeDatasets(b,t.oDataClone,t.getContent());t.setDependentDataReceived(false);}else{t.setDependentDataReceived(true);}}else{var m=new sap.ui.model.json.JSONModel();m.setData(t.dataSet.results);t.getContent().setModel(m,"analyticalmodel");}});}C.prototype.updateBindingContext.apply(this,arguments);}if(this.aggrBindingC==a){return;}else{this.aggrBindingC=a;if(a){var t=this;a.attachEvent("dataReceived",function(e){t.aggregateSet=e&&e.getParameter("data");if(t.getChartType()=="donut"){if(t.getDependentDataReceived()){t.oDataClone=jQuery.extend(true,{},t.dataSet);t.mergeDatasets(b,t.oDataClone,t.getContent());t.setDependentDataReceived(false);}else{t.setDependentDataReceived(true);}}else{var m=new sap.ui.model.json.JSONModel();m.setData(t.aggregateSet.results);t.getContent().setModel(m,"analyticalmodel");}});}C.prototype.updateBindingContext.apply(this,arguments);}}});},true);
