# Todo API

## REST endpoints
* List: GET /todos
* Create: POST /todos
* Update: PUT /todos
* Delete: DELETE /todos

# List: GET /todos
## - Request
Method: GET  
Path: /todos  
Content-type: none  
Body: none  

## - Response
Status: 200  
Content-type: application/json  
Body: { todos: todos }  

# Create: POST /todos
## - Request
Method: POST  
Path: /todos  
Content-type: application/json  
Body: { name: "New todo name" }

## - Response
### If they did not send over a name field:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }

### Else if the name is invalid:
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }  

### Else: add the todo to the list and send response
Status: 201  
Content-type: none  
Body: none  

# Update: PUT /todos/id
## - Request
Method: PUT  
Path: /todos/id  
Content-type: application/json  
Body: { name: "New todo name", completed: boolean }

## - Response
### If they didn't send over at least a name or a completed value
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }  

### Else if they did send data to update, but the values were invalid
Status: 400  
Content-type: application/json  
Body: { msg: "Message" }  

### Else if there was no todo with the id given
Status: 404  
Content-type: application/json  
Body: { msg: "Message" }

### Ok, we updated
Status: 204
Content-type: none
Body: none
