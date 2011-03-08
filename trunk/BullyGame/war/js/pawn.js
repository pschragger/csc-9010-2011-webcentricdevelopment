function Pawn(x, y, radius, color, index, ctx)
{
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.index = index;
	this.ctx = ctx;
	this.draw = 
		function()
		{
			this.ctx.fillStyle = this.color;
			this.ctx.strokeStyle = "rgb(0,0,0)";
			this.ctx.beginPath();
			this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
			this.ctx.fill();
			this.ctx.stroke();
		}
}