import React  from 'react';
 import Navbar from './component/Navbar';
 import Home from './component/Home';
 import About from './component/About'; 
 import Login from './component/Login'; 
 import Signup from './component/Signup'; 
 import {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route 
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert =(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
 
  return (
   <>
   <NoteState  >
   <Router>
     <Navbar showAlert={showAlert}/> 
     <Alert alert={alert}/>   
    <div className="container">
     <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert}  />
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert}  />
          </Route>
        </Switch>
        </div>
   </Router>
   </NoteState>
     
   </>
  );
}

export default App;
