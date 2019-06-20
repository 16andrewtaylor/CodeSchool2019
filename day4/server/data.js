const uuid = require( "uuid" );

var data = {
    user: {
        name: "",
        age: 0,
        created_on: new Date( )
    },
    names: [
        {
            id: uuid.v4( ),
            name: "Phil H."
        },
        {
            id: uuid.v4( ),
            name: "Phil B."
        },
        {
            id: uuid.v4( ),
            name: "Larry"
        },
        {
            id: uuid.v4( ),
            name: "Curtis"
        },
        {
            id: uuid.v4( ),
            name: "Bart"
        },
    ],
    numbers: [
        {
            id: uuid.v4( ),
            number: 12
        },
        {
            id: uuid.v4( ),
            number: 24
        },
        {
            id: uuid.v4( ),
            number: 48
        },
    ]
};

module.exports = data;
