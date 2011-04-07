<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
					<h2>Rank</h2>
					<%= user.rank() %> of <%= BullyUser.playerCount() %> players.
					<h2>Stats</h2>
					Stats: <%= user.stats() %>
				<% } else { %>
					<a href='<%= BullyUser.loginUrl() %>'>sign in</a> to view stats
				<% } %>
			</div>
			<div id='gameContent'>
				<c:if test="${!empty flash}">
					<div id='flash'>${flash}</div>
				</c:if>
    			<decorator:body />
    		</div>
    		<div id='friends'>
    			<jsp:include page="/decorators/includes/friends.jsp" />
    		</div>
    		<div id='chat'>
    			<jsp:include page="/decorators/includes/guestbook.jsp" />
    		</div>
    	</div>
    	<jsp:include page="/decorators/includes/footer.jsp" />
    </div>
</body>
</html>