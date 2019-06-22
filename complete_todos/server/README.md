# Todo API

## REST endpoints

* List: GET /todos
* Create: POST /todos
* Update: PUT /todos/id
* Delete: DELETE /todos/id
* Retrieve: GET /todos/id
* List (in)completed todos: GET /todos?completed=true OR ?completed=false

# List: GET /todos
## - Request
Method: GET  
Path: /todos  
Content-type: none   
Body: none

## - Response, send back the list of todos
Status: 200  
Content-type: application/json  
Body: { todos: todos }

# Create: POST /todos
## - Request
Method: POST  
Path: /todos  
Content-type: application/json   
Body: { name: "Name of the todo" }

## - Response
### If they did not send over a name field in their request body:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }

### Else if they did send over all the required fields but they had invalid values:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }

### Else: add the new todo to the collection, add the other fields
Status: 201  
Content-type: none  
Body: none

# Update: PUT /todos/id
## - Request
Method: PUT  
Path: /todos/id  
Content-type: application/json   
Body: { name: "Name of the todo", completed: true }

## - Response
### If they did not send over at least a name or completed field in their request body:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }

### Else if they did send over a required field but they had an invalid value:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }

### Else if there is no item matching the id given:
Status: 404  
Content-type: application/json  
Body: { msg: "Message" }

### Else: update the todo with the matching id
Status: 204  
Content-type: none  
Body: none

# Delete: DELETE /todos/id
## - Request
Method: DELETE  
Path: /todos/id  
Content-type: none   
Body: none

## - Response
### If there is no item matching the id given:
Status: 404  
Content-type: application/json  
Body: { msg: "Message" }

### Else: delete the todo with the matching id
Status: 204  
Content-type: none  
Body: none

# Retrieve: GET /todos/id
## - Request
Method: GET  
Path: /todos/id  
Content-type: none   
Body: none

## - Response
### If there is no item matching the id given:
Status: 404  
Content-type: application/json  
Body: { msg: "Message" }

### Else: send back the todo with the matching id
Status: 200  
Content-type: application/json  
Body: { todo: todo }

# List (in)completed todos: GET /todos?completed=true OR ?completed=false
## - Request
Method: GET  
Path: /todos  
Content-type: application/x-www-form-urlencoded  
Query: ?completed=true OR ?completed=false  

## - Response, send back a list of todos matching the query
Status: 200  
Content-type: application/json  
Body: { todos: filtered_todos }
