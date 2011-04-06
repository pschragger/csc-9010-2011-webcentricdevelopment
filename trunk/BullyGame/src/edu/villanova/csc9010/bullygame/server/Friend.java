package edu.villanova.csc9010.bullygame.server;

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
public class Friend {
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Long id;
	
	@Persistent
	private long userId;
	
	@Persistent
	private long friendId;
	
	public Friend(BullyUser user, BullyUser friend) {
    	this.userId = user.getId();
    	this.friendId = friend.getId();
	}
	
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public long getFriendId() {
		return friendId;
	}

	public void setFriendId(long friendId) {
		this.friendId = friendId;
	}
	
	public BullyUser getFriend() {

	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(BullyUser.class);
		    query.setFilter("id == userParam");
		    query.declareParameters("long userParam");
			List<BullyUser> results = (List<BullyUser>) query.execute(friendId);
		
			if(results.size() > 0) return results.get(0);
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
		
		return null;
	}
	
	public static void delete(BullyUser user, long friendId) {
		long userId = user.getId();


	    PersistenceManager pmf = PMF.get().getPersistenceManager();
		try {
		    Query query = pmf.newQuery(Friend.class);
		    query.setFilter("userId == "+userId+" && friendId == "+friendId);
			query.deletePersistentAll();
		} catch(Exception e) {
			// If the table does not exist, the read will fail so we need to make the user
			e.printStackTrace();
		} finally {
		    pmf.close();
		}
	}
}
