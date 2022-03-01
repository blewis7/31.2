// Part One:
// 1
let favoriteNumber = 13;
let numURL = "http://numbersapi.com";

async function favNumFact(num){
    let res = await axios.get(`${numURL}/${num}/?json`);
    console.log(res.data.text);
}

favNumFact(13);

// 2
let favoriteNumbers = [13, 1, 27];

async function favNumsFacts(arr){
    for(let num of arr){
        let res = axios.get(`${numURL}/${num}/?json`);
        let resp = await res;
        console.log(resp.data.text);
    };
};

favNumsFacts(favoriteNumbers);

// 3
factTypes = ['trivia', 'year', 'date', 'math'];

async function fourFavNumFacts(num){
    for(let fact of factTypes){
        let res = await axios.get(`${numURL}/${num}/${fact}?json`);
        $("ul").append(`<li>${res.data.text}</li>`)
    };   
};

fourFavNumFacts(favoriteNumber);


// Part Two:
// 1
let cardURL = "http://deckofcardsapi.com/api/deck";

async function drawOneCard(){
    let { data } = await axios.get(`${cardURL}/new/draw`);
    console.log(`${data.cards[0].value.toLowerCase()} of ${data.cards[0].suit.toLowerCase()}`); 
};

drawOneCard();

// 2
async function drawTwoCards(){
    let { data: firstCard } = await axios.get(`${cardURL}/new/draw`);
    let deckId = firstCard.deck_id;
    let { data: secondCard } = await axios.get(`${cardURL}/${deckId}/draw`);
    console.log(`${firstCard.cards[0].value.toLowerCase()} of ${firstCard.cards[0].suit.toLowerCase()}`); 
    console.log(`${secondCard.cards[0].value.toLowerCase()} of ${secondCard.cards[0].suit.toLowerCase()}`); 
};

drawTwoCards();

// 3
let $btn = $('button');
let $img = $('img');
deckId = null;

async function shuffledDeck() {
    let res = await axios.get(`${cardURL}/new/shuffle/`);
    deckId = res.data.deck_id;
}

shuffledDeck();

$btn.on("click", async function(){
    let res = await axios.get(`${cardURL}/${deckId}/draw`);
    let cardSrc = res.data.cards[0].image;
    $img.attr("src", cardSrc);
    if (res.data.remaining === 0){
        $btn.remove();
    };
});
