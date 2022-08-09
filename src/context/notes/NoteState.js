import NoteContext from './noteContext' 
import {useState} from 'react' 
const NoteState=(props)=>{
  const host ="http://localhost:5000"
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)
  
    const [alert, setAlert] = useState(null)
    console.log(alert);
    const showAlert=(message,type)=>{
      setAlert({type:type,msg:message})
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }
    // GET ALL NOTES
    const getNotes= async ()=>{ 
       // API CALL 
       console.log("the  note was fetched from getNotes!")
       const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc. 
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        }
         });
         const  json=await response.json();
          console.log(json)
          setNotes(json);
    }

    // ADD A NOTE 
    const addNote= async (title,description,tag)=>{
      //TODO api call;
       // API CALL
       const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc. 
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        }, 
        body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      const note= await  response.json(); // parses JSON response into native JavaScript objects 
      setNotes(notes.concat(note)); 
     
      // --------Previous method
      // const json= await  response.json(); // parses JSON response into native JavaScript objects 
            // console.log(json);
        // console.log("note was added from addNote")

      // const note={
      //   "_id": "620a2bs23707bda4937bd7f502",
      //   "user": "620696s444d990dcefc0f5c49",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2022-02-14T10:12:51.639Z",
      //   "__v": 0
      // }
    }

    // DELETE A NOTE
    const deleteNote= async (id)=>{
    //  TODO: API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc. 
      headers: {
        'Content-Type': 'application/json' ,
        'auth-token': localStorage.getItem('token')
      },  // body data type must match "Content-Type" header
    });
    const json= await response.json(); // parses JSON response into native JavaScript objects
      console.log(json)
      console.log("from deleteNote :Note Was Deleted and this id is"+id);
    const  newNotes= notes.filter((note)=>{return note._id!==id});
           setNotes(newNotes);   
    }


    // Edit A NOTE
    const editNote=async (id,title,description,tag)=>{
      // API CALL
      // Core problem thats install  in backend    {fix is  npm install cors} url-{https://expressjs.com/en/resources/middleware/cors.html}
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.  updateNote
        headers: {
          'Content-Type': 'application/json' ,
          'auth-token': localStorage.getItem('token')
        }, 
        body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
      });
      const json= await  response.json(); // parses JSON response into native JavaScript objects
        console.log(json)

        let newNotes=JSON.parse(JSON.stringify(notes));
        console.log("the note was updated from editNote")

      // Logic to edit the client side note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    return(
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes,showAlert}}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;