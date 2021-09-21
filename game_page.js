function Question(text, choices, answers) {
  this.text = text;
  this.choices = choices;
  this.answer = answers;
}

Question.prototype.correctAnswer = function (choices) {
  return choices === this.answer;
}
function quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
}

quiz.prototype.guess = function(answer) {
  
  if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
  }    
  
     this.questionIndex++;
}
function populate() {
  if (quiz.isEnded()) {
      showScores();  
  }
  else {
      //show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;
      
      //show choices
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i< choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i])
      }
        
      showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHtml = "<h1>Result</h1>"; 
  gameOverHtml += "<h2 id='score'> Your scores: " + quiz.score+ "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
}

var questions = [
  new Question("Sam started with 20 marbles and added 50 more every week until she had 220 altogether. How many weeks did that take?", ["A.2","B.5","C.6","D.4"], "D.4"),
  new Question("If Sage started with 45 apples, and then added 25 apples every day for 3 days, how many apples did he end up with?", ["A.130", "B.115","C.120","D.125"], "C.120"),
  new Question("Helga is climbing stairs in such a way that she goes up 2 steps at a time. She is standing on the third step now. On which step will she be after she moves up 3 times?", ["A.9", "B.8", "C.6", "D.5"],"C.6"),
  new Question("What is the next number in this sequence?120, 145, 170, ___", ["A.205","B.195","C.196","D.200"], "B.195"),
  new Question("If Sam started with 5,000 coins, and then added 1,000 coins every day for 3 days, how many coins did she end up with?", ["A.5300", "B.7000", "C.8000", "D.7003"], "C.8000") 
]

var quiz = new quiz(questions);

populate();