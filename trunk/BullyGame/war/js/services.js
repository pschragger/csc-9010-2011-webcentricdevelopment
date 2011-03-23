
//used to get the game info (player#, game id, turn #) and put them in cookies
function getGameInfo()
	// Create then call the Request
	var myRequest = new Request.JSON({
		url: '/bullygame/game', 
		onSuccess: function(responseText){			
			console.log("cookies received...");
			
			var jsonResponse = JSON.decode(responseText);
			
            //update the cookies
            TurnNumber = Cookie.write("turnnum", jsonResponse.TurnNumber);			
		},
		onFailure: function(){
			alert('Error communicating with Server.');	
		},		
	});
	
	myRequest.set('send', createQueryObj('GetGameInfo',true,true,true));	
	myRequest.send();
}

//used to get the game info (player#, game id, turn #) and put them in cookies
function checkState()
	// Create then call the Request
	var myRequest = new Request.JSON({
		url: '/bullygame/game', 
		onSuccess: function(responseText){
            console.log("game state check callback received...");
            
            //decode the json and put it in an object
            var jsonResponse = JSON.decode(responseText);
            
            //create the new html from the json's data
            var Status = jsonResponse.Status;
            
            //update the turn
            var turnElm = $('turn');
            turnElm.set('html', jsonResponse.TurnNumber);
            
            //check to see if something was changed
            if (Status=="State Changed") {
            	alert("There has been a change in state!");
        	}		
        },
		onFailure: function(){
			alert('Error communicating with Server.');	
		},
		
	});
		
	
	myRequest.set('send', createQueryObj('checkState',true,true,true));	
	myRequest.send();	
}


//sends a request to the server to use a card
function playTurn() {
	// Create then call the Request
	var myRequest = new Request.JSON({
		url: '/bullygame/game', 
		onSuccess: function(responseText){
			console.log("useCard callback received...");
            
            //decode the json and put it in an object
            var jsonResponse = JSON.decode(responseText);
            
            //create the new html from the json's data
            var Status = jsonResponse.Status;
            
            //display a new card
            if (Status=="Valid") {
            	alert("roll was validated by the server.")
        	}		
        },
		onFailure: function(){
			alert('Error communicating with Server.');	
		},
		
	});
		
		//get the session variables
		      checkCookies();
		      var GameID = Cookie.read("gameid");
		      var PlayerID = Cookie.read("playerid");
		      	
		      //get pawn moves
		      var pNumberArray = [1];
		      var pStartArray = [0];
		      var pEndArray = [5];
		      
		      //create the JSON object
		      var objJSON =
		      {
		        "GameID" : GameID,
		        "CardNumber" : CardNumber,
		        "PlayerID" : PlayerID,
		        "Moves" : 
		        	
		      };
		
		      var strJSON = JSON.encode(objJSON);
		      console.log("JSON sent: " + strJSON);
		      
		      //create and send the http request
		      var QueryString = "action=playTurn&content=" + strJSON;
		      req.open("PUT", "/bullygame/game?" + QueryString, true);

	
	var objJSON = createQueryObj('playTurn',true,true,true);
	objJSON.Moves = {
		"PawnNumber" : pNumberArray,
		"StartSpace" : pStartArray,
		"EndSpace" : pEndArray
	};
	
	myRequest.set('send', objJSON);	
	myRequest.put();	
}


// Helper function for creating querystrings. Currently uses Cookies for the main data.
function createQueryObj(actionStr,inclGameId,inclPlayerId,inclTurnNumber) {
	return { 
		action: actionStr,
		GameId: inclGameId ? (Cookie.read("gameid" : null),
		PlayerId: inclPlayerId ? (Cookie.read("playerid" : null),
		TurnNumber: inclTurnNumber ? (Cookie.read("turnnumber" : null)
	};
}	


//function for fetching query parameters (from http://www.netlobo.com/url_query_string_javascript.html)
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
