<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>

<% BullyUser user = BullyUser.loggedInUser();
if(user != null) { %>
	<p>Hello, <%= user.getName() %>! (You can <a href="<%= BullyUser.logoutUrl() %>">sign out</a>.)</p>
<% } %>