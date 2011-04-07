// Red will be 0, yellow will be 1, green 2, and blue 3.
// So the 50th square on the green path, for example, would be
// paths[2][49]
// Player Colors
var RED = 0;
var YELLOW = 1;
var GREEN = 2;
var BLUE = 3;
// Other Colors
var WHITE = 4;
var BLACK = 5;
var STEELBLUE = 6;
var SKYBLUE = 7;
var COLORS = ['rgb(255,0,0)','rgb(255,255,0)','rgb(0,255,0)','rgb(0,0,255)',
              'rgb(255,255,255)','rgb(0,0,0)','rgb(70,140,180)','rgb(135,206,235)'];

var PAWN_ONE = 0;
var PAWN_TWO = 1;
var PAWN_THREE = 2;
var PAWN_FOUR = 3;

var paths = [];
paths[RED] = [69];
paths[YELLOW] = [69];
paths[GREEN] = [69];
paths[BLUE] = [69];

var pawns = [];
pawns[RED] = [4];
pawns[YELLOW] = [4];
pawns[GREEN] = [4];
pawns[BLUE] = [4];

var homes = [];
homes[RED] = 0; 
homes[YELLOW] = 0;
homes[GREEN] = 0;
homes[BLUE] = 0;

var size = 35;
var spaces = 17;
var square_size = size*spaces;
var mid = (spaces-1) / 2;
var pawn_radius = size*0.35;

var colorToMove = RED;
var pawnToMove = PAWN_ONE;

var NUM_PAWNS = 2; // SHOULD BE 4, CHANGE WHEN WE HAVE 4 PAWNS!
var NUM_OUTER_SQUARES = 64;
var PATH_ENDS = [25,41,57,9];
var OUTER_SQUARE = 1;
var INNER_SQUARE = 2;
var START_SQUARE = 3;
var OTHER_SQUARE = 4;

var start_positions = [];
start_positions[RED] = [NUM_PAWNS]; 
start_positions[RED][PAWN_ONE] = new Point(square_size-(3.5*size),(mid+2.75)*size);
start_positions[RED][PAWN_TWO] = new Point(square_size-(2.1*size),(mid+2.75)*size);
start_positions[YELLOW] = [NUM_PAWNS];
start_positions[YELLOW][PAWN_ONE] = new Point(2.0*size,(mid-3.25)*size);
start_positions[YELLOW][PAWN_TWO] = new Point(3.4*size,(mid-3.25)*size);
start_positions[GREEN] = [NUM_PAWNS]; 
start_positions[GREEN][PAWN_ONE] = new Point((mid-3.25)*size,square_size-(3.5*size));
start_positions[GREEN][PAWN_TWO] = new Point((mid-1.85)*size,square_size-(3.5*size));
start_positions[BLUE] = [NUM_PAWNS];
start_positions[BLUE][PAWN_ONE] = new Point((mid+2.75)*size,(2*size));
start_positions[BLUE][PAWN_TWO] = new Point((mid+4.15)*size,(2*size));

var home_positions = [];
home_positions[RED] = [NUM_PAWNS]; 
home_positions[YELLOW] = [NUM_PAWNS];
home_positions[GREEN] = [NUM_PAWNS];
home_positions[BLUE] = [NUM_PAWNS];

var GameState = {
	turnIndex : RED,		// Must be kept up to date
	myColorIndex : RED,
	movesLeft : 0,
	selectedPawn : null,
	gameOver : false,
	myTurn : function(){ return (this.turnIndex == this.myColorIndex); },
	pawns : []
};

