// @copyright@
sap.ui.define([],function(){"use strict";function L(c){this.index=-1;this.capacity=c;this.array=[];}L.prototype._clear=function(){this.array=[];this.index=-1;};L.prototype.addAsHead=function(k,v){this.index=(this.index+1)%this.capacity;this.array[this.index]={key:k,value:v};};L.prototype.getByKey=function(k){var i,e;for(i=0;i<=this.capacity-1;i=i+1){e=(this.capacity+this.index-i)%this.capacity;if(this.array[e]&&this.array[e].key===k){return this.array[e];}}return undefined;};return L;});