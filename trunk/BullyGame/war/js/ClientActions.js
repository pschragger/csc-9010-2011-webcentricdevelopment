/*
 * JSON Object templates
 * 
 * JOINING A GAME - joinGame()
 * JSON sent to server
 * {
 * 	"PlayerID"	:	"user name"
 * }
 * JSON received from server
 * {
 * 	"GameID"		:	"the game key",
 * 	"TurnNumber"	:	"the overall turn number",
 *  "NumberPlayers"	:	"number of players joined",
 *  "PlayerTurnID"	:	"numerical identifier used to determine whose turn it is"
 * }
 * 
 * DRAW CARD & ROLL DICE - getCard()
 * JSON sent to server
 * {
 * 	"PlayerID"	:	"the user id",
 * 	"GameID"	:	"the game key",
 * 	"TurnNumber":	"the turn id"
 * }
 * JSON received from server
 * {
 * 	"CardURL"	:	"image url for the card",
 * 	"DiceRoll1"	:	"numerical result",
 * 	"DiceRoll2" :	"numerical results"
 * }
 * 
 * 
 * PLAY A TURN - playTurn()
 * JSON sent to server
 * {
 * 	"GameID" 		: "your game id",
 *  "CardNumber" 	: "the card identifier",
 *  "PlayerID" 		: "your player id",
 *  "Moves" 		: 					 //contains 3 arrays of the same size
 *		{								 
 *  		"PawnNumber" : pNumberArray, //an array of pawn numbers that are going to move
 *     		"StartSpace" : pStartArray,	 //an array of starting points for the pawn(s)
 *         	"EndSpace" 	 : pEndArray	 //an array of ending points for the pawn(s)
 *      }
 * }
 * JSON received from server
 * {
 * 	"Status"	:	"Valid/Invalid"
 * }
 * 
 * 
 * CHECK STATE - checkState()
 * JSON sent to server
 * {
 * 	"GameID"	:	"the game key",
 * 	"PlayerID"	:	"the player id",
 * 	"TurnNumber":	"the overall turn"
 * }
 * JSON received from server
 * {
 * 	"Status"		:	"NoChange/State Changed",
 * 	"TurnNumber"	:	"numerical value",
 * 	"TotalPlayers"	:	"total number of players joined"
 * }
 * 
 */



