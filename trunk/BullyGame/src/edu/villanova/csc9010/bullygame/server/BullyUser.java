package edu.villanova.csc9010.bullygame.server;

import java.util.*;
import com.google.appengine.api.users.*;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;

import java.util.Date;
import java.util.List;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@PersistenceCapable(detachable="true")
public class BullyUser {
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;

	@Persistent
    private String userId;

	private User user;
    
    @Persistent
    private String name;
    
    @Persistent
    private String email;
    
    @Persistent
    private long lastActive;

	public BullyUser(User user) {
    	this.user = user;
    	this.name = user.getNickname();
    	this.email = user.getEmail();
    	this.userId = user.getUserId();
    }
	
	public void markActive() {
	    lastActive = System.currentTimeMillis();
        PersistenceManager pmf = PMF.get().getPersistenceManager();
	    try {
	        pmf.makePersistent(this);
	    } finally {
	        pmf.close();
	    }
	}
	
	public boolean getIsActive() {
	    return System.currentTimeMillis() - lastActive < 60*1000;
	}

	public long getLastActive() {
        return lastActive;
    }

    public void setLastActive(long lastActive) {
        this.lastActive = lastActive;
    }

    public static boolean isLoggedIn() {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		return user != null;
	}
	
	public static BullyUser loggedInUser() {
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		
		if(user == null) return null;
		
		BullyUser bullyUser = getBullyUser(user);
		if(bullyUser != null) return bullyUser;
		
		bullyUser = new BullyUser(user);
        PersistenceManager pmf = PMF.get().getPersistenceManager();
        try {
            pmf.makePersistent(bullyUser);
        } finally {
            pmf.close();
        }
			
		return bullyUser;
	}
	
	public static BullyUser getBullyUser(User user) {
	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(BullyUser.class);
		    query.setFilter("userId == userParam");
		    query.declareParameters("String userParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(user.getUserId());
		
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return null;
	}
	
	public static BullyUser findByEmail(String email) {

	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(BullyUser.class);
		    query.setFilter("email == emailParam");
		    query.declareParameters("String emailParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(email);
			
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return null;
	}
	
	public static BullyUser findByUserId(long passedUserID) {

	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(BullyUser.class);
		    query.setFilter("id == userIdParam");
		    query.declareParameters("long userIdParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(passedUserID);
			
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return null;
	}
	
	public List<Friend> friends() {

	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(Friend.class);
		    query.setFilter("userId == userParam");
		    query.declareParameters("long userParam");
			List<Friend> results = (List<Friend>) query.execute(id);
			
			return (List<Friend>)pmf.detachCopyAll(results);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return null;
	}
	
	/**
	 * 
	 * @return List of all active and inactive GamePlayer objects that the BullyUser belongs to.
	 */
	public List<GamePlayer> allGames()
	{
		PersistenceManager pmf = PMF.get().getPersistenceManager();
		try
		{
			Query query = pmf.newQuery(GamePlayer.class);
			query.setFilter("user == userParam");
			query.declareParameters("long userParam");
			List<GamePlayer> games = (List<GamePlayer>) query.execute(this.id);
			
			if (games.size() > 0)
				return games;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			pmf.close();
		}
		
		return null;
	}
	
	//get active games for this BullyUser. returns null if no active games.
	public List<GameState> activeGames()
	{
		List<GameState> gameStates = new ArrayList<GameState>();
		List<GamePlayer> games = this.allGames();
		if(games != null)
		{
			for (GamePlayer game : games)
			{
				PersistenceManager pmf = PMF.get().getPersistenceManager();
				try
				{
					Query query = pmf.newQuery(GameState.class);
					query.setFilter("key == userParam && active == "+true);
					query.declareParameters("long userParam");
					List<GameState> gm = (List<GameState>) query.execute(game.getGame());
					
					if (gm.size() > 0)
						gameStates.add(gm.get(0));
					
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}
				finally
				{
					pmf.close();
				}
			}
		}
		
		return gameStates;
	}
	
	//get inactive games for this BullyUser. returns null if no inactive games.
	public List<GameState> inactiveGames()
	{
		List<GameState> gameStates = new ArrayList<GameState>();
		List<GamePlayer> games = this.allGames();
		if (games != null)
		{
			for (GamePlayer game : games)
			{
				PersistenceManager pmf = PMF.get().getPersistenceManager();
				try
				{
					Query query = pmf.newQuery(GameState.class);
					query.setFilter("key == userParam && active == userActive");
					query.declareParameters("long userParam, boolean userActive");
					List<GameState> gm = (List<GameState>) query.execute(game.getGame(), false);
					
					if (gm.size() > 0)
						gameStates.add(gm.get(0));
				}
				catch (Exception e)
				{
					e.printStackTrace();
				}
				finally
				{
					pmf.close();
				}
			}
		}
		
		return gameStates;
	}
	
	public static long playerCount() {
		return 0;
	}
	
	public long rank() {
		return 0;
	}
	
	public String stats() {
		return "Some stats";
	}
	
	
	public static String loginUrl() {
		return UserServiceFactory.getUserService().createLoginURL("/users/login");
	}
	
	public static String logoutUrl() {
		return UserServiceFactory.getUserService().createLogoutURL("/");
	}
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
