//Add an object with all game variables

var wordFighterGame = {
    
    wordBankWords: {
       
        Falcon: {
            aircraft: "F-16",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/ego_cash.mp3",
            aircraftPic: "F-16.jpg"
        },
        Hornet: {
            aircraft: "F-18",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/need_spd.mp3",
            aircraftPic: "F-18.jpg"
        },
        Aardvark: {
            aircraft: "F-111",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/greeting.mp3",
            aircraftPic: "F-111.jpg"
        },
        Phantom: {
            aircraft: "F-4",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/hongkong.mp3",
            aircraftPic: "F-4.jpg"
        },
        Warthog: {
            aircraft: "A-10",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/turnburn.mp3",
            aircraftPic: "A-10.png"
        },
        BogusPlane: {
            aircraft: "Mig-28",
            soundByte: "http://www.moviewavs.com/0053148414/MP3S/Movies/Top_Gun/mig2.mp3",
            aircraftPic: "Mig 28.jpg"
        },
    },


    //Grab html elements for later DOM manipulation 

    letterBlanks: document.getElementById("emptyLetterSpaces"),
    shotsFired: document.getElementById("letters-fired"),
    missilesLeft: document.getElementById("remaining-guesses"),
    wins: document.getElementById("winTally"),
    shotDown: document.getElementById("lossTally"),

    //Add array of words to use in the game -- Declare Global Variables

    wordBank: ["Falcon", "Hornet", "Aardvark", "Phantom", "Warthog", "Bogus Plane",],
    wins: 0,
    losses: 0,
    missilesLeft: 8,
    missionEngaged: false,
    target: " ",
    targetHidden: [],
    hits: [],
    misses: [],




    //Reset game and counters before starting new game

    newGame: function () {

        this.missionEngaged = true;
        this.missilesLeft = 8;
        this.hits = [];
        this.misses = [];
        this.targetHidden = [];
        

        //computer to select and display a new word form aircraftFleet array
        var objKeys = Object.keys(this.wordBankWords);
        this.target = objKeys[Math.floor(Math.random() * objKeys.length)];

        //display appropriate number of underscores to represent the word selected from the array

        for (var i = 0; i < this.target.length; i++) {

            if (this.target[i] === " ") {

                this.targetHidden.push(" ");

            } else {

                this.targetHidden.push("_");
        
            }   

            //write game stats to the DOM

            this.missilesLeft.textContent = this.missilesLeft;
            this.letterBlanks.textContent = this.targetHidden.join(" ");
            this.shotsFired.textContent = this.misses;
        }
    },

    //Determine if letter selected by the player is in the word selected by the computer

    letterGuess: function(letter) {
        //console.log(letter);

        if (this.missionEngaged === true && this.hits.indexOf(letter) === -1) {

            this.hits.push(letter);

            for (var i = 0; i < this.target.length; i++) {

                if (this.target[i].toLowerCase() === letter.toLowerCase()) {

                    this.targetHidden[i] = this.target[i];
                }
            }

        this.letterBlanks.textContent = this.targetHidden.join(" ");
        this.checkIncorrect(letter);

        } else {

            if (!this.missionEngaged) {

                alert("The Mission is Over, click the New Game button to start over.");

            } else {

                alert("You've already shot that missile, try a new one");
            }
            }
    },

    //Determine incorrect letters and send to the Targets already selected div

    checkIncorrect: function(letter) {

        if (this.targetHidden.indexOf(letter.toLowerCase()) === -1 && this.targetHidden.indexOf(letter.toUpperCase()) == -1) {

            this.missilesLeft = this.missilesLeft -1;
            this.misses.push(letter);
            this.shotsFired.textContent = this.misses.join(" ");
            // this.guessesLeft.textContent = this.guessesLeft;
            document.querySelector("#remaining-guesses").innerHTML = this.missilesLeft;
        }
    this.checkLoss();
    },

    //Determine if player won or lost & trigger alerts, pics and sound bytes

    checkLoss: function() {

        if (this.missilesLeft === 0) {

            this.losses = this.losses +1;
            alert("Jester's Dead!! -- You Lose!");
            missionEngaged = false;
            document.querySelector("#lossTally").innerHTML = this.losses;
            wordFighterGame.newGame();
        }

    this.checkWin();
    
    },
    
    checkWin: function() {

        if (this.target.toLowerCase() === this.targetHidden.join("").toLowerCase()) {

            this.wins = this.wins +1;
            missionEngaged = false;
            document.querySelector("#aircraftPic").innerHTML =
            "<img src='\../Images/'>" +
            this.wordBankWords[this.target].aircraftPic;
            document.querySelector("#winTally").innerHTML = this.wins;
            var audio = new Audio(this.wordBankWords[this.target].soundByte);
            audio.play();
            wordFighterGame.newGame();

        }
    },

};


//onkeyup event to trigger letterGuess
wordFighterGame.newGame();

document.onkeyup = function (event) {

 if (event.keyCode >= 65 && event.keyCode <= 90) {

    wordFighterGame.letterGuess(event.key);

    
 }
}


