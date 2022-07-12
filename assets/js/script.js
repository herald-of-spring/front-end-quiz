//Using Durstenfeld shuffle to randomize array ordering: used to randomize questions and answers
function randomize(array) {
  temp = array.slice(0);
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
var qList = null;

//displays one question at a time, and invokes itself until there are no questions left
function nextQ(index) {
  if (index < qList.length && timeLeft > 0) {
    $("#question-layout").append(
      $("<h2>").addClass("mx-5").text(qList[index].prompt));
    var ansEl = $("<div>").addClass("mx-5");
    $("#question-layout").append(ansEl);
    //displays each answer, each belonging to class answer-option, and returns value on click
    var aList = randomize(qList[index].options);
    for (var ans of aList) {
      ansEl.append(
        $("<p>").addClass("answer-option").text(ans)
        .on("click", function() {
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
      $("#question-layout").empty();
      if (timeLeft < 0) {
        timeLeft = 0;
      } 
      saveStats(timeLeft);
    }
  }, 1000);
}

var scoreboard = null;

function saveStats() {
  $("#save-wrapper").append(
    $("<h2>").addClass("my-5").text("You finished with a score of " + timeLeft));
  $("#save-wrapper").append(
    $("<div>").addClass("mb-5").append(
      $("<span>").text("Your Name: ")).append(
      $("<input>").attr("id", "user-input").attr("type", "text")).append(
      $("<br>")).append(
      $("<div>").addClass("button text-light mt-5").text("Save")
      .on("click", function() {
        if ($("#user-input").val() === "") {
          var notice = $("<div>").addClass("mt-5").text("Name cannot be empty!");
          $("#save-wrapper").append(notice);
          setTimeout(function() {
            notice.fadeOut(1000, "linear", function() {
              notice.empty();
            });
          }, 1000);
        }
        else {
          scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
          if (scoreboard === null) {
            scoreboard = {
              names: [$("#user-input").val()],
              scores: [timeLeft],
            }
          }
          else {
            var added = false;
            for (var i in scoreboard.names) {
              if (timeLeft >= scoreboard.scores[i]) {
                scoreboard.scores.splice(i, 0, timeLeft);
                scoreboard.names.splice(i, 0, $("#user-input").val());
                added = true;
                break;
              }
            }
            if (added === false) {
              scoreboard.scores.push(timeLeft);
              scoreboard.names.push($("#user-input").val());
            }
            //only saves top 10
            while (scoreboard.scores.length > 10) {
              scoreboard.scores.pop();
              scoreboard.names.pop();
            }
          }
          localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
          $("#save-wrapper").empty();
          loadStats();
        }
      })
    )
  );
}

function loadStats() {
  //reset variables for replayability
  $("#time-left").text("75");
  scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
  if (scoreboard === null) {
    $("#score-wrapper").append(
      $("<h2>").addClass("my-5").text("Uh oh... no scores found!"));
    $("#score-wrapper").append(
      $("<p>").addClass("my-5").text("Why not play some games to populate the scoreboard?"));
  }
  else {
    $("#score-wrapper").append(
      $("<h2>").addClass("my-5").text("Local Top 10"));
    $("#score-wrapper").append(
      $("<div>").addClass("mt-5 justify-space-between flex-row").append(
        $("<h3>").text("Name")).append(
        $("<h3>").text("Score")
      )
    );
    for (var i in scoreboard.names) {
      $("#score-wrapper").append(
        $("<div>").addClass("my-3 justify-space-between flex-row").append(
          $("<div>").text((parseInt(i)+1) + ". " + scoreboard.names[i])).append(
          $("<div>").text(scoreboard.scores[i])
        )
      );
    }
    $("#score-wrapper").children().eq(2).addClass("first");
    $("#score-wrapper").children().eq(3).addClass("second");
    $("#score-wrapper").children().eq(4).addClass("third");
  }
  $("#score-wrapper").append(
    $("<div>").addClass("button").text("Back")
    .on("click", function () {
      $("#score-wrapper").empty();
      $("#start-prompt").css("display", "block");
      $("#high-score-btn").css("pointer-events", "auto");
    })
  );
}

//hides start menu and disables clicking to leaderboards
$("#start-btn").on("click", function() {
  qList = randomize(questions);
  isDone = false;
  timeLeft = 75;
  $("#start-prompt").css("display", "none");
  $("#high-score-btn").css("pointer-events", "none");
  countdown();
  nextQ(0);
});

$("#high-score-btn").on("click", function() {
  $("#start-prompt").css("display", "none");
  $("#high-score-btn").css("pointer-events", "none");
  loadStats();
})