const express=require('express') // to import the express
var cors = require('cors') //for fixing the core erroe in backend
const connectToMongo = require('./db')  //this is used to import the function of db.js  connecttomongo
connectToMongo(); //function calling 
const app=express() //for use app keyword in the index.js
const port=5000; //this is the port where our application is running
app.use(cors())

 
// Middle Var For Auth Req.body
app.use(express.json()); 
 
// Available routes
// app.use('/api',require('./routes/api'))

// this is a auth route for create a user and check  the validating of user
app.use('/api/auth',require('./routes/auth'))

// this is a route for notes.js
app.use('/api/notes',require('./routes/notes'))
 
app.listen(port,()=>{
    console.log(`the INotebook Backend running at http://localhost:${port}`)
})
