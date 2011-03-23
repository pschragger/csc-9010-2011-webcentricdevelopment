// Red will be 0, yellow will be 1, green 2, and blue 3.
// So the 50th square on the green path, for example, would be
// paths[2][49]
var RED = 0;
var YELLOW = 1;
var GREEN = 2;
var BLUE = 3;

var PIECE_ONE = 0;
var PIECE_TWO = 1;
var PIECE_THREE = 2;
var PIECE_FOUR = 3;

var paths = [4];
paths[RED] = [69];
paths[YELLOW] = [69];
paths[GREEN] = [69];
paths[BLUE] = [69];

var pieces = [4];
pieces[RED] = [4];
pieces[YELLOW] = [4];
pieces[GREEN] = [4];
pieces[BLUE] = [4];

var pieces_home = [4];
pieces_home[RED] = 0; 
pieces_home[YELLOW] = 0;
pieces_home[GREEN] = 0;
pieces_home[BLUE] = 0;

var size = 35;
var spaces = 17;
var square_size = size*spaces;
var mid = (spaces-1) / 2;
var pawn_size = size*0.35;

var colorToMove = RED;
var pieceToMove = PIECE_ONE;

var NUM_PAWNS = 2; // SHOULD BE 4, CHANGE WHEN WE HAVE 4 PAWNS!

var start_positions = [4];
start_positions[RED] = [NUM_PAWNS]; 
start_positions[RED][PIECE_ONE] = new Point(square_size-(3.5*size),(mid+2.75)*size);
start_positions[RED][PIECE_TWO] = new Point(square_size-(2.1*size),(mid+2.75)*size);
start_positions[YELLOW] = [NUM_PAWNS];
start_positions[YELLOW][PIECE_ONE] = new Point(2.0*size,(mid-3.25)*size);
start_positions[YELLOW][PIECE_TWO] = new Point(3.4*size,(mid-3.25)*size);
start_positions[GREEN] = [NUM_PAWNS]; 
start_positions[GREEN][PIECE_ONE] = new Point((mid-3.25)*size,square_size-(3.5*size));
start_positions[GREEN][PIECE_TWO] = new Point((mid-1.85)*size,square_size-(3.5*size));
start_positions[BLUE] = [NUM_PAWNS];
start_positions[BLUE][PIECE_ONE] = new Point((mid+2.75)*size,(2*size));
start_positions[BLUE][PIECE_TWO] = new Point((mid+4.15)*size,(2*size));

var home_positions = [4];
home_positions[RED] = [NUM_PAWNS]; 
home_positions[YELLOW] = [NUM_PAWNS];
home_positions[GREEN] = [NUM_PAWNS];
home_positions[BLUE] = [NUM_PAWNS];

var gameOver = false;

