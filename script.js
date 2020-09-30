// DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quote From API
async function getQuote() {
  loading();

  const proxyUrl = 'https://aqueous-ridge-58033.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // Check Quote Length to Determine Styling
    if (data.quoteText.length > 60) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    // Set Quote, Author and Hide Loader
    quoteText.textContent = data.quoteText;
    authorText.textContent = data.quoteAuthor ? data.quoteAuthor : 'Unknown';

    complete();
  } catch (error) {
    getQuote();
    console.log(error.message);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
