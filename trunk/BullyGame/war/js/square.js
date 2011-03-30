function createSquare(x, y, size, color)
{
	var square = new CanvasItem({
		id : 'qwe',
//		val: nVal,
		x : x,
		y : y,
		w : size,
		h : size,
		color : color,
		fillStyle : color,
		strokeStyle : 'rgba(0,0,0,1)',		// black
		pawns: [],
		events : {
			onDraw : function( ctx ) {
				ctx.save();
//				ctx.translate(this.x,this.y);
//				ctx.rotate(this.t);				
								
				ctx.fillStyle = this.fillStyle;								
			    ctx.strokeStyle = this.strokeStyle;
			    ctx.fillRect(this.x, this.y, this.w, this.h);
			    ctx.strokeRect(this.x, this.y, this.w, this.h);					
				this.setDims(this.x,this.y,this.w,this.h);

				ctx.restore();
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
		numPawns : function() { return this.pawns.length; },
		isFilled : function() { return (this.pawns.length > 0); },
		addPawn : function(newPawn) { return this.pawns.push(newPawn); },
		removePawn : function(pawn) {
			var pawnIndex = this.pawns.indexOf(pawn);
			if (pawnIndex == -1)
				return null;
			return this.pawns.splice(pawnIndex,1);      
	    },
		toString : function() {
			return "Square at (" + this.x + "," + this.y +"), w = " + this.w + ", color = " + this.h;
		}
	});
    
	return square;
}