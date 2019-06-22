// const url = "http://localhost:3000";
const url = "https://codeschool-public-todo-server.herokuapp.com";

var app = new Vue( {
	el: "#app",
	
    data: {
        todos: [ ],
        new_todo_input: ""
	},

	created: function ( ) {
		this.getTodos( );
	},
	
    methods: {
		getTodos: function ( ) {
			console.log( "Getting todos" );
			fetch( `${ url }/todos` ).then( function ( response ) {
				response.json( ).then( function ( data ) {
					app.todos = data.todos;
				});
			});
		},
        addNewTodo: function ( ) {
			console.log( "Adding new todo" );
			var req_body = {
				name: this.new_todo_input
			};
			fetch( `${ url }/todos`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 201 ) {
					app.new_todo_input = "";
					app.getTodos( );
				}
			});
        },
        deleteTodo: function ( todo ) {
			console.log( "Deleting todo" );
			fetch( `${ url }/todos/${ todo.id }`, {
				method: "DELETE"
			}).then( function ( response ) {
				if ( response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					app.getTodos( );
				}
			});
        },
		saveTodoName: function ( todo ) {
			console.log( "Editing todo name" );
			var req_body = {
				name: todo.name
			};
			fetch( `${ url }/todos/${ todo.id }`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 || response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					todo.editing = false;
					app.getTodos( );
				}
			});
		},
		saveTodoCompleted: function ( todo ) {
			console.log( "Editing todo completed" );
			var req_body = {
				completed: !todo.completed
			};
			fetch( `${ url }/todos/${ todo.id }`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			}).then( function ( response ) {
				if ( response.status == 400 || response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 204 ) {
					todo.editing = false;
					app.getTodos( );
				}
			});
		},
		getTodoCreationDate: function ( todo ) {
			console.log( "Getting todo creation date" );
			fetch( `${ url }/todos/${ todo.id }` ).then( function ( response ) {
				if ( response.status == 404 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					});
				} else if ( response.status == 200 ) {
					response.json( ).then( function ( data ) {
						var created_on = new Date( data.todo.created_on );
						alert( `Created on ${ created_on }` );
					})
				}
			});
		},
		getFilteredTodos: function ( completed ) {
			console.log( `Getting todos where completed == ${ completed }` );
			var req_params = `completed=${ encodeURIComponent( completed ) }`;
			fetch( `${ url }/todos?${ req_params }`, {
				headers: {
					"Content-type": "application/x-www-form-urlencoded"
				}
			}).then( function ( response ) {
				response.json( ).then( function ( data ) {
					app.todos = data.todos;
				});
			});
		}
    }
} );
