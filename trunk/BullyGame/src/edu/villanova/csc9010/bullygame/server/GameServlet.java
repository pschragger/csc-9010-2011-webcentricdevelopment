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
	static final int MaxPlayers = 2;
	
	int PlayerTurn = 1;
	int[] PlayersArray;
	
	private static final long serialVersionUID = 1L;
	JSONParser parser = new JSONParser();
	
	private String rollDie()
	{
		Integer randomInt = MinRoll + (int)(Math.random() * ((MaxRoll - MinRoll) + 1));
		
		return randomInt.toString();
	}
	
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
	
	private String validateTurn(String jsonContent)
	{
		JSONObject json = parseJSON(jsonContent);
		
		return "";
	}
	
	
	private String getGameInfo()
	{
		String GameID = "100";
		String PlayerID = "1";
		String TurnNumber = "3";
		JSONObject response = new JSONObject();
		
		response.put("GameID", GameID);
		response.put("PlayerID", PlayerID);
		response.put("TurnNumber", TurnNumber);
		
		return response.toJSONString();
	}

	private String getCard(String jsonContent)
	{
		String CardURL = "http://127.0.0.1:8888/images/cards/card1.png";
		String DiceRoll1 = rollDie();
		String DiceRoll2 = rollDie();
		JSONObject response = new JSONObject();
		
		response.put("CardURL", CardURL);
		response.put("DiceRoll1", DiceRoll1);
		response.put("DiceRoll2", DiceRoll2);
		
		return response.toJSONString();
	}

	private String useCard(String jsonContent)
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
		}
		else
		{
			//still the current user's turn
			Response = "{\"Status\":\"Invalid\"}";
		}
		
		return Response;
	}
    
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
			
			Response = "{\"Status\":\"NoChange\"}";
		}
		else
		{
			//still the current user's turn
			Response = "{\"Status\":\"State Changed\"}";
		}
		
		return Response;
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
              throws IOException
    {
    	//set response error by default, change if content != null
        String returnString = "Error - content was null";
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "no action defined.";
        }
        else if (Command.compareTo("GetGameInfo")==0)
        {
        	System.err.println("getting game info");
            returnString = getGameInfo();
        }
        else if (Command.compareTo("GetCard")==0)
        {
        	System.err.println("getting a new card");
        	String jsonContent = request.getParameter("content");
            returnString = getCard(jsonContent);
    	}
        else if (Command.compareTo("UseCard")==0)
        {
        	System.err.println("using a card");
        	String jsonContent = request.getParameter("content");
            returnString = useCard(jsonContent);
    	}
        else if (Command.compareTo("CheckState")==0)
        {
        	System.err.println("checking for a new state");
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
}
