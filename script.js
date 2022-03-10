

const express = require("express");
const https = require("https");
const ejs = require("ejs");
const backupQuotes = require(__dirname + "/quotes.js");
// const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

let apiQuotes = [];

async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    https.get(apiUrl, function (response) {
      const chunks = []
      response.on('data', function (chunk) {
        chunks.push(chunk)
      })
      response.on('end', function () {
        const data = Buffer.concat(chunks);
        apiQuotes = JSON.parse(data);
      });
    });
  }
  catch (error) {
    console.log(error);
    apiQuotes = backupQuotes.localQuotes;

  }
};

getQuotes();

//TODO

app.get("/", function(req, res){

  let quoteNumber = Math.floor(Math.random() * apiQuotes.length);
  console.log(quoteNumber);
  res.render("quote.ejs", {
      quote: apiQuotes[quoteNumber].text,
      quoteAuthor: apiQuotes[quoteNumber].author,

  });
});

app.post("/", function(req, res){
  res.redirect("/");
});

app.post("/tweetQuote", function(req,res){
  const tweetURL = "https://twitter.com/intent/tweet?text="
  console.log(req.body.tweet);
  let quote = req.body.tweet
  let author = " - " + req.body.author
  console.log("TWITTER POST");

  res.redirect(tweetURL + quote);


})

app.listen(5500, function() {
  console.log("Server started on port 5500");
});
