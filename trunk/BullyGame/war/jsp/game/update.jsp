<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GamePlayer" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PawnState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<%
long gameID = Long.parseLong(request.getParameter("game"));

PersistenceManager pm = PMF.get().getPersistenceManager();
String query = "select from " + GameState.class.getName() + " where key == " + gameID;
List<GameState> games = (List<GameState>) pm.newQuery(query).execute(); 

%>

<html>
<head>
</head>
<body>
<%
for(GameState game : games)
{
%>
	Game <%= game.getKey().getId() %> was started <%= game.getStartDate() %><br />
	Current Player: <%= game.getCurrentPlayer() %><br />
	Activity: <%= game.getActive() %><br />
	Winner: <%= game.getWinner() %><br />
	Game End: <%= game.getEndDate() %><br />
	Players:
	<%
	String pquery = "select from " + GamePlayer.class.getName(); // + " where game == " + gameID;
	System.out.println(pquery);
	List<GamePlayer> players = (List<GamePlayer>) pm.newQuery(pquery).execute();
	/*pquery = "select from " + PawnState.class.getName() + " where game == " + game.getKey().getId();
	List<PawnState> pawns = (List<PawnState>) pm.newQuery(pquery).execute();*/
	
	if (players.size() != 0)
	{
		for (GamePlayer player : players)
		{
			if((player.getGame() != null) && (player.getGame()==game.getKey().getId()))
			{
			%>
				<%= player.getUser() %> is Player <%= player.getColor() %><br />
			<%
				/*for(PawnState pawn : pawns)
				{ 
					if(pawn.getPawnColor() == player.getColor())
					{%>
						Pawn <%= pawn.getPawnNum() %> is at position <%= pawn.getPawnPos() %>
									
				<%	}
				}*/
			}
		}
	}
	else
	{
		%> No players found. Players: <%= players.size() %> <%
	}
}
%>
</body>
</html>