import React, { useContext, useState } from 'react'
import ProjectIdContext from '../../../context';
import UserCart from '../UserCart/UserCart';
import { Link } from 'react-router-dom';

const SearchPage = () => {

    const [username, setUsername] = useState();
    const {userData ,setUserId} = useContext(ProjectIdContext);

    const[response, setResponse] = useState()

    const data = {
        username : username
    }

    const options = {
        method: "POST",
        headers :{
          "Content-Type" : 'application/json',
          'authorization' : `Bearer ${userData.token}`   
        },
        body: JSON.stringify(data)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/admin/getUserByUsername",options)
        .then(async(res)=>{
            const json = await res.json();
            setResponse(json)
            console.log(json);
            
        })
        .catch((err)=>{console.log(err)})
        
        
    }

  return (
    <div className='searchPage'>
    <div className='box-5'>
      <label htmlFor='username'>Username:</label>
      <input name='username' id='username' type='text' onChange={(e)=>{setUsername(e.target.value)}} />
      <input className='submit' type='submit' onClick={handleSubmit} /></div>
      {response && response.status ===404 ? <p>{response.message} </p> : <div className='everyUser'>
            <div className='user-2'>
                <h3>Full Name: {response?.firstName} {response?.lastName}</h3>
                <p>Email: {response?.email}</p>
                <p>Username: {response?.username}</p>
                <p>User Role : {response?.role}</p>
                {response?.isAdmin ? <p>Admin: Yes</p> : <p>Admin: No</p>}
                {response?.isVerified ? <p>Verified: Yes</p> : <p>Verified: No</p>}
                <Link onClick={()=>{setUserId(response?._id)}}  to={`/user/${response?._id}`}><button>Edit</button></Link>
            </div>
      </div>}
      
    </div>
  )
}

export default SearchPage
