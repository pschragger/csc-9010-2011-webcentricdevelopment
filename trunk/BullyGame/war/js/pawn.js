function Pawn(x, y, radius, color, index)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.index = index;
	this.draw = 
		function()
		{
			var canvas = document.getElementById("canvas");
			if (canvas.getContext) 
			{
				var ctx = canvas.getContext("2d");
				ctx.strokeStyle = "rgb(0,0,0)";
				ctx.fillStyle = this.color;
				ctx.beginPath();
				ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
				ctx.fill();
				ctx.stroke();
			}
		}
}