
//This function sets up the board for Breaker. It creates 5 rows, 
//each of which contains 5 randomly chosen words. It also sets the button that
//allows the Breaker to end their turn.

function makeBreaker(){
	turnOff(document.getElementsByName("ending"));
	turnOn(document.getElementsByName("isBreaker"));
	turnOn(document.getElementsByName("BreakerCounts"));
	document.getElementById("endGameText").innerText="Would you like to play again?"
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

//Runs endgame; asks player if they want to play again, sets up new board

function BreakerWin(){
	turnOff(document.getElementsByName("BreakerCounts"));
	turnOff(document.getElementsByName("playing"));
	turnOn(document.getElementsByName("ending"));
	turnOn(document.getElementsByName("PlayAgain"));
	document.getElementById("PlayYes").onclick=function(){
		NewGame();
	}
	document.getElementById("PlayNo").onclick=function(){
		BtoM.send("goodbye");
		document.write("Goodbye!");
	}
	
}

//Set Up New Game
function NewGame(){
	reset();
	turnOff(document.getElementsByName("PlayAgain"));
	turnOff(document.getElementsByName("isBreaker"));
	document.getElementById("endGameText").innerText="Waiting for Maker..."
	breakerBoard = document.getElementById("BreakerBoard");
	while(breakerBoard.firstChild){
		breakerBoard.removeChild(breakerBoard.firstChild);
	}
	breakerCount=document.getElementById("wordsRemaining");
	while(breakerCount.firstChild){
		breakerCount.removeChild(breakerCount.firstChild);
	}
}


//createClick adds the mechanism that interprets a selection on Breaker's
//board. It changes the color of the corresponding cells on Breaker's board,
//iterates the count, and sends relevant data to Maker to change color as well


function createClick(color, element){
	element.onclick=function (){
		if(this.innerText!=""){
			BtoM.send([color,this.innerText]);
			count[color]+=1;
			this.bgColor=color;
			this.innerText="";
			document.getElementById(color+"Count").innerText = words[color].length-count[color];
			
			if(count[color]==words[color].length){
				setTimeout(wins,100,color);
				BtoM.send(["wins",color]);
			}else if(players[turn]!=color){
				setTimeout(endTurn,100);
			}
			
		}
	}
}


//Adds the table of how many words are left on Breaker's board

function createRemainingCount(){
	countWords = document.getElementById("wordsRemaining");
	Header = document.createElement("TR");
	headElement = document.createElement("TD");
	headElement.innerText = "Words Remaining";
	Header.appendChild(headElement);
	countWords.appendChild(Header);
	
	countWords.appendChild(countRow("blue","Blue"));
	countWords.appendChild(countRow("red","Red"));
	countWords.appendChild(countRow("grey","Grey"));
	
	document.getElementById("greyCountRow").style.display="none"
	
}

//Rows for breaker count table

function countRow(color, capColor){
	newRow = document.createElement("TR");
	newRow.setAttribute("id",color+"CountRow");
	rowLabel=document.createElement("TD");
	rowLabel.innerText = capColor;
	rowCount = document.createElement("TD");
	rowCount.setAttribute("id", color+"Count");
	rowCount.innerText = words[color].length;
	newRow.appendChild(rowLabel);
	newRow.appendChild(rowCount);
	return newRow;
}

