//Add elements to Maker Board

function makerWord(color,ind){
	var newWord=document.createElement("TD");
	newWord.setAttribute("name",color+"Word");
	newWord.width="100";
	newWord.innerText=words[color][ind];
	newWord.setAttribute("id",words[color][ind]);
	newWord.height="25";
	return newWord;
}



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
		var newRow=document.createElement("TR");
		
		newRow.appendChild(makerWord('blue',i));
		newRow.appendChild(makerWord('red',i));
		newRow.appendChild(makerWord('grey',i));
		
		MakeBoard.appendChild(newRow);
	}
	
	var newRow=document.createElement("TR");
	newRow.appendChild(makerWord('blue',7));
	newRow.appendChild(makerWord('red',7))
	MakeBoard.appendChild(newRow);
	
	var newRow=document.createElement("TR");
	newRow.appendChild(makerWord('blue',8));
	MakeBoard.appendChild(newRow);
	
}


//When Breaker makes a selection, it is sent to Maker. Maker then finds the 
//corresponding word and updates its cell with the correct color. It sets the
//name of the cell as "usedWord" so that it will be ignored if Maker uses the
//Shuffle buttons.

function BreakerClick([color, word]){
	wordClick=document.getElementById(word);
	wordClick.bgColor=color;
	wordClick.innerText="";
	wordClick.setAttribute("name", "usedWord");
}







//Add the assassin row for Maker

function makerAssassin(element,word){
	var newRow=document.createElement("TR");
	var Assassin=document.createElement("TD");
	Assassin.name="";
	Assassin.bgColor="yellow";
	Assassin.setAttribute("colspan","2");
	Assassin.innerText="Assassin:"
	AssassinWord=document.createElement("TD");
	AssassinWord.name="";
	AssassinWord.bgColor="yellow";
	AssassinWord.innerText=word;
	assassin=word;
	
	newRow.appendChild(Assassin);
	newRow.appendChild(AssassinWord);	
	element.appendChild(newRow);
}

//Add the header row for Maker

function headerRow(element){
	var headRow=document.createElement("TR");
	var blueHead=document.createElement("TH");
	blueHead.innerText="Blue"

	var redHead=document.createElement("TH");
	redHead.innerText="Red"

	var greyHead=document.createElement("TH");
	greyHead.innerText="Grey"

	headRow.appendChild(blueHead);
	headRow.appendChild(redHead);
	headRow.appendChild(greyHead);
	element.appendChild(headRow);
	
}

//Add the shuffleButtons for maker

function shuffleButtons(element){
	var buttonRow=document.createElement("TR");
	var blueShuffle=document.createElement("TD");
	var blueButton=document.createElement("BUTTON");
	blueButton.type="button";
	blueButton.id="blueShuffle";
	blueButton.innerText="Shuffle";
	blueShuffle.appendChild(blueButton);
	blueShuffle.onclick = function (){
		shuffle("blue");
	}
	buttonRow.appendChild(blueShuffle);
	
	
	
	var redShuffle=document.createElement("TD");
	var redButton=document.createElement("BUTTON");
	redButton.type="button";
	redButton.id="redShuffle";
	redButton.innerText="Shuffle";
	redShuffle.appendChild(redButton);
	redShuffle.onclick = function (){
		shuffle("red")
	}
	buttonRow.appendChild(redShuffle);
	
	MakeBoard.appendChild(buttonRow);
	
}

//onclick shuffle function

function shuffle(color){
	var reorder = document.getElementsByName(color+"Word");
	var toPerm = [];
	for(var j=0;j<reorder.length;j++){
		toPerm.push(reorder[j].innerText);
	}
	addWords=permute(toPerm);
	for(var i=0;i<reorder.length;i++){
		reorder[i].innerText=addWords[i];
		reorder[i].id=addWords[i];
	}
}
