//js
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var request = require("request");
var bandsInTown = ("bandsintown")
//for date format
var moment = require("moment");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");
//axios.get("")

//when users enters in request: "node liri.js concert-this <artist/band name here>"
function bands() {
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        var pbody = JSON.parse(body);
        if (!error && response.statusCode === 200) {
            pbody.forEach(function (element) {
                console.log("Venue name - " + element.venue.name);
                console.log("Venue Location - " +  element.venue.city + " , " +  element.venue.region + "  - " + element.venue.country);
                console.log("Date - " + moment(element.datetime).format("MM/DD/YYYY"));
            });
        }
    });
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
function movieThis() {
    // This line is just to help us debug against the actual URL.
    if (name === "") {
        name = "Mr. Nobody";
    }

    var queryUrl =
        "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            var pbody = JSON.parse(body);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Title - " + pbody.Title);
            console.log("Release Year: - " + pbody.Year);
            console.log("IMDB Rating - " + pbody.imdbRating);
            console.log("Rotten Tomatoes Rating - " + pbody.tomatoRating);
            console.log("Country where the movie was produced - " + pbody.Country);
            console.log("Language - " + pbody.Language);
            console.log("Plot - " + pbody.Plot);
            console.log("Actors - " + pbody.Actors);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
        }
    });
}
function doWhat() {
    if (command === " do-what-it-says"){
    fs.readFile("./random.txt", "utf-8", function(error, data){
if (error) throw error;
 });
}
}
fs.appendFile("random.txt", )