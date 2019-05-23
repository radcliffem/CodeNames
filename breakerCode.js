
//This function sets up the board for Breaker. It creates 5 rows, 
//each of which contains 5 randomly chosen words. It also sets the button that
//allows the Breaker to end their turn.

function makeBreaker(){
	turnOn(document.getElementsByName("playing"));
	document.getElementById("turn").style.width="200px"
	document.getElementById("turn").style.borderColor="blue";
	
	BreakBoard=document.getElementById("BreakerBoard");
	for(var i=0;i<5;i++){
		newRow=document.createElement("TR");
		for(var j=0;j<5;j++){
			newRow.appendChild(pickWord());
		}
		BreakBoard.appendChild(newRow);
	}
	
	document.getElementById("turnText").innerText="It is "+playerNames['blue']+"'s turn."
	
	document.getElementById("endTurn").onclick=function changeTurn(){
		BtoM.send(["turn",turn]);
		makeTurn(turn);
	}
}

//This function assigns the colors to the grid. The function creates a
//random permutation of [0,1,...,24], and assigns the first 9 words as blue
//the next 8 as red, the last as the assassin, all else as neutral. 

function setColors(){
	var wordElements=document.getElementsByName("wordBox");

	var numbers = [];
	for (var i = 0; i < wordElements.length; i++){
	  numbers.push(i);
	}
	perms=permute(numbers);
		
	//create onclick functions
	for(var i=0;i<9;i++){
		words["blue"].push(wordElements[perms[i]].innerText);
		
		createClick("blue", wordElements[perms[i]]);	
	}
	
	for(var i=9;i<17; i++){
		words["red"].push(wordElements[perms[i]].innerText);
		
		createClick("red", wordElements[perms[i]]);
	}
	
	for(var i=17;i<perms.length-1;i++){
		words["grey"].push(wordElements[perms[i]].innerText);	

		createClick("grey", wordElements[perms[i]]);
	}
	
	//Automatically end the game if the assassin is clicked.
	
	assassin=wordElements[perms[perms.length-1]].innerText;
	
	wordElements[perms[perms.length-1]].onclick=function black(){
		this.bgColor="black";
		this.innerText="";
		wins(players[(turn+1)%2]);
		BtoM.send(["wins", players[(turn+1)%2]]);
	}

	createRemainingCount();
	
	BtoM.send(["initialize",words,assassin]);

}	






