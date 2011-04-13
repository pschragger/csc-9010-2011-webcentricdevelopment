package edu.villanova.csc9010.bullygame.server;

import java.io.IOException;
import java.util.logging.Logger;
import javax.jdo.PersistenceManager;
import javax.servlet.http.*;
import com.google.appengine.api.datastore.Key;
import edu.villanova.csc9010.bullygame.server.GamePlayer;
import edu.villanova.csc9010.bullygame.server.PMF;

public class createGameServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(createGameServlet.class.getName());
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		String[] pl = req.getParameterValues("player"); 
		int color = 3;
		long gKey;
		
		GameState game = new GameState();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			//store GameState
			pm.makePersistent(game);
			gKey = game.getKey();
			
			//store players for game
			for (String player : pl)
			{
				if (player != null && player.trim() != "")
				{
					long playerId = Long.parseLong(player);
					//Assign player color from 0 to 3
					if (color == 3)
						color = 0;
					else
						color++;
					
					//Create 4 pawns at position 0 for this player/color/game combo
					for (int pNum=0;pNum<4;pNum++)
					{
						pm.makePersistent(new PawnState(gKey, color, pNum, 0));
					}
	
					//Create Game/Player association
					pm.makePersistent(new GamePlayer(gKey, playerId, color,1));
				}
			}
			
		}
		finally
		{
			pm.close();
		}
		
		resp.sendRedirect("/jsp/game/list.jsp");
	}
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		Cookie[] UserCookies = req.getCookies();
		String[] myCookie = null;
		
		if (UserCookies!=null)
		{
			for (int i=0; i<UserCookies.length; i++)
			{
				if (UserCookies[i].getName().equals("dev_appserver_login"))
				{
					Cookie someCookie = UserCookies[i];
					myCookie = someCookie.getValue().split(":");
					break;
				}
			}
		}
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		String newURL = "/jsp/game/game.jsp?username=" + myCookie[2];
		System.out.println("New URL is " + newURL);
		resp.sendRedirect(newURL);
	}
}
