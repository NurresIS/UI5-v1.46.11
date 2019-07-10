/*!
 *  @copyright 2012-2014 SAP SE. All rights reserved@
 */
jQuery.sap.declare("sap.landvisz.internal.LinearRowFieldRenderer");sap.landvisz.internal.LinearRowFieldRenderer={};
sap.landvisz.internal.LinearRowFieldRenderer.render=function(r,c){var a=sap.ui.getCore().getLibraryResourceBundle("sap.landvisz");if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div");r.writeControlData(c);r.addClass("sapLandviszLinearRowFieldSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Small)r.addClass("sapLandviszLinearRowFieldSmallSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.RegularSmall)r.addClass("sapLandviszLinearRowFieldRegularSmallSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Regular)r.addClass("sapLandviszLinearRowFieldRegularSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Medium)r.addClass("sapLandviszLinearRowFieldMediumSize");if(c.getRenderingSize()==sap.landvisz.EntityCSSSize.Large)r.addClass("sapLandviszLinearRowFieldLargeSize");r.addClass("sapLandviszLinearRowField");r.writeClasses();r.write(">");var b=c.getLabel();var d=c.getValue();var h=false;var e=false;var f;if(c.getIconType()){this._assignIconSrc(r,c);c.iconType.setTooltip(c.getIconTitle());r.renderControl(c.iconType);}if(b&&""!=b){if(!d||""==d){f=c.getRightIconSrc();if(f&&""!=jQuery.trim(f)){c.oLinearRowFieldLabel.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldLabel.addStyleClass("fullDataLabelwithRightIcon");}else{c.oLinearRowFieldLabel.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldLabel.addStyleClass("fullDataLabel");}e=false;}else{c.oLinearRowFieldLabel.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldLabel.addStyleClass("dataLabel");}e=true;c.oLinearRowFieldLabel.setText(b);c.oLinearRowFieldLabel.setTooltip(b);r.renderControl(c.oLinearRowFieldLabel);}if(d&&""!=d){if(!b||""==b){f=c.getRightIconSrc();if(f&&""!=jQuery.trim(f)){c.oLinearRowFieldValue.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldValue.addStyleClass("fullDataValuewithRightIcon");}else{c.oLinearRowFieldValue.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldValue.addStyleClass("fullDataValue");h=false;}}else{c.oLinearRowFieldValue.addStyleClass("sapLandviszLinearRowFieldDataCommon");c.oLinearRowFieldValue.addStyleClass("dataValue");h=true;}if(h==true&&e==true){c.seperatorLbl.addStyleClass("dataSeperator");c.seperatorLbl.setText(":");r.renderControl(c.seperatorLbl);}c.oLinearRowFieldValue.setWrapping(false);c.oLinearRowFieldValue.setTooltip(c.getTooltip());c.oLinearRowFieldValue.setText(d);if(c.getInvalidName()==true)c.oLinearRowFieldValue.addStyleClass("sapLandviszWarningBG");r.renderControl(c.oLinearRowFieldValue);}f=c.getRightIconSrc();if(f&&""!=jQuery.trim(f)){var i=c.getRightIconSrc();c.rightIcon.setSrc(i);c.rightIcon.setTooltip(c.getRightIconTooltip());c.rightIcon.addStyleClass("sapLandviszRightIcon");r.renderControl(c.rightIcon);}r.write("</div>");}};
sap.landvisz.internal.LinearRowFieldRenderer._assignIconSrc=function(r,c){if(c.getIconType()=="p")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/Product_enable.png")).addStyleClass("img");else if(c.getIconType()=="pv")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/ProductVersion_enable.png")).addStyleClass("img");if(c.getIconType()=="pi")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/ProductInstance_enable.png")).addStyleClass("img");if(c.getIconType()=="ps")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/ProductSystem_enable.png")).addStyleClass("img");if(c.getIconType()=="scv")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/SoftwareComponentVersion_enable.png")).addStyleClass("img");if(c.getIconType()=="ts")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/TechnicalSystem_enable.png")).addStyleClass("img");if(c.getIconType()=="MOB")c.iconType.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"24x24"+"/Solution.png")).addStyleClass("img");};
