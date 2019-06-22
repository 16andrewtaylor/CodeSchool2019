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

// REST endpoints

// Collection: Todos
// List: GET /todos
// List (in)completed todos: GET /todos?completed=true OR ?completed=false
server.get( "/todos", function ( req, res ) {
	if ( req.query.completed == "true" || req.query.completed == "false" ) {
		var filtered_todos;
		if ( req.query.completed == "true" ) {
			filtered_todos = data.todos.filter( function ( todo ) {
				return todo.completed == true;
			})
		} else {
			filtered_todos = data.todos.filter( function ( todo ) {
				return todo.completed == false;
			})
		}
		var response = {
			todos: filtered_todos
		};
		res.json( response );
	} else {
		var response = {
			todos: data.todos
		};
		res.json( response );
	}
});

// Create: POST /todos
server.post( "/todos", function ( req, res ) {
	if ( req.body.name == undefined ) {
		res.status( 400 );
		var response = {
			msg: "Please send a name to create a new todo"
		};
		res.json( response );
	} else if ( req.body.name == "" ) {
		res.status( 400 );
		var response = {
			msg: "Please make sure the name is valid and not empty"
		};
		res.json( response );
	} else {
		var new_todo = {
			id: uuid.v4( ),
			name: req.body.name,
			completed: false,
			editing: false,
			created_on: new Date( )
		};
		data.todos.unshift( new_todo );
		res.status( 201 );
		res.send( );
	}
});

// Update: PUT /todos/id
server.put( "/todos/:id", function ( req, res ) {
	// Make sure they sent at least one attribute to update,
	// and make sure the values they sent were valid
	var bad_request = false;

	if ( req.body.name == undefined 
		&& req.body.completed == undefined ) {
		bad_request = true;
	}
	if ( req.body.name != undefined 
		&& req.body.name == "" ) {
		bad_request = true;
	}
	if ( req.body.completed != undefined 
		&& typeof( req.body.completed ) != "boolean" ) {
		bad_request = true;
	}

	if ( bad_request ) {
		res.status( 400 );
		var response = {
			msg: "Please make sure you either include a name to edit, or the new completed value. Also, the name cannot be empty and the completed value must be a boolean"
		};
		res.json( response );
	} else {
		// Make sure a todo exists with the id given
		var found = data.todos.some( function ( todo ) {
			return todo.id == req.params.id;
		});

		if ( !found ) {
			res.status( 404 );
			var response = {
				msg: "There is not a todo with that id"
			};
			res.json( response );
		} else {
			// Update one or both of the fields and send our response
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

// Delete: DELETE /todos/id
server.delete( "/todos/:id", function ( req, res ) {
	// Make sure a todo exists with the id given
	var found = data.todos.some( function ( todo ) {
		return todo.id == req.params.id;
	});

	if ( !found ) {
		res.status( 404 );
		var response = {
			msg: "There is not a todo with that id"
		};
		res.json( response );
	} else {
		// Delete the todo and send our response
		var index = -1;
		for ( i = 0; i < data.todos.length; i++ ) {
			if ( data.todos[ i ].id == req.params.id ) {
				index = i;
			}
		}
		data.todos.splice( index, 1 );

		res.status( 204 );
		res.send( );
	}
});

// Retrieve: GET /todos/id
server.get( "/todos/:id", function ( req, res ) {
	// Make sure a todo exists with the id given
	var found = data.todos.some( function ( todo ) {
		return todo.id == req.params.id;
	});

	if ( !found ) {
		res.status( 404 );
		var response = {
			msg: "There is not a todo with that id"
		};
		res.json( response );
	} else {
		// Grab the todo we want and send it back to the client
		var wanted_todo = { };
		data.todos.forEach( function ( todo ) {
			if ( todo.id == req.params.id ) {
				wanted_todo = todo;
			}
		});
		
		var response = {
			todo: wanted_todo
		};
		res.json( response );
	}
});

// Start the server
server.listen( port, function ( ) {
	console.log( `Listening on port ${ port }` );
});
