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


//old function...only used by the textarea to demonstrate functionality demo
function sendData(DisplayID, DataID)
{
    function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            //console.log("callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            var newHtml = "<p>" + receivedJSON.Data + "</p>";
            //console.log("new html = " + newHtml);
            
            //get the div id of a html element, and update its contents
            var MyDiv = document.getElementById(receivedJSON.DivId);
            MyDiv.innerHTML=newHtml;
        }
    }

    function callServlet()
    {
      //create the JSON object
      var dataElement = document.getElementById(DataID);
      var data = dataElement.value;
      var objJSON =
      {
        "DivId" : DisplayID,
        "Data" : dataElement.value
      };
      var strJSON = JSON.encode(objJSON);
      console.log("data = " + strJSON);
      
      //create and send the http request
      var QueryString = "action=else&content=" + strJSON;
      req.open("GET", "/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
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

//function called when the page initially loads to join a game
function joinGame()
{
	var GameID = Cookie.read("gameid");
    var PlayerID = Cookie.read("playerid");
    if ((GameID==null) || (PlayerID==null))
	{
    	function servletCallback()
        {
        	//make sure ready state = 4 and status = 200 (OK)
        	if ((req.readyState==4) &&(req.status==200))
            {
                //console.log("cookies received...");
                
                //decode the json and put it in an object
                var receivedJSON = JSON.decode(req.responseText);
                
                if(!receivedJSON.Status)
            	{
		            //create the new cookies
		            GameID = Cookie.write("gameid", receivedJSON.GameID);
		            PlayerID = Cookie.write("playerid", receivedJSON.PlayerID);
		            TurnNumber = Cookie.write("TurnNumber", parseFloat(receivedJSON.TurnNumber));
		            MyTurn = Cookie.write("MyTurn","No");
		            PlayerTurnID = Cookie.write("PlayerTurnID",parseFloat(receivedJSON.PlayerTurnID));
		            
		            
		            //update the number of players
		            var TotalPlayers = document.getElementById("numplayers");
		            TotalPlayers.innerHTML = receivedJSON.NumberPlayers;
		            var MaxPlayers = Cookie.write("TotalPlayers",receivedJSON.NumberPlayers);
            	}
                else
            	{
                	alert("There are no openings in this game, please join a new one.");
            	}
            }
        }
        
    	function callServlet()
        {
    	  //get the player's username from the query string	
    	  //console.log("fetch username");
    	  var username = gup("username");
    	  if (username==null)
		  {
    		  username = "anonymous";
		  }
    	  //console.log("username = " + username);
    	  var GameID = Cookie.read("GameID");
    	  if (GameID==null)
		  {
    		  GameID="-1";
		  }
    	  
    	  //update the player name on the board
          var UsernameSpan = document.getElementById("playername");
          UsernameSpan.innerHTML = username;
    	  
    	  //create the json object query string
    	  var objJSON = 
		  {
			  "PlayerID" : username,
			  "GameID"	 : GameID
		  };
    	  var strJSON = JSON.encode(objJSON);
    	  var QueryString = "action=joinGame&content=" + strJSON;
          
          //create and send the http request
          req.open("POST", "/bullygame/game?" + QueryString, true);
          req.send(null);
         
        }

        //create a new request & set its event handler
        req = new XMLHttpRequest();
        req.onreadystatechange = servletCallback;
        
        //send the request
        callServlet();
	}
    else
	{
    	getGameInfo();
	}
}

//checks the cookies to make sure they didn't expire
function checkCookies()
{
	//if cookies not found, ask servlet for game id and player id
	var GameID = Cookie.read("gameid");
    var PlayerID = Cookie.read("playerid");
    var TurnNumber = Cookie.read("TurnNumber");
	if ((GameID==null) || (PlayerID==null))
	{
		getGameInfo();
	}
}

//sends request to the server to draw a card
function getCard()
{
	if (Cookie.read("MyTurn")=="Draw")
	{
		function servletCallback()
		{
			//make sure ready state = 4 and status = 200 (OK)
			if ((req.readyState==4) &&(req.status==200))
			{
			    //console.log("callback received...");
			    
			    //decode the json and put it in an object
			    var receivedJSON = JSON.decode(req.responseText);
			    
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
		        Cookie.write("MyTurn","Play");
		        var DrawCardButtonDiv = document.getElementById("DrawCardButton");
		        var PlayCardButtonDiv = document.getElementById("PlayCardButton");
		        DrawCardButtonDiv.disabled=true;
		        PlayCardButtonDiv.disabled=false;
	        }
		}
		
		function callServlet()
		{
		  //get the session variables
		  checkCookies();
		  var GameID = Cookie.read("gameid");
		  var PlayerID = Cookie.read("playerid");
		        
		  //create the JSON object
		  var objJSON =
		  {
		    "GameID" : GameID,
		    "PlayerID" : PlayerID
		  };
		
		  var strJSON = JSON.encode(objJSON);
		  
		  //create and send the http request
		  var QueryString = "action=GetCard&content=" + strJSON;
		  req.open("GET", "/bullygame/game?" + QueryString, true);
		  req.send(null);
		 
		}
		
		//create a new request & set its event handler
		req = new XMLHttpRequest();
		req.onreadystatechange = servletCallback;
		
		//send the request
		callServlet();
	}
}

//sends a request to the server to use a card
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

//sends a request to the server to see if the game state has changed
function checkState()
{
	function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            //console.log("game state check callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            
            
            //check to see if something was changed
            var Status = receivedJSON.Status;
            if (Status=="State Changed")
        	{
            	//update the turn
                var TurnNumber = parseFloat(receivedJSON.TurnNumber);
                if (TurnNumber!=Cookie.read("TurnNumber"))
            	{
                	//console.log("new turn number");
    	            Cookie.write("TurnNumber",TurnNumber);
                	var TurnNumberDiv = document.getElementById("turn"); 
    	            TurnNumberDiv.innerHTML = TurnNumber;
            	}
                
                //check total amount of players for change
                var TotalPlayers = parseFloat(receivedJSON.TotalPlayers);
                if (TotalPlayers!=Cookie.read("TotalPlayers"))
            	{
    		        Cookie.write("TotalPlayers",TotalPlayers);
    		        var TotalPlayersDiv = document.getElementById("numplayers");
    		        TotalPlayersDiv.innerHTML = TotalPlayers;
            	}
                
                //check if its now your turn
                var PlayerTurnID = parseFloat(Cookie.read("PlayerTurnID"));
                //console.log("player turn id: " + PlayerTurnID);
                
                //console.log("overall turn number: " + TurnNumber);
                var CurrentTurn = TurnNumber % TotalPlayers;
                //console.log("current turn: " + CurrentTurn);
                
                
                if ((CurrentTurn==PlayerTurnID) && (TotalPlayers>1))
            	{
                	//it IS this player's turn
                	//console.log("My turn!!!");
                	if (Cookie.read("MyTurn")=="No")
            		{
            			Cookie.write("MyTurn","Draw");
                    	var DrawCardButtonDiv = document.getElementById("DrawCardButton");
                    	DrawCardButtonDiv.disabled = false;
                	}
            	}
        	}
        }
    }

    function callServlet()
    {
      //get the session variables
      //checkCookies();
      var GameID = Cookie.read("gameid");
      var PlayerID = Cookie.read("playerid");
      var TurnNumber = Cookie.read("TurnNumber")
            
      //create the JSON object
      var objJSON =
      {
        "GameID" : GameID,
        "PlayerID" : PlayerID,
        "TurnNumber" : TurnNumber
      };

      var strJSON = JSON.encode(objJSON);
      //console.log("JSON sent: " + strJSON);
      
      //create and send the http request
      var QueryString = "action=CheckState&content=" + strJSON;
      req.open("GET", "/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}