function Square(x, y, size, color)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
  
  this.piecesInside = [4];
  this.piecesInside[0] = null;
  this.piecesInside[1] = null;
  this.piecesInside[2] = null;
  this.piecesInside[3] = null;
  
  this.numPieces =
    function()
    {
	    var count = 0;
      for(var i = 0; i < this.piecesInside.length; i++)
      {
		    var slot = this.piecesInside[i];
        if(slot != null)
		      count++;
      }
      return count;
    }
  
  this.isFilled = 
    function()
    {
      return (this.numPieces() > 0);
    }
  
  this.draw = 
    function()
    {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) 
      {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeRect(this.x, this.y, this.size, this.size);
      }
    }
  
  this.toString =
    function()
    {
      return "Square at (" + this.x + "," + this.y +"), size = " + this.size + ", color = " + this.color;
    }
}