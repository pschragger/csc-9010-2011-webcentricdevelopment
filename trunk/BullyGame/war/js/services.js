//old function...only used by the textarea to demonstrate functionality demo
function sendData(DisplayID, DataID) {
	// Create Request
	var jsonRequest = new Request.JSON({
	    url: '/bullygame/game',
	    onSuccess: function(responseJSON){
            //create the new html from the json's data
            var newHtml = "<p>" + responseJSON.Data + "</p>";
            console.log("new html = " + newHtml);
            
            //get the div id of a html element, and update its contents
            var MyDiv = document.getElementById(responseJSON.DivId);
            MyDiv.innerHTML=newHtml;
	    },
	    onFailure: function(){
	        alert("Error communicating with server.");
	    }
	});
    // Create JSON object
    var objJSON = {
      "DivId" : DisplayID,
      "Data" : $('dataElement').value
    };
    // Send Request
	jsonRequest.get({
		'action' : 'else',
		'content' : JSON.encode(objJSON)
	});   
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

//used to get the game info (player#, game id, turn #) and put them in cookies
function getGameInfo()
{
	// Create Request
	var jsonRequest = new Request.JSON({
	    url: '/bullygame/game',
	    onSuccess: function(responseJSON){
            //update the cookies
            TurnNumber = Cookie.write("turnnum", responseJSON.TurnNumber);
	    },
	    onFailure: function(){
	        alert("Error communicating with server.");
	    }
	});
	// Create JSON object
    var objJSON = createBaseJSONObj();
    // Send Request
	jsonRequest.get({
		'action' : 'GetGameInfo',
		'content' : JSON.encode(objJSON)
	});
}

//function called when the page initially loads to join a game
function joinGame()
{
	var GameID = Cookie.read("gameid");
    var PlayerID = Cookie.read("playerid");
    var TurnNumber = Cookie.read("turnnum");
    if ((GameID==null) || (PlayerID==null))
	{
    	// Create Request
    	var jsonRequest = new Request.JSON({
    	    url: '/bullygame/game',
    	    onSuccess: function(responseJSON){
                if(!responseJSON.Status) {
    	            //create the new cookies
    	            GameID = Cookie.write("gameid", responseJSON.GameID);
    	            PlayerID = Cookie.write("playerid", responseJSON.PlayerID);
    	            TurnNumber = Cookie.write("turnnum", responseJSON.TurnNumber);
    	
    	            //update the number of players
    	            var TotalPlayers = document.getElementById("numplayers");
    	            TotalPlayers.innerHTML = responseJSON.NumberPlayers;
            	} else {
                	alert("There are no openings in this game, please join a new one.");
            	}
    	    },
    	    onFailure: function(){
    	        alert("Error communicating with server.");
    	    }
    	});
  	  	//get the player's username from the query string	
  	  	console.log("fetch username");
  	  	var username = gup("username") || "anonymous";
  	  	console.log("username = " + username);
  	  
  	  	//update the player name on the board
        $('playername').set('html',username);
  	  
		  //create the json object query string
		var objJSON = {
			'PlayerID' : username
		};
		// Send Request
		jsonRequest.post({
			'action' : 'GetGameInfo',
			'content' : JSON.encode(objJSON)
		});
	} else {
    	getGameInfo();
	}
}


//Helper function to create JSON objects
function createBaseJSONObj() {
	return {
	  "GameID" : Cookie.read("gameid"),
	  "PlayerID" : Cookie.read("playerid"),
	  "TurnNumber" : Cookie.read("turnnum")
	};
}

//checks the cookies to make sure they didn't expire
function checkCookies()
{
	//if cookies not found, ask servlet for game id and player id
	var GameID = Cookie.read("gameid");
    var PlayerID = Cookie.read("playerid");
    var TurnNumber = Cookie.read("turnnum");
	if ((GameID==null) || (PlayerID==null))
	{
		getGameInfo();
	}
}

//sends request to the server to draw a card
function getCard()
{
	// Create Request
	var jsonRequest = new Request.JSON({
	    url: '/bullygame/game',
	    onSuccess: function(responseJSON){
            //create the new html from the json's data
            var CardURL = responseJSON.CardURL;
            var DiceRoll1 = responseJSON.DiceRoll1;
            var DiceRoll2 = responseJSON.DiceRoll2;
            
            //display a new card
            //$('NewCard').src = CardURL;

            //update the dice
            setDice(DiceRoll1,DiceRoll2);
            // temp (3-23)           
            takeTurnWithDice(DiceRoll1+DiceRoll2);
	    },
	    onFailure: function(){
	        alert("Error communicating with server.");
	    }
	});
	// Create JSON object
    var objJSON = createBaseJSONObj();
    // Send Request
	jsonRequest.get({
		'action' : 'GetCard',
		'content' : JSON.encode(objJSON)
	});
}

//sends a request to the server to use a card
function playTurn()
{
	// Create Request
	var jsonRequest = new Request.JSON({
	    url: '/bullygame/game',
	    onSuccess: function(responseJSON){
            //create the new html from the json's data
            var Status = responseJSON.Status;
            
            //display a new card
            if (Status=="Valid") {
            	alert("roll was validated by the server.")
        	}
	    },
	    onFailure: function(){
	        alert("Error communicating with server.");
	    }
	});
	
    //get pawn moves
    var pNumberArray = [1];
    var pStartArray = [0];
    var pEndArray = [5];
    
	// Create JSON object
    var objJSON = createBaseJSONObj();
    objJSON.CardNumber = 1;
    objJSON.Moves = {
		"PawnNumber" : pNumberArray,
		"StartSpace" : pStartArray,
		"EndSpace" : pEndArray
    };
    
    // Send Request
	jsonRequest.get({
		'action' : 'playTurn',
		'content' : JSON.encode(objJSON)
	});
}

//sends a request to the server to see if the game state has changed
function checkState()
{
	// Create Request
	var jsonRequest = new Request.JSON({
	    url: '/bullygame/game',
	    onSuccess: function(responseJSON){
            //create the new html from the json's data
            var Status = responseJSON.Status;
            
            //update the turn
            var TurnNumber = document.getElementById("turn");
            TurnNumber.innerHTML = responseJSON.TurnNumber;
            
            //check to see if something was changed
            if (Status=="State Changed") {
            	alert("There has been a change")
            }
	    },
	    onFailure: function(){
	        alert("Error communicating with server.");
	    }
	});
	// Create JSON object
    var objJSON = createBaseJSONObj();
    // Send Request
	jsonRequest.get({
		'action' : 'CheckState',
		'content' : JSON.encode(objJSON)
	}); 
}