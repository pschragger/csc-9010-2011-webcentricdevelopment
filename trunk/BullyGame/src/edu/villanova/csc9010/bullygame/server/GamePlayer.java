/* GamePlayer.java
 * Data Object to store the gameID and the associate PlayerIDs 
 * 
 */

package edu.villanova.csc9010.bullygame.server;

import java.util.ArrayList;
import java.util.List;

import com.google.appengine.api.datastore.Key;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.IdentityType;


/*
 * Data object that stores Game IDs and the Player ID if they are playing that game
 */
@PersistenceCapable	//(identityType = IdentityType.APPLICATION, objectIdClass=GamePlayerKey.class)
public class GamePlayer {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key gpID;
	
	@Persistent
	private long gameID;
	
	@Persistent
	private long user;	//long user;
	
	@Persistent
	private int color;
	
	@Persistent
	private int status;
	
	/**
	 * Associates the game key with the user
	 * @param g Game key
	 * @param u Email of the user
	 * @param c Color of the player's pawn. This will determine order. 
	 */
	public GamePlayer(long gameID, long user, int color, int status)
	{
		this.gameID = gameID;
		this.user = user;
		this.color = color;
		this.status = status;
	}
	
	//getters
	public Key getGPID()
	{
		return gpID;
	}
	
	public long getGame()
	{
		return gameID;
	}
	
	public long getUser()
	{
		return user;
	}
	
	public int getColor()
	{
		return color;
	}
	
	public int getStatus()
	{
		return status;
	}
	
	//setters
	public void setGame(long gameID)
	{
		this.gameID = gameID;
	}
	
	public void setStatus(int status)
	{
		this.status = status;
	}
	
	public void setUser(long user)
	{
		this.user = user;
	}
	
	public void setColor(int color)
	{
		this.color = color;
	}

	static public List<GamePlayer> findPlayersByGameId(long GameId)
	{
		List<GamePlayer> returnList = new ArrayList<GamePlayer>();
		PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(GamePlayer.class);
		    query.setFilter("gameID == userParam");
		    query.declareParameters("long userParam");
			returnList = (List<GamePlayer>) query.execute(GameId);
		
			if(returnList.size() > 0) return (List<GamePlayer>) returnList;
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return returnList;
	}
	
	static public GamePlayer findPlayerByGameIdTurnID(long GameId, int turnNumber)
	{
		GamePlayer returnPlayer = null;
		PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(GamePlayer.class);
		    query.setFilter("gameID == userParam && color == userTurn");
		    query.declareParameters("long userParam, int userTurn");
		    List<GamePlayer> results = (List<GamePlayer>)query.execute(GameId,turnNumber);
		    returnPlayer = results.get(0);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return returnPlayer;
	}
}
