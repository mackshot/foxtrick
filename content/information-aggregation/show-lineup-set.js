/**
 * @file show-lineup-set.js
 * @desc highlight teams that have set a lineup, ownerless teams,
 *       and/or winning teams in league fixture/result table
 * @author convinced, ryanli
 */

var FoxtrickShowLineupSet = {
	MODULE_NAME : "ShowLineupSet",
	MODULE_CATEGORY : Foxtrick.moduleCategories.INFORMATION_AGGREGATION,
	PAGES : ["league"],
	OPTIONS : ["LineupSet", "Ownerless", "Winning"],

	run : function(doc) {
		const rtl = Foxtrick.util.layout.isRtl(doc);
		var lineupSet = [];
		var bots = [];

		// check teams that have set a lineup
		if (FoxtrickPrefs.isModuleOptionEnabled("ShowLineupSet", "LineupSet")) {
			var newsFeed = doc.getElementById("ctl00_ctl00_CPContent_CPMain_repLLUFeed");
			var items = newsFeed.getElementsByClassName("feedItem");
			// check whether an item is a set-lineup item, if is, return team
			// name, otherwise return null
			var getLineupTeam = function(item) {
				var links = item.getElementsByTagName("a");
				if (links.length == 2) {
					var isTransfer = Foxtrick.any(function(n) { return n.href.indexOf("PlayerID=") >= 0; }, links);
					if (!isTransfer)
						return links[0].textContent;
				}
				return null;
			};

			lineupSet = Foxtrick.map(getLineupTeam, items);
			lineupSet = Foxtrick.filter(function(n) { return n != null; }, lineupSet);
		}

		// check ownerless teams
		if (FoxtrickPrefs.isModuleOptionEnabled("ShowLineupSet", "Ownerless")) {
			var leagueTable = doc.getElementById("mainBody").getElementsByTagName("table")[0];
			// checks whether a team is ownerless
			var isOwnerless = function(link) { return Foxtrick.hasClass(link, "shy"); }
			// get bots/ownerless
			var teams = leagueTable.getElementsByTagName("a");
			var botLinks = Foxtrick.filter(isOwnerless, teams);
			bots = Foxtrick.map(function(n) { return n.textContent; }, botLinks);
		}

		var isFixtureTable = function(table) {
			try {
				var row = table.rows[1];
				return (row.cells.length >= 2)
					&& (row.cells[1].innerHTML.indexOf("/Club/Matches/Live.aspx?actionType=addMatch") >= 0);
			}
			catch (e) {
				return false;
			}
		};
		var isResultTable = function(table) {
			return Foxtrick.hasClass(table, "left");
		};

		var tables = doc.getElementById("mainBody").getElementsByTagName("table");
		// only deal with fixture/result tables
		tables = Foxtrick.filter(function(n) {
			return isFixtureTable(n) || isResultTable(n);
		}, tables);
		for (var k = 0; k < tables.length; ++k) {
			var table = tables[k];
			for (var i = 1; i < table.rows.length; ++i) {
				var row = table.rows[i];
				if (row.cells.length < 2)
					continue; // not a valid fixture/result row
				var link = row.cells[0].getElementsByTagName('a')[0];
				// lineup set (for future matches only)
				if (isFixtureTable(table)) {
					for (var j = 0; j < lineupSet.length; ++j) {
						var pos = link.title.indexOf(lineupSet[j]);
						if (pos == 0) {
							// home team has set lineup
							var reg = new RegExp(/(.+)&nbsp;-/);
							link.innerHTML = link.innerHTML.replace(reg, '<strong>$1</strong>&nbsp;-');
						}
						else if (pos > 0) {
							// away team has set lineup
							var reg = new RegExp(/-&nbsp;(.+)/);
							link.innerHTML = link.innerHTML.replace(reg, '-&nbsp;<strong>$1</strong>');
						}
					}
				}
				// bots (for both results and future matches)
				for (var j = 0; j < bots.length; ++j) {
					var pos = link.title.indexOf(bots[j]);
					if (pos == 0) {
						// home team is bot
						var reg = new RegExp(/(.+)&nbsp;-/);
						link.innerHTML = link.innerHTML.replace(reg, '<span class="shy">$1</span>&nbsp;-');
					}
					else if (pos > 0) {
						// away team is bot
						var reg = new RegExp(/-&nbsp;(.+)/);
						link.innerHTML = link.innerHTML.replace(reg, '-&nbsp;<span class="shy">$1</span>');
					}
				}
				// wins (for results only)
				if (isResultTable(table)
					&& FoxtrickPrefs.isModuleOptionEnabled("ShowLineupSet", "Winning")) {
					var goals = Foxtrick.trim(row.cells[1].textContent).split(/\s*-\s*/);
					var goal_dif = parseInt(goals[0]) - parseInt(goals[1])
					if (rtl) goal_dif *= -1; // reverted for rtl
					if (goal_dif > 0) {
						var reg = new RegExp(/(.+)\&nbsp;-/);
						link.innerHTML = link.innerHTML.replace(reg,'<strong>$1</strong>&nbsp;-');
					}
					else if (goal_dif < 0) {
						var reg = new RegExp(/\-&nbsp;(.+)/);
						link.innerHTML = link.innerHTML.replace(reg,'-&nbsp;<strong>$1</strong>');
					}
				}
			}
		}
	}
};
Foxtrick.util.module.register(FoxtrickShowLineupSet);
