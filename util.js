var words={'blue':[],'grey':[],'red':[]}
var assassin="";
var turn=0;
var players=["blue","red"];
var count={'blue':0,'grey':0,'red':0};
var wordData=[];
var playerNames = {'blue':"",'red':""};

//Below are the routinely used functions

function reset(){
	words={'blue':[],'grey':[],'red':[]}
	assassin="";
	turn=0;
	count={'blue':0,'grey':0,'red':0};
}

function endTurn(){
	alert("Wrong choice! Your turn is over");
	BtoM.send(["turn", turn]);
	makeTurn();
}


function wins(color){
	alert("Team "+color+" wins!!");
	if(who=="breaker"){
		BreakerWin();
	}
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

//Input Player names

function getNames(){
	blueName = prompt("Please enter the name of the Blue player", "");
	redName = prompt("Please enter the name of the Red player","");
	return({'blue':blueName,'red':redName});
}
