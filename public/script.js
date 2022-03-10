const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");
// loadingComplete();
loader.hidden = true;

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

};

// function loadingComplete() {
//     loader.hidden = true;
//     quoteContainer.hidden = false;

// };

newQuoteButton.addEventListener("click", loading);