import React, { useContext, useState } from 'react';
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom';
import ProjectIdContext from '../../context';



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const {setUserData } = useContext(ProjectIdContext);
    const {isLogin} = useContext(ProjectIdContext);

    const navigate = useNavigate();

    const [ response , setResponse] = useState({});

    const data = {
        username: username,
        password: password
    }
    const options ={
        method : 'POST',
        headers :{
            "Content-Type" : 'application/json'    
        },
        body: JSON.stringify(data)
    }

    

    const handleSubmit =async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/api/auth/login', options)
        .then(async(res)=>{
          const json = await res.json();
          setResponse(json);
          if(res.ok){
          setUserData(json)
            isLogin(true)
          }

          if(res.status === 200){
            navigate('/');
          
          }
        })
        .catch(err=>console.log(err))
        
    }
       

  return (
    <div className='login'>
      
        <h1>Login</h1>
        <form>
            <label htmlFor='username'>username: </label>
            <input name='username' id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} />
            <label htmlFor='password'>password: </label>
            <input name='password' id='password' type='password' onChange={(e)=>{setPassword(e.target.value)}} />
            
            <input id='submit' type='submit' onClick={handleSubmit}/>
            {response.length !== 0 ? <p>{response.message} </p> : <></>}
        </form>
       
        
        <Link>Forgot Your Password?</Link>
      
    </div>
  )
}

export default Login
