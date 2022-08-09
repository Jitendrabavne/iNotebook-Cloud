import React,{useContext,useEffect, useRef ,useState} from 'react'  
import AddNote from './AddNote'
import Noteitem from './Noteitem'
import noteContext from "../context/notes/noteContext"
import {useHistory} from 'react-router'
const Notes = (props) => {
  const  context = useContext(noteContext)
  let history=useHistory();
  // destructuring 
  // for fetching all notes.from noteState components
  const {notes, getNotes,editNote}=context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes()
      //eslint-disable-next-line
    }
    else{
      history.push('/login');
    }
   
  }, [])

 

   // destructuring 
   const [note, setNote] = useState({id:"",etitle:"" , edescription:"",etag:""})

  // for using  closing the pen i span 
  const refClose= useRef(null)

  //  Updatenote function
   const handleClick=(e)=>{
       // for unreleod the funtion 
        editNote(note.id , note.etitle , note.edescription , note.etag);
       refClose.current.click();
       props.showAlert("Updated Successfully!","success");
   }

   // for using use ref open the pen i span 
   const ref = useRef(null);
    // for open the tab of the pen bar 
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag})
    
  } 
   const onChange=(e)=>{
       // Use A Spread Oprator
       setNote({...note,[e.target.name]:e.target.value})
   }
   
  return (
    <>
      <AddNote showAlert={props.showAlert}/>   
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
 
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    <form className="my-3">
   <div className="mb-3">
     <label htmlFor="exampleInputEmail1" className="   form-label">Title</label>
     <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp"  onChange={onChange} minLength={5} required/> 
   </div>
   <div className="mb-3">
     <label htmlFor="description" className="form-label">Description</label>
     <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required/>
   </div>
   <div className="mb-3">
     <label htmlFor="tag" className="form-label">Tag</label>
     <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} minLength={5} required/>
   </div>
 </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}  type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
        <h1>Your  Notes</h1> 
        <div className="container mx-2">
        {notes.length===0 && 'Please Add Your Notes!'} 
        </div>
        {/* //hm isme (&&) tb lgate h jb hmare pass else me kuch ni hote h in turnery operator */}
        {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
          
        })}
       </div>  

    </>
  )
}

export default Notes



