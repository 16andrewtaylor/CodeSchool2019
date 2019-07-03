# Routes is just a partial example on how to create a router, not implemented fully, but the base code is there

# To integrate this into a project make sure you do all of the new npm installs, replace the cors lines, create the userModel file and require it, copy paste all passport middleware, copy paste the register login login/success and login/error endpoints along with the ensureAuthentication function, and place the ensureAuthentication into any endpoint you want to be a protected resource, making it so they have to be logged in to get the response for that particular request.

# Then to connect this to the client, just add credentials: "include" to all fetch requests inside the second parameter which is the object where you specify the method, headers, body, etc. as this allows cookies to be sent back and forth which is how passport authenticates who you are.
