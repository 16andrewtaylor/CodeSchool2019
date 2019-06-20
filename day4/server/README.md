# Hello there, created a new server repo!

### POST /user
```javascript
server.post( "/user", function ( req, res ) {
    var new_user = {
        "name": req.body.name,
        "age": req.body.age,
        "created_on": new Date( )
    }
    user = new_user;
})
```

### Client, fetch for POST /user
```javascript
var req_body = {
    name: "Phil",
    age: 12
};

fetch( "url/user", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: req_body
})
```