function setUpBoard()
{
	CANVAS.init({ canvasElement : 'canvas' });
	CANVAS.clear();
	var ctx = CANVAS.layers.add( new Layer({
		id : 'mainLayer'
	}));
	if (canvas.getContext) 
	{
	    gameOver = false;
	
	    var ctx = canvas.getContext("2d");
		
	    ctx.strokeStyle = "rgb(0,0,0)";
	
	    var squares = [64];
	    var count = 0;
	    
	    // Draw the initial board
	    // Squares are drawn in a clockwise fashion, starting with the
	    // top square on the left side, and ending with the square just
	    // below that
	    
	    // Top row
	    for(var c = 0; c < spaces; c++)
	    {
	      squares[count] = new Square(c*size, 0, size, "rgb(128,153,184)");
	      squares[count].draw();
	      count++;
	    }
	
	    // Right column
	    for(var c = 1; c < spaces-1; c++)
	    {
	      squares[count] = new Square(square_size-size, c*size, size, "rgb(128,153,184)");
	      squares[count].draw();
	      count++;
	    }
	    
	    // Bottom row
	    for(var c = spaces-1; c > -1; c--)
	    {
	      squares[count] = new Square(c*size, square_size-size, size, "rgb(128,153,184)");
	      squares[count].draw();
	      count++;
	    }
	    
	    // Left column
	    for(var c = spaces-2; c > 0; c--)
	    {
	      squares[count] = new Square(0, c*size, size, "rgb(128,153,184)");
	      squares[count].draw();
	      count++;
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
	    
	    // Draw the paths to the home area, start areas, and pieces
	    // Red
	    // Home path
	    for(var c = 1; c < mid-2; c++)
	    {
	      paths[RED][rcount] = new Square(square_size-((c+1)*size), mid*size, size, "rgb(255,0,0)");
	      paths[RED][rcount].draw();
	      rcount++;
	    }
	    
	    // Start area
	    paths[RED][0] = new Square(square_size-(4.25*size),(mid+2)*size,size*3,"rgb(255,0,0)");
	    paths[RED][0].draw();
	    
	    // Pieces
	    pieces[RED][PIECE_ONE] = new Pawn(start_positions[RED][PIECE_ONE].x,
	    								start_positions[RED][PIECE_ONE].y,
	    								pawn_size,"rgb(255,0,0)",0,PIECE_ONE);
	    pieces[RED][PIECE_ONE].draw();                   
	    pieces[RED][PIECE_TWO] = new Pawn(start_positions[RED][PIECE_TWO].x,
										start_positions[RED][PIECE_TWO].y,
										pawn_size,"rgb(255,0,0)",0,PIECE_TWO);
	    pieces[RED][PIECE_TWO].draw();
	    paths[RED][0].addPiece(pieces[RED][PIECE_ONE]);
	    paths[RED][0].addPiece(pieces[RED][PIECE_TWO]);
	    //alert(pieces[RED][PIECE_ONE].pieceNo);
	    //alert(pieces[RED][PIECE_TWO].pieceNo);
	    
	    // Yellow
	    // Home path
	    for(var c = 1; c < mid-2; c++)
	    {
	      paths[YELLOW][ycount] = new Square(c*size, mid*size, size, "rgb(255,255,0)");
	      paths[YELLOW][ycount].draw();
	      ycount++;
	    }
	    
	    // Start area
	    paths[YELLOW][0] = new Square(1.25*size,(mid-4)*size,size*3,"rgb(255,255,0)");
	    paths[YELLOW][0].draw();
	    
	    // Pieces
	    pieces[YELLOW][PIECE_ONE] = new Pawn(start_positions[YELLOW][PIECE_ONE].x,
											start_positions[YELLOW][PIECE_ONE].y,
											pawn_size,"rgb(255,255,0)",0,PIECE_ONE);
		pieces[YELLOW][PIECE_ONE].draw();                   
		pieces[YELLOW][PIECE_TWO] = new Pawn(start_positions[YELLOW][PIECE_TWO].x,
											start_positions[YELLOW][PIECE_TWO].y,
											pawn_size,"rgb(255,255,0)",0,PIECE_TWO);
		pieces[YELLOW][PIECE_TWO].draw();    
	    paths[YELLOW][0].addPiece(pieces[YELLOW][PIECE_ONE]);
	    paths[YELLOW][0].addPiece(pieces[YELLOW][PIECE_TWO]);
	    //alert(pieces[YELLOW][PIECE_ONE].pieceNo);
	    //alert(pieces[YELLOW][PIECE_TWO].pieceNo);
	    
	    // Green
	    // Home path
	    for(var c = 1; c < mid-2; c++)
	    {
	      paths[GREEN][gcount] = new Square(mid*size, square_size-((c+1)*size), size, "rgb(0,255,0)");
	      paths[GREEN][gcount].draw();
	      gcount++;
	    }
	    
	    // Start area
	    paths[GREEN][0] = new Square((mid-4)*size,square_size-(4.25*size),size*3,"rgb(0,255,0)");
	    paths[GREEN][0].draw();
	    
	    // Pieces
	    pieces[GREEN][PIECE_ONE] = new Pawn(start_positions[GREEN][PIECE_ONE].x,
											start_positions[GREEN][PIECE_ONE].y,
											pawn_size,"rgb(0,255,0)",0,PIECE_ONE);
	    pieces[GREEN][PIECE_ONE].draw();
	    pieces[GREEN][PIECE_TWO] = new Pawn(start_positions[GREEN][PIECE_TWO].x,
											start_positions[GREEN][PIECE_TWO].y,
											pawn_size,"rgb(0,255,0)",0,PIECE_TWO);
	    pieces[GREEN][PIECE_TWO].draw();
	    paths[GREEN][0].addPiece(pieces[GREEN][PIECE_ONE]);
	    paths[GREEN][0].addPiece(pieces[GREEN][PIECE_TWO]);
	    //alert(pieces[GREEN][PIECE_ONE].pieceNo);
	    //alert(pieces[GREEN][PIECE_TWO].pieceNo);
	    
	    // Blue
	    // Home path
	    for(var c = 1; c < mid-2; c++)
	    {
	      paths[BLUE][bcount] = new Square(mid*size, c*size, size, "rgb(0,0,255)");
	      paths[BLUE][bcount].draw();
	      bcount++;
	    }
	    
	    // Start area
	    paths[BLUE][0] = new Square((mid+2)*size,(1.25*size),size*3,"rgb(0,0,255)");
	    paths[BLUE][0].draw();
	    
	    // Pieces
	    pieces[BLUE][PIECE_ONE] = new Pawn(start_positions[BLUE][PIECE_ONE].x,
											start_positions[BLUE][PIECE_ONE].y,
											pawn_size,"rgb(0,0,255)",0,PIECE_ONE);
	    pieces[BLUE][PIECE_ONE].draw();
	    pieces[BLUE][PIECE_TWO] = new Pawn(start_positions[BLUE][PIECE_TWO].x,
										start_positions[BLUE][PIECE_TWO].y,
										pawn_size,"rgb(0,0,255)",0,PIECE_TWO);
	    pieces[BLUE][PIECE_TWO].draw();
	    paths[BLUE][0].addPiece(pieces[3][PIECE_ONE]);
	    paths[BLUE][0].addPiece(pieces[3][PIECE_TWO]);
	    //alert(pieces[BLUE][PIECE_ONE].pieceNo);
	    //alert(pieces[BLUE][PIECE_TWO].pieceNo);
	    
	    // Draw the home area
	    ctx.beginPath();
	    ctx.fillStyle = "rgb(83,184,212)";
	    ctx.arc((mid*size)+(size/2),(mid*size)+(size/2),size*2.5,0,Math.PI*2,true);
	    ctx.fill();
	    ctx.stroke();
	    
	    ctx.fillStyle = "rgb(0,0,0)";
	    var fontSize = 25 * size/30;
	    ctx.font = fontSize+"pt Verdana";
	    ctx.fillText("HOME",(mid-1.2)*size,(mid+0.9)*size);
	    
	    paths[RED][rcount] = new Square((mid*size)+(size/2),(mid*size)+(size/2),size*2.5, "rgb(255,0,0)");
	    paths[YELLOW][ycount] = new Square((mid*size)-(size*2),(mid*size)-(size*2),size*2.5, "rgb(255,255,0)");
	    paths[GREEN][gcount] = new Square((mid*size)-(size*2),(mid*size)+(size/2),size*2.5, "rgb(0,255,0)");
	    paths[BLUE][bcount] = new Square((mid*size)+(size/2),(mid*size)-(size*2),size*2.5, "rgb(0,0,255)");

	    home_positions[RED][PIECE_ONE] = new Point(paths[RED][rcount].x+(size/2),
	    											paths[RED][rcount].y+(size/2));
	    home_positions[RED][PIECE_TWO] = new Point(paths[RED][rcount].x+(size/2)+(size*1.2),
													paths[RED][rcount].y+(size/2));
	    
	    home_positions[YELLOW][PIECE_ONE] = new Point((mid*size),
	    											(mid*size));
	    home_positions[YELLOW][PIECE_TWO] = new Point((mid*size)-(size*1.2),
													(mid*size));
	    
	    home_positions[GREEN][PIECE_ONE] = new Point((mid*size),
	    											paths[GREEN][gcount].y+(size/2));
	    home_positions[GREEN][PIECE_TWO] = new Point((mid*size)-(size*1.2),
													paths[GREEN][gcount].y+(size/2));
	    
	    home_positions[BLUE][PIECE_ONE] = new Point(paths[BLUE][bcount].x+(size/2),
	    											(mid*size));
	    home_positions[BLUE][PIECE_TWO] = new Point(paths[BLUE][bcount].x+(size/2)+(size*1.2),
													(mid*size));
	} // end if
} // end setUpBoard()

function takeTurnWithDice(roll)
{
	// Player's turn - TEMPORARY
	if(colorToMove == 0)
	{
		var whichPiece = prompt("Which piece would you like to move? 0 or 1? ", "(enter a 0 or a 1)");
		movePiece(colorToMove,whichPiece,roll);
	}
	else
		movePiece(colorToMove,pieceToMove,roll);

	if(colorToMove >= 3)
	{
		colorToMove = 0;
  
		if(pieceToMove == 1)
			pieceToMove = 0;
		else
			pieceToMove = 1;
	}
	else
		colorToMove++;
	
	
} // end takeTurnWithDice(roll)

function movePiece(color, piece, amount)
{
	var currentIndex = pieces[color][piece].index;
	var newIndex = currentIndex + amount;
  
	if(newIndex < paths[color].length)
	{
		if(newIndex == paths[color].length-1)
			movePieceToHome(color, piece, currentIndex);
		else
			movePieceToSpace(color, piece, currentIndex, newIndex, -1, -1);
	}
}

function movePieceToStart(color, piece, currentIndex)
{
	//alert("BULLY!\nColor being moved is: " + color + "\nPiece being moved is: " + piece);
	alert("BULLY!");
	movePieceToSpace(color, piece, currentIndex, 0, 
					start_positions[color][piece].x, 
					start_positions[color][piece].y);
}

function movePieceToHome(color, piece, currentIndex)
{
	pieces_home[color]++;

	movePieceToSpace(color, piece, currentIndex, paths[color].length-1, 
				home_positions[color][piece].x, home_positions[color][piece].y);
  
	checkForGameOver(color);
}

function checkForGameOver(color)
{
	if(pieces_home[color] == NUM_PAWNS)
	{
		gameOver = true;
    
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

function movePieceToSpace(color, piece, sourceIndex, destIndex, newX, newY)
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
	if(destIndex != 0 && destIndex != paths[color].length-1 && destSquare.numPieces() == 1)
	{
		var currentPiece = destSquare.piecesInside[0];
		
		var currentPieceColor = currentPiece.colorIndex();
		var currentPieceIndex = currentPiece.getPieceNo();
		
		if(currentPieceColor != color)
		{
			destSquare.removePiece(currentPiece);
			//alert("Piece about to be moved: pieces[" + currentPieceColor + "][" + currentPieceIndex + "]");
			movePieceToStart(currentPieceColor, currentPieceIndex, destIndex);
		}
		else
			destIndex = sourceIndex;
	}
  
	if(destIndex != sourceIndex)
	{
		var destSquare = paths[color][destIndex];
	  
		var sourceSquare = paths[color][sourceIndex];  
		sourceSquare.removePiece(pieces[color][piece]);
		sourceSquare.draw();
	      
		pieces[color][piece].x = (newX != -1) ? newX : destSquare.x+(size/2);
		pieces[color][piece].y = (newY != -1) ? newY : destSquare.y+(size/2);
		pieces[color][piece].index = destIndex;
		pieces[color][piece].draw();
	      
		destSquare.addPiece(pieces[color][piece]);
	  
		for(var i = 0; i < sourceSquare.numPieces(); i++)
			sourceSquare.piecesInside[i].draw();
	}
}