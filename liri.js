require("dotenv").config();
// Load the fs package to read and write from do-what-it-says
var fs = require("fs");
// from movie-this
var axios = require("axios");
//from instructions
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2]; //this is the type to spodify or omdb
var value = process.argv[3]; //this will be the title of what they want to search

switch (action) {
  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    spotifyFunc();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    wahtItSays(); //this mispelling is intentional, tribute to Hank Hill
    break;
};







function concert() {
  var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";
  axios.get(queryUrl).then(
    function (response) {

      // console.log(response.data[0].datetime);
      //format the date to MM/DD/YYYY
      var a = response.data[0].datetime.split('-');
      var year = a[0];
      var month = a[1];
      var b = a[2].split('T');
      var day = b[0];
      var dateDisplay = month + "/" + day + "/" + year;

    // console.log(response.data[0].venue);
      
      console.log("==================================");
      console.log("Concert Name: " + response.data[0].venue.name);
      console.log("\nLocation: " + response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
      console.log("\nConcert Day: " + dateDisplay);
      console.log("==================================");
    });
}; // concert




function spotifyFunc() {
  if (value === undefined) {
    spotify.search({
      type: "track",
      query: "the sign",
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("==================================");
      console.log("Song Name: " + data.tracks.items[9].name);
      console.log("\nPerformed By: " + data.tracks.items[9].artists[0].name);
      console.log("\nPreview can be Found Here: " + data.tracks.items[9].preview_url);
      console.log("\nInitially Relased on the Album: " + data.tracks.items[9].album.name);
      console.log("==================================");

    });
  } else {

    spotify.search({
      type: "track",
      query: value,
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log("==================================");
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("\nPerformed By: " + data.tracks.items[0].artists[0].name);
      console.log("\nPreview can be Found Here: " + data.tracks.items[0].preview_url);
      console.log("\nInitially Relased on the Album: " + data.tracks.items[0].album.name);
      console.log("==================================");
    });
  };


}; //spotify






function movie() {
  // Then run a request with axios to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("==================================");
      console.log("\n Title: " + response.data.Title); //title
      console.log("\n Release Year: " + response.data.Year); //year
      console.log("\n IMDB Raiting: " + response.data.imdbRating); //imdb
      console.log("\n Rotten Tomatoes Raiting: " + response.data.Ratings[1].Value); //rotten tomatoes
      console.log("\n Country Produced: " + response.data.Country); //country
      console.log("\n Language: " + response.data.Language); //language
      console.log("\n Plot: " + response.data.Plot); //plot
      console.log("\n Starring: " + response.data.Actors + "\n"); //actors
      console.log("==================================");

      //console.log(response);
    }
  );
}; // function movie



function wahtItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    input = data.split(",");
    action = input[0];
    value = input[1];

    console.log(action);

    if (action.trim() === "concert-this") {
      concert();
    } else if (action.trim() === "spotify-this-song") {
      spotifyFunc();
    } else if (action === "movie-this") {
      movie();
    } else {
      console.log("Put in a workable format")
    };

  });
}; //function wahtItSays()