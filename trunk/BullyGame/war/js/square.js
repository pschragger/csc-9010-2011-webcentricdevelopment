function createSquare(x, y, size, id, color)
{
	var square = new CanvasItem({
		id : id,
//		val: nVal,
		x : x,
		y : y,
		w : size,
		h : size,
		color : color,
		fillStyle : color,
		strokeStyle : COLORS[BLACK],
		pawns: [],
		events : {
			onDraw : function( ctx ) {
				ctx.fillStyle = this.fillStyle;								
			    ctx.strokeStyle = this.strokeStyle;
			    ctx.fillRect(this.x, this.y, this.w, this.h);
			    ctx.strokeRect(this.x, this.y, this.w, this.h);					
				this.setDims(this.x,this.y,this.w,this.h);
			},
			onMouseover : function(){ this.fillStyle=COLORS[GREEN]; },
			onMouseout : function(){ this.fillStyle=COLORS[STEELBlUE]; },
			onClick : function() {
//				alert("This die has a value of " + this.val + ".");
			}
		},
		numPawns : function() { return this.pawns.length; },
		isFilled : function() { return (this.pawns.length > 0); },
		addPawn : function(newPawn) {
			newPawn.setLocation(this);
			return this.pawns.push(newPawn);
		},
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