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
      req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}

function getGameInfo()
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
                
                //create the new cookies
                GameID = Cookie.write("gameid", receivedJSON.GameID);
                PlayerID = Cookie.write("playerid", receivedJSON.PlayerID);
                TurnNumber = Cookie.write("turnnum", receivedJSON.TurnNumber);
            }
        }
        
    	function callServlet()
        {
          //create and send the http request
          var QueryString = "action=GetGameInfo";
          req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
          req.send(null);
         
        }

        //create a new request & set its event handler
        req = new XMLHttpRequest();
        req.onreadystatechange = servletCallback;
        
        //send the request
        callServlet();
    	
	}
}

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
      req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}

function useCard(CardNumber)
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
      var QueryString = "action=UseCard&content=" + strJSON;
      req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}

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
            var Status = receivedJSON.Status
            
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
      checkCookies();
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
      req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
      req.send(null);
     
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}