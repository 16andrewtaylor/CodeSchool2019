

var app = new Vue( {
	el: "#app",
	
    data: {
        todos: [
            {
                name: "Mow the lawn",
				completed: false,
				editing: false
            },
            {
                name: "Clean the house",
				completed: true,
				editing: false
            },
            {
                name: "Take dog on walk",
				completed: false,
				editing: false
            }
        ],
        new_todo_input: ""
	},
	
    methods: {
        addNewTodo: function ( ) {
			console.log( "Adding new todo" );
            var new_todo = { 
                name: this.new_todo_input,
				completed: false,
				editing: false,
            };
            this.todos.unshift( new_todo );
            this.new_todo_input = "";
        },
        deleteTodo: function ( todo ) {
			console.log( "Deleting todo" );
			var index = -1;
			for ( i = 0; i < this.todos.length; i++ ) {
				if ( this.todos[ i ].name == todo.name ) {
					index = i;
				}
			}
			this.todos.splice( index, 1 );
        },
		saveTodoName: function ( todo ) {
			console.log( "Editing todo name" );
			todo.editing = false;
		},
		saveTodoCompleted: function ( todo ) {
			console.log( "Editing todo completed" );
			// Don't need this function initially, only when we are adding the fetch to the server
		}
    }
} );
