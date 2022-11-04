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

## Index
* [Pre-requitsite](#pre-requitsite)
* [Root end point](#root-end-point)
* [End points](#end-points)
* [Request and Response examples](#request-and-response-examples)
* [Filtering example](#filtering-example)
* [Sorting example](#sorting-example)


### Pre-requitsite
1. have mongoDB installed on your machine and create a db called **todoDB**
2. `cd` to the folder where you place **app.js**
3. `npm init`
4. `npm i express mongoose body-parser`
5. start the server `node app.js`
6. open postman and send request to http://localhost:3000/todos

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

### Request and Response examples
Say our todoDB has the following documents:
```
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "6364bde3780b694f0c5eeba4",
        "name": "Pet Fluffy",
        "description": "Buy her some cat food",
        "dueDate": "2022-11-03",
        "status": "expired",
        "__v": 0
    },
    {
        "_id": "6364be24780b694f0c5eeba6",
        "name": "Algo homework",
        "description": "three question left",
        "dueDate": "2022-11-09",
        "status": "pending",
        "__v": 0
    }
]
```

1. Request: GET: localhost:3000/todos <br>
Response:
```
// get all documents in todoDB
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "6364bde3780b694f0c5eeba4",
        "name": "Pet Fluffy",
        "description": "Buy her some cat food",
        "dueDate": "2022-11-03",
        "status": "expired",
        "__v": 0
    },
    {
        "_id": "6364be24780b694f0c5eeba6",
        "name": "Algo homework",
        "description": "three question left",
        "dueDate": "2022-11-09",
        "status": "pending",
        "__v": 0
    }
]
```
2. request: POST: localhost:3000/todos?name=clean the house&description=guest come at 2022-11-10&dueDate=2022-11-10&status=done <br>
Response: 
```
// add a new document to todoDB
{
    "Msg": "Successful added to the database!"
}
```
Now if you look at your todoDB there should be one more document added <br>
3. request : DELETE: localhost:3000/todos <br>
response
```
{
    "Msg": "Deleted All"
}
```
Now if you look at your todoDB there should be no documents <br>
4. request : GET : localhost:3000/todos/Pet%20Fluffy <br>
response:
```
// get a specified todo
{
    "_id": "6364bde3780b694f0c5eeba4",
    "name": "Pet Fluffy",
    "description": "Buy her some cat food",
    "dueDate": "2022-11-03",
    "status": "expired",
    "__v": 0
}
```
5. request: PATCH : localhost:3000/todos/Pet%20Fluffy?name=Feed Fluffy <br>
response: 
```
{
    "Msg": "PATCH: Updated!"
}
```
Now if you look at your todoDB the todo "Pet Fluffy" should change to "Feed Fluffy" <br>
6. request : PUT: localhost:3000/todos/Feed%20Fluffy?name=Pet Fluffy <br>
response:
```
// say if you want to change the name of "Feed Fluffy" to "Pet Fluffy" but you issue "PUT" instead of "PATCH" by mistake
{
    "Msg": "PUT: Updated!"
}
```
Now if you request : GET localhost:3000/todos/Pet%20Fluffy <br>
you will get 
```
// the whole thing is replaced!!
{
    "_id": "6364bde3780b694f0c5eeba4",
    "name": "Pet Fluffy",
    "__v": 0
}
```
7. request : DELETE : localhost:3000/todos/Pet%20Fluffy <br>
response: 
```
{
    "Msg": "Deleted!"
}
```
Now look at todoDB should not have the "Pet Fluffy" document

### Filtering example
1.You can specify to return only the todo with a specific *<STATUS>* by GET : localhost:3000/todos?status=[STATUS] <br>
e.g. <br>
Request : GET : localhost:3000/todos?status=[pending] <br>
Response: 
```
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364be24780b694f0c5eeba6",
        "name": "Algo homework",
        "description": "three question left",
        "dueDate": "2022-11-09",
        "status": "pending",
        "__v": 0
    }
]
```
2. You can also specify a particular date, before and/or after which will the return todos be desired <br>
e.g. <br>
Request : GET : localhost:3000/todos?before=[2022-11-09] <br>
Response: 
```
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "6364bde3780b694f0c5eeba4",
        "name": "Pet Fluffy",
        "description": "Buy her some cat food",
        "dueDate": "2022-11-03",
        "status": "expired",
        "__v": 0
    }
]
```
Request : GET : localhost:3000/todos?after=[2022-11-03] <br>
Response:
```
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "6364be24780b694f0c5eeba6",
        "name": "Algo homework",
        "description": "three question left",
        "dueDate": "2022-11-09",
        "status": "pending",
        "__v": 0
    }
]
```
Request : GET : localhost:3000/todos?before=[2022-11-09]&after=[2022-11-03] <br>
Response: 
```
[
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    }
]
```

### Sorting examples
You can also get the result sorted by the *dueDate* or *name* if you specify
```
sort=asc(dueDate) // sort todos by dueDate in an ascending order
sort=desc(dueDate) // sort todos by dueDate in an descending order
sort=asc(name) // sort todos by name in an ascending order
sort=desc(name) // sort todos by name in an descending order
```
e.g.
Request: GET: localhost:3000/todos?sort=asc(dueDate) <br>
Response: 
```
[
    {
        "_id": "6364bde3780b694f0c5eeba4",
        "name": "Pet Fluffy",
        "description": "Buy her some cat food",
        "dueDate": "2022-11-03",
        "status": "expired",
        "__v": 0
    },
    {
        "_id": "6364bd7b780b694f0c5eeba0",
        "name": "Built a REST API",
        "description": "A RESTful todo API that support filtering and sorting",
        "dueDate": "2022-11-07",
        "status": "pending",
        "__v": 0
    },
    {
        "_id": "6364bdac780b694f0c5eeba2",
        "name": "Meet with advisor",
        "description": "Room 1010",
        "dueDate": "2022-11-08",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "6364be24780b694f0c5eeba6",
        "name": "Algo homework",
        "description": "three question left",
        "dueDate": "2022-11-09",
        "status": "pending",
        "__v": 0
    }
]
```
