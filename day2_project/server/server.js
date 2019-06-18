const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

// Middleware
server.use( cors( ) );

// REST endpoints
server.get( "/yahtzee-roll", function ( req, res ) {
    var new_dice_rolls = [ ];
    for ( var i = 0; i < 2; i++ ) {
        var roll = Math.floor( Math.random( ) * 6 ) + 1;
        new_dice_rolls.push( roll );
    }
    var response = {
        rolls: new_dice_rolls
    };
    res.json( response );
});

server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});