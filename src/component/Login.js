import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""}) 
    let history=useHistory();
    const handleSubmit= async (e)=>{
        console.log('i am submit');
        e.preventDefault() 
          // api call of login the users
    console.log("this is login")
    const response = await fetch('http://localhost:5000/api/auth/login', {
     method: 'POST', // *GET, POST, PUT, DELETE, etc. 
     headers: {
       'Content-Type': 'application/json' ,
        },
        body: JSON.stringify({email:credentials.email,password:credentials.password}) // body data type must match "Content-Type" header

      });
      const  json=await response.json();
       console.log(json)
       if(json.success){
        //Save the authtoken and   redirect
        localStorage.setItem("token",json.authtoken);
        history.push('/');
        props.showAlert("Logged In SuccessFully","success");
       }
       else{
        props.showAlert("Invalid Details","danger");
       }
    } 
    const onChange=(e)=>{
      // Use A Spread Oprator
      setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  // jiendra@mail.com
  // asdf1002
  
  
  return (
    <>
  <h2>Login in to iNotebook App</h2> 
    <div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-2">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange}   aria-describedby="emailHelp" required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange}  value={credentials.password} name="password"  id="password" required/>
  </div>
  
  <button  type="submit" className="btn btn-primary" >Login</button>
</form>
    </div>
    </>
  )
}

export default Login