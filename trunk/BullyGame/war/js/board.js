// Red will be 0, yellow will be 1, green 2, and blue 3.
// So the 50th square on the green path, for example, would be
// paths[2][49]
var paths = [4];
paths[0] = [69];
paths[1] = [69];
paths[2] = [69];
paths[3] = [69];

var pieces = [4];
pieces[0] = [4];
pieces[1] = [4];
pieces[2] = [4];
pieces[3] = [4];

var size = 30;
var spaces = 17;
var square_size = size*spaces;
var mid = (spaces-1) / 2;

var pieceToMove = 0;

var gameOver = false;

function setUpBoard()
{
	CANVAS.init({ canvasElement : 'canvas' });
	CANVAS.clear();
	var ctx = CANVAS.layers.add( new Layer({
		id : 'mainLayer'
	}));
	if (canvas.getContext) {
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
      paths[0][rcount] = squares[i];
      rcount++;
    }
    
    for(var i = 0; i < 25; i++)
    {
      paths[0][rcount] = squares[i];
      rcount++;
    }
    
    // Yellow
    ycount = 1;
    for(var i = 59; i < 64; i++)
    {
      paths[1][ycount] = squares[i];
      ycount++;
    }
    
    for(var i = 0; i < 57; i++)
    {
      paths[1][ycount] = squares[i];
      ycount++;
    }
    
    // Green
    gcount = 1;
    for(var i = 43; i < 64; i++)
    {
      paths[2][gcount] = squares[i];
      gcount++;
    }
    
    for(var i = 0; i < 41; i++)
    {
      paths[2][gcount] = squares[i];
      gcount++;
    }
    
    // Blue
    bcount = 1;
    for(var i = 11; i < 64; i++)
    {
      paths[3][bcount] = squares[i];
      bcount++;
    }
    
    for(var i = 0; i < 9; i++)
    {
      paths[3][bcount] = squares[i];
      bcount++;
    }
    
    // Draw the paths to the home area, start areas, and pieces
    // Red
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[0][rcount] = new Square(square_size-((c+1)*size), mid*size, size, "rgb(255,0,0)");
      paths[0][rcount].draw();
      rcount++;
    }
    
    // Start area
    paths[0][0] = new Square(square_size-(4.25*size),(mid+2)*size,size*3,"rgb(255,0,0)");
    paths[0][0].draw();
    
    // Pieces
    pieces[0][0] = new Pawn(square_size-(3.5*size),(mid+2.75)*size,size*0.45,"rgb(255,0,0)",0);
    pieces[0][0].draw();
    paths[0][0].piecesInside[0] = pieces[0][0];
    
    // Yellow
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[1][ycount] = new Square(c*size, mid*size, size, "rgb(255,255,0)");
      paths[1][ycount].draw();
      ycount++;
    }
    
    // Start area
    paths[1][0] = new Square(1.25*size,(mid-4)*size,size*3,"rgb(255,255,0)");
    paths[1][0].draw();
    
    // Pieces
    pieces[1][0] = new Pawn(2.0*size,(mid-3.25)*size,size*0.45,"rgb(255,255,0)",0);
    pieces[1][0].draw();
    paths[1][0].piecesInside[0] = pieces[1][0];
    
    // Green
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[2][gcount] = new Square(mid*size, square_size-((c+1)*size), size, "rgb(0,255,0)");
      paths[2][gcount].draw();
      gcount++;
    }
    
    // Start area
    paths[2][0] = new Square((mid-4)*size,square_size-(4.25*size),size*3,"rgb(0,255,0)");
    paths[2][0].draw();
    
    // Pieces
    pieces[2][0] = new Pawn((mid-3.25)*size,square_size-(3.5*size),size*0.45,"rgb(0,255,0)",0);
    pieces[2][0].draw();
    paths[2][0].piecesInside[0] = pieces[2][0];
    
    // Blue
    // Home path
    for(var c = 1; c < mid-2; c++)
    {
      paths[3][bcount] = new Square(mid*size, c*size, size, "rgb(0,0,255)");
      paths[3][bcount].draw();
      bcount++;
    }
    
    // Start area
    paths[3][0] = new Square((mid+2)*size,(1.25*size),size*3,"rgb(0,0,255)");
    paths[3][0].draw();
    
    // Pieces
    pieces[3][0] = new Pawn((mid+2.75)*size,(2*size),size*0.45,"rgb(0,0,255)",0);
    pieces[3][0].draw();
    paths[3][0].piecesInside[0] = pieces[3][0];
    
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
    
    paths[0][rcount] = new Square((mid*size)+(size/2),(mid*size)+(size/2),size*2.5, "rgb(255,0,0)");
    paths[1][ycount] = new Square((mid*size)-(size*2),(mid*size)-(size*2),size*2.5, "rgb(255,255,0)");
    paths[2][gcount] = new Square((mid*size)-(size*2),(mid*size)+(size/2),size*2.5, "rgb(0,255,0)");
    paths[3][bcount] = new Square((mid*size)+(size/2),(mid*size)-(size*2),size*2.5, "rgb(0,0,255)");
  } // end if
} // end setUpBoard()

