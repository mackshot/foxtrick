/**
 * Presentation Fixes
 * @author spambot, ljushaff
 */

FoxtrickSimplePresentation = {
    MODULE_NAME : "SimplePresentation",
    MODULE_CATEGORY : Foxtrick.moduleCategories.PRESENTATION,
	PAGES : new Array('all'),
    DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.5.0.5",
	LATEST_CHANGE:"Added module for presentation options",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,

    OPTIONS :  new Array(           "League_Table",
									"Guestbook",
									"liveHighlightRed",
									"Highlight_Staff_On_All_Pages",
                                    "HideUnseenMatchesPanel",
                                    "HideAchievementsIcons",
									"NoLogo"
								),
	OPTIONS_CSS: new Array (
                                Foxtrick.ResourcePath+"resources/css/fixes/League_Table.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/Guestbook.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/liveHighlightRed.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/staffmarker.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/hideUnseenMatchesPanel.css",
                                Foxtrick.ResourcePath+"resources/css/fixes/achievement_hideicons.css",
								Foxtrick.ResourcePath+"resources/css/fixes/NoLogo.css"
								)
};
