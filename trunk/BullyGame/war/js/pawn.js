function createPawn(x, y, radius, color, index)
{
	var pawn = new CanvasItem({
		id : 'pawn',
		x : x,
		y : y,
		r : radius,
		h : size,
		color : color,
		index : index.
		fillStyle : color,
		strokeStyle : 'rgba(0,0,0,1)',		// black
		pawns: [],
		events : {
			onDraw : function( ctx ) {
			  ctx.fillStyle = this.strokeStyle;
		      ctx.fillStyle = this.fillStyle;
		      ctx.beginPath();
		      ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
		      ctx.fill();
		      ctx.stroke();
			},
			mouseover : function(x,y){
//				this.strokeStyle = 'rgba(0,0,0,1)';				
			},
			mouseout : function(x,y){
//				this.strokeStyle = 'rgba(0,0,0,0.5)';
			},
			click : function(x,y) {
//				alert("This die has a value of " + this.val + ".");
			}
		},
		colorIndex : function() {
			return colors.indexOf(this.color);
		}
	});
	return pawn;
}