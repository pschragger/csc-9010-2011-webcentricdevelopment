<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GamePlayer" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PawnState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<html>
<head>
</head>
<body>
	
<%
	List<GameState> games = GameState.getAllGames();

	if(games == null || games.size() <= 0)
	{
		%>No games found in the database<%
	}
	else
	{
		%><p>Found <%= games.size() %> games.</p><%
		
		for (GameState game :games)
		{
			%>Game #<%= game.getKey() %> was found.<br /><%
		}
	}
%>
</body>
</html>