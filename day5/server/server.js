const express = require( "express" );
const cors = require( "cors" );
const uuid = require( "uuid" );

var server = express( );
var port = process.env.PORT || 3000;

// Middleware
server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( { extended: false } ) );
server.use( function ( req, res, next ) {
    console.log( `New request: ${ req.method } ${ req.path } on ${ new Date( ) }` );
    next( );
});

// Data
var data = require( "./data.js" );

// Endpoints
server.get( "/todos", function ( req, res ) {
    var response = {
        todos: data.todos
    };
    res.json( response );
});

// Start the server
server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
