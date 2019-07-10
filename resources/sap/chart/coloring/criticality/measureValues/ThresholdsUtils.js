sap.ui.define(['sap/chart/coloring/ColoringUtils','sap/chart/library'],function(C,c){"use strict";var T={};var M={formulas:{}};var N=c.coloring.CriticalityType.Negative;var a=c.coloring.CriticalityType.Critical;var P=c.coloring.CriticalityType.Positive;function g(u,s,l){return{upperBound:u,CriticalityType:s,level:l};}T.MBCimprovement=function(d,t,D){var s=[];var b,e;switch(d){case'maximize':b=[D.lo,t.lo,Number.POSITIVE_INFINITY];e=[N,a,P];break;case'minimize':b=[t.hi,D.hi,Number.POSITIVE_INFINITY];e=[P,a,N];break;case'target':b=[D.lo,t.lo,t.hi,D.hi,Number.POSITIVE_INFINITY];e=[N,a,P,a,N];break;default:}s=e.map(function(f,i){return g(b[i],f,0);});return{segments:s,min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};};T.improvement=function(d,m,t,D,b){var e=C.thresholdValue(D.lo);var f=C.thresholdValue(t.lo);var h=C.thresholdValue(D.hi);var i=C.thresholdValue(t.hi);var n=C.assertLevel(b,'NegativeLevels');var j=C.assertLevel(b,'CriticalLevels');var k=C.assertLevel(b,'PositiveLevels');var l=C.thresholdValue(b.MinimumMeasureValue);var o=C.thresholdValue(b.MaximumMeasureValue);switch(d){case'maximize':return{Negative:C.genLevels(n,M.formulas.maximize.negative(m,n,l,e)),Critical:C.genLevels(j,M.formulas.maximize.critical(m,j,e,f)),Positive:C.genLevels(k,M.formulas.maximize.positive(m,k,f,o))};case'minimize':return{Negative:C.genLevels(n,M.formulas.minimize.negative(m,n,h,o)),Critical:C.genLevels(j,M.formulas.minimize.critical(m,j,i,h)),Positive:C.genLevels(k,M.formulas.minimize.positive(m,k,l,i))};case'target':return{Negative:C.genLevels(n,M.formulas.target.negative(m,n,e,h,l,o)),Critical:C.genLevels(j,M.formulas.target.critical(m,j,e,f,i,h)),Positive:C.genLevels(k,M.formulas.target.positive(m,k,f,i))};default:throw new Error('Unsupported ImprovementDirection: '+d);}};M.formulas.maximize={negative:function(m,n,f,d){return function(o){var b=o[m];var e=f(o);var h=d(o);if(!C.isInRange(b,Number.NEGATIVE_INFINITY,h,null,false)){return-1;}else if(!C.isNumber(n,e)||n<=1){return 1;}else if(b<e){return n;}else{return(n-1)-Math.floor((n-1)*(b-e)/(h-e));}};},critical:function(m,n,d,t){return function(o){var b=o[m];var e=d(o);var f=t(o);if(!C.isInRange(b,e,f,true,false)){return-1;}else if(!C.isNumber(n)||n<=1){return 1;}else{return n-Math.floor(n*(b-e)/(f-e));}};},positive:function(m,n,t,f){return function(o){var b=o[m];var d=f(o);var e=t(o);if(!C.isInRange(b,e,Number.POSITIVE_INFINITY,true)){return-1;}else if(!C.isNumber(n,d)||n<=1){return 1;}else if(b>=d){return n;}else{return Math.floor((n-1)*(b-e)/(d-e))+1;}};}};M.formulas.minimize={negative:function(m,n,d,f){return function(o){var b=o[m];var e=f(o);var h=d(o);if(!C.isInRange(b,h,Number.POSITIVE_INFINITY,false)){return-1;}else if(!C.isNumber(n,e)||n<=1){return 1;}else if(b>e){return n;}else{return Math.floor((n-1)*(b-h)/(e-h))+1;}};},critical:function(m,n,t,d){return function(o){var b=o[m];var e=t(o);var f=d(o);if(!C.isInRange(b,e,f,false,true)){return-1;}else if(!C.isNumber(n)||n<=1){return 1;}else{return Math.floor(n*(b-e)/(f-e))+1;}};},positive:function(m,n,f,t){return function(o){var b=o[m];var d=f(o);var e=t(o);if(!C.isInRange(b,Number.NEGATIVE_INFINITY,e,null,true)){return-1;}else if(!C.isNumber(n,d)||n<=1){return 1;}else if(b<d){return n;}else{return(n-1)-Math.floor((n-1)*(b-d)/(e-d));}};}};M.formulas.target={negative:function(m,n,d,D,f,b){return function(o){var e=o[m];var h=d(o);var i=D(o);var j=f(o);var k=b(o);var l=C.isInRange(e,Number.NEGATIVE_INFINITY,h,null,false);var p=C.isInRange(e,i,Number.POSITIVE_INFINITY,false);if(!l&&!p){return-1;}else if(!C.isNumber(n)||n<=1){return 1;}else if(l){if(e<j){return n;}else{return n-(Math.floor((e-j)/((h-j)/(n-1)))+1);}}else{if(e>=k){return n;}else{return n-(Math.floor((k-e)/((k-i)/(n-1)))+1);}}};},critical:function(m,n,d,t,f,D){return function(o){var b=o[m];var e=d(o),h=t(o);var i=f(o),j=D(o);var k=C.isInRange(b,e,h,true,false);var l=C.isInRange(b,i,j,false,true);if(!k&&!l){return-1;}else if(!C.isNumber(n)||n<=1){return 1;}else if(k){return n-Math.floor((b-e)/((h-e)/n));}else{return Math.floor((j-b)/((j-i)/n))+1;}};},positive:function(m,n,t,f){return function(o){var b=o[m];var d=t(o);var e=f(o);if(!C.isInRange(b,d,e,true,true)){return-1;}else if(!C.isNumber(n)||n<=1){return 1;}else{return Math.min(n,n+1-Math.ceil(Math.abs(b-(d+(e-d)/2))/((e-d)/(2*n))));}};}};return T;});
