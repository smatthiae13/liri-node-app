//js
require("dotenv").config();

var keys = require ("./keys.js");
var spotify = new Spotify(keys.spotify);

var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var request = require("request");
var bandsInTown = ("bandsintown")
//for date format
var moment = require("moment");
var command = process.argv[2];
var input = process.argv[3];
//axios.get("")

//when users enters in request: "node liri.js concert-this <artist/band name here>"
function concertThis(artist) {
  if (!command) {
      console.log("Band name not found");
  } else if (command === "concert-this") {
      var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(URL).then()
    }


  
  
    // if (command === "concert-this") {
   //     var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
   //     console.log(queryUrl);
   //     request(queryUrl, function(error, response, body) {
   //         
   //     })
   // }
}

//when user enters in request: `node liri.js spotify-this-song '<song name here>'`. we pull the info from Spotify
function spotifyThis() {
    if (name = "") {
        name = "The sign Ace of Base";
    }
else (command === "spotify-this-song"); {
    spotify.search({
        type: "track",
        query: input,
        
    }),
function (err, data) {
    if (err) {
        console.log("error occurred: " + err);
        return;
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("artists name: ", + data.tracks.items[0].album.artists[0].name);
console.log("Song name: ", + data.tracks.items[0].name);
console.log("A preview link of the song from Spotify: ", + data.tracks.items[0].preview_url);
console.log("The album the song is from: " + data.tracks.items[0].album.name);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}
}
}
fs.appendFile("random.txt", )