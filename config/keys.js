// module.exports = {
//     mongouri = "mongodb://navneet:navneet123@ds263928.mlab.com:63928/heroku_zh7fg2d4"

// }


if(process.env.NODE_ENV=="production"){
    module.exports= require("./prod")
}else{
    module.exports= require("./dev")
}