// @copyright@
sap.ui.define(function(){"use strict";sap.ui.jsview("sap.ushell.components.tiles.applauncher.StaticTile",{getControllerName:function(){return"sap.ushell.components.tiles.applauncher.StaticTile";},createContent:function(c){this.setHeight('100%');this.setWidth('100%');},getTileControl:function(){jQuery.sap.require('sap.m.GenericTile');jQuery.sap.require('sap.m.ImageContent');var c=this.getController();return new sap.m.GenericTile({header:'{/config/display_title_text}',subheader:'{/config/display_subtitle_text}',size:"Auto",tileContent:new sap.m.TileContent({size:"Auto",footer:'{/config/display_info_text}',content:new sap.m.ImageContent({src:'{/config/display_icon_url}',width:"100%"})}),press:[c.onPress,c]});},getLinkControl:function(){if(window.location.search.indexOf("new_links_container=true")===-1){jQuery.sap.require('sap.m.Link');return new sap.m.Link({text:"{/config/display_title_text}",href:"{/nav/navigation_target_url}",target:{path:"/nav/navigation_target_url",formatter:function(u){if(u&&u[0]!=='#'){return"_blank";}}}});}else{jQuery.sap.require('sap.m.GenericTile');var c=this.getController();return new sap.m.GenericTile({mode:sap.m.GenericTileMode.LineMode,header:'{/config/display_title_text}',subheader:'{/config/display_subtitle_text}',press:[c.onPress,c]});}}});},false);
