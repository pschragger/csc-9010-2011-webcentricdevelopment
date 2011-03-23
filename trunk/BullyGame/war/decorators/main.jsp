<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<!DOCTYPE html> 
<html> 
<head> 
	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <title><decorator:title default="Bully Game" /></title>
    
    <jsp:include page="/decorators/includes/head.jsp" />
    <decorator:head />
</head>
<body>
	<div id='container'>
    	<jsp:include page="/decorators/includes/navigation.jsp" />
		<div id='content'>
    		<decorator:body />
    	</div>
    	<jsp:include page="/decorators/includes/footer.jsp" />
    </div>
</body>
</html>