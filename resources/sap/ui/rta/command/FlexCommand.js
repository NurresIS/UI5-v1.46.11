/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/command/BaseCommand',"sap/ui/fl/FlexControllerFactory","sap/ui/rta/ControlTreeModifier","sap/ui/fl/Utils"],function(B,F,R,U){"use strict";var a=B.extend("sap.ui.rta.command.FlexCommand",{metadata:{library:"sap.ui.rta",properties:{changeHandler:{type:"any"},changeType:{type:"string"},fnGetState:{type:"any"},state:{type:"any"},fnRestoreState:{type:"any"},selector:{type:"object"}},associations:{},events:{}}});a.prototype.getElementId=function(){var e=this.getElement();return e?e.getId():this.getSelector().id;};a.prototype.getAppComponent=function(){var e=this.getElement();return e?U.getAppComponentForControl(e):this.getSelector().appComponent;};a.prototype.prepare=function(){this._oPreparedChange=this._createChange();};a.prototype.getPreparedChange=function(){if(!this._oPreparedChange){this.prepare();}return this._oPreparedChange;};a.prototype.execute=function(){var c=this.getPreparedChange();this._applyChange(c);};a.prototype._getChangeSpecificData=function(){return{changeType:this.getChangeType(),selector:{id:this.getElementId()}};};a.prototype._createChange=function(){return this._createChangeFromData(this._getChangeSpecificData());};a.prototype._createChangeFromData=function(c){var f=F.createForControl(this.getAppComponent());return f.createChange(c,this.getElement()||this.getSelector());};a.prototype.undo=function(){if(this.getFnRestoreState()){this.getFnRestoreState()((this.getElement()||this.getSelector()),this.getState());}else if(this._aRecordedUndo){R.performUndo(this._aRecordedUndo);}else{jQuery.sap.log.warning("Undo is not available for "+this.getElement()||this.getSelector());}};a.prototype._applyChange=function(c){var C=c.change||c;var A=this.getAppComponent();var s=R.bySelector(C.getSelector(),A);if(this.getFnGetState()){this.setState.call(this,(this.getFnGetState()(this.getElement()||this.getSelector())));}else{R.startRecordingUndo();}this.getChangeHandler().applyChange(C,s,{modifier:R,appComponent:A});if(!this.getFnGetState()){this._aRecordedUndo=R.stopRecordingUndo();}};return a;},true);
