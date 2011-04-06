package edu.villanova.csc9010.bullygame.server;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;
import javax.jdo.PersistenceManager;
import javax.servlet.http.*;
import edu.villanova.csc9010.bullygame.server.PMF;
import com.google.appengine.api.datastore.Key;

public class updateGameServlet extends HttpServlet {
	private static final Logger log = Logger.getLogger(updateGameServlet.class.getName());
	
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException
	{
		int gameID = Integer.parseInt(req.getParameter("gameID"));
		
		String query = "select from " + GameState.class.getName() + " where key.getID() == " + gameID;
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try
		{
			List<GameState> game = (List<GameState>) pm.newQuery(query).execute();
			
			if (game.isEmpty())
			{
				System.out.println("No games found");
			}
			else
			{
				for(GameState g: game)
				{
					System.out.println("Found "+g.getKey());
				}
			}
		}
		finally
		{
			pm.close();
		}
		
		resp.sendRedirect("/jsp/list.jsp");
	}

}
