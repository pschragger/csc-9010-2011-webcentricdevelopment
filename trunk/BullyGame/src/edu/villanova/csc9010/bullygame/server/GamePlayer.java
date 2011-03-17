/* GamePlayer.java
 * Data Object to store the gameID and the associate PlayerIDs 
 * 
 */

package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.IdentityType;

/*
 * Data object that stores Game IDs and the Player ID if they are playing that game
 */
@PersistenceCapable(identityType = IdentityType.APPLICATION, objectIdClass=GamePlayerKey.class)
public class GamePlayer {
	@PrimaryKey
	@Persistent
	private Key game;
	
	@PrimaryKey
	@Persistent
	private String user;
	
	/**
	 * creates a new game and associates players to the game.
	 * @param pl ArrayList of User emails who are participating in this game.
	 */
	public GamePlayer(String[] pl)
	{
		//Creates a new Game object and uses that key to associate the players to that game
		Key k;
		GameState gm = new GameState();
		k = gm.getKey();
		for (String player : pl)
		{
			new GamePlayer(k, player);
		}
	}
	
	/**
	 * Associates the game key with the user
	 * @param g Game key
	 * @param u Email of the user
	 */
	public GamePlayer(Key g, String u)
	{
		this.game = g;
		this.user = u;
	}
	
	public Key getGame()
	{
		return game;
	}
	
	public String getUser()
	{
		return user;
	}
	
	public void setGame(Key g)
	{
		game = g;
	}
	
	public void setUser(String u)
	{
		user = u;
	}
	
}
