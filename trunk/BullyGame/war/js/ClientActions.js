/*
 * JSON Object templates
 * 
 * to get a card/roll dice, join a game, 
 * {
 * 	"PlayerID"	:	"some id",
 * 	"GameID"	:	"some key",
 * 	"TurnNumber":	"the turn id"
 * }
 * 
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
            console.log("callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            var newHtml = "<p>" + receivedJSON.Data + "</p>";
            console.log("new html = " + newHtml);
            
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
            console.log("cookies received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //update the cookies
            TurnNumber = Cookie.write("turnnum", receivedJSON.TurnNumber);
        }
    }
    
	function callServlet()
    {
	  //build the query string
	  var GameID = Cookie.read("gameid");
	  var PlayerID = Cookie.read("playerid");
	  var TurnNumber = Cookie.read("turnnum");
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
    var TurnNumber = Cookie.read("turnnum");
    if ((GameID==null) || (PlayerID==null))
	{
    	function servletCallback()
        {
        	//make sure ready state = 4 and status = 200 (OK)
        	if ((req.readyState==4) &&(req.status==200))
            {
                console.log("cookies received...");
                
                //decode the json and put it in an object
                var receivedJSON = JSON.decode(req.responseText);
                
                if(!receivedJSON.Status)
            	{
		            //create the new cookies
		            GameID = Cookie.write("gameid", receivedJSON.GameID);
		            PlayerID = Cookie.write("playerid", receivedJSON.PlayerID);
		            TurnNumber = Cookie.write("turnnum", receivedJSON.TurnNumber);
		
		            //update the number of players
		            var TotalPlayers = document.getElementById("numplayers");
		            TotalPlayers.innerHTML = receivedJSON.NumberPlayers;
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
    	  console.log("fetch username");
    	  var username = gup("username");
    	  if (username==null)
		  {
    		  username = "anonymous";
		  }
    	  console.log("username = " + username);
    	  
    	  //update the player name on the board
          var UsernameSpan = document.getElementById("playername");
          UsernameSpan.innerHTML = username;
    	  
    	  //create the json object query string
    	  var objJSON = 
    		  {
    			  "PlayerID" : username
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
    var TurnNumber = Cookie.read("turnnum");
	if ((GameID==null) || (PlayerID==null))
	{
		getGameInfo();
	}
}

//sends request to the server to draw a card
function getCard()
{
    function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            console.log("callback received...");
            
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

//sends a request to the server to use a card
function playTurn()
{
	function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            console.log("useCard callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            var Status = receivedJSON.Status
            
            //display a new card
            if (Status=="Valid")
        	{
            	alert("roll was validated by the server.")
        	}
        }
    }

    function callServlet()
    {
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
        	{
        		"PawnNumber" : pNumberArray,
        		"StartSpace" : pStartArray,
        		"EndSpace" : pEndArray
        	}
      };

      var strJSON = JSON.encode(objJSON);
      console.log("JSON sent: " + strJSON);
      
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

//sends a request to the server to see if the game state has changed
function checkState()
{
	function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            console.log("game state check callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            var Status = receivedJSON.Status;
            
            //update the turn
            var TurnNumber = document.getElementById("turn");
            TurnNumber.innerHTML = receivedJSON.TurnNumber;
            
            //check to see if something was changed
            if (Status=="State Changed")
        	{
            	alert("There has been a change")
        	}
        }
    }

    function callServlet()
    {
      //get the session variables
      //checkCookies();
      var GameID = Cookie.read("gameid");
      var PlayerID = Cookie.read("playerid");
      var TurnNumber = Cookie.read("turnnum")
            
      //create the JSON object
      var objJSON =
      {
        "GameID" : GameID,
        "PlayerID" : PlayerID,
        "TurnNumber" : TurnNumber
      };

      var strJSON = JSON.encode(objJSON);
      console.log("JSON sent: " + strJSON);
      
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