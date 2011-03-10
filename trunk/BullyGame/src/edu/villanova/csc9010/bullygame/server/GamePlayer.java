/* GamePlayer.java
 * Data Object to store the gameID and the associate PlayerIDs 
 * 
 */

package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;

import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/*
 * Data object that stores Game IDs and the Player ID if they are playing that game
 */
@PersistenceCapable
public class GamePlayer {
	//@PrimaryKey
	@Persistent
	private Key game;
	
	@PrimaryKey
	@Persistent
	private User user;
	
	public Key getGame()
	{
		return game;
	}
	
	public User getUser()
	{
		return user;
	}
	
	public void setGame(Key g)
	{
		game = g;
	}
	
	public void setUser(User u)
	{
		user = u;
	}
	
}
