// Creating a new server
// Create server folder within project
// In terminal: go to the server folder
// npm init -y      ( this will give you the package.json file )
// In package.json: make sure "main" is set as "server.js"
    // make sure you have the "start" script that runs "node server.js"
// Back in terminal: make sure you are still in the server folder
// npm install express
// npm install -D nodemon
// npm install cors
// In package.json: make sure those three installs appear in "dependencies" and "devDependencies"
    // create new script tag for nodemon: in "scripts" add "dev": "nodemon server.js"

const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

// Middleware
server.use( cors( ) );

// Data
var answers = [
    "yes", "no", "maybe", "are you serious?", "never"
];

// REST endpoint
server.get( "/", function ( request, response ) {
    response.send( "Hello there!" );
} );

// GET /answer
server.get( "/answer", function ( req, res ) {
    // console.log( req.headers );
    var random_index = Math.floor( Math.random( ) * answers.length );
    var random_answer = answers[ random_index ];
    
    res.json( {
        msg: random_answer
    } );
} );

server.listen( port, function ( ) {
    console.log( ` Listening on port ${ port }` );
} );
