// Dot Positions
var TL = {x: 0.2, y: 0.2}
var TR = {x: 0.8, y: 0.2}
var ML = {x: 0.2, y: 0.5}
var MM = {x: 0.5, y: 0.5}
var MR = {x: 0.8, y: 0.5}
var BL = {x: 0.2, y: 0.8}
var BR = {x: 0.8, y: 0.8}

var diceDots = [];
diceDots.push([MM]); // 1,
diceDots.push([BL,TR]); // 2
diceDots.push([BL,MM,TR]); // 3
diceDots.push([TL,TR,BL,BR]); // 4
diceDots.push([TL,TR,MM,BL,BR]); // 5
diceDots.push([TL,TR,ML,MR,BL,BR]); // 6

var DIE_LENGTH = 30;
var DOT_RAD = DIE_LENGTH/10;

function createDie(dId, nVal, xPos, yPos, angle) {
	nVal = (isNaN(nVal) || nVal < 1 || nVal > 6) ? 6 : Math.floor(nVal);
	var item = new CanvasItem({
		id : dId,
		val: nVal,
		x : xPos,
		y : yPos,
		w : DIE_LENGTH,
		h : DIE_LENGTH,
		t : Math.random()*Math.PI/2,
		fillStyle : 'rgba(255,255,255,1)',  // white
		strokeStyle : 'rgba(0,0,0,1)',		// black
		events : {
			onDraw : function( ctx ) {
				ctx.save();
				ctx.translate(this.x,this.y);
				ctx.rotate(this.t);
				
								
				ctx.fillStyle = this.fillStyle;
				ctx.strokeStyle = this.strokeStyle;								
				
				// Draw Die and border
				ctx.fillRect(0,0,this.w,this.h);
				ctx.strokeRect(0,0,this.w,this.h);				
				this.setDims(this.x,this.y,this.w,this.h);
				// Draw Dots
				ctx.fillStyle = 'rgba(0,0,0,1)';
				for (var i=0;i<diceDots[this.val-1].length;i++) {					
					var pos = diceDots[this.val-1][i];	
					ctx.beginPath();					
					ctx.arc(this.w*pos.x,this.h*pos.y,DOT_RAD,0,Math.PI*2, true);
					ctx.closePath();					
					ctx.fill();	
				}

				ctx.restore();
			},
			mouseover : function(x,y){
				this.strokeStyle = 'rgba(0,0,0,1)';				
			},
			mouseout : function(x,y){
				this.strokeStyle = 'rgba(0,0,0,0.5)';
			},
			click : function(x,y) {
				alert("This die has a value of " + this.val + ".");
			}
		}
	});
	
	return item;
}

function drawDiceRoll(d1,d2) {	
	CANVAS.init({ canvasElement : 'diceCanvas' });
	CANVAS.clear();
	var layer = CANVAS.layers.add( new Layer({
		id : 'diceLayer'
	}));	
    layer.add(d1);
    layer.add(d2);
	layer.draw();
}

function setDice(v1,v2) {
	// Get Random positions
	var p1x = Math.floor(Math.random()*(250-DIE_LENGTH));
	var p1y = Math.floor(Math.random()*(100-DIE_LENGTH));
	do {
	   	var p2x = Math.floor(Math.random()*(250-DIE_LENGTH));
		var p2y = Math.floor(Math.random()*(100-DIE_LENGTH));   			
	} while (Math.abs(p2x-p1x) <= (DIE_LENGTH*1.4) && Math.abs(p2y-p1y)<=(DIE_LENGTH*1.4));   			
	var d1 = createDie('d1', v1, p1x,p1y, 30);
	var d2 = createDie('d2', v2, p2x,p2y, 0);
	drawDiceRoll(d1,d2);
	$('diceroll').play();
	$('diceButton').disabled = true;	
}

// TEMP Function. Will be replaced with AJAX call.
function rollDice() {   			   		
	// Get Random values
	var v1 = Math.ceil(Math.random()*6);
	var v2 = Math.ceil(Math.random()*6);
	setDice(v1,v2);
} 