function setUpBoard()
{
	CANVAS.init({ 
		canvasElement : 'boardCanvas',
		enableMouse : true
	});
	var boardLayer = CANVAS.layers.add( new Layer({
		id : 'boardLayer'
	}));
	var pawnLayer = CANVAS.layers.add( new Layer({
		id : 'pawnLayer'
	}));
//	var pawnLayer = boardLayer;

    var squares = [];
    var count = 0;
    
    // Draw the initial board
    // Squares are drawn in a clockwise fashion, starting with the
    // top square on the left side, and ending with the square just
    // below that
    
    // Top row
    for(var c = 0; c < spaces; c++)
    {
      squares[++count] = createSquare(c*size, 0, size, String(count), OUTER_SQUARE, COLORS[STEELBLUE]);
      boardLayer.add(squares[count]);
    }

    // Right column
    for(var c = 1; c < spaces-1; c++)
    {
      squares[++count] = createSquare(square_size-size, c*size, size, String(count), OUTER_SQUARE, COLORS[STEELBLUE]);
      boardLayer.add(squares[count]);
    }
    
    // Bottom row
    for(var c = spaces-1; c > -1; c--)
    {
      squares[++count] = createSquare(c*size, square_size-size, size, String(count), OUTER_SQUARE, COLORS[STEELBLUE]);
      boardLayer.add(squares[count]);
    }
    
    // Left column
    for(var c = spaces-2; c > 0; c--)
    {
      squares[++count] = createSquare(0, c*size, size, String(count), OUTER_SQUARE, COLORS[STEELBLUE]);
      boardLayer.add(squares[count]);
    }
    
    // Set up the paths each color will take (with the exception of
    // the start space, home paths, and home space - those will be
    // added when they are drawn)
    // Red
    rcount = 1;
    for(var i = 27; i < 64; i++)
    {
      paths[RED][rcount] = squares[i];
      rcount++;
    }
    
    for(var i = 0; i < 25; i++)
    {
    	paths[RED][rcount] = squares[i];
    	rcount++;
    }
    
    // Yellow
    ycount = 1;
    for(var i = 59; i < 64; i++)
    {
    	paths[YELLOW][ycount] = squares[i];
    	ycount++;
    }
    
    for(var i = 0; i < 57; i++)
    {
      paths[YELLOW][ycount] = squares[i];
      ycount++;
    }
    
    // Green
    gcount = 1;
    for(var i = 43; i < 64; i++)
    {
      paths[GREEN][gcount] = squares[i];
      gcount++;
    }
    
    for(var i = 0; i < 41; i++)
    {
      paths[GREEN][gcount] = squares[i];
      gcount++;
    }
    
    // Blue
    bcount = 1;
    for(var i = 11; i < 64; i++)
    {
      paths[BLUE][bcount] = squares[i];
      bcount++;
    }
    
    for(var i = 0; i < 9; i++)
    {
      paths[BLUE][bcount] = squares[i];
      bcount++;
    }
    
    // Draw the paths to the home area, start areas, and pawns
    // Red
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[RED][rcount] = createSquare(square_size-((c+1)*size), mid*size, size, 'red-path-'+c, INNER_SQUARE, COLORS[RED]);
      boardLayer.add(paths[RED][rcount]);
      rcount++;
    }
    
    // Red Start area
    paths[RED][0] = createSquare(square_size-(4.25*size),(mid+2)*size,size*3,'red-start', START_SQUARE, COLORS[RED]);
    boardLayer.add(paths[RED][0]);
    
    // Pawns
    pawns[RED][PAWN_ONE] = createPawn(start_positions[RED][PAWN_ONE].x,
    								start_positions[RED][PAWN_ONE].y,
    								pawn_radius,RED,PAWN_ONE);                
    pawns[RED][PAWN_TWO] = createPawn(start_positions[RED][PAWN_TWO].x,
									start_positions[RED][PAWN_TWO].y,
									pawn_radius,RED,PAWN_TWO);
    pawnLayer.add(pawns[RED][PAWN_ONE]);
    pawnLayer.add(pawns[RED][PAWN_TWO]);
    paths[RED][0].addPawn(pawns[RED][PAWN_ONE]);
    paths[RED][0].addPawn(pawns[RED][PAWN_TWO]);
    
    // Yellow
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[YELLOW][ycount] = createSquare(c*size, mid*size, size, 'yellow-path-'+c, INNER_SQUARE, COLORS[YELLOW]);
      boardLayer.add(paths[YELLOW][ycount]);
      ycount++;
    }
    
    // Start area
    paths[YELLOW][0] = createSquare(1.25*size,(mid-4)*size,size*3,'yellow-start', START_SQUARE, COLORS[YELLOW]);
    boardLayer.add(paths[YELLOW][0]);
    
    // Pawns
    pawns[YELLOW][PAWN_ONE] = createPawn(start_positions[YELLOW][PAWN_ONE].x,
										start_positions[YELLOW][PAWN_ONE].y,
										pawn_radius,YELLOW,PAWN_ONE);                  
	pawns[YELLOW][PAWN_TWO] = createPawn(start_positions[YELLOW][PAWN_TWO].x,
										start_positions[YELLOW][PAWN_TWO].y,
										pawn_radius,YELLOW,PAWN_TWO);
    pawnLayer.add(pawns[YELLOW][PAWN_ONE]);
    pawnLayer.add(pawns[YELLOW][PAWN_TWO]);
    paths[YELLOW][0].addPawn(pawns[YELLOW][PAWN_ONE]);
    paths[YELLOW][0].addPawn(pawns[YELLOW][PAWN_TWO]);
    
    // Green
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[GREEN][gcount] = createSquare(mid*size, square_size-((c+1)*size), size, 'green-path-'+c, INNER_SQUARE, COLORS[GREEN]);
      boardLayer.add(paths[GREEN][gcount]);
      gcount++;
    }
    
    // Green Start area
    paths[GREEN][0] = createSquare((mid-4)*size,square_size-(4.25*size),size*3,'green-start', START_SQUARE, COLORS[GREEN]);
    boardLayer.add(paths[GREEN][0]);
    
    // Pawns
    pawns[GREEN][PAWN_ONE] = createPawn(start_positions[GREEN][PAWN_ONE].x,
										start_positions[GREEN][PAWN_ONE].y,
										pawn_radius,GREEN,PAWN_ONE);
    pawns[GREEN][PAWN_TWO] = createPawn(start_positions[GREEN][PAWN_TWO].x,
										start_positions[GREEN][PAWN_TWO].y,
										pawn_radius,GREEN,PAWN_TWO);
    pawnLayer.add(pawns[GREEN][PAWN_ONE]);
    pawnLayer.add(pawns[GREEN][PAWN_TWO]);
    paths[GREEN][0].addPawn(pawns[GREEN][PAWN_ONE]);
    paths[GREEN][0].addPawn(pawns[GREEN][PAWN_TWO]);
    
    // Blue
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[BLUE][bcount] = createSquare(mid*size, c*size, size, 'blue-path-'+c, INNER_SQUARE, COLORS[BLUE]);
      boardLayer.add(paths[BLUE][bcount]);
      bcount++;
    }
    
    // Blue Start area
    paths[BLUE][0] = createSquare((mid+2)*size,(1.25*size),size*3,'blue-start', START_SQUARE, COLORS[BLUE]);
    boardLayer.add(paths[BLUE][0]);
	
    pawns[BLUE][PAWN_ONE] = createPawn(start_positions[BLUE][PAWN_ONE].x,
										start_positions[BLUE][PAWN_ONE].y,
										pawn_radius,BLUE,PAWN_ONE);    
    pawns[BLUE][PAWN_TWO] = createPawn(start_positions[BLUE][PAWN_TWO].x,
									start_positions[BLUE][PAWN_TWO].y,
									pawn_radius,BLUE,PAWN_TWO);
    pawnLayer.add(pawns[BLUE][PAWN_ONE]);
    pawnLayer.add(pawns[BLUE][PAWN_TWO]);
    paths[BLUE][0].addPawn(pawns[BLUE][PAWN_ONE]);
    paths[BLUE][0].addPawn(pawns[BLUE][PAWN_TWO]);
    
    // Draw the home area
    var homeArea = new CanvasItem({
		id : 'home',
		x : (mid*size)+(size/2),
		y : (mid*size)+(size/2),
		r : size*2.5,
		fillStyle : COLORS[SKYBLUE],
		strokeStyle : COLORS[BLACK],
		events : {
			onDraw : function( ctx ) {		
				ctx.beginPath();
				ctx.fillStyle = this.fillStyle;
				ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
				ctx.fill();
				ctx.stroke();
				
				ctx.fillStyle = COLORS[BLACK];
				var fontSize = 25 * size/30;
				ctx.font = fontSize+"pt Verdana";
				ctx.fillText("HOME",(mid-1.7)*size,(mid+0.9)*size);
			}
		}
    });
    pawnLayer.add(homeArea);
    
    paths[RED][rcount] = createSquare((mid*size)+(size/2),(mid*size)+(size/2),size*2.5,'red-home', OTHER_SQUARE, COLORS[RED]);
    paths[YELLOW][ycount] = createSquare((mid*size)-(size*2),(mid*size)-(size*2),size*2.5,'yellow-home', OTHER_SQUARE, COLORS[YELLOW]);
    paths[GREEN][gcount] = createSquare((mid*size)-(size*2),(mid*size)+(size/2),size*2.5,'green-home', OTHER_SQUARE, COLORS[GREEN]);
    paths[BLUE][bcount] = createSquare((mid*size)+(size/2),(mid*size)-(size*2),size*2.5,'blue-home', OTHER_SQUARE, COLORS[BLUE]);
    boardLayer.add(paths[RED][rcount]);
    boardLayer.add(paths[YELLOW][ycount]);
    boardLayer.add(paths[GREEN][gcount]);
    boardLayer.add(paths[BLUE][bcount]);

    home_positions[RED][PAWN_ONE] = new Point(paths[RED][rcount].x+(size/2),
    											paths[RED][rcount].y+(size/2));
    home_positions[RED][PAWN_TWO] = new Point(paths[RED][rcount].x+(size/2)+(size*1.2),
												paths[RED][rcount].y+(size/2));
    
    home_positions[YELLOW][PAWN_ONE] = new Point((mid*size),
    											(mid*size));
    home_positions[YELLOW][PAWN_TWO] = new Point((mid*size)-(size*1.2),
												(mid*size));
    
    home_positions[GREEN][PAWN_ONE] = new Point((mid*size),
    											paths[GREEN][gcount].y+(size/2));
    home_positions[GREEN][PAWN_TWO] = new Point((mid*size)-(size*1.2),
												paths[GREEN][gcount].y+(size/2));
    
    home_positions[BLUE][PAWN_ONE] = new Point(paths[BLUE][bcount].x+(size/2),
    											(mid*size));
    home_positions[BLUE][PAWN_TWO] = new Point(paths[BLUE][bcount].x+(size/2)+(size*1.2),
												(mid*size));

