
/* This script create request method and send server, then 
received json data. */

$(document).ready(function() {
	
	/* define to stop interval method every press the search button. */
	var intervalId;
		$("#searchButton").click(function() {
			
			if(intervalId)
			{
				clearInterval(intervalId);
				intervalId=null;
			}	
			
			/* get "search keys" from input tag. */
			 var element= document.getElementById('searchKeys');
			 /* get advanced search keys values. */
			 var element_rpp = document.getElementById('search-number-tweets').value;
			 var element_refresh = document.getElementById('search-refresh-time').value;
			 
			 /* clear div, so after every request , script should show only five tweets. */
				
			 $("#main-body-search-error-table3").fadeOut(2000); 
			 $("#tableDiv").empty();
			 $("#error-image-div").fadeOut(1000);
			 $("#error-message-div").fadeOut(2000);
			 $("#error-message-div").empty();
			 
			 
			 if(isNaN(element_rpp) || isNaN(element_refresh))
			 {
				    document.getElementById('error-message-div').innerHTML = "Please entry only numeric character!";
					$("#error-image-div").fadeIn(3000);
					$("#error-message-div").fadeIn(3000);
					
			 }
			 else
			 { 

				 /*set rpp value 5, by a default */
				 if(element_rpp == "")
				 {
					 
					 element_rpp=5;
				 }
				 /*set refresh time 10 seconds by a 10 default. */
				 if(element_refresh == "")
				 {
					 element_refresh=10;
				 }	
				 
				 /* set refresh time as a miliseconds. */
				 element_refresh=  element_refresh*1000;
				 /* in every 10 seconds send request again. */
				 	sendRequest(element.value,element_rpp);
				 

				 	intervalId=setInterval(function() {
					
					sendRequest(element.value,element_rpp);
					
					}, element_refresh);
					
					
				 
			 }
			 
			
			
		});
		
		$("#advanced-search").click(function() {
			$("#main-body-search-error-table3").toggle();
		});
		
	});

function sendRequest(tweet_body,tweet_rpp)
{
	/* send request with use ajax, and get methods. */
	/*to prevent cross domain, choose dataType jsonp.*/
	$.ajax({
		type : 'GET',
		dataType : 'jsonp',
		url : 'http://search.twitter.com/search.json',
		data : {
			q : tweet_body,
			rpp : tweet_rpp
		},
		success : function(jsonObject) {
			/* control json object include error message  */
			if(jsonObject.error)
			{
				document.getElementById('error-message-div').innerHTML = jsonObject.error;
				$("#error-image-div").fadeIn(3000);
				$("#error-message-div").fadeIn(3000);
			}
			else
			{
				/* control json object is null or not. */
				if(jsonObject.results.length == "0")
				{
					document.getElementById('error-message-div').innerHTML = "Any tweets found.";
					$("#error-image-div").fadeIn(3000);
					$("#error-message-div").fadeIn(3000);
				}
				else
				{
					/*if sending request and receive response call createTable Function. */
					createTable(jsonObject);
				}	
			}

		}
	});
}
