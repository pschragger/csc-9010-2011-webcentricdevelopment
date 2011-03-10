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

var DIE_LENGTH = 60;
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
		fillStyle : 'rgba(255,255,255,1)',
		strokeStyle : 'rgba(0,0,0,1)',
		events : {
			onDraw : function( ctx ) {
				ctx.fillStyle = this.fillStyle;
				ctx.strokeStyle = this.strokeStyle;
				ctx.fillRect(this.x,this.y,this.w,this.h);
				ctx.strokeRect(this.x,this.y,this.w,this.h);				
				this.setDims(this.x,this.y,this.w,this.h);
				ctx.fillStyle = 'rgba(0,0,0,1)';
				for (var i=0;i<diceDots[this.val-1].length;i++) {					
					var pos = diceDots[this.val-1][i];	
					ctx.beginPath();					
					ctx.arc(this.x+this.w*pos.x,this.y+this.h*pos.y,DOT_RAD,0,Math.PI*2, true);
					ctx.closePath();					
					ctx.fill();	
				}
			},
			onMouseover : function(x,y){
				this.strokeStyle = 'rgba(0,0,0,1)';
			},
			onMouseout : function(x,y){
				this.strokeStyle = 'rgba(0,0,0,0.5)';
			},
			click : function(x,y) {
				alert("This die has a value of " + this.val + ".");
			}
		}
	});
	
	return item;
}


//Die.prototype.draw(ctx) {
//	
//}

function drawDiceRoll(d1,d2) {	
	CANVAS.init({ canvasElement : 'diceCanvas' });
	CANVAS.clear();
//	var dCanvas = $('diceCanvas');
//	var ctx = dCanvas.getContext('2d');
	var layer = CANVAS.layers.add( new Layer({
		id : 'mainLayer'
	}));	
    layer.add(d1);
    layer.add(d2);
	layer.draw();
}