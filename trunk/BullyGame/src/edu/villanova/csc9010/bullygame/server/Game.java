package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;

import java.util.Date;
import java.util.ArrayList;
import java.util.Iterator;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;


@PersistenceCapable
public class Game {
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private Key key;
	
	@Persistent
	private Date startDate;
	
	@Persistent
	private User currentPlayer;
	
	@Persistent
	private boolean active;
	
	@Persistent
	private User winner;
	
	@Persistent
	private Date endDate;
	
	public Game()
	{
		this.startDate = new Date();
		this.currentPlayer = null;
		this.winner = null;
		this.endDate = null;
		this.active = true;
		
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
	
	public User getCurrentPlayer()
	{
		return currentPlayer;
	}
	
	public boolean getActive()
	{
		return active;
	}
	
	public User getWinner()
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
	
	private void setCurrentPlayer(User cp)
	{
		currentPlayer = cp;
	}
	
	public void setActive(boolean a)
	{
		active = a;
	}
	
	public void setWinner(User w)
	{
		winner = w;
	}
	
	public void setEndDate(Date ed)
	{
		endDate = ed;
	}

}
