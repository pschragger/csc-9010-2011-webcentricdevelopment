package edu.villanova.csc9010.bullygame.server;
import java.io.IOException;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.*;

import java.io.PrintWriter;
import java.util.List;

import org.datanucleus.jdo.JDOAdapter;
import org.json.simple.*;
import org.json.simple.parser.*;


public class GameServlet  extends HttpServlet
{
	static final int MinRoll = 1;
	static final int MaxRoll = 6;
	static final int MaxPlayers = 2; //just for testing
	
	//Static JSON names
	static final String JSONGameID = "GameID";
	static final String JSONPlayerID = "PlayerID";
	static final String JSONUserName = "UserName";
	static final String JSONTurnNumber = "TurnNumber";
	static final String JSONNumberPlayers = "NumberPlayers";
	static final String JSONPlayerTurnID = "PlayerTurnID";
	static final String JSONCardURL = "CardURL";
	static final String JSONDiceRoll1 = "DiceRoll1";
	static final String JSONDiceRoll2 = "DiceRoll2";
	static final String JSONCardNumber = "CardNumber";
	static final String JSONStatus = "Status";
	
	Integer PlayerTurn = 0;
	Integer PlayersJoined = 0;
	boolean AllPlayersJoined = false;
	String[] PlayersArray = null;
	long ThisKey;
	
	private static final long serialVersionUID = 1L;
	JSONParser parser = new JSONParser();
	
