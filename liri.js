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
function switchStatement() {
    switch (command) {
        case "movie-this":
            getMovie();
            break;
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            getSong();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    }
}
var input = process.argv.slice(3).join(" ");

function getMovie() {

    //get user input
    var movie = input;

    //return error if user does not enter a movie
    if (!movie) {
        console.log("ERROR: You did not enter a movie. Try Mr.Nobody");
        movie = "mr+nobody"
    } else {
        movie = movie.trim().replace(" ", "+");
    }
}
//search OMBD API for movie
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=584a2704";
request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        var movieData = [
            "Movie title: " + data.Title,
            "Released: " + data.Year,
            "IMDB Rating: " + data.Ratings[0].Value,
            "Rotten Tomatoes Rating: " + data.Ratings[1].Value,
            "Produced in: " + data.Country,
            "Language(s): " + data.Language,
            "Plot: " + data.Plot,
            "Actors: " + data.Actors
        ].join("\n\n");

        fs.appendFile("random.txt", movieData + "\n---------------------------\n", function (err) {
            if (err) throw err;
            console.log("---------------------------\n" +
                movieData +
                "\n---------------------------");
        });
    }
});

//Bands in Town-------------------------------------------------------------


function concertThis() {
    var artist = input;

    if (!artist) {
        console.log("You did not provise an artist");
    } else {
        artist = artist.trim();
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            var formatTime = moment(data[0].datetime.slice(0, 10), "YYYY-MM-DD").format("dddd MMMM Do, YYYY");
            var artistData = [
                "Venue Name: " + data[0].venue.name,
                "Venue Location: " + data[0].venue.city + "," + data[0].venue.country,
                "Date" + formatTime,
            ].join("\n\n");

            fs.appendFile("random.txt", artistData + "\n-------------" + function (err) {
                if (err) throw err;
                console.log("Next show for: " + artist + "\n\n" + artistData +
                    "\n---------------------------");
            });
        }
    });
}
//Spotify this song--------------------------------------------------------------

//when user enters in request: `node liri.js spotify-this-song '<song name here>'`. we pull the info from Spotify
function getSong() {
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    //grab user input
    var song = input;

    if (!song) {
        console.log("ERROR: You did not enter a song. Try 'The Sign by The Ace of Base'");
        song = "the sign ace of base";
    } else {
        song = song.trim();
    }

    spotify.search({
        type: track,
        query: song
    },
    function(error, data) {
        if (error) {
            return console.log("ERROR: " + error);
        }
        var name = data.tracks.items[0].name;
        var artist = data.tracks.items[0].artist[0].name;
        var album = data.tracks.items[0].album.name;
        var preview = data.tracks.items[0].preview_url;
        var songData = [
            "Artists: " + artist,
            "Name: " + name,
            "Album: " + album,
            "Preview link: " + preview
        ].join("\n\n");

        fs.appendFile("random.txt", songData + "\n--------------\n" + function(err) {
            if (err) throw err;
            console.log("----------------\n" + songData + "\n----------------");
        });
    });
}

//Do What is says-------------------------------------------------------
            
function doWhatItSays() {


    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(("ERROR: " + error);
        }
        else {
            var array = data.split(',');
            console.log(array);
            command = array[0];
            input = array[1];
            switchStatement();

        }
    });

}

