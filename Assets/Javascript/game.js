//grab DOM elements for use later -- using Id

var winCounter = document.getElementById("winTally");
var gameBoardSpaces = document.getElementById("emptyLetterSpaces");
var gameBoardLetters = document.getElementById("");
var guessCounter = document.getElementById("remaining-guesses");
var wrongLetterCounter = document.getElementById("letters-fired");
var launchMission = document.getElementById("launch");

//word Array for random words to solve

var wordStore = ["falcon",
                "warthog", 
                "phantom", 
                "hornet",
                "aardvark",
                "bogus"];

//Global variables
var wins = 0;
var misslesLeft = 7;
var missionEngaged = false;
var selectedTarget = " ";
var hiddenTarget = [];
var hits = [];
var guessedLetters = [];



//start game with have all counters reset and selecting new word (bogie) to solve (shoot down)

function startMission () {

    missionEngaged = true;
    misslesLeft = 7;
    hits = [];
    misses = [];
    hiddenTarget = [];

    selectedTarget = wordStore[Math.floor(Math.random() * wordStore.length)];

    for (var i = 0; i < selectedTarget.length; i++) {

        hiddenTarget.push("_");
    }

    guessCounter.textContent = misslesLeft;
    gameBoardSpaces.textContent = hiddenTarget.join(" ");
    wrongLetterCounter.textContent = guessedLetters;
}

//check for correct guesses and display in the DOM in matching spaces "hiddenTarget"

function typeGuess(letter) {

    console.log(letter);

    if (missionEngaged === true && guessedLetters.indexOf(letter) === -1) {

        guessedLetters.push(letter);

        for (var i = 0; i < selectedTarget.length; i++) {

            if (selectedTarget[i].toLowerCase() === letter.toLowerCase()) {

                hiddenTarget[i] = selectedTarget[i];

            } 
        }

        console.log(hiddenTarget)
        gameBoardSpaces.textContent = hiddenTarget.join(" ");
        incorrectGuess(letter);

    } else {

        if (!missionEngaged) {

            alert("Game not running");
            
        } else {

            alert("Miss-Fire!!  You already shot that missle....pick another.");
        }
}     
        
        
    



//check for incorrect guesses and display in DOM in Targets Already Selected div "misses"

function incorrectGuess (letter) {

    if (hiddenTarget.indexOf(letter) === -1) {

        misslesLeft--;
        misses.push(letter);
        wrongLetterCounter.textContent = misses.join(" ");
        guessCounter.textContent = misslesLeft;
    }
}

launchMission.addEventListener("click", startMission);

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        typeGuess(event.key);
    }
}
