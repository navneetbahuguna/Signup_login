//crea5e table for database

const mongoose = require("mongoose");
const post_schema = mongoose.Schema({
	name:{
		type:String,
		required:true    //true means compulsory required
	},
	contact:{
		type:String,
		//required:true
	},
	email:{
		type:String,
		//required:true
	},
	password:{
		type:String,
		//required:true
	}
})

//module.exports = mongoose.model("Post",post_schema) //Post is tabel name
module.exports = mongoose.model("signup",post_schema) //Post is tabel name
//sigmup is model name