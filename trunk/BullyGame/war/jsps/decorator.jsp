<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator" prefix="decorator" %>
<!DOCTYPE html> 
<html> 
<head> 
	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
    <title><decorator:title default="Bully Game" /></title>
    <link rel='stylesheet' type='text/css' media='all' href='/css/reset.css' />
    <link rel='stylesheet' type='text/css' media='all' href='/css/style.css' />
    
    <decorator:head />
</head>
<body>
	<div id='container'>
		<div id='top'>
			<h1>Bully Game</h1>
			<div id='user'><jsp:include page="/includes/user.jsp" /></div>
		</div>
		<ul id='nav'>
			<li><a href='/'>Home</a></li>
			<li><a href='/'>Another Link</a></li>
			<div class='clear'></div>
		</ul>
		<div id='content'>
    		<decorator:body />
    	</div>
    	<div id='footer'>
    		Something fancy goes here.
    	</div>
    </div>
</body>
</html>