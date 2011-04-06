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
	private String currentPlayer;	//long currentPlayer;
	
	@Persistent
	private boolean active;
	
	@Persistent
	private long winner;
	
	@Persistent
	private Date endDate;
	
	@Persistent
	private Integer TurnNumber;
	
	@Persistent
	private Integer PlayersJoined;
	
	@Persistent
	private Integer Die1;
	
	@Persistent
	private Integer Die2;
	
	
	/**
	 * Creates a new game with a unique key, the current date, and sets active as true. All other fields are null 
	 */
	public GameState()
	{
		this.startDate = new Date();
		this.currentPlayer = "0";
		this.winner = 0;
		this.endDate = null;
		this.active = true;
		this.TurnNumber = -1;
		this.PlayersJoined = 0;
		this.Die1 = 0;
		this.Die2 = 0;
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
	public GameState(Key key, Date s, String cp, long w, Date ed, boolean a)
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
	
	public long getWinner()
	{
		return winner;
	}
	
	public Date getEndDate()
	{
		return endDate;
	}
	
	public Integer getNumberPlayersJoined()
	{
		return PlayersJoined;
	}
	
	public Integer getTurnNumber()
	{
		return TurnNumber;
	}
	
	public Integer getDie2()
	{
		return Die2;
	}
	
	public Integer getDie1()
	{
		return Die1;
	}
	
	
	//setters
	private void setStartDate(Date st)
	{
		startDate = st;
	}
	
	public void setCurrentPlayer(String cp)
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
	
	public void setTurnNumber(Integer tn)
	{
		TurnNumber = tn;
	}

	public void setNumberPlayers(Integer np)
	{
		PlayersJoined = np;
	}

	public void setDice(Integer DieOne, Integer DieTwo)
	{
		Die1 = DieOne;
		Die2 = DieTwo;
	}
}
