function Square(x, y, size, color, ctx)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
	this.ctx = ctx;
  
	this.piecesInside = [4];
	this.isFilled =
		function()
		{
			for(var i = 0; i < this.piecesInside.length; i++)
			{
				alert("piecesInside["+i+"] = " + this.piecesInside[i]);
				if(this.piecesInside[i] != null)
					return true;
			}
			return false;
		}
    
	this.draw = 
		function()
		{
			this.ctx.fillStyle = this.color;
			this.ctx.strokeStyle = "rgb(0,0,0)";
			this.ctx.fillRect(this.x, this.y, this.size, this.size);
			this.ctx.strokeRect(this.x, this.y, this.size, this.size);
		}
  
	this.toString =
		function()
		{
			return "Square at (" + this.x + "," + this.y +"), size = " + this.size + ", color = " + this.color;
		}
}