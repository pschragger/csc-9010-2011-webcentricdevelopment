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
		selected : false,
		location: null, 				// square element
		interactive : true,
		events : {
			onDraw : function( ctx ) {
			  ctx.strokeStyle = this.strokeStyle;
		      ctx.fillStyle = this.fillStyle;
		      ctx.beginPath();
		      ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		      ctx.fill();
		      ctx.stroke();
//		      ctx.strokeRect(this.x-this.r,this.y-this.r,(this.r*2),(this.r*2));
		      this.setDims(this.x-this.r,this.y-this.r,(this.r*2),(this.r*2));
			},
			onMouseover : function(e){ 				
//				this.strokeStyle=COLORS[BLUE];
			},
			onMouseout : function(){ 
//				this.fillStyle=COLORS[this.cIndex]; 
			},
			onClick : function() {
				if (GameState.turnIndex==this.cIndex && GameState.movesLeft > 0){
					this.select();
				}
			}			
		},
		setLocation : function(square) {
			if (this.location)
				this.location.removePawn(this);
			this.location = square;
		},
		select : function() {
			if (this.selected) {
				this.deselect();
			} else {
				if (GameState.selectedPawn)
					GameState.selectedPawn.deselect();
				GameState.selectedPawn = this;
				this.selected = true;
				this.strokeStyle = (this.cIndex==YELLOW) ? COLORS[RED] : COLORS[YELLOW];
			}
		},
		deselect : function() {
			this.strokeStyle = COLORS[BLACK];
			this.selected = false;
			GameState.selectedPawn = null;
		},
		moveTo: function(square) {
			var dist = square.distFromSelection();
			GameState.movesLeft -= dist;
			//TODO: update movesLeft display div
			// animation
			new Cmorph(this,{
				link : 'chain',
                duration : 'normal',
                transition : 'sine:in:out'
			}).morph({
                x : square.x+square.w/2,
                y : square.y+square.h/2,
			});
			//update location
			this.setLocation(square);
		}
	});
	GameState.pawns[pawn.id] = pawn;
	return pawn;
}