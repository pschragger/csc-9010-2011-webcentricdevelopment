<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.Greeting" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<% List<Greeting> greetings = Greeting.findAll(); %>
<% for(Greeting greeting : greetings) { %>
  <% if(greeting.getAuthor() == null) continue; %>
  <p>
    <span class='chatName'><%= greeting.getAuthor().getNickname() %></span>:
    <span class='chatMessage'><%= greeting.getContent() %></span>
  </p>
<% } %>