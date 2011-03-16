package edu.villanova.csc9010.bullygame.server;

import java.io.IOException;
import java.util.logging.Logger;
import javax.jdo.PersistenceManager;
import javax.servlet.http.*;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import java.util.ArrayList;

import edu.villanova.csc9010.bullygame.server.GamePlayer;
import edu.villanova.csc9010.bullygame.server.PMF;

public class createGameServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(createGameServlet.class.getName());
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {

		//Get current logged in user by email
		UserService userService = UserServiceFactory.getUserService();
		User user = userService.getCurrentUser();
		String cu = user.getEmail();
		
		String[] pl = req.getParameterValues("player");
	
		
		GamePlayer game = new GamePlayer(pl);
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			pm.makePersistent(game);
		}
		finally
		{
			pm.close();
		}
	}
	

}
