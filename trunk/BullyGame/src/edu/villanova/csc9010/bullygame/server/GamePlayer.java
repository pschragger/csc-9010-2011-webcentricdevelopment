/* GamePlayer.java
 * Data Object to store the gameID and the associate PlayerIDs 
 * 
 */

package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
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
	private Key game;
	
	@Persistent
	private String user;
	
	@Persistent
	private int color;
	
	/**
	 * Associates the game key with the user
	 * @param g Game key
	 * @param u Email of the user
	 * @param c Color of the player's pawn. This will determine order. 
	 */
	public GamePlayer(Key game, String user, int color)
	{
		this.game = game;
		this.user = user;
		this.color = color;
	}
	
	public Key getGPID()
	{
		return gpID;
	}
	
	public Key getGame()
	{
		return game;
	}
	
	public String getUser()
	{
		return user;
	}
	
	public int getColor()
	{
		return color;
	}
	
	public void setGame(Key game)
	{
		this.game = game;
	}
	
	public void setUser(String user)
	{
		this.user = user;
	}
	
	public void setColor(int color)
	{
		this.color = color;
	}
	
}
