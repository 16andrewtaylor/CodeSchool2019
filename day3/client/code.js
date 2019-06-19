

var app = new Vue ( {
	el: "#app",

	data: {
		greeting: "Hello world!",
		names: [ ],
		new_name: "",
		counter: 0,
		age_group: "",
		age: 0,
	},

	created: function ( ) {
		this.loadNames( );
	},

	methods: {
		loadNames: function ( ) {
			fetch( "http://localhost:8080/names" ).then( function ( response ) {
				console.log( response );
				response.json( ).then( function ( data ) {
					console.log( data );
					app.names = data.names;
				});
			});
		},
		loadAgeGroup: function ( ) {
			var req_body = `age=${ encodeURIComponent( this.age ) }`;
			// "age=10"

			fetch( `http://localhost:8080/age-group?${ req_body }`, {
				method: "GET",
				headers: {
					"Content-type": "application/x-www-form-urlencoded"
				},
				// body: req_body
			} ).then( function ( response ) {
				response.json( ).then( function ( data ) {
					app.age_group = data[ "age-group" ];
				});
			});
		},
		submitNewName: function ( ) {
			var req_body = {
				name: this.new_name
			};

			fetch( "http://localhost:8080/names", {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
			} ).then( function ( response ) {
				console.log( response );
				if ( response.status == 400 ) {
					response.json( ).then( function ( data ) {
						alert( data.msg );
					})
				} else if ( response.status == 201 ) {
					console.log( "Added" );
					app.loadNames( );
				}
			});
		}
	},

	computed: {
		
	}
} );
