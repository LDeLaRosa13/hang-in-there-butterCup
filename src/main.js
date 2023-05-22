// Query Selector Variables 👇
var mainPage = document.querySelector('.main-poster');
var savePage = document.querySelector('.saved-posters')
var formPage = document.querySelector('.poster-form');

var singleImage = document.querySelector('.poster-img');
var title = document.querySelector('.poster-title');
var quote = document.querySelector('.poster-quote');

var savePosterButton = document.querySelector('.save-poster');
var showSavedButton = document.querySelector('.show-saved');
var showRandomButton = document.querySelector('.show-random');
var makePosterButton = document.querySelector('.show-form');
var backToMainButton = document.querySelector('.back-to-main');
var showMyPosterButton = document.querySelector('.make-poster');
var nvmBackToMainButton = document.querySelector('.show-main');

var userInputImage = document.querySelector('#poster-image-url');
var userInputTitle = document.querySelector('#poster-title');
var userInputQuote = document.querySelector('#poster-quote');

var savedGrid = document.querySelector('.saved-posters-grid')

// Website assets 👇
var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];
var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];
var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];
var savedPosters = [];
var currentPoster;

// Event Listeners 👇
document.addEventListener('DOMContentLoaded', showRandomPoster)
showRandomButton.addEventListener('click', showRandomPoster)
makePosterButton.addEventListener('click', function () {
  displayCorrectPage(formPage, mainPage)
})
showSavedButton.addEventListener('click', function() {
displayCorrectPage(savePage, mainPage)
displaySavedPosters()
})
backToMainButton.addEventListener('click', function () {
   displayCorrectPage(mainPage, savePage)
})
nvmBackToMainButton.addEventListener('click', function() {
  displayCorrectPage(mainPage, formPage)
})
savePosterButton.addEventListener('click', saveAnyPoster)
showMyPosterButton.addEventListener('click', function (event){
  event.preventDefault()
  displayUserInputPoster()
})
savePage.addEventListener('dblclick', function(event){
  deleteSaved(event)
})

// Functions and Event Handlers 👇
function getRandomIndex(array) {
  var indexPosition =  Math.floor(Math.random() * array.length)
  return array[indexPosition]
}

function createPoster(imageURL, title, quote) {
  return {
    id: Date.now(), 
    imageURL: imageURL, 
    title: title, 
    quote: quote}
  }
  
  function displayCorrectPage(pageToShow, pageToHide) {
    pageToShow.classList.remove('hidden')
    pageToHide.classList.add('hidden')
  }

  function showRandomPoster() {
    currentPoster = createPoster(getRandomIndex(images), getRandomIndex(titles), getRandomIndex(quotes))
    singleImage.src = currentPoster.imageURL
    title.innerText = currentPoster.title
    quote.innerText = currentPoster.quote
  }

  function displayUserInputPoster() {
    currentPoster = createPoster(userInputImage.value, userInputTitle.value, userInputQuote.value)
    singleImage.src = currentPoster.imageURL
    title.innerText = currentPoster.title
    quote.innerText = currentPoster.quote
    
    images.push(userInputImage.value)
    titles.push(userInputTitle.value)
    quotes.push(userInputQuote.value)

    displayCorrectPage(mainPage, formPage)
}

function saveAnyPoster() {
  var isDuplicate = false
  for (var i = 0; i < savedPosters.length; i++) {
    if (savedPosters[i].id === currentPoster.id) {
      isDuplicate = true
      return;
    }
  } if (!isDuplicate) {
      savedPosters.push(currentPoster)
  }
}

function displaySavedPosters() {
  displayCorrectPage(savedGrid, mainPage)

  savedGrid.innerHTML = ''
  for (var i = 0; i < savedPosters.length; i++) {
    savedGrid.innerHTML +=
      `<article class="mini-poster" id= "${savedPosters[i].id}">
      <img src="${savedPosters[i].imageURL}" alt="user generated poster">
      <h2>${savedPosters[i].title}</h2>
      <h4> ${savedPosters[i].quote}</h4>
      </article>`
  }
}

function deleteSaved (event) {
  for (var i = 0; i < savedPosters.length; i++) {
    if(event.target.closest("article").id === savedPosters[i].id.toString()) {
      savedPosters.splice(i, 1)
    }
  }
    displaySavedPosters()
}

