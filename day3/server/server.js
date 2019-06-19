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

// REST endpoint
server.get( "/names", function ( req, res ) {
    var response = {
        names: data.names
    };
    res.json( response );
});

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
