const uuid = require( "uuid" );

var data = {
	todos: [
		{
			id: uuid.v4( ),
			name: "Mow the lawn",
			completed: false,
			editing: false,
			created_on: new Date( )
		},
		{
			id: uuid.v4( ),
			name: "Clean the house",
			completed: true,
			editing: false,
			created_on: new Date( )
		},
		{
			id: uuid.v4( ),
			name: "Walk the dog",
			completed: false,
			editing: false,
			created_on: new Date( )
		},
		{
			id: uuid.v4( ),
			name: "Watch Avatar The Last Airbender",
			completed: true,
			editing: false,
			created_on: new Date( )
		},
		{
			id: uuid.v4( ),
			name: "Do homework",
			completed: false,
			editing: false,
			created_on: new Date( )
		},
	]
};

module.exports = data;
