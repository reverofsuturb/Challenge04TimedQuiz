var qdisplay = document.querySelector("#qdisplay");
var button1 = document.querySelector("#c1");
var button2 = document.querySelector("#c2");
var button3 = document.querySelector("#c3");
var button4 = document.querySelector("#c4");
var start = document.querySelector("#start");
var retry = document.querySelector("#retry");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var timeleft = document.querySelector("#time");
var viewhighscores = document.querySelector("#highscore");
var answerdisplay = document.querySelector("#answer");
var scoredisplay = document.querySelector("#score");
var clearscores = document.querySelector("#clear");
var high1 = document.querySelector("#high1");
var highscoretable = document.querySelector("#highscores");
// declared global variables for manipulation through JS
var qnum = 0;
var correct = 0;
var timeremain = 60;
// declared vars global so they have a base value as multiple functions are accessing
var questions = [
  {
    quest: "What would you use to store multiple values in a single variable?",
    choice: ["Number", "Oxen", "Value", "Array"],
    answer: "Array",
  },

  {
    quest: "How long did it take Brendan Eich to create JavaScript?",
    choice: ["17 years", "4 hours", "10 days", "2 months"],
    answer: "10 days",
  },

  {
    quest: "How do you recognize a function?",
    choice: [
      "an ! after the named word",
      "() after the named word",
      "is a function after the named word",
      "function = named word",
    ],
    answer: "() after the named word",
  },

  {
    quest: "Which If statement correctly notates that x is equal to 8",
    choice: ["(if) x is 8", "if x = 8", "if (x != 8)", "if (x = 8)"],
    answer: "if (x = 8)",
  },

  {
    quest: "Which will correctly select an element with an ID of #nacho?",
    choice: [
      "document.selector('nacho')",
      "document.querySelector('nacho')",
      "document.nacho",
      "nachoselector",
    ],
    answer: "document.querySelector('nacho')",
  },
];
// questions in arrays so they can be easily displayed and cycled through
function hidequestion() {
  button1.setAttribute("class", "hide");
  button2.setAttribute("class", "hide");
  button3.setAttribute("class", "hide");
  button4.setAttribute("class", "hide");
}
// used to get rid of the question boxes
function transition() {
  start.setAttribute("class", "hide");
  retry.setAttribute("class", "hide");
  button1.setAttribute("class", "unhide");
  button2.setAttribute("class", "unhide");
  button3.setAttribute("class", "unhide");
  button4.setAttribute("class", "unhide");
  scoredisplay.setAttribute("class", "unhide");
  initials.setAttribute("class", "hide");
  submit.setAttribute("class", "hide");
  highscoretable.setAttribute("class", "hide");
}
// used to hide and show the unneeded and needed content for the quiz
function highscoretransition() {
  start.setAttribute("class", "unhide")
  button1.setAttribute("class", "hide");
  button2.setAttribute("class", "hide");
  button3.setAttribute("class", "hide");
  button4.setAttribute("class", "hide");
  scoredisplay.setAttribute("class", "hide");
  initials.setAttribute("class", "hide");
  submit.setAttribute("class", "hide");
  clearscores.setAttribute("class", "unhide");
  highscoretable.setAttribute("class", "unhide");
  qdisplay.textContent = "High Scores";
  answerdisplay.textContent = "";
  timeleft.setAttribute("class", "hide");
  timeremain += 1000;
}
//used to go to the high score page
function unhidetimer() {
  timeleft.setAttribute("class", "unhide headerright");
}
// needed to unhide the timer, had an issue with doubling

function timer() {
  var timerInterval = setInterval(function () {
    timeremain--;
    timeleft.textContent = "Time Left: " + timeremain + " seconds";

    if (timeremain === 0) {
      clearInterval(timerInterval);
      hidequestion();
      qdisplay.textContent = "You ran out of time! Please try again";
    }
  }, 1000);
}
// timer for the quiz
function quiz() {
  qnum = 0;
  timeremain = 60;
  correct = 0;
  advance();
  scoredisplay.textContent = "";
}
// used to start the quiz and reset time/score/correct
function advance() {
  qdisplay.textContent = questions[qnum].quest;
  button1.textContent = questions[qnum].choice[0];
  button2.textContent = questions[qnum].choice[1];
  button3.textContent = questions[qnum].choice[2];
  button4.textContent = questions[qnum].choice[3];
}
// used to move through questions and display the questions that are in the array
function checkquestion(ans) {
  if (questions[qnum].answer === questions[qnum].choice[ans]) {
    correct++;
    answerdisplay.textContent = "Hell yeah! You got it!";
    scoredisplay.textContent = "Score: " + correct + "/5";
  } else {
    score--;
    timeremain -= 5;
    answerdisplay.textContent = "That is incorrect. You lost 5 seconds!";
  }
  qnum++;
  if (qnum < questions.length) {
    advance();
  } else {
    timeleft.setAttribute("class", "hide");
    timeremain += 1000;
    hidequestion();
    qdisplay.textContent =
      "You finished the quiz! Inital below and click submit to record your score, or retry!";
    retry.setAttribute("class", "unhide");
    answerdisplay.textContent = "";
    initials.setAttribute("class", "unhide");
    submit.setAttribute("class", "unhide");
  }
}
// adds to score, subtracts from time, ends the quiz when done and brings you to submit high score screen
function addhighscore(event) {
  event.preventDefault();
  if (initials === "") {
    alert("You must record your initials");
    return;
  } else {
    var playerscore = {
      Initials: initials.value,
      Score: correct + "/5",
    };
    localStorage.setItem("playerscore", JSON.stringify(playerscore));
    var hsadd = JSON.parse(localStorage.getItem("playerscore"));
    high1.textContent += hsadd.Initials + " " + hsadd.Score;
  }
  highscoretransition();
  start.setAttribute("class", "hide");
}
//adds high score 
function clearhighscores() {
  window.localStorage.removeItem("playerscore");
  high1.textContent = "";
}
// clear high score


start.addEventListener("click", quiz);
start.addEventListener("click", transition);
start.addEventListener("click", timer);
retry.addEventListener("click", quiz);
retry.addEventListener("click", transition);
retry.addEventListener("click", unhidetimer);
button1.addEventListener("click", () => checkquestion("0"));
button2.addEventListener("click", () => checkquestion("1"));
button3.addEventListener("click", () => checkquestion("2"));
button4.addEventListener("click", () => checkquestion("3"));
submit.addEventListener("click", function (event) {
  addhighscore(event);
});
clearscores.addEventListener("click", clearhighscores);
highscore.addEventListener("click", highscoretransition);
//event listeners to trigger functions