<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>

<html>
  <body>
  	Welcome to the Bully Game.  To join a game and get started playing, <a href='<%= BullyUser.loginUrl() %>'>sign in</a>.
  </body>
</html>