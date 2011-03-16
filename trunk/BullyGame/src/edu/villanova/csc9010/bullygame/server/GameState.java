package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;



@PersistenceCapable
public class GameState {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private Date startDate;
	
	@Persistent
	private String currentPlayer;
	
	@Persistent
	private boolean active;
	
	@Persistent
	private String winner;
	
	@Persistent
	private Date endDate;
	
	/**
	 * Creates a new game with a unique key, the current date, and sets active as true. All other fields are null 
	 */
	public GameState()
	{
		this.startDate = new Date();
		this.currentPlayer = null;
		this.winner = null;
		this.endDate = null;
		this.active = true;
		
	}

	/**
	 * Create a new Game object
	 * @param key unique identifier
	 * @param s Date the game was started
	 * @param cp the email of the player who is currently making a move
	 * @param w the email of the winner of the game
	 * @param ed the end date
	 * @param a true if active, false if not
	 */
	public GameState(Key key, Date s, String cp, String w, Date ed, boolean a)
	{
		this.key = key;
		this.startDate = s;
		this.currentPlayer = cp;
		this.winner = w;
		this.endDate = ed;
		this.active = a;
	}
	
	
	//getters
	
	public Key getKey()
	{
		return key;
	}	
	
	public Date getStartDate()
	{
		return startDate;
	}
	
	public String getCurrentPlayer()
	{
		return currentPlayer;
	}
	
	public boolean getActive()
	{
		return active;
	}
	
	public String getWinner()
	{
		return winner;
	}
	
	public Date getEndDate()
	{
		return endDate;
	}
	
	//setters
	
	private void setStartDate(Date st)
	{
		startDate = st;
	}
	
	private void setCurrentPlayer(String cp)
	{
		currentPlayer = cp;
	}
	
	public void setActive(boolean a)
	{
		active = a;
	}
	
	public void setWinner(String w)
	{
		winner = w;
	}
	
	public void setEndDate(Date ed)
	{
		endDate = ed;
	}

}
