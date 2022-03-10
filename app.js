const express = require("express");
const https = require("https");
const ejs = require("ejs");
const backupQuotes = require(__dirname + "/quotes.js");

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
  } catch (error) {
    console.log(error);
    apiQuotes = backupQuotes.localQuotes;

  }
};

getQuotes();

app.get("/", function (req, res) {

  let quoteNumber = Math.floor(Math.random() * apiQuotes.length);
  console.log(quoteNumber);
  res.render("quote.ejs", {
    quote: apiQuotes[quoteNumber].text,
    quoteAuthor: apiQuotes[quoteNumber].author,

  });
});

app.post("/", function (req, res) {
  res.redirect("/");
});

app.post("/tweetQuote", function (req, res) {
  const tweetURL = "https://twitter.com/intent/tweet?text="
  let quote = req.body.tweet
  res.redirect(tweetURL + quote);
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);