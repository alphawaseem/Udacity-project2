/*
 * Create a list that holds all of your cards
 */

const iconsList = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
			  'fa-anchor', 'fa-anchor',
			  'fa-bolt', 'fa-bolt', 
			  'fa-cube', 'fa-cube',
			  'fa-leaf', 'fa-leaf',
			  'fa-bicycle', 'fa-bicycle', 
			  'fa-bomb', 'fa-bomb'
            ];

	const cardsContainer = document.querySelector('.deck');
	let openedCards = [];
	let matchedCards = [];

/*
 *  initialize the game
 */
	 function init(){
		 const icons = shuffle(iconsList);
		//create the cards
		 for(let i=0; i < icons.length; i++){
		 const card = document.createElement('li');
		 card.classList.add('card');
		 card.innerHTML = `<i class="fa ${icons[i]}"></i>`;
		 cardsContainer.appendChild(card);
		 //add click event to each card
		  click(card);
		 }
   } 

/*
 * Timer set up
 */	
	 const timerContainer = document.querySelector('.timer');
	 let liveTimer,
	     totalSeconds = 0;
		timerContainer.innerHTML = totalSeconds;
	 //create startTimer function
	 
	 function startTimer(){
		liveTimer = setInterval(function(){
			totalSeconds++;
			timerContainer.innerHTML = totalSeconds;
		},1000); 	 
		 
	 }
	 
// first click
	 let isFirstClick = false;
	 
/*
 * click event
 */	
	 
    function click(card){	 
	 //card click event
	 card.addEventListener('click',function(){
		//console.log(card.innerHTML);
		
        //we have opened cards
            const currentCard = this;
			const previousCard = openedCards[0];		
		// The First Click? Start the timer!
		if(isFirstClick){
			startTimer();
			isFirstClick = false;
		}
		if(openedCards.length === 1){
			
			card.classList.add('open','show','disable')
			openedCards.push(this); 
			
			//we should compare our 2 opened cards
			compare(currentCard,previousCard);
			
		}else{
			//we don't have opened cards
			card.classList.add('open', 'show','disable'); 
		    openedCards.push(this); 
		}
        
            
		 
	 });
	 
}

/*
  * Compare the 2 cards
  */
   function compare(currentCard, previousCard){
	     //Match
		 if(currentCard.innerHTML === previousCard.innerHTML){
				//console.log('match');
				//matched
				currentCard.classList.add('match');
				previousCard.classList.add('match');
				matchedCards.push(currentCard, previousCard);
				
				openedCards = [];
				//check if the game is over
				isOver();
			}else{
				//console.log('no match');
				//wait 500ms before doing this
				setTimeout(function(){
				currentCard.classList.remove('open','show','disable');
				previousCard.classList.remove('open','show','disable');
				
			 },500);
			  openedCards = [];
			}
	    //Add new move
		addMove();
   }

	 	 
 /*
  * Check if the game is over
  */
 function isOver(){
	 if(matchedCards.length === iconsList.length){
		 alert('GAME OVER');
	 }
	 
	//stop the Timer
	stopTimer();
 }
 /*
  * Add moves
  */
 const moveContainer = document.querySelector('.moves');
 let moves = 0;
 moveContainer.innerHTML = 0;
 function addMove(){
	 moves++;  //increment move
	 moveContainer.innerHTML = moves; //update no of moves
	 rating(); //set the rating after each move
 }
 
 /*
  * Rating
  */
  const starsContainer = document.querySelector('.stars');
  starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
	function rating(){
		if (moves < 25){
			starsContainer.innerHTML =  `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		}else if(moves > 25){
			starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
		}else{
			starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		}
	}
 
 /*
  * Restart button
  */
  
  const restartBtn = document.querySelector('.restart');
  restartBtn.addEventListener('click',function(){
	  //Delete all cards
	  cardsContainer.innerHTML = "";  //empty
	  
	  //Call 'init' to create new cards
	    init();
		
	  
				
				
				
  });
  
  function reset(){
	  //Reset any related variables
	    //empty matched cards
	     matchedCards = [];
        //reset moves 
		 moves = 0;
		 moveContainer.innerHTML = moves;
		// reset rating 
		 starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
		//reset the timer		
	    stopTimer();
        isFirstClick = True;
        totalSeconds = 0;
        timerContainer.innerHTML = totalSeconds + 's';
  }
 
 /////Start the game for the first time
  init();
  
  
 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



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