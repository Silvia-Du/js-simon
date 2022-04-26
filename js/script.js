/*
**Descrizione:**
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 5 secondi.
Dopo 5 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/

//creo in js l'area gioco e le card al premersi del pulsante

//prompt deve partire dopo 5 secondi
//il prompt chiede i numeri, che vengono salvati in un array.

//parte tutto con un pulsante, che deve sparire quando parte tutto.
//ci deve essere un generatore di 5 numeri casuali
//devo assegnare i numeri alle card
//li stampo nelle card
//mi serve un'array che raccolga i numeri delle card
//confronto i numeri dell'utente con quelli randomici
//se sono giusti le card indovinate si illuminano
//esce una scritta con la quantità dei numeri corrispondenti indovinati + 
//un pulsante che chiede se si vuole ripartire.

const buttonStart = document.getElementById('btn-start');
const container = document.querySelector('.game');
const LIMIT = 5;
const MIN = 1;
const MAX = 15;
let cardContainer = [];
let randomNumContainer =[];
let userNumbers = [];

buttonStart.addEventListener('click', initGame);

function initGame(){

  buttonStart.classList.add('hide');
  //richiamo qui il Game area Generator
  gameAreaGenerator();
  setTimeout(timerPrompt, 5000);
}


//TIMING FUNCION CON PROMPT
function timerPrompt(){
  for(let i = 0; i< LIMIT; i++){
    let checkNum = false;

    while(!checkNum){
      const userN = parseInt(prompt('inserisci un numero'));
      if(!userNumbers.includes(userN)){
        userNumbers.push(userN);
        checkNum = true;
      }else{
        alert('inserisci un numero differente!')
      }
    }

  }
  console.log('numeri utente', userNumbers);

}


//GAME AREA GENERATOR
function gameAreaGenerator(){

  const gameArea = document.createElement('div');
  gameArea.className = 'game-area';
  container.append(gameArea);

  //richiamo qui il card Generator
  cardPrinter(gameArea);
 
  return gameArea;

}

//CARD PRINTER
function cardPrinter(elementHtml){
  let cardElement;
  let randomN;
  console.log();

  //richiamo qui la funz genera num random
  randomN = uniqueRandomNum( LIMIT, MAX );
  
  for( let i = 0; i< randomN.length ; i++ ){

    //richiamo qui la funz crea card
    cardElement = cardGenerator(elementHtml);

    cardContainer.push(cardElement);
    cardElement.innerHTML = `<span>${randomN[i]}</span>`;

  }

  console.log(cardContainer);

}


//CARD GENERATOR
function cardGenerator(elementHtml){

  const card = document.createElement('div');
  card.className = 'card';
  elementHtml.append(card);

  return card;
}


//generatore di numeri random

  function randomNum( min , max ){
    return Math.floor(Math.random() * (max - min +1) + min);
  }

//genera numero univoco
  function uniqueRandomNum( LIMIT, MAX ){

    let estractNumber;
    let selected;
  
    for( let i = 0; i< LIMIT; i++ ){
      let check = false;
    
      while(!check){
        estractNumber = randomNum(1, MAX);
  
        if(!randomNumContainer.includes(estractNumber)){
          check = true;
          randomNumContainer.push(estractNumber);
          selected = estractNumber;
        }
      }
    
    }
    console.log(randomNumContainer);

    return randomNumContainer;
  
  }





