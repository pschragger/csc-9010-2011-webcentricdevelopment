<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GamePlayer" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PawnState" %>

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
		for (GameState g : games)
		{
%>
	<p>
		GameID: <%= g.getKey() %> <br />
		Game Started: <%= g.getStartDate().toString() %> <br />
		Players: 
<%
			query = "select from " + GamePlayer.class.getName() + " where game == " + g.getKey();
			List<GamePlayer> gp = (List<GamePlayer>) pm.newQuery(query.execute();
			
			for (GamePlayer player : gp)
			{
%>
				<%= gp.getUser() %>, 
<%				
			}
%>
		Current Player: <%= g.getCurrentPlayer() %> <br />
		Game Winner: <%= g.getWinner() %> <br />
		Game Ended: <%= g.getEndDate().toString() %> <br />
		Active Game?: <%= g.getActive().toString() %><br />
	</p>
<%
		
		}
	}
%>

<form action="/newGame" method="post">
	<input type="text" id="player">
	<input type="text" id="player">
	<input type="text" id="player">
	<input type="text" id="player">
	<input type="submit" value="Create Game" />
</form>