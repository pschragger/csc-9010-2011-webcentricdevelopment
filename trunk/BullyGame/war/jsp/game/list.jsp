<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GamePlayer" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PawnState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<html>
	<body>
	
<% 
	PersistenceManager pm = PMF.get().getPersistenceManager();
	String query = "select from " + GameState.class.getName();
	List<GameState> games = (List<GameState>) pm.newQuery(query).execute();
	BullyUser CurrentUser = BullyUser.loggedInUser();
	
	
	if (games.isEmpty())
	{
%>
		<p>There are no games available</p>
<%

	}
	else
	{
%>
		<p>Found <%= games.size() %> games</p><br />
<%	
		for (GameState gm : games)
		{
		%>
			<p>
			<!--  <a href="update.jsp?game=<%/*= gm.getKey().getId() */%>">Game <%/*= gm.getKey().getId() */%></a> was started <%/*= gm.getStartDate().toString() */%><br /> -->
			<a href="/ClientTest.html?username=0&gameid=<%= gm.getKey().getId() %>">Game <%= gm.getKey().getId() %></a> was started <%= gm.getStartDate().toString() %><br />
			</p>
		<%			
		}
	}
%>
<br />
<form action="/newGame" method="get">
	<label>Username: <%= CurrentUser.getName() %></label>
	<input type="submit" value="Create New Game"/>
</form>
<form action="/newGame" method="post">
	<label>Player 1</label><input type="text" id="player" name="player">
	<label>Player 2</label><input type="text" id="player" name="player">
	<label>Player 3</label><input type="text" id="player" name="player">
	<label>Player 4</label><input type="text" id="player" name="player">
	<input type="submit" value="Create Game" />
</form>