//#region Psuedo code - 1st Draft
/*
1. Get Data
1.1 Connect with API
   - We need our apikey=[yourkey]&
   - end-point: /movie
   - Final url: https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>
1.2 Get user's name to invite to play quiz game --(STRETCH)
2. Use Data (inside a loop)
2.1 Determine our questions
2.2 Select one random movie
2.3 Get correct and wrong answers and store to an answerArray
2.4 Get 4 incorrect answers and store to the answerArray
2.5 Do a check with user answer for correct stored variable answer
   - If answer is correct them score++
   - Confirm your answer (button)
   - If question number is equal 10: Send to end game page
   - Else: Next question
3. Display Data
3.1 Display data into the question page
3.2 Display green icon for correct answers
3.3 Display red cross for incorrect answers
3.4 Display score in question page
3.5 Display final score into end game page
*/
//#endregion
// Creating the Namespace Object
const app = {};
// Global Variables
app.apiUrl = "https://api.themoviedb.org/3";
app.apiKey = "00c9d839153d1b6c3b376514c7334065";
app.player = {
    name: 'player1',
    score: 0,
    answer: 0,
}
//#region specific functions
// Method to return a random number until a max value
app.getRandomNumber = (maxId) => {
    return Math.floor(Math.random() * maxId);
}
// Method to return a random number inside a range
app.getRandomNumberFromInterval = (min) => {
    return Math.floor(Math.random() * (2022 - min + 1) + min);
}
app.getUserName = () => {
    app.userName = app.userNameElement.value;
    return app.userName;
}
app.getQuestion = () => {
    const index = app.getRandomNumber(app.questions.length - 1);
    return app.questions[index];
}
app.checkAnswers = () => {
    if (parseInt(app.player.answer) === app.answer) {
        app.player.score++;


        app.messageH4.innerHTML = `
      Congrats, you are super smart!
      Your score is now ${app.player.score}
      `
        // app.scoreCounter.innerHTML = `
        // Score: ${app.player.score}
        // `
        app.messageParent.appendChild(app.messageH4);
        // messageParent.appendChild(app.scoreCounter);
        console.log("right answer (from checkAnswers)", app.messageH4);
        // console.log("score right (from checkAnswers)", app.scoreCounter);
    } else {
        app.player.score;
        app.messageH4.innerHTML = `
      Sorry, no points for you, try again!
      Your score is now ${app.player.score}
      `

        app.messageParent.appendChild(app.messageH4);
        // messageParent.appendChild(app.scoreCounter);
        console.log("wrong answer (from checkAnswers)", app.messageH4);
        // console.log("score wrong (from checkAnswers)", app.scoreCounter);
    }
}
// Method to get 5 Answers. 1 correct and 4 incorrect
app.getAnswers = (movie) => {
    console.log('mov', movie);
    console.log('zz', movie.release_date);
    // 2.3 Get correct and wrong options and store to an answerArray
    app.answerArray = [];
    app.answer = parseInt(movie.release_date.substring(0, 4));
    console.log(app.answer);
    app.answerArray.push(app.answer);
    // // // // console.log("right answer (from getAnswer)", app.answer);
    // // // // console.log("first movie object (from getAnswer)", movie);
    // 2.4 generate 4 incorrect answers
    for (let wa = 1; wa <= 4; wa++) {
        let newWrongAnswer = app.getRandomNumberFromInterval(app.answer - 10);
        // Check if wrong answer already exists in the array
        while (app.answerArray.includes(newWrongAnswer)) {
            newWrongAnswer = app.getRandomNumberFromInterval(app.answer - 10);
        }
        app.answerArray.push(newWrongAnswer);
    }
    app.answerArray.sort();
    console.log("-------END GET ANSWER--------------");                                  // Theo
    // app.displayQandA(movie);
    return app.answerArray;
}
// Method to display the Question and the 5 answer options and the buttons
app.displayQandA = (movie) => {
    // Clean div.quiz
    app.startButtonElement.classList.add('btnDisappear');
    app.nextButtonElement.classList.add('btnAppear');
    app.quizDivElement.innerHTML = '';
    app.answerArray = [];
    // movie = {};
    // // Calling the async func getPopularMovies                                //Already exist in init   (NOW we have 2 movies)
    // const getNewMovie = getPopularMovies(movie);
    // // // // // console.log("new movie (from displayQandA", getNewMovie)            

    // Calling the app.getAnswers()
    const answersOptions = app.getAnswers(movie);
    console.log('Answer Options (from displayQandA):', answersOptions);
    app.getPoster(movie);
    //Display Options
    const movieDescription = `    
    <section class="quizParent" id="quizParent">
      <h3>When was the release date for this movie poster shown?</h3>
      <h4>${app.movieTitle}</h4>
      <div class="quizChild">
          <img src="" alt="" id="moviePoster" class="moviePoster">
        <div class="quizOptions">
          <div class="quizChoices">
            <input type="radio" id="choiceText1" class="choiceOption" name="choice" value="${app.answerArray[0]}">
            <label for="choiceText1">${app.answerArray[0]}</label>
          </div>
          <div class="quizChoices">
            <input type="radio" id="choiceText2" class="choiceOption" name="choice" value="${app.answerArray[1]}">
            <label for="choiceText2">${app.answerArray[1]}</label>
          </div>
          <div class="quizChoices">
            <input type="radio" id="choiceText3" class="choiceOption" name="choice" value="${app.answerArray[2]}">
            <label for="choiceText3">${app.answerArray[2]}</label>
          </div>
          <div class="quizChoices">
            <input type="radio" id="choiceText4" class="choiceOption" name="choice" value="${app.answerArray[3]}">
            <label for="choiceText4">${app.answerArray[3]}</label>
          </div>
          <div class="quizChoices">
            <input type="radio" id="choiceText5" class="choiceOption" name="choice" value="${app.answerArray[4]}">
            <label for="choiceText5">${app.answerArray[4]}</label>
          </div>   
          <div class="textConfirmation">
              <p id="answerConfirmation">Please select an option!</p>
          </div> 
        </div>
        </section>
  `
    app.quizDivElement.innerHTML = movieDescription;
}
//#endregion
//#region GameLogic
app.startGame = () => {
    //event listener for the start button
    app.startButtonElement.addEventListener("click", function () {
        console.log('Game Started');
        console.log('Score', app.player.score);
        document.querySelector('h2').innerHTML = '';
        app.messageH4.innerHTML = '';
        //Get 1st Movie
        const movie = app.getPopularMovies();
        console.log('Start Start', movie);
        // 1.2 get the userName
        app.getUserName();
        // // // // console.log('Player Name:', app.getUserName());
        // 2.1 get Question
        const quest = app.getQuestion();
        // Append Question
        const question = document.createElement('h2');
        question.innerText = quest;
        // // // // console.log('Question:', question.innerText);
        // Call 1st Question - Done in init()
        // console.log('1st Movie (from startGame)', movie);
        // // // // // // // // selecting poster with random movie
        // // // // // // // app.getPoster(movie);

        // Display QandA
        // app.displayQandA(movie);

        // Empty the answerArray and Radio buttons
        // app.answerArray = [];
        // // // // document.querySelectorAll(".choiceOption").checked = "false";  
        // // // app.radioButtonElements.querySelectorAll(".choiceOption").checked = "false"; 

        // Call nextQuestioButton Event Listener
        app.nextQuestion();
        // Call checkPlayersRadioButtonSelection Event Listener
        app.checkPlayersRadioButtonSelection();

        console.log(`--------------END startGame------------------
      `);
    });
    app.nextQuestion = () => {
        app.nextButtonElement.addEventListener("click", function () {
            console.log("--------------START nextQuestion------------------");        //THEO same as startGame 
            // console.log("movie (from start of nextQuestion)", app.newMovieObject);
            app.newMovieObject = app.getPopularMovies();
            console.log('Is this the new movie', app.newMovieObject);
            // app.nextButtonElement.disabled = false; 
            app.nextButtonElement = document.getElementById('nextQuestion');

            // // // // // // // app.getPoster();
            // app.displayQandA(app.newMovieObject);
            // console.log("movie 1after displayQandA (from nextQuestion)", app.newMovieObject);
            // Call checkPlayersRadioButtonSelection Event Listener
            app.checkPlayersRadioButtonSelection();

            // console.log('Score: BBB', app.player.score);
            // setInterval(1000);
            console.log(`--------------END nextQuestion------------------
      `);
        });
    }
    app.checkPlayersRadioButtonSelection = () => {
        document.querySelector('.quizOptions').addEventListener('change', function (event) {
            console.log('START CHECK ---------------------------------')
            let usersOptionInForm = event.target;

            app.anwserConfirmationElement = document.getElementById('answerConfirmation');
            console.log('xxxxxxx', app.anwserConfirmationElement);
            app.anwserConfirmationElement.innerText = `
      You have selected ${usersOptionInForm.value}. To check your 
      answer please press Next Question.`;
            app.checkAnswers();
            //  app.nextButtonElement.disabled = false; 
        });
    }
}
//#endregion
//#region Get Popular Movies
app.getPopularMovies = () => {
    //GETTING RANDOM NUMBER FOR THE PAGE
    const pageNumber = app.getRandomNumber(100);
    const movieEndPoint = `${app.apiUrl}/discover/movie`;
    const movieUrl = new URL(movieEndPoint);
    movieUrl.search = new URLSearchParams({
        api_key: app.apiKey,
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: pageNumber,
    });
    // const movieSelection = await fetch(movieUrl)
    // const movieData = await movieSelection.json();
    fetch(movieUrl)
        .then((response) => {
            return response.json();
        })
        .then((movieData) => {
            console.log(movieData);
            //2.2 select random movie
            app.popularMovies = movieData.results;
            // console.log(app.popularMovies);
            const randomMovieObj = app.popularMovies[Math.floor(Math.random() * app.popularMovies.length)];
            // console.log(randomMovieObj);

            // Creating movieId and movieTitle variable to reuse for poster data
            app.movieId = randomMovieObj.id;
            app.movieTitle = randomMovieObj.title;
            // app.getPoster();
            app.displayQandA(randomMovieObj);
            // app.getAnswers(randomMovieObj);
            // app.startGame(randomMovieObj);
            // app.nextQuestion(randomMovieObj);
        });

    // return randomMovieObj;
}
//#endregion
//#region GETPOSTER
app.getPoster = () => {
    app.moviePosterUrl = `${app.apiUrl}/movie/${app.movieId}/images`;
    const posterUrl = new URL(app.moviePosterUrl);
    posterUrl.search = new URLSearchParams({
        api_key: app.apiKey,
    })
    fetch(posterUrl)
        .then((response) => {
            return response.json();
        })
        .then((results) => {
            const filePath = results.posters[0].file_path;
            const posterPath = `https://image.tmdb.org/t/p/original/${filePath}`;
            const randomPoster = document.querySelector('.quizChild img');
            randomPoster.src = posterPath;
            randomPoster.alt = `${app.movieTitle} poster image.`;
            randomPoster.append();
        })
}
//#endregion
app.init = () => {
    // getPopularMovies();

    app.popularMovies = [];
    // app.userName;
    // app.answer;

    app.questionType1 = "When was the release date for this movie poster shown?";
    app.questionType2 = "abc";
    app.questionType3 = "def";
    app.questionType4 = "ghi";
    app.questions = [
        app.questionType1,
        app.questionType2,
        app.questionType3,
        app.questionType4,
    ];
    // THERE IS A NAME FOR THIS ???????????????
    app.userNameElement = document.querySelector('input');
    app.startButtonElement = document.getElementById('startButton');
    app.nextButtonElement = document.getElementById('nextQuestion');
    app.nextButtonElement.classList.add('btnDisappear');
    app.quizDivElement = document.getElementById('quiz');
    app.errorElement = document.getElementById('errorMessage');
    app.questionElement = document.querySelector('h3');
    app.messageParent = document.querySelector('.quizResult');
    app.messageH4 = document.createElement('h4');

    app.startGame();
    // app.radioButtonElements = document.querySelector(".quizOptions");
}
app.init();