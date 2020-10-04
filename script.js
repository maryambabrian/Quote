const quoteContainer = document.getElementById('qoute-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('newQuote');
const loader = document.getElementById('loader')


let apiQuote = [];

//show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

//Show New Quote
function newQuote() {
    loading()
    //Pick a Random quote
    const i = Math.floor(Math.random() * apiQuote.length)
    const quote = apiQuote[i];

    //check if author field is blank
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //if the quote is so long
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //set the quote and hide loader
    quoteText.textContent = quote.text;
    complete();
}

// get quote from API
async function getQoute() {
    // const proxyApi = 'https://cors-anywhere.herokuapp.com/'
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        newQuote();
        complete();
        throw new Error
    } catch (error) {
        console.log('whoops', error);
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//On Load
getQoute();