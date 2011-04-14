//----------------------------//
//----gameCard Object---------//
//----------------------------//


function gameCard(n,i,t,d)
{
	this.name = n;
	this.image = i;
	this.type = t;
	this.description = d;
	
	this.toString = function()
	{
		return this.name;
		
	}
	
}

//----------------------------//
//--------deck Object---------//
//----------------------------//

function deck()
{
	this.cards = new Array();


	this.create = function()
	{
		
		this.cards[0] = 
			new gameCard("Forward double",
						 "images/card/",
						 "Normal",
						 "add your dice rolls together and move one piece forward that many spaces"
						);
		this.cards[1] =
			new gameCard("Forward single",
						 "images/card/",
						 "Normal",
						 "roll the dice, then pick one and move forward that many spaces"
					);
		this.cards[2] = 
			new gameCard("Reverse double",
						 "images/card/",
						 "Normal",
						 "add your dice rolls together and move one piece backward that many spaces"
						 );
		this.cards[3] = 
			new gameCard("Reverse single",
					     "images/card/",
					     "Normal",
					     "roll the dice, then pick one and move one piece backward that many spaces"
					     );
		this.cards[4] = 
			new gameCard("Bully card",
					     "images/card/",
					     "Normal",
					     "for the rest of this round (that is, until your next turn), any of your opponents' pieces that you pass or that pass you get sent back to their start area. If you land on the same space as an opponent's piece, or that piece lands on the same space as you, that piece gets sent back to start and cannot be moved next turn. If you pass or land on the same space as another bully, or another bully passes or lands on the same space as you, nothing happens to either piece."
					     );
						 
		this.cards[5] = 
			new gameCard("Split card ",
						 "images/card/",
						 "Normal",
						 "add your dice rolls together and move any number of pieces forward, so long as the total number of spaces moved comes out to the number rolled"
						 );
	}
	
	function randomSort(a,b) 
	{
		return( parseInt( Math.random()*10 ) %2 );
	}
	
	this.shuffle = function()	
	{
		this.cards.sort(randomSort);
	}
	
	this.deal = function() 
	{
	
		  if (this.cards.length > 0)
		    return this.cards.shift();
		  else
		  {
		    alert("Empty Deck");
		    return null;
		  }
	}
	
	this.add = function(card) 
	{
		  this.cards.push(card);
	}
	
	this.count = function()
	{
		return this.cards.length;
	}
	
	this.toString = function()
	{
		for(i = 0; i < this.cards.length; i++)
			document.write("<p>" + (i + 1) + " <i>" + this.cards[i] + "</i></p>");
	}
}