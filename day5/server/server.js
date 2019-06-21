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
// GET /todos
server.get( "/todos", function ( req, res ) {
    var response = {
        todos: data.todos
    };
    res.json( response );
});

// POST /todos
server.post( "/todos", function ( req, res ) {
    if ( req.body.name == undefined ) {
        // They did not send a name for the new todo
        var response = {
            msg: "You need to send a name field"
        };
        res.status( 400 );
        res.json( response );
    } else if ( req.body.name == "" ) {
        // The name was empty
        var response = {
            msg: "Please enter a name for the new todo"
        };
        res.status( 400 );
        res.json( response );
    } else {
        // Add the new todo to the list of todos
        var new_todo = {
            id: uuid.v4( ),
            name: req.body.name,
            completed: false,
            editing: false,
            created_on: new Date( )
        };
        data.todos.unshift( new_todo );
        // Send the reponse
        res.status( 201 );
        res.send( );
    }
});

// PUT /todos/id
server.put( "/todos/:id", function ( req, res ) {
    // console.log( req.params.id );

    // Check for bad request
    var bad_request = false;

    if ( req.body.name == undefined && req.body.completed == undefined ) {
        bad_request = true;
    }
    if ( req.body.name != undefined && req.body.name == "" ) {
        bad_request = true;
    }
    if ( req.body.completed != undefined && typeof( req.body.completed ) != "boolean" ) {
        bad_request = true;
    }

    if ( bad_request ) {
        var response = {
            msg: "Please send over a name or a completed value to update, make sure they are valid as well"
        }
        res.status( 400 );
        res.json( response );
    } else {
        // Request is good, but make sure todo with the id exists
        var found = data.todos.some( function ( todo ) {
            return todo.id == req.params.id;
        });

        if ( !found ) {
            var response = {
                msg: `We could not find a todo with the id of ${ req.params.id }`
            }
            res.status( 404 );
            res.json( response );
        } else {
            // We have a good todo to update, now lets update it
            data.todos.forEach( function ( todo ) {
                if ( todo.id == req.params.id ) {
                    if ( req.body.name != undefined ) {
                        todo.name = req.body.name;
                    }
                    if ( req.body.completed != undefined ) {
                        todo.completed = req.body.completed;
                    }
                }
            });
            res.status( 204 );
            res.send( );
        }
    }

});

// Start the server
server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
});
