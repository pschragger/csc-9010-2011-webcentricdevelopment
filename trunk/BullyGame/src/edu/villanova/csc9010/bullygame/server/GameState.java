package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.Query;



@PersistenceCapable
public class GameState {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Long key;
	
	@Persistent
	private Date startDate;
	
	@Persistent
	private long currentPlayer;	//long currentPlayer;
	
	@Persistent
	private Boolean active;
	
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
		this.currentPlayer = 0;
		this.winner = 0;
		this.endDate = null;
		this.active = true;
		this.TurnNumber = -1;
		this.PlayersJoined = 0;
		this.Die1 = 0;
		this.Die2 = 0;
	}
	
	
	//getters
	
	public long getKey()
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
	
	public Boolean getActive()
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
	
	public void setCurrentPlayer(long cp)
	{
		currentPlayer = cp;
	}
	
	public void setActive(Boolean a)
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
		query = "select from "+GamePlayer.class.getName()+" where user = "+this.key;
		
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
	
	/**
	 * query database and return all GameState objects
	 */
	public static List<GameState> getAllGames()
	{
		List<GameState> gameState = null;
		PersistenceManager pmf = PMF.get().getPersistenceManager();
		Query query = pmf.newQuery(GameState.class);
		gameState = (List<GameState>) query.execute();
		
		if(gameState != null)
			return gameState;
		else
			return null;
	}
}
