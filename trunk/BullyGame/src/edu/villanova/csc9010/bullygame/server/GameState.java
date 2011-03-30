package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
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
	private long currentPlayer;
	
	@Persistent
	private boolean active;
	
	@Persistent
	private long winner;
	
	@Persistent
	private Date endDate;
	
	/**
	 * Creates a new game with a unique key, the current date, and sets active as true. All other fields are null 
	 */
	public GameState()
	{
		this.startDate = new Date();
		this.currentPlayer = 0;
		this.winner = 0;
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
	public GameState(Key key, Date s, long cp, long w, Date ed, boolean a)
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
	
	public long getCurrentPlayer()
	{
		return currentPlayer;
	}
	
	public boolean getActive()
	{
		return active;
	}
	
	public long getWinner()
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
	
	private void setCurrentPlayer(long cp)
	{
		currentPlayer = cp;
	}
	
	public void setActive(boolean a)
	{
		active = a;
	}
	
	public void setWinner(long w)
	{
		winner = w;
	}
	
	public void setEndDate(Date ed)
	{
		endDate = ed;
	}
	
	public int getNumPlayers()
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		String query;
		query = "select from "+GamePlayer.class.getName()+" where user = "+this.key.getId();
		
		List<GamePlayer> gp = (List<GamePlayer>) pm.newQuery(query);
		
		return gp.size();
	}

}
