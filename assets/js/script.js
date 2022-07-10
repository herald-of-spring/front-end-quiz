//Using Durstenfeld shuffle to randomize array ordering: used to randomize questions and answers
function randomize(array) {
  temp = array.splice(0);
  for (var i = temp.length; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
}

var questions = [
  {
    prompt: "The condition in an if/else statement is enclosed with _____.",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correct: "curly brackets",
  },
  {
    prompt: "Commonly used data types in the DOM DO NOT include _____.",
    options: ["strings", "booleans", "alerts", "numbers"],
    correct: "alerts",
  },
  {
    prompt: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
    correct: "quotes",
  },
  {
    prompt: "A very useful tool used during development and debugging for printing content to the debugger is _____.",
    options: ["JavaScript", "terminal/bash", "\"for\" loops", "console.log"],
    correct: "console.log",
  },
  {
    prompt: "Arrays in JavaScript can be used to store _____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correct: "all of the above",
  },
];



$("#start-btn").on("click", function() {
  $("#start-prompt").css("display", "none");

})