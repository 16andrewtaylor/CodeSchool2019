const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = process.env.PORT || 3000;

// Middleware
server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( {
    extended: false
}));

// Routes

// Data
var data = require( "./data.js" );

// REST endpoints
server.get( "/user", function ( req, res ) {
    var response = {
        user: data.user
    }
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

// GET /names
server.get( "/names", function ( req, res ) {
    var response = {
        names: data.names
    };
    res.json( response );
});

// GET /names/id
server.get( "/names/:id", function ( req, res ) {
    // console.log( req.params.id );
    var filtered_names = [ ];
    data.names.forEach( function ( name ) {
        if ( name.id == req.params.id ) {
            filtered_names.push( name );
        }
    });

    // 404 if we didn't find a name with that id
    if ( filtered_names.length == 0 ) {
        res.status( 404 );
        var response = {
            msg: "Couldn't find a name with that id"
        };
        res.json( response );
    } else { // 200 if we did find a name, send back the name found
        var name = filtered_names[ 0 ];
        var response = {
            name: name
        };
        res.json( response );
    }
});

// GET /numbers
server.get( "/numbers", function ( req, res ) {
    var response = {
        numbers: data.numbers
    };
    res.json( response );
});

// GET /numbers/id
server.get( "/numbers/:id", function ( req, res ) {
    // console.log( req.params.id );
    var filtered_numbers = [ ];
    data.numbers.forEach( function ( number ) {
        if ( number.id == req.params.id ) {
            filtered_numbers.push( number );
        }
    });

    // found will be true if there is a number with that id
    // var found = data.numbers.some( function ( number ) {
    //     return number.id == req.params.id;
    // });

    // 404 if we didn't find a number with that id
    if ( filtered_numbers.length == 0 ) {
        res.status( 404 );
        var response = {
            msg: "Couldn't find a number with that id"
        };
        res.json( response );
    } else { // 200 if we did find a number, send back the number found
        var number = filtered_numbers[ 0 ];
        var response = {
            number: number
        };
        res.json( response );
    }
});

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
