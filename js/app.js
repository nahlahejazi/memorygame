/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const DECK = document.getElementById('deck');
const OPENEL = document.body.getElementsByClassName('open');
const SHAKEL = document.body.getElementsByClassName('shake');
const MATCHEL = document.body.getElementsByClassName('match');
const STARS = document.getElementsByClassName('stars')[0];
const seconds = document.getElementById('seconds');
const minutes = document.getElementById('minutes');
let intervalTrigger = null;
let CARDS = DECK.children;
let arr = Array.prototype.slice.call(CARDS, 0 );
let totalSeconds = 0;


const click = (e) => {
//function(e) the e inside the function is event to detect what event

    //Checks if clicked element is a li
    if(e.target.tagName ==='LI' && !e.target.classList.contains('match')) {
        flipCard(e);
    }
}
// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    shuffleCards(array);
}
// function that shows the face of the card
const flipCard = (e) => {
    e.target.classList.toggle('open');
    e.target.classList.toggle('show');
}

//
const shuffleCards = (array) => {
    //THIS FOR LOOP COUNTS ALL THE CHILDREN OF DECK AND REMOVES THEM
    for (let i = 0; i < DECK.childElementCount; i+0) {
        DECK.removeChild(DECK.firstChild);
    }
    //THIS FOR LOOP ADDS THE SHUFFLED cards
    for (let i = 0; i < array.length; ++i) {
        DECK.appendChild(arr[i]);
    }
}

const faceAllCardsDown = () => {
    for (let i = 0; i < DECK.children.length; ++i) {
        DECK.children[i].classList.remove('open');
        DECK.children[i].classList.remove('show');
        DECK.children[i].classList.remove('match');

    }
}

const faceCardDown = (el) => {
    el[0].classList.remove('show');
    el[0].classList.remove('open');
    el[0].classList.remove('show');
    el[0].classList.remove('open');
}

const timer = () => {

    intervalTrigger = setInterval(() => setTime(seconds, minutes), 1000);
 
}

const setTime = (sec, min) => {
  ++totalSeconds;
  sec.innerHTML = pad(totalSeconds % 60);
  min.innerHTML = pad(parseInt(totalSeconds / 60));
}

const modalTime = (sec, min) => {
   const modalTime = document.getElementById('time');

   modalTime.textContent = min.textContent +":"+ sec.textContent;
}

const pad = (val) => {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

const starRating = (moves) => {

    if (moves >= 25) {
        
            STARS.children[1].children[0].classList.remove('fa-star');
            STARS.children[1].children[0].classList.add('fa-star-o');
        
    }
    else if (moves >= 15) {
        
            STARS.children[2].children[0].classList.remove('fa-star');
            STARS.children[2].children[0].classList.add('fa-star-o');
        
    }

};

const starReset = () => {
    
        for (let i = 0; i < 3; i++) {
            STARS.children[i].children[0].classList.remove('fa-star-o');
            STARS.children[i].children[0].classList.add('fa-star');
        }

    
}

const countMoves = () => {
    let moves = document.getElementsByClassName('moves')[0];
    moves.textContent = Number(moves.textContent) + 1;
    document.getElementsByClassName('moves')[1].textContent = moves.textContent;
    starRating(moves.textContent);
    gameComplete();
}

const restart = (arr) => {
    let moves = document.getElementsByClassName('moves')[0];
    moves.textContent = 0;
    faceAllCardsDown();
    shuffle(arr);
    starReset();
    seconds.innerHTML = "00";
    minutes.innerHTML = "00";
    document.getElementById('game').style.display = "flex";
    document.getElementById('modal').style.display = "none";
    totalSeconds = -1;
    if (intervalTrigger) {
        clearInterval(intervalTrigger);
        intervalTrigger = null;
    }
}

const gameComplete = () => {
    let stars = document.getElementsByClassName('stars')[0];
    let stars2 = document.getElementsByClassName('stars')[1];
    if (MATCHEL.length == DECK.children.length) {
        document.getElementById('game').style.display = "none";
        document.getElementById('modal').style.display = "block";
        stars2.innerHTML = stars.innerHTML;
        modalTime(seconds, minutes);
    }
}

const shake = (el1, el2) => {
    el1.classList.add('shake');
    el2.classList.add('shake');
    setTimeout(function(){
        el1.classList.remove('shake');
        el2.classList.remove('shake');
    }, 500);
}

const verifyCard = () => {
        if (OPENEL[0].children[0].classList[1] == OPENEL[1].children[0].classList[1]) {
            OPENEL[0].classList.add('match');
            OPENEL[1].classList.add('match');
            OPENEL[0].classList.remove('show');
            OPENEL[0].classList.remove('open');
            OPENEL[0].classList.remove('show');
            OPENEL[0].classList.remove('open');
             DECK.removeEventListener('click', click);
        } else {
            shake( OPENEL[0], OPENEL[1] );
            setTimeout(faceCardDown(OPENEL), 2000);
             DECK.removeEventListener('click', click);
        }
        
}

(function(){
/*
*ADDS Evenet Listener on CARD element to detect which cards are being pressed
*/
shuffle(arr);
//THIS ADDEVENTLISTENER LISTENS TO CLICKS MADE IN THE BODY
document.body.addEventListener('click', function(e) { // Should change transform this into function
    //CHECKS IF THE TARGET CLICKED HAS A PARENT WITH A CLASS RESTART
    if (e.target.parentElement.className === 'restart' || e.target.className === 'restart') {
        restart(arr);
    }
    if (!intervalTrigger) {
        timer();

    }

    //Checks facing up cards, if greater than 2 and not matched, facedown
    if (OPENEL.length === 0 && SHAKEL.length === 0) {
        DECK.addEventListener('click', click);


        if(e.target.tagName ==='LI' && !e.target.classList.contains('match')) {
            flipCard(e);
        }


    } else if (OPENEL.length === 2 && e.target.classList[1] === 'open') {
        setTimeout(verifyCard, 1000);
        setTimeout(countMoves, 1000);

    }

    if (OPENEL.length >= 2 || SHAKEL.length > 0 ) {
        DECK.removeEventListener('click', click);
    }

})


})();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */