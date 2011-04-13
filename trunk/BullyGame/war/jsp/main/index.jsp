<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>
<%@ page import="java.util.List" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameState" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.Friend" %>

<html>
  <body>
  <!-- 
  	Not logged in -  welcome, please login
  	
  	Logged in - List active games, inactive games, active friends, create a new game
  
   -->
   Welcome to the Bully Game.
   <%
   //check if user is logged in
   if (BullyUser.isLoggedIn())
   {
	   BullyUser user = BullyUser.loggedInUser();
	   
	   //display active games
	   %>
	   <div id="activeGames">
	   <%
	   List<GameState> aGames = user.activeGames();
	   
	   if (aGames != null)
	   {
		   for (GameState game : aGames)
		   {
			   long gameKey = game.getKey();
			   %>
			   <div class="game"><a href="/jsp/game.jsp?id=<%= gameKey %>">Game <%= gameKey %></a></div>
			   <%
		   }
	   }
	   else
	   {
		   %>You have no active games<%
	   }
	   %>
	   </div>
	   <%
	   
	   //display inactive games
	   List<GameState> iGames = user.inactiveGames();
	   
	   if (iGames != null)
	   {
		   %><div id="inactiveGames"><% 
		   for (GameState game : iGames)
		   {
			   long gameKey = game.getKey();
			   %>
			   <div class="game"><a href="/jsp/game.jsp?id=<%= gameKey %>">Game <%= gameKey %></a></div>
			   <%
		   }
		   %></div><%
	   }

	   //display friends and use CSS to designate active/inactive
	   %><div id="friends"><%
	   List<Friend> friends = user.friends();
	   
	   if(friends != null)
	   {
		   
		   for(Friend friend : friends)
		   {
			   String name = friend.getFriend().getName();
			   long fId = friend.getFriendId();
			   boolean active = friend.getFriend().getIsActive();
			   String online = "inactive";
			   
			   //if the friend is active, use class active for CSS
			   if (active)
				   online = "active";
			   
			   %>
			   <div class="<%= online %>"><a href="#"><%= name %></a></div>
			   <%
			   
		   }
	   }
	   else
	   {
		   %>You have no friends<%
	   }
	   %></div><%
	   
	   //start a new game
   }
   else
   {
	   %>
	   To join a game and get started playing, <a href='<%= BullyUser.loginUrl() %>'>sign in</a>.
	   <%
   }
   %>
  </body>
</html>