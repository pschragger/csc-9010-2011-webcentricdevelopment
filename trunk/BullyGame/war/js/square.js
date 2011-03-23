function Square(x, y, size, color)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = color;
  
  this.piecesInside = [4];
  this.piecesInside[0] = null;
  this.piecesInside[1] = null;
  this.piecesInside[2] = null;
  this.piecesInside[3] = null;
  
  this.numPieces =
    function()
    {
	    var count = 0;
      for(var i = 0; i < this.piecesInside.length; i++)
      {
		    var slot = this.piecesInside[i];
        if(slot != null)
		      count++;
      }
      return count;
    }
  
  this.isFilled = 
    function()
    {
      return (this.numPieces() > 0);
    }
  
  this.draw = 
    function()
    {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) 
      {
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.strokeRect(this.x, this.y, this.size, this.size);
      }
    }
  
  this.toString =
    function()
    {
      return "Square at (" + this.x + "," + this.y +"), size = " + this.size + ", color = " + this.color;
    }
}

// TEST code below

var layer1;
var layer2;
var layer3;
var ctx1;
var ctx2;
var ctx3;
var x = 400;
var y = 300;
var dx = 2;
var dy = 4;
var WIDTH = 400;
var HEIGHT = 300;
var city = new Image();

function initq() {
	city.src ="images/green_felt.jpg";
//	layer1 = document.getElementById("layer1");
//	ctx1 = layer1.getContext("2d");
//	layer2 = document.getElementById("layer2");
//	ctx2 = layer2.getContext("2d");
//	layer3 = document.getElementById("layer3");
//	ctx3 = layer3.getContext("2d");
	CANVAS.init({ canvasElement: 'layer1' });
	CANVAS.init({ canvasElement: 'layer2' });
	CANVAS.init({ canvasElement: 'layer3' });
	ctx1 = $('layer1').getContext("2d");
	ctx2 = $('layer2').getContext("2d");
	ctx3 = $('layer3').getContext("2d");
	setInterval(drawAll, 20);
}

function drawAll() {
	draw1();
	draw2();
	draw3();
}

function draw1() {
	ctx1.clearRect(0, 0, WIDTH, HEIGHT);
	ctx1.fillStyle = "#FAF7F8";
	ctx1.beginPath();
	ctx1.rect(0,0,WIDTH,HEIGHT);
	ctx1.closePath();
	ctx1.fill();
	ctx1.fillStyle = "#444444";
	ctx1.beginPath();
	ctx1.arc(x, y, 10, 0, Math.PI*2, true);
	ctx1.closePath();
	ctx1.fill();
	
	if (x + dx > WIDTH || x + dx < 0)
	dx = -dx;
	if (y + dy > HEIGHT || y + dy < 0)
	dy = -dy;
	
	x += dx;
	y += dy;
}

function draw2() {
	ctx2.clearRect(0, 0, WIDTH, HEIGHT);
	ctx2.drawImage(city, 0, 0);
}

function draw3() {
	ctx3.clearRect(0, 0, WIDTH, HEIGHT);
	ctx3.fillStyle = "#444444";
	ctx3.save();
	ctx3.translate(200,200);
	ctx3.rotate(x/20);
	ctx3.fillRect(-15, -15, 30, 30);
	ctx3.restore();
}