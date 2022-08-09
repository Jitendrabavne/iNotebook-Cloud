import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""}) 
  const {name,email,password} =credentials;
//  for  check history this is history hooks
  let history=useHistory();
  const handleSubmit= async (e)=>{
    console.log('i am submit');
    e.preventDefault() 
      // api call of Signup the users
console.log("this is Signup")

const response = await fetch('http://localhost:5000/api/auth/createuser', {
 method: 'POST', // *GET, POST, PUT, DELETE, etc. 
 headers: {
   'Content-Type': 'application/json' ,
  },
  body: JSON.stringify({name,email,password}) // body data type must match "Content-Type" header 
  });
  const  json=await response.json();
   console.log(json) 
    //Save the authtoken and   redirect
    if(json.success){
    localStorage.setItem("token",json.authtoken);
    history.push("/");
    
    props.showAlert(" Account Created SuccessFully","success");
    }
     else{
       props.showAlert("Invalid Credentials","danger");
     }
} 
const onChange=(e)=>{
  // Use A Spread Oprator
  setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <>
    <h2>iNotebook-Your Notes Secured in The Cloud</h2>
    <div className="container">
   <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-2">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" required minLength={5} onChange={onChange} id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" required minLength={5} onChange={onChange} id="cpassword"/>
  </div>
   
  <button type="submit" className="btn btn-primary">Create Account</button>
</form>
    </div>
    </>
  )
}

export default Signup