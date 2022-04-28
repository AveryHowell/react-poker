import logo from './logo.svg';
import './App.css';
import './components/card.style.scss'
import Deck from './deck_of_cards.json';
// import BasicCard from './components/card.component'; 

function App() {

  const shuffled = Deck.deck.sort(() => Math.random() - Math.random()); 

  const dealt = shuffled.slice(0, 2);
  const opponent = shuffled.slice(2, 4);

  const flop = shuffled.slice(6, 9);
  const river = shuffled.slice(9, 10);
  const turn = shuffled.slice(10, 11);

  var round;

  var highCard = getHighCard(dealt[0], dealt[1]);
  var lowCard = getLowCard(dealt[0], dealt[1]);
  

  var pf_tip = preFlopHandStrength(dealt[0], dealt[1], lowCard, highCard);
  var f_tip = flopHandStrength(dealt[0], dealt[1], flop[0], flop[1], flop[2]);


 return (

    <div className="App">
      <div className="row">
       {dealt.map((item, i) => (
       <div className={`card ${item.suit}`}>
              <div>{item.suit}</div>
              <div className="card-value">{item.value}</div>
          </div>
        
      ))}
    </div>

      <div className="action bg-black text-white">
          { pf_tip }
      </div>

      <div className="action bg-black text-white">
          { f_tip }
      </div>

      <div className="row">
      {flop.map((item, i) => (
       <div className={`flop card ${item.suit}`} onClick={(event) => { event.target.classList.remove('back')}}>
              <div>{item.suit}</div>
              <div className="card-value">{item.value}</div>
          </div>
        
      ))}
      
      {river.map((item, i) => (
       <div className={`river card back ${item.suit}`} onClick={(event) => { event.target.classList.remove('back')}}>
              <div>{item.suit}</div>
              <div className="card-value">{item.value}</div>
          </div>
        
      ))}
      
      {turn.map((item, i) => (
       <div className={`turn card back ${item.suit}`} onClick={(event) => { event.target.classList.remove('back')}} >
              <div>{item.suit}</div>
              <div className="card-value">{item.value}</div>
          </div>
        
      ))}

     
    </div>
   
    </div>
  );
}

function getHighCard(cardOne, cardTwo) {

  var highCard;

  if (cardOne.value > cardTwo.value) {
    highCard = cardOne.value;
  } else {
    highCard = cardTwo.value;
  } 
  return highCard;
}

function getLowCard(cardOne, cardTwo) {
  var lowCard;
  
  if (cardOne.value > cardTwo.value) {
    lowCard = cardTwo.value;
  } else {
    lowCard = cardOne.value;
  } 

  return lowCard;
}

function preFlopHandStrength(cardOne, cardTwo, lowCard, highCard) {

  var action = '';

  if (cardOne.suit == cardTwo.suit) {
    action += "Same suit" + "\n";
  } 

  if (cardOne.value == cardTwo.value) {
    action += "Pocket Pair " + "\n";
  }

  if (isNaN(cardOne.value) || isNaN(cardTwo.value)) {
    action += "Call" + "\n";
    return action;
  }

  if (highCard - 1 == lowCard) {
    action += "Straight Potential Call" + "\n";
  } else if (highCard == 9 && lowCard == 2) {
    action += "Fold" + "\n";
  } else if (highCard == 7 && action != '') {
    action += "Fold" + "\n";
  }

  if (action == '') {
    action += "Fold" + "\n";
    return action;
  } else {
    return action;
  }
}

function flopHandStrength(cardOne, cardTwo, cardThree, cardFour, cardFive) {

  var hand = [ cardOne, cardTwo, cardThree, cardFour, cardFive ].sort();

  var handTwo = [ cardOne, cardTwo, cardThree, cardFour, cardFive];

  for (let i = 0; i < 5; i++) {
    if (typeof hand[i] === 'object'  && !Array.isArray(hand[i] ) && hand[i]  !== null) {
      hand[i] = 1;
      handTwo[i] = 14;
    } else {
      hand[i] = hand[i].points;
    }
  }

  var f_tip = '';

  hand = hand.sort();

  console.log(hand);

  if (hand.every((value, j) => j === 0  || value === hand[j-1] + 1)) {
    f_tip += 'Straight';
  } else if (handTwo.every((value, j) => j === 0  || value === handTwo[j-1] + 1)) {
    f_tip += 'Straight';
  } 

  hand = [cardOne.suit, cardTwo.suit, cardThree.suit, cardFour.suit, cardFive.suit ]

  if (hand.every(item => item === hand[0])) {
    f_tip += 'Flush';
  }

 
  return f_tip;
  
}

export default App;
