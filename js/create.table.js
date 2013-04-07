
/* This script inner html dynamically as a table format
from json values. */

function createTable(jsonObject)
	{	
		
		/* create table by use standart hmtl tags. */
		var tableHeader = '<table class="main-body-tweet-table"  >';
		var tableBody = '';
		
		/* traverse data results json values, step by step*/
		$.each(jsonObject.results, function(index, tweet) {
			
			tableBody += '<tr>';
			
			tableBody += '<td rowspan="2">';
			tableBody += '<img class="profil-picture" src='+tweet.profile_image_url+' >';
			tableBody += '</td>';
			
			tableBody += '<td class="full-user-name">';
			tableBody += tweet.from_user_name;
			tableBody += '</td>';

			tableBody += '<td class="user-name">';
			tableBody += '@'+tweet.from_user;
			tableBody += '</td>';
			
			tableBody += '<td class="tweet-date">';
			tableBody +=  tweet.created_at;
			tableBody += '</td>';
			
			tableBody += '</tr>';
			
			tableBody += '<tr>';
			
			tableBody += '<td colspan="3" class="tweet-body">';
			tableBody += tweet.text;
			tableBody += '</td>';
			
			tableBody += '</tr>';
			
			tableBody += '<tr>';
			
			tableBody += '<td colspan="4">';
			tableBody += '&nbsp;';
			tableBody += '</td>';
			
			tableBody += '</tr>';
			
		});
		
		var tableFooter = '</table>';
		
		/* added or appended table ,tablebody and tableFooter into div */
		document.getElementById('tableDiv').innerHTML = tableHeader + tableBody + tableFooter;
	
	}