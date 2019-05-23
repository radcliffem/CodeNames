//This function sets up the Maker Board. It is called whenever Breaker sends
//initialization to Maker. The words and the corresponding color assignments
//represented as a permutation are the input.

function makeMaker(wordList,assassin){
	turnOn(document.getElementsByName("playing"));
	MakeBoard=document.getElementById("MakerBoard");
	document.getElementById("turnText").innerText="It is "+playerNames['blue']+"'s turn.";
	document.getElementById("turn").style.width="200px";
	document.getElementById("turn").style.borderColor="blue";
	
	makerAssassin(MakeBoard, assassin);
	headerRow(MakeBoard);
	shuffleButtons(MakeBoard);
		
	words=wordList;
	

//Add the words from Breaker to the Maker Board. 

	for(var i=0;i<7;i++){
		newRow=document.createElement("TR");
		
		newRow.appendChild(makerWord('blue',i));
		newRow.appendChild(makerWord('red',i));
		newRow.appendChild(makerWord('grey',i));
		
		MakeBoard.appendChild(newRow);
	}
	
	newRow=document.createElement("TR");
	newRow.appendChild(makerWord('blue',7));
	newRow.appendChild(makerWord('red',7))
	MakeBoard.appendChild(newRow);
	
	newRow=document.createElement("TR");
	newRow.appendChild(makerWord('blue',8));
	MakeBoard.appendChild(newRow);
	
}


//When Breaker makes a selection, it is sent to Maker. Maker then finds the 
//corresponding word and updates its cell with the correct color. It sets the
//name of the cell as "usedWord" so that it will be ignored if Maker uses the
//Shuffle buttons.

function BreakerClick([color, word]){
	makerWord=document.getElementById(word);
	makerWord.bgColor=color;
	makerWord.innerText="";
	makerWord.setAttribute("name", "usedWord");
}





