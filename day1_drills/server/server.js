// Creating a new server
// Create server folder within project, and create server.js
// In terminal: go to the server folder
// npm init -y      ( this will give you the package.json file )
// In package.json: make sure "main" is set as "server.js"
    // make sure you have the "start" script that runs "node server.js"
// Back in terminal: make sure you are still in the server folder
// npm install express
// npm install -D nodemon
// npm install cors
// OR npm install express cors; npm install -D nodemon
// In package.json: make sure those three installs appear in "dependencies" and "devDependencies"
    // "dependencies": {
    //     "cors": "^2.8.5",
    //     "express": "^4.17.1"
    // },
    // "devDependencies": {
    //     "nodemon": "^1.19.1"
    // }
    // create new script tag for nodemon: in "scripts" add "dev": "nodemon server.js"

const express = require( "express" );
const cors = require( "cors" );

var server = express( );
var port = 8080;

// Middleware
server.use( express.urlencoded( {
    extended: false
} ) );
server.use( cors( ) );

// Data
var numbers = [ 2, 3, 5, 6 ];
var items = [
    {
        name: "T-shirt",
        price: 2.99,
        tags: {
            type: "Clothing",
            color: "Black",
            sale: true
        }
    },
    {
        name: "Mug",
        price: 5.99,
        tags: {
            type: "Dishware",
            color: "Black",
            sale: false
        },
        keywords: [
            "Lord of the Rings",
            "LotR",
            "Fellowship of the Ring"
        ]
    },
    {
        name: "Ring",
        price: 7.99,
        tags: {
            type: "Accessory",
            color: "Purple",
            sale: false
        }
    },
]

// Helper functions
var noNumbers = function ( ) {
    return !numbers;
};

var total = function ( numbers ) {
    var total = 0;
    numbers.forEach( function( number ) {
        total += number;
    });
    return total;
};

var average = function ( numbers ) {
    var total = total( numbers );
    return total / numbers.length;
};

// REST endpoints
server.get( "/numbers", function ( req, res ) {
    // console.log( req.path );
    // console.log( numbers );
    if ( !numbers ) {
        res.status( 404 );
        var response = {
            msg: "We do not have the list of numbers you asked for"
        };
        res.json( response );
    } else {
        var response = {
            numbers: numbers
        };
        res.status( 200 );
        res.json( response );
    }
});

server.get( "/numbers/total", function ( req, res ) {
    var t = total( numbers );
    var response = {
        total: t
    };
    res.json( response );
});

server.get( "/numbers/average", function( req, res ) {
    var a = average( numbers );
    var response = {
        average: a
    };
    res.json( response );
});

server.get( "/items", function( req, res ) {
    console.log( req.body );
    if ( req.body.color ) {
        var filtered_list = items.filter( function( item ) {
            if ( item.tags.color == req.body.color ) {
                return true;
            } else {
                return false;
            }
        });
        var response = {
            items: filtered_list
        };
        res.json( response );
    } else {
        var response = {
            items: items
        }
        res.json( response );
    }
});

// Start server
server.listen( port, function ( ) {
    console.log( `Listening on port ${ port }` );
} );
