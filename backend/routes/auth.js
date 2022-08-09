const express = require("express");  //this import for create a api endpoints
const User = require("../models/User"); //this is  our collection where we saved our users data
const { body, validationResult } = require("express-validator"); //this is a package for  check our user or admin validate or not
const bcrypt=require('bcryptjs') //for hashing the passsword  , use npm i bcryptjs for install thid package
const jwt=require('jsonwebtoken'); //this is for security first if the user logged in the web then whenever he loggin again they type his token in the web thats help web authenticate
const fetchuser=require('../middleware/fetchuser'); //this is for security first if the user logged in the web then whenever he loggin again they type his token in the web thats help web authenticate
//  the user and give the permission to user enter in theweb

// jwt- in this json web token first this args  is get a data and second is get secret the they return a promise
const router = express.Router(); //this is a router for fix the path route where we store our diffrent types of dtaa
// Create a user  using : POST "/api/auth/createuser".Does'nt Require Auth
const JWT_SECRET="jbisthegood$boy"
router.post( //this is post methode for our security to passwordd
  "/createuser",
//  Route 1: to create a validate user for our web
  [
    body("name", " Name must be atleast 3 charactor:").isLength({ min: 3 }),
    body("email", "Enter a Valid Email:").isEmail(),
    body("password", "Password must be atleast 5 charactor:").isLength({
      min: 5,
    }) ,
  
  ], 
  async (req, res) => {
    // if there are errors,return bad request amd the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() }); 
    }
    try {
      // check weather the user with this email exist already

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, erore: "Sorry! a  user with this email already exists" });
      }
     
      let salt=await bcrypt.genSalt(10)
     const  secPass= await bcrypt.hash(req.body.password,salt)
     //  create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass, 
        email: req.body.email,
      }); 
      // there are the three types of jwt token is
      // 1.token and algorithm
      // 2.data 
      // 3.sign
        // thats for create a token 
        const data={
          user:{
            id:user.id
          }
        }
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true;
     res.json({success,authtoken}) //to cgeck the sign of token

      // res.json(user );
    } catch (error) {
     //     for catch any error in whole code
      console.error(error.message);
      res.status(500).send("Internal Server Erore Occured");
    }
  }
);



// Route 2: login or authenticating the user /api/auth/login
router.post( //this is post methode for our security to passwordd
  "/login",
//   to create a validate user for our web
  [
       body("email", "Enter a Valid Email:").isEmail(),
    body("password", "Password can not be blank:").exists()
    
  ], 
  async (req,res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()}); 
    }

    const {email,password}=req.body;
    try {
      let user=await User.findOne({email}); // the findOne database command used to fetching the databse email which in present in the collection
      if(!user){
        success=false
        return res.status(400).json({erore:"Please im erore try to login with correct credential"})
      }
      
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        success=false;
        return res.status(400).json({success,erore:"please login with the correct   credential"})
      }
      const data={
       user:{
         id:user.id,
       }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken});
    } catch (error) {
      //     for catch any error in whole code
       console.error(error.message);
       res.status(500).send("Internal Server  Erore Occured");
     }
   
  });
  // Route 3/: for get logged in user  details login required
  router.post( //this is post methode for our security to passwordd
    "/getuser",fetchuser,
  async(req,res) => { 
    try {
        userId=req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user);
    }
    catch (error){
      //     for catch any error in whole code
       console.error(error.message);
       res.status(500).send("Internal Server  Erore Occured");
     }
  });
module.exports = router; //for export a router where we use our backend  this is backend keyword its running like rute
