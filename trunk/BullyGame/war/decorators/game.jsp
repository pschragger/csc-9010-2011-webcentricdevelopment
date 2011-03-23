<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>
<% BullyUser user = BullyUser.loggedInUser(); %>

<!DOCTYPE html> 
<html> 
<head> 
	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <title><decorator:title default="Bully Game" /></title>
    
    <jsp:include page="/decorators/includes/head.jsp" />
    <decorator:head />
</head>
<body id='gameLayout'>
	<div id='container'>
    	<jsp:include page="/decorators/includes/navigation.jsp" />
		<div id='content'>
			<div id='stats'>
				<% if (user != null) { %>
					Rank: <%= user.rank() %> of <%= BullyUser.playerCount() %> players.
					<br />
					Stats: <%= user.stats() %>
				<% } else { %>
					<a href='<%= BullyUser.loginUrl() %>'>sign in</a> to view stats
				<% } %>
			</div>
			<div id='gameContent'>
    			<decorator:body />
    		</div>
    		<div id='friends'>
    			<jsp:include page="/decorators/includes/friends.jsp" />
    		</div>
    		<div id='chat'>
    			<jsp:include page="/decorators/includes/chat.jsp" />
    		</div>
    	</div>
    	<jsp:include page="/decorators/includes/footer.jsp" />
    </div>
</body>
</html>