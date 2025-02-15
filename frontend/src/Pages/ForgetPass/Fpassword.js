import React,{useState} from 'react'
import "./Fpassword.css"
const Fpassword = () => {
    const [username, setUsername] = useState("");
    const [response, setResponse] = useState({});
    
    const data = {
      username: username
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
         await fetch("https://menni-elak-mern-stack.onrender.com/api/auth/forgotPassword" , options)
        .then(async(res)=>{
          const json = await res.json();
          setResponse(json)
        })
        .catch(err=>console.log(err))
        
    }
  return (
    <div className='login'>
      <div className='box-3'>
      <label htmlFor='username'>username: </label>
      <input name='username' id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} />
      <input id='submit' type='submit' onClick={handleSubmit}/>
       {response.length !== 0 ? <p>{response.message} </p> : <></>}
      </div> 
    </div>
  )
}

export default Fpassword
