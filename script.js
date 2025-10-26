const cardsArray = [
  {
    name: "hippo",
    icon: '<i class="fa-solid fa-hippo"></i>',
  },
  {
    name: "cow",
    icon: '<i class="fa-solid fa-cow"></i>',
  },
  {
    name: "dog",
    icon: '<i class="fa-solid fa-dog"></i>',
  },
  {
    name: "cat",
    icon: '<i class="fa-solid fa-cat"></i>',
  },
  {
    name: "fish",
    icon: '<i class="fa-solid fa-fish"></i>',
  },
  {
    name: "crow",
    icon: '<i class="fa-solid fa-crow"></i>',
  },
  {
    name: "hippo",
    icon: '<i class="fa-solid fa-hippo"></i>',
  },
  {
    name: "cow",
    icon: '<i class="fa-solid fa-cow"></i>',
  },
  {
    name: "dog",
    icon: '<i class="fa-solid fa-dog"></i>',
  },
  {
    name: "cat",
    icon: '<i class="fa-solid fa-cat"></i>',
  },
  {
    name: "fish",
    icon: '<i class="fa-solid fa-fish"></i>',
  },
  {
    name: "crow",
    icon: '<i class="fa-solid fa-crow"></i>',
  },
];
const btn = document.getElementById("btn");
//creating flipped cards array for which two card flipped
const flippedCards = [];
//once all cards are matched after this message should appears so that
let matchedPairs = 0;
shuffleCards();
// console.log(cardsArray);

//getting By the Id of parent div called gameBoard.
const gameBoard = document.getElementById("gameBoard");

displayCards();

function shuffleCards() {
  //looping through the last index of the cardsArray
  for (let i = cardsArray.length - 1; i >= 0; i--) {
    //finding the Random number upto the index of each iteration
    const randIndex = Math.floor(Math.random() * (i + 1));
    //changing the position of the cards index or storing each item or shuffle each item
    [cardsArray[i], cardsArray[randIndex]] = [
      cardsArray[randIndex],
      cardsArray[i],
    ];
  }
}

function displayCards() {
  //looping the cardArray for displaying the div and  select the element ,index , array
  cardsArray.forEach((ele, index, array) => {
    //Creating the card for element item in array
    const card = document.createElement("div");
    //setting id for Each
    card.setAttribute("id", index);
    //setting class for backside of the div
    card.classList.add("cardBack");
    // Adding class active because if the card became match it should not be displayed for the we remove the active for matchable card
    card.classList.add("active");
    //appending the div called card
    gameBoard.append(card);
    //Add EvenListener and once the card is clicked we call the flipCard function
    card.addEventListener("click", flipCard);
  });
}

function flipCard() {
  //This condition is for only two is to flipped more than two card are no flipped  upto 0,1
  // we check active class because once the card is match we made that to entire is no removed so it should be flipped if the cards are matched
  if (flippedCards.length < 2 && this.classList.contains("active")) {
    //this will act the entire div once i clicked the div it will get that div id and store it into cardId
    let cardsId = this.getAttribute("id");
    //pushing the entire div details to flippedCards array
    flippedCards.push(this);
    //removing the cardBack when card is clicked
    this.classList.remove("cardBack");
    //after removing we display icon to this(clicked div by getting id) and show the icon by their Id
    this.innerHTML = cardsArray[cardsId].icon;

    //once i clicked the cardBack If the flippedCard.length==2 means only it should otherwise it will not check
    if (flippedCards.length == 2) {
      //if length was 2 it will call checkMatch function we assign setTimeout because i clicked two cards after 1 sec only it will call the checkMatch function
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  //getting id from two cards in flippedCards array and stored in to variables
  const card1Id = flippedCards[0].getAttribute("id");
  const card2Id = flippedCards[1].getAttribute("id");
  //if  two cards in flippedArray.name(It should in cardsArray[Id].name)  will same means we wrote the conditon
  if (cardsArray[card1Id].name === cardsArray[card2Id].name) {
    //we remove active because once we found the match it will also clickable so we remove it entire div will remove
    flippedCards[0].classList.remove("active");
    //we remove active because once we found the match it will also clickable so we remove it entire div will remove
    flippedCards[1].classList.remove("active");

    //once the cards are matched we increase matchPairs so that we it because pairs array/2 it should call the checkGamerOver function
    matchedPairs++;
    //for every match we call the function
    checkGameOver();

    //if That not same means it should consider
  } else {
    flippedCards[0].innerHTML = " ";
    flippedCards[0].classList.add("cardBack");
    flippedCards[1].innerHTML = " ";
    flippedCards[1].classList.add("cardBack");
  }
  //completing if and else part we should empty the array
  flippedCards.length = 0;
}
function checkGameOver() {
  if (matchedPairs == cardsArray.length / 2) {
    //we have remove all the div in the gameBoard so that we display message by removing the game style and add new checklist and style it whatever we want
    // loops run through Until firstChild was not found ,it remove every firstChild through every Iteration
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    gameBoard.innerHTML = "You Won🍾🎊🎊";
    // I removed class attribute called game because In that class we style for whole div so that i don't need that
    gameBoard.classList.remove("game");
    //New class for message for styling
    gameBoard.classList.add("won");
  }
}

btn.addEventListener("click", restartGame);
function restartGame() {
  // Reset all game state
  gameBoard.innerHTML = ""; // remove all cards
  flippedCards.length = 0; // clear flipped array
  matchedPairs = 0; // reset matched count

  gameBoard.classList.remove("won");
  gameBoard.classList.add("game");

  // Shuffle and re-display the cards
  shuffleCards();
  displayCards();
}
