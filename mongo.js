const mongoose = require("mongoose"); //for connection
require("dotenv").config();
const mongoDBError = require("mongoose-mongodb-errors")
mongoose.Promise = global.Promise; //ES6 promise
mongoose.plugin(mongoDBError)
console.log("database",process.env.mongouri)
mongoose.connect(process.env.mongouri)
.then(() => console.log("db connected"))

mongoose.connection.on("error", err => {
    console.log(`db connection error :${err.message}`);
})

//for local
//mongouri = mongodb://localhost/name_database