	//method to start a new game, returns a game key
	private long startGame()
	{
		PlayersArray = new String[MaxPlayers];
		long gKey = -1;
		
		GameState game = new GameState();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			//store GameState
			pm.makePersistent(game);
			gKey = game.getKey();
			ThisKey = gKey;
			game.setTurnNumber(-1);
		}
		finally
		{
			pm.close();
		}
		return gKey;
		
	}
	
	//method for adding a new player
	private String addPlayer(String jsonContent, long gKey)
	{
		String Response = null;
		
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		long UserID = Long.parseLong(json.get(JSONPlayerID).toString());
		//long UserID = Long.parseLong(UserIDString);
		long UserGameID = Long.parseLong(json.get(JSONGameID).toString());
		String Nickname = "Error: could not find user's nickname";
		long alreadyJoinedID = -1;
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		//check the user id
		if (UserID == -1)
		{
			Response = "{\"Status\":\"Invalid PlayerID given\"}";
		}
		else
		{
			//check to see if need to make a new game state --old shouldn't be called anymore
			if (UserGameID==-1)
			{
				//create a new game
				GameState G = new GameState();
				pm.makePersistent(G);
				UserGameID = G.getKey();
			}
			
			//see if the user has already joined this game
			/*
			String query = "select from " + GamePlayer.class.getName();
			 
			List<GamePlayer> allplayers = (List<GamePlayer>)pm.newQuery(query).execute();
			
			if (!allplayers.isEmpty())
			{
				for (GamePlayer thisplayer : allplayers)
				{
					if((thisplayer.getUser().equals(UserID)) &&(thisplayer.getGame()==UserGameID))
					{
						//player is already part of this game
						System.out.println("User re-joined an old game");
						alreadyJoinedID = Long.parseLong(thisplayer.getUser());
						break;
					}
				}
			}
			*/
			List<GamePlayer> allplayers = GamePlayer.findPlayersByGameId(UserGameID);
			boolean alreadyjoined = false;
			int alreadyjoinedTurnId = 0;
			if (!allplayers.isEmpty())
			{
				for (GamePlayer thisplayer : allplayers)
				{
					if (thisplayer.getUser() == UserID)
					{
						//do something
						System.out.println("Already joined");
						alreadyjoined = true;
						alreadyjoinedTurnId = thisplayer.getColor();
					}
				}
				
			}
			//get game state for this gameid
			GameState ThisGame = pm.getObjectById(GameState.class, UserGameID);
			Integer GamePlayersJoined = ThisGame.getNumberPlayersJoined();
			Integer GameTurnNumber = ThisGame.getTurnNumber();
			
			//add the user to a game
			try
			{
				//get player's google nickname and their playerid
				/*
				String query2 = "select from " + BullyUser.class.getName();
				//String query2 = "select from " + BullyUser.class.getName() + " where userId == " + UserID;
				List<BullyUser> gameplayers = (List<BullyUser>) pm.newQuery(query2).execute();
				if (!gameplayers.isEmpty())
				{
					for (BullyUser player : gameplayers)
					{
						if (player.getUserId().equals(UserID))
						{
							Nickname = player.getName();
							break;
						}
					}
				}
				*/
				BullyUser myBU = BullyUser.findByUserId(UserID);
				Nickname = myBU.getName();
			
				//make sure there are open spots and add a new player
				if (alreadyjoined)
				{
					//user has already joined this game, just fetch game state
					json.put(JSONGameID, UserGameID);
					json.put(JSONUserName, Nickname);
					json.put(JSONTurnNumber, GameTurnNumber);
					json.put(JSONNumberPlayers, GamePlayersJoined);
					json.put(JSONPlayerTurnID, alreadyjoinedTurnId);
					
					Response = json.toJSONString();
				}
				else if ((GamePlayersJoined<MaxPlayers) &&(!alreadyjoined)) 
				{
					//Create 4 pawns at position 0 for this player/color/game combo
					for (int pNum=0;pNum<4;pNum++)
					{
						pm.makePersistent(new PawnState(UserGameID, GamePlayersJoined, pNum, 0));
					}
	
					//Create Game/Player association
					pm.makePersistent(new GamePlayer(UserGameID, UserID, GamePlayersJoined,1));
					
					//update the game state
					ThisGame.setNumberPlayers(GamePlayersJoined+1);
					if (GamePlayersJoined==0)
					{
						ThisGame.setCurrentPlayer(UserID);
					}
					
					//check to see if game if now full
					if ((1+GamePlayersJoined)==MaxPlayers)
					{
						PlayerTurn++;
						ThisGame.setTurnNumber(0);
						GameTurnNumber++;
					}
					
					//make return json
					json.put(JSONGameID, UserGameID);
					json.put(JSONUserName, Nickname);
					json.put(JSONTurnNumber, GameTurnNumber);
					json.put(JSONNumberPlayers, GamePlayersJoined+1);
					json.put(JSONPlayerTurnID, GamePlayersJoined);
					
					Response = json.toJSONString();
				}
				else
				{
					//already at max capacity for players
					Response = "{\"Status\":\"No openings\"}";
				}
			}
			finally
			{
				pm.close();
			}		
		}
		return Response;
	}

	
	//utility methods
	//returns a single die roll
	private Integer rollDie()
	{
		Integer randomInt = MinRoll + (int)(Math.random() * ((MaxRoll - MinRoll) + 1));
		return randomInt;
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
	private String getGameInfo(String jsonContent)
	{
		System.out.println("GetGameInfo() was just called.....");
		
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		long GameID = Long.parseLong(json.get(JSONGameID).toString());
		String PlayerID = json.get(JSONPlayerID).toString();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		GameState ThisGame = pm.getObjectById(GameState.class, GameID);
		
		PlayersJoined++;
		Integer TurnNumber = ThisGame.getTurnNumber();
		Integer NumberPlayers = ThisGame.getNumberPlayersJoined();
		JSONObject response = new JSONObject();
		
		response.put(JSONGameID, GameID);
		response.put(JSONPlayerID, PlayerID);
		response.put(JSONTurnNumber, TurnNumber);
		response.put(JSONNumberPlayers,NumberPlayers);
		
		pm.close();
		
		return response.toJSONString();
	}

	//returns the next card in the deck, returns in a json string
	private String getCard(String jsonContent)
	{
		JSONObject json = parseJSON(jsonContent);
		long GameID = Long.parseLong(json.get(JSONGameID).toString());
		String PlayerID = json.get(JSONPlayerID).toString();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		GameState ThisGame = pm.getObjectById(GameState.class, GameID);
		
		String CardURL = "/images/cards/card1.png";
		Integer DiceRoll1 = rollDie();
		Integer DiceRoll2 = rollDie();
		
		//add dice rolls to game state
		ThisGame.setDice(DiceRoll1, DiceRoll2);
		
		//remake json
		json.clear();		
		json.put(JSONCardURL, CardURL);
		json.put(JSONDiceRoll1, DiceRoll1);
		json.put(JSONDiceRoll2, DiceRoll2);
		pm.close();
		
		return json.toJSONString();
	}

	//makes sure a client's suggested move(s) are valid, updates the game's turn #
	private String playTurn(String jsonContent)
	{
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		long GameID = Long.parseLong(json.get(JSONGameID).toString());
		long PlayerID = Long.parseLong(json.get(JSONPlayerID).toString());
		
		//get turn info
		Integer DiceRoll1 = Integer.parseInt(json.get(JSONDiceRoll1).toString());
		Integer DiceRoll2 = Integer.parseInt(json.get(JSONDiceRoll2).toString());
		String CardNumber = json.get(JSONCardNumber).toString();		
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		GameState ThisGame = pm.getObjectById(GameState.class, GameID);
		Integer TurnNumber = ThisGame.getTurnNumber();
		Integer TotalPlayers = ThisGame.getNumberPlayersJoined();
		Integer CurrentPlayerTurn = (TurnNumber % TotalPlayers);
		
		//get list of game players
		//String query = "select from " + GamePlayer.class.getName() + " where gameID==" + GameID;
		//List<GamePlayer> Players = (List<GamePlayer>) pm.newQuery(query).execute();
		/*if (Players.isEmpty())
		{
			System.out.println("No players returned");
		}
		else
		{
			for (GamePlayer gm : Players)
			{
				System.out.println(gm.getUser() + " is color " + gm.getColor());
			}
		}
		*/
		//find out whose turn it is
		GamePlayer CurrentPlayer = GamePlayer.findPlayerByGameIdTurnID(GameID, CurrentPlayerTurn);
		long CurrentPlayerID = CurrentPlayer.getUser();
		
		//check to see if proposed move is valid
		String Response = null;
		boolean ValidMove = (CurrentPlayerID == PlayerID);
		boolean Roll1 = DiceRoll1.equals(ThisGame.getDie1());
		boolean Roll2 = DiceRoll2.equals(ThisGame.getDie2());
		
		if (ValidMove && Roll1 && Roll2)
		{
			//update the game state
			
			Response = "{\"Status\":\"Valid\"}";
			
			PlayerTurn++;
			ThisGame.setTurnNumber(1 + TurnNumber);
			
			//determine next turn
			long NextPlayer;
			CurrentPlayerTurn= (++CurrentPlayerTurn)%MaxPlayers;
			NextPlayer = GamePlayer.findPlayerByGameIdTurnID(GameID, CurrentPlayerTurn).getUser();//Players.get(CurrentPlayerTurn).getUser();
			
			ThisGame.setCurrentPlayer(NextPlayer);
			System.out.println(NextPlayer + "'s turn is next");
		}
		else
		{
			//still the current user's turn
			System.out.println("Player ID is the same: " + ValidMove);
			System.out.println("Roll 1 is the same: " + Roll1);
			System.out.println("Roll 2 is the same: " + Roll2);
			
			Response = "{\"Status\":\"Invalid\"}";
		}
		
		pm.close();
		return Response;
	}
    
	//checks the client's game state against the current game state
	private String checkState(String jsonContent)
	{
		//parse the string into a json object
		JSONObject json = parseJSON(jsonContent);
		long GameID;
		String PlayerID, TurnNumber;
		try
		{
			GameID = Long.parseLong(json.get(JSONGameID).toString());
			PlayerID = json.get(JSONPlayerID).toString();
		 	TurnNumber = json.get(JSONTurnNumber).toString();
		}
		catch (Exception e)
		{
			System.err.println("Error: JSON was incomplete");
			return "{Status: Error}";
		}
		
		//check to see if proposed move is valid
		String Response = null;
		boolean SameState = true;			//should have a real check here!
		PersistenceManager pm = PMF.get().getPersistenceManager();
		GameState ThisGame = pm.getObjectById(GameState.class, GameID);
		//example - Employee e = pm.getObjectById(Employee.class, "Alfred.Smith@example.com");
		SameState = ThisGame.getTurnNumber().toString().equals(TurnNumber);
		
		
		if (SameState)
		{
			//report no changes
			json.put(JSONStatus, "NoChange");
			json.remove(JSONPlayerID);
			json.remove(JSONGameID);			
			Response = json.toJSONString();		//"{\"Status\":\"NoChange\",\"TurnNumber\":\"" + PlayerTurn + "\"}";
		}
		else
		{
			//update the game state
			json.put(JSONStatus, "State Changed");
			json.put(JSONTurnNumber, ThisGame.getTurnNumber().toString());
			json.put("TotalPlayers", ThisGame.getNumberPlayersJoined().toString());
			json.remove(JSONPlayerID);
			json.remove(JSONGameID);
			
			Response = json.toJSONString();
		}
		
		pm.close();
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
        	String jsonContent = request.getParameter("content");
        	returnString = getGameInfo(jsonContent);
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
		long gKey;
		if (PlayersArray==null)
		{
			gKey = startGame();
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
		long gKey = -1;
		if (PlayersArray==null)
		{
			gKey = startGame();
		}
		
		//set response error by default, change if content != null
        String returnString = "{\"Status\":\"Error: Request action not caught in POST\"}";
        response.setContentType("application/xhtml+xml");

        String Command = request.getParameter("action");
        if (Command==null)
        {
        	System.err.println("no action defined");
        	returnString = "{\"Status\":\"Error\"}";
        }
        else if (Command.compareTo("joinGame")==0)
        {
        	System.out.println("Joining a game");
        	String jsonContent = request.getParameter("content");
            returnString = addPlayer(jsonContent, gKey);
            
            if (PlayersArray.length==MaxPlayers)
            {
            	//start the game
            }
    	}
        else if (Command.compareTo("playTurn")==0)
        {
        	//should be handled by PUT, but mootools is always sending a POST instead....
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