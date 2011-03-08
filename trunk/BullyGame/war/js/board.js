function setUpBoard() 
{
	var canvas = document.getElementById("canvas");
    if (canvas.getContext) 
    {
    	var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "rgb(0,0,0)";
            
        var size = 30;
        var spaces = 17;
        var square_size = size*spaces;
        var mid = (spaces-1) / 2;
          
		var squares = [64];
		  
		// Red will be 0, yellow will be 1, green 2, and blue 3.
		// So the 50th square on the green path, for example, would be
		// paths[2][49]
		var paths = [4];
		paths[0] = [67];
		paths[1] = [67];
		paths[2] = [67];
		paths[3] = [67];
        var count = 0; 
           
        // Draw the initial board
		// Squares are drawn in a clockwise fashion, starting with the
		// top square on the left side, and ending with the square just
		// below that
          ctx.fillStyle = "rgb(128,153,184)";
		  
          // Top row
          for(var c = 0; c < spaces; c++) 
          {
            ctx.fillRect (c*size, 0, size, size);
            ctx.strokeRect(c*size, 0, size, size);
            squares[count] = new Square(c*size, 0, size, "rgb(128,153,184)");
            count++;
          }
            
          // Right column
          for(var c = 1; c < spaces-1; c++) 
          {
            ctx.fillRect (square_size-size, c*size, size, size);
            ctx.strokeRect(square_size-size, c*size, size, size);
            squares[count] = new Square(square_size-size, c*size, size, "rgb(128,153,184)");
            count++;    
          }
            
          // Bottom row
          for(var c = spaces-1; c > -1; c--) 
          {
            ctx.fillRect (c*size, square_size-size, size, size);
            ctx.strokeRect(c*size, square_size-size, size, size);
            squares[count] = new Square(c*size, square_size-size, size, "rgb(128,153,184)");
            count++;       
          }
            
          // Left column
          for(var c = spaces-2; c > 0; c--) 
          {
          	ctx.fillRect (0, c*size, size, size);
            ctx.strokeRect(0, c*size, size, size);
            squares[count] = new Square(0, c*size, size, "rgb(128,153,184)");
            count++;          
		  }
          
		// Set up the paths each color will take (with the exception of
	    // the home paths - those will be added when they are drawn)
		// Red
		  rcount = 0;
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
		  ycount = 0;
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
		  gcount = 0;
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
		  bcount = 0;
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
		  
        // Draw the paths to the home area and start areas
          // Red
            // Home path
            ctx.fillStyle = "rgb(255,0,0)";
            for(var c = 1; c < mid-2; c++)
            {
              ctx.fillRect(square_size-((c+1)*size), mid*size, size, size);
              ctx.strokeRect(square_size-((c+1)*size), mid*size, size, size);
			  
			  paths[0][rcount] = new Square(square_size-((c+1)*size), mid*size, size, "rgb(128,153,184)");
			  rcount++;
            }
            
            // Start area
            ctx.fillRect(square_size-(4.25*size),(mid+2)*size,size*3,size*3);
            ctx.strokeRect(square_size-(4.25*size),(mid+2)*size,size*3,size*3);
			
          // Yellow
            // Home path
            ctx.fillStyle = "rgb(255,255,0)";
            for(var c = 1; c < mid-2; c++)
            {
              ctx.fillRect(c*size, mid*size, size, size);
              ctx.strokeRect(c*size, mid*size, size, size);
			  
			  paths[1][ycount] = new Square(c*size, mid*size, size, "rgb(255,255,0)");
			  ycount++;
            }
            
            // Start area
            ctx.fillRect(1.25*size,(mid-4)*size,size*3,size*3);
            ctx.strokeRect(1.25*size,(mid-4)*size,size*3,size*3);
            
          // Green
            // Home path
            ctx.fillStyle = "rgb(0,255,0)";
            for(var c = 1; c < mid-2; c++)
            {
              ctx.fillRect(mid*size, square_size-((c+1)*size), size, size);
              ctx.strokeRect(mid*size, square_size-((c+1)*size), size, size);
			  
			  paths[2][gcount] = new Square(mid*size, square_size-((c+1)*size), size, "rgb(0,255,0)");
			  gcount++;
            }
            
            // Start area
            ctx.fillRect((mid-4)*size,square_size-(4.25*size),size*3,size*3);
            ctx.strokeRect((mid-4)*size,square_size-(4.25*size),size*3,size*3);
			
          // Blue      
            // Home path
            ctx.fillStyle = "rgb(0,0,255)";
            for(var c = 1; c < mid-2; c++)
            {
              ctx.fillRect(mid*size, c*size, size, size);
              ctx.strokeRect(mid*size, c*size, size, size);
			  
			  paths[3][bcount] = new Square(mid*size, c*size, size, "rgb(0,0,255)");
			  bcount++;
            }
            
            // Start area
            ctx.fillRect((mid+2)*size,(1.25*size),size*3,size*3);
            ctx.strokeRect((mid+2)*size,(1.25*size),size*3,size*3);
		  
        // Draw the home area  
          ctx.fillStyle = "rgb(83,184,212)";
          ctx.arc((mid*size)+(size/2),(mid*size)+(size/2),size*2.5,0,Math.PI*2,true);
          ctx.fill();
          ctx.stroke();
            
          ctx.fillStyle = "rgb(0,0,0)";
          ctx.font = "25pt Verdana";
          ctx.fillText("HOME",(mid-1.2)*size,(mid+0.9)*size);  
	} // end if
} // end draw()
      
function onClick()
{
	alert("We're gonna place a piece!");
}