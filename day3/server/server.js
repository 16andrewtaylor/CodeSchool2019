const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

// Middleware
server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( {
    extended: false
} ) );

// Data
var data = require( "./data.js" );

// REST endpoints
// GET /names
server.get( "/names", function ( req, res ) {
    var response = {
        names: data.names
    };
    res.json( response );
});

// POST /names
server.post( "/names", function ( req, res ) {
    // check if there even is a req.body.name and that its not "", status 400
    if ( !req.body.name ) {
        res.status( 400 );
        var response = {
            msg: "Please send a name you want to add"
        };
        res.json( response );
    } else if ( req.body.name == "" ) {
        res.status( 400 );
        var response = {
            msg: "Please enter an actual name"
        };
        res.json( response );
    } else {
        data.names.push( req.body.name );
        res.status( 201 );
        res.send( );
    }
});

// POST /larry
server.post( "/larry", function ( req, res ) {
    data.names.push( "Larry" );
    res.status( 201 );
    res.send( );
});

// GET /numbers
server.get( "/numbers", function ( req, res ) {
    var response = {
        numbers: data.numbers
    };
    res.json( response );
});

// POST /numbers
server.post( "/numbers", function ( req, res ) {
    if ( !req.body.number ) {
        res.status( 400 );
        var response = {
            msg: "Please send a number you want to add"
        };
        res.json( response );
    } else {
        // console.log( isNaN( req.body.number ) );
        if ( isNaN( req.body.number ) ) {
            res.status( 400 );
            var response = {
                msg: "Please enter a valid number"
            };
            res.json( response );
        } else {
            data.numbers.push( Number( req.body.number ) );
            res.status( 201 );
            res.send( );
        }
    }
});

// GET /hotcold
server.get( "/hotcold", function ( req, res ) {
    if ( req.body.guess > 100 || req.body.guess < 1 ) {
        res.status( 400 );
        var response = {
            msg: "My number is only going to be between 1-100, your guess should be the same."
        };
        res.json( response );
    } else {
        var msg = "";
    
        if ( req.body.guess == data.number ) {
            msg = "You guessed it!";
        } else if ( req.body.guess < data.number ) {
            msg = "Your guess is too low...";
        } else if ( req.body.guess > data.number ) {
            msg = "Your guess was way too high!";
        }
    
        var response = {
            msg: msg,
        }
        res.json( response );
    }
    
});

// GET /age-group
server.get( "/age-group", function ( req, res ) {
    var age_group = "";

    // console.log( req.path );
    // console.log( req.query );

    var num = Number( req.query.age );

    if ( num < 15 ) {
        age_group = "Child";
    } else if ( num < 50 ) {
        age_group = "Middle aged";
    } else {
        age_group = "Elder";
    }

    var response = {
        "age-group": age_group
    };
    res.json( response );
});

// GET /user
server.get( "/user", function ( req, res ) {
    var response = {
        user: data.user
    };
    res.json( response );
});

// POST /user
server.post( "/user", function ( req, res ) {
    if ( !req.body.name || !req.body.age ) {
        res.status( 400 );
        var response = {
            msg: "Please make sure you enter a name and age"
        };
        res.json( response );
    } else {
        if ( isNaN( req.body.age ) ) {
            res.status( 400 );
            var response = {
                msg: "Please enter a valid age"
            };
            res.json( response );
        } else {
            var new_user = {
                name: req.body.name,
                age: req.body.age,
                created_on: new Date( )
            };
            data.user = new_user;
            res.status( 201 );
            res.send( );
        }
    }
});

// GET /greeting
server.get( "/greeting", function ( req, res ) {
    if ( data.user.name == "" ) {
        var response = {
            greeting: "Welcome!"
        };
    } else {
        var response = {
            greeting: `Welcome, ${ data.user.name }!`
        };
    }
    res.json( response );
});

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
