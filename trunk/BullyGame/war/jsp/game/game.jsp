<%@ page import="edu.villanova.csc9010.bullygame.server.BullyUser" %>
<html>
<head>
	<script type="text/javascript" async="" src="http://www.google-analytics.com/ga.js"></script>
	<script type="text/javascript" src="js/lib/mootools-yui-compressed.js"></script>
    <script type="text/javascript" src="/js/lib/mcl-min.js"></script>
	<script type="text/javascript" src="/js/dice.js"></script>
	<script type="text/javascript" src="/js/square.js"></script>  
	<script type="text/javascript" src="/js/pawn.js"></script>
	<script type="text/javascript" src="/js/point.js"></script>
	<script type="text/javascript" src="/js/board.js"></script>   	
   	<script type="text/javascript" src="/js/ClientActions.js"></script>
   	<script type="text/javascript"> 	
		$(window).addEvent('load',function(){
			setUpBoard();
   		});
   	</script>

   	
</head>
<body>
  	<canvas id="diceCanvas" width="250" height="100" style="z-index: 1;border: 2px solid black;background-image: url('/images/green_felt.jpg');"></canvas>
  	<div style="width: 200px; float: right; border:3px solid black;">
		Number of Players: <span id="numplayers">1</span>
		<br/>
		Turn #: <span id="turn">0</span>
		<br/>
		Status: <span id="status">Waiting for players to join</span> 
		<br/>
		Player Color: <span id="color">1</span> 
   	</div>
  	<br/>
  	<input id="diceButton" type="button" value="Roll Dice" onclick="beginTurn()">
  	<br/>
  	<canvas id="boardCanvas" style="z-index: 2;" width="625" height="625"></canvas>   
	<br/>
      	
	<audio id="diceroll" src="/audio/diceroll1.wav" preload="auto"/>
</body>
</html>