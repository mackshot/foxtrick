/**
 * TransferCompareSort.js
 * hide unknown youthskills
 * @Authors:  convincedd
 */
////////////////////////////////////////////////////////////////////////////////
var FoxtrickTransferCompareSort = {
    
    MODULE_NAME : "TransferCompareSort",
	MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES : new Array('transferCompare'), 
	DEFAULT_ENABLED : true,
	NEW_AFTER_VERSION: "0.4.9",
	LATEST_CHANGE:"Sorting transfer compare results",
	LATEST_CHANGE_CATEGORY : Foxtrick.latestChangeCategories.NEW,
		
    init : function() {
    },

    run : function( page, doc ) {
		try  {
			var table = doc. getElementById('mainBody').getElementsByTagName('table')[0];				
			for (var i=0;i<table.rows.length;++i) {
				table.rows[4].cells[i].setAttribute( "s_index", i );						
				table.rows[4].cells[i].addEventListener( "click", this.sortClick, true );						
				table.rows[4].cells[i].setAttribute( "style", "cursor:pointer;");						
				table.rows[4].cells[i].title=Foxtrickl10n.getString("SortBy");
			}
		} catch(e) {Foxtrick.dump('FoxtrickTransferCompareSort.run error: '+e+'\n');}
	},
	

	sortfunction: function(a,b) {return a.cells[FoxtrickTransferCompareSort.s_index].innerHTML.localeCompare(b.cells[FoxtrickTransferCompareSort.s_index].innerHTML);},
	sortnumberfunction: function(a,b) { return parseInt(a.cells[FoxtrickTransferCompareSort.s_index].innerHTML.replace(/ |&nbsp;/g,'')) < parseInt(b.cells[FoxtrickTransferCompareSort.s_index].innerHTML.replace(/ |&nbsp;/g,''));},
	sortdatefunction: function(a,b) { 
		var DATEFORMAT = FoxtrickPrefs.getString("htDateformat");
		if  (DATEFORMAT == null ) DATEFORMAT = 'ddmmyyyy';
        switch ( DATEFORMAT ) {
            case 'ddmmyyyy':
                var SD = 1;
                var SM = 2
                var SY = 3;
                break;
            case 'mmddyyyy':
                var SD = 2;
                var SM = 1;
                var SY = 3;
                break;
            case 'yyyymmdd':
                var SD = 3;
                var SM = 2;
                var SY = 1;
                break;
		}
		var date1 = a.cells[FoxtrickTransferCompareSort.s_index].innerHTML.match(/(\d+)\.(\d+)\.(\d+)/);
		var date2 = b.cells[FoxtrickTransferCompareSort.s_index].innerHTML.match(/(\d+)\.(\d+)\.(\d+)/);
		return (date1[SY]!=date2[SY]) ? (date1[SY]<date2[SY]) : ((date1[SM]!=date2[SM]) ? (date1[SM]<date2[SM]) : (date1[SD]<date2[SD]));
	},
	sortdownfunction: function(a,b) {return (b.cells[FoxtrickTransferCompareSort.s_index].innerHTML.localeCompare(a.cells[FoxtrickTransferCompareSort.s_index].innerHTML));},
	sortlinksfunction: function(a,b) {return a.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].innerHTML.localeCompare(b.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].innerHTML);},
	sortlinksnumberfunction: function(a,b) {return parseInt(a.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].innerHTML) < parseInt(b.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].innerHTML);},
	sortskillsfunction: function(a,b) {return a.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].href.match(/ll=(\d+)/)[1] < b.cells[FoxtrickTransferCompareSort.s_index].getElementsByTagName('a')[0].href.match(/ll=(\d+)/)[1];},
	
	sortClick : function(ev) {
	try{
		var doc = ev.target.ownerDocument;
		var table = doc. getElementById('mainBody').getElementsByTagName('table')[0];
		var table_old = table.cloneNode(true);
		FoxtrickTransferCompareSort.s_index = ev.target.getAttribute('s_index');
		if (!FoxtrickTransferCompareSort.s_index)  FoxtrickTransferCompareSort.s_index = ev.target.parentNode.getAttribute('s_index');
		
		var rows= new Array();
		for (var i=5;i<table.rows.length-2;++i) {
			rows.push(table_old.rows[i]);
		}
		
		
		if (FoxtrickTransferCompareSort.s_index==0) rows.sort(FoxtrickTransferCompareSort.sortlinksnumberfunction);
		else if (FoxtrickTransferCompareSort.s_index==1) rows.sort(FoxtrickTransferCompareSort.sortdatefunction);
		else if (FoxtrickTransferCompareSort.s_index==5) rows.sort(FoxtrickTransferCompareSort.sortskillsfunction);
		else rows.sort(FoxtrickTransferCompareSort.sortnumberfunction);
		
		var j=0;
		for (var i=5;i<table.rows.length-2;++i) {
			table.rows[i].innerHTML = rows[j++].innerHTML;
		}
	} catch(e) {Foxtrick.dump('FoxtrickTransferCompareSort: '+e+'\n');}
	},
}

