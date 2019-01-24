require("dotenv").config();
// Load the fs package to read and write from do-what-it-says
var fs = require("fs");
// from movie-this
var axios = require("axios");
//from instructions
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);
var action = process.argv[2];//this is the type to spodify or omdb
var value = process.argv[3];//this will be the title of what they want to search

switch (action) {
  case "concert-this":
    concert();
    break;
  
  case "spotify-this-song":
    spotify();
    break;
  
  case "movie-this":
    movie();
    break;
  
  case "do-what-it-says":
    wahtItSays(); //this mispelling is intentional, tribute to Hank Hill
    break;
  }





  

function concert(){
var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
axios.get(queryUrl).then(  
  function(response){
  
   // console.log(response.data[0].datetime);
  //format the date to MM/DD/YYYY
    var a = response.data[0].datetime.split('-');
    var year = a[0];
    var month = a[1];
    var b = a[2].split('T');
    var day = b[0];
    var dateDisplay = month + "/" + day + "/" + year;


   console.log("==================================");
    console.log("Concert Name: " + response.data[0].venue.name);
    console.log("\nLocation: " + response.data[0].venue.city);
    //console.log("\n Concert Starts " + response.data[0].datetime.getMonth()+1 + "/" + response.data[0].datetime.getDate() + "/" + response.data[0].datetime.getFullYear());
    console.log("\nConcert Day: " + dateDisplay);
    console.log("==================================");
});
};// concert
  





function movie() {
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("\n Title: " + response.data.Title); //title
    console.log("\n Release Year: " + response.data.Year);  //year
    console.log("\n IMDB Raiting: " + response.data.imdbRating); //imdb
    console.log("\n Rotten Tomatoes Raiting: " + response.data.Ratings[1].Value); //rotten tomatoes
    console.log("\n Country Produced: " + response.data.Country); //country
    console.log("\n Language: " + response.data.Language); //language
    console.log("\n Plot: " + response.data.Plot); //plot
    console.log("\n Starring: " + response.data.Actors + "\n"); //actors

    //console.log(response);
  }
);
};// function movie