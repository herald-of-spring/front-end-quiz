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

var timeLeft = 75;
var isDone = false;
var qList = randomize(questions);

function nextQ(index) {
  if (index < qList.length && timeLeft > 0) {
    $("#question-layout").append($("<h2>").addClass("mx-5").text(qList[index].prompt));
    var ansEl = $("<div>").addClass("mx-5");
    $("#question-layout").append(ansEl);
    //displays each answer, each belonging to class answer-option, and returns value on click
    var aList = randomize(qList[index].options);
    console.log(qList[index].correct)
    for (var ans of aList) {
      ansEl.append($("<p>").addClass("answer-option").text(ans).on("click", function() {
        console.log($(this).html());
        if ($(this).html() === qList[index].correct) {
          $("#result").attr("class", "text-info").text("Correct!").fadeIn(0).fadeOut(1500);
        }
        else {
          $("#result").attr("class", "text-danger").text("Incorrect!").fadeIn(0).fadeOut(1500);
          timeLeft -= 10;
        }
        $("#question-layout").empty();
        nextQ(index+1);
      }));
    }
  }
  else {    //all questions answered
    isDone = true;
  }
}

function countdown() {
  timer = setInterval(function() {
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    $("#time-left").text(timeLeft);
    if (isDone || timeLeft === 0) {
      clearInterval(timer);
      if (timeLeft < 0) {
        timeLeft = 0;
      } 
      saveStats(timeLeft);
    }
  }, 1000);
}

var scoreboard = localStorage.getItem("scoreboard-names");

function saveStats() {
  var saveWrapper = $("<div>").addClass("text-center");
  $("#start-prompt").after(saveWrapper);
  saveWrapper.append($("<h2>").addClass("my-5").text("You finished with a score of " + timeLeft));
  saveWrapper.append($("<div>").addClass("mb-5").append($("<span>").text("Your Name: ")).append($("<input>").attr("id", "user-input")));
  saveWrapper.append($("<div>").addClass("button").text("Save").on("click", function() {
    if ($("#user-input").val() === "") {
      var notice = $("<div>").addClass("mt-5").text("Name cannot be empty!");
      saveWrapper.append(notice);
      setTimeout(function() {
        notice.fadeOut(1000, "linear", function() {
          notice.empty();
        });
      }, 1000);
    }
    else {
      localStorage.setItem("scoreboard", )
      loadStats();
      isDone = false;
    }
  }));
}

function loadStats() {
  if (scoreboard === null) {
    $("#score-wrapper").append($("<h2>").addClass("my-5 text-center").text("Uh oh... no scores found!"));
    $("#score-wrapper").append($("<p>").addClass("text-center my-auto").text("Why not play some games to populate the scoreboard?"));
  }
  else {
    $("#score-wrapper").append($("<h2>").addClass("my-5 text-center").text("Local Leaderboard"));
  }
  $("#score-wrapper").append($("<div>").addClass("button text-center").text("Back").on("click", function () {
    $("#score-wrapper").empty();
    $("#start-prompt").css("display", "block");
    $("#high-score-btn").attr("disabled", false);
  }));
}

$("#start-btn").on("click", function() {
  $("#start-prompt").css("display", "none");
  $("#high-score-btn").attr("disabled", true);
  countdown();
  nextQ(0);
});

$("#high-score-btn").on("click", function() {
  $("#start-prompt").css("display", "none");
  $("#high-score-btn").attr("disabled", true);
  loadStats();
})