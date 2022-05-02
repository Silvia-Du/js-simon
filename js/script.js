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
let cardElement;

//generatore di numeri random
/**
 * Genera un numero da un min a un max randomicamente
 * @param {num} min 
 * @param {num} max 
 * @returns 
 */
const randomNum = (min, max) => Math.floor(Math.random() * (max - min +1) + min);

//richiamo qui funz Rule
getRulelayover();

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


//GAME AREA GENERATOR
function gameAreaGenerator(){

  const gameArea = document.createElement('div');
  gameArea.className = 'game-area';
  container.append(gameArea);

  //richiamo qui il card Generator
  cardPrinter(gameArea);
 
  return gameArea;

}

//CARD PRINTER ----
function cardPrinter(elementHtml){
  let randomN;

  //richiamo qui la funz genera num random
  randomN = uniqueRandomNum( LIMIT, MAX );
  
  for( let i = 0; i< randomN.length ; i++ ){

    //richiamo qui la funz crea card
    cardElement = cardGenerator(elementHtml);
    cardElement.innerHTML = `<span>${randomN[i]}</span>`;
  }

  //richiamo qui funzioni con timer x prompt e card-Cover
  setTimeout(timerCardBlack, 5000);
  setTimeout(timerPrompt, 6000);
  console.log('array card',cardContainer);
  
}


//CARD GENERATOR
function cardGenerator(elementHtml){

  const card = document.createElement('div');
  card.className = 'card';
  elementHtml.append(card);

  return card;
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

  //richiamo qui la funz carte bianche
  timerCardWhite();

  //richiamo qui la funz di fine gioco
  endGameAction(userNumbers);

  return userNumbers;

}

//timer carte nere
function timerCardBlack(){

    for(let i = 0; i< cardContainer.length; i++){
      cardContainer[i].classList.add('black');
    }  

}



// carte bianche
function timerCardWhite(){

  for(let i = 0; i< cardContainer.length; i++){
    
    cardContainer[i].classList.remove('black');
    
  }
}


//funzione di FINE GIOCO
function  endGameAction(userNumbers){

  let counter = 0;
  for( let i = 0; i< randomNumContainer.length; i++ ){

    if(userNumbers.includes(randomNumContainer[i])){
      counter++;

      for(let ix= 0; ix< cardContainer.length; ix++){

        if(parseInt(cardContainer[ix].innerText)=== randomNumContainer[i]){
          cardContainer[ix].classList.add('azure');
        }  
      }
    }
    
  }

  for(let i = 0; i< cardContainer.length; i++){

  }
  //richiamo qui la funzione che genera il layover di fine
  getLayoverEndGame( counter);
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


  //Crea Layover di fine partita
  /**
   * genera il layover che contiene il messagio di fine partia con la vincita o in parametroN di carte indovinate
   * @param {num} parametroN 
   * @returns 
   */
  function getLayoverEndGame( parametroN ){

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
    return layOver;
  }

  //GAME RULES
  /**
   * genera un layover all'apertura della pagina che contiene le regole e poi scompare.
   */
  function getRulelayover(){

    const rule = document.createElement('div');
    rule.className = 'layover_game-rule';
    container.append(rule);
    const message = `<h2> Le regole del gioco: </h2><h4>Ti verranno mostrate ${LIMIT} carte, hai 4 secondi per ricordarle!</h4>`
    rule.innerHTML = message;

    setTimeout(() => {
      rule.classList.add('hide');
    }, 6000);
  }

 




