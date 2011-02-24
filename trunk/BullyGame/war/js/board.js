function draw() 
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
          
          // An array of booleans to indicate if a square is filled
          var squares = [64];
          var count = 0; 
           
          // Draw the initial board
            ctx.fillStyle = "rgb(128,153,184)";
            
            // Left column
            for(var c = 1; c < spaces-1; c++) 
            {
              ctx.fillRect (0, c*size, size, size);
              ctx.strokeRect(0, c*size, size, size);
              squares[count] = false;
              count++;             
            }
            
            // Bottom row
            for(var c = 0; c < spaces; c++) 
            {
              ctx.fillRect (c*size, square_size-size, size, size);
              ctx.strokeRect(c*size, square_size-size, size, size);
              squares[count] = false;
              count++;             
            }
            
            // Right column
            for(var c = 1; c < spaces-1; c++) 
            {
              ctx.fillRect (square_size-size, c*size, size, size);
              ctx.strokeRect(square_size-size, c*size, size, size);
              squares[count] = false;
              count++;             
            }
            
            // Top row
            for(var c = 0; c < spaces; c++) 
            {
              ctx.fillRect (c*size, 0, size, size);
              ctx.strokeRect(c*size, 0, size, size);
              squares[count] = false;
              count++;             
            }
          
          // Draw the paths to the home area and start areas
            // Blue      
              // Home path
              ctx.fillStyle = "rgb(0,0,255)";
              for(var c = 1; c < mid; c++)
              {
                ctx.fillRect(mid*size, c*size, size, size);
                ctx.strokeRect(mid*size, c*size, size, size);
              }
            
              // Start area
              ctx.fillRect((mid+2)*size,(1.25*size),size*3,size*3);
              ctx.strokeRect((mid+2)*size,(1.25*size),size*3,size*3);
            
            // Yellow
              // Home path
              ctx.fillStyle = "rgb(255,255,0)";
              for(var c = 1; c < mid; c++)
              {
                ctx.fillRect(c*size, mid*size, size, size);
                ctx.strokeRect(c*size, mid*size, size, size);
              }
            
              // Start area
              ctx.fillRect(1.25*size,(mid-4)*size,size*3,size*3);
              ctx.strokeRect(1.25*size,(mid-4)*size,size*3,size*3);
            
            // Green
              // Home path
              ctx.fillStyle = "rgb(0,255,0)";
              for(var c = 1; c < mid; c++)
              {
                ctx.fillRect(mid*size, square_size-((c+1)*size), size, size);
                ctx.strokeRect(mid*size, square_size-((c+1)*size), size, size);
              }
            
              // Start area
              ctx.fillRect((mid-4)*size,square_size-(4.25*size),size*3,size*3);
              ctx.strokeRect((mid-4)*size,square_size-(4.25*size),size*3,size*3);
            
            // Red
              // Home path
              ctx.fillStyle = "rgb(255,0,0)";
              for(var c = 1; c < mid; c++)
              {
                ctx.fillRect(square_size-((c+1)*size), mid*size, size, size);
                ctx.strokeRect(square_size-((c+1)*size), mid*size, size, size);
              }
            
              // Start area
              ctx.fillRect(square_size-(4.25*size),(mid+2)*size,size*3,size*3);
              ctx.strokeRect(square_size-(4.25*size),(mid+2)*size,size*3,size*3);
          
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
      
      function movePiece()
      {
        alert("We're gonna place a piece!");
      }