//    boardLayer.draw();
//    pawnLayer.draw();
        
    var myThread = CANVAS.addThread(new Thread({
        id : 'myThread',
        onExec : function(){
            CANVAS.clear().draw();
        }
    }));
    
//    console.log(myThread);
} // end setUpBoard()

function takeTurnWithDice(roll)
{
	if(!GameState.gameOver)
	{
		// Player's turn - TEMPORARY
		if(colorToMove == 0)
		{
//			var whichPawn = prompt("Which pawn would you like to move? 0 or 1? ", "(enter a 0 or a 1)");
			movePawn(colorToMove,0,roll);
		}
		else
			movePawn(colorToMove,pawnToMove,roll);
	
		if(colorToMove >= 3)
		{
			colorToMove = 0;	  
			pawnToMove = 1-pawnToMove;
		}
		else
			colorToMove++;
	}
	else
		$('diceButton').disabled = true;
} // end takeTurnWithDice(roll)

function movePawn(color, pawnIdx, amount)
{
	var currentIndex = pawns[color][pawnIdx].index;
	var newIndex = currentIndex + amount;
  
	if(newIndex < paths[color].length)
	{
		if(newIndex == paths[color].length-1)
			movePawnToHome(color, pawnIdx, currentIndex);
		else
			movePawnToSpace(color, pawnIdx, currentIndex, newIndex, -1, -1);
	}
}

