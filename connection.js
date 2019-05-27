var peer;
var num="";
var BtoM;
var MtoB;
var gameId="";
var who="";







//This function runs if the user indicates they are the Maker. The function 
//turns on the Maker board element in the HTML, and waits for commands from 
//Breaker to set it up. Since Breaker provides the only input to the game,
//Maker doesn't do anything without a signal from Breaker.

document.getElementById("makerId").onclick = function (){
	gameId=document.getElementById("gameid").value;
	who="maker";
	peer = new Peer("IAmMaker"+gameId);	
	playerNames = getNames();
	
	document.getElementById("audio").play()
	turnOff(document.getElementsByName("initial"));
	document.getElementById("warning").innerText="waiting for Breaker..."
	turnOn(document.getElementsByName("isMaker"));
	
	
	
	peer.on('connection', function(conn) {
				
		conn.on('data',function(data){
			//There are 5 signals Breaker can send to Maker:
			//"hello": asking for player names
			//"initialize": set up the board
			//"turn": switch turns
			//"wins": run end game			
			//anything else: process a click
			
			if(data[0]=="hello"){
				conn.send(playerNames);
			}else if(data[0]=="initialize"){
				turnOff(document.getElementsByName("warning"));
				makeMaker(data[1],data[2]);
			}else if(data[0]=="turn"){
				makeTurn();
			}else if(data[0]=="goodbye"){
				document.write("Goodbye!");
			}else if(data[0]=="wins"){
				wins(data[1]);
				turnOff(document.getElementsByName("playing"));
				turnOn(document.getElementsByName("ending"));
				turnOn(document.getElementsByName("PlayAgain"));
				
				document.getElementById("PlayNo").onclick=function(){
					document.write("Goodbye!");
				}
				
				document.getElementById("PlayYes").onclick=function(){
					conn.send("new");
					turnOff(document.getElementsByName("isMaker"));
					var makerBoard=document.getElementById("MakerBoard");
					while(makerBoard.firstChild){
						makerBoard.removeChild(makerBoard.firstChild);
					}
					turnOff(document.getElementsByName("PlayAgain"));
					turnOn(document.getElementsByName("SameMaker"));
					document.getElementById("endGameText").innerText = "Are the codemakers the same?";
					document.getElementById("SameYes").onclick=function(){
						turnOff(document.getElementsByName("SameMaker"));
						turnOff(document.getElementsByName("ending"));
						turnOn(document.getElementsByName("isMaker"));
						document.getElementById("endGameText").innerText="Would you like to play again?";
						reset();
						conn.send(playerNames);
					}
					document.getElementById("SameNo").onclick=function(){
						playerNames=getNames();
						turnOff(document.getElementsByName("SameMaker"));
						turnOff(document.getElementsByName("ending"));
						turnOn(document.getElementsByName("isMaker"));
						document.getElementById("endGameText").innerText="Would you like to play again?";
						reset();
						conn.send(playerNames);
					}
				}
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
	gameId=document.getElementById("gameid").value;
	who="breaker";
	turnOff(document.getElementsByName("initial"));
	turnOff(document.getElementsByName("warning"));
	turnOn(document.getElementsByName("pickCategories"));
	
	peer = new Peer("IAmBreaker"+gameId);
	
	BtoM=peer.connect("IAmMaker"+gameId);
	
	BtoM.on('open',function(){
		
		BtoM.on('data',function(data){
			if(data=="new"){
				NewGame();
			}else{
				playerNames=data;
				makeBreaker();
				setColors();
			}
		});
	});
	
	
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
				
		BtoM.send(["hello"]);
		
	}
	

	
}












