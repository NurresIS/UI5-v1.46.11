jQuery.sap.declare("sap.zen.crosstab.CrosstabHeaderInfo");
sap.zen.crosstab.CrosstabHeaderInfo=function(c,h){"use strict";var C=h.cols;var r=h.rows;var o=null;var R=null;var d={};var D={};var f={};var F={};var a=0;var b=0;var s=0;var A={};var e={};var g={};var j={};var i=0;var k=0;var m;var l;var p;var n={};function q(u){if(!n.hasOwnProperty(u)){n[u]={};}}function t(u,i){if(u[i].charname){u[i].sDimensionName=u[i].charname;delete u[i].charname;q(u[i].sDimensionName);}if(u[i].attrname){u[i].sAttributeName=u[i].attrname;delete u[i].attrname;}if(u[i].iskey){u[i].bIsKeyPresentation=u[i].iskey;delete u[i].iskey;}}if(C){for(i=0;i<C.length;i++){t(C,i);C[i].sAxisName="ROWS";C[i].iIndex=i;o=C[i];d[i]=o;if(f[o.sDimensionName]===undefined){f[o.sDimensionName]=i;}if(A[o.sDimensionName]===undefined){A[o.sDimensionName]=k;j[k]=i;k++;}}b=k;s=0;m=C.length-1;l=C[m].sDimensionName;for(i=m;i>0;i--){p=C[i-1].sDimensionName;if(p!==l){s=i;break;}}}if(r){k=0;for(i=0;i<r.length;i++){t(r,i);r[i].sAxisName="COLS";r[i].iIndex=i;R=r[i];D[i]=R;if(F[R.sDimensionName]===undefined){F[R.sDimensionName]=i;}if(e[R.sDimensionName]===undefined){e[R.sDimensionName]=k;g[k]=i;k++;}}a=k;}this.getDimensionNameByCol=function(u){if(d&&d[u]){return d[u].sDimensionName;}else{return null;}};this.getDimensionNameByRow=function(u){if(D&&D[u]){return D[u].sDimensionName;}else{return null;}};this.getFirstColForDimension=function(l){var u=-1;if(f[l]>=0){u=f[l];}return u;};this.getFirstRowForDimension=function(l){var u=-1;if(F[l]>=0){u=F[l];}return u;};this.getAbsoluteColIndexForDimension=function(l){var u=-1;if(A[l]>=0){u=A[l];}return u;};this.getAbsoluteRowIndexForDimension=function(l){var u=-1;if(e[l]>=0){u=e[l];}return u;};this.getRowForAbsoluteRow=function(u){var v=-1;if(g[u]>=0){v=g[u];}return v;};this.getColForAbsoluteCol=function(u){var v=-1;if(j[u]>=0){v=j[u];}return v;};this.getNumberOfDimensionsOnColsAxis=function(){if(r){return r.length;}return 0;};this.getNumberOfDimensionsOnRowsAxis=function(){if(C){return C.length;}return 0;};this.isColOfInnermostDimension=function(u){var v=this.getDimensionNameByCol(u);if(v){var w=this.getAbsoluteColIndexForDimension(v);if(w!==b-1){return false;}return true;}return false;};this.getStartColForInnermostDimension=function(){return s;};this.isRowOfInnermostDimension=function(u){var v=this.getDimensionNameByRow(u);if(v){var w=this.getAbsoluteRowIndexForDimension(v);if(w!==a-1){return false;}return true;}return false;};this.isBottomRightDimHeaderCell=function(u){return((this.isBottomRowDimHeaderCell(u)===true)&&(this.isRightColDimHeaderCell(u)===true));};this.isBottomRowDimHeaderCell=function(u){var M=c.getTableMaxDimHeaderRow();var I=((u.getTableRow()+u.getRowSpan()-1)===M);return I;};this.isRightColDimHeaderCell=function(u){var M=c.getTableMaxDimHeaderCol();var v=((u.getTableCol()+u.getColSpan()-1)===M);return v;};this.getDimensionInfoForNonSplitPivotCell=function(u){var v;if(u.getScalingAxis()==="ROWS"){v=r[u.getTableRow()];}else if(u.getScalingAxis()==="COLS"){v=C[u.getTableCol()];}return v;};this.getDimensionInfoForSplitPivotCell=function(u,S){var v;if(S){if(S=="ROWS"){v=C[u.getTableCol()];}else if(S=="COLS"){v=r[u.getTableRow()];}}return v;};this.getDimensionInfoByRowCol=function(u,S){var v=null;var M=c.getTableMaxDimHeaderRow();var w=c.getTableMaxDimHeaderCol();var x=u.getTableRow();var y=u.getTableCol();if(u.isPivotCell()===true){if(u.isSplitPivotCell()===true){v=this.getDimensionInfoForSplitPivotCell(u,S);}else{v=this.getDimensionInfoForNonSplitPivotCell(u);}}else if(this.isBottomRowDimHeaderCell(u)===true){if(C){v=C[y];}else{v=r[x];}}else if(this.isRightColDimHeaderCell(u)===true){if(r){v=r[x];}else{v=C[y];}}return v;};this.getDimensionInfoByRow=function(u){var v=null;if(r){v=r[u];}return v;};this.getDimensionInfoByCol=function(u){var v=null;if(C){v=C[u];}return v;};this.hasDimensionsOnRowsAxis=function(){if(C){return true;}return false;};this.hasDimensionsOnColsAxis=function(){if(r){return true;}return false;};this.findIndexInterval=function(u,v){var I;var w;var L;var x;var y={"iStartIndex":-1,"iEndIndex":-1};if(v==="ROWS"){w=C;}else if(v==="COLS"){w=r;}L=w.length;x=null;for(I=0;I<L&&y.iStartIndex<0;I++){x=w[I].sDimensionName;if(x===u){y.iStartIndex=I;}}if(y.iStartIndex>=0){for(I=y.iStartIndex;I<L&&y.iEndIndex<0;I++){x=w[I].sDimensionName;if(x!==u){y.iEndIndex=I-1;}}if(y.iEndIndex<0){y.iEndIndex=L-1;}}return y;};this.isEqualDimInfo=function(u,v){if(u.sDimensionName!==v.sDimensionName){return false;}if(u.sAttributeName!==v.sAttributeName){return false;}if(u.bIsKeyPresentation!==v.bIsKeyPresentation){return false;}if(u.bIsTextPresentation!==v.bIsTextPresentation){return false;}if(u.bIsMeasureStructure!==v.bIsMeasureStructure){return false;}if(u.bIsStructure!==v.bIsStructure){return false;}if(u.bIsScaling!==v.bIsScaling){return false;}return true;};this.includeBottomRightCell=function(i,u,v,w){var x;var y;var I=true;if(this.isBottomRightDimHeaderCell(u)===true){if(!u.isSplitPivotCell()&&i>0){x=v[i];y=v[i-1];I=(x.sDimensionName===y.sDimensionName)&&(!x.bIsScaling);}}return I;};this.getCellsForInterval=function(I,u){var v;var w;var x;var i=I.iStartIndex;var M=c.getTableMaxDimHeaderRow();var y=c.getTableMaxDimHeaderCol();var z=[];var B;var S=I.iStartIndex===I.iEndIndex;while(i<=I.iEndIndex){B=true;if(u==="ROWS"){v=c.getTableCellWithColSpan(M,i);B=S||this.includeBottomRightCell(i,v,C,r);i=i+v.getColSpan();}else if(u==="COLS"){v=c.getTableCellWithRowSpan(i,y);B=S||this.includeBottomRightCell(i,v,r,C);i=i+v.getRowSpan();}if(B===true){z.push(v);}}return z;};this.getCellsWithSameDimensionByDimInfo=function(u){var I;var v;var l;var w;if(u){l=u.sDimensionName;w=u.sAxisName;v=this.findIndexInterval(l,w);I=this.getCellsForInterval(v,w);}return I;};this.getCellsWithSameDimension=function(u,v){var w;var I;if(!v&&u.isPivotCell()===true&&u.isSplitPivotCell()===true){return[];}else{w=this.getDimensionInfoByRowCol(u,v);}I=this.getCellsWithSameDimensionByDimInfo(w);return I;};this.setupPivotCell=function(){var u;var I=false;var v=false;var w=-1;var x=-1;var y;var z;u=c.getTableCellWithSpans(c.getTableMaxDimHeaderRow(),c.getTableMaxDimHeaderCol());if(u){x=u.getTableRow();w=u.getTableCol();if(this.isBottomRightDimHeaderCell(u)===true){I=this.hasDimensionsOnRowsAxis()===true&&this.hasDimensionsOnColsAxis()===true;}u.setPivotCell(I);y=this.getDimensionInfoByCol(w);z=this.getDimensionInfoByRow(x);if(u.isPivotCell()===true){if(!(y&&y.bIsScaling)&&!(z&&z.bIsScaling)){v=true;}}u.setSplitPivotCell(v);if(y&&y.bIsScaling===true){u.setScalingAxis("ROWS");}else if(z&&z.bIsScaling===true){u.setScalingAxis("COLS");}}return u;};this.getDimensionInfoForMemberCell=function(u){if(u.getArea().isRowHeaderArea()){return C[u.getTableCol()];}else if(u.getArea().isColHeaderArea()){return r[u.getTableRow()];}return null;};this.getMemberCellsForSameDimension=function(u){var v;var E;if(u.getArea().isRowHeaderArea()){if(C){E=C[C.length-1].bIsScaling;}v=this.getRowHeaderMemberCellsForSameDimension(u,E);}else if(u.getArea().isColHeaderArea()){if(r){E=r[r.length-1].bIsScaling;}v=this.getColHeaderMemberCellsForSameDimension(u,E);}return v;};this.getRowHeaderMemberCellsForSameDimension=function(u,E){var v;var M;var w;var i=0;var I;var x;var y;v=this.getDimensionInfoByCol(u.getTableCol());I=this.findIndexInterval(v.sDimensionName,"ROWS");w=[];x=c.getRowHeaderArea();y=x.getColCnt()-1;i=I.iStartIndex;while(i<=I.iEndIndex){M=x.getCellWithColSpan(u.getRow(),i);if(M){if(E){if(M.getCol()<y){w.push(M);}}else{w.push(M);}i=i+M.getColSpan();}else{i++;}}return w;};this.getColHeaderMemberCellsForSameDimension=function(u,E){var v;var M;var w;var i=0;var I;var x;var y;v=this.getDimensionInfoByRow(u.getTableRow());I=this.findIndexInterval(v.sDimensionName,"COLS");w=[];x=c.getColumnHeaderArea();y=x.getRowCnt()-1;i=I.iStartIndex;while(i<=I.iEndIndex){M=x.getCellWithRowSpan(i,u.getCol());if(M){if(E){if(M.getRow()<y){w.push(M);}}else{w.push(M);}i=i+M.getRowSpan();}else{i++;}}return w;};this.findStartIndexOfPreviousDimension=function(u,v){var I;var M;var i;var w;var x;var y=0;var i;var P;if(v==="ROWS"){I=C;}else if(v==="COLS"){I=r;}if(I){M=I.length-1;i=M;w=false;while(i>=0&&!w){x=I[i];if(x.sDimensionName===u){w=true;}else{i--;}}while(x.sDimensionName===u&&i>=0){x=I[i];if(x.sDimensionName===u){i--;}}P=x.sDimensionName;while(x.sDimensionName===P&&i>=0){x=I[i];if(x.sDimensionName!==P){y=i+1;}else{i--;}}}return y;};this.isFirstDimensionOnAxis=function(u){if(u.sAxisName==="ROWS"&&C){return C[0].sDimensionName===u.sDimensionName;}else if(u.sAxisName==="COLS"&&r){return r[0].sDimensionName===u.sDimensionName;}return true;};this.isDimensionInCrosstab=function(u){if(n){if(n.hasOwnProperty(u)){return true;}}return false;};this.hasOnlyMeasureStructure=function(){var I=null;var i=0;var u=0;var v=null;var H=false;if(!C&&r){I=r;v="ROWS";}else if(!r&&C){I=C;v="COLS";}if(I&&I.length>0){H=true;for(i=0;i<I.length;i++){if(!I[i].bIsMeasureStructure){H=false;break;}}}return H;};}
