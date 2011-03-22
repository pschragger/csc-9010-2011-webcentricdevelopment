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
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			//store GameState
			pm.makePersistent(game);
			
			gKey = game.getKey();
			System.out.println("String gKey is: " + gKey);
			
			//store players for game
			for (String player : pl)
			{
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
				pm.makePersistent(new GamePlayer(gKey, player, color,1));
			}
			
		}
		finally
		{
			pm.close();
		}
		
		resp.sendRedirect("/jsp/game/list.jsp");
	}
	

}
