  //word Array for random words to solve
  var wordStore = ["falcon",
                    "warthog", 
                    "phantom", 
                    "hornet",
                    "aardvark",
                        "bogus"];

var wins = 0;
var misslesFired = 0;
var misselsLeft = 0;
var hiddenBogie = [];
var hits = [];
var misses = [];

var hiddenBogieDisplay = document.getElementById("gunSights");
var missesDisplay = document.getElementById("firedMissles");

//Comp selects word randomly from word store array

var bogieSelect = Math.floor(Math.random()*wordStore.length);
var targetBogie = wordStore[bogieSelect];
console.log(targetBogie);

//sets hidden word -- displaying "_ _ _" the same length of word chosen

function hiddenWord () {

    for (var i = 0; i < targetBogie.length; i++) {
        
        hiddenBogie.push("_");
         
    }
return hiddenBogie
}

console.log(hiddenWord());

//capture the user guess using key event

document.addEventListener("keypress", (event) => {

    var keyNumber = event.keyCode;
    var keyLetter = String.fromCharCode(keyNumber);

//match user key input to word selected from word store array.  If correct guess, push letter to "hits" array.

    if (targetBogie.indexOf(keyLetter) > -1) {
        
        hits.push(keyLetter);
        
        hiddenBogie[targetBogie.indexOf(keyLetter)] = keyLetter;
        hiddenBogieDisplay.innerHTML = hiddenBogie.join(" ");
        missesDisplay[0].innerHTML = misses;
        console.log(hits);

        } if (hiddenBogie.join("") == targetBogie) {

        alert("Direct Hit....You Win!!");

    } else 

        misses.push(keyLetter);
        missesDisplay[0].innerHTML = misses;
        console.log(misses);

    
    

});

    //hiddenBogieDisplay[0].innerHTML = hiddenWord().join(" ");