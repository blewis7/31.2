baseURL = "http://numbersapi.com";
favNum = 13;

// Part One:
// 1
let firstPromise = axios.get(`${baseURL}/${favNum}/?json`);

firstPromise
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

// 2
let favoriteNums = [13, 1, 27];

for (num of favoriteNums){
    let secondPromise = axios.get(`${baseURL}/${num}/?json`)
    secondPromise
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
};

// 3
factTypes = ['trivia', 'year', 'date', 'math'];

for(type of factTypes){
    let thirdPromise = axios.get(`${baseURL}/${favNum}/${type}?json`)
    thirdPromise
        .then(data => $("ul").append(`<li>${data.data.text}</li>`))
        .catch(err => console.log(err));
};


// Part Two:
// 1
let cardURL = "http://deckofcardsapi.com/api/deck";

let card = axios.get(`${cardURL}/new/draw/`)
card
    .then(res => {
        console.log(`${res.data.cards[0].value.toLowerCase()} of ${res.data.cards[0].suit.toLowerCase()}`)
        console.log(res.data)
    })
    .catch(err => console.log(err))

// 2
let firstCard = null;
card
    .then(res => {
        firstCard = res.data.cards[0];
        let deckId = res.data.deck_id;
        return axios.get(`${cardURL}/${deckId}/draw`);
    })
    .then(res => {
        let secondCard = res.data.cards[0];
        [firstCard, secondCard].forEach(function(card){
            console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
        });
    })
    .catch(err => console.log(err))

// 3
let $btn = $('button');
let deckId = null;
let $img = $('img')

let shuffleCards = axios.get(`${cardURL}/new/shuffle/`)
shuffleCards
    .then(res => {
        deckId = res.data.deck_id
    })
    .catch(err => console.log(err))

$btn.on("click", function(){
    let drawCard = axios.get(`${cardURL}/${deckId}/draw/`)
    drawCard
        .then(res => {
            imageSrc = res.data.cards[0].image;
            $img.attr("src", imageSrc);
            if (res.data.remaining === 0){
                $btn.remove();
            }
        })
});



    



