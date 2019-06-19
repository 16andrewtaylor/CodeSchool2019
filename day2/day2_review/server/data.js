var data = {
    greeting: "Hello",
    stoplight_color: "RED",
};

setInterval( function ( ) {
    if ( data.stoplight_color == "RED" ) {
        data.stoplight_color = "GREEN";
    } else if ( data.stoplight_color == "GREEN" ) {
        data.stoplight_color = "YELLOW";
    } else if ( data.stoplight_color == "YELLOW" ) {
        data.stoplight_color = "RED";
    }
}, 5000 );

module.exports = data;
