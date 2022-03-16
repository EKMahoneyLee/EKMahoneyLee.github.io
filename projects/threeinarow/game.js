window.onload = function(){
    //retrive data
    fetch('https://threeinarowpuzzle.herokuapp.com/random') 
	    .then(function(response){
	        return response.json();
	    })
	    .then(function(json){
        let data = json.rows;

        //Creating button for check puzzle
        let btnForCheck = document.createElement("BUTTON");
        btnForCheck.innerHTML = "Check Puzzle";
        btnForCheck.style.backgroundColor = '#adefd1ff';
        btnForCheck.style.color = 'black';
        btnForCheck.style.padding = '5px';
        btnForCheck.style.marginTop = '10px';
        document.body.appendChild(btnForCheck);
        btnForCheck.id = 'checkPuzzleButton';

        //Creating checkbox for show errors
        var box = document.createElement("INPUT");
        box.id='theCheckBox';
        box.setAttribute("type", "checkbox");
        document.body.appendChild(box);

        //Creating label for checkbox
        var label = document.createElement("label");
        label.innerHTML = 'Show Errors          '
        label.for =  "theCheckBox" ;
        document.body.appendChild(label);

        //Creating button for whole new game
        var btn = document.createElement("BUTTON");
        btn.innerHTML = "New Game";
        btn.style.backgroundColor = '#adefd1ff';
        btn.style.color = 'black';
        btn.style.padding = '5px';
        btn.style.marginTop = '10px';
        document.body.appendChild(btn);
        btn.id = 'refresh';

        document.querySelector('#refresh').onclick = function(e){  
            if(document.querySelector('#refresh').isConnected){ 
                const answer = confirm('Are you sure? Your current puzzle will be lost!');
                if(answer){
                    location.reload();
                }
            }
        }

       //timer
        var seconds=data.length*10;
        var timer;
        function setTimer() {
           if(seconds < data.length*60) { 
            document.getElementById("timer").innerHTML = seconds;
            }
            if (seconds > 0 ) { 
                seconds--;
            } 
            if(seconds === 0){
                for( let i=0; i<data.length; i++){ 
                    for( let j=0; j<data.length; j++){
                        data[i][j].canToggle = false;
                    }
                }
            }
        }

        let createDiv = document.createElement('div');
        document.body.append(createDiv);
        createDiv.id = 'timer';
        var btnForTime = document.createElement("BUTTON");
        btnForTime.innerHTML = "Click for Time Challenge";
        btnForTime.style.backgroundColor = '#adefd1ff';
        btnForTime.style.color = 'black';
        btnForTime.style.padding = '5px';
        btnForTime.style.marginTop = '10px';
        document.body.appendChild(btnForTime);
        btnForTime.id = 'buttonTimer';
        document.getElementById("timer").innerHTML  =   "Click the button below";
        document.querySelector('#buttonTimer').onclick = function(e){  
            if(!timer) {
                timer = window.setInterval(function() { 
                setTimer();
                }, 1000); // every second
            }
        document.getElementById("timer").innerHTML  =   data.length*10; 
        }


    //Creating table
    let theTable = document.querySelector('#theGame')
    loadTable();
    function loadTable(){
    for( let i=0; i<data.length; i++){
        let newRow = document.createElement('tr')
        for(let j=0; j<data.length; j++){
            let newCell = document.createElement('td')  

            newCell.onclick = function(e){
                //Update data
                if(data[i][j].canToggle === true){
                    data[i][j].currentState = (data[i][j].currentState + 1) % 3;
                }

                //Update color of squares
                if(data[i][j].currentState === 1){
                    newCell.style.background = '#00203fff';}
                if(data[i][j].currentState === 2){
                    newCell.style.background = '#adefd1ff';}
                if( data[i][j].currentState === 0){
                    newCell.style.background = 'White';}

                // Checkcing the errors
                if(document.querySelector('#theCheckBox').checked ===true){
                    if(data[i][j].currentState !==0){
                        if(data[i][j].currentState !== data[i][j].correctState){
                        newCell.innerText = "X";
                        } 
                        else{
                            newCell.innerText = "";
                        } 
                    }

                    else{
                        newCell.innerText = "";
                    } 
                }
            }  

            // Checkcing the errors
            if(document.querySelector('#theCheckBox').checked ===true){
                if(data[i][j].currentState !==0){
                    if(data[i][j].currentState !== data[i][j].correctState){
                    newCell.innerText = "X";
                    }  
                }
            }
            newRow.appendChild(newCell);
            newRow.id = `${i}_${j+1}`; 
            newCell.id = `id`; 
            newRow.style.border = '1px solid black';
            newCell.style.border = '1px solid black';
            newCell.style.width = '50px';
            newCell.style.height = '50px';
            if(data[i][j].currentState === 1){
                newCell.style.background = '#00203fff';}
            if(data[i][j].currentState === 2){
                newCell.style.background = 'adefd1ff';}
            if( data[i][j].currentState === 0){
                newCell.style.background = 'White';}
        }
        theTable.appendChild(newRow); 
    }
}

//Finding errors
let para = document.createElement("p");
document.querySelector('#checkPuzzleButton').onclick = function(e){ 
    let totalToFinish =0; 
    let totalFor0 = 0;
    for( let i=0; i<data.length; i++){ 
        for( let j=0; j<data.length; j++){
            if(data[i][j].currentState === data[i][j].correctState){
                totalToFinish++;
            }
            if(data[i][j].currentState ===0){
                totalFor0++;
            } 
        }
    }

    // Finding errors
    if(totalToFinish === data.length * data.length){
        para.innerText="You did it";                 
    }

    else if(totalToFinish + totalFor0 === data.length * data.length){
            para.innerText="So far so good";
    }

    else{para.innerText="Something is wrong"; }

    document.body.appendChild(para);
    theTable.remove();
    theTable = document.createElement('div');
    document.body.prepend(theTable);
    loadTable();  
} 
document.querySelector('#theCheckBox').onclick = function(){
    theTable.remove();
    theTable = document.createElement('div');
    document.body.prepend(theTable);
    loadTable();
}
})};