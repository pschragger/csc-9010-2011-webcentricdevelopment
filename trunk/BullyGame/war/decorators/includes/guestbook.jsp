<%@ page import="edu.villanova.csc9010.bullygame.server.Greeting" %>

  	<div id="chatMessages"></div>

    <form action="/sign" method="post" id="chatForm">
      <input name="content" id="chatContent" size="50" />
      <input type="submit" value="send" />
    </form>
    
	<script type="text/javascript">
		(function() {
			function scrollToBottom() {
				var div = document.getElementById('chatMessages');
				div.scrollTop = div.scrollHeight;
			}
			
			function updateChat() {
				new Request.HTML({url: '/decorators/includes/chatContent.jsp', update: $('chatMessages'), onSuccess: scrollToBottom}).get();
			}
			
			function postMessage() {
				new Request.HTML({url: '/sign', update: $('chatMessages'), onSuccess: scrollToBottom}).post($('chatForm'));
				document.getElementById("chatContent").value = "";
				return false;
			}
		
			function startChat() {
				updateChat();
				document.getElementById("chatForm").onsubmit = postMessage;
			}
			
			window.addEvent('load', startChat);
			setInterval(updateChat, 15*1000);
		})();
	</script>