function onClick()
{
  if(!gameOver)
  {
    // This will be where the dice app is called
    var roll = Math.floor(Math.random() * (6 - 1 + 1) + 1);

    // Random
    //movePiece(pieceToMove,0,roll);
    
    // Deterministic
    movePiece(pieceToMove,0,pieceToMove+1);
    
    if(pieceToMove >= 3)
      pieceToMove = 0;
    else
      pieceToMove++;
  }
}

function movePiece(color, piece, amount)
{
  var currentIndex = pieces[color][piece].index;
  var newIndex = currentIndex + amount;
  
  if(newIndex < paths[color].length)
  {
    if(newIndex == paths[color].length-1)
      movePieceToHome(color, piece, currentIndex);
    else
      movePieceToSpace(color, piece, currentIndex, newIndex, -1, -1)
  }
}

function movePieceToStart(color, piece, currentIndex)
{
  var newX;
  var newY;
  
  switch(color)
  {
    case 0: // red
      newX = square_size-(3.5*size);
      newY = (mid+2.75)*size;
      break;
    case 1: // yellow
      newX = 2.0*size;
      newY = (mid-3.25)*size;
      break;
    case 2: // green
      newX = (mid-3.25)*size;
      newY = square_size-(3.5*size);
      break;
    case 3: // blue
      newX = (mid+2.75)*size;
      newY = (2*size);
      break;
    default:
      newX = -1;
      newY = -1;
      break;
  }
  
  movePieceToSpace(color, piece, currentIndex, 0, newX, newY);
}

function movePieceToHome(color, piece, currentIndex)
{
  switch(color)
  {
    case 0: // red
      newX = -1;
      newY = -1;
      break;
    case 1: // yellow
      newX = (mid*size);
      newY = (mid*size);
      break;
    case 2: // green
      newX = (mid*size);
      newY = -1;
      break;
    case 3: // blue
      newX = -1;
      newY = (mid*size);
      break;
    default:
      newX = -1;
      newY = -1;
      break;
  }

  movePieceToSpace(color, piece, currentIndex, paths[color].length-1, newX, newY);
  
  gameOver = true;
  
  var msg;
  switch(color)
  {
    case 0:
      msg = "Red";
      break;
    case 1:
      msg = "Yellow";
      break;
    case 2:
      msg = "Green";
      break;
    case 3:
      msg = "Blue";
      break;
    default:
      msg = "Nobody";
      break;
  }
  
  msg += " wins!";
  alert(msg);
}

function movePieceToSpace(color, piece, sourceIndex, destIndex, newX, newY)
{
  // Wall rule
  for(var i = sourceIndex+1; i < destIndex; i++)
  {
    var nextSquare = paths[color][i];
    
    if(nextSquare.isFilled())
      destIndex = i-1;
  }
  
  var destSquare = paths[color][destIndex];  
  
  // Bully rule
  if(destIndex != 0 && destIndex != paths[color].length-1 && destSquare.isFilled())
  {
    var currentPiece = destSquare.piecesInside[0];
    var currentPieceColor = currentPiece.colorIndex();
    
    if(currentPiece.colorIndex() != color)
      movePieceToStart(currentPiece.colorIndex(), 0, sourceIndex);
  }
  
  var sourceSquare = paths[color][sourceIndex];  
  sourceSquare.piecesInside[0] = null;
  sourceSquare.draw();
      
  pieces[color][piece].x = (newX != -1) ? newX : destSquare.x+(size/2);
  pieces[color][piece].y = (newY != -1) ? newY : destSquare.y+(size/2);
  pieces[color][piece].index = destIndex;
  pieces[color][piece].draw();
      
  destSquare.piecesInside[0] = pieces[color][piece];
}