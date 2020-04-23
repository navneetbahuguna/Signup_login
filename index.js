let express = require('express')
require("express-async-errors");
let app = express();
var path    = require("path");
app.set('view engine', 'ejs');

let mongoose = require("mongoose");
const bodyparser = require("body-parser")
const morgan = require("morgan") //for view the details of running time
//require("./mongo")  //return data from mongo.js file
var port = process.env.PORT || 4005;


app.get('/', function(req, res) {
     res.sendFile(path.join(__dirname, 'view','index.html'))
     // res.set({ 
     //      'Access-control-Allow-Origin': '*'
     //      }); 
     // console.log(path.join(__dirname, '../'))
     // res.sendFile( __dirname + "/" +'view/index.html');
 });
 
app.use("/NBProject", require("./routes/posts"))

//Routes not found  1st method
// app.use((req, res, next) =>{
//      req.status = 404;
//      const error =  new error("Rooutes not found")
//      next(error);
// })
//another Method 
app.use((req, res, next) =>{
     console.log("404 error")
     res.status(404).sendFile(path.join(__dirname,'view','404.html'))
})
//error handler
app.use((error, req, res, next) =>{
     console.log("500 error")
     res.status(req.status || 500).send({
          message : error.message,
          stack: error.stack
     })
})
// // Setup server port

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running  on port " + port);
});


