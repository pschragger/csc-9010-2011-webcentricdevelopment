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
var amountToMove = 2;
          
function setUpBoard() 
{  
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) 
    {
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
          ctx.font = "25pt Verdana";
          ctx.fillText("HOME",(mid-1.2)*size,(mid+0.9)*size); 
          
          paths[0][rcount] = new Square((mid*size)+(size/2),(mid*size)+(size/2),size*2.5, "rgb(255,0,0)");
          paths[1][ycount] = new Square((mid*size)-(size*2),(mid*size)-(size*2),size*2.5, "rgb(255,255,0)");
          paths[2][gcount] = new Square((mid*size)-(size*2),(mid*size)+(size/2),size*2.5, "rgb(0,255,0)");
          paths[3][bcount] = new Square((mid*size)+(size/2),(mid*size)-(size*2),size*2.5, "rgb(0,0,255)");
	} // end if
} // end draw()
      
function onClick()
{
	movePiece(pieceToMove,0,amountToMove);
	//drawPath(pieceToMove);
  
	if(pieceToMove >= 3)
		pieceToMove = 0;
	else
		pieceToMove++;
}

function movePiece(color, piece, amount)
{
	var currentIndex = pieces[color][piece].index;
	var currentSquare = paths[color][currentIndex];
	var newIndex = currentIndex + amount; 
  
	if(newIndex < paths[color].length)
	{
		currentSquare.piecesInside[0] = null;
		currentSquare.draw();
		var newSquare = paths[color][newIndex];
    
		pieces[color][piece].x = newSquare.x+(size/2);
		pieces[color][piece].y = newSquare.y+(size/2);
		pieces[color][piece].index = newIndex;
		pieces[color][piece].draw();
    
		newSquare.piecesInside[0] = pieces[color][piece];
	}
}

// DEBUGGING
function drawPath(color)
{
	for(var i = 0; i < paths[color].length;i++)
	{
		var square = paths[color][i];
    
		if(color == 0)
			square.color = "rgb(255,0,0)";
		else if(color == 1)
			square.color = "rgb(255,255,0)";
		else if(color == 2)
			square.color = "rgb(0,255,0)";
		else
			square.color = "rgb(0,0,255)";
      
		square.draw();
		alert(i); 
	}
}