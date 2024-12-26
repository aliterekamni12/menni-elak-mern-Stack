import React,{useState, useEffect, useContext} from 'react'
import ProjectIdContext from '../../context';
import { useNavigate } from 'react-router-dom';
import "./CreatePost.css"

const CreatePost = () => {

  const [title , setTitle] = useState();
  const [description, setDescription] = useState();
  const [amount, setAmount ] = useState();

  const {userData} = useContext(ProjectIdContext);

  const [response , setResponse] = useState();

  const navigate = useNavigate();

  const data = {
    title: title,
    description: description,
    amount: amount
  }

  const options = {
    method: 'POST',
    headers :{
      "Content-Type" : 'application/json',
      'Authorization': `Bearer ${userData.token}`    
    },
    body: JSON.stringify(data)
  }

  const handleSubmit = async()=>{
    const response = await fetch("http://localhost:4000/api/post",options)
    .then(async(res)=>{
      const json = await res.json();
      setResponse(json)
      if(res.status === 200){
        navigate("/CreatedSuccessfuly")
      }
    })
  }

  return (
    <div className='create-post-container'>
      <div className='box-4'>
      <label htmlFor='title'>Title: </label>
      <input name='title' id='title' type='text' onChange={(e)=>{setTitle(e.target.value)}} />   
      <label htmlFor='description'>Description: </label>
      <input name='description' id='description' type='text' onChange={(e)=>{setDescription(e.target.value)}} />  
      <label htmlFor='amount'>Amount: </label>
      <input name='amount' id='amount' type='number'min='0' onChange={(e)=>{setAmount(e.target.value)}} /> 
      <input className='submit' type='submit' onClick={handleSubmit} />
      {response && response.status === 400 ? <p>{response.message} </p> :<></>} 
      </div>
    </div>
  )
}

export default CreatePost
