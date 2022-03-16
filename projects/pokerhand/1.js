(function () {
  //Shuffle the Cards
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(response => response.json())
    .then(json => {
      let deckID = json.deck_id;

      fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`)

        .then(response => response.json())
        .then(json => {

          console.log(json);
          json.cards.forEach(function (item, index) {
            const img = document.getElementById(`img${index + 1}`)
            img.src = item.image;
          })

      
          var values = [];
          for (var i = 0; i < json.cards.length; i++) {
            values[i] = json.cards[i].value;
            if (json.cards[i].value === 'JACK') {
              values[i] = '11';
            }

            if (json.cards[i].value === 'QUEEN') {
              values[i] = '12';
            }

            if (json.cards[i].value === 'KING') {
              values[i] = '13';
            }
          }



          values.sort(function (a, b) { return a - b });

          console.log(values)

          var suits = [];
          for (var i = 0; i < json.cards.length; i++) {
            suits[i] = json.cards[i].suit
          }
          suits.sort();
          console.log(suits)

          //    let unique =[...new Set(values)];
          let unique = values.filter((x, i, a) => a.indexOf(x) == i)

          console.log(unique)


          //Royal Flush
          if (values[0] === '10' && values[1] === '11' && values[2] === '12' && values[3] === '13' && values[4] === 'ACE') {
            for (var i = 0; i < 4; i++) {
              if (suits[i] !== suits[i + 1]) {
                break;
              }
            }
            if (i === 4) {
              var para = document.querySelector('#hand')
              para.innerHTML = `Royal Flush`;
            }
          }

          //Low Straight
          if (values[0] === 'ACE' && values[1] === '2' && values[2] === '3' && values[3] === '4' && values[4] === '5') {
            var para = document.querySelector('#hand')
            para.innerHTML = `Low Straight`;
          }

          //High Straight
          if (values[0] === '10' && values[1] === '11' && values[2] === '12' && values[3] === '13' && values[4] === 'ACE') {
            var para = document.querySelector('#hand')
            para.innerHTML = `High Straight`;
          }

          //straight

       for (var i = 0; i < 4; i++) {
        if (values[i + 1] - values[i] !== 1) {
          break;
        }
      }
      if (i === 4) {
        var para = document.querySelector('#hand')
        para.innerHTML = `straight`;
      }



          //Flush
          for (var i = 0; i < 4; i++) {
            if (suits[i] !== suits[i + 1]) {
              break;
            }
          }
          if (i === 4) {
            var para = document.querySelector('#hand')
            para.innerHTML = `Flush`;
          }

          //straight flush
          for (var i = 0; i < 4; i++) {
            if (suits[i] !== suits[i + 1] || values[i + 1] - values[i] !== 1) {
              break;
            }
          }
          if (i === 4) {
            var para = document.querySelector('#hand')
            para.innerHTML = `Straight Flush`;
          }


          //one pair
          if (unique.length === 4) {
            var para = document.querySelector('#hand')
            para.innerHTML = `one pair`;
          }


          if (unique.length === 3) {
            //two pair
              if (values[0] === values[1] && values[2] === values[3] && values[3]!== values[4]||
                values[0] === values[1] && values[3] === values[4] && values[1]!== values[2]||
                values[1] === values[2] && values[3] === values[4]&& values[0]!== values[1]) {
                var para = document.querySelector('#hand')
                para.innerHTML = `two pair`;
              }
              // triple
              else {
                var para = document.querySelector('#hand')
                para.innerHTML = `3 of kind`;
              }
          }


          if (unique.length === 2) {
            //four card
            if (values[0] !== values[1] || values[3] !== values[4]) {
              var para = document.querySelector('#hand')
              para.innerHTML = `four card`;
            }

            // full house
            if (values[0] === values[1] || values[3] === values[4]) {
              var para = document.querySelector('#hand')
              para.innerHTML = `full house`;
            }
          }
        })
    })
})();