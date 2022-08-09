const express=require('express')
const router=express.Router()
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser=require('../middleware/fetchuser')

  // Route 1/: get  Fetch all the notes of the user GET "api/notes/fetchallnotes"--login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   try {
  
   const notes=await Note.find({user:req.user.id})
   res.json(notes)
    
}catch (error) {
   //     for catch any error in whole code
    console.error(error.message);
    res.status(500).send("Internal Server  Erore Occured");
  }
})

  // Route 2/: add a new notes using POST "api/notes/addnote"---login required
router.post('/addnote',fetchuser,[
   body("title", " Enter a Valid Title:").isLength({ min: 3 }),
     body("description", " Description must be atleast 5 charactors:").isLength({ min: 5 }),
  
],async(req,res)=>{
     try { 
      //   destructuring methode
      const {title,description,tag}=req.body
    // if there are errors,return bad request amd the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    // create a note
    const note=new Note({
       title, description, tag, user:req.user.id
    })
   const savedNote=await note.save()
   res.json(savedNote);

} catch (error) {
   //     for catch any error in whole code
    console.error(error.message);
    res.status(500).send("Internal Server  Erore Occured");
  }
})

  // Route 3/: update a existing note whatever you want using PUT "api/notes/updatenote"---login required 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;
  try{
  // Create a newNote Object
  const newNote={};     //-- we create this empty array for update the existing  note
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

//  find the note to updated and update it

let note= await  Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")};
  if(note.user.toString() !==req.user.id){
    return res.status(401).send("Not Allowed");
  }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})//--- if the new user then added the note 
    res.json({note});
}
    catch (error) {
      //     for catch any error in whole code
       console.error(error.message);
       res.status(500).send("Internal Server  Erore Occured");
     }
})
// Route 4/: delete a existing note whatever you want using DELETE "api/notes/deletenote"---login required 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body;
  try{
//  find the note to be deleted and delete it
let note= await  Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found")};

  // Aloow deletion if user owns this note
  if(note.user.toString() !==req.user.id){
    return res.status(401).send("Not Allowed");
  }
    note=await Note.findByIdAndDelete(req.params.id)//--- if the new user exist then delete the note 
    res.json({"Success":"Note has been deleted",note:note});
}
    catch (error) {
      //     for catch any error in whole code
       console.error(error.message);
       res.status(500).send("Internal Server  Erore Occured");
     }
})
module.exports=router;