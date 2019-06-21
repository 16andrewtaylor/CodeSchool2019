# Workflow

1. Detail the new endpoint in the server README
2. Write the endpoint on the server, and test with postman
3. Push changes to server git
4. Connect the client with local server through fetch
5. Push changes to client git
6. Deploy the new server changes to heroku, test with postman
7. Connect the client with heroku server through fetch

heroku git:remote -a codeschool-todo-server  
git push heroku master
