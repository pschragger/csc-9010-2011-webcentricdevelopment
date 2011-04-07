// Ensure mod returns a positive value
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}

function createSquare(x, y, size, id, type, color)
{
	var square = new CanvasItem({
		id : id,
		x : x,
		y : y,
		w : size,
		h : size,
		type : type,
		color : color,
		fillStyle : color,
		strokeStyle : COLORS[BLACK],	
		pawns: [],
		interactive : true,
		events : {
			onDraw : function( ctx ) {				
				//console.log(this.id+","this.fillstyle+","+this.color);
				ctx.fillStyle = this.fillStyle;								
			    ctx.strokeStyle = this.strokeStyle;
			    ctx.fillRect(this.x, this.y, this.w, this.h);
			    ctx.strokeRect(this.x, this.y, this.w, this.h);					
				this.setDims(this.x,this.y,this.w,this.h);
			},
			onMouseover : function(){ 
				var dist = this.distFromSelection();
					if (dist) console.log(this.id+": dist="+dist);
				if (dist && dist <= GameState.movesLeft) {
					// TODO: update action display div
					this.strokeStyle = COLORS[YELLOW];
				}
			},
			onMouseout : function(){
				this.strokeStyle=COLORS[BLACK]; 
			},
			onClick : function() {
				var dist = this.distFromSelection();
				if (dist && dist <= GameState.movesLeft) {
					GameState.selectedPawn.moveTo(this);
					GameState.selectedPawn.deselect();
					// TODO: update movesLeft display div
				}
			}
		},
		// Returns distance from selected pawn to this, null if unreachable 
		distFromSelection : function () {
			if (!GameState.selectedPawn || !(this.type==OUTER_SQUARE || this.type==INNER_SQUARE)) 
				return null;			
			var begin = GameState.selectedPawn.location.getValue();
			if (this.type==INNER_SQUARE) {
				if (this.color != COLORS[GameState.selectedPawn.cIndex])
					return null;
				return ( this.getValue()+(PATH_ENDS[GameState.selectedPawn.cIndex]-begin).mod(NUM_OUTER_SQUARES) ); 
			}
			var dist = (this.getValue()-begin).mod(NUM_OUTER_SQUARES);				
			// Check if this is reachable (if it's not after the pawn's color path)
			if (!this.isValBetween(PATH_ENDS[GameState.selectedPawn.cIndex],begin))				
				return dist;
			return null;
		},
		// Returns true if val is on the path from begin to this.
		isValBetween : function(val,begin) {
			if (val==begin) return true; // avoid n.mod(m) being 0 instead of m 
			return ( (this.getValue()-begin).mod(NUM_OUTER_SQUARES) > (val-begin).mod(NUM_OUTER_SQUARES) ); 
		},
		getValue : function() {
			switch(this.type) {
				case OUTER_SQUARE:
					return Number(this.id);
				case INNER_SQUARE:
					return Number(this.id.substring(this.id.lastIndexOf('-')+1));
				case START_SQUARE:
					return PATH_ENDS[COLORS.indexOf(this.color)]+1;
				default:
					return null; 
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