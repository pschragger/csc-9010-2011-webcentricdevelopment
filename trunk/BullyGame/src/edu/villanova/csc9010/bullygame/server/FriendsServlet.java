package edu.villanova.csc9010.bullygame.server;
import java.util.*;
import java.io.IOException;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FriendsServlet extends HttpServlet {
	private static final long serialVersionUID = 5L;

	public void addFriend(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String email = request.getParameter("email");
		if(email != null) {
			BullyUser user = BullyUser.loggedInUser();
			BullyUser friend = BullyUser.findByEmail(email);
			if(friend != null) {
				Friend f = new Friend(user, friend);

			    PersistenceManager pmf = PMF.get().getPersistenceManager();
			    try {
			        pmf.makePersistent(f);
			    } finally {
			        pmf.close();
			    }
			}
		}
		response.sendRedirect(request.getHeader("Referer"));
	}

    public void removeFriend(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long id = Long.valueOf(request.getParameter("id"));
        Friend.delete(BullyUser.loggedInUser(), id);
        response.sendRedirect(request.getHeader("Referer"));
    }

    public void markActive(HttpServletRequest request, HttpServletResponse response) throws IOException {
        BullyUser user = BullyUser.loggedInUser();
        if(user != null) {
            user.markActive();
        }
        response.getWriter().write("");
    }

	public void showFriends(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		BullyUser user = BullyUser.loggedInUser();
		if(user == null) {
		    response.getWriter().write("");
		    return;
		}
		
		user.markActive();
		List<Friend> friendObjects = user.friends();
		List<BullyUser> friends = new ArrayList<BullyUser>();
		for(Friend f : friendObjects) {
			friends.add(f.getFriend());
		}

        request.setAttribute("user", user);
        request.setAttribute("friends", friends);
        
        request.getRequestDispatcher("/jsp/ajax/friends.jsp").forward(request, response);
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] bits = request.getRequestURI().split("/");
		String action = bits[bits.length-1];
		
		if(action.equals("add")) addFriend(request, response);
        else if(action.equals("remove")) removeFriend(request, response);
        else if(action.equals("markActive")) markActive(request, response);
		else showFriends(request, response);
    }
}
