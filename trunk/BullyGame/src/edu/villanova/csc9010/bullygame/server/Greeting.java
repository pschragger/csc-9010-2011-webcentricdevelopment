package edu.villanova.csc9010.bullygame.server;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class Greeting {
    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private Key key;

    @Persistent
    private User author;

    @Persistent
    private String content;

    @Persistent
    private Date date;

    public Greeting(User author, String content, Date date) {
        this.author = author;
        this.content = content;
        this.date = date;
    }

    public Key getKey() {
        return key;
    }

    public User getAuthor() {
        return author;
    }

    public String getContent() {
        return content;
    }

    public Date getDate() {
        return date;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public static List<Greeting> findAll() {
        PersistenceManager pmf = PMF.get().getPersistenceManager();
        try {
            Query query = pmf.newQuery(Greeting.class);
            query.setOrdering("date asc");
            List<Greeting> results = (List<Greeting>) query.execute();
            
            return (List<Greeting>)pmf.detachCopyAll(results);
        } catch(Exception e) {
            // If the table does not exist, the read will fail so we need to make the user
            e.printStackTrace();
        } finally {
            pmf.close();
        }
        
        return null;
    }
}