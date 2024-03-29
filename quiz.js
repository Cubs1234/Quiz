(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question:
        "Who holds the record for the longest losing streak in MLB history?",
      answers: {
        A: "Cubs",
        B: "The Red Sox",
        C: "Philadelphia Athletics",
        D: "Louisville Colonels"
      },
      correctAnswer: "d"
    },
    {
      question: "What actor played for the Cubs(MLB) and Boston Celtics(NBA)?",
      answers: {
        A: "John Wayne",
        B: "Chuck Connors",
        C: "Fred Astair",
        D: "Mickey Rooney"
      },
      correctAnswer: "b"
    },
    {
      question: "How many ways are there to make it to first base in baseball?",
      answers: {
        A: "5",
        B: "6",
        C: "7",
        D: "8"
      },
      correctAnswer: "d"
    },
    {
      question: "What is the longest game in MLB history",
      answers: {
        A: "12 innings",
        B: "23 innings",
        C: "25 innings",
        D: "33 innings"
      },
      correctAnswer: "c"
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
