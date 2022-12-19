var express = require('express');
const { connect } = require("..");
const { closeConnection, connectDb } = require('../../config');
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



/* GET users listing. */
router.post('/login',async function(req, res, next) {
  try{
    const db = await connectDb();
    const user = await db.collection("users").findOne({email : req.body.email})
    // await db.collection("users").insertOne({name : "Test User"});
    await closeConnection()
    if(user && user.role === "ADMIN"){
      console.log(user)
      console.log(req.body)
      const compare = await bcrypt.compare(req.body.password, user.password);
      if(compare){
        const token =jwt.sign({_id : user._id, role : user.role}, process.env.JWT_SECRET, {expiresIn : "24h"});
        res.json({token})
        console.log(token);
      }else{
        res.status(401).json({message : "username / password is incorrect"})
      }
    }else{
      res.status(401).json({message : "username / password is incorrect"})
    }
    res.json({message : "User Created"})
  }catch(error){
    console.log(error)
    res.status(500).json({message : "Something went wrong"})
  }
});



// router.post("/register", async (req, res ) => {
// try{
//   const db = await connectDb();
//   var data = {
//     email : "admin@gmail.com",
//     password : "Admin@123"
//   };
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(data.password, salt);
//   const user = db.collection("users")
//   .insertOne({email : data.email, password : hash, role : "ADMIN"});
//   res.json({message : "Admin Created"})
// }catch(error){
//   console.log(error)
//   res.status(500).json({message : "Something went wrong"})

// }
// }) 


module.exports = router;
 