/**
 * skinPlugin.js
 * Script which including skins
 * chrome://foxtrick/content/resources/css/mainr.css
 * @author smates/convinced
 */
var FoxtrickSkinPlugin = {

    MODULE_NAME : "SkinPlugin",
	MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	DEFAULT_ENABLED : false,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE:"Moved to presentation tab. Old skins need to get reloaded",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
	OPTIONS : new Array('Skin1','Skin2'),
	OPTION_TEXTS : true,
	OPTION_TEXTS_DEFAULT_VALUES : new Array("", ""),
	OPTION_TEXTS_LOAD_BUTTONS : new Array(true,true),
	OPTIONS_CSS: new Array ("",""),
	CSS:'',

    init : function() {
		if (Foxtrick.isModuleFeatureEnabled( this, 'Skin1')) {
			var skinlink = FoxtrickPrefs.getString("module." + this.MODULE_NAME + ".Skin1_text");
			if (Foxtrick.BuildFor=='Chrome') Foxtrick.GetDataURIText(skinlink);
			else this.CSS = skinlink;
		}
		if (Foxtrick.isModuleFeatureEnabled( this, 'Skin2')) {
			var skinlink = FoxtrickPrefs.getString("module." + this.MODULE_NAME + ".Skin2_text");
			if (Foxtrick.BuildFor=='Chrome') Foxtrick.GetDataURIText(skinlink);
			else this.CSS = skinlink;
		}
    },

    run : function(doc ) {
		/*OLD MEDALS SCRIPT*/
        if (FoxtrickPrefs.getBool("module.CustomMedals.enabled")){
                    var sidebar = doc.getElementById('sidebar');
                    if( sidebar ) {
                        var images = sidebar.getElementsByTagName('img');
                        for(var i = 0; i < images.length; i++) {
                            Foxtrick.dump(' => MEDAL ' + images[i].src + '\n');
                            var img = images[i];
                            var imgSrc = img.src;
                            var customMedals = "oldhtmedals";
                            var oldString = "Trophy";
                            var newString = Foxtrick.ResourcePath+"resources/img/"
                                + "custommedals/" + customMedals + "/";
                            if(imgSrc.search(oldString) != -1) {
                                var startPos = imgSrc.lastIndexOf("=") + 1;
                                imgSrc = imgSrc.substr(startPos);
                                imgSrc = imgSrc.replace("png","gif");
                                img.src = newString + imgSrc;
                            }
                        } //images
                    } //sidebar
        } //old medals
    }
};
