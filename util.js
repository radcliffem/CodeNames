var words={'blue':[],'grey':[],'red':[]}
var assassin="";
var turn=0;
var players=["blue","red"];
var count={'blue':0,'grey':0,'red':0};
var wordData=[];
var playerNames = {'blue':[],'red':[]};


//Below are the routinely used functions

function endTurn(){
	alert("Wrong choice! Your turn is over");
	BtoM.send(["turn", turn]);
	makeTurn();
}


function wins(color){
	alert("Team "+color+" wins!!");
}


function makeTurn(){
	turn=(turn+1)%2;
	document.getElementById("turn").style.borderColor = players[turn];
	document.getElementById("turnText").innerText = "It is "+playerNames[players[turn]]+"'s turn.";
}


function getRandInt(min, max){
	min =Math.ceil(min);
	max=Math.floor(max);
	return Math.floor(Math.random()*(max-min))+min
}


function permute(arr){
	var perm = [];

	while(arr.length>0){
		var ind=getRandInt(0,arr.length);
		perm.push(arr[ind]);
		arr.splice(ind, 1);
	}
	
	return perm;
}


//pickWord() selects a word and creates an element to be added to the Breaker
//Board

function pickWord(){
	newWord=document.createElement("TD");
	newWord.setAttribute("name","wordBox");
	newWord.width=78;
	newWord.height="50";
	newWord.innerText = getWord();
	
	return newWord;
}


//the function getWord ensures words cannot be repeated by checking against 
//those that have already been chosen, stored in activeWords
var activeWords = [];

function getWord(){
	var good = false;
	while(good==false){
		var newWord = wordData[getRandInt(0,wordData.length)];
		if(!activeWords.includes(newWord)){good=true;}
	}
	activeWords.push(newWord);
	return newWord;
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
			
			if(players[turn]!=color){
				endTurn();
			}else{
				if(count[color]==words[color].length){
					wins(color);
					BtoM.send(["wins",color]);
				}
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

//Add the assassin row for Maker

function makerAssassin(element,word){
	newRow=document.createElement("TR");
	Assassin=document.createElement("TD");
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
	headRow=document.createElement("TR");
	blueHead=document.createElement("TH");
	blueHead.innerText="Blue"

	redHead=document.createElement("TH");
	redHead.innerText="Red"

	greyHead=document.createElement("TH");
	greyHead.innerText="Grey"

	headRow.appendChild(blueHead);
	headRow.appendChild(redHead);
	headRow.appendChild(greyHead);
	element.appendChild(headRow);
	
}

//Add the shuffleButtons for maker

function shuffleButtons(element){
	buttonRow=document.createElement("TR");
	blueShuffle=document.createElement("TD");
	blueButton=document.createElement("BUTTON");
	blueButton.type="button";
	blueButton.id="blueShuffle";
	blueButton.innerText="Shuffle";
	blueShuffle.appendChild(blueButton);
	blueShuffle.onclick = function (){
		shuffle("blue");
	}
	buttonRow.appendChild(blueShuffle);
	
	
	
	redShuffle=document.createElement("TD");
	redButton=document.createElement("BUTTON");
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

//Add elements to Maker Board

function makerWord(color,ind){
	newWord=document.createElement("TD");
	newWord.setAttribute("name",color+"Word");
	newWord.width="100";
	newWord.innerText=words[color][ind];
	newWord.setAttribute("id",words[color][ind]);
	newWord.height="25";
	return newWord;
}

//Create Category Selection Boxes

function addCategories(){
	for(var i=0;i<Object.keys(categories).length; i++){
		newCat = document.createElement("TR");
		
		boxCell = document.createElement("TD");
		catBox = document.createElement("INPUT");
		catBox.setAttribute("type","checkbox");
		catBox.setAttribute("name","category");
		catBox.setAttribute("value",Object.keys(categories)[i]);
		boxCell.appendChild(catBox);
		newCat.appendChild(boxCell);
		
		labelCell=document.createElement("TD");
		labelCell.innerText=Object.keys(categories)[i];
		newCat.appendChild(labelCell);
		
		document.getElementById("selection").appendChild(newCat);
	}
}

