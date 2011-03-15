package edu.villanova.csc9010.bullygame.server;
import java.io.IOException;
import javax.servlet.http.*;
import java.io.PrintWriter;
import org.json.simple.*;
import org.json.simple.parser.*;

public class GameServlet  extends HttpServlet
{
	static final int MinRoll = 1;
	static final int MaxRoll = 6;
	static final int MaxPlayers = 200; //just for testing
	
	Integer PlayerTurn = 1;
	Integer PlayersJoined = 0;
	String[] PlayersArray = null;
	
	private static final long serialVersionUID = 1L;
	JSONParser parser = new JSONParser();
	
	//method to start a new game
	private void startGame()
	{
		PlayerTurn = 1;
		
		PlayersArray = new String[MaxPlayers];
				
	}
	
	//method for adding a new player
	private String addPlayer(String jsonContent)
	{
		String Response = null;
		
		//make sure there are open spots
		if (PlayersJoined<MaxPlayers)
		{
			//parse the string into a json object
			JSONObject json = parseJSON(jsonContent);
			String Username = json.get("PlayerID").toString();
			
			PlayersArray[PlayersJoined] = Username;
			PlayersJoined++;
			System.out.println(Username + " joined the game");
			
			//make return json
			json.put("GameID", 1);
			json.put("TurnNumber", PlayerTurn);
			json.put("NumberPlayers", PlayersJoined);
			
			Response = json.toJSONString();
		}
		else
		{
			//already at max capacity for players
			Response = "{\"Status\":\"No openings\"}";
		}
		return Response;
	}

	
	//utility methods
	//returns a single die roll
	private String rollDie()
	{
		Integer randomInt = MinRoll + (int)(Math.random() * ((MaxRoll - MinRoll) + 1));
		
		return randomInt.toString();
	}
	
	//takes in a string of json content and parses into a real jsonobject
	private JSONObject parseJSON(String jsonContent)
	{
		//parse the raw content into a json object
        Object obj;
        JSONObject jsonObj = null;
        try
        {
            obj = parser.parse(jsonContent);
            jsonObj = (JSONObject)obj;
        }
        catch (Exception ex)
        {
        	System.out.println("Error parsing JSON object");
        	System.err.println(ex);
        }

        return jsonObj;
	}
	
	
	//Game logic methods
	//returns json with the current game state
	private String getGameInfo()
	{
		String GameID = "100";
		String PlayerID = PlayersJoined.toString();
		PlayersJoined++;
		String TurnNumber = PlayerTurn.toString();
		JSONObject response = new JSONObject();
		
		response.put("GameID", GameID);
		response.put("PlayerID", PlayerID);
		response.put("TurnNumber", TurnNumber);
		response.put("NumberPlayers",PlayersJoined.toString());
		
		return response.toJSONString();
	}

	//returns the next card in the deck, returns in a json string
	private String getCard(String jsonContent)
	{
		String CardURL = "/images/cards/card1.png";
		String DiceRoll1 = rollDie();
		String DiceRoll2 = rollDie();
		JSONObject response = new JSONObject();
		
		response.put("CardURL", CardURL);
		response.put("DiceRoll1", DiceRoll1);
		response.put("DiceRoll2", DiceRoll2);
		
		return response.toJSONString();
	}

	//makes sure a client's suggested move(s) are valid, updates the game's turn #
	private String playTurn(String jsonContent)
	{
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		String GameID = json.get("GameID").toString();
		String PlayerID = json.get("PlayerID").toString();
		String CardNumber = json.get("CardNumber").toString();

		//check to see if proposed move is valid
		String Response = null;
		boolean ValidMove = true;			//should have a real check here!
		if (ValidMove)
		{
			//update the game state
			
			Response = "{\"Status\":\"Valid\"}";
			
			PlayerTurn++;
		}
		else
		{
			//still the current user's turn
			Response = "{\"Status\":\"Invalid\"}";
		}
		
		return Response;
	}
    
