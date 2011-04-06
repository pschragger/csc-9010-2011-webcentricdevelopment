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
			#chatMessages .chatName {
				font-weight: bold;
			}
			#chatMessages .chatDate {
				font-size: 11px;
			}
			#chatMessages p {
				margin: 0 0 3px 0;
				padding: 0;
			}
	</style>
	<script type="text/javascript" src="/js/lib/mootools-core-1.3.js"></script>
	<script type="text/javascript">
		(function() {
			function scrollToBottom() {
				var div = document.getElementById('chatMessages');
				if(div.children && div.children.length > 0) {
					div.scrollTop = div.children[div.children.length-1].offsetTop;
				}
			}
			
			function updateChat() {
				new Request.HTML({url: '/decorators/includes/chatContent.jsp', update: $('chatMessages'), onSuccess: scrollToBottom}).get();
			}
		
			window.addEvent('load', updateChat);
			setInterval(updateChat, 15*1000);
		})();
	</script>
	</head>
  <body>
  	<div id="chatMessages">
  		
  	</div>

    <form action="/sign" method="post">
      <input name="content" id="chatContent" size="50" /> <input type="submit" value="send" />
    </form>

  </body>
</html>