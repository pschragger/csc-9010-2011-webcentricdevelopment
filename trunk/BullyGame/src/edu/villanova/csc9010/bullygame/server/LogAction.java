package edu.villanova.csc9010.bullygame.server;


import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;

import java.util.Date;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.PersistenceManager;

@PersistenceCapable
public class LogAction {
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

    @Persistent
    private Date created;
    
    @Persistent
    private User user;
    
    @Persistent
    private String action;

    public LogAction(User user, String action) {
    	this.user = user;
    	this.action = action;
    	this.created = new Date();
    }
    
	public static void log(User user, String action) {
		LogAction data = new LogAction(user, action);
		
        PersistenceManager pm = PMF.get().getPersistenceManager();
        try {
            pm.makePersistent(data);
        } finally {
            pm.close();
        }
	}

	public Key getKey() {
		return key;
	}

	public void setKey(Key key) {
		this.key = key;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}
}
