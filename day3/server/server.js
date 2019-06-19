const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

server.use( cors( ) );
server.use( express.json( ) );
server.use( express.urlencoded( {
    extended: false
} ) );

//

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});