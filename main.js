
// A true or false trivia game that takes questions from the Open Trivia Database API (https://opentdb.com/)
// The user can determines the category and the difficulty
// The user is given 10 questions and is scored based on how many they get right
// Append the api url with the category and difficulty using the categoryString and difficultyString variables
// Once the user has selected their category and difficulty, the form will disappear and the game will begin
// using "element.style.display = 'none';" the start of the game will be hidden 
// Once the user has seleted their answer, the buttons will disappear and the next question will appear
// If the user gets the question right, the score will increase by 1 
// While the number of questions asked is equal to or less than 10, the game continues
// The user can play again by clicking the play again button that appears under the score 


const form = document.querySelector('form');
// variable assigned to document query selector form //
const gameDiv = document.getElementById('game');
// variable assigned to document get element by id game //
let apiUrl = 'https://opentdb.com/api.php?amount=10&type=boolean';
// Variable assigned to the form within the api //

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Adding eventListener to the start game button (submit) //
  const category = document.getElementById('category').value;
  // Select the category by assigning variable to the category drop down menu //
  const difficulty = document.getElementById('difficulty').value;
  // Select the dificulty by assigning variable to the difficulty drop down menu //
  const categoryString = `&category=${category}`;
  // Assigning the variable categoryString with the value that will use later to append the API URL //
  const difficultyString = `&difficulty=${difficulty}`;
  // Assigning the variable difficultyString with the value that will use later to append the API URL //
  apiUrl += categoryString + difficultyString;
  // Appening the URL with categorySrtring with difficultyString //
   fetch(apiUrl)
  // Fetching the API //
    .then(response => response.json())
    .then(data => {
    // parce the data into json //
    // the data is an object with a results array //
    // the results array contains objects with the question, correct answer, and incorrect answers //
      let score = 0;
      let currentQuestion = 0;
      // Setting the current score and question to zero //
      const questions = data.results;
      // Set variable constant to the results array //
      showQuestion();
      // Calling the function showQuestion that we haven't yet set //
      function showQuestion() {
        // Function that will show the question //
        if (currentQuestion >= questions.length) {
          endGame();
          return;
        }
        // If statement for ending the game. A length of 10 questions has been hardcoded for the sake of simplicity//
        const question = questions[currentQuestion];
        // questions is array from API //
        // question is where we store data the API selected from the array //
        const questionText = question.question;
        // questionText is the question from the API that we can display to the user using DOM //
        const questionDiv = document.createElement('div');
        // Created variable called questionDIV that is assigned to the document.createElement using DOM //
        questionDiv.innerHTML = questionText;
        // Changes the text of the questionDiv to the questionText //
        gameDiv.appendChild(questionDiv);
        // Appends the questionDiv to the gameDiv which has already been created //
        const answerDiv = document.createElement('div'); 
        // Created variable called answerDiv that is assigned to the document.createElement using DOM //
        const resetButton = document.createElement('button');
        // Creating a button to allow the user to reset the game //
        resetButton.innerHTML = 'Reset';
        // setting the text of the button to sat "Reset" //
        resetButton.addEventListener('click', () => {
          // ON CLICK, the reset button will reload the page //
        location.reload();
        // This method reloads the current document //
        });
        const trueButton = document.createElement('button');
        // Creating the true button //
        trueButton.innerHTML = 'True';
        // Setting the text of the true button to "True" //
        trueButton.addEventListener('click', () => {
          // Adding event listener to the true button //
          if (question.correct_answer === 'True') {
            score++;
          }
          // If the question is correct, the score will increase by 1 //
          currentQuestion++;
          // The quiz will move onto the next question by incrementing the currentQuestion by 1 //
          clearQuestion();
          // Calling the function clearQuestion. This is set up later on in the code as a means of clearning the now answered question from the screen//
          showQuestion();
          // This calls the showQuestion function again to display the next question //
        });

        answerDiv.appendChild(trueButton);
        // Adds the true button to the answerDiv we made in line 71 using DOM //
        answerDiv.appendChild(resetButton);
        const falseButton = document.createElement('button');
        falseButton.innerHTML = 'False';
        falseButton.addEventListener('click', () => {
          if (question.correct_answer === 'False') {
            score++;
          }
          currentQuestion++;
          clearQuestion();
          showQuestion();
        });
        answerDiv.appendChild(falseButton);
        gameDiv.appendChild(answerDiv);
      }
        // Same again, but this time for the false button //

      function clearQuestion() {
        while (gameDiv.firstChild) {
          gameDiv.removeChild(gameDiv.firstChild);
        }
      }
      // This function clears the question from the screen once the user has answered it. It does this by removing the first child of the gameDiv until there are no more children left //
      // While is got a child, remove the child //



      


      function endGame() {
        clearQuestion();
        // Clearing the screen to display the score //
        const scoreDiv = document.createElement('div');
        // Creating a div to display the score //
        scoreDiv.innerHTML = `You scored ${score} out of 10`;
        // Setting the text of the scoreDiv we just created to the score the user got from the quiz//
        gameDiv.appendChild(scoreDiv);
        // appending that to the gameDiv //
        const playAgainButton = document.createElement('button');
        // Creating a button to allow the user to play again //
        playAgainButton.innerHTML = 'Play again';
        // Setting the text of the button to "Play again" //
        playAgainButton.addEventListener('click', () => {
          location.reload();
        });
        // Adding an event listener to the button that will reload the page when clicked //
        gameDiv.appendChild(playAgainButton);
        // Appending the button to the gameDiv //
      
      }
    });
  form.style.display = 'none';
  // This hides form (variable) once the user has selected their category and difficulty //
}); 