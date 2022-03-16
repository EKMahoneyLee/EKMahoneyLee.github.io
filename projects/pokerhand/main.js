
(function (){
  //Shuffle the Cards
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(response =>response.json())
  .then(json => {
  let deckID = json.deck_id;

  //Draw a Card
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`) 

// fetch('https://www.mikecaines.com/cards/royalflush.json')
// fetch('https://www.mikecaines.com/cards/straightflush.json')
// fetch('https://www.mikecaines.com/cards/fourofakind.json')
// fetch('https://www.mikecaines.com/cards/fullhouse.json')
// fetch('https://www.mikecaines.com/cards/flush.json')
// fetch('https://www.mikecaines.com/cards/highstraight.json')
// fetch('https://www.mikecaines.com/cards/lowstraight.json')
// fetch('https://www.mikecaines.com/cards/threeofakind.json')
// fetch('https://www.mikecaines.com/cards/twopair.json')
// fetch('https://www.mikecaines.com/cards/pair.json')
// fetch('https://www.mikecaines.com/cards/acehigh.json')

  .then(response =>response.json())
  .then(json => {

  //Display images in the webpage
  json.cards.forEach(function(item, index) {
    const img = document.getElementById(`img${index+1}`)
    img.src = item.image;   
  })


  //Replace string to number
  let sortedValue =[];
  json.cards.forEach(function(item,index){
    sortedValue[index] = parseInt((item.value).replace('JACK', "11").replace('QUEEN', "12").replace('KING', "13").replace('ACE', "14"));
  })

  //Replace string to number
  let sortedValue1 =[];
  json.cards.forEach(function(item,index){
    sortedValue1[index] = parseInt((item.value).replace('JACK', "11").replace('QUEEN', "12").replace('KING', "13").replace('ACE', "1"));
  })


  //Sort numbers --small number to large
  sortedValue.sort((function(a, b){return a-b}));
  sortedValue1.sort((function(a, b){return a-b}));

  //Fine straight
  function sum(arr){
    let total = 0;
    for(let i=0;i<arr.length-1;i++){
      if(arr[i+1]-arr[i]===1)
        total++;
    } return total;
  }

  // All suits match
  if(json.cards.every( (val, i, arr) => val.suit === arr[0].suit)){
    // and number from 10 ~ 14(ACE)
    if(sortedValue[0] === 10 && sortedValue[1] === 11 && sortedValue[2] === 12 && sortedValue[3] === 13 && sortedValue[4] ===14)
    {    
      document.getElementById('hand').innerHTML = `Royal Flush🤑🤑🤑🤑🤑`;
    }

    //suits match and straight 
    else if(sum(sortedValue)===4){
      document.getElementById('hand').innerHTML = `Straight Flush🤑🤑🤑🤑🤑`;
    }


    //When only suits match
    else{
      let hand = document.getElementById('hand');
      hand.innerHTML = `Flush `;
    }
  }  

  // if the sum is 4 
  else if(sum(sortedValue)===4 || sum(sortedValue1)===4){
    document.getElementById('hand').innerHTML = `straight😍😍😍😍😍`;
  }

  
  else{
    let unique = [...new Set(sortedValue)];
    // if 2 items of unique mean there 3 and 2 same cards 
    if(unique.length == 2){
      if(sortedValue[0] === sortedValue[1] && sortedValue[3] === sortedValue[4]){
        document.getElementById('hand').innerHTML = `Full House😄😄😄😄😄`;
      }

    // if 2 items of unique mean there 4  same cards and 1 different card
      else{
        document.getElementById('hand').innerHTML = `Four Card😎😎😎😎😎`;
      }
    }

    // if 3 items of unique mean there 3 and 1 different and 1different
    if(unique.length == 3){
      if((sortedValue[0]!==sortedValue[1] && sortedValue[3]!==sortedValue[4]) ||
        ((sortedValue[0]!==sortedValue[1] && sortedValue[1]!==sortedValue[2])) ||
        ((sortedValue[2]!==sortedValue[3] && sortedValue[3]!==sortedValue[4]))){
          document.getElementById('hand').innerHTML = `triple🤔🤔🤔🤔🤔`;
          }
      // if 3 items of unique mean there 2 same and 2same and 1 different
      else{
        document.getElementById('hand').innerHTML = `Two Pair🤔🤔🤔🤔🤔`;
      }
    }

    // if 4 items of unique mean there 2 same and 1 different and 1 different and 1 different
    if(unique.length == 4){
      document.getElementById('hand').innerHTML = `One Pair😔😔😔😔😔`;
    }

    // if 5 item of unique mean all 5 cards are different
    if(unique.length == 5){
      document.getElementById('hand').innerHTML = `Oh! Michael! It is time for Home!!!!😰😰😰😰😰`;
    }
  }})
})})();