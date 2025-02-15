import React, {useState} from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("recipient");
  
  const [response, setResponse] = useState({})

  const data = {
    firstName : firstName,
    lastName : lastName,
    email : email,
    username : username,
    password : password,
    confirmPassword: confirmPassword,
    role : role
  }

  const options = {
    method : 'POST',
    headers :{
      "Content-Type" : 'application/json'    
    },
    body: JSON.stringify(data)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("https://menni-elak-mern-stack.onrender.com/api/auth/signup" , options)
    .then(async(res)=>{
      const json = await res.json(res)
      setResponse(json)
      if(res.status === 201){
        navigate("/login")
      }
    })
    .catch(err=>console.log(err))
    
  }

  const navigate = useNavigate();
  function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
    var y = document.getElementById("confirmPassword");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }

  return (
    <div className='login'>
      <div className='box-2'>
        <h1>Signup</h1>
        <form>
            <label htmlFor='fName'>first Name: </label>
            <input name='fName' id='fName' type='text' onChange={(e)=>{setFirstName(e.target.value)}} />

            <label htmlFor='lName'>Last Name: </label>
            <input name='lName' id='lName' type='text' onChange={(e)=>{setLastName(e.target.value)}} />

            <label htmlFor='email'>Email: </label>
            <input name='email' id='fName' type='text' onChange={(e)=>{setEmail(e.target.value)}} />



            <label htmlFor='username'>Username: </label>
            <input name='username' id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} />

            <label htmlFor='password'>password: </label>
            <input name='password' id='password' type='password' onChange={(e)=>{setPassword(e.target.value)}} />
            

            <label htmlFor='confirmPassword'>confirm Password: </label>
            <input name='confirmPassword' id='confirmPassword' type='password' onChange={(e)=>{setConfirmPassword(e.target.value)}} />

            <label id='showPassword'>Show Password</label>
            <input type="checkbox" onClick={myFunction}/>

            <label htmlFor='role'>Role: </label>
            <select id="role" onChange={(e)=>{setRole(e.target.value)}}>

                <option value="recipient">Recipient</option>
                <option value="donor">Donor</option>
              
            </select>

            <input className='submit' type='submit' onClick={handleSubmit}/>
            {response.length !== 0 ? <p>{response.message} </p> : <></>}
        </form>
       
        
        </div>
        <Link className='link' to='/login'>Do you have an account?</Link>
    </div>
  )
}

export default Signup
