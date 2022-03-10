// Loader Script

const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");

loader.hidden = true;

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

newQuoteButton.addEventListener("click", loading);