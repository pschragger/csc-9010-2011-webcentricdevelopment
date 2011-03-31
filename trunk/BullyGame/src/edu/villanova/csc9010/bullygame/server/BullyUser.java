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

@PersistenceCapable
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

	public BullyUser(User user) {
    	this.user = user;
    	this.name = user.getNickname();
    	this.email = user.getEmail();
    	this.userId = user.getUserId();
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
		PMF.get().getPersistenceManager().makePersistent(bullyUser);
			
		return bullyUser;
	}
	
	public static BullyUser getBullyUser(User user) {
		try {
		    Query query = PMF.get().getPersistenceManager().newQuery(BullyUser.class);
		    query.setFilter("userId == userParam");
		    query.declareParameters("String userParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(user.getUserId());
		
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		}
		
		return null;
	}
	
	public static BullyUser findByEmail(String email) {
		try {
		    Query query = PMF.get().getPersistenceManager().newQuery(BullyUser.class);
		    query.setFilter("email == emailParam");
		    query.declareParameters("String emailParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(email);
			
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public List<Friend> friends() {
		try {
		    Query query = PMF.get().getPersistenceManager().newQuery(Friend.class);
		    query.setFilter("userId == userParam");
		    query.declareParameters("long userParam");
			List<Friend> results = (List<Friend>) query.execute(id);
			
			return results;
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		}
		
		return null;
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
