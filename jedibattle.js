//global variables
let turn = 0;                               // variable to track turns
let win = false;                            // boolean to track winner

//create Player class
class Player {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

//create players
var p1 = new Player('yoda', 'images/yoda-145.png');
var p2 = new Player('vader', 'images/vader-145.png');

//TODO: get elements from DOM get extra areas once created
const yodaSound = new Audio('audio/yodalaughing.wav');
const vaderSound = new Audio('audio/alltooeasy.wav');
const clickSound = new Audio('audio/lightsaber-clash.mp3');
const trySound = new Audio('audio/yoda_try.wav');

//WORKS
//display player images - takes image url and ID of square to display image in
function displayPlayerImage(url, square, player){
    let location = document.getElementById(`${square}`);    
    let imageElement = document.createElement("img");
    imageElement.src = url;
    imageElement.className=(`${player} center image-fluid img-responsive`);
    location.prepend(imageElement);
}

//change information in turn div at the top of the screen WORKS
function displayTurn(){    
    let turnText = document.getElementById('player-turn');

    if (!win && turn == 9 ){
        turnText.innerHTML=`GAME IS A DRAW`;
        showInfoBox('draw');
    }
    else if (turn != 9 && turn %2 == 0) {
        turnText.innerHTML=`Yoda's Turn`;
    } else {
        turnText.innerHTML=`Vader's Turn`;
    }
}

//WORKS
//use event listener on play again button to clear the board and reset variables & grid array
const replayBtn = document.getElementById('play-again').addEventListener('click', playAgain);
    
function playAgain() {
    turn = 0;
    win = false;

    var playSqs = document.getElementsByClassName('play-sq');
    for (i=0; i < playSqs.length; i++){
        playSqs[i].classList.remove('win-sq');
        playSqs[i].innerHTML="";
        document.getElementById("info-box").className='hidden';
        turn = 0;
        displayTurn();
    }
};

//gameplay starts with adding event listeners to all squares
var playSqs = document.getElementsByClassName('play-sq');

for(let i=0; i<playSqs.length; i++){
    playSqs[i].addEventListener('click', function() {
    var id = this.id;
    clickSound.play();
    
    //place player image
    if(!win && this.innerHTML === ""){
        if (turn %2 == 0){
            displayPlayerImage(p1.url, id, 'p1');
            checkForWinner(p1.name);
        } else {
            displayPlayerImage(p2.url, id, 'p2');
            checkForWinner(p2.name);                    
        } 
        turn++;
        displayTurn(); 
    }                  
    }); 
}

function checkForWinner(name) {
//check eack play square's content
let sq1 = document.getElementById('1'), sq2 = document.getElementById('2'),
    sq3 = document.getElementById('3'), sq4 = document.getElementById('4'),
    sq5 = document.getElementById('5'), sq6 = document.getElementById('6'),
    sq7 = document.getElementById('7'), sq8 = document.getElementById('8'),
    sq9 = document.getElementById('9');

    //across top row    
    if(sq1.innerHTML !=="" && sq1.innerHTML === sq2.innerHTML && sq1.innerHTML === sq3.innerHTML){
        highlightWinnerSquares(sq1, sq2, sq3);
        win = true; 
    }

    //across middle row
    if(sq4.innerHTML !=="" && sq4.innerHTML === sq5.innerHTML && sq4.innerHTML === sq6.innerHTML){
        highlightWinnerSquares(sq4, sq5, sq6);
        win = true;
    }

    //across botttom row
    if(sq7.innerHTML !=="" && sq7.innerHTML === sq8.innerHTML && sq7.innerHTML === sq9.innerHTML){
        highlightWinnerSquares(sq7, sq8, sq9);
        win = true;
    }

    //down first column
    if(sq1.innerHTML !=="" && sq1.innerHTML === sq4.innerHTML && sq1.innerHTML === sq7.innerHTML){
        highlightWinnerSquares(sq1, sq4, sq7);
        win = true;
    }

    //down second column
    if(sq2.innerHTML !=="" && sq2.innerHTML === sq5.innerHTML && sq2.innerHTML === sq8.innerHTML){
        highlightWinnerSquares(sq2, sq5, sq8);
        win = true;
    }

    //down third column
    if(sq3.innerHTML !=="" && sq3.innerHTML === sq6.innerHTML && sq3.innerHTML === sq9.innerHTML){
        highlightWinnerSquares(sq3, sq6, sq9);
        win = true;
    }

    //diagonal from top left
    if(sq1.innerHTML !=="" && sq1.innerHTML === sq5.innerHTML && sq1.innerHTML === sq9.innerHTML){
        highlightWinnerSquares(sq1, sq5, sq9);
        win = true;
    }

    //diagonal from top right
    if(sq3.innerHTML !=="" && sq3.innerHTML === sq5.innerHTML && sq3.innerHTML === sq7.innerHTML){
        highlightWinnerSquares(sq3, sq5, sq7);
        win = true;
    }
    if(win) {
        showInfoBox(name);
    }

    if (!win && turn==9){
        showInfoBox('draw');
    }

}//end checkForWinner

//highlight the winning squares
function highlightWinnerSquares(sq1, sq2, sq3) {
    sq1.classList.add('win-sq');
    sq2.classList.add('win-sq');
    sq3.classList.add('win-sq');
}

function showInfoBox(name){
    document.getElementById('info-box').className='visible';
    
    if (name != 'draw'){
        document.getElementById('info-box-text').innerHTML = `${name} wins!`;
        if (name === 'yoda'){
            yodaSound.play();
        } else if (name === 'vader') {
            vaderSound.play();
        } 
    }

    if (name === 'draw') {
        document.getElementById('info-box-text').innerHTML = `game is a draw`;
        trySound.play();
    }
}

    
    
    


    