/*Global Variables*/
var Poll;
var CookiePlayerID = "PlayerID";
var CookieGameID = "GameID";
var CookieTurnNumber = "TurnNumber";
var CookieMyTurn = "MyTurn";
var CookiePlayerTurnID = "PlayerTurnID";
var CookieTotalPlayers = "TotalPlayers";
var CookieUserName = "UserName";

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
	function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            //console.log("cookies received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //update the cookies
            TurnNumber = Cookie.write("TurnNumber", receivedJSON.TurnNumber);
        }
    }
    
	function callServlet()
    {
	  //build the query string
	  var GameID = Cookie.read("gameid");
	  var PlayerID = Cookie.read("playerid");
	  var TurnNumber = Cookie.read("TurnNumber");
	  var objJSON = 
	  {
		  "GameID" : GameID,
		  "PlayerID" : PlayerID,
		  "TurnNumber" : TurnNumber
      };
	  var strJSON = JSON.encode(objJSON);
	  
      //create and send the http request
      var QueryString = "action=GetGameInfo&content=" + strJSON;
      req.open("GET", "/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}

//join a game
function joinGame()
{
	//get the player's username and game id from the query string	
	var username = (Cookie.read(CookiePlayerID)!=null)?Cookie.read(CookiePlayerID):gup("username");
	if (username=="")
	{
		username = "-1";
	}
	else if (username=="0")
	{
		var cookieArray = Cookie.read("dev_appserver_login").split(":");
		username = cookieArray[2];
	}
	var GameID = (Cookie.read(CookieGameID)!=null)?Cookie.read(CookieGameID):gup("gameid");
	if (GameID=="")
	{
		GameID="-1";
	}
	  
	//update the player name on the board
    var UsernameSpan = document.getElementById("playername");
    UsernameSpan.innerHTML = username;
	  
	//create the json object query string
	var objJSON = 
	{
			"PlayerID"	: username,
			"GameID"	: GameID
	};
	var strJSON = JSON.encode(objJSON);
	
	//create HTTP Request
	var QueryString = "action=joinGame&content=" + strJSON;
	var req = new Request({
        method: 'POST',
        url: "/bullygame/game?" + QueryString,
        onComplete: function(responseText) 
        {
        	//decode the json and put it in an object
            var receivedJSON = JSON.decode(responseText);
            
            
            if(!receivedJSON.Status)
        	{
	            //create the new cookies
	            GameID = Cookie.write(CookieGameID, receivedJSON.GameID);
	            PlayerID = Cookie.write(CookiePlayerID, receivedJSON.PlayerID);
	            TurnNumber = Cookie.write(CookieTurnNumber, parseFloat(receivedJSON.TurnNumber));
	            MyTurn = Cookie.write(CookieMyTurn,"No");
	            PlayerTurnID = Cookie.write(CookiePlayerTurnID,parseFloat(receivedJSON.PlayerTurnID));
	            var UserName = receivedJSON.UserName;
	            Cookie.write(CookieUserName,UserName);
	            
	            //update the number of players
	            var TotalPlayers = document.getElementById("numplayers");
	            TotalPlayers.innerHTML = receivedJSON.NumberPlayers;
	            var MaxPlayers = Cookie.write(CookieTotalPlayers,receivedJSON.NumberPlayers);
	            
	            //update user name
	            var UserNameDiv = document.getElementById("playername");
	            UserNameDiv.innerHTML = UserName;
	            
	            //start polling the server
	            Poll = self.setInterval("checkState()",3000);
        	}
            else
        	{
            	alert("There are no openings in this game, please join a new one.");
        	}
        }
      }).send();
}

//checks the cookies to make sure they didn't expire
function checkCookies()
{
	//if cookies not found, ask servlet for game id and player id
	var GameID = Cookie.read(CookieGameID);
    var PlayerID = Cookie.read(CookiePlayerID);
    var TurnNumber = Cookie.read(CookieTurnNumber);
	if ((GameID==null) || (PlayerID==null))
	{
		getGameInfo();
	}
}

//sends request to the server to draw a card
function getCard()
{
	//get the session variables
	checkCookies();
	var GameID = Cookie.read(CookieGameID);
	var PlayerID = Cookie.read(CookiePlayerID);
	      
	//create the JSON object
	var objJSON =
	{
			"GameID"	: GameID,
			"PlayerID"	: PlayerID
	};
	var strJSON = JSON.encode(objJSON);
	
	//create and send the http request
	var QueryString = "action=GetCard&content=" + strJSON;
	var req = new Request({
        method: 'GET',
        url: "/bullygame/game?" + QueryString,
        onComplete: function(responseText) 
        {
        	//decode the json and put it in an object
		    var receivedJSON = JSON.decode(responseText);
		    
		    //create the new html from the json's data
		    var CardURL = receivedJSON.CardURL;
		    var DiceRoll1 = receivedJSON.DiceRoll1;
		    var DiceRoll2 = receivedJSON.DiceRoll2;
		    
		    //display a new card
		    var NewCard = document.getElementById("NewCard");
		    NewCard.src = CardURL;
		    
		    //update the dice
		    var Dice1 = document.getElementById("Dice1");
		    var Dice2 = document.getElementById("Dice2");
	        Dice1.innerHTML = DiceRoll1;
	        Dice2.innerHTML = DiceRoll2;
	        
	        //enable the play card button
	        Cookie.write(CookieMyTurn,"Play");
	        var DrawCardButtonDiv = document.getElementById("DrawCardButton");
	        var PlayCardButtonDiv = document.getElementById("PlayCardButton");
	        DrawCardButtonDiv.disabled=true;
	        PlayCardButtonDiv.disabled=false;
        }
      }).send();
}

//sends a request to the server to use a card
/*
function playTurn()
{
	if (Cookie.read("MyTurn")=="Play")
	{
		function servletCallback()
	    {
	    	//make sure ready state = 4 and status = 200 (OK)
	    	if ((req.readyState==4) &&(req.status==200))
	        {
	            //console.log("useCard callback received...");
	            
	            //decode the json and put it in an object
	            var receivedJSON = JSON.decode(req.responseText);
	            
	            //create the new html from the json's data
	            var Status = receivedJSON.Status
	            
	            //display a new card
	            if (Status=="Valid")
	        	{
	            	alert("roll was validated by the server.");
	            	Cookie.write("MyTurn","No");
	            	var PlayCardButtonDiv = document.getElementById("PlayCardButton");
	            	PlayCardButtonDiv.disabled=true;
	        	}
	        }
	    }
	
	    function callServlet()
	    {
	      //get the session variables
	      checkCookies();
	      var GameID = Cookie.read("gameid");
	      var PlayerID = Cookie.read("playerid");
	      
	      //get the dice rolls
	      var Die1 = parseInt(document.getElementById("Dice1").innerHTML);
	      var Die2 = parseInt(document.getElementById("Dice2").innerHTML);
	      
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
	        "DiceRoll1" : Die1,
	        "DiceRoll2" : Die2,
	        "Moves" : 
	        	{
	        		"PawnNumber" : pNumberArray,
	        		"StartSpace" : pStartArray,
	        		"EndSpace" : pEndArray
	        	}
	      };
	
	      var strJSON = JSON.encode(objJSON);
	      //console.log("JSON sent: " + strJSON);
	      
	      //create and send the http request
	      var QueryString = "action=playTurn&content=" + strJSON;
	      req.open("PUT", "/bullygame/game?" + QueryString, true);
	      req.send(null);
	     
	    }
	
	    //create a new request & set its event handler
	    req = new XMLHttpRequest();
	    req.onreadystatechange = servletCallback;
	    
	    //determine the card number
	    var CardNumber = 1;
	    
	    //send the request
	    callServlet();
	}
}
*/
function playTurn()
{
	//get the session variables
    checkCookies();
    var GameID = Cookie.read(CookieGameID);
    var PlayerID = Cookie.read(CookiePlayerID);
    
    //get the dice rolls
    var Die1 = parseInt(document.getElementById("Dice1").innerHTML);
    var Die2 = parseInt(document.getElementById("Dice2").innerHTML);
    var CardNumber = 1;
    
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
      "DiceRoll1" : Die1,
      "DiceRoll2" : Die2,
      "Moves" : 
      	{
      		"PawnNumber" : pNumberArray,
      		"StartSpace" : pStartArray,
      		"EndSpace" : pEndArray
    	}
    };

    var strJSON = JSON.encode(objJSON);
    
    //create and send the http request
    var QueryString = "action=playTurn&content=" + strJSON;
    var req = new Request({
        method: 'PUT',
        url: "/bullygame/game?" + QueryString,
        onComplete: function(responseText) 
        {
        	//decode the json and put it in an object
            var receivedJSON = JSON.decode(responseText);
            
            //create the new html from the json's data
            var Status = receivedJSON.Status
            
            //display a new card
            if (Status=="Valid")
        	{
            	alert("roll was validated by the server.");
            	Cookie.write(CookieMyTurn,"No");
            	var PlayCardButtonDiv = document.getElementById("PlayCardButton");
            	PlayCardButtonDiv.disabled=true;
        	}
        }
      }).PUT();
    
}

//sends a request to the server to see if the game state has changed
function checkState()
{
	//get the session variables
    //checkCookies();
    var GameID = Cookie.read(CookieGameID);
    var PlayerID = Cookie.read(CookiePlayerID);
    var TurnNumber = Cookie.read(CookieTurnNumber)
          
    //create the JSON object
    var objJSON =
    {
      "GameID" : GameID,
      "PlayerID" : PlayerID,
      "TurnNumber" : TurnNumber
    };
    var strJSON = JSON.encode(objJSON);
    
    //create and send the http request
    var QueryString = "action=CheckState&content=" + strJSON; 
    var req = new Request({
        method: 'get',
        url: "/bullygame/game?" + QueryString,
        timeout: 1000,
        onTimeout: function(){alert("Could not connect to the game server..."); window.clearInterval(Poll); },
        onComplete: function(responseText) 
        {
        	//onTimeout still passes the event to onComplete so make sure the response is not null
        	if (responseText!=null)
        	{
	        	//decode the json and put it in an object
	            var receivedJSON = JSON.decode(responseText);
	
	            //check to see if something was changed
	            var Status = receivedJSON.Status;
	            if (Status=="State Changed")
	        	{
	            	//update the turn
	                var TurnNumber = parseFloat(receivedJSON.TurnNumber);
	                if (TurnNumber!=Cookie.read(CookieTurnNumber))
	            	{
	                	//console.log("new turn number");
	    	            Cookie.write(CookieTurnNumber,TurnNumber);
	                	var TurnNumberDiv = document.getElementById("turn"); 
	    	            TurnNumberDiv.innerHTML = TurnNumber;
	            	}
	                
	                //check total amount of players for change
	                var TotalPlayers = parseFloat(receivedJSON.TotalPlayers);
	                if (TotalPlayers!=Cookie.read(CookieTotalPlayers))
	            	{
	    		        Cookie.write(CookieTotalPlayers,TotalPlayers);
	    		        var TotalPlayersDiv = document.getElementById("numplayers");
	    		        TotalPlayersDiv.innerHTML = TotalPlayers;
	            	}
	                
	                //check if its now your turn
	                var PlayerTurnID = parseFloat(Cookie.read(CookiePlayerTurnID));
	                //console.log("player turn id: " + PlayerTurnID);
	                
	                //console.log("overall turn number: " + TurnNumber);
	                var CurrentTurn = TurnNumber % TotalPlayers;
	                //console.log("current turn: " + CurrentTurn);
	                
	                
	                if ((CurrentTurn==PlayerTurnID) && (TotalPlayers>1))
	            	{
	                	//it IS this player's turn
	                	//console.log("My turn!!!");
	                	if (Cookie.read(CookieMyTurn)=="No")
	            		{
	            			Cookie.write(CookieMyTurn,"Draw");
	                    	var DrawCardButtonDiv = document.getElementById("DrawCardButton");
	                    	DrawCardButtonDiv.disabled = false;
	                	}
	            	}
	        	}
        	} 
        }
      }).send();
}