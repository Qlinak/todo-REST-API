const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/todoDB');

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  dueDate: String,
  status: String // done, pending, expire
});

const TODO = mongoose.model("todo", todoSchema);

// test connection
// const temp = new TODO({name:"t01", Description:"t01d", dueDate:"t01ddl", Status:"started"});
// console.log(temp.name);
// temp.save(function(err){
//   if(err) console.log(err);
//   else console.log("tested!");
// });

app.route("/todos")
  .get(function(req, res){
  // find all the todos under this route
  var filter = {}; // a JSON object that holds all the filtering citeria
  var range = {}; // a JSON object that holds the condition for dueDate
  if(req.query.status){
    let temp1 = req.query.status.split(']')[0];
    filter["status"] = temp1.split('[')[1];
  }
  if(req.query.before){
    let temp2 = req.query.before.split(']')[0];
    range["$lt"] = temp2.split('[')[1];
  }
  if(req.query.after){
    let temp3 = req.query.after.split(']')[0];
    range["$gt"] = temp3.split('[')[1];
  }
  if(req.query.before || req.query.after){
    filter["dueDate"] = range;
  }
  console.log(filter); // debug
  var sortObj;
  if(req.query.sort){
    let flag = req.query.sort.split('(')[0]; // "asc" or "desc"
    let temp = req.query.sort.split('(')[1];
    var sortBy = temp.split(')')[0]; // by which feild
    if(sortBy == "dueDate"){
      if(flag == "asc"){
        sortObj = {dueDate:1};
      }else if(flag == "desc"){
        sortObj = {dueDate:-1};
      }
    }else if(sortBy == "name"){
      if(flag == "asc"){
        sortObj = {name:1};
      }else if(flag == "desc"){
        sortObj = {name:-1};
      }
    }
    TODO.find(filter).sort(sortObj).exec(function(err, callback){
       if(err == null){
         console.log("All sorted todos sent");
         res.status(200).send(callback); // an array of JSON object
       }else{
         console.log("Error: " + err);
         res.send(err);
       }
     });
    // console.log(flag + " " + sortBy);
  }
  else{
    console.log("no need to sort");
    TODO.find(filter,function(err, callback){
       if(err == null){
         console.log("All todos sent");
         res.status(200).send(callback); // an array of JSON object
       }else{
         console.log("Error: " + err);
         res.status(400).end(err);
       }
     });
  }


})
  .post(function(req, res){
  // create ONE article as per user requested
  console.log("Request posted");
  const newTODO = new TODO({
    name: req.query.name,
    description: req.query.description,
    dueDate: req.query.dueDate,
    status: req.query.status
  });
  newTODO.save(function(err){
    if(!err){
      res.status(200).end("Successful added to the database!")
    }else{
      res.send(err);
    }
  }); // save in the database
})
  .delete(function(req, res){
  // delete all article
  TODO.deleteMany(function(err){
    if(!err){
      res.send("Deleted All");
    }else{
      res.send(err);
    }
  })
});

app.route("/todos/:whichTODO")
.get(
  (req, res) => {
    TODO.findOne({name:req.params.whichTODO}, (err, callback) => {
      if(!callback){
        res.send("No such todo!");
      }else{
        if(err == null){
          console.log("Finds " + req.params.whichTODO + " successfully");
          res.send(callback);
        }else{
          console.log("Error: " + err);
          res.send(err);
        }
      }
    });
  }
)
.put(
  (req, res) => {
    TODO.replaceOne(
      {name:req.params.whichTODO},
      req.query,
      function(err){
        if(!err) res.send("PUT: Updated!");
        else res.send("Error " + err);
      }
    )
  }
)
.patch(
  (req, res) => {
    TODO.updateOne(
      {name:req.params.whichTODO},
      {$set: req.query},
      function(err){
        if(!err) res.send("PATCH: Updated!");
        else res.send("Error " + err);
      }
    )
  }
)
.delete(
  (req, res) => {
    TODO.deleteOne(
      req.query,
      function(err, dResulte){
        if(!err){
          console.log(dResulte);
          console.log("deleted!");
          res.send("deleted!");
        }else{
          console.log("Error! " + err);
          res.send("Error! " + err);
        }
      }
    );
  }
);

app.listen(3000, function() {
  console.log("Server started on port 3000");
  // const date1 = new Date(2022, 10, 8).toISOString().split('T')[0];
});
