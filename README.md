# todo-REST-API

### Summary
1.A RESTful todo API that supports CRUD, sorting and filtering operations.<br>
2.A todo object has the following attributes: 
```
{
  name: String,
  description: String,
  dueDate: String, // yyyy-mm-dd
  status: String // done, pending, expire
}
```
3. All data is send through JSON

### Root end point
http://localhost:3000/todos

### End points
| Method | End points | Description |
| --- | --- | --- |
| `GET` | /todos | List all todos |
| `POST` | /todos | Create a new todos |
| `DELETE` | /todos | Delete all todos |
| `GET` | /todos/:whichTODO | Get a *specific* todo |
| `PATCH` | /todos/:whichTODO | Edit an *existing* todo |
| `PUT` | /todos/:whichTODO | Replace an *existing* todo |
| `DELETE` | /todos/:whichTODO | Delete an *existing* todo | 

### Request & Response examples

### Pre-requitsite
1. have mongoDB installed on your machine and create a db called **todoDB**
2. `cd` to the folder where you place **app.js**
3. `npm init`
4. `npm i express mongoose body-parser`
5. start the server `node app.js`
6. open postman and send request to http://localhost:3000/todos
