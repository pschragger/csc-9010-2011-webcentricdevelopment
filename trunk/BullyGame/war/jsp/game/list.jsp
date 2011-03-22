<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GamePlayer" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PawnState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<html>
	<body>
	
<% 
	PersistenceManager pm = PMF.get().getPersistenceManager();
	String query = "select from " + GameState.class.getName();
	List<GameState> games = (List<GameState>) pm.newQuery(query).execute();
	
	if (games.isEmpty())
	{
%>
		<p>There are no games available</p>
<%

	}
	else
	{
%>
		<p>Found <%= games.size() %> games</p>
<%	
		for (GameState gm : games)
		{
		%>
			<p>
			Game Key: <%= gm.getKey().toString() %>.<br />
			Game Started: <%= gm.getStartDate().toString() %><br />
			Current Player: <%= gm.getCurrentPlayer() %><br />
			Activity: <%= gm.getActive() %><br />
			Winner: <%= gm.getWinner() %><br />
			Game End: <%= gm.getEndDate() %><br />
			Players:
			<%
			String pquery = "select from " + GamePlayer.class.getName();
			List<GamePlayer> players = (List<GamePlayer>) pm.newQuery(pquery).execute();
			
			if (players.size() != 0)
			{
				for (GamePlayer player : players)
				{
					if((player.getGame() != null) && (player.getGame().getId()==gm.getKey().getId()))
					{
						System.out.println("Player game: "+player.getGame().getId());
					%>
						<%= player.getUser() %> is Player <%= player.getColor() %> for Game <%= player.getGame().getId() %>.<br />
					<%
					}
				}
			}
				%>
			</p><br />
		<%			
		}
	}
%>

<form action="/newGame" method="post">
	<label>Player 1</label><input type="text" id="player" name="player">
	<label>Player 2</label><input type="text" id="player" name="player">
	<label>Player 3</label><input type="text" id="player" name="player">
	<label>Player 4</label><input type="text" id="player" name="player">
	<input type="submit" value="Create Game" />
</form>