var qdisplay = document.querySelector("#qdisplay");
var button1 = document.querySelector("#c1");
var button2 = document.querySelector("#c2");
var button3 = document.querySelector("#c3");
var button4 = document.querySelector("#c4");
var start = document.querySelector("#start");
var timeleft = document.querySelector("#time");
var timeremain = 60;
var answerdisplay= document.querySelector("#answer");
var scoredisplay = document.querySelector("#score");
var qnum = 0;
var correct = 0;
var questions = [
  {
    quest: "What would you use to store multiple values in a single variable?",
    choice: ["Number","Oxen","Value","Array"],
    answer: "Array"
  },

  {
    quest: "How long did it take Brendan Eich to create JavaScript?",
    choice: ["17 years", "4 hours", "10 days", "2 months"],
    answer: "10 days"
  },

  {
    quest: "How do you recognize a function?",
    choice: ["an ! after the named word", "() after the named word", "is a function after the named word", "function = named word"],
    answer: "() after the named word"
  },

  {
    quest: "Which If statement correctly notates that x is equal to 8",
    choice: ["(if) x is 8", "if x = 8", "if (x != 8)", "if (x = 8)"],
    answer: "if (x = 8)"
  },

  {
    quest: "Which will correctly select an element with an ID of #nacho?",
    choice: ["document.selector('nacho')", "document.querySelector('nacho')", "document.nacho", "nachoselector"],
    answer: "document.querySelector('nacho')"
  }
];


function hidequestion() {
button1.setAttribute("class", "hide");
button2.setAttribute("class", "hide");
button3.setAttribute("class", "hide");
button4.setAttribute("class", "hide");
}

function transition() {
  start.setAttribute("class", "hide");
    button1.setAttribute("class", "unhide");
    button2.setAttribute("class", "unhide");
    button3.setAttribute("class", "unhide");
    button4.setAttribute("class", "unhide");
    score.setAttribute("class", "unhide")
}

function timer() {
  var timerInterval = setInterval(function () {
    timeremain--;
    timeleft.textContent = "Time Left: " + timeremain + " seconds";

    if (timeremain === 0) {
      clearInterval(timerInterval);
      hidequestion();
      score.setAttribute("class", "hide")
      qdisplay.textContent = ("You ran out of time! Please try again");
    }
  }, 1000);
}

function quiz() {
  qnum = 0;
  timer();
  advance();
}

function advance() {
qdisplay.textContent = questions[qnum].quest;
button1.textContent = questions[qnum].choice[0];
button2.textContent = questions[qnum].choice[1];
button3.textContent = questions[qnum].choice[2];
button4.textContent = questions[qnum].choice[3];
  }


function checkquestion(ans) {
  if (questions[qnum].answer === questions[qnum].choice[ans]) {
    correct++;
    answerdisplay.textContent = "Hell yeah! You got it!";
    scoredisplay.textContent = ("Score: " + correct + "/5");
  } else { 
    score--;
    timeremain -= 5;
    answerdisplay.textContent = ("That is incorrect. You lost 5 seconds! The correct answer was" + questions[qnum].answer.textContent)
  }
  qnum++;
  if (qnum < questions.length) {
    advance();
  } else {
    hidequestion();
  }
  }



start.addEventListener('click', quiz);
start.addEventListener('click', transition);
button1.addEventListener('click', () => checkquestion("0"));
button2.addEventListener('click', () => checkquestion("1"));
button3.addEventListener('click', () => checkquestion("2"));
button4.addEventListener('click', () => checkquestion("3"));
