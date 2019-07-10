sap.ui.define(["sap/ui/base/ManagedObject","sap/gantt/misc/Utility","sap/gantt/misc/Format","sap/gantt/config/TimeHorizon","sap/ui/core/Locale"],function(M,U,F,T,L){"use strict";var A=M.extend("sap.gantt.axistime.AxisTimeStrategyBase",{metadata:{"abstract":true,properties:{totalHorizon:{type:"object",defaultValue:sap.gantt.config.DEFAULT_PLAN_HORIZON},visibleHorizon:{type:"object",defaultValue:sap.gantt.config.DEFAULT_INIT_HORIZON},timeLineOptions:{type:"object"},timeLineOption:{type:"object"},coarsestTimeLineOption:{type:"object"},finestTimeLineOption:{type:"object"},zoomLevels:{type:"int",defaultValue:10},zoomLevel:{type:"int",defaultValue:0},calendarType:{type:"string",defaultValue:sap.ui.core.CalendarType.Gregorian},locale:{type:"object"},mouseWheelZoomType:{type:"sap.gantt.MouseWheelZoomType",defaultValue:sap.gantt.MouseWheelZoomType.FineGranular}},aggregations:{_axisTime:{type:"sap.gantt.misc.AxisTime",multiple:false,visibility:"hidden"}}}});A.prototype.applySettings=function(){M.prototype.applySettings.apply(this,arguments);this.calZoomBase();return this;};A.prototype.setVisibleHorizon=function(v){this.setProperty("visibleHorizon",this._completeTimeHorizon(v),true);return this;};A.prototype._completeTimeHorizon=function(v){var r=new T({startTime:this.getVisibleHorizon().getStartTime(),endTime:this.getVisibleHorizon().getEndTime()});if(v){var s=v.getStartTime(),e=v.getEndTime(),d,t=F.abapTimestampToDate(this.getTotalHorizon().getStartTime()),o=F.abapTimestampToDate(this.getTotalHorizon().getEndTime());if(!s&&!e){return r;}var i;if(this._oZoom&&this._oZoom.base&&this._oZoom.base.scale!==undefined&&this._nGanttVisibleWidth!==undefined&&this.getAxisTime()){var n=this.getAxisTime().getZoomRate();var a=this._oZoom.base.scale/n;i=this._nGanttVisibleWidth*a;}else{i=F.abapTimestampToDate(r.getEndTime()).getTime()-F.abapTimestampToDate(r.getStartTime()).getTime();}if(!s){d=F.abapTimestampToDate(e);d.setTime(d.getTime()-i);if(d<t){d=t;e=F.dateToAbapTimestamp(new Date(t+i));}s=F.dateToAbapTimestamp(d);}if(!e){d=F.abapTimestampToDate(s);d.setTime(d.getTime()+i);if(d>o){d=o;s=F.dateToAbapTimestamp(new Date(o-i));}e=F.dateToAbapTimestamp(d);}r.setStartTime(s);r.setEndTime(e);}return r;};A.prototype.createAxisTime=function(l){var t=this.getTimeLineOption(),v=this.getVisibleHorizon(),o=this.getTotalHorizon();if(!U.judgeTimeHorizonValidity(v,o)){this.setProperty("visibleHorizon",o,true);jQuery.sap.log.warning("Visible horizon is not in total horizon, so convert visible horizon to total horizon",null,"sap.gantt.axistime.AxisTimeStrategyBase.createAxisTime()");}var h=F.getTimeStampFormatter().parse(o.getStartTime());var H=F.getTimeStampFormatter().parse(o.getEndTime());var n=H.valueOf()-h.valueOf();var a=jQuery.sap.getObject(t.innerInterval.unit).offset(h,t.innerInterval.span).valueOf()-h.valueOf();var b=new sap.gantt.misc.AxisTime([h,H],[0,Math.ceil(n*t.innerInterval.range/a)],1,null,null,l,this);this.setAggregation("_axisTime",b,true);};A.prototype.syncContext=function(n){var r={zoomLevelChanged:false,axisTimeChanged:false};return r;};A.prototype.updateStopInfo=function(s){return null;};A.prototype.setTotalHorizon=function(t,s){if(typeof s==="undefined"){s=true;}this.setProperty("totalHorizon",t,s);return this;};A.prototype.getUpperRowFormatter=function(){var t=this.getTimeLineOption(),c=this.getCalendarType(),C=this.getLocale()?this.getLocale():new L(sap.ui.getCore().getConfiguration().getLanguage().toLowerCase());return sap.ui.core.format.DateFormat.getDateTimeInstance({format:t.largeInterval.format,pattern:t.largeInterval.pattern,style:t.largeInterval.style,calendarType:t.calendarType||c},t.largeInterval.locale?new L(t.largeInterval.locale):C);};A.prototype.getLowerRowFormatter=function(){var t=this.getTimeLineOption(),c=this.getCalendarType(),C=this.getLocale()?this.getLocale():new L(sap.ui.getCore().getConfiguration().getLanguage().toLowerCase());return sap.ui.core.format.DateFormat.getDateTimeInstance({format:t.smallInterval.format,pattern:t.smallInterval.pattern,style:t.smallInterval.style,calendarType:c},t.smallInterval.locale?new L(t.smallInterval.locale):C);};A.prototype.isLowerRowTickHourSensitive=function(){var t=this.getTimeLineOption();var u=t.innerInterval.unit;var s=t.innerInterval.span;var S=F.getTimeStampFormatter().parse("20000101000000");var e=jQuery.sap.getObject(u).offset(S,s);return(e.getTime()-S.getTime())<=60*60*1000;};A.prototype.getAxisTime=function(){return this.getAggregation("_axisTime");};A.prototype.fireRedrawRequest=function(f,r){this.fireEvent("_redrawRequest",{forceUpdate:f,reasonCode:r});};A.prototype.updateGanttVisibleWidth=function(n){this._nGanttVisibleWidth=n;};A.prototype.calZoomScale=function(u,s,r){var S=F.getTimeStampFormatter().parse("20000101000000");var e=jQuery.sap.getObject(u).offset(S,s);return this.calZoomScaleByDate(S,e,r);};A.prototype.calZoomScaleByDate=function(s,e,r){return(e.valueOf()-s.valueOf())/r;};A.prototype.calZoomBase=function(){var b=this.getTimeLineOption()||this.getFinestTimeLineOption();if(b){var s=this.calZoomScale(b.innerInterval.unit,b.innerInterval.span,b.innerInterval.range);this._oZoom={base:{timeLineOption:b,rate:1,scale:s}};return true;}return false;};A.prototype.updateVisibleHorizonOnMouseWheelZoom=function(t,s){var z=s<0;var Z=Math.round(Math.abs(s)/100);var m=this.getMouseWheelZoomType();if(m===sap.gantt.MouseWheelZoomType.FineGranular){this.updateVisibleHorizonOnFineGranularMouseWheelZoom(t,z,Z);}else if(m===sap.gantt.MouseWheelZoomType.Stepwise){this.updateVisibleHorizonOnStepWiseMouseWheelZoom(t,z,Z);}};A.prototype.updateVisibleHorizonOnFineGranularMouseWheelZoom=function(t,z,Z){var v=this.getVisibleHorizon();var V=F.abapTimestampToDate(v.getStartTime());var o=this.getTimeLineOption();var n=jQuery.sap.getObject(o.innerInterval.unit).offset(V,Z*o.innerInterval.span).getTime()-V.getTime();var i=z?-1:1;var N=this.calVisibleHorizonByDelta(i*n,t);this.setVisibleHorizon(N);};A.prototype.updateVisibleHorizonOnStepWiseMouseWheelZoom=function(t,z,Z){var i=z?-1:1;var a=this.getZoomLevel()-i*Z;if(a>-1&&a<this.getZoomLevels()){if(this._aZoomRate[a]&&!U.floatEqual(this._aZoomRate[a],this._oZoom.rate)){var n=this._aZoomRate[a];var N=this.calVisibleHorizonByRate(n,t);this.setVisibleHorizon(N);}}};A.prototype.calVisibleHorizonByRate=function(n,a){var b=0;if(this._oZoom&&this._oZoom.base&&this._oZoom.base.scale!==undefined&&this._nGanttVisibleWidth!==undefined){var v=F.abapTimestampToDate(this.getVisibleHorizon().getStartTime());var V=F.abapTimestampToDate(this.getVisibleHorizon().getEndTime());var c=V.getTime()-v.getTime();var d=this._oZoom.base.scale/n;var e=this._nGanttVisibleWidth*d;b=e-c;}return this.calVisibleHorizonByDelta(b,a);};A.prototype.calVisibleHorizonByDelta=function(n,a){var v=this.getVisibleHorizon();if(n!==0){var b=F.abapTimestampToDate(v.getStartTime()).getTime();var c=F.abapTimestampToDate(v.getEndTime()).getTime();var d=c-b;var e=0;var f,g;var h=F.abapTimestampToDate(this.getTotalHorizon().getStartTime()).getTime();var i=F.abapTimestampToDate(this.getTotalHorizon().getEndTime()).getTime();if(n>0&&b<=h){f=0;g=1;e=h;}else if(n>0&&c>=i){f=1;g=0;e=i;}else{if(!a){e=b+d/2;}else{e=a.getTime();}f=(e-b)/d;g=1-f;}var j=d+n;var k=e-f*j;var l=e+g*j;var N,o;if(k<=h){N=this.getTotalHorizon().getStartTime();}else{N=new Date();N.setTime(k);}if(l>=i){o=this.getTotalHorizon().getEndTime();}else{o=new Date();o.setTime(l);}return new T({startTime:N,endTime:o});}return v;};A.prototype.calMiddleDate=function(s,e){return new Date(s.getTime()+(e.getTime()-s.getTime())/2);};return A;},true);