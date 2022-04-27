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
const container = document.querySelector('.game-space');
const cardContainer = document.getElementsByClassName('card');

const LIMIT = 5;
const MIN = 1;
const MAX = 15;

let randomNumContainer =[];
let userNumbers = [];
let cardID;

layOverGenerator();


buttonStart.addEventListener('click', initGame);

//FUNZIONE DI INIZIO GIOCO
function initGame(){

  container.innerHTML = '';
  randomNumContainer =[];
  userNumbers = [];
  
  buttonStart.classList.add('hide');
  //richiamo qui il Game area Generator
  gameAreaGenerator();
}


//TIMING FUNCION CON PROMPT
function timerPrompt(){



  for(let i = 0; i< LIMIT; i++){
    let checkNum = false;

    while(!checkNum){
      const userN = parseInt(prompt(`inserisci il ${i + 1}° numero`).trim());

      if(userNumbers.includes(userN)){
        alert('inserisci un numero differente!');
      }else if(isNaN(userN)){
        alert('inserisci un numero non lettere!');
      }else if(userN < 1 || userN > MAX ){
        alert(`inserisci un numero tra 1 e ${MAX}`)
      }else{
        userNumbers.push(userN);
        checkNum = true;
      }
    }

  }
  console.log('numeri utente', userNumbers);
  
  console.log(randomNumContainer, 'eccoci');

  //richiamo qui la funz di fine gioco
  endGameAction(userNumbers);

  return userNumbers;

}


//funzione di FINE GIOCO
function  endGameAction(userNumbers){

  let counter = 0;

  for( let i = 0; i< randomNumContainer.length; i++ ){

    if(userNumbers.includes(randomNumContainer[i])){
      counter++;
      console.log('counter', counter);
      //
      //
      //
    }
    
  }
  //richiamo qui la funzione che cìgenera il layover di fine
  creaLayover( counter);

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

//CARD PRINTER ---------------------
function cardPrinter(elementHtml){
  let randomN;
  let cardElement;

  //richiamo qui la funz genera num random
  randomN = uniqueRandomNum( LIMIT, MAX );
  
  for( let i = 0; i< randomN.length ; i++ ){

    //richiamo qui la funz crea card
    cardElement = cardGenerator(elementHtml);

    cardElement.innerHTML = `<span>${randomN[i]}</span>`;
    cardID = parseInt(cardElement.innerText);
    console.log(cardID, 'span della card');
    
  }

  setTimeout(timerPrompt, 5000);
  console.log('array card',cardContainer);
  
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
    console.log('numeri random',randomNumContainer);

    return randomNumContainer;
  
  }


  //funzioe crea layover
  function creaLayover( parametroN ){

    const layOver = document.createElement('div');
    layOver.className = 'output-area';
    container.append(layOver);
  
    if(parametroN !== LIMIT){
      layOver.innerHTML = `<h3>Hai indovinato  ${parametroN}  carte!</h3> <button type="button" id="btn-again" class="btn btn-warning text-uppercase mb-4">Ritenta!</button>`;

      const buttonNewGame = document.getElementById('btn-again');

      buttonNewGame.addEventListener('click', function(){
        container.innerHTML = '';
        buttonStart.classList.remove('hide');
      })

    }else{
      layOver.innerHTML = `<h3>bravo hai indovinato tutte le carte!</h3> `;
      buttonStart.classList.remove('hide');
      buttonStart.innerText = 'NUOVA PARTITA'
    }
    
  //  console.log(buttonNewGame, 'bottone!');

    return layOver;
  }


  function layOverGenerator(){

    const rule = document.createElement('div');
    rule.className = 'layover_game-rule';
    container.append(rule);
    const message = `<h2> Le regole del gioco: </h2><h4>Ti verranno mostrate ${LIMIT} carte, hai 4 secondi per ricordarle!</h4>`
    rule.innerHTML = message;

    setTimeout(() => {
      rule.classList.add('hide');
    }, 6000);
  }

 