function movePawnToStart(color, pawnIdx, currentIndex)
{
	alert("BULLY!");
	movePawnToSpace(color, pawnIdx, currentIndex, 0, 
					start_positions[color][pawnIdx].x, 
					start_positions[color][pawnIdx].y);
}

function movePawnToHome(color, pawnIdx, currentIndex)
{
	homes[color]++;

	movePawnToSpace(color, pawnIdx, currentIndex, paths[color].length-1, 
				home_positions[color][pawnIdx].x, home_positions[color][pawnIdx].y);
  
	checkForGameOver(color);
}

function checkForGameOver(color)
{
	if(homes[color] == NUM_PAWNS)
	{
		GameState.gameOver = true;
    
	    var msg;
	    switch(color)
	    {
	    	case RED:
	    		msg = "Red";
	    		break;
	    	case YELLOW:
	    		msg = "Yellow";
	    		break;
	    	case GREEN:
		        msg = "Green";
		        break;
		    case BLUE:
		        msg = "Blue";
		        break;
		    default:
		        msg = "Nobody";
		        break;
	    }
	    
	    msg += " wins!";
	    alert(msg);
	}
}

function movePawnToSpace(color, pawnIdx, sourceIndex, destIndex, newX, newY)
{
	// Wall rule
	// Giving too much trouble right now, will be added back in later
	/*for(var i = sourceIndex+1; i < destIndex; i++)
  	{
    	var nextSquare = paths[color][i];
    
    	if(nextSquare.isFilled())
      		destIndex = i-1;
  	}*/
  
	var destSquare = paths[color][destIndex];
	// Bully rule
	if(destIndex != 0 && destIndex != paths[color].length-1 && destSquare.numPawns() == 1)
	{
		var curPawn = destSquare.pawns[0];
		
		var curPawnColor = curP.cIndex;
		var curPawnIndex = 0;
		
		if(curPawnColor != color)
		{
			destSquare.removePawn(curPawn);
			movePawnToStart(curPawnColor, curPawnIndex, destIndex);
		}
		else
			destIndex = sourceIndex;
	}
  
	if(destIndex != sourceIndex)
	{
		var destSquare = paths[color][destIndex];
	  
		var sourceSquare = paths[color][sourceIndex];  
		sourceSquare.removePawn(pawns[color][pawnIdx]);
		sourceSquare.draw();
	      
		pawns[color][pawnIdx].x = (newX != -1) ? newX : destSquare.x+(size/2);
		pawns[color][pawnIdx].y = (newY != -1) ? newY : destSquare.y+(size/2);
		pawns[color][pawnIdx].index = destIndex;
		pawns[color][pawnIdx].draw();
	      
		destSquare.addPawn(pawns[color][pawnIdx]);
	  
		for(var i = 0; i < sourceSquare.numPawns(); i++)
			sourceSquare.pawns[i].draw();
	}
}