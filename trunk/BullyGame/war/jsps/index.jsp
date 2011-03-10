<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.GameUser" %>

<html>
  <body>
    <% if(GameUser.isLoggedIn()) { %>
		<p>Hello, <%= GameUser.loggedInUserName() %>! (You can <a href="<%= GameUser.logoutUrl() %>">sign out</a>.)</p>
    <% } else { %>
    	<a href="<%= GameUser.loginUrl() %>">Sign in</a>
    <% } %>

  </body>
</html>