const router = require("express").Router();
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const morgan = require("morgan")
const express = require("express")
//let express = require('express')
require("express-async-errors");
let app = express();
require("../mongo")  //return data from mongo.js file
var crypto = require('crypto');
var path = require('path');

router.use(express.json())
require("../model/Post")
const Post = mongoose.model("signup")
router.use(bodyparser.json())
router.use(morgan())
var fs = require('fs');

//router.set('view engine', 'ejs');
router.use('/public', express.static(__dirname + '/public'));
 router.use(bodyparser.urlencoded({ extended: true}));
console.log("data start")

// router.get("/",function(req,res){
//      console.log("html start");
//      res.render("index.html")
//      // let reqPath = path.join(__dirname, "..");

//      // console.log("reqPath",reqPath)
//      // res.sendFile(path.join(__dirname,'../view/index.html'))
//      //res.sendFile( __dirname + "/" +'index.html');
//    });
   


// app.get('/', function(req, res) {
//      console.log(path.join(__dirname))
//      res.sendFile( __dirname,'../' + "/" +'view/index.html');
//  });
router.get("/getData", async (req, res) => {
    try{
         //console.log("data from database", req)
         const posts =  await Post.find({})
         res.send(posts)

    } catch (error){
         console.log("error gen")
         res.status(500)

    }
});

//extractData
router.get("/extractData", async(req,res) => {
     try{
          var data = req.body;
          //var name = req.body;
          console.log("data", data)
          const posts =  await Post.findOne({"name": data.name})
          
          res.send(posts)
          // console.log("req data", req.body)
          // const post = await Post.findOne({ _id:req.body});
          // res.send(post)
     }catch(error){
          res.status(500);
     }
     
     
 })


//update data
router.post("/update", async(req, res) =>{
    try{
         console.log(req.body.id)
         const post = await Post.findByIdAndUpdate({
              _id: req.body.id
         }, req.body, {
              new:true, 
              runValidators:true
         })
         res.send(post)
    }catch(error){
         res.send(500)

    }
})


//delete data
router.post("/delete", async (req, res) =>{
    try{
         console.log("name", req.body.id)
         const post = await Post.findByIdAndRemove({
              _id: req.body.id
         })
         res.send(post)
    }catch(error){
         res.send(500)
    }
})


var getHash = ( pass , phone ) => {
				
     var hmac = crypto.createHmac('sha512', phone);
     
     //passing the data to be hashed
     data = hmac.update(pass);
     //Creating the hmac in the required format
     gen_hmac= data.digest('hex');
     //Printing the output on the console
     console.log("hmac : " + gen_hmac);
     return gen_hmac;
}
router.post("/sign_up", async (req, res, next) =>{

     console.log('request data ->', req.body)
    try{
    const posts = new Post();
    //console.log('request data ->', req) //showing data in cmd
    posts.name = req.body.name;
    console.log(posts.name)
    posts.contact = req.body.phone;
    console.log(posts.contact)
    posts.email = req.body.email;
    console.log(posts.email)
    posts.password = req.body.password;
    console.log(posts.password)
    console.log("1")
    console.log("2")
    console.log(req.url)
     if (req.url ==="/sign_up"){
         
          fs.readFile( path.join( __dirname,'..'+"/"+"view/signup_success.html"), function (error, pgResp) {
               if (error) {
                    throw error
                    res.writeHead(404);
                    res.write('Contents you are looking are Not Found');
               } else {
                    console.log("read_file")
                    res.setHeader('Content-Type', 'text/html');

                    //res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(pgResp);
                    res.end();
                    //next();

               }
               
               })
     }
    posts.save((err, result) =>{
         if (err){
              return res.status(400).json({
                   error : err
              })
         }
         res.status(200).json({
              post: result  //showing in postman (response) and save in database
         })
    }); 
    
     console.log("3")
    }catch(error){
         console.log("error in post ")
         res.status(500)

    }
    //return res.redirect('signup_success.html'); 
 
})
console.log("api end")
module.exports = router;
//module.exports = app