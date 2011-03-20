<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
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
				You are ranked XXX of 0 players.
			</div>
			<div id='gameContent'>
    			<decorator:body />
    		</div>
    		<div id='friends'>
    			Friends list will be located here.
    		</div>
    		<div id='chat'>
    			Chat will be here.
    		</div>
    	</div>
    	<jsp:include page="/decorators/includes/footer.jsp" />
    </div>
</body>
</html>