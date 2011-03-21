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
		int color = 0;
		
	
		Key gKey;
		GameState game = new GameState();
		gKey = game.getKey();
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			//store GameState
			pm.makePersistent(game);
			
			//store players for game
			for (String player : pl)
			{
				//Automatically assigns player color/order 0 to 3
				if (color == 3)
					color = 0;
				else
					color++;
				
				System.out.println(player);
				pm.makePersistent(new GamePlayer(gKey, player,color));
			}
			
		}
		finally
		{
			pm.close();
		}
		
		resp.sendRedirect("/jsp/game/list.jsp");
	}
	

}
