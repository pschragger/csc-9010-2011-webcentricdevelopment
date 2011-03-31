function createPawn(x, y, radius, cIndex, pIndex)
{
	var pawn = new CanvasItem({
		id : 'p-'+cIndex+'-'+pIndex,
		x : x,
		y : y,
		r : radius,
		cIndex : cIndex,				// Color Index
		pIndex : pIndex,				// Pawn Index
		fillStyle : COLORS[cIndex],
		strokeStyle : COLORS[BLACK],
		location: null, 				// square element
		events : {
			onDraw : function( ctx ) {
			  ctx.strokeStyle = this.strokeStyle;
		      ctx.fillStyle = this.fillStyle;
		      ctx.beginPath();
		      ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		      ctx.fill();
		      ctx.stroke();
			},
			onMouseover : function(){ this.fillStyle=COLORS[BLUE]; },
			onMouseout : function(){ this.fillStyle=COLORS[this.cIndex]; },
			onClick : function() {
					alert(this.id + "clicked!");
				if (GameState.myTurn() && this.cIndex == GameState.turnIndex) {
					this.select();
					//this.draw( $('boardCanvas').getContext("2d") );
				}
			}			
		},
		setLocation : function(square) {
			if (this.location)
				this.location.removePawn(this);
			this.location = square;
		},
		select : function() {
			if (GameState.selectedPawn)
				GameState.selectedPawn.deSelect();
			this.strokeStyle = (this.cIndex == YELLOW) ? COLORS[BLUE] : COLORS[YELLOW];
				console.log("selecting " + this.cIndex+"-"+this.pIndex);
			//this.draw( );
		},
		deSelect : function() {
			this.strokeStyle = COLORS[BLACK];
		}
	});
	GameState.pawns[pawn.id] = pawn;
	return pawn;
}