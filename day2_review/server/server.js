const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

// Data
var numbers = [
    1, 2, 5, 2, 5, 7, 4
];
var stoplight_color = "RED";
setInterval( function ( ) {
    if ( stoplight_color == "RED" ) {
        stoplight_color = "GREEN";
    } else if ( stoplight_color == "GREEN" ) {
        stoplight_color = "YELLOW";
    } else if ( stoplight_color == "YELLOW" ) {
        stoplight_color = "RED";
    }
}, 5000 );
var movies_all = [
    "What about Bob?",
    "Avengers",
    "Once Upon a Time in Hollywood",
    "Avatar The Last Airbender (not the movie, that doesn't exist)"
];
var movies_kids = [
    "Lion King",
    "Wreck-it-Ralph",
    "Pokemon",
    "Tarzan",
];
var movies_adults = [
    "Kill Bill",
    "Pulp Fiction",
    "Hateful Eight",
    "Split"
];
var movies_elderly = [
    "Shootist",
    "The Man who shot Liberty Vallance",
    "True Grit",
    "James Bond (Sean Connery)",
    "Terminator, I'll be back"
];

// Middleware
server.use( cors( ) );
server.use( express.urlencoded( {
    extended: false
} ) );
server.use( express.json( ) );

// REST endpoints
server.get( "/numbers", function ( req, res ) {
    var response = {
        numbers: numbers,
    }
    res.json( response );
});

server.get( "/numbers/min", function ( req, res ) {
    var min = numbers[ 0 ];
    numbers.forEach( function ( number ) {
        if ( number < min ) {
            min = number;
        }
    });

    var response = {
        min: min
    };
    res.json( response );
});

server.get( "/numbers/go-fish", function ( req, res ) {
    // console.log( req.body );
    var go_fish = numbers.includes( Number( req.body.number ) );
    console.log( go_fish );

    res.send( );
});

server.get( "/stoplight", function ( req, res ) {
    var response = {
        color: stoplight_color
    };
    res.json( response );
});

server.get( "/movienight", function ( req, res ) {
    // console.log( req.body );
    var selected_movies = movies_all; // add all movies to selected_movies list

    // add kids movies to selected_movies if age <= 10
    if ( req.body.age <= 10 ) {
        selected_movies = selected_movies.concat( movies_kids );
    }
    // add adult movies to selected_movies if age > 10 && age <= 50
    if ( req.body.age > 10 && req.body.age <= 50 ) {
        selected_movies = selected_movies.concat( movies_adults );
    }
    // add elderly movies to selected_movies if age > 50
    if ( req.body.age > 50 ) {
        selected_movies = selected_movies.concat( movies_elderly );
    }
    
    // Picking the movie from selected_movies
    var random_index = Math.floor( Math.random( ) * selected_movies.length );
    var movie = selected_movies[ random_index ];

    var response = {
        movie: movie
    };
    res.json( response );
});

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
