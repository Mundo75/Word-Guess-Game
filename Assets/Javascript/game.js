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

//Comp selects word randomly from word store array

var bogieSelect = Math.floor(Math.random()*wordStore.length);
var targetBogie = wordStore[bogieSelect];
console.log(targetBogie);