	//checks the client's game state against the current game state
	private String checkState(String jsonContent)
	{
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		String GameID = json.get("GameID").toString();
		String PlayerID = json.get("PlayerID").toString();
		String TurnNumber = json.get("TurnNumber").toString();

		//check to see if proposed move is valid
		String Response = null;
		boolean SameState = true;			//should have a real check here!
		if (SameState)
		{
			//update the game state
			
			Response = "{\"Status\":\"NoChange\",\"TurnNumber\":\"" + PlayerTurn + "\"}";
		}
		else
		{
			//still the current user's turn
			Response = "{\"Status\":\"State Changed\",\"TurnNumber\":\"" + PlayerTurn + "\"}";
		}
		
		return Response;
	}
	
	
	//HTTP Request handlers
	//handles GET requests
	public void doGet(HttpServletRequest request, HttpServletResponse response)
              throws IOException
    {
		//make sure game is initialized
		if (PlayersArray==null)
		{
			startGame();
		}
		
    	//set response error by default, change if content != null
        String returnString = null;
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "{\"Status\":\"Error\"}";;
        }
        else if (Command.compareTo("GetGameInfo")==0)
        {
        	System.out.println("getting game info");
            returnString = getGameInfo();
        }
        else if (Command.compareTo("GetCard")==0)
        {
        	System.out.println("getting a new card");
        	String jsonContent = request.getParameter("content");
            returnString = getCard(jsonContent);
    	}
        else if (Command.compareTo("CheckState")==0)
        {
        	System.out.println("checking for a new state");
        	String jsonContent = request.getParameter("content");
            returnString = checkState(jsonContent);
    	}
        /*
        else
        {
        	
	        //get raw content from request
	        request.setCharacterEncoding("UTF-8");
	        String strJSON = request.getParameter("content");
	
	        //parse the raw content into a json object
	        Object obj;
	        JSONObject jsonObj = null;
	        try
	        {
	            obj = parser.parse(strJSON);
	            jsonObj = (JSONObject)obj;
	        }
	        catch (Exception ex)
	        {
	        	System.out.println("here!");
	        	System.err.println(ex);
	        }
	
	        //make sure json object is not null
	        if (jsonObj!=null)
	        {
	            String Data = null;
	            try
	            {
	            	//append the text " was parsed" to the data
	                Data = jsonObj.get("Data").toString() + " was parsed"; 
	            }
	            catch (Exception e)
	            {
	            	//if there was an error, 
	                Data = "data error";
	            }   
	            //put data back into the json
	            jsonObj.put("Data", Data);
	            returnString = jsonObj.toJSONString();
	        }
        }
        */
        
        //write the return string to the printer
        System.out.println("Send this json - " + returnString);
        PrintWriter out = response.getWriter();
        out.printf(returnString);
        out.close();    
    }

	//handles PUT requests
	public void doPut(HttpServletRequest request, HttpServletResponse response)
			throws IOException
	{
		//make sure game is initialized
		if (PlayersArray==null)
		{
			startGame();
		}
		
		//set response error by default, change if content != null
        String returnString = null;
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "{\"Status\":\"Error\"}";
        }
        else if (Command.compareTo("playTurn")==0)
        {
        	System.out.println("Making a turn");
        	String jsonContent = request.getParameter("content");
            returnString = playTurn(jsonContent);
    	}
        
        
        //write the return string to the printer
        System.out.println("Send this json - " + returnString);
        PrintWriter out = response.getWriter();
        out.printf(returnString);
        out.close();
	}

	//handles POST requests
	public void doPost(HttpServletRequest request, HttpServletResponse response)
		throws IOException
	{
		//make sure game is initialized
		if (PlayersArray==null)
		{
			startGame();
		}
		
		//set response error by default, change if content != null
        String returnString = null;
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "{\"Status\":\"Error\"}";
        }
        else if (Command.compareTo("joinGame")==0)
        {
        	System.out.println("Making a turn");
        	String jsonContent = request.getParameter("content");
            returnString = addPlayer(jsonContent);
    	}
        
        
        //write the return string to the printer
        System.out.println("Send this json - " + returnString);
        PrintWriter out = response.getWriter();
        out.printf(returnString);
        out.close();
	}

	//handles POST requests
	public void doDelete(HttpServletRequest request, HttpServletResponse response)
		throws IOException
	{
		//make sure game is initialized
		if (PlayersArray==null)
		{
			startGame();
		}
		
		//set response error by default, change if content != null
        String returnString = null;
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "{\"Status\":\"Error\"}";
        }
        else if (Command.compareTo("gameOver")==0)
        {
        	System.out.println("game over");
        	String jsonContent = request.getParameter("content");
            returnString = "{\"Status\":\"OK\"}";		//addPlayer(jsonContent);
    	}
        
        
        //write the return string to the printer
        System.out.println("Send this json - " + returnString);
        PrintWriter out = response.getWriter();
        out.printf(returnString);
        out.close();
	}
		
}