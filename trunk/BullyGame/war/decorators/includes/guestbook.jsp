<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.*" %>
<%@ page import="javax.jdo.PersistenceManager" %>
<%@ page import="com.google.appengine.api.users.User" %>
<%@ page import="com.google.appengine.api.users.UserService" %>
<%@ page import="com.google.appengine.api.users.UserServiceFactory" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.Greeting" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.PMF" %>

<html>
	<head>
	<style type="text/css">
		#chatMessages {
			height: 150px;
			overflow: auto;
		}
	</style>
	<script type="text/javascript">
		function update() {
			var element = document.getElementById("chatMessages");
			// make ajax request to /decorators/include/chatContent.jsp
				//in the callback set element.innerHTML to the response
		}
		setInterval(update, 15*1000);
	</script>
	</head>
  <body>
  
  	<div id="chatMessages">
  		<jsp:include page="/decorators/includes/chatContent.jsp" />
  	</div>

    <form action="/sign" method="post">
      <input name="content" id="chatContent" size="50" /> <input type="submit" value="send" />
    </form>

  </body>
</html>