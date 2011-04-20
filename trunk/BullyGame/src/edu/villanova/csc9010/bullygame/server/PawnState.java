package edu.villanova.csc9010.bullygame.server;

import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable
public class PawnState {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key pawnID;
	
	@Persistent
	private long gameID;
	
	@Persistent
	private int pawnColor;
	
	@Persistent
	private int pawnNum;
	
	@Persistent
	private int pawnPos;
	
	private final int HOME = 69;
	
	/**
	 * Creates a new PawnState object to store the location of a game piece
	 * @param gameID Key for the game the pawn belongs to
	 * @param pawnColor Color of the pawn. Determines play order.
	 * @param pawnNum Number of the pawn
	 * @param pawnPos Position on the board
	 */
	public PawnState(long gameID, int pawnColor, int pawnNum, int pawnPos)
	{
		this.gameID = gameID;
		this.pawnColor = pawnColor;
		this.pawnNum = pawnNum;
		this.pawnPos = pawnPos;
	}
	
	/**
	 * 
	 * @param pawnID
	 * @param game
	 * @param pawnColor
	 * @param pawnNum
	 * @param pawnPos
	 */
	public PawnState(Key pawnID, long gameID, int pawnColor, int pawnNum, int pawnPos)
	{
		this.pawnID = pawnID;
		this.gameID = gameID;
		this.pawnColor = pawnColor;
		this.pawnNum = pawnNum;
		this.pawnPos = pawnPos;
	}
	
	//GETTERS
	public Key getPawnID()
	{
		return pawnID;
	}
	
	public long getGameID()
	{
		return gameID;
	}
	
	public int getPawnColor()
	{
		return pawnColor;
	}
	
	public int getPawnNum()
	{
		return pawnNum;
	}
	
	public int getPawnPos()
	{
		return pawnPos;
	}
	
	//SETTERS
	public void setGameID(long gameID)
	{
		this.gameID = gameID;
	}
	
	public void setPawnColor(int pawnColor)
	{
		this.pawnColor = pawnColor;
	}
	
	public void setPawnNum(int pawnNum)
	{
		this.pawnNum = pawnNum;
	}
	
	public void setPawnPos(int pawnPos)
	{
		this.pawnPos = pawnPos;
	}
	
	public boolean isHome()
	{
		return pawnPos == HOME;
	}
	
	static public PawnState findPawnByGameIdColorPawnNumber(long GameId, int Color, int PawnNumber)
	{
		PawnState returnPawn = null;
		PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(PawnState.class);
		    query.setFilter("gameID == userParam && pawnNum == pawnNumber && pawnColor == userColor ");
		    query.declareParameters("long userParam, int pawnNumber, int userColor");
		    List<PawnState> results = (List<PawnState>)query.execute(GameId,PawnNumber,Color);
		    returnPawn = results.get(0);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return returnPawn;
	}
}
