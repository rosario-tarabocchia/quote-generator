

const express = require("express");
const https = require("https");
// const ejs = require("ejs");
// const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

const apiUrl = "https://type.fit/api/quotes";
const apiQuotes = [];


// app.set('view engine', 'ejs');



//TODO

app.get("/", function(req, res){


  res.sendFile(__dirname + "/index.html");
  

});

app.post("/", function(req, res){
  console.log("IN GET 1")
  https.get(apiUrl, function (response) {
    console.log("IN GET 2")
    console.log("Status Code", response.statusCode);
    // console.log("Headers", response.body);
    const chunks = []
    response.on('data', function (chunk) {
      chunks.push(chunk)
      // console.log(chunks);
    })
    response.on('end', function () {
      const data = Buffer.concat(chunks)
      var got = JSON.parse(data)
      // Try this one out as well
      // res.json(got)
      console.log(got);
    })
  });


});

app.listen(5500, function() {
  console.log("Server started on port 5500");
});
