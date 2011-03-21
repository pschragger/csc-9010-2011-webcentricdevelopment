package edu.villanova.csc9010.bullygame.server;
/**
 * THIS IS NO LONGER USED
 */
import java.io.Serializable;
import com.google.appengine.api.datastore.Key;

public class GamePlayerKey implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public Key game;
	public String user;
	
	public GamePlayerKey(){	}
	
	public GamePlayerKey(Key game, String user)
	{
		this.game = game;
		this.user = user;
	}
	
	public boolean equals(Object o)
	{
		if (o == this)
		{
			return true;
		}
		if(!(o instanceof GamePlayerKey))
		{
			return false;
		}
		GamePlayerKey g = (GamePlayerKey) o;
		return game.equals(g.game) && user.equals(g.user);
	}
	
	public int hashCode()
	{
		return this.game.hashCode()^this.user.hashCode();
	}
	
	public String toString()
	{
		return this.getClass().getClass().getName()+"::"+this.game+"::"+this.user;
	}
}
