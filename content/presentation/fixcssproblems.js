/**
 * Fixes for css isues
 * @author spambot
 */

FoxtrickFixcssProblems = {

    MODULE_NAME : "FixcssProblems",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array('all'),
    DEFAULT_ENABLED : false,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE:"Some options moved to new modules",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.FIX,

    OPTIONS :  new Array(           "Forum_FoxLink_Headers",
                                    "Club_Menu_Teamnames",
                                    "Page_Minimum_Height",
                                    "MatchOrder_Lineheight",
                                    "RTL_Fixes",
                                    "ForumScrollBarFix",
									"MatchReportRatingsFontFix",
									"BrasilToolbarFix"
								),
	OPTIONS_CSS: new Array (
                                Foxtrick.ResourcePath+"resources/css/fixes/Forum_FoxLink_Headers.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/Club_Menu_Teamnames.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/Page_Minimum_Height.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/MatchOrder_Lineheight.css",
                                "",
                                Foxtrick.ResourcePath+"resources/css/fixes/ForumScrollBarFix.css",
								Foxtrick.ResourcePath+"resources/css/fixes/MatchReportRatingsFontFix.css",
								Foxtrick.ResourcePath+"resources/css/fixes/brasil_toolbar.css"
								),
    OPTIONS_CSS_RTL: new Array (
                                Foxtrick.ResourcePath+"resources/css/fixes/Forum_FoxLink_Headers.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/Club_Menu_Teamnames.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/Page_Minimum_Height.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/MatchOrder_Lineheight.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/RTL_Fixes.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/ForumScrollBarFix.css",
								Foxtrick.ResourcePath+"resources/css/fixes/MatchReportRatingsFontFix.css",
								Foxtrick.ResourcePath+"resources/css/fixes/brasil_toolbar.css"
                                ),

    run : function(page, doc) {
	   if ( Foxtrick.isRTLLayout(doc) && Foxtrick.isModuleFeatureEnabled( this, "RTL_Fixes" )) {
			if (!Foxtrick.isStandardLayout( doc ) ) {
                var css = Foxtrick.ResourcePath+"resources/css/fixes/RTL_Fixes_simple.css";
				Foxtrick.addStyleSheet( doc, css );
			}
		}
    }
};
