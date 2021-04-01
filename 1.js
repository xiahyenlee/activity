(function() {
  const myQuestions = [
    {
      question: "How many fingers are on the foot of a man?",
      answers: {
        a: "one",
        b: "Five",
        c: "Three"
       },
      correctAnswer: "c" 
    
    },
    {
      question: "Whose face was said to have launched 1000 ships?",
      answers: {
        a: "Rowan Atkinson",
        b: "Barbara Mori",
        c: "Helen of Troy"
      },
      correctAnswer: "c"
    },
    {
      question: "Water boils at 212 degrees on which temperature scale?",
      answers: {
        a: "Kelvin",
        b: "Fahrenheit",
        c: "Celsius",
       
      },
      correctAnswer: "b"
    },
    {
      question: "What is the Italian word for pie?",
      answers: {
        a: "Pie",
        b: "Lasagna",
        c: "Pizza",
       
      },
      correctAnswer: "c"
    },
     {
      question: "What was Marilyn Monroe's natural hair colour?",
      answers: {
        a: "Ginger",
        b: "Blue",
        c: "Brown",
       
      },
      correctAnswer: "a"
    },
     {
      question: "Which two metals is pewter made from?",
      answers: {
        a: "Copper and Bronze",
        b: "Tin and lead.",
        c: "Zinc and gold",
       
      },
      correctAnswer: "b"
    },
     {
      question: "What takes place in Hong Kong's Happy Valley?",
      answers: {
        a: "Monkey racing",
        b: "Dog racing.",
        c: "Horse racing",
       
      },
      correctAnswer: "c"
    },
     {
      question: "Which country does the sport of pelato come from?",
      answers: {
        a: "Portugal",
        b: "Spain",
        c: "Italy",
       
      },
      correctAnswer: "b"
    },
     {
      question: "How many sides, in total, would three triangles and three rectangles have?",
      answers: {
        a: "21",
        b: "19",
        c: "12",
       
      },
      correctAnswer: "a"
    },
     {
      question: "Who invented the bikini?",
      answers: {
        a: "Gianni Versace",
        b: "Louis Reard.",
        c: "Dolce Gabbana",
       
      },
      correctAnswer: "b"
    },
  ];

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
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
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

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();