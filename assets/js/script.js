//Using Durstenfeld shuffle to randomize array ordering: used to randomize questions and answers
function randomize(array) {
  temp = array.splice(0);
  for (var i = temp.length - 1; i > 0; i--) {
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

timeLeft = 75;
isDone = false;
hasResponded = false;

function displayQuestions() {
  var layout = $("<div>").addClass("mx-20");
  $("body").append(layout);
  qList = randomize(questions);
  for (q of qList) {
    console.log(q.prompt);
    layout.append($("<h2>").addClass("mx-5").text(q.prompt));
    console.log(layout);
    layout.append($("<div>").addClass("mx-5"));
    //displays each answer, each belonging to class answer-option, and returns value on click
    aList = randomize(q.options);
    for (ans of aList) {
      layout.children().eq(1).append($("<p>").addClass("answer-option").text(ans).on("click", function() {
        if (this.text === q.correct) {
          logCorrect();
        }
        else {
          logIncorrect();
        }
        hasResponded = true;
      }));
    }
    waitResponse();
    hasResponded = false;
    layout.remove();
  }
  isDone = true;
}

function waitResponse() {
  wait = setInterval(function() {
    if (hasResponded === true) {
      clearInterval(wait);
    }
  }, 100); 
}

function logCorrect() {
  $("#result").attr("class", "text-info").text("Correct!");
}

function logIncorrect() {
  $("#result").attr("class", "text-danger").text("Incorrect!");
  timeLeft -= 10;
}

function countdown() {
  timer = setInterval(function() {
    timeLeft--;
    $("#time-left").text(timeLeft);
    if (timeLeft >= 0) {
      if (isDone && timeLeft > 0) {
        clearInterval(timer);
        saveStats(timeLeft);
      }
    }
    if (timeLeft === 0) {
      clearInterval(timer);
      saveStats(timeLeft);
    }
  }, 1000);
}

function saveStats() {
  //do nothing
}

$("#start-btn").on("click", function() {
  $("#start-prompt").css("display", "none");
  countdown();
  displayQuestions();
});