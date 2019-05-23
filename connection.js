var peer;
var num="";
var BtoM;
var gameId="";


document.getElementById("nameGame").onclick = function(){
	gameId=document.getElementById("gameid").value;
	turnOff(document.getElementsByName("setup"));
	turnOn(document.getElementsByName("initial"));
}

console.log(gameId);





//This function runs if the user indicates they are the Maker. The function 
//turns on the Maker board element in the HTML, and waits for commands from 
//Breaker to set it up. Since Breaker provides the only input to the game,
//Maker doesn't do anything without a signal from Breaker.

document.getElementById("makerId").onclick = function (){
	turnOff(document.getElementsByName("initial"));
	turnOn(document.getElementsByName("isMaker"));
	playerNames['blue'] = prompt("Please enter the name of the Blue player", "");
	playerNames['red'] = prompt("Please enter the name of the Red player","");
	
	peer = new Peer("IAmMaker"+gameId);
	peer.on('connection', function(conn) {
		
		conn.send(playerNames);
		
		conn.on('data',function(data){
			//There are 4 signals Breaker can send to Maker. The first is to set up
			//the board (initialize). The second is to switch turns from one player
			//to another (turn). The third is to indicate a team has won (wins). The 
			//last is to process information from a click. The data in that case gives
			//Maker the information about which word has been clicked, so that Maker
			//can update their board.
			// 
			// MtoB = peer.connect("IAmBreaker");
			// MtoB.on('open',function(){
			// 	MtoB.send([bluePlayer, redPlayer]);
			// })
			if(data[0]=="hello"){
				conn.send(playerNames);
			}else if(data[0]=="initialize"){
				makeMaker(data[1],data[2]);
			}else if(data[0]=="turn"){
				makeTurn();
			}else if(data[0]=="wins"){
				wins(data[1]);
			}else{
				BreakerClick(data);
			}
			
		});
	});
}


//This function runs if the user indicates that they are the Breaker. It 
//turns on the Breaker board in the HTML, and opens a channel for Breaker to
//send data to Maker.

document.getElementById("breakerId").onclick=function (){
	turnOff(document.getElementsByName("initial"));
	
	turnOn(document.getElementsByName("pickCategories"));
	
	addCategories();
	
	document.getElementById("submitCategories").onclick=function(){
		wordData=basic;
		options = document.getElementsByName("category");
		for(var i=0;i<options.length;i++){
			if(options[i].checked){
				wordData = wordData.concat(categories[Object.keys(categories)[i]]);
			}
		}
		
		turnOff(document.getElementsByName("pickCategories"));
		
		turnOn(document.getElementsByName("isBreaker"));
	
		makeConnection(wordData);
		
	}
	
	function makeConnection(wordData){
		peer = new Peer("IAmBreaker"+gameId);
		BtoM=peer.connect("IAmMaker"+gameId);
		BtoM.on('open',function(){

			BtoM.send(["hello"]);

			BtoM.on('data',function(data){
				console.log(data);
				playerNames=data;
				console.log(playerNames);
				makeBreaker();
				setColors();
			})
		});
	}
	
	
	
}


//These functions are used to control which HTML elements are hidden or not 
//throughout gameplay.


function turnOn(elements){
	for(var i=0;i<elements.length;i++){
		elements[i].style.display="block";
	}
}

function turnOff(elements){
	for(var i=0;i<elements.length;i++){
		elements[i].style.display="none";
